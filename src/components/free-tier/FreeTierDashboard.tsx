import React, { useState, useCallback } from 'react';

// Data imports
import {
  CMS_KPIS,
  QUALITY_BENCHMARKS,
  MODULE_TILES,
  CARE_GAP_FUNNELS,
  DRG_TABLE_DATA,
  FINANCIAL_SUMMARY,
  BENCHMARK_POSITIONS,
  MARGIN_OPPORTUNITIES,
  CLINICAL_IMPACT,
  POPULATION_HEALTH,
} from './data';

// Section imports
import Header from './sections/Header';
import KPIStrip from './sections/KPIStrip';
import QualityBenchmark from './sections/QualityBenchmark';
import CommandGrid from './sections/CommandGrid';
import CareGapFunnels from './sections/CareGapFunnels';
import ReferralLeakage from './sections/ReferralLeakage';
import FinancialBenchmarking from './sections/FinancialBenchmarking';
import DRGProcedureLOS from './sections/DRGProcedureLOS';
import BenchmarkPositioning from './sections/BenchmarkPositioning';
import PopulationImpact from './sections/PopulationImpact';
import PremiumUnlock from './sections/PremiumUnlock';
import RevenueRecoveryCalculator from './sections/RevenueRecoveryCalculator';
import AIInsightCards from './sections/AIInsightCards';
import PhysicianVarianceTeaser from './sections/PhysicianVarianceTeaser';
import CompetitorMarketShare from './sections/CompetitorMarketShare';
import OpportunityBanner from './sections/OpportunityBanner';
import ClinicalTrialEnrollment from './sections/ClinicalTrialEnrollment';
import RegistryEligibility from './sections/RegistryEligibility';

interface FreeTierDashboardProps {
  backToMain?: () => void;
}

const FreeTierDashboard: React.FC<FreeTierDashboardProps> = ({ backToMain }) => {
  const hasUploadedFiles = false;
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const handleModuleClick = useCallback((moduleId: string) => {
    setExpandedModule(prev => prev === moduleId ? null : moduleId);
  }, []);

  return (
    <div className="min-h-screen bg-chrome-50 p-6">
      <div className="max-w-[120rem] mx-auto space-y-6">
        {/* Header */}
        <Header hasUploadedFiles={false} onBackToMain={backToMain} />

        {/* 1. Top Banner */}
        <OpportunityBanner />

        {/* 2. KPI Row */}
        <KPIStrip hasUploadedFiles={hasUploadedFiles} kpis={CMS_KPIS} />

        {/* 3. Service Line Command Center */}
        <CommandGrid
          modules={MODULE_TILES}
          expandedModule={expandedModule}
          onModuleClick={handleModuleClick}
        />

        {/* 4. Quality & Outcomes Benchmarking */}
        <QualityBenchmark hasUploadedFiles={hasUploadedFiles} benchmarks={QUALITY_BENCHMARKS} />

        {/* 5. Competitive Market Intelligence */}
        <CompetitorMarketShare />

        {/* 6. Financial Benchmarking */}
        <FinancialBenchmarking
          hasUploadedFiles={hasUploadedFiles}
          financialSummary={FINANCIAL_SUMMARY}
          drgData={DRG_TABLE_DATA}
          marginOpportunities={MARGIN_OPPORTUNITIES}
        />

        {/* 6b. Benchmark Positioning */}
        <BenchmarkPositioning hasUploadedFiles={hasUploadedFiles} positions={BENCHMARK_POSITIONS} />

        {/* 7. Population & Clinical Impact */}
        <PopulationImpact
          hasUploadedFiles={hasUploadedFiles}
          clinicalImpact={CLINICAL_IMPACT}
          populationHealth={POPULATION_HEALTH}
        />

        {/* 8. Revenue Recovery Calculator */}
        <RevenueRecoveryCalculator />

        {/* 9. AI-Detected Insights */}
        <AIInsightCards />

        {/* 10. Care Gap Analysis */}
        <CareGapFunnels funnels={CARE_GAP_FUNNELS} hasUploadedFiles={hasUploadedFiles} />

        {/* 11. Physician Performance Variance */}
        <PhysicianVarianceTeaser />

        {/* 12. DRG Volume & Reimbursement */}
        <DRGProcedureLOS hasUploadedFiles={hasUploadedFiles} />

        {/* 13. Referral Leakage Analysis */}
        <ReferralLeakage hasUploadedFiles={hasUploadedFiles} />

        {/* 14. Clinical Trial Enrollment */}
        <ClinicalTrialEnrollment />

        {/* 15. Registry Eligibility */}
        <RegistryEligibility />

        {/* 16. Upgrade CTA */}
        <PremiumUnlock />
      </div>
    </div>
  );
};

export default FreeTierDashboard;
