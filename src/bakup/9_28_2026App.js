import React, { useState, useEffect, useRef } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url';
import mvp_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url';
import eh_worker from '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url';

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

const MANUAL_BUNDLES = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: mvp_worker,
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: eh_worker,
  },
};

const getCurrentWeekDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  return startOfWeek.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Tree Tracking');
  const [treeInventory, setTreeInventory] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Trees');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');
  
  const dbRef = useRef(null);
  const connRef = useRef(null);

  const fetchTrees = async (conn, search, filter, segment) => {
    const activeConn = conn || connRef.current;
    if (!activeConn) return;

    const currentSegment = segment !== undefined ? segment : segmentFilter;
    const currentStatus = filter !== undefined ? filter : statusFilter;
    const currentSearch = search !== undefined ? search : searchTerm;

    let sql = `SELECT * FROM trees WHERE 1=1`;

    if (currentSearch) {
      const term = currentSearch.toLowerCase();
      sql += ` AND (LOWER(species) LIKE '%${term}%' OR LOWER(common_name) LIKE '%${term}%' OR LOWER(id) LIKE '%${term}%')`;
    }

    if (currentStatus && currentStatus !== 'All Trees') {
      sql += ` AND status = '${currentStatus}'`;
    }

    if (currentSegment && currentSegment !== 'All Segments') {
      sql += ` AND segment LIKE '${currentSegment}%'`;
    }

    try {
      const result = await activeConn.query(sql);
      const rows = result.toArray().map(r => r.toJSON());
      setTreeInventory(rows);
      setSelectedTree(rows.length > 0 ? rows[0] : null);
    } catch (err) {
      console.error("Query Execution Error:", err);
    }
  };

  useEffect(() => {
    async function initDuckDB() {
      try {
        const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
        const worker = new Worker(bundle.mainWorker);
        const logger = new duckdb.ConsoleLogger();
        const db = new duckdb.AsyncDuckDB(logger, worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        
        const conn = await db.connect();
        dbRef.current = db;
        connRef.current = conn;

        await conn.query(`
          CREATE TABLE trees (
            id VARCHAR PRIMARY KEY,
            species VARCHAR,
            common_name VARCHAR,
            dbh VARCHAR,
            condition VARCHAR,
            segment VARCHAR,
            status VARCHAR,
            mitigation VARCHAR,
            lat DOUBLE,
            lng DOUBLE,
            tree_type VARCHAR,
            permit_pathway VARCHAR
          );
        `);

        await conn.query(`
          INSERT INTO trees VALUES
            ('T-01029', 'Quercus virginiana', 'Live Oak', '28 in', 'Fair', 'Segment 2', 'To Be Removed', '84 in', 30.2622, -97.6895, 'Heritage', 'Site Plan Permit'),
            ('T-01024', 'Quercus virginiana', 'Live Oak', '18 in', 'Good', 'Priority Extension: Hwy 71 to AUS', 'To Be Removed', '14/22 in', 30.2625, -97.7410, 'Protected', 'Site Plan Permit'),
            ('T-01025', 'Ulmus rubra', 'Cedar Elm', '22 in', 'Fair', 'Priority Extension: Hwy 71 to AUS', 'To Be Removed', '14/22 in', 30.2631, -97.7395, 'Protected', 'Site Plan Permit'),
            ('T-01026', 'Carya illinoinensis', 'Pecan', '31 in', 'Fair', 'Priority Extension: Hwy 71 to AUS', 'To Be Removed', '94/24 in', 30.2618, -97.7422, 'Heritage', 'Site Plan Permit'),
            ('T-01027', 'Juniperus ashei', 'Ashe Juniper', '9 in', 'Poor', 'Priority Extension: 40th St. to St. Johns', 'To Remain', '-', 30.2580, -97.7350, 'Not Protected', 'General Permit'),
            ('T-01028', 'Taxodium distichum', 'Bald Cypress', '18 in', 'Fair', 'Segment 4', 'To Be Removed', '-', 30.2595, -97.7380, 'Protected', 'Site Plan Permit'),
            ('T-01030', 'Lagerstroemia', 'Crepe Myrtle', '4 in', 'Good', 'Segment 2', 'Recently Planted', '-', 30.2610, -97.7400, 'Not Protected', 'N/A'),
            ('T-01001', 'Quercus virginiana', 'Live Oak', '28 in', 'Fair', 'Segment 1: 38th to MLK', 'To Be Removed', '84 in', 30.2912, -97.7381, 'Heritage', 'Site Plan Permit'),
            ('T-01002', 'Ulmus crassifolia', 'Cedar Elm', '21 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2925, -97.7375, 'Protected', 'Site Plan Permit'),
            ('T-01003', 'Carya illinoinensis', 'Pecan', '32 in', 'Fair', 'Segment 1: 38th to MLK', 'To Be Removed', '96 in', 30.2938, -97.7369, 'Heritage', 'Site Plan Permit'),
            ('T-01004', 'Lagerstroemia', 'Crepe Myrtle', '8 in', 'Good', 'Segment 1: 38th to MLK', 'Recently Planted', '-', 30.2941, -97.7362, 'Not Protected', 'N/A'),
            ('T-01005', 'Juniperus ashei', 'Ashe Juniper', '14 in', 'Poor', 'Segment 1: 38th to MLK', 'To Be Removed', '-', 30.2950, -97.7358, 'Not Protected', 'General Permit'),
            ('T-01006', 'Taxodium distichum', 'Bald Cypress', '22 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2962, -97.7351, 'Protected', 'Site Plan Permit'),
            ('T-01007', 'Quercus fusiformis', 'Heritage Live Oak', '36 in', 'Fair', 'Segment 1: 38th to MLK', 'To Be Removed', '108 in', 30.2970, -97.7345, 'Heritage', 'Site Plan Permit'),
            ('T-01008', 'Fraxinus texensis', 'Texas Ash', '19 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2981, -97.7339, 'Protected', 'Site Plan Permit'),
            ('T-01009', 'Ulmus americana', 'American Elm', '25 in', 'Poor', 'Segment 1: 38th to MLK', 'To Be Removed', '75 in', 30.2990, -97.7332, 'Heritage', 'Site Plan Permit'),
            ('T-01010', 'Quercus macrocarpa', 'Bur Oak', '20 in', 'Good', 'Segment 1: 38th to MLK', 'To Remain', '-', 30.2998, -97.7328, 'Protected', 'Site Plan Permit'),
            ('T-01011', 'Quercus virginiana', 'Live Oak', '30 in', 'Good', 'Segment 2: MLK to Cesar Chavez', 'To Be Removed', '90 in', 30.2785, -97.7410, 'Heritage', 'Site Plan Permit'),
            ('T-01012', 'Ulmus crassifolia', 'Cedar Elm', '19 in', 'Fair', 'Segment 2: MLK to Cesar Chavez', 'To Remain', '-', 30.2772, -97.7415, 'Protected', 'Site Plan Permit'),
            ('T-01049', 'Lagerstroemia', 'Crepe Myrtle', '9 in', 'Good', 'Priority Extension: 40th St. to St. Johns', 'Recently Planted', '-', 30.3170, -97.7160, 'Not Protected', 'N/A'),	
            ('T-01036', 'Quercus virginiana', 'Live Oak', '35 in', 'Good', 'Segment 6: Pleasant Valley to Ben White', 'To Be Removed', '105 in', 30.2280, -97.7100, 'Heritage', 'Site Plan Permit'),
            ('T-01037', 'Ulmus americana', 'American Elm', '20 in', 'Fair', 'Segment 6: Pleasant Valley to Ben White', 'To Remain', '-', 30.2265, -97.7085, 'Protected', 'Site Plan Permit'),	
            ('T-01023', 'Carya illinoinensis', 'Pecan', '22 in', 'Good', 'Segment 3: Bridge', 'To Remain', '-', 30.2620, -97.7450, 'Protected', 'Site Plan Permit'),				  
            ('T-01013', 'Carya illinoinensis', 'Pecan', '26 in', 'Good', 'Segment 2: MLK to Cesar Chavez', 'To Be Removed', '78 in', 30.2760, -97.7421, 'Heritage', 'Site Plan Permit'),
            ('T-01016', 'Quercus muehlenbergii', 'Chinquapin Oak', '22 in', 'Good', 'Segment 2: MLK to Cesar Chavez', 'To Remain', '-', 30.2728, -97.7436, 'Protected', 'Site Plan Permit'),
            ('T-01017', 'Juniperus ashei', 'Ashe Juniper', '11 in', 'Fair', 'Segment 2: MLK to Cesar Chavez', 'To Be Removed', '-', 30.2715, -97.7441, 'Not Protected', 'General Permit'),
            ('T-01032', 'Taxodium distichum', 'Bald Cypress', '21 in', 'Good', 'Segment 5: Riverside Split to Pleasant Valley', 'To Remain', '-', 30.2438, -97.7195, 'Protected', 'Site Plan Permit'),
            ('T-01045', 'Carya illinoinensis', 'Pecan', '23 in', 'Fair', 'Priority Extension: Hwy 71 to AUS', 'To Remain', '-', 30.2070, -97.6690, 'Protected', 'Site Plan Permit'),
            ('T-01046', 'Quercus virginiana', 'Live Oak', '31 in', 'Good', 'Priority Extension: 40th St. to St. Johns', 'To Be Removed', '93 in', 30.3080, -97.7220, 'Heritage', 'Site Plan Permit'),
            ('T-01047', 'Ulmus crassifolia', 'Cedar Elm', '22 in', 'Fair', 'Priority Extension: 40th St. to St. Johns', 'To Remain', '-', 30.3110, -97.7200, 'Protected', 'Site Plan Permit'),
            ('T-01048', 'Quercus macrocarpa', 'Bur Oak', '25 in', 'Good', 'Priority Extension: 40th St. to St. Johns', 'To Be Removed', '75 in', 30.3140, -97.7180, 'Heritage', 'Site Plan Permit');
        `);

        fetchTrees(conn, '', 'All Trees');
      } catch (err) {
        console.error("DuckDB Init Error:", err);
      }
    }

    initDuckDB();

    return () => {
      if (connRef.current) connRef.current.close();
      if (dbRef.current) dbRef.current.terminate();
    };
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    fetchTrees(connRef.current, val, statusFilter, segmentFilter);
  };

  const handleFilterClick = (status) => {
    setStatusFilter(status);
    fetchTrees(connRef.current, searchTerm, status, segmentFilter);
  };

  // Nav Syncing Helper
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
					onChange={(e) => {
					  const seg = e.target.value;
					  setSegmentFilter(seg);
					  fetchTrees(connRef.current, searchTerm, statusFilter, seg);
					}}
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
                      onClick={() => handleFilterClick(filter)}
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