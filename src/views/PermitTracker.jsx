/**
 * ============================================================================
 * COMPONENT: PermitTracker
 * ============================================================================
 * Description: Manages COA permit statuses, current action owners, risk assessments, 
 * approval timelines, and segment mapping across the project[cite: 7].
 * 
 * ORGANIZATION NOTE: 
 * - Leverages the shared `StatCard` component for top summary KPI cards 
 *   (Total Permits, Issued Permits, High Risk Items, and Completion Rate) 
 *   to maintain consistent card markup and clean dashboard layouts[cite: 7].
 * - Organizes state filters, pagination, interactive GIS mapping, and 
 *   expandable sequence step timelines into modular sections[cite: 7].
 */

import React, { useState, useMemo } from 'react';
import { RotateCcw, Map, Table, ChevronLeft, ChevronRight, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { permitTrackerData } from '../config/permittracker.config.js';
import { permitMasterTableData } from '../config/permitMasterTableData.js';
import StatCard from '../components/StatCard';

/**
 * ============================================================================
 * HELPER FUNCTIONS
 * ============================================================================
 */
// Helper function to normalize various date formats (e.g., "Oct 19, 2026") into standard "YYYY-MM-DD"
const normalizeDate = (dateStr) => {
  if (!dateStr || !dateStr.trim()) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr.toLowerCase();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function PermitTracker() {
  const initialRows = permitTrackerData;

  /* ==========================================
     1. STATE MANAGEMENT HOOKS
     ========================================== */
  const [activeView, setActiveView] = useState('overview'); // Active view toggle: 'overview' | 'list'
  const [selectedSegment, setSelectedSegment] = useState(null); // Currently selected segment for detail panel & map
  const [expandedRows, setExpandedRows] = useState(new Set()); // Set of expanded row keys for action timelines
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page index
  const itemsPerPage = 20; // Pagination limit per page

  // Filter state matching spreadsheet columns + Risk level
  const [filters, setFilters] = useState({
    permit_number: '',
    segment: '',
    permit_type: '',
    owner: '',
    approval_date: '',
    status: '',
    action: '',
    due: '',
    risk: ''
  });

  /* ==========================================
     2. MEMOIZED FILTER OPTIONS & HANDLERS
     ========================================== */
  // Dynamically derive filter dropdown selections from dataset
  const filterOptions = useMemo(() => ({
    segment: [...new Set(initialRows.map(r => r.segment).filter(Boolean))].sort(),
    permit_type: [...new Set(initialRows.map(r => r.permit_type).filter(Boolean))].sort(),
    status: [...new Set(initialRows.map(r => r.status).filter(Boolean))].sort(),
    owner: [...new Set(initialRows.map(r => r.owner).filter(Boolean))].sort(),
    risk: ['High', 'Medium', 'Low']
  }), [initialRows]);

  // Update specific filter field and reset to page 1
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  // Reset all filters and selection states back to default
  const resetFilters = () => {
    setFilters({
      permit_number: '',
      segment: '',
      permit_type: '',
      owner: '',
      approval_date: '',
      status: '',
      action: '',
      due: '',
      risk: ''
    });
    setSelectedSegment(null);
    setCurrentPage(1);
  };

  /* ==========================================
     3. DATA FILTERING & CALCULATIONS
     ========================================== */
  // Filter dataset based on search inputs and normalized dates
  const filteredRows = useMemo(() => {
    return initialRows.filter(row => {
      const rowApproval = normalizeDate(row.approval_date);
      const rowDue = normalizeDate(row.due);

      return (
        (!filters.permit_number || row.permit_number.toLowerCase().includes(filters.permit_number.toLowerCase())) &&
        (!filters.segment || row.segment === filters.segment) &&
        (!filters.permit_type || row.permit_type === filters.permit_type) &&
        (!filters.owner || row.owner === filters.owner) &&
        (!filters.approval_date || rowApproval === filters.approval_date) &&
        (!filters.status || row.status === filters.status) &&
        (!filters.action || row.action.toLowerCase().includes(filters.action.toLowerCase())) &&
        (!filters.due || rowDue === filters.due) &&
        (!filters.risk || row.risk === filters.risk)
      );
    });
  }, [filters, initialRows]);

  // Calculate detailed statistics for the currently selected segment panel
  const selectedSegmentDetails = useMemo(() => {
    if (!selectedSegment) return null;
    const items = initialRows.filter(r => r.segment === selectedSegment);
    if (items.length === 0) return null;

    const total = items.length;
    const issuedCount = items.filter(i => i.status === 'Issued').length;
    const pendingCount = items.filter(i => !i.status || i.status !== 'Issued').length;
    const highRiskCount = items.filter(i => i.risk === 'High').length;
    const pctCompleted = total > 0 ? Math.round((issuedCount / total) * 100) : 0;

    return {
      name: selectedSegment,
      total,
      issuedCount,
      pendingCount,
      highRiskCount,
      pctCompleted,
      items
    };
  }, [selectedSegment, initialRows]);

  // Paginated rows for active table view
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage) || 1;
  const displayRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRows.slice(start, start + itemsPerPage);
  }, [filteredRows, currentPage, itemsPerPage]);

  // Global KPI statistics for the top summary metric cards
  const stats = useMemo(() => {
    const totalPermits = filteredRows.length;
    const issuedCount = filteredRows.filter(r => r.status === 'Issued').length;
    const highRiskCount = filteredRows.filter(r => r.risk === 'High').length;
    const totalTypes = new Set(filteredRows.map(r => r.permit_type).filter(Boolean)).size;
    const completionPercentage = totalPermits > 0 ? Math.round((issuedCount / totalPermits) * 100) : 0;

    return {
      totalPermits,
      issuedCount,
      highRiskCount,
      totalTypes,
      completionPercentage
    };
  }, [filteredRows]);

  const hasActiveFilters = Object.values(filters).some(val => val !== '');

  /* ==========================================
     4. EVENT HANDLERS & TIMELINE UTILITIES
     ========================================== */
  const handleRowClick = (segmentName) => {
    if (segmentName) setSelectedSegment(segmentName);
  };

  // Toggle expansion state for expandable timeline steps row
  const toggleRowExpansion = (rowKey, e) => {
    e.stopPropagation();
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(rowKey)) {
        next.delete(rowKey);
      } else {
        next.add(rowKey);
      }
      return next;
    });
  };

  // Retrieve all sequence steps from Master Table for a given permit type
  const getMasterStepsForPermit = (row) => {
    const permitType = row.permit_type;
    const currentActionId = row.action_id;

    const typeSteps = permitMasterTableData.filter(m => m.permit_type === permitType);
    if (typeSteps.length === 0) return [];

    typeSteps.sort((a, b) => a.action_id - b.action_id);

    return typeSteps.map((step, idx) => ({
      ...step,
      isCurrent: step.action_id === currentActionId,
      isLast: idx === typeSteps.length - 1
    }));
  };

  // Helper to render colored risk badge components
  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">High</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Medium</span>;
      case 'Low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Low</span>;
      default:
        return <span className="text-gray-400">—</span>;
    }
  };

  /* ==========================================
     5. COMPONENT RENDER
     ========================================== */
  return (
    <div className="space-y-6">
      
      {/* ------------------------------------------
         5.1 HEADER BAR & VIEW TOGGLE SWITCHER
         ------------------------------------------ */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Permit Tracker</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            COA permit status, current action owner, risk assessment, and approval tracking across segments[cite: 7]
          </p>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
          <button
            onClick={() => setActiveView('overview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeView === 'overview'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Overview & Map</span>
          </button>

          <button
            onClick={() => setActiveView('list')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeView === 'list'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Permit List</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------
         5.2 KPI SUMMARY CARDS (OVERVIEW VIEW ONLY)
         ------------------------------------------ */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Permits"
            value={stats.totalPermits}
            subtext={`Across ${stats.totalTypes} permit types`}
          />

          <StatCard
            label="Issued Permits"
            value={stats.issuedCount}
            subtext="Fully approved & issued"
            color="border-l-4 border-emerald-500"
          />

          <StatCard
            label="High Risk Items"
            value={stats.highRiskCount}
            subtext="Pending critical submittals"
            color="border-l-4 border-red-500"
          />

          <StatCard
            label="Completion Rate"
            value={`${stats.completionPercentage}%`}
            subtext={`${stats.issuedCount} of ${stats.totalPermits} permits issued`}
            color="border-l-4 border-blue-500"
          />
        </div>
      )}

      {/* ------------------------------------------
         5.3 GIS MAP & DYNAMIC SEGMENT DETAILS DRAWER
         ------------------------------------------ */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[640px] relative">
            <iframe
              title="Permit Area Map"
              src="https://atptx.maps.arcgis.com/apps/mapviewer/index.html?webmap=39b7a3e374e14d2784dbbd1b51d7534c"
              className="w-full h-[calc(100%+57px)] -mt-[57px] border-0"
              allowFullScreen
            />
          </div>

          {/* Right Panel - Dynamic Permit Area Details */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[640px] overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                SELECTED PERMIT AREA
              </span>
              {selectedSegmentDetails && (
                <button
                  onClick={() => setSelectedSegment(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  title="Clear selection"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {selectedSegmentDetails ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-amber-600 font-bold text-base leading-tight">
                    {selectedSegmentDetails.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedSegmentDetails.total} Associated Permits
                  </p>
                </div>

                {/* Segment Progress Bar */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Issued Progress</span>
                    <span>{selectedSegmentDetails.pctCompleted}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedSegmentDetails.pctCompleted}%` }}
                    />
                  </div>
                </div>

                {/* Status Breakdown Counters */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <span className="block text-xs font-bold text-emerald-700">{selectedSegmentDetails.issuedCount}</span>
                    <span className="text-[10px] text-emerald-600 uppercase font-semibold">Issued</span>
                  </div>
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="block text-xs font-bold text-gray-700">{selectedSegmentDetails.pendingCount}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">In Progress</span>
                  </div>
                  <div className="p-2 bg-red-50 border border-red-100 rounded-lg">
                    <span className="block text-xs font-bold text-red-700">{selectedSegmentDetails.highRiskCount}</span>
                    <span className="text-[10px] text-red-600 uppercase font-semibold">High Risk</span>
                  </div>
                </div>

                {/* Segment Active List Items */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Active Permits & Risk Status
                  </span>
                  <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                    {selectedSegmentDetails.items.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold text-gray-800">
                          <span>{item.permit_type}</span>
                          {getRiskBadge(item.risk)}
                        </div>
                        <p className="text-gray-600 text-[11px] truncate">{item.action}</p>
                        <div className="flex justify-between text-[10px] text-gray-400 pt-0.5">
                          <span>Owner: {item.owner || '—'}</span>
                          <span>Due: {item.due || '—'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg p-6 text-center">
                <p className="text-xs text-gray-400">
                  Select an item on the map or click a row in the permit table below to view segment details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------
         5.4 FILTER OPTIONS & SEARCH CONTROLS BAR
         ------------------------------------------ */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Filter Options</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Permit Number</label>
            <input
              type="text"
              placeholder="Search..."
              value={filters.permit_number}
              onChange={(e) => handleFilterChange('permit_number', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Segment</label>
            <select
              value={filters.segment}
              onChange={(e) => handleFilterChange('segment', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Segments</option>
              {filterOptions.segment.map((seg, idx) => (
                <option key={idx} value={seg}>{seg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Permit Type</label>
            <select
              value={filters.permit_type}
              onChange={(e) => handleFilterChange('permit_type', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Types</option>
              {filterOptions.permit_type.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Action Owner</label>
            <select
              value={filters.owner}
              onChange={(e) => handleFilterChange('owner', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Owners</option>
              {filterOptions.owner.map((own, idx) => (
                <option key={idx} value={own}>{own}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Approval Date</label>
            <input
              type="date"
              value={filters.approval_date}
              onChange={(e) => handleFilterChange('approval_date', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Statuses</option>
              {filterOptions.status.map((st, idx) => (
                <option key={idx} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Risk</label>
            <select
              value={filters.risk}
              onChange={(e) => handleFilterChange('risk', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Risk Levels</option>
              {filterOptions.risk.map((rk, idx) => (
                <option key={idx} value={rk}>{rk}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Current Action</label>
            <input
              type="text"
              placeholder="Search actions..."
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Due Date</label>
            <input
              type="date"
              value={filters.due}
              onChange={(e) => handleFilterChange('due', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------
         5.5 MAIN PERMITS DATA TABLE & TIMELINE DROPDOWNS
         ------------------------------------------ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-400 uppercase font-semibold text-[10px]">
            <tr>
              <th className="w-[12%] p-3">COA PERMIT NUMBER</th>
              <th className="w-[10%] p-3">SEGMENT</th>
              <th className="w-[10%] p-3">PERMIT TYPE</th>
              <th className="w-[11%] p-3">CURRENT ACTION OWNER</th>
              <th className="w-[10%] p-3">APPROVAL DATE</th>
              <th className="w-[9%] p-3">STATUS</th>
              <th className="w-[8%] p-3">RISK</th>
              <th className="w-[20%] p-3">CURRENT ACTION</th>
              <th className="w-[10%] p-3">CURRENT ACTION DUE DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayRows.length > 0 ? (
              displayRows.map((row, idx) => {
                const rowKey = `${row.permit_number}-${row.segment}-${row.permit_type}-${idx}`;
                const isExpanded = expandedRows.has(rowKey);
                const isSelected = row.segment === selectedSegment;
                const timelineSteps = isExpanded ? getMasterStepsForPermit(row) : [];

                return (
                  <React.Fragment key={idx}>
                    <tr
                      onClick={() => handleRowClick(row.segment)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-amber-50/70 hover:bg-amber-100/60' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="p-3 font-mono font-medium text-gray-700 truncate">{row.permit_number || '—'}</td>
                      <td className="p-3 font-bold text-gray-900 truncate">{row.segment || '—'}</td>
                      <td className="p-3 truncate">
                        <span className="text-blue-600 border-b border-blue-200">{row.permit_type || '—'}</span>
                      </td>
                      <td className="p-3 font-medium text-gray-800 truncate">{row.owner || '—'}</td>
                      <td className="p-3 text-gray-500 font-mono truncate">{row.approval_date || '—'}</td>
                      <td className="p-3 truncate">
                        {row.status ? (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block truncate max-w-full ${
                              row.status === 'Issued'
                                ? 'bg-emerald-100 text-emerald-800'
                              : row.status === 'Meeting Scheduled'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {row.status}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-3 truncate">{getRiskBadge(row.risk)}</td>
                      <td className="p-3 text-gray-700">
                        <div className="flex items-center space-x-2 overflow-hidden">
                          <button
                            onClick={(e) => toggleRowExpansion(rowKey, e)}
                            className="w-5 h-5 flex-shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none shadow-sm transition-transform active:scale-95"
                            title={isExpanded ? "Collapse action steps" : "Expand action steps"}
                          >
                            {isExpanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                          <span className="truncate">{row.action || '—'}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-500 font-mono truncate">{row.due || '—'}</td>
                    </tr>

                    {/* Expandable Step Timeline Row with Horizontal Scrolling */}
                    {isExpanded && (
                      <tr className="bg-gray-50/80 border-y border-gray-200">
                        <td colSpan={9} className="p-4">
                          <div className="flex items-center overflow-x-auto py-2 px-1 space-x-3 scrollbar-thin scrollbar-thumb-gray-300">
                            {timelineSteps.map((step, sIdx) => (
                              <React.Fragment key={step.action_id}>
                                <div
                                  className={`flex flex-col items-center justify-between p-3 rounded-xl border min-w-[150px] max-w-[180px] h-[120px] text-center transition-all flex-shrink-0 ${
                                    step.isCurrent
                                      ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20 scale-105'
                                      : 'bg-white/60 border-gray-200 text-gray-600'
                                  }`}
                                >
                                  <span
                                    className={`text-[11px] font-bold line-clamp-2 ${
                                      step.isCurrent ? 'text-gray-900 font-extrabold' : 'text-gray-700'
                                    }`}
                                  >
                                    {step.action}
                                  </span>
                                  <span className="text-[10px] text-gray-400 font-mono my-1">
                                    {step.due}
                                  </span>
                                  <div className="min-h-[22px] flex items-center justify-center">
                                    {step.isCurrent && (
                                      <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-full">
                                        CURRENT STEP
                                      </span>
                                    )}
                                    {step.isLast && !step.isCurrent && (
                                      <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 rounded-full">
                                        LAST STEP
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {sIdx < timelineSteps.length - 1 && (
                                  <div className="flex-shrink-0 text-gray-400">
                                    <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-400">
                  No permit records match your active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ------------------------------------------
           5.6 FOOTER WITH PAGINATION CONTROLS
           ------------------------------------------ */}
        {filteredRows.length > 0 && (
          <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50 text-xs text-gray-500">
            <span>
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredRows.length)} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredRows.length)} of {filteredRows.length} entries
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}