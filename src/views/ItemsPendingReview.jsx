import React, { useState } from 'react';

export default function ItemsPendingReview() {
  const [filterCategory, setFilterCategory] = useState('All');

  const reviewItems = [
    {
      id: 'REV-1029',
      title: '30% Submittal: Guadalupe Corridor Alignment & Grading',
      category: 'Design & Engineering',
      submittedBy: 'HNTB Engineering',
      submittedDate: 'Oct 12, 2026',
      reviewDueDate: 'Oct 26, 2026',
      reviewer: 'City of City Transportation Dept',
      urgency: 'High',
      status: 'In Technical Review',
      commentsCount: 14,
      priorityColor: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      id: 'REV-1034',
      title: 'Station 2 Stormwater Management Plan & Basin Sizing',
      category: 'Water Quality',
      submittedBy: 'Water Resources Team',
      submittedDate: 'Oct 09, 2026',
      reviewDueDate: 'Oct 23, 2026',
      reviewer: 'City Watershed Protection',
      urgency: 'Critical',
      status: 'Awaiting Sign-off',
      commentsCount: 6,
      priorityColor: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      id: 'REV-1038',
      title: 'Traction Power Substation 3 (TPSS-3) Noise Mitigation Addendum',
      category: 'Environmental',
      submittedBy: 'Acoustic Consultants Group',
      submittedDate: 'Oct 14, 2026',
      reviewDueDate: 'Oct 28, 2026',
      reviewer: 'Environmental Review Board',
      urgency: 'Medium',
      status: 'Under Review',
      commentsCount: 3,
      priorityColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
      id: 'REV-1041',
      title: 'Heritage Tree Impact Mitigations - 4th St Corridor',
      category: 'Tree Preservation',
      submittedBy: 'Arborist Services LLC',
      submittedDate: 'Oct 15, 2026',
      reviewDueDate: 'Nov 02, 2026',
      reviewer: 'City Arborist Division',
      urgency: 'Medium',
      status: 'Under Review',
      commentsCount: 2,
      priorityColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
      id: 'REV-1045',
      title: 'Utility Relocation Sequence - Segment C (Gas & Electric)',
      category: 'Utilities',
      submittedBy: 'City Energy Coordination',
      submittedDate: 'Oct 08, 2026',
      reviewDueDate: 'Oct 22, 2026',
      reviewer: 'ATP Infrastructure Lead',
      urgency: 'High',
      status: 'Revisions Requested',
      commentsCount: 21,
      priorityColor: 'bg-red-100 text-red-700 border-red-200'
    },
    {
      id: 'REV-1050',
      title: 'Right-of-Way Parcel Acquisition Agreement - ROW-201',
      category: 'ROW',
      submittedBy: 'Legal & Real Estate Team',
      submittedDate: 'Oct 11, 2026',
      reviewDueDate: 'Oct 25, 2026',
      reviewer: 'Travis County Board',
      urgency: 'Low',
      status: 'Final Legal Review',
      commentsCount: 1,
      priorityColor: 'bg-slate-100 text-slate-700 border-slate-200'
    }
  ];

  const categories = ['All', 'Design & Engineering', 'Water Quality', 'Environmental', 'Tree Preservation', 'Utilities', 'ROW'];

  const filteredItems = filterCategory === 'All' 
    ? reviewItems 
    : reviewItems.filter(item => item.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Items Pending Review</h1>
          <p className="text-xs text-gray-500 mt-0.5">Submittals, permit packages, and engineering reviews awaiting stakeholder action</p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Submit New Item
          </button>
        </div>
      </div>

      {/* Top Metrics / Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase">Total Pending</div>
            <div className="text-2xl font-bold text-gray-900 font-mono mt-0.5">{reviewItems.length}</div>
          </div>
          <div className="bg-amber-50 p-2.5 rounded-lg text-amber-600 font-bold text-xs">
            Active
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase">High / Critical Urgency</div>
            <div className="text-2xl font-bold text-red-600 font-mono mt-0.5">
              {reviewItems.filter(i => i.urgency === 'High' || i.urgency === 'Critical').length}
            </div>
          </div>
          <div className="bg-red-50 p-2.5 rounded-lg text-red-600 font-bold text-xs">
            Action Req.
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase">Avg Review Time</div>
            <div className="text-2xl font-bold text-blue-600 font-mono mt-0.5">4.2 Days</div>
          </div>
          <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 font-bold text-xs">
            Target &lt;7d
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-gray-500 uppercase">Revisions Requested</div>
            <div className="text-2xl font-bold text-purple-600 font-mono mt-0.5">
              {reviewItems.filter(i => i.status === 'Revisions Requested').length}
            </div>
          </div>
          <div className="bg-purple-50 p-2.5 rounded-lg text-purple-600 font-bold text-xs">
            Pending Resub
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-gray-400 font-medium mr-1">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Review Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            {/* Card Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-600">{item.id}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.priorityColor}`}>
                  {item.urgency} Urgency
                </span>
              </div>

              <h3 className="text-xs font-bold text-gray-800 leading-snug">{item.title}</h3>
              <p className="text-[11px] text-gray-500">Category: <span className="font-medium text-gray-700">{item.category}</span></p>
            </div>

            {/* Card Metadata */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-gray-600">
                <span>Submitted By:</span>
                <strong className="text-gray-800 font-medium">{item.submittedBy}</strong>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Reviewer:</span>
                <strong className="text-gray-800 font-medium">{item.reviewer}</strong>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Due Date:</span>
                <strong className="text-red-600 font-medium">{item.reviewDueDate}</strong>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center text-gray-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                {item.status}
              </span>
              <span className="text-gray-400 font-mono">
                💬 {item.commentsCount} comments
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}