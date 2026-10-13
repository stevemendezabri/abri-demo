import React from 'react';
import { getCurrentWeekDate } from '../utils/dateUtils';

export default function Header({ navTabs, activeTab, setActiveTab }) {
  return (
    <header className="h-11 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex space-x-6 text-xs font-medium text-gray-500 h-full">
        {navTabs.map((t) => {
          const tabDisplayName = t.headerName || t.name;
          const isActive = activeTab === t.name || activeTab === t.headerName;
          return (
            <button 
              key={t.name}
              onClick={() => setActiveTab(t.name)}
              className={`h-full border-b-2 flex items-center px-1 transition-colors ${
                isActive ? 'border-amber-500 text-amber-600 font-semibold' : 'border-transparent hover:text-gray-800'
              }`}
            >
              {tabDisplayName}
            </button>
          );
        })}
      </div>

      <div className="text-[11px] text-gray-400 flex items-center space-x-3">
        <span className="flex items-center text-amber-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span> 4 Items Need Attention
        </span>
        <span className="text-xs text-gray-400">
          Updated {getCurrentWeekDate()}
        </span>
      </div>
    </header>
  );
}