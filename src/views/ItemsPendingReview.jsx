import React from 'react';

export default function ItemsPendingReview() {
  return (
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
  );
}