import React from 'react';
import { getCurrentWeekDate } from "../utils/dateUtils";

export default function WeeklyDigest() {
  return (
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
  );
}