import React, { useState } from 'react';
import SectionCard from '../../../design-system/SectionCard';
import Badge from '../../../design-system/Badge';
import DotScale from '../../../design-system/DotScale';
import { BenchmarkPosition } from '../types';

interface BenchmarkPositioningProps {
  hasUploadedFiles: boolean;
  positions: BenchmarkPosition[];
}

const BENCHMARK_CONTEXT: Record<string, string> = {
  'Mortality Rate': 'Your mortality rate is below the national average, indicating strong acute care outcomes. Continued improvement toward top decile could strengthen your CMS Star Rating by 0.5 stars.',
  'Readmission Rate': 'Each 1% reduction in readmissions saves approximately $340K in HRRP penalties. Your current trajectory suggests further improvement is achievable through transitional care protocols.',
  'Length of Stay': 'LOS is trending toward top decile. Reaching 4.1 days would free approximately 1,200 bed-days annually for additional case capacity.',
  'Quality Composite': 'Your composite score positions you above the 75th percentile nationally. Closing the gap to top decile could add ~$1.4M in VBP bonuses.',
  'Case Mix Index': 'CMI of 1.42 reflects a higher-acuity patient population. This supports stronger reimbursement but requires documentation accuracy to maintain.',
  'Physician Efficiency': 'Measures resource utilization per case-adjusted discharge. Variation across your physician panel suggests coaching opportunities for bottom-quartile performers.',
};

const BenchmarkPositioning: React.FC<BenchmarkPositioningProps> = ({
  hasUploadedFiles,
  positions,
}) => {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  return (
    <SectionCard
      title="Benchmark Positioning"
      subtitle="Your Performance vs. National Standards"
      headerRight={
        <Badge variant={hasUploadedFiles ? 'verified' : 'estimate'} />
      }
    >
      <div className="space-y-6">
        {positions.map((pos) => {
          const isExpanded = expandedMetric === pos.metric;
          const context = BENCHMARK_CONTEXT[pos.metric];

          return (
            <div
              key={pos.metric}
              className="cursor-pointer hover:bg-chrome-50 rounded-lg px-2 -mx-2 py-1 transition-colors"
              onClick={() => setExpandedMetric(prev => prev === pos.metric ? null : pos.metric)}
            >
              <DotScale
                label={pos.metric}
                value={pos.value}
                min={pos.min}
                max={pos.max}
                nationalAvg={pos.nationalAvg}
                unit={pos.unit}
                lowerIsBetter={pos.lowerIsBetter}
              />
              {isExpanded && context && (
                <div className="bg-chrome-50 border border-chrome-100 rounded-lg p-3 mt-2 text-xs text-titanium-500 leading-snug">
                  {context}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default BenchmarkPositioning;
