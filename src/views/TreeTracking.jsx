import React, { useState } from 'react';
import { useDuckDB } from "../hooks/useDuckDB";
import { Search } from 'lucide-react';

export default function TreeTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Trees');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');

  const { treeInventory, selectedTree, setSelectedTree, fetchTrees } = useDuckDB();

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

  return (
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
            title="Austin Light Rail Map"
            src="https://atptx.maps.arcgis.com/apps/mapviewer/index.html?webmap=39b7a3e374e14d2784dbbd1b51d7534c"
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
          />
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
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.status === 'ToBeRemoved' || t.status === 'To Be Removed' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
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
  );
}