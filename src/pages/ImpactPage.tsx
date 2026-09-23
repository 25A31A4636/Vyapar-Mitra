import { DataBadge } from '../components/DataBadges';
import { CheckCircle2 } from 'lucide-react';

export default function ImpactPage() {
  const outcomes = [
    { title: 'Lower Business Failure Rate', desc: 'Pre-evaluating market competition and financial break-even before capital commitment prevents premature business closures.' },
    { title: 'Financial Clarity for Micro-Entrepreneurs', desc: 'Translating complex banking terms (EMI, break-even, promoter margin) into simple regional explanations.' },
    { title: 'Democratized Business Consulting', desc: 'Bringing enterprise-grade advisory to rural village entrepreneurs without expensive consulting fees.' },
    { title: 'Digital & Financial Inclusion', desc: 'Multimodal voice, OCR, and low-connectivity access models designed for rural literacy levels.' },
    { title: 'Better Credit & Loan Decisions', desc: 'Bankable DPR generation reduces friction between rural entrepreneurs and formal banking channels.' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-serif font-bold text-vyapar-navy">Why Vyapar Mitra?</h1>
        <p className="text-sm text-vyapar-text-secondary max-w-xl mx-auto">
          Transforming rural micro-entrepreneurship through structured AI and financial transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outcomes.map((out, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-vyapar-border shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-vyapar-green shrink-0" />
              <h3 className="font-serif font-bold text-lg text-vyapar-navy">{out.title}</h3>
            </div>
            <p className="text-xs text-vyapar-text-secondary leading-relaxed pl-7">{out.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-vyapar-ivory p-6 rounded-xl border border-vyapar-border text-center space-y-3">
        <div className="flex justify-center">
          <DataBadge type="DEMO" />
        </div>
        <p className="text-xs text-vyapar-text-secondary max-w-lg mx-auto">
          * Metrics and outcome figures shown across the prototype reflect project targets and hackathon benchmarks (SIH26091).
        </p>
      </div>
    </div>
  );
}
