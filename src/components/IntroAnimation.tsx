import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VyaparEmblem } from './VyaparEmblem';

export default function IntroAnimation() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      navigate('/home', { replace: true });
      return;
    }

    const timers = [
      setTimeout(() => setStep(1), 300),  // 0.3s Emblem
      setTimeout(() => setStep(2), 600),  // 0.6s Wordmark
      setTimeout(() => setStep(3), 1500), // 1.5s Saffron sweep
      setTimeout(() => setStep(4), 1800), // 1.8s SIH 2026
      setTimeout(() => setStep(5), 2100), // 2.1s Tricolor accent line
      setTimeout(() => navigate('/home', { replace: true }), 3200) // 3.2s Redirect
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [navigate]);

  const handleSkip = () => {
    navigate('/home', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-vyapar-navy z-50 flex flex-col items-center justify-center text-white overflow-hidden select-none">
      {/* Skip Button */}
      <button 
        onClick={handleSkip}
        className="absolute top-6 right-6 text-sm text-vyapar-ivory/70 hover:text-vyapar-saffron border border-white/20 hover:border-vyapar-saffron px-3 py-1.5 rounded transition-all duration-200 z-10"
      >
        Skip →
      </button>

      <div className="relative flex flex-col items-center justify-center p-8 max-w-lg text-center">
        {/* Saffron sweep highlight overlay */}
        {step >= 3 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vyapar-saffron/20 to-transparent animate-pulse pointer-events-none rounded-full blur-xl" />
        )}

        {/* Emblem Step 1+ */}
        <div className={`transition-all duration-700 transform ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <VyaparEmblem size={96} className="shadow-2xl mb-6" />
        </div>

        {/* Wordmark Step 2+ */}
        <div className={`transition-all duration-700 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
            VYAPAR MITRA
          </h1>
          <p className="text-vyapar-ivory/80 font-sans text-sm sm:text-base tracking-wide font-medium">
            Your Intelligent Business Companion
          </p>
        </div>

        {/* SIH 2026 Step 4+ */}
        <div className={`mt-8 transition-all duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs uppercase tracking-widest text-vyapar-saffron font-bold bg-vyapar-slate/50 px-3 py-1 rounded border border-vyapar-saffron/30">
            SMART INDIA HACKATHON 2026 — SIH26091
          </span>
        </div>

        {/* Tricolor Identity Line Step 5+ */}
        <div className={`mt-6 w-48 h-1 flex rounded overflow-hidden transition-all duration-500 ${step >= 5 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
          <div className="flex-1 bg-vyapar-saffron" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-vyapar-green" />
        </div>
      </div>
    </div>
  );
}
