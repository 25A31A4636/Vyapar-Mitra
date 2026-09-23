import { Mic, Camera } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-serif font-bold text-vyapar-navy">How Vyapar Mitra Works</h1>
        <p className="text-sm text-vyapar-text-secondary max-w-2xl mx-auto">
          Technical Architecture & Multi-Engine Decision Support Pipeline (SIH26091).
        </p>
      </div>

      {/* System Architecture Flow Diagram */}
      <div className="bg-white p-8 rounded-xl border border-vyapar-border shadow-sm space-y-8">
        <h2 className="font-serif font-bold text-xl text-vyapar-navy text-center border-b pb-4">
          End-to-End Decision Processing Architecture
        </h2>

        <div className="space-y-6 text-xs font-sans">
          {/* Layer 1: Inputs */}
          <div className="bg-vyapar-ivory p-4 rounded-xl border border-vyapar-border space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-vyapar-navy text-sm">1. Multi-Modal Input Layer</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">IMPLEMENTED</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-2.5 rounded border text-center font-medium">Smart Questionnaires</div>
              <div className="bg-white p-2.5 rounded border text-center font-medium flex items-center justify-center gap-1">
                <Mic className="w-3.5 h-3.5 text-vyapar-saffron" /> Voice Demo
              </div>
              <div className="bg-white p-2.5 rounded border text-center font-medium flex items-center justify-center gap-1">
                <Camera className="w-3.5 h-3.5 text-vyapar-teal" /> Rural Lens OCR
              </div>
              <div className="bg-white p-2.5 rounded border text-center font-medium text-vyapar-text-secondary">
                2G IVR / SMS (Concept)
              </div>
            </div>
          </div>

          <div className="text-center text-vyapar-navy font-bold text-lg">↓</div>

          {/* Layer 2: Specialized Engines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-vyapar-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-vyapar-navy">Deterministic Financial Engine</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">IMPLEMENTED</span>
              </div>
              <p className="text-vyapar-text-secondary text-[11px]">
                Executes strict mathematical formulas for project costs, EMIs, break-even timelines, and What-If scenarios. Zero AI hallucinations.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-vyapar-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-serif font-bold text-vyapar-navy">Hyper-Local GIS Engine</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">PROTOTYPE DEMO</span>
              </div>
              <p className="text-vyapar-text-secondary text-[11px]">
                Simulates 5km spatial radius competition density, foot traffic estimates, and zone suitability heatmaps.
              </p>
            </div>
          </div>

          <div className="text-center text-vyapar-navy font-bold text-lg">↓</div>

          {/* Layer 3: Output & Verification */}
          <div className="bg-vyapar-navy text-white p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span className="font-serif font-bold text-sm">3. Verification & Report Generation</span>
              <span className="px-2 py-0.5 rounded bg-vyapar-saffron text-white text-[10px] font-bold">IMPLEMENTED</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] pt-1">
              <div className="bg-white/10 p-2.5 rounded border border-white/20">Structured Action Plan</div>
              <div className="bg-white/10 p-2.5 rounded border border-white/20">Detailed Project Report (DPR)</div>
              <div className="bg-white/10 p-2.5 rounded border border-white/20">SHA-256 Hash + Micro-QR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
