import React, { useState } from 'react';
import { PhoneCall, MessageSquare, X, Play, Mic, Check } from 'lucide-react';

interface GsmIvrSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GsmIvrSimulator: React.FC<GsmIvrSimulatorProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'IVR' | 'SMS'>('IVR');
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState('Telugu');
  const [smsInput, setSmsInput] = useState('VYAPAR START ELECTRICAL TENALI 150000');
  const [smsResponse, setSmsResponse] = useState('');

  if (!isOpen) return null;

  const handleStartCall = () => {
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
    }, 1500);
  };

  const handleEndCall = () => {
    setCallState('idle');
  };

  const handleSendSms = () => {
    setSmsResponse('Vyapar Mitra Alert: Electrical Shop at Tenali matched! Est project: ₹2,80,000. Loan req: ₹1,82,000. Net Profit: ₹26,000/mo. Reply DPR to get SMS code.');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-8" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-vyapar-navy text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-vyapar-saffron" />
            <div>
              <h3 className="font-serif font-bold text-lg">2G Keypad Phone & IVR Simulator</h3>
              <p className="text-[11px] text-vyapar-ivory/80">Toll-Free IVR (1800-VYAPAR) & Offline GSM Channel (SIH26091 Slide 2 & 3)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-vyapar-ivory/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-vyapar-border text-xs font-bold">
          <button
            onClick={() => setActiveTab('IVR')}
            className={`flex-1 py-3 text-center flex justify-center items-center gap-2 ${
              activeTab === 'IVR' ? 'bg-vyapar-navy/10 text-vyapar-navy border-b-2 border-vyapar-navy' : 'text-vyapar-text-secondary hover:bg-gray-50'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Toll-Free Voice IVR</span>
          </button>
          <button
            onClick={() => setActiveTab('SMS')}
            className={`flex-1 py-3 text-center flex justify-center items-center gap-2 ${
              activeTab === 'SMS' ? 'bg-vyapar-navy/10 text-vyapar-navy border-b-2 border-vyapar-navy' : 'text-vyapar-text-secondary hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>2G Bi-directional SMS Gateway</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4 text-xs">
          {activeTab === 'IVR' && (
            <div className="space-y-4 text-center">
              <div className="p-3 bg-vyapar-ivory rounded-xl border border-vyapar-border text-left">
                <span className="font-bold text-vyapar-navy block">Toll-Free IVR Number: 1800-892-727</span>
                <span className="text-vyapar-text-secondary text-[11px]">
                  Bridges the digital divide for semi-literate rural entrepreneurs without internet access.
                </span>
              </div>

              {callState === 'idle' && (
                <div className="py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <PhoneCall className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-vyapar-navy">Simulate 2G Keypad Call</h4>
                    <p className="text-vyapar-text-secondary text-xs">Select language and press Start Call to test voice prompts.</p>
                  </div>

                  <div className="flex justify-center gap-2 font-semibold">
                    {['Telugu', 'Hindi', 'Tamil', 'Kannada', 'English'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-1.5 rounded-lg border text-xs ${
                          selectedLanguage === lang ? 'bg-vyapar-navy text-white' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleStartCall}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md inline-flex items-center gap-2 text-sm"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Dial 1800-VYAPAR-MITRA</span>
                  </button>
                </div>
              )}

              {callState === 'calling' && (
                <div className="py-8 space-y-3">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <PhoneCall className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-vyapar-navy">Connecting Call...</h4>
                  <p className="text-vyapar-text-secondary text-xs">Routing via Exotel / Twilio GSM Gateway...</p>
                </div>
              )}

              {callState === 'connected' && (
                <div className="py-4 space-y-4">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Mic className="w-8 h-8" />
                  </div>
                  <div className="bg-slate-900 text-green-400 font-mono p-4 rounded-xl text-left space-y-2 text-xs leading-relaxed">
                    <p className="text-white font-bold">🔊 IVR Audio Prompt ({selectedLanguage}):</p>
                    <p>"Namaste! Vyapar Mitra ki swagatam. Press 1 for Electrical Shop advisory. Press 2 for Kirana. Speak your village name after the beep..."</p>
                    <div className="p-2 bg-slate-800 rounded text-amber-300">
                      ▶ Detected User Input: "Electrical Shop, Tenali, Capital 1.5 Lakhs"
                    </div>
                    <div className="p-2 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                      ✔ Analysis Complete: Suitability Score 94%. SMS summary dispatched!
                    </div>
                  </div>

                  <button
                    onClick={handleEndCall}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow"
                  >
                    Disconnect Call
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'SMS' && (
            <div className="space-y-4">
              <div className="p-3 bg-vyapar-ivory rounded-xl border border-vyapar-border">
                <span className="font-bold text-vyapar-navy block">Shortcode: 56161 (Fast2SMS / Gupshup Gateway)</span>
                <span className="text-vyapar-text-secondary text-[11px]">Send structured SMS from any basic feature phone without internet.</span>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-vyapar-navy">Simulate Outgoing SMS from 2G Phone:</label>
                <input
                  type="text"
                  value={smsInput}
                  onChange={e => setSmsInput(e.target.value)}
                  className="w-full p-3 border rounded-xl font-mono text-xs focus:ring-2 focus:ring-vyapar-navy focus:outline-none"
                />
              </div>

              <button
                onClick={handleSendSms}
                className="w-full py-2.5 bg-vyapar-navy text-white rounded-xl font-bold hover:bg-vyapar-slate"
              >
                Send SMS Request →
              </button>

              {smsResponse && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-mono text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Incoming SMS Response Received:</span>
                  </div>
                  <p className="bg-white p-3 rounded border border-emerald-300 leading-relaxed text-slate-800">
                    "{smsResponse}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
