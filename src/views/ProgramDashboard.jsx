import React from 'react';
import homePageMap from '../assets/Home Page Map.png';

export default function ProgramDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Program Dashboard</h1>
        <p className="text-xs text-gray-500 mt-0.5">Austin Light Rail - Phase 1b Infrastructure Hub</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-gray-400">OVERDUE PERMIT ACTIONS</div>
          <div className="text-2xl font-black text-red-600 my-1">4</div>
          <div className="text-xs text-red-600 font-medium">Past target completion date</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-gray-400">UPCOMING PERMIT DEADLINES</div>
          <div className="text-2xl font-black text-gray-900 my-1">8</div>
          <div className="text-xs text-amber-600 font-medium">Earliest target dates due next</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-gray-400">PERMIT APPROVAL PROGRESS</div>
          <div className="text-2xl font-black text-gray-900 my-1">12 / 18</div>
          <div className="text-xs text-gray-500 font-medium">(Across 10 permit types)</div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-[10px] font-bold uppercase text-gray-400">MILESTONE PERMIT PROGRESS</div>
          <div className="text-2xl font-black text-emerald-600 my-1">6 / 8</div>
          <div className="text-xs text-gray-500">75% of milestone permits closed out</div>
        </div>
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
  );
}