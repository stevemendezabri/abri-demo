import React from 'react';

export default function RowSequencingBoard() {
  const columns = [
    {
      id: 'in-negotiation',
      title: 'IN NEGOTIATION',
      items: [
        {
          id: 'ROW-104',
          name: 'Guadalupe St Transit Lane Expansion',
          owner: 'University Heritage Properties',
          targetAccess: 'Nov 2026',
          estValuation: '$1.4M',
          priority: 'High',
          priorityColor: 'bg-red-100 text-red-700 border-red-200'
        },
        {
          id: 'ROW-108',
          name: 'Station 2 Entry Plaza & Kiss-and-Ride',
          owner: 'Capitol District Holdings',
          targetAccess: 'Jan 2027',
          estValuation: '$850K',
          priority: 'Medium',
          priorityColor: 'bg-amber-100 text-amber-700 border-amber-200'
        },
        {
          id: 'ROW-112',
          name: 'Utility Corridor Segment B (4th St)',
          owner: 'City Energy Utility Easement',
          targetAccess: 'Mar 2027',
          estValuation: '$320K',
          priority: 'Low',
          priorityColor: 'bg-slate-100 text-slate-700 border-slate-200'
        }
      ]
    },
    {
      id: 'agreement-reached',
      title: 'AGREEMENT REACHED',
      items: [
        {
          id: 'ROW-201',
          name: 'Congress Ave Maintenance Pocket',
          owner: 'Downtown City Alliance Joint Trust',
          targetAccess: 'Dec 2026',
          estValuation: '$2.1M',
          priority: 'High',
          priorityColor: 'bg-red-100 text-red-700 border-red-200'
        },
        {
          id: 'ROW-205',
          name: 'Lady Bird Lake Bridge North Abutment',
          owner: 'Travis County Water Control Dept',
          targetAccess: 'Jan 2027',
          estValuation: '$1.8M',
          priority: 'High',
          priorityColor: 'bg-red-100 text-red-700 border-red-200'
        },
        {
          id: 'ROW-210',
          name: 'Riverside Dr Traction Power Substation (TPSS-3)',
          owner: 'South Shore Commercial Partners',
          targetAccess: 'Feb 2027',
          estValuation: '$970K',
          priority: 'Medium',
          priorityColor: 'bg-amber-100 text-amber-700 border-amber-200'
        }
      ]
    },
    {
      id: 'acquired-cleared',
      title: 'ACQUIRED / CLEARED',
      items: [
        {
          id: 'ROW-002',
          name: 'Main Yard Maintenance & Operations Facility',
          owner: 'City of City Municipal Real Estate',
          targetAccess: 'Ready (Cleared)',
          estValuation: '$4.5M',
          priority: 'Completed',
          priorityColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
        },
        {
          id: 'ROW-015',
          name: 'Pleasant Valley Road Flyover Support Columns',
          owner: 'TxDOT Right-of-Way Division',
          targetAccess: 'Ready (Cleared)',
          estValuation: '$1.1M',
          priority: 'Completed',
          priorityColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
        },
        {
          id: 'ROW-022',
          name: 'Airport Blvd Rail Underpass Reroute',
          owner: 'Capital Metro Transportation Authority',
          targetAccess: 'Ready (Cleared)',
          estValuation: '$2.3M',
          priority: 'Completed',
          priorityColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ROW Sequencing Board</h1>
        <p className="text-xs text-gray-500 mt-0.5">Parcel acquisition timelines aligned with design submittals and site access priority</p>
      </div>

      {/* Analytics Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Bar Graph Mock: Acquisition Valuations by Phase */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Valuation Breakdown by Phase</h2>
            <span className="text-[11px] font-mono text-gray-400">Total: $15.1M</span>
          </div>
          <div className="space-y-2 pt-2">
            <div>
              <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                <span>In Negotiation ($2.57M)</span>
                <span className="font-mono">17%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '17%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                <span>Agreement Reached ($4.87M)</span>
                <span className="font-mono">32%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                <span>Acquired / Cleared ($7.9M)</span>
                <span className="font-mono">51%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '51%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Representation / Breakdown Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Parcel Status Distribution</h2>
            <span className="text-[11px] font-mono text-gray-400">9 Total Parcels</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
              <div className="text-[10px] font-bold text-amber-700 uppercase">In Negotiation</div>
              <div className="text-lg font-bold text-amber-900 font-mono mt-1">3</div>
              <div className="text-[10px] text-amber-600">33.3%</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-center">
              <div className="text-[10px] font-bold text-blue-700 uppercase">Agreement</div>
              <div className="text-lg font-bold text-blue-900 font-mono mt-1">3</div>
              <div className="text-[10px] text-blue-600">33.3%</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center">
              <div className="text-[10px] font-bold text-emerald-700 uppercase">Acquired</div>
              <div className="text-lg font-bold text-emerald-900 font-mono mt-1">3</div>
              <div className="text-[10px] text-emerald-600">33.3%</div>
            </div>
          </div>
          <div className="text-[11px] text-gray-400 text-right">Updated daily from corridor tracking records</div>
        </div>

      </div>

      {/* Kanban Columns Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.id} className="bg-gray-100/70 p-3 rounded-xl border border-gray-200 flex flex-col min-h-[500px]">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex justify-between items-center">
              <span>{col.title}</span>
              <span className="bg-gray-200 text-gray-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                {col.items.length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              {col.items.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-3.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-150 space-y-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-600 font-mono tracking-wide">{item.id}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${item.priorityColor}`}>
                      {item.priority}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-800 leading-snug">{item.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.owner}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">
                      Target Access: <strong className="text-gray-700 font-medium">{item.targetAccess}</strong>
                    </span>
                    <span className="font-mono font-semibold text-gray-600">{item.estValuation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}