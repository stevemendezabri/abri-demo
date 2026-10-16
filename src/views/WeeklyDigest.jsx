import React from 'react';
import { getCurrentWeekDate } from "../utils/dateUtils";

export default function WeeklyDigest() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Intelligence Digest Center</h1>
        <p className="text-xs text-gray-500 mt-0.5">Automated executive summaries and infrastructure milestone tracking reports</p>
      </div>

      {/* DAILY BRIEFING SECTION */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Daily Briefing</h2>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3 flex justify-between items-start">
            <div>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded">
                Daily Operations Log • October 16, 2026
              </span>
              <h3 className="text-sm font-bold text-gray-900 mt-2">Field Activity & Immediate Action Items</h3>
            </div>
            <span className="text-[11px] font-mono text-gray-400">Shift 1 / 07:00 - 15:30</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-100 space-y-1">
              <h4 className="font-bold text-blue-900">FIELD INSPECTIONS</h4>
              <p className="text-gray-700 leading-relaxed">Geotechnical core drilling completed at Station 2 plaza boundary. Core samples delivered to testing lab.</p>
              <div className="text-[10px] text-blue-600 font-medium pt-1">Status: On Schedule</div>
            </div>
            <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-100 space-y-1">
              <h4 className="font-bold text-amber-900">PENDING CLEARANCES</h4>
              <p className="text-gray-700 leading-relaxed">Awaiting final traffic control permit approval from City Transportation Department for 4th St lane shift.</p>
              <div className="text-[10px] text-amber-600 font-medium pt-1">Action: Follow-up required by 14:00</div>
            </div>
            <div className="bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100 space-y-1">
              <h4 className="font-bold text-emerald-900">EQUIPMENT MOBILIZATION</h4>
              <p className="text-gray-700 leading-relaxed">TPSS-3 transformer units successfully staged at South Shore storage depot ahead of weekend install.</p>
              <div className="text-[10px] text-emerald-600 font-medium pt-1">Status: Staged & Secured</div>
            </div>
          </div>
        </div>
      </div>

      {/* WEEKLY DIGEST SECTION */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Weekly Digest</h2>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded">
              Week of {getCurrentWeekDate()}
            </span>
            <h3 className="text-sm font-bold text-gray-900 mt-2">Executive Overview & Key Focus Areas</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Design advancement on Segments A and B is on track for 30% submittal. The critical action item this week is permit pathway classification for the Segment C utility relocation zone – design cannot advance until the P3 review is complete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100 space-y-1">
              <h4 className="font-bold text-emerald-900">WHAT MOVED FORWARD</h4>
              <p className="text-gray-700 leading-relaxed">ALCC coordination initiated for Traction Power Substation 1 proceed on schedule.</p>
            </div>
            <div className="bg-amber-50/50 p-3.5 rounded-lg border border-amber-100 space-y-1">
              <h4 className="font-bold text-amber-900">WHAT NEEDS A DECISION</h4>
              <p className="text-gray-700 leading-relaxed">Segment C permit pathway classification - P3 review required before design scope advance.</p>
            </div>
            <div className="bg-red-50/50 p-3.5 rounded-lg border border-red-100 space-y-1">
              <h4 className="font-bold text-red-900">WHAT WE ARE WATCHING</h4>
              <p className="text-gray-700 leading-relaxed">Segment 2 ROW acquisition delayed on ROW-001; monitoring weekly for impact on permit readiness.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MONTHLY REPORT SECTION */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Monthly Report</h2>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3 flex justify-between items-start">
            <div>
              <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2.5 py-1 rounded">
                Monthly Strategic Report • September / October 2026
              </span>
              <h3 className="text-sm font-bold text-gray-900 mt-2">Corridor Progress & Financial Summary</h3>
            </div>
            <span className="text-[11px] font-mono text-gray-400">Milestone Phase 2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-purple-50/50 p-3.5 rounded-lg border border-purple-100 space-y-2">
              <h4 className="font-bold text-purple-900 uppercase">Milestone Achievements</h4>
              <ul className="space-y-1.5 text-gray-700 list-disc pl-4">
                <li>Finalized 90% engineering alignment for Guadalupe corridor.</li>
                <li>Secured 3 key parcel access agreements in Downtown sector.</li>
                <li>Completed environmental mitigation audit for water quality basins.</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 space-y-2">
              <h4 className="font-bold text-gray-900 uppercase">Budget & Capital Burn</h4>
              <div className="space-y-1 text-gray-600 font-mono text-[11px]">
                <div className="flex justify-between"><span>Allocated Q3:</span> <strong>$18.5M</strong></div>
                <div className="flex justify-between"><span>Actual Spent:</span> <strong>$16.2M</strong></div>
                <div className="flex justify-between text-emerald-600"><span>Variance:</span> <strong>+12.4% (Under)</strong></div>
              </div>
              <p className="text-[11px] text-gray-500 pt-1">Right-of-way acquisitions tracking slightly below forecast curve.</p>
            </div>
            <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-100 space-y-2">
              <h4 className="font-bold text-blue-900 uppercase">Next Month Outlook</h4>
              <p className="text-gray-700 leading-relaxed">Transitioning primary focus to utility relocation sequencing agreements and publishing the final P3 environmental impact addendum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}