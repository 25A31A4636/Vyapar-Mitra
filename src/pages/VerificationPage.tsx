import { useLocation } from 'react-router-dom';
import { DprVerification } from '../components/DprVerification';
import type { DPRDocument } from '../types';

export default function VerificationPage() {
  const location = useLocation();
  const dpr = (location.state as { dpr?: DPRDocument })?.dpr;

  const fallbackDpr: DPRDocument = {
    dprId: 'DPR-VM-2026-9842',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    generatedTimestamp: new Date().toISOString(),
    entrepreneurName: 'Ramesh Kumar',
    businessName: 'Modern Kirana & Essential Goods Store',
    location: 'Tenali, Guntur',
    totalInvestment: 280000,
    ownContribution: 112000,
    loanRequested: 168000,
    projectedMonthlyRevenue: 95000,
    projectedMonthlyProfit: 17500,
    breakEvenPeriodMonths: 16,
    repaymentTenureYears: 5,
    estimatedEmi: 2850,
    swotAnalysis: {
      strengths: ['High daily consumption demand'],
      weaknesses: ['Working capital sensitive'],
      opportunities: ['Digital payments inclusion'],
      threats: ['New road competition']
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <DprVerification dpr={dpr || fallbackDpr} />
    </div>
  );
}
