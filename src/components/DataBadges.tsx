import React from 'react';
import type { DataClassification, ConfidenceLevel } from '../types';
import { Info, CheckCircle2, AlertTriangle, Cpu, Calculator, UserCheck, Database, HelpCircle } from 'lucide-react';

interface DataBadgeProps {
  type: DataClassification;
  showInfoTooltip?: boolean;
}

export const DataBadge: React.FC<DataBadgeProps> = ({ type, showInfoTooltip = true }) => {
  const badgeStyles: Record<DataClassification, { bg: string; text: string; border: string; icon: React.ReactNode; tooltip: string }> = {
    'USER-PROVIDED': {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200',
      icon: <UserCheck className="w-3 h-3" />,
      tooltip: 'Entered or confirmed directly by you'
    },
    'CALCULATED': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      icon: <Calculator className="w-3 h-3" />,
      tooltip: 'Generated using strict mathematical/financial formulas'
    },
    'RETRIEVED': {
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-200',
      icon: <Database className="w-3 h-3" />,
      tooltip: 'Obtained from verified knowledge bases or datasets'
    },
    'DEMO': {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      icon: <AlertTriangle className="w-3 h-3" />,
      tooltip: 'Simulated sample data for prototype demonstration'
    },
    'AI-GENERATED': {
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-200',
      icon: <Cpu className="w-3 h-3" />,
      tooltip: 'AI-generated qualitative advisory and insights'
    },
    'UNKNOWN': {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-300',
      icon: <HelpCircle className="w-3 h-3" />,
      tooltip: 'Information unavailable or not provided'
    }
  };

  const style = badgeStyles[type] || badgeStyles['UNKNOWN'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`} title={showInfoTooltip ? style.tooltip : undefined}>
      {style.icon}
      <span>{type}</span>
    </span>
  );
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  reason?: string;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level, reason }) => {
  const styles: Record<ConfidenceLevel, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    'High': {
      bg: 'bg-vyapar-green/10',
      text: 'text-vyapar-green',
      border: 'border-vyapar-green/30',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    'Moderate': {
      bg: 'bg-amber-500/10',
      text: 'text-amber-700',
      border: 'border-amber-500/30',
      icon: <Info className="w-4 h-4" />
    },
    'Limited': {
      bg: 'bg-rose-500/10',
      text: 'text-rose-700',
      border: 'border-rose-500/30',
      icon: <AlertTriangle className="w-4 h-4" />
    }
  };

  const current = styles[level];

  return (
    <div className={`p-3 rounded-lg border ${current.bg} ${current.border} flex items-start gap-2.5`}>
      <div className={`${current.text} mt-0.5`}>{current.icon}</div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-vyapar-text-secondary font-bold">Recommendation Confidence</span>
          <span className={`text-sm font-bold ${current.text}`}>{level}</span>
        </div>
        {reason && <p className="text-xs text-vyapar-text-secondary mt-1">{reason}</p>}
      </div>
    </div>
  );
};
