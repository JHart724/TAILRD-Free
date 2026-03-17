import React, { useState } from 'react';
import { Download, Database, Upload, Share2, Lock } from 'lucide-react';

interface HeaderProps {
  hasUploadedFiles: boolean;
  onBackToMain?: () => void;
}

const carmonaGradient: React.CSSProperties = {
  background: 'linear-gradient(145deg, #8C1F32, #9B2438, #7A1A2E)',
};

const Header: React.FC<HeaderProps> = ({ hasUploadedFiles }) => {
  const [showSharePanel, setShowSharePanel] = useState(false);

  const handleShareSummary = () => {
    // Generate a simple shareable summary text
    const summary = [
      'TAILRD — Cardiovascular Service Line Summary',
      '',
      '📊 Key Metrics (CMS Benchmark Data)',
      '• Total CV Patients: 12,480 (+6.2% YoY)',
      '• Annual Procedures: 8,340 (+6.6%)',
      '• CV Service Revenue: $142M (+9.9%)',
      '• Quality Composite: 91.2% (+2.9pts)',
      '• 30-Day Readmission: 14.8% (-2.5pts)',
      '• Avg Length of Stay: 5.2 days (-0.4d)',
      '',
      '💰 Identified Opportunities: $11.2M across 571 patients',
      '📈 Market Share: 34% (4 competitors identified)',
      '',
      'View the full interactive dashboard at tailrd.com',
    ].join('\n');

    navigator.clipboard.writeText(summary).then(() => {
      setShowSharePanel(true);
      setTimeout(() => setShowSharePanel(false), 3000);
    }).catch(() => {
      // Fallback: just show the panel
      setShowSharePanel(true);
      setTimeout(() => setShowSharePanel(false), 3000);
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Left side — data source badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-chrome-100 text-chrome-700 text-xs font-body font-medium px-2.5 py-1 rounded-full">
            <Database className="w-3 h-3" />
            CMS 2024
          </span>
          <span className="inline-flex items-center gap-1.5 bg-chrome-100 text-chrome-700 text-xs font-body font-medium px-2.5 py-1 rounded-full">
            <Database className="w-3 h-3" />
            AHA 2024
          </span>
          {hasUploadedFiles && (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-body font-medium px-2.5 py-1 rounded-full">
              <Upload className="w-3 h-3" />
              Uploaded Data
            </span>
          )}
        </div>

        {/* Right side — Share + Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShareSummary}
            className="inline-flex items-center gap-1.5 border border-chrome-300 text-chrome-700 hover:bg-chrome-50 px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-colors duration-150"
          >
            <Share2 className="w-4 h-4" />
            Share Summary
          </button>
          <div className="relative group">
            <button className="inline-flex items-center gap-1.5 border border-chrome-300 text-chrome-700 hover:bg-chrome-50 px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-colors duration-150 opacity-60 cursor-not-allowed">
              <Download className="w-4 h-4" />
              Export PDF
              <Lock className="w-3 h-3 text-titanium-400" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-titanium-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Detailed export available in Premium
            </div>
          </div>
        </div>
      </div>

      {/* Share confirmation toast */}
      {showSharePanel && (
        <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 flex items-center gap-2 animate-in fade-in">
          <Share2 className="w-4 h-4 text-emerald-600" />
          <p className="text-sm text-emerald-700 font-medium">Dashboard summary copied to clipboard — paste into email to share with your team</p>
        </div>
      )}
    </div>
  );
};

export default Header;
