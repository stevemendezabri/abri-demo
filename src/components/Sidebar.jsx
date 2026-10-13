import React from 'react';
import { Database } from 'lucide-react';
import atpLogo from '../assets/ATP Logo.png'; // Adjust filename/path if needed

export default function Sidebar({ navTabs, activeTab, setActiveTab }) {
  return (
    <aside className="w-56 bg-[#111827] text-gray-300 flex flex-col justify-between border-r border-gray-800 shrink-0">
      <div>
        {/* Top Header */}
        <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-bold text-xs text-gray-900">
            AL
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">Austin Light Rail</span>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold px-2 py-1">Dashboards</div>
          {navTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name || activeTab === item.headerName;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-md font-medium transition-colors ${
                  isActive ? 'bg-[#1F2937] text-amber-400 font-semibold' : 'hover:bg-gray-800 text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        {/* Logo positioned directly above Engine Status */}
        <div className="px-4 py-3 border-t border-gray-800 flex justify-center">
          <img src={atpLogo} alt="Austin Transit Partnership" className="h-8 w-auto object-contain" />
        </div>

        {/* Engine Status */}
        <div className="p-3 border-t border-gray-800 text-[11px] text-gray-500 flex items-center justify-between">
          <span>Engine Status</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <Database className="w-3 h-3" />
            <span>DuckDB WASM</span>
          </span>
        </div>
      </div>
    </aside>
  );
}