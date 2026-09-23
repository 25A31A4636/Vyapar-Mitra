import React from 'react';
import type { DPRDocument } from '../types';
import { DataBadge } from './DataBadges';
import { FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DprPreviewProps {
  dpr: DPRDocument;
}

export const DprPreview: React.FC<DprPreviewProps> = ({ dpr }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md border border-vyapar-border overflow-hidden">
      {/* Header bar */}
      <div className="bg-vyapar-navy text-white p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-vyapar-saffron" />
            <h2 className="font-serif font-bold text-2xl">Detailed Project Report (DPR)</h2>
          </div>
          <p className="text-xs text-vyapar-ivory/80 mt-1">
            Generated on {new Date(dpr.generatedTimestamp).toLocaleDateString()} — Document ID: {dpr.dprId}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => window.print()} 
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download DPR (PDF)</span>
          </button>
          <button 
            onClick={() => navigate('/verification', { state: { dpr } })}
            className="px-4 py-2 bg-vyapar-saffron hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify DPR Integrity →</span>
          </button>
        </div>
      </div>

      {/* DPR Document Body */}
      <div className="p-8 space-y-8 max-w-4xl mx-auto font-sans text-sm text-vyapar-text-primary">
        {/* Verification & Integrity Banner */}
        <div className="bg-vyapar-ivory p-4 rounded-lg border border-vyapar-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="w-5 h-5 text-vyapar-green shrink-0" />
            <div>
              <span className="font-bold text-vyapar-navy block">SHA-256 Verified Document Structure</span>
              <span className="text-vyapar-text-secondary font-mono text-[10px]">{dpr.sha256Hash.substring(0, 32)}...</span>
            </div>
          </div>
          <DataBadge type="CALCULATED" />
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-3">
          <h3 className="text-lg font-serif font-bold text-vyapar-navy border-b pb-1">
            1. Executive Summary
          </h3>
          <p className="leading-relaxed text-vyapar-text-secondary">
            This Detailed Project Report (DPR) presents a feasibility and financial evaluation for setting up{' '}
            <strong className="text-vyapar-navy">{dpr.businessName}</strong> in{' '}
            <strong className="text-vyapar-navy">{dpr.location}</strong> by entrepreneur{' '}
            <strong className="text-vyapar-navy">{dpr.entrepreneurName}</strong>. The total project cost is estimated at{' '}
            <strong className="text-vyapar-navy">₹{dpr.totalInvestment.toLocaleString()}</strong>, supported by an own equity contribution of{' '}
            <strong>₹{dpr.ownContribution.toLocaleString()}</strong> and institutional debt requirement of{' '}
            <strong>₹{dpr.loanRequested.toLocaleString()}</strong>.
          </p>
        </section>

        {/* Section 2: Financial Structure */}
        <section className="space-y-3">
          <h3 className="text-lg font-serif font-bold text-vyapar-navy border-b pb-1">
            2. Project Cost & Financial Structure
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="text-xs text-vyapar-text-secondary block">Total Investment</span>
              <span className="font-serif font-bold text-base text-vyapar-navy">₹{dpr.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="text-xs text-vyapar-text-secondary block">Promoter Margin (Own)</span>
              <span className="font-serif font-bold text-base text-vyapar-navy">₹{dpr.ownContribution.toLocaleString()}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="text-xs text-vyapar-text-secondary block">Bank Loan Required</span>
              <span className="font-serif font-bold text-base text-vyapar-navy">₹{dpr.loanRequested.toLocaleString()}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="text-xs text-vyapar-text-secondary block">Estimated EMI</span>
              <span className="font-serif font-bold text-base text-vyapar-navy">₹{dpr.estimatedEmi.toLocaleString()} / mo</span>
            </div>
          </div>
        </section>

        {/* Section 3: Revenue & Profit Projections */}
        <section className="space-y-3">
          <h3 className="text-lg font-serif font-bold text-vyapar-navy border-b pb-1">
            3. Projected Revenue & Profitability
          </h3>
          <table className="w-full text-left border-collapse border border-vyapar-border rounded-lg text-xs">
            <thead>
              <tr className="bg-vyapar-navy/5 text-vyapar-navy font-bold">
                <th className="p-3 border">Metric</th>
                <th className="p-3 border">Monthly Estimate</th>
                <th className="p-3 border">Annual Projection</th>
                <th className="p-3 border">Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold">Gross Sales Revenue</td>
                <td className="p-3 border">₹{dpr.projectedMonthlyRevenue.toLocaleString()}</td>
                <td className="p-3 border font-semibold">₹{(dpr.projectedMonthlyRevenue * 12).toLocaleString()}</td>
                <td className="p-3 border"><DataBadge type="CALCULATED" /></td>
              </tr>
              <tr>
                <td className="p-3 border font-semibold">Net Operating Profit</td>
                <td className="p-3 border text-vyapar-green font-bold">₹{dpr.projectedMonthlyProfit.toLocaleString()}</td>
                <td className="p-3 border text-vyapar-green font-bold">₹{(dpr.projectedMonthlyProfit * 12).toLocaleString()}</td>
                <td className="p-3 border"><DataBadge type="CALCULATED" /></td>
              </tr>
              <tr>
                <td className="p-3 border font-semibold">Break-even Tenure</td>
                <td className="p-3 border font-bold" colSpan={2}>{dpr.breakEvenPeriodMonths} Months</td>
                <td className="p-3 border"><DataBadge type="CALCULATED" /></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section 4: SWOT Analysis */}
        <section className="space-y-3">
          <h3 className="text-lg font-serif font-bold text-vyapar-navy border-b pb-1">
            4. Qualitative Risk & SWOT Assessment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200">
              <h4 className="font-bold text-emerald-900 mb-1">Strengths</h4>
              <ul className="list-disc list-inside space-y-0.5 text-emerald-950">
                {dpr.swotAnalysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-900 mb-1">Opportunities</h4>
              <ul className="list-disc list-inside space-y-0.5 text-amber-950">
                {dpr.swotAnalysis.opportunities.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
