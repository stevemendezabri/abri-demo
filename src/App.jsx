import React, { useState } from 'react';
import { useDuckDB } from './hooks/useDuckDB';
import { getCurrentWeekDate } from './utils/dateUtils';

// Lucide icons
import {
  LayoutDashboard,
  FileCheck,
  Droplets,
  TreePine,
  Layers,
  FileText,
  Clock,
  Search,
  Database,
  Plus
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('Tree Tracking');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Trees');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');

  // Custom hook replacing database setup, state management, and SQL execution
  const { treeInventory, selectedTree, setSelectedTree, fetchTrees } = useDuckDB();

  // Unified filter handler passed to DuckDB hook
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    fetchTrees(val, statusFilter, segmentFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    fetchTrees(searchTerm, status, segmentFilter);
  };

  const handleSegmentFilter = (segment) => {
    setSegmentFilter(segment);
    fetchTrees(searchTerm, statusFilter, segment);
  };

  const navTabs = [
    { name: 'Program Dashboard', icon: LayoutDashboard },
    { name: 'Permit Pathway Tracker', icon: FileCheck },
    { name: 'Water Quality Dashboard', icon: Droplets, headerName: 'Water Quality' },
    { name: 'Tree Tracking', icon: TreePine },
    { name: 'ROW Sequencing Board', icon: Layers },
    { name: 'Weekly Digest', icon: FileText },
    { name: 'Items Pending Review', icon: Clock }
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1F2937] font-sans antialiased overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-56 bg-[#111827] text-gray-300 flex flex-col justify-between border-r border-gray-800 shrink-0">
        <div>
          <div className="p-4 border-b border-gray-800 flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-bold text-xs text-gray-900">
              AL
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">Austin Light Rail</span>
          </div>

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

        <div className="p-3 border-t border-gray-800 text-[11px] text-gray-500 flex items-center justify-between">
          <span>Engine Status</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <Database className="w-3 h-3" />
            <span>DuckDB WASM</span>
          </span>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER TAB BAR */}
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

        {/* TAB VIEWS RENDERER */}
        <div className="flex-1 overflow-y-auto p-5">
          
          {/* TAB 1: PROGRAM DASHBOARD */}
          {activeTab === 'Program Dashboard' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Program Dashboard</h1>
                <p className="text-xs text-gray-500 mt-0.5">Austin Light Rail - Phase 1b Infrastructure Hub</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-gray-400">PERMIT ITEMS REQUIRING ACTION</div>
                  <div className="text-2xl font-black text-gray-900 my-1">3</div>
                  <div className="text-xs text-red-600 font-medium">2 Actions Pending, 1 In Review</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-gray-400">ROW PARCELS AT RISK</div>
                  <div className="text-2xl font-black text-gray-900 my-1">7</div>
                  <div className="text-xs text-amber-600 font-medium">3 Flagged / Under Review</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-gray-400">ITEMS PENDING REVIEW</div>
                  <div className="text-2xl font-black text-gray-900 my-1">3</div>
                  <div className="text-xs text-amber-600 font-medium">Assigned - Action Required</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-[10px] font-bold uppercase text-gray-400">DAYS TO NEXT BOARD MILESTONE</div>
                  <div className="text-2xl font-black text-emerald-600 my-1">47</div>
                  <div className="text-xs text-gray-500">Highest priority board milestone</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Recent Activity</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-900">Segment C – Utility Relocation Zone:</span> Permit pathway classification required before 30% design submission
                      <div className="text-[11px] text-gray-500 mt-0.5">Assigned to: <span className="text-amber-700 font-medium">ROW Team</span> • Source: Process Monitor</div>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold">Due in 5 days</span>
                  </div>
                  <div className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-900">Parcel ROW-109:</span> Acquisition delayed city match impact permit readiness for Station 3 area - sequencing review needed
                      <div className="text-[11px] text-gray-500 mt-0.5">Assigned to: <span className="text-red-700 font-medium">ROW Sequencing</span> • Source: Weekly Review</div>
                    </div>
                    <span className="bg-red-100 text-red-800 text-[10px] px-2 py-1 rounded font-bold">Due in 12 days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERMIT PATHWAY TRACKER */}
          {activeTab === 'Permit Pathway Tracker' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">Permit Pathway Tracker</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Each program element defined by permit pathway - status, risk, and row visibility in one view</p>
                </div>
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-sm">
                  <Plus className="w-4 h-4" /> <span>Add Element</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-400 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="p-3">PROGRAM ELEMENT</th>
                      <th className="p-3">PERMIT PATHWAY</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3">NEXT ACTION</th>
                      <th className="p-3">ACTION OWNER</th>
                      <th className="p-3">DUE DATE</th>
                      <th className="p-3">RISK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Priority Extension: Hwy 71 to AUS', pathway: 'Site Plan Permit', status: 'In Progress', action: 'ALCC coordination', owner: 'ALCC Team', due: 'Jun 15', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
                      { name: 'Priority Extension: 40th St. to St. Johns', pathway: '750 Site Plan', status: 'In Progress', action: '30% design submittal to USD', owner: 'Design Lead', due: 'Jun 30', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
                      { name: 'Segment C - Utility Relocation', pathway: '750 Site Plan', status: 'Classification Needed', action: 'P3 pathway review - action required', owner: 'ROW Team', due: 'May 17', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
                      { name: 'Station 1', pathway: '750 Site Plan', status: 'In Progress', action: 'Fast track permit eligibility review', owner: 'ALCC', due: 'Jul 1', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
                      { name: 'Station 2', pathway: '750 Site Plan', status: 'ROW Risk', action: 'ROW acquisition behind schedule', owner: 'ROW Lead', due: 'Jun 20', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
                      { name: 'OMF Facility', pathway: 'Site Plan Permit', status: 'In Progress', action: 'Noise-mitigation-plan submitted', owner: 'Design Lead', due: 'Aug 2', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
                      { name: 'Tree Review - Zone 4', pathway: 'Site Plan Exemption', status: 'In Review', action: 'Heritage tree impact assessment', owner: 'Arborist', due: 'May 28', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-900">{row.name}</td>
                        <td className="p-3"><span className="text-blue-600 border-b border-blue-200">{row.pathway}</span></td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">{row.status}</span></td>
                        <td className="p-3 text-gray-700">{row.action}</td>
                        <td className="p-3 font-medium text-gray-800">{row.owner}</td>
                        <td className="p-3 text-gray-500 font-mono">{row.due}</td>
                        <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.riskBg}`}>{row.risk}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WATER QUALITY DASHBOARD */}
          {(activeTab === 'Water Quality Dashboard' || activeTab === 'Water Quality') && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Water Quality Dashboard</h1>
                <p className="text-xs text-gray-500 mt-0.5">Program-wide water quality compliance - Impervious cover, treatment volume, BMP planning, and watershed risk across every segment.</p>
              </div>

              <div className="grid grid-cols-6 gap-3">
                {[
                  { label: 'SEGMENTS TRACKED', value: '6', sub: 'Across 3 watersheds' },
                  { label: 'WATERSHEDS IMPACTED', value: '5', sub: 'Across the alignment' },
                  { label: 'ACTIVE PERMITS', value: '3', sub: 'Approved or active at 15' },
                  { label: 'PERMITS AT RISK', value: '3', sub: 'High environmental risk' },
                  { label: 'TREATMENT VOL (CF)', value: '140,100', sub: 'Required program-wide' },
                  { label: 'NET IC ADDED (SF)', value: '+374,600', sub: 'Added program-wide', highlight: true }
                ].map((stat, i) => (
                  <div key={i} className={`bg-white p-3 rounded-xl border border-gray-200 shadow-sm ${stat.highlight ? 'bg-amber-50 border-amber-300' : ''}`}>
                    <div className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</div>
                    <div className={`text-xl font-black my-0.5 ${stat.highlight ? 'text-amber-700' : 'text-gray-900'}`}>{stat.value}</div>
                    <div className="text-[10px] text-gray-500">{stat.sub}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#E5E3DF] rounded-xl border border-gray-200 h-64 relative flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm text-center">
                  <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-1" />
                  <span className="text-xs font-bold text-gray-700">Interactive GIS Map Overlay - Watershed Alignment Map</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TREE TRACKING */}
          {activeTab === 'Tree Tracking' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Tree Tracking</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Track trees within the Austin Light Rail program – removal, mitigation, protection, and compliance through completion
                </p>
              </div>

              <div className="grid grid-cols-6 gap-3">
                {[
                  { label: 'TREES TRACKED', value: '1,248', sub: 'All trees in project limits', color: 'border-l-4 border-gray-400' },
                  { label: 'TO REMAIN', value: '892', sub: '71% of total', color: 'border-l-4 border-emerald-500' },
                  { label: 'TO BE REMOVED', value: '356', sub: '29% of total', color: 'border-l-4 border-red-500' },
                  { label: 'PROTECTION REQUIRED', value: '238', sub: 'Requires 100% mitigation', color: 'border-l-4 border-amber-500' },
                  { label: 'HERITAGE REMOVED', value: '24', sub: 'Requires 300% mitigation', color: 'border-l-4 border-purple-500' },
                  { label: 'MITIGATION FULFILLMENT', value: '78%', sub: 'In Progress', color: 'border-l-4 border-blue-500' }
                ].map((kpi, idx) => (
                  <div key={idx} className={`bg-white rounded-lg p-3 border border-gray-200 shadow-sm ${kpi.color}`}>
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{kpi.label}</div>
                    <div className="text-xl font-extrabold text-gray-900 my-0.5">{kpi.value}</div>
                    <div className="text-[10px] text-gray-500">{kpi.sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1 rounded border border-gray-200 text-xs text-gray-600">
                    <span className="text-gray-400 font-medium">Segment:</span>
                    <select
                      value={segmentFilter}
                      onChange={(e) => handleSegmentFilter(e.target.value)}
                      className="bg-transparent font-semibold text-gray-800 outline-none cursor-pointer"
                    >
                      <option value="All Segments">All Segments</option>
                      <option value="Segment 1">Segment 1: 38th to MLK</option>
                      <option value="Segment 2">Segment 2: MLK to Cesar Chavez</option>
                      <option value="Segment 3">Segment 3: Bridge</option>
                      <option value="Segment 4">Segment 4: Riverside Split to S. Oltorf</option>
                      <option value="Segment 5">Segment 5: Riverside Split to Pleasant Valley</option>
                      <option value="Segment 6">Segment 6: Pleasant Valley to Ben White</option>
                      <option value="Priority Extension: Hwy 71 to AUS">Priority Extension: Hwy 71 to AUS</option>
                      <option value="Priority Extension: 40th St. to St. Johns">Priority Extension: 40th St. to St. Johns</option>
                    </select>
                  </div>

                  <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by ID or species..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="w-full bg-gray-50 border border-gray-200 rounded pl-8 pr-3 py-1 text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-1 bg-gray-100 p-0.5 rounded text-xs">
                  {['All Trees', 'To Remain', 'To Be Removed', 'Recently Planted'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleStatusFilter(filter)}
                      className={`px-3 py-1 rounded font-medium transition-all ${
                        statusFilter === filter ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 h-[550px]">
                <div className="col-span-2 rounded-xl border border-gray-200 overflow-hidden relative h-full bg-gray-100">
                  <iframe
                    title="Austin Light Rail Saved Map"
                    src="https://www.google.com/maps/d/embed?mid=11i1pEtbNEY1vgZBR1PNLUDCfxLtPXOY"
                    width="100%"
                    height="100%"
                    className="border-0 rounded-xl"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-3.5 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <div className="flex justify-between items-start pb-2 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SELECTED TREE</span>
                        <h2 className="text-base font-bold text-amber-600 font-mono">{selectedTree?.id || 'Select a tree'}</h2>
                      </div>
                      {selectedTree && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700">
                          {selectedTree.status}
                        </span>
                      )}
                    </div>

                    {selectedTree ? (
                      <div className="mt-2.5 space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-50">
                          <span className="text-gray-400">Species (Common)</span>
                          <span className="font-semibold text-gray-800">{selectedTree.common_name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50">
                          <span className="text-gray-400">Species (Scientific)</span>
                          <span className="italic text-gray-600">{selectedTree.species}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50">
                          <span className="text-gray-400">Tree Type</span>
                          <span className="font-semibold text-purple-700">{selectedTree.tree_type}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-50">
                          <span className="text-gray-400">DBH / Caliper</span>
                          <span className="font-semibold text-gray-800">{selectedTree.dbh}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 text-center py-8">Select a tree on the map or table.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-[400px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 z-20 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                    <tr className="border-b border-gray-200 text-gray-500 uppercase font-semibold text-[10px]">
                      <th className="py-2.5 px-2 text-left">Tree ID</th>
                      <th className="py-2.5 px-2 text-left">Species</th>
                      <th className="py-2.5 px-2 text-left">Type</th>
                      <th className="py-2.5 px-2 text-left">DBH</th>
                      <th className="py-2.5 px-2 text-left">Condition</th>
                      <th className="py-2.5 px-2 text-left">Segment</th>
                      <th className="py-2.5 px-2 text-left">Status</th>
                      <th className="py-2.5 px-2 text-right">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {treeInventory.map((t) => (
                      <tr key={t.id} onClick={() => setSelectedTree(t)} className="hover:bg-amber-50/50 cursor-pointer">
                        <td className="py-2.5 font-bold text-amber-600 font-mono">{t.id}</td>
                        <td className="py-2.5"><div className="font-semibold text-gray-900">{t.common_name}</div></td>
                        <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] bg-gray-100">{t.tree_type}</span></td>
                        <td className="py-2.5 text-gray-600">{t.dbh}</td>
                        <td className="py-2.5 text-gray-600">{t.condition}</td>
                        <td className="py-2.5 text-gray-600">{t.segment}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.status === 'To Be Removed' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-2.5 font-bold text-gray-900 text-right">{t.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: ROW SEQUENCING BOARD */}
          {activeTab === 'ROW Sequencing Board' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">ROW Sequencing Board</h1>
                <p className="text-xs text-gray-500 mt-0.5">Parcel acquisition timelines aligned with design submittals and site access priority</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {['IN NEGOTIATION', 'AGREEMENT REACHED', 'ACQUIRED / CLEARED'].map((col, idx) => (
                  <div key={col} className="bg-gray-100/70 p-3 rounded-xl border border-gray-200">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                      <span>{col}</span>
                      <span className="bg-gray-200 text-gray-700 px-1.5 rounded">{idx + 2}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm space-y-1">
                        <div className="font-bold text-xs text-amber-600 font-mono">PARCEL ROW-108</div>
                        <div className="text-xs font-semibold text-gray-800">Station 2 Entry Plaza</div>
                        <div className="text-[11px] text-gray-500">Target Access: Aug 2025</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm space-y-1">
                        <div className="font-bold text-xs text-amber-600 font-mono">PARCEL ROW-112</div>
                        <div className="text-xs font-semibold text-gray-800">Utility Corridor Segment B</div>
                        <div className="text-[11px] text-gray-500">Target Access: Oct 2025</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: WEEKLY DIGEST */}
          {activeTab === 'Weekly Digest' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Weekly Intelligence Digest</h1>
                <p className="text-xs text-gray-500 mt-0.5">Published every Friday • Repositories status reporting with self-service stakeholder visibility</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded">
                    Week of {getCurrentWeekDate()}
                  </span>
                  <h2 className="text-sm font-bold text-gray-900 mt-2">Executive Overview & Key Focus Areas</h2>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Design advancement on Segments A and B is on track for 30% submittal. The critical action item this week is permit pathway classification for the Segment C utility relocation zone – design cannot advance until the P3 review is complete.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                    <h3 className="font-bold text-emerald-900 mb-1">WHAT MOVED FORWARD</h3>
                    <p className="text-gray-700">ALCC coordination initiated for Traction Power Substation 1 proceed on schedule.</p>
                  </div>
                  <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                    <h3 className="font-bold text-amber-900 mb-1">WHAT NEEDS A DECISION</h3>
                    <p className="text-gray-700">Segment C permit pathway classification - P3 review required before design scope advance.</p>
                  </div>
                  <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
                    <h3 className="font-bold text-red-900 mb-1">WHAT WE ARE WATCHING</h3>
                    <p className="text-gray-700">Segment 2 ROW acquisition delayed on ROW-001; monitoring weekly for impact on permit readiness.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ITEMS PENDING REVIEW */}
          {activeTab === 'Items Pending Review' && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Items Pending Review</h1>
                <p className="text-xs text-gray-500 mt-0.5">Flagged items requiring review and decision – organized by source and priority</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-400 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="p-3">DESCRIPTION</th>
                      <th className="p-3">SOURCE</th>
                      <th className="p-3">STATUS</th>
                      <th className="p-3">ASSIGNED TO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-bold text-gray-900">Segment C utility scope description indicates potential impervious cover increase</div>
                        <div className="text-[11px] text-gray-500">Permit pathway review required before 30% design submission can proceed</div>
                      </td>
                      <td className="p-3"><span className="bg-purple-100 text-purple-800 text-[10px] px-2 py-0.5 rounded font-bold">Process Monitor</span></td>
                      <td className="p-3"><span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded font-bold">New - Action Required</span></td>
                      <td className="p-3 font-medium text-gray-800">ABI</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-bold text-gray-900">ROW-008 acquisition timeline conflict with Station 3 design schedule</div>
                        <div className="text-[11px] text-gray-500">Current price creates projected 9-week permit sequencing gap</div>
                      </td>
                      <td className="p-3"><span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded font-bold">ROW Sequencing</span></td>
                      <td className="p-3"><span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold">Under Review</span></td>
                      <td className="p-3 font-medium text-gray-800">ROW Lead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}