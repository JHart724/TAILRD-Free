import React, { useState, useEffect } from 'react';
import {
  Heart,
  Zap,
  Stethoscope,
  GitBranch,
  CircuitBoard,
  Activity,
  ChevronLeft,
  ChevronRight,
  Settings,
  UserCircle,
  LayoutDashboard,
} from 'lucide-react';

const STORAGE_KEY = 'tailrd-sidebar-expanded';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  glowColor: string;
  accentBg: string;
}

// Approved module palette — no purple/violet
const moduleNavItems: NavItem[] = [
  { label: 'Cardiovascular Service Line', icon: Activity, path: '/cv', glowColor: '#D4707F', accentBg: 'rgba(155, 36, 56, 0.15)' },
  { label: 'Heart Failure',        icon: Heart,        path: '/hf',         glowColor: '#C8D4DC', accentBg: 'rgba(200, 212, 220, 0.15)' },
  { label: 'Electrophysiology',    icon: Zap,          path: '/ep',         glowColor: '#8FA8BC', accentBg: 'rgba(143, 168, 188, 0.15)' },
  { label: 'Structural Heart',     icon: Stethoscope,  path: '/structural', glowColor: '#D4707F', accentBg: 'rgba(155, 36, 56, 0.15)' },
  { label: 'Coronary',             icon: GitBranch,     path: '/coronary',   glowColor: '#5CAA72', accentBg: 'rgba(26, 74, 46, 0.15)' },
  { label: 'Valvular',             icon: CircuitBoard,  path: '/valvular',   glowColor: '#D4B85C', accentBg: 'rgba(139, 105, 20, 0.15)' },
  { label: 'Peripheral Vascular',  icon: Activity,      path: '/peripheral', glowColor: '#7B8698', accentBg: 'rgba(46, 52, 64, 0.15)' },
];

// The active item in the free tier — Cardiovascular Service Line
const ACTIVE_LABEL = 'Cardiovascular Service Line';

function getInitialExpanded(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === 'true';
  } catch {
    // localStorage unavailable
  }
  return true;
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean>(getInitialExpanded);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(expanded));
    } catch {
      // localStorage unavailable
    }
  }, [expanded]);

  return (
    <aside
      className={`
        sidebar-dark sidebar-container flex flex-col h-screen shrink-0
        transition-[width] duration-200 ease-in-out
        ${expanded ? 'w-60' : 'w-16'}
      `}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-white/[0.08] relative z-[1]">
        {expanded && (
          <button
            onClick={() => {}}
            className="font-display text-lg tracking-wide hover:opacity-80 transition-opacity sidebar-logo-text"
            style={{
              background: 'linear-gradient(135deg, #C8D4DC 0%, #8FA8BC 40%, #F0F5FA 60%, #C8D4DC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TAILRD
          </button>
        )}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="p-1.5 rounded-md transition-colors relative z-[1]"
          style={{ color: 'rgba(180,210,240,0.42)' }}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
      {expanded && (
        <div className="px-3 relative z-[1]">
          <div className="sb-live">
            <div className="sb-live-dot"></div>
            <span>Live · Updated 2m ago</span>
          </div>
        </div>
      )}

      {/* Module Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto relative z-[1]">
        {/* Home / Dashboard — non-active, shows tooltip */}
        <div className="relative group">
          <button
            onClick={() => {}}
            title={!expanded ? 'Dashboard' : undefined}
            className={`
              flex items-center w-full rounded-lg transition-all duration-200 mb-2
              ${expanded ? 'px-3 py-2.5 gap-3' : 'justify-center px-0 py-2.5'}
              sidebar-nav-item
            `}
          >
            <LayoutDashboard size={18} className="shrink-0" />
            {expanded && <span className="text-sm font-medium truncate">Dashboard</span>}
          </button>
          {expanded && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-titanium-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Available in full platform
            </div>
          )}
        </div>
        <div className="border-t border-white/[0.06] mb-2" />

        {moduleNavItems.map((item) => {
          const Icon = item.icon;
          const isServiceLine = item.label === ACTIVE_LABEL;

          return (
            <div key={item.path} className="relative group">
              <button
                onClick={() => {}}
                title={!expanded ? item.label : undefined}
                className={`
                  flex items-center w-full rounded-lg transition-all duration-200
                  ${expanded ? 'px-3 py-2.5 gap-3' : 'justify-center px-0 py-2.5'}
                  ${isServiceLine ? 'sidebar-nav-item-active' : 'sidebar-nav-item'}
                `}
              >
                {isServiceLine && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: '#9B2438',
                      boxShadow: '0 0 6px rgba(155, 36, 56, 0.6), 0 0 12px rgba(155, 36, 56, 0.3)',
                    }}
                  />
                )}
                <Icon size={18} className="shrink-0" />
                {expanded && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
              {expanded && !isServiceLine && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-titanium-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Available in full platform
                </div>
              )}
            </div>
          );
        })}

      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/[0.08] py-3 px-2 space-y-1 relative z-[1]">
        <div className="relative group">
          <button
            onClick={() => {}}
            className={`
              flex items-center rounded-lg transition-colors w-full
              ${expanded ? 'px-3 py-2 gap-3' : 'justify-center py-2'}
              sidebar-nav-item
            `}
          >
            <Settings size={18} className="shrink-0" />
            {expanded && <span className="text-sm">Settings</span>}
          </button>
          {expanded && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-titanium-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Available in full platform
            </div>
          )}
        </div>
        <div className="relative group">
          <button
            onClick={() => {}}
            className={`
              flex items-center rounded-lg transition-colors w-full
              ${expanded ? 'px-3 py-2 gap-3' : 'justify-center py-2'}
              sidebar-nav-item
            `}
          >
            <UserCircle size={18} className="shrink-0" />
            {expanded && <span className="text-sm">Profile</span>}
          </button>
          {expanded && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-titanium-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Available in full platform
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}
