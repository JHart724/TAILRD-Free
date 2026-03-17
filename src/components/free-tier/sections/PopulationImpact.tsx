import React, { useState } from 'react';
import {
  Heart,
  Users,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Activity,
  Search,
  ClipboardCheck,
  Syringe,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import CountUpModule from 'react-countup';
const CountUp = (CountUpModule as any).default ?? CountUpModule;
import SectionCard from '../../../design-system/SectionCard';
import Badge from '../../../design-system/Badge';
import { PopulationStat } from '../types';

interface PopulationImpactProps {
  hasUploadedFiles: boolean;
  clinicalImpact: PopulationStat[];
  populationHealth: PopulationStat[];
}

const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Activity,
  Users,
  Search,
  ClipboardCheck,
  Syringe,
};

const STAT_CONTEXT: Record<string, string> = {
  'Lives Saved': 'Estimated based on mortality rate improvements across STEMI response times, HF readmission reduction, and surgical complication avoidance protocols.',
  'Prevented Readmissions': 'Averted through transitional care management, post-discharge follow-up within 48 hours, and medication reconciliation programs.',
  'Quality Wins': 'Patients who achieved quality measure targets (GDMT compliance, BP control, anticoagulation adherence) that they previously did not meet.',
  'Guideline Adherence': 'Composite score across ACC/AHA clinical practice guidelines for HF, CAD, AF, and valvular disease management.',
  'Active Patient Panel': 'Total unique CV patients with at least one encounter in the past 12 months. Panel growth indicates market share gains.',
  'Preventive Screenings': 'Includes lipid panels, echocardiograms, stress tests, and other guideline-recommended screenings completed on schedule.',
  'Registry Submissions': 'Cases submitted to national registries (NCDR, STS, GWTG). Higher submission rates improve quality benchmarking accuracy.',
  'Vaccine Coverage': 'Influenza and pneumococcal vaccination rates among CV patients — a CMS quality measure tied to VBP scoring.',
};

const StatRow: React.FC<{
  stat: PopulationStat;
  hasUploadedFiles: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ stat, hasUploadedFiles, isExpanded, onToggle }) => {
  const IconComponent = iconMap[stat.icon] ?? Activity;
  const displayValue = hasUploadedFiles ? stat.stateBValue : stat.stateAValue;
  const context = STAT_CONTEXT[stat.label];

  return (
    <div
      className="p-3 bg-chrome-50 rounded-lg cursor-pointer hover:bg-chrome-100 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-4 h-4 text-chrome-600" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="text-sm font-body text-titanium-600">{stat.label}</div>
          <div className="font-data text-lg font-bold text-titanium-800">
            {stat.unit === 'percent' ? (
              <CountUp
                end={displayValue}
                duration={1.5}
                decimals={1}
                suffix="%"
                preserveValue
              />
            ) : (
              <CountUp
                end={displayValue}
                duration={1.5}
                separator=","
                preserveValue
              />
            )}
          </div>
        </div>

        {/* Trend */}
        {stat.trend && (
          <div
            className={`flex items-center gap-1 ${
              stat.trend.direction === 'up'
                ? 'text-emerald-600'
                : 'text-arterial-600'
            }`}
          >
            {stat.trend.direction === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-body">{stat.trend.value}</span>
          </div>
        )}
      </div>

      {isExpanded && context && (
        <div className="bg-white border border-chrome-100 rounded-lg p-2.5 mt-2 text-xs text-titanium-500 leading-snug">
          {context}
        </div>
      )}
    </div>
  );
};

const PopulationImpact: React.FC<PopulationImpactProps> = ({
  hasUploadedFiles,
  clinicalImpact,
  populationHealth,
}) => {
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const toggleStat = (label: string) => setExpandedStat(prev => prev === label ? null : label);

  return (
    <SectionCard
      title="Population & Clinical Impact"
      subtitle="Estimated Community Health Outcomes"
      headerRight={
        <Badge variant={hasUploadedFiles ? 'verified' : 'estimate'} />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Clinical Impact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-arterial-600" />
            <span className="text-base font-body font-semibold text-titanium-800">
              Clinical Impact
            </span>
          </div>
          <div className="space-y-3">
            {clinicalImpact.map((stat) => (
              <StatRow
                key={stat.label}
                stat={stat}
                hasUploadedFiles={hasUploadedFiles}
                isExpanded={expandedStat === stat.label}
                onToggle={() => toggleStat(stat.label)}
              />
            ))}
          </div>
        </div>

        {/* Right column: Population Health */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-chrome-600" />
            <span className="text-base font-body font-semibold text-titanium-800">
              Population Health
            </span>
          </div>
          <div className="space-y-3">
            {populationHealth.map((stat) => (
              <StatRow
                key={stat.label}
                stat={stat}
                hasUploadedFiles={hasUploadedFiles}
                isExpanded={expandedStat === stat.label}
                onToggle={() => toggleStat(stat.label)}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default PopulationImpact;
