import React from 'react';
import { Lock } from 'lucide-react';
import SectionCard from '../../../design-system/SectionCard';

interface ReferralLeakageProps {
  hasUploadedFiles: boolean;
}

const LEAKAGE_BARS = [
  { label: 'Cardiology', value: 68 },
  { label: 'Cardiac Surgery', value: 52 },
  { label: 'Vascular', value: 38 },
  { label: 'Electrophysiology', value: 32 },
  { label: 'Radiology', value: 22 },
];

const carmonaGradient: React.CSSProperties = {
  background: 'linear-gradient(145deg, #8C1F32, #9B2438, #7A1A2E)',
};

const ReferralLeakage: React.FC<ReferralLeakageProps> = () => {
  return (
    <SectionCard title="Referral Leakage Intelligence" subtitle="Network Retention Analysis">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Leakage Rate', value: '12.4%', color: 'text-arterial-600' },
          { label: 'Lost Revenue', value: '$8.2M', color: 'text-titanium-800' },
          { label: 'Retained Referrals', value: '87.6%', color: 'text-emerald-600' },
          { label: 'Top Destinations', value: '14', color: 'text-titanium-800' },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-3 bg-chrome-50 rounded-lg">
            <div className={`font-data text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-body text-titanium-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Leakage by Department */}
      <div className="space-y-3">
        <div className="text-xs font-body font-semibold uppercase tracking-wider text-titanium-400 mb-2">
          Leakage by Department
        </div>

        {/* Top destination — fully visible */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-body text-titanium-600 w-36 flex-shrink-0">{LEAKAGE_BARS[0].label}</span>
          <div className="flex-1 h-6 bg-chrome-100 rounded-md overflow-hidden">
            <div
              className="h-full bg-arterial-400 rounded-md"
              style={{ width: `${LEAKAGE_BARS[0].value}%` }}
            />
          </div>
          <span className="text-sm font-data text-titanium-500 w-10 text-right">{LEAKAGE_BARS[0].value}%</span>
        </div>

        <div className="bg-chrome-50 border border-chrome-100 rounded-lg p-3 text-xs space-y-1.5">
          <p className="text-titanium-600">
            <span className="font-semibold text-titanium-700">Top leaking destination:</span>{' '}
            Competitor A — Cardiology — 34% of leaked referrals
          </p>
          <p className="text-titanium-500">
            Primary driver: Outpatient cardiology consults from 3 referring physician offices in ZIP 30318
          </p>
        </div>

        {/* Remaining bars — blurred with lock */}
        <div className="relative">
          <div
            style={{ filter: 'blur(8px)', userSelect: 'none', pointerEvents: 'none' }}
            aria-hidden="true"
          >
            {LEAKAGE_BARS.slice(1).map((bar) => (
              <div key={bar.label} className="flex items-center gap-3 mb-3">
                <span className="text-sm font-body text-titanium-600 w-36 flex-shrink-0">{bar.label}</span>
                <div className="flex-1 h-6 bg-chrome-100 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-chrome-400 rounded-md"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
                <span className="text-sm font-data text-titanium-500 w-10 text-right">{bar.value}%</span>
              </div>
            ))}
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2 text-center px-6">
              <Lock className="w-7 h-7 text-titanium-400" />
              <p className="text-sm font-semibold text-titanium-600">
                4 more departments with leakage data
              </p>
              <p className="text-xs text-titanium-500 max-w-xs leading-snug">
                See which physicians are sending cases out, full destination mapping, and recovery strategies
              </p>
              <button
                type="button"
                className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
                style={carmonaGradient}
              >
                Unlock Referral Intelligence →
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default ReferralLeakage;
