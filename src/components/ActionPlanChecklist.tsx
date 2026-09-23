import React, { useState } from 'react';
import type { ActionStep } from '../types';
import { CheckSquare, Square, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ActionPlanChecklistProps {
  steps: ActionStep[];
}

export const ActionPlanChecklist: React.FC<ActionPlanChecklistProps> = ({ steps: initialSteps }) => {
  const { t } = useApp();
  const [steps, setSteps] = useState<ActionStep[]>(initialSteps);

  const toggleStep = (id: string) => {
    setSteps(prev =>
      prev.map(step =>
        step.id === id
          ? { ...step, status: step.status === 'Completed' ? 'Pending' : 'Completed' }
          : step
      )
    );
  };

  const completedCount = steps.filter(s => s.status === 'Completed').length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-vyapar-border p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-vyapar-border pb-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-vyapar-navy">
            {t('action.title', 'What Should You Do Next?')}
          </h3>
          <p className="text-xs text-vyapar-text-secondary mt-0.5">
            {t('action.sub', 'Step-by-step roadmap to move from decision to execution.')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-vyapar-text-secondary">
            {t('action.progress', 'Progress:')} {completedCount}/{steps.length} Tasks
          </span>
          <div className="w-24 bg-gray-100 h-2.5 rounded-full overflow-hidden border">
            <div className="bg-vyapar-green h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isDone = step.status === 'Completed';
          return (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                isDone
                  ? 'bg-vyapar-green/5 border-vyapar-green/30 opacity-75'
                  : 'bg-white border-vyapar-border hover:border-vyapar-navy shadow-sm'
              }`}
            >
              <button className="mt-0.5 text-vyapar-navy focus:outline-none">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-vyapar-green" />
                ) : (
                  <Square className="w-5 h-5 text-vyapar-text-secondary" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className={`font-serif font-bold text-sm ${isDone ? 'line-through text-vyapar-text-secondary' : 'text-vyapar-navy'}`}>
                    {idx + 1}. {step.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      step.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {step.priority} Priority
                    </span>
                    <span className="text-[11px] text-vyapar-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.estimatedEffort}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-vyapar-text-secondary">
                  <span className="font-semibold text-vyapar-text-primary">{t('action.reqInfo', 'Required info:')}</span> {step.requiredInformation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
