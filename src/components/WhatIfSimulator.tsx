import React, { useState } from 'react';
import type { FinancialMetrics } from '../types';
import { DataBadge } from './DataBadges';
import { Sliders, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface WhatIfSimulatorProps {
  initialMetrics: FinancialMetrics;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ initialMetrics }) => {
  const { t } = useApp();
  const [revenue, setRevenue] = useState(initialMetrics.monthlyRevenue);
  const [rent, setRent] = useState(initialMetrics.monthlyExpenses.rent);
  const [inventory, setInventory] = useState(initialMetrics.monthlyExpenses.inventory);
  const [loanAmount, setLoanAmount] = useState(initialMetrics.fundingRequirement);
  const interestRate = 9.5; // % p.a.
  const loanTenureYears = 5;
  const otherExpenses = 
    initialMetrics.monthlyExpenses.salaries +
    initialMetrics.monthlyExpenses.utilities +
    initialMetrics.monthlyExpenses.transport +
    initialMetrics.monthlyExpenses.marketing +
    initialMetrics.monthlyExpenses.other;

  // Deterministic EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = (principal: number, ratePerYear: number, years: number) => {
    if (principal <= 0) return 0;
    const monthlyRate = ratePerYear / 12 / 100;
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI(loanAmount, interestRate, loanTenureYears);
  const totalExpenses = rent + inventory + otherExpenses + emi;
  const netProfit = revenue - totalExpenses;
  const marginPercent = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0;
  const breakEvenMonths = netProfit > 0 ? Math.ceil(initialMetrics.totalProjectCost / netProfit) : 999;

  const applyScenario = (type: 'best' | 'expected' | 'worst') => {
    if (type === 'best') {
      setRevenue(Math.round(initialMetrics.monthlyRevenue * 1.25));
      setRent(initialMetrics.monthlyExpenses.rent);
      setInventory(Math.round(initialMetrics.monthlyExpenses.inventory * 0.95));
    } else if (type === 'expected') {
      setRevenue(initialMetrics.monthlyRevenue);
      setRent(initialMetrics.monthlyExpenses.rent);
      setInventory(initialMetrics.monthlyExpenses.inventory);
    } else if (type === 'worst') {
      setRevenue(Math.round(initialMetrics.monthlyRevenue * 0.8));
      setInventory(Math.round(initialMetrics.monthlyExpenses.inventory * 1.15));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-vyapar-border p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-vyapar-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-vyapar-saffron" />
            <h3 className="text-xl font-serif font-bold text-vyapar-navy">
              {t('whatif.title', 'What-If Financial Simulator')}
            </h3>
            <DataBadge type="CALCULATED" />
          </div>
          <p className="text-xs text-vyapar-text-secondary mt-1">
            {t('whatif.desc', 'Test sensitivity to market changes. All metrics update instantly via deterministic financial logic.')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button onClick={() => applyScenario('best')} className="px-2.5 py-1 rounded border border-vyapar-green/40 text-vyapar-green hover:bg-vyapar-green/10">
            {t('whatif.best', 'Best Case')}
          </button>
          <button onClick={() => applyScenario('expected')} className="px-2.5 py-1 rounded border border-vyapar-navy/40 text-vyapar-navy hover:bg-vyapar-navy/10">
            {t('whatif.expected', 'Expected')}
          </button>
          <button onClick={() => applyScenario('worst')} className="px-2.5 py-1 rounded border border-vyapar-danger/40 text-vyapar-danger hover:bg-vyapar-danger/10">
            {t('whatif.worst', 'Worst Case')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders Control Panel */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-vyapar-navy mb-1">
              <span>{t('whatif.revenue', 'Estimated Monthly Revenue')}</span>
              <span>₹{revenue.toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min={initialMetrics.monthlyRevenue * 0.5}
              max={initialMetrics.monthlyRevenue * 2}
              step={5000}
              value={revenue}
              onChange={e => setRevenue(Number(e.target.value))}
              className="w-full accent-vyapar-navy"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-vyapar-navy mb-1">
              <span>{t('whatif.rent', 'Monthly Shop Rent')}</span>
              <span>₹{rent.toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min={1000}
              max={30000}
              step={500}
              value={rent}
              onChange={e => setRent(Number(e.target.value))}
              className="w-full accent-vyapar-navy"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-vyapar-navy mb-1">
              <span>{t('whatif.inv', 'Inventory & Raw Materials')}</span>
              <span>₹{inventory.toLocaleString()} / mo</span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={2000}
              value={inventory}
              onChange={e => setInventory(Number(e.target.value))}
              className="w-full accent-vyapar-navy"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-vyapar-navy mb-1">
              <span>{t('whatif.loan', 'Bank Loan Financing')}</span>
              <span>₹{loanAmount.toLocaleString()} @ {interestRate}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={initialMetrics.totalProjectCost}
              step={10000}
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              className="w-full accent-vyapar-navy"
            />
          </div>
        </div>

        {/* Real-time Calculation Results Card */}
        <div className="bg-vyapar-ivory p-5 rounded-xl border border-vyapar-border flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-vyapar-text-secondary">
              {t('whatif.outcome', 'Simulated Financial Outcome')}
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg border border-vyapar-border">
                <span className="text-xs text-vyapar-text-secondary block">
                  {t('whatif.netProfit', 'Monthly Net Profit')}
                </span>
                <span className={`text-xl font-bold font-serif ${netProfit >= 0 ? 'text-vyapar-green' : 'text-vyapar-danger'}`}>
                  ₹{netProfit.toLocaleString()}
                </span>
                <span className="text-[10px] text-vyapar-text-secondary block mt-0.5">{marginPercent}% Profit Margin</span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-vyapar-border">
                <span className="text-xs text-vyapar-text-secondary block">
                  {t('whatif.emi', 'Estimated Monthly EMI')}
                </span>
                <span className="text-xl font-bold font-serif text-vyapar-navy">
                  ₹{emi.toLocaleString()}
                </span>
                <span className="text-[10px] text-vyapar-text-secondary block mt-0.5">{loanTenureYears} yrs @ {interestRate}%</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-vyapar-border space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-vyapar-text-secondary">{t('whatif.totalExp', 'Total Operating Expenses:')}</span>
                <span className="font-semibold text-vyapar-navy">₹{totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-vyapar-text-secondary">{t('whatif.breakeven', 'Estimated Investment Recoup:')}</span>
                <span className="font-semibold text-vyapar-navy">
                  {breakEvenMonths > 120 ? 'Over 10 Years' : `${breakEvenMonths} Months`}
                </span>
              </div>
            </div>
          </div>

          {netProfit < 0 && (
            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-lg flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Warning: Operating expenses exceed expected revenue in this scenario.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
