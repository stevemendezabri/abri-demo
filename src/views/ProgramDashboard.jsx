/**
 * ============================================================================
 * COMPONENT: ProgramDashboard
 * ============================================================================
 * Description: Austin Light Rail - Phase 1b Infrastructure Hub[cite: 5]. */

import homePageMap from '../assets/Home Page Map.png';
import StatCard from '../components/StatCard';

export default function ProgramDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Program Dashboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">Public Transit Rail - Phase 1b Infrastructure Hub[cite: 5]</p>
      </div>

      {/* Top Stat Cards using shared StatCard component */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="OVERDUE PERMIT ACTIONS"
          value="4"
          subtext="Past target completion date"
          color="border-l-4 border-red-500"
        />
        <StatCard
          label="UPCOMING PERMIT DEADLINES"
          value="8"
          subtext="Earliest target dates due next"
          color="border-l-4 border-amber-500"
        />
        <StatCard
          label="PERMIT APPROVAL PROGRESS"
          value="12 / 18"
          subtext="(Across 10 permit types)"
          color="border-l-4 border-blue-500"
        />
        <StatCard
          label="MILESTONE PERMIT PROGRESS"
          value="6 / 8"
          subtext="75% of milestone permits closed out"
          color="border-l-4 border-emerald-500"
        />
      </div>

      {/* Centered Map Image above Recent Activity */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-center items-center">
        <img 
          src={homePageMap} 
          alt="Home Page Map" 
          className="max-h-[700px] w-auto object-contain rounded-lg"
        />
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Recent Activity</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-900">Segment C – Utility Relocation Zone:</span> Permit pathway classification required before 30% design submission[cite: 5]
              <div className="text-[11px] text-gray-500 mt-0.5">Assigned to: <span className="text-amber-700 font-medium">ROW Team</span> • Source: Process Monitor[cite: 5]</div>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold">Due in 5 days</span>
          </div>
          <div className="p-3 bg-red-50/50 rounded-lg border border-red-100 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-900">Parcel ROW-109:</span> Acquisition delayed city match impact permit readiness for Station 3 area - sequencing review needed[cite: 5]
              <div className="text-[11px] text-gray-500 mt-0.5">Assigned to: <span className="text-red-700 font-medium">ROW Sequencing</span> • Source: Weekly Review[cite: 5]</div>
            </div>
            <span className="bg-red-100 text-red-800 text-[10px] px-2 py-1 rounded font-bold">Due in 12 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}