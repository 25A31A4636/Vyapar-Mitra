import React, { useState, useRef, useEffect } from 'react';
import type { QuestionField } from '../types';
import { HelpCircle, Mic, MicOff, Camera, ArrowLeft, ArrowRight, X, CheckCircle } from 'lucide-react';
import { DataBadge } from './DataBadges';
import { useApp } from '../context/AppContext';

interface SmartQuestionnaireProps {
  title: string;
  subtitle?: string;
  questions: QuestionField[];
  onComplete: (answers: Record<string, any>) => void;
  savedDataNotice?: boolean;
}

// Language code map for SpeechRecognition
const LANG_CODE: Record<string, string> = {
  EN: 'en-IN',
  HI: 'hi-IN',
  TE: 'te-IN',
  TA: 'ta-IN',
  KN: 'kn-IN',
};

export const SmartQuestionnaire: React.FC<SmartQuestionnaireProps> = ({
  title,
  subtitle,
  questions,
  onComplete,
  savedDataNotice = true
}) => {
  const { t, language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [activeExplainId, setActiveExplainId] = useState<string | null>(null);

  // ── Voice state ────────────────────────────────────────────────
  const [isListening, setIsListening] = useState(false);
  const [voiceTarget, setVoiceTarget] = useState<string | null>(null);
  const [voiceText, setVoiceText] = useState('');
  const [voiceInterim, setVoiceInterim] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef<any>(null);

  // ── Photo state ────────────────────────────────────────────────
  const [photoTarget, setPhotoTarget] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<Record<string, string>>({});
  const [photoAnalyzing, setPhotoAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentQ = questions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) {}
      }
    };
  }, []);

  const handleInputChange = (id: string, val: any) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleIDontKnow = () => {
    handleInputChange(currentQ.id, "I don't know");
    handleNext();
  };

  // ══════════════════════════════════════════════════════════════
  // VOICE INPUT — Web Speech API
  // ══════════════════════════════════════════════════════════════
  const startVoiceInput = (fieldId: string) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      setVoiceTarget(fieldId);
      setIsListening(true);
      return;
    }

    // Stop existing session if any
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_) {}
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = LANG_CODE[language] || 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    setVoiceTarget(fieldId);
    setVoiceText('');
    setVoiceInterim('');
    setVoiceError('');
    setIsListening(true);

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      if (finalTranscript) {
        setVoiceText(prev => (prev ? prev + ' ' : '') + finalTranscript.trim());
        setVoiceInterim('');
      } else {
        setVoiceInterim(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      const messages: Record<string, string> = {
        'not-allowed': 'Microphone access denied. Please allow microphone in browser settings.',
        'network': 'Network error. Check your internet connection.',
        'no-speech': 'No speech detected. Please try again.',
        'audio-capture': 'No microphone found. Please connect a microphone.',
        'aborted': '',
      };
      const msg = messages[event.error] ?? `Error: ${event.error}`;
      if (msg) setVoiceError(msg);
      setVoiceInterim('');
    };

    recognition.onend = () => {
      setVoiceInterim('');
      // Don't close modal — let user confirm or cancel
    };

    try {
      recognition.start();
    } catch (err) {
      setVoiceError('Could not start microphone. Please try again.');
    }
  };

  const stopListeningRecognition = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
  };

  const confirmVoice = () => {
    const finalText = voiceText.trim() || voiceInterim.trim();
    if (voiceTarget && finalText) {
      handleInputChange(voiceTarget, finalText);
    }
    stopListeningRecognition();
    setIsListening(false);
    setVoiceTarget(null);
    setVoiceText('');
    setVoiceInterim('');
    setVoiceError('');
  };

  const cancelVoice = () => {
    stopListeningRecognition();
    setIsListening(false);
    setVoiceTarget(null);
    setVoiceText('');
    setVoiceInterim('');
    setVoiceError('');
  };

  // ══════════════════════════════════════════════════════════════
  // PHOTO UPLOAD — File Input + Preview + Simulated OCR
  // ══════════════════════════════════════════════════════════════
  const triggerPhotoUpload = (fieldId: string) => {
    setPhotoTarget(fieldId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !photoTarget) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, etc.)');
      return;
    }

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(prev => ({ ...prev, [photoTarget]: previewUrl }));

    // Simulate OCR extraction (3 second mock processing)
    setPhotoAnalyzing(true);
    const targetId = photoTarget;

    setTimeout(() => {
      // In a real implementation, send `file` to a backend OCR endpoint
      // and parse the response. Here we populate a plausible demo value.
      const mockOcrValues: Record<string, string> = {
        businessName: 'Sri Lakshmi Enterprises',
        investmentAmount: '150000',
        monthlyRevenue: '45000',
        location: 'Karimnagar, Telangana',
        name: 'Lakshmi Devi',
        phone: '9876543210',
      };

      const ocrValue =
        mockOcrValues[targetId] ??
        `Extracted from photo (${file.name})`;

      handleInputChange(targetId, ocrValue);
      setPhotoAnalyzing(false);
    }, 2500);
  };

  const clearPhoto = (fieldId: string) => {
    setPhotoPreview(prev => {
      const next = { ...prev };
      if (next[fieldId]) {
        URL.revokeObjectURL(next[fieldId]);
        delete next[fieldId];
      }
      return next;
    });
    handleInputChange(fieldId, '');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-vyapar-border p-6 max-w-2xl mx-auto">

      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Questionnaire Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-semibold text-vyapar-text-secondary mb-2">
          <span>{t('q.step', 'STEP')} {currentStep + 1} {t('q.of', 'OF')} {questions.length}</span>
          <span className="text-vyapar-navy font-bold">{progressPercent}% {t('q.completed', 'Completed')}</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-vyapar-navy h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-serif font-bold text-vyapar-navy mb-1">{title}</h2>
        {subtitle && <p className="text-sm text-vyapar-text-secondary">{subtitle}</p>}
      </div>

      {savedDataNotice && currentStep === 0 && (
        <div className="mb-6 bg-vyapar-ivory p-3 rounded-lg border border-vyapar-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <DataBadge type="USER-PROVIDED" />
            <span className="text-vyapar-text-primary font-medium">
              {t('q.savedProfile', 'Using your saved entrepreneur profile data')}
            </span>
          </div>
          <button className="text-vyapar-navy font-bold underline hover:text-vyapar-slate">
            {t('q.editProfile', 'Edit Profile')}
          </button>
        </div>
      )}

      {/* Current Question Container */}
      {currentQ && (
        <div className="space-y-4 min-h-[220px]">
          <div className="flex items-start justify-between gap-4">
            <label className="block font-medium text-vyapar-text-primary text-lg">
              {currentQ.label}
              {currentQ.required && <span className="text-vyapar-danger ml-1">*</span>}
            </label>
            {currentQ.whyAsk && (
              <button
                type="button"
                onClick={() => setActiveExplainId(activeExplainId === currentQ.id ? null : currentQ.id)}
                className="text-xs text-vyapar-teal font-semibold flex items-center gap-1 hover:underline shrink-0 mt-1"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{t('q.whyAsk', 'Why do we ask this?')}</span>
              </button>
            )}
          </div>

          {/* Explanation Callout */}
          {activeExplainId === currentQ.id && currentQ.whyAsk && (
            <div className="bg-teal-50 border border-teal-200 text-teal-900 p-3 rounded-lg text-xs leading-relaxed">
              <span className="font-bold block mb-1">{t('q.whyAsk', 'Why do we ask this?')}</span>
              {currentQ.whyAsk}
            </div>
          )}

          {/* Field Input Renderers */}
          <div className="pt-2 space-y-3">
            {currentQ.type === 'text' && (
              <input
                type="text"
                value={answers[currentQ.id] || ''}
                onChange={e => handleInputChange(currentQ.id, e.target.value)}
                placeholder={currentQ.placeholder || 'Enter your response...'}
                className="w-full px-4 py-3 border border-vyapar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vyapar-navy text-sm"
              />
            )}

            {currentQ.type === 'number' && (
              <div className="relative">
                <input
                  type="number"
                  value={answers[currentQ.id] || ''}
                  onChange={e => handleInputChange(currentQ.id, Number(e.target.value))}
                  placeholder={currentQ.placeholder || '0'}
                  className="w-full px-4 py-3 border border-vyapar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vyapar-navy text-sm pr-12"
                />
                {currentQ.unit && (
                  <span className="absolute right-4 top-3 text-sm text-vyapar-text-secondary font-medium">
                    {currentQ.unit}
                  </span>
                )}
              </div>
            )}

            {currentQ.type === 'select' && (
              <select
                value={answers[currentQ.id] || ''}
                onChange={e => handleInputChange(currentQ.id, e.target.value)}
                className="w-full px-4 py-3 border border-vyapar-border rounded-lg focus:outline-none focus:ring-2 focus:ring-vyapar-navy text-sm bg-white"
              >
                <option value="">-- Select Option --</option>
                {currentQ.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {currentQ.type === 'radio' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options?.map(opt => (
                  <label
                    key={opt.value}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer text-sm transition-all ${
                      answers[currentQ.id] === opt.value
                        ? 'border-vyapar-navy bg-vyapar-navy/5 font-semibold text-vyapar-navy'
                        : 'border-vyapar-border hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={opt.value}
                      checked={answers[currentQ.id] === opt.value}
                      onChange={() => handleInputChange(currentQ.id, opt.value)}
                      className="mr-3 text-vyapar-navy focus:ring-vyapar-navy"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}

            {currentQ.type === 'slider' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-vyapar-navy">
                  <span>₹{(answers[currentQ.id] || currentQ.min || 0).toLocaleString()}</span>
                  <span className="text-xs text-vyapar-text-secondary">Range: ₹{(currentQ.min || 0).toLocaleString()} - ₹{(currentQ.max || 1000000).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={currentQ.min || 0}
                  max={currentQ.max || 1000000}
                  step={currentQ.step || 10000}
                  value={answers[currentQ.id] || currentQ.min || 0}
                  onChange={e => handleInputChange(currentQ.id, Number(e.target.value))}
                  className="w-full accent-vyapar-navy"
                />
              </div>
            )}

            {/* Photo preview for current field */}
            {photoPreview[currentQ.id] && (
              <div className="relative inline-block mt-2">
                {photoAnalyzing ? (
                  <div className="flex items-center gap-2 text-xs text-vyapar-teal font-medium p-2 bg-teal-50 rounded-lg border border-teal-200">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Analysing photo with OCR…
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <img
                      src={photoPreview[currentQ.id]}
                      alt="Uploaded preview"
                      className="h-16 w-24 object-cover rounded-lg border border-vyapar-border shadow-sm"
                    />
                    <div className="text-xs text-green-700 font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Text extracted!
                    </div>
                    <button
                      type="button"
                      onClick={() => clearPhoto(currentQ.id)}
                      className="text-xs text-vyapar-danger hover:underline flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
            {/* Voice button */}
            <button
              type="button"
              onClick={() => startVoiceInput(currentQ.id)}
              className="px-3 py-1.5 rounded-lg border border-vyapar-border text-xs font-semibold text-vyapar-text-secondary hover:text-vyapar-navy hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
            >
              <Mic className="w-3.5 h-3.5 text-vyapar-saffron" />
              <span>{t('q.speak', '🎙 Speak instead')}</span>
            </button>

            {/* Photo upload button */}
            <button
              type="button"
              onClick={() => triggerPhotoUpload(currentQ.id)}
              disabled={photoAnalyzing}
              className="px-3 py-1.5 rounded-lg border border-vyapar-border text-xs font-semibold text-vyapar-text-secondary hover:text-vyapar-navy hover:bg-gray-50 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Camera className="w-3.5 h-3.5 text-vyapar-teal" />
              <span>{t('q.photo', '📷 Upload Photo')}</span>
            </button>

            {currentQ.allowIDontKnow && (
              <button
                type="button"
                onClick={handleIDontKnow}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-vyapar-text-secondary hover:underline ml-auto"
              >
                {t('q.dontKnow', "I don't know")}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── VOICE DIALOG MODAL ── */}
      {isListening && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={cancelVoice}>
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Mic animation */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              voiceError ? 'bg-red-100' : voiceText || voiceInterim ? 'bg-green-100' : 'bg-vyapar-saffron/10'
            }`}>
              {voiceError
                ? <MicOff className="w-8 h-8 text-red-500" />
                : <Mic className={`w-8 h-8 text-vyapar-saffron ${!voiceError && !voiceText && 'animate-pulse'}`} />
              }
            </div>

            <h3 className="font-serif font-bold text-lg text-vyapar-navy">
              {voiceError ? 'Microphone Error' : voiceText ? 'Speech Captured' : 'Listening…'}
            </h3>

            <p className="text-xs text-vyapar-text-secondary">
              {voiceError
                ? voiceError
                : `Speaking in ${LANG_CODE[language] || 'en-IN'} — speak clearly, then click Confirm.`
              }
            </p>

            {/* Live transcript display */}
            {(voiceText || voiceInterim) && !voiceError && (
              <div className="p-3 bg-gray-50 rounded-lg text-sm text-vyapar-text-primary border text-left leading-relaxed min-h-[48px]">
                {voiceText}
                {voiceInterim && (
                  <span className="text-gray-400 italic"> {voiceInterim}</span>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={cancelVoice}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              {!voiceError && (
                <button
                  onClick={confirmVoice}
                  disabled={!voiceText && !voiceInterim}
                  className="flex-1 px-4 py-2.5 bg-vyapar-navy text-white rounded-xl text-sm font-bold hover:bg-vyapar-slate transition-colors disabled:opacity-40"
                >
                  ✓ Use This Text
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-vyapar-border">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            currentStep === 0
              ? 'opacity-40 cursor-not-allowed text-vyapar-text-secondary'
              : 'hover:bg-gray-100 text-vyapar-text-primary'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('q.back', 'Back')}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-vyapar-navy hover:bg-vyapar-slate text-white rounded-lg text-sm font-bold shadow-sm transition-all"
        >
          <span>{currentStep === questions.length - 1 ? t('q.analyze', 'Analyze Opportunity →') : t('q.continue', 'Continue')}</span>
          {currentStep < questions.length - 1 && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
