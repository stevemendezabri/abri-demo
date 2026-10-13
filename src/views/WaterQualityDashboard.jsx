/**
 * ============================================================================
 * COMPONENT: WaterQualityDashboard
 * ============================================================================
 * Description: Program-wide water quality compliance dashboard managing 
 * impervious cover, treatment volumes, BMP planning, and watershed risks[cite: 2].
 */

import React, { useState } from 'react';
import { MapPin, Table, Search, List } from 'lucide-react';
import { waterQualityData } from '../config/waterquality.config.js';
import TreatmentTables from '../components/TreatmentTables';
import StatCard from '../components/StatCard';

export default function WaterQualityDashboard() {
  /* ==========================================
     1. STATE MANAGEMENT HOOKS
     ========================================== */
  const [wqSubTab, setWqSubTab] = useState('Overview & Map'); // Active sub-tab navigation (defaults to Map)
  const [wqSegmentFilter, setWqSegmentFilter] = useState('All Segments'); // Segment filter (1-5)
  const [wqSearchTerm, setWqSearchTerm] = useState(''); // Text search by watershed or ID
  const [wqStatusFilter, setWqStatusFilter] = useState('All Permits'); // Status filter (Approved, In Review, etc.)
  const [selectedWaterQuality, setSelectedWaterQuality] = useState(null); // Selected item for map/detail panel

  /* ==========================================
     2. HELPER FUNCTIONS & DATA FILTERING
     ========================================== */
  // Helper to strictly match segment filters across the 5 project segments
  const matchesSegment = (itemSegment, filter) => {
    if (filter === 'All Segments') return true;
    return itemSegment.startsWith(`${filter}:`);
  };

  // Filtered dataset based on status, segment, and search query inputs
  const filteredData = waterQualityData
    .filter(item => wqStatusFilter === 'All Permits' || item.status === wqStatusFilter)
    .filter(item => matchesSegment(item.segment, wqSegmentFilter))
    .filter(item => 
      item.watershed.toLowerCase().includes(wqSearchTerm.toLowerCase()) || 
      item.id.toLowerCase().includes(wqSearchTerm.toLowerCase())
    );

  /* ==========================================
     3. COMPONENT RENDER
     ========================================== */
  return (
    <div className="space-y-4">
      
      {/* ------------------------------------------
         3.1 HEADER BAR & SUB-TAB NAVIGATION
         ------------------------------------------ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Water Quality Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Program-wide water quality compliance - Impervious cover, treatment volume, BMP planning, and watershed risk across every segment[cite: 2].</p>
        </div>

        {/* Sub-tab Switcher Buttons */}
        <div className="flex items-center bg-gray-200 p-1 rounded-lg border border-gray-300 text-xs">
          <button
            onClick={() => setWqSubTab('Overview & Map')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-bold transition-all ${
              wqSubTab === 'Overview & Map' ? 'bg-amber-500 text-white shadow' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Overview & Map</span>
          </button>
          <button
            onClick={() => setWqSubTab('List View')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-bold transition-all ${
              wqSubTab === 'List View' ? 'bg-amber-500 text-white shadow' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setWqSubTab('Treatment Calculations')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-bold transition-all ${
              wqSubTab === 'Treatment Calculations' ? 'bg-amber-500 text-white shadow' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Treatment Calculations</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------
         3.2 OVERVIEW & MAP OR LIST VIEW SECTIONS
         ------------------------------------------ */}
      {(wqSubTab === 'Overview & Map' || wqSubTab === 'List View') && (
        <>
          {/* Top Metric Summary Cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'EST. PAYMENT-IN-LIEU', value: '$22.8M', sub: 'Exclusively urban watersheds', color: 'border-l-4 border-red-500' },
              { label: 'DEFICIENT IC TREATMENT', value: '28.42 AC', sub: 'Urban watershed deficiency', color: 'border-l-4 border-amber-500' },
              { label: 'SUBURBAN OVERTREATMENT', value: '12.66 AC', sub: 'Applied as urban credit', color: 'border-l-4 border-emerald-500' },
              { label: 'ACTIVE PERMITS', value: '3', sub: 'Approved or active at 15', color: 'border-l-4 border-blue-500' }
            ].map((stat, i) => (
              <StatCard
                key={i}
                label={stat.label}
                value={stat.value}
                subtext={stat.sub}
                color={stat.color}
              />
            ))}
          </div>

          {/* Filtering and Search Control Bar */}
          <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              {/* Segment Dropdown Selector */}
              <div className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1 rounded border border-gray-200 text-xs text-gray-600">
                <span className="text-gray-400 font-medium">Segment:</span>
                <select
                  value={wqSegmentFilter}
                  onChange={(e) => setWqSegmentFilter(e.target.value)}
                  className="bg-transparent font-semibold text-gray-800 outline-none cursor-pointer"
                >
                  <option value="All Segments">All Segments</option>
                  <option value="Segment 1">Segment 1: 38th to MLK</option>
                  <option value="Segment 2">Segment 2: MLK to Cesar Chavez</option>
                  <option value="Segment 3">Segment 3: Bridge</option>
                  <option value="Segment 4">Segment 4: Riverside Split to S. Oltorf</option>
                  <option value="Segment 5">Segment 5: Riverside Split to Pleasant Valley</option>
                </select>
              </div>

              {/* Search Bar Input */}
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Watershed or ID..."
                  value={wqSearchTerm}
                  onChange={(e) => setWqSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded pl-8 pr-3 py-1 text-xs outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Status Filter Buttons */}
            <div className="flex items-center space-x-1 bg-gray-100 p-0.5 rounded text-xs">
              {['All Permits', 'Approved', 'In Review', 'Action Required'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setWqStatusFilter(filter)}
                  className={`px-3 py-1 rounded font-medium transition-all ${
                    wqStatusFilter === filter ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* GIS Map & Selected Permit Details Panel View */}
          {wqSubTab === 'Overview & Map' && (
            <div className="grid grid-cols-3 gap-4 h-[640px]">
              <div className="col-span-2 rounded-xl border border-gray-200 overflow-hidden relative h-full bg-gray-100">
                <div className="relative w-full h-[calc(100%+42px)] -mt-[57px]">
                  <iframe
                    title="Water Quality GIS Map"
                    src="https://atptx.maps.arcgis.com/apps/mapviewer/index.html?webmap=39b7a3e374e14d2784dbbd1b51d7534c"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-3.5 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start pb-2 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SELECTED PERMIT AREA</span>
                      <h2 className="text-base font-bold text-amber-600 font-mono">{selectedWaterQuality?.id || 'Select an Item'}</h2>
                    </div>
                    {selectedWaterQuality && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        selectedWaterQuality.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        selectedWaterQuality.status === 'Action Required' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {selectedWaterQuality.status}
                      </span>
                    )}
                  </div>

                  {selectedWaterQuality ? (
                    <div className="mt-2.5 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">Segment</span>
                        <span className="font-semibold text-gray-800">{selectedWaterQuality.segment}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">Watershed</span>
                        <span className="font-semibold text-gray-800">{selectedWaterQuality.watershed}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">Net IC Added</span>
                        <span className="font-semibold text-amber-600">{selectedWaterQuality.impCoverAdded}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">Required Treatment Vol</span>
                        <span className="font-semibold text-gray-800">{selectedWaterQuality.treatmentVol}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-50">
                        <span className="text-gray-400">BMP Feature Type</span>
                        <span className="font-semibold text-purple-700">{selectedWaterQuality.bmpType}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 text-center py-8">Select an item on the map or table.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Data Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 z-20 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <tr className="border-b border-gray-200 text-gray-500 uppercase font-semibold text-[10px]">
                    <th className="py-2.5 px-3 text-left">Permit ID</th>
                    <th className="py-2.5 px-3 text-left">Segment</th>
                    <th className="py-2.5 px-3 text-left">Watershed</th>
                    <th className="py-2.5 px-3 text-left">BMP Type</th>
                    <th className="py-2.5 px-3 text-left">Net IC Added</th>
                    <th className="py-2.5 px-3 text-left">Treatment Volume</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((row) => (
                    <tr key={row.id} onClick={() => setSelectedWaterQuality(row)} className="hover:bg-amber-50/50 cursor-pointer">
                      <td className="py-2.5 px-3 font-bold text-amber-600 font-mono">{row.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">{row.segment}</td>
                      <td className="py-2.5 px-3 text-gray-700">{row.watershed}</td>
                      <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-800">{row.bmpType}</span></td>
                      <td className="py-2.5 px-3 font-semibold text-amber-700">{row.impCoverAdded}</td>
                      <td className="py-2.5 px-3 text-gray-600">{row.treatmentVol}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                          row.status === 'Action Required' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-2.5 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500 font-medium text-right">
              Showing {filteredData.length} of {waterQualityData.length} records
            </div>
          </div>
        </>
      )}

      {/* ------------------------------------------
         3.3 TREATMENT CALCULATIONS SUB-TAB SECTION
         ------------------------------------------ */}
      {wqSubTab === 'Treatment Calculations' && (
        <TreatmentTables />
      )}
    </div>
  );
}