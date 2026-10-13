import React, { useState, useMemo } from 'react';
import { RotateCcw, Map, Table, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PermitTracker() {
  const initialRows = [
    { segment: 'Segment 1: 38th to MLK', permit_type: 'Site Plan', status: 'Design', action: 'AULCC coordination', owner: 'City of Austin', due: 'Jun 15', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 2: MLK to Cesar Chavez', permit_type: 'Site Plan Exemption', status: 'Pending Submittal', action: '30% design submittal to USD', owner: 'ARC - Design Lead', due: 'Jun 30', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 3: Bridge', permit_type: 'Right-of-Way', status: 'In Review', action: 'P3 permit review - action required', owner: 'ATP - Design Lead', due: 'May 17', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 4: Riverside Split to S. Oltorf', permit_type: 'Right-of-Entry', status: 'Awaiting Update', action: 'Fast track permit eligibility review', owner: 'FTA', due: 'Jul 1', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 5: Riverside Split to Pleasant Valley', permit_type: 'Traffic Control Plan', status: 'Approved', action: 'ROW acquisition behind schedule', owner: 'City of Austin', due: 'Jun 20', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 6: Pleasant Valley to Ben White', permit_type: 'General Permit', status: 'In Construction', action: 'Noise-mitigation-plan submitted', owner: 'ATP - Design Lead', due: 'Aug 2', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Priority Extension A: Hwy 71 to AUS', permit_type: 'AW GenP', status: 'Constructed', action: 'Heritage tree impact assessment', owner: 'ARC - Design Lead', due: 'May 28', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Priority Extension B: 40th ST to St Johns', permit_type: 'AULCC', status: 'Closed', action: 'Finalize utility alignment clearance', owner: 'City of Austin', due: 'Jul 10', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 1: 38th to MLK', permit_type: 'Site Plan Correction', status: 'Design', action: 'Address city comments on drainage', owner: 'ATP - Design Lead', due: 'Jun 18', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 2: MLK to Cesar Chavez', permit_type: 'Demolition Permit', status: 'Pending Submittal', action: 'Submit structure demo documentation', owner: 'FTA', due: 'Jul 5', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 3: Bridge', permit_type: 'Building Permit', status: 'In Review', action: 'Structural peer review ongoing', owner: 'ARC - Design Lead', due: 'May 22', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 4: Riverside Split to S. Oltorf', permit_type: 'Site Plan', status: 'Awaiting Update', action: 'Respond to zoning board comments', owner: 'City of Austin', due: 'Jul 12', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 5: Riverside Split to Pleasant Valley', permit_type: 'Site Plan Exemption', status: 'Approved', action: 'Verify environmental buffer clearances', owner: 'ATP - Design Lead', due: 'Jun 25', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 6: Pleasant Valley to Ben White', permit_type: 'Right-of-Way', status: 'In Construction', action: 'Coordinate utility potholing in ROW', owner: 'City of Austin', due: 'Aug 10', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Priority Extension A: Hwy 71 to AUS', permit_type: 'Right-of-Entry', status: 'Constructed', action: 'Complete post-construction inspection', owner: 'FTA', due: 'Jun 01', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Priority Extension B: 40th ST to St Johns', permit_type: 'Traffic Control Plan', status: 'Closed', action: 'Archive lane closure logs', owner: 'ARC - Design Lead', due: 'May 12', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 1: 38th to MLK', permit_type: 'General Permit', status: 'Design', action: 'Draft storm-water discharge plan', owner: 'ATP - Design Lead', due: 'Jul 15', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 2: MLK to Cesar Chavez', permit_type: 'AW GenP', status: 'Pending Submittal', action: 'Gather Austin Water connection specs', owner: 'City of Austin', due: 'Jul 20', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 3: Bridge', permit_type: 'AULCC', status: 'In Review', action: 'Bridge pier conflict resolution', owner: 'FTA', due: 'May 30', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 4: Riverside Split to S. Oltorf', permit_type: 'Site Plan Correction', status: 'Awaiting Update', action: 'Update boundary survey markers', owner: 'ARC - Design Lead', due: 'Jul 18', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 5: Riverside Split to Pleasant Valley', permit_type: 'Demolition Permit', status: 'Approved', action: 'Obtain hazmat clearance certification', owner: 'City of Austin', due: 'Jun 28', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 6: Pleasant Valley to Ben White', permit_type: 'Building Permit', status: 'In Construction', action: 'Foundation inspection sign-off', owner: 'ATP - Design Lead', due: 'Aug 15', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Priority Extension A: Hwy 71 to AUS', permit_type: 'Site Plan', status: 'Constructed', action: 'Final site stabilization review', owner: 'ARC - Design Lead', due: 'Jun 05', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Priority Extension B: 40th ST to St Johns', permit_type: 'Site Plan Exemption', status: 'Closed', action: 'Closeout exemption audit paperwork', owner: 'FTA', due: 'May 05', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 1: 38th to MLK', permit_type: 'Right-of-Way', status: 'Design', action: 'Map out corridor easement boundaries', owner: 'City of Austin', due: 'Jul 22', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 2: MLK to Cesar Chavez', permit_type: 'Right-of-Entry', status: 'Pending Submittal', action: 'Secure property owner entry waivers', owner: 'ATP - Design Lead', due: 'Jul 28', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 3: Bridge', permit_type: 'Traffic Control Plan', status: 'In Review', action: 'Submit detour routing for river bridge', owner: 'City of Austin', due: 'Jun 08', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 4: Riverside Split to S. Oltorf', permit_type: 'General Permit', status: 'Awaiting Update', action: 'Revise erosion control details', owner: 'FTA', due: 'Jul 25', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 5: Riverside Split to Pleasant Valley', permit_type: 'AW GenP', status: 'Approved', action: 'Pay Austin Water permit fees', owner: 'ARC - Design Lead', due: 'Jul 02', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 6: Pleasant Valley to Ben White', permit_type: 'AULCC', status: 'In Construction', action: 'Utility relocation active field support', owner: 'ATP - Design Lead', due: 'Aug 20', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Priority Extension A: Hwy 71 to AUS', permit_type: 'Site Plan Correction', status: 'Constructed', action: 'File as-built drawings with city', owner: 'City of Austin', due: 'Jun 12', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Priority Extension B: 40th ST to St Johns', permit_type: 'Demolition Permit', status: 'Closed', action: 'Decommissioning certification complete', owner: 'ARC - Design Lead', due: 'Apr 30', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 1: 38th to MLK', permit_type: 'Building Permit', status: 'Design', action: 'Substation enclosure structural draft', owner: 'ATP - Design Lead', due: 'Aug 01', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 2: MLK to Cesar Chavez', permit_type: 'Site Plan', status: 'Pending Submittal', action: 'Compile full submittal package', owner: 'ARC - Design Lead', due: 'Aug 05', risk: 'MEDIUM', riskBg: 'bg-amber-100 text-amber-800' },
    { segment: 'Segment 3: Bridge', permit_type: 'Site Plan Exemption', status: 'In Review', action: 'Army Corps river crossing exemption', owner: 'FTA', due: 'Jun 14', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 4: Riverside Split to S. Oltorf', permit_type: 'Right-of-Way', status: 'Awaiting Update', action: 'Appraisal review for parcel acquisitions', owner: 'City of Austin', due: 'Aug 08', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Segment 5: Riverside Split to Pleasant Valley', permit_type: 'Right-of-Entry', status: 'Approved', action: 'Distribute entry notices to residents', owner: 'ATP - Design Lead', due: 'Jul 08', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Segment 6: Pleasant Valley to Ben White', permit_type: 'Traffic Control Plan', status: 'In Construction', action: 'Night-time lane closure deployment', owner: 'City of Austin', due: 'Aug 25', risk: 'HIGH', riskBg: 'bg-red-100 text-red-800' },
    { segment: 'Priority Extension A: Hwy 71 to AUS', permit_type: 'General Permit', status: 'Constructed', action: 'Environmental closeout sign-off', owner: 'ARC - Design Lead', due: 'Jun 19', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' },
    { segment: 'Priority Extension B: 40th ST to St Johns', permit_type: 'AW GenP', status: 'Closed', action: 'Water line tie-in verification', owner: 'FTA', due: 'Apr 15', risk: 'LOW', riskBg: 'bg-emerald-100 text-emerald-800' }
  ];

  // Active view state: 'overview' | 'list'
  const [activeView, setActiveView] = useState('overview');

  // Selected Segment State (for display panel on the right)
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Pagination state (used in 'list' view)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Filter State
  const [filters, setFilters] = useState({
    segment: '',
    permit_type: '',
    status: '',
    action: '',
    owner: '',
    due: '',
    risk: ''
  });

  const filterOptions = useMemo(() => ({
    segment: [...new Set(initialRows.map(r => r.segment))],
    permit_type: [...new Set(initialRows.map(r => r.permit_type))],
    status: [...new Set(initialRows.map(r => r.status))],
    owner: [...new Set(initialRows.map(r => r.owner))],
    risk: [...new Set(initialRows.map(r => r.risk))]
  }), []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      segment: '',
      permit_type: '',
      status: '',
      action: '',
      owner: '',
      due: '',
      risk: ''
    });
    setSelectedSegment(null);
    setCurrentPage(1);
  };

  // Filter logic
  const filteredRows = useMemo(() => {
    return initialRows.filter(row => {
      return (
        (!filters.segment || row.segment === filters.segment) &&
        (!filters.permit_type || row.permit_type === filters.permit_type) &&
        (!filters.status || row.status === filters.status) &&
        (!filters.action || row.action.toLowerCase().includes(filters.action.toLowerCase())) &&
        (!filters.owner || row.owner === filters.owner) &&
        (!filters.due || row.due.toLowerCase().includes(filters.due.toLowerCase())) &&
        (!filters.risk || row.risk === filters.risk)
      );
    });
  }, [filters]);

  // Selected Segment Details Calculation
  const selectedSegmentDetails = useMemo(() => {
    if (!selectedSegment) return null;
    const items = initialRows.filter(r => r.segment === selectedSegment);
    if (items.length === 0) return null;

    const total = items.length;
    const highRisk = items.filter(i => i.risk === 'HIGH').length;
    const medRisk = items.filter(i => i.risk === 'MEDIUM').length;
    const lowRisk = items.filter(i => i.risk === 'LOW').length;
    const closed = items.filter(i => ['Approved', 'Constructed', 'Closed'].includes(i.status)).length;
    const pctClosed = Math.round((closed / total) * 100);

    return {
      name: selectedSegment,
      total,
      highRisk,
      medRisk,
      lowRisk,
      closed,
      pctClosed,
      items
    };
  }, [selectedSegment]);

  // Display rows
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const displayRows = useMemo(() => {
    if (activeView === 'overview') {
      return filteredRows;
    }
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRows.slice(start, start + itemsPerPage);
  }, [filteredRows, activeView, currentPage]);

  // KPI stats calculations
  const stats = useMemo(() => {
    const overdueCount = filteredRows.filter(r => r.risk === 'HIGH').length;
    const upcomingCount = filteredRows.filter(r => r.risk === 'MEDIUM').length;
    const totalPermits = filteredRows.length;
    const approvedOrConstructed = filteredRows.filter(r => ['Approved', 'Constructed', 'Closed', 'In Construction'].includes(r.status)).length;
    const totalTypes = new Set(filteredRows.map(r => r.permit_type)).size;
    const closedCount = filteredRows.filter(r => r.status === 'Closed' || r.status === 'Constructed').length;
    const closedPercentage = totalPermits > 0 ? Math.round((closedCount / totalPermits) * 100) : 0;

    return {
      overdueCount,
      upcomingCount,
      approvedOrConstructed,
      totalPermits,
      totalTypes,
      closedCount,
      closedPercentage
    };
  }, [filteredRows]);

  const hasActiveFilters = Object.values(filters).some(val => val !== '');

  // Selection handler without triggering filter changes
  const handleRowClick = (segmentName) => {
    setSelectedSegment(segmentName);
  };

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Permit Tracker</h1>
          <p className="text-xs text-gray-500 mt-0.5">Each program element defined by permit type - status, risk, and row visibility in one view</p>
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

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overdue Permit Actions</span>
          <div className="my-2">
            <span className="text-2xl font-bold text-red-600">{stats.overdueCount}</span>
          </div>
          <span className="text-xs font-medium text-red-600">Past target completion date</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Upcoming Permit Deadlines</span>
          <div className="my-2">
            <span className="text-2xl font-bold text-gray-900">{stats.upcomingCount}</span>
          </div>
          <span className="text-xs font-medium text-amber-600">Earliest target dates due next</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Permit Approval Progress</span>
          <div className="my-2">
            <span className="text-2xl font-bold text-gray-900">
              {stats.approvedOrConstructed} <span className="text-gray-400 font-normal">/</span> {stats.totalPermits}
            </span>
          </div>
          <span className="text-xs text-gray-500">(Across {stats.totalTypes} permit types)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Milestone Permit Progress</span>
          <div className="my-2">
            <span className="text-2xl font-bold text-emerald-600">
              {stats.closedCount} <span className="text-emerald-400 font-normal">/</span> {stats.totalPermits}
            </span>
          </div>
          <span className="text-xs text-gray-500">{stats.closedPercentage}% of milestone permits closed out</span>
        </div>
      </div>

      {/* Map Section */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[420px]">
            <iframe
              title="Permit Area Map"
              src="https://www.google.com/maps/d/embed?mid=11i1pEtbNEY1vgZBR1PNLUDCfxLtPXOY"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>

          {/* Right Panel - Dynamic Permit Area Details */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-[420px] overflow-y-auto">
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

                {/* Completion Progress Bar */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Permit Completion Progress</span>
                    <span>{selectedSegmentDetails.pctClosed}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedSegmentDetails.pctClosed}%` }}
                    />
                  </div>
                </div>

                {/* Risk & Status Breakdown */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-red-50 border border-red-100 rounded-lg">
                    <span className="block text-xs font-bold text-red-700">{selectedSegmentDetails.highRisk}</span>
                    <span className="text-[10px] text-red-600 uppercase font-semibold">High Risk</span>
                  </div>
                  <div className="p-2 bg-amber-50 border border-amber-100 rounded-lg">
                    <span className="block text-xs font-bold text-amber-700">{selectedSegmentDetails.medRisk}</span>
                    <span className="text-[10px] text-amber-600 uppercase font-semibold">Med Risk</span>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                    <span className="block text-xs font-bold text-emerald-700">{selectedSegmentDetails.lowRisk}</span>
                    <span className="text-[10px] text-emerald-600 uppercase font-semibold">Low Risk</span>
                  </div>
                </div>

                {/* Permits List inside Selected Segment */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Active Permits & Actions
                  </span>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {selectedSegmentDetails.items.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center font-bold text-gray-800">
                          <span>{item.permit_type}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] ${item.riskBg}`}>{item.risk}</span>
                        </div>
                        <p className="text-gray-600 text-[11px] truncate">{item.action}</p>
                        <div className="flex justify-between text-[10px] text-gray-400 pt-0.5">
                          <span>Owner: {item.owner}</span>
                          <span>Due: {item.due}</span>
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

      {/* Filter Options Bar */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
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
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Next Action</label>
            <input
              type="text"
              placeholder="Search actions..."
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
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
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Due Date</label>
            <input
              type="text"
              placeholder="Search date..."
              value={filters.due}
              onChange={(e) => handleFilterChange('due', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1 uppercase">Risk</label>
            <select
              value={filters.risk}
              onChange={(e) => handleFilterChange('risk', e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All Risks</option>
              {filterOptions.risk.map((r, idx) => (
                <option key={idx} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-400 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-3">SEGMENT</th>
              <th className="p-3">PERMIT TYPE</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">NEXT ACTION</th>
              <th className="p-3">ACTION OWNER</th>
              <th className="p-3">DUE/EXPECTED DATE</th>
              <th className="p-3">RISK (Based on duedate)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayRows.length > 0 ? (
              displayRows.map((row, idx) => {
                const isSelected = row.segment === selectedSegment;
                return (
                  <tr
                    key={idx}
                    onClick={() => handleRowClick(row.segment)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-50/70 hover:bg-amber-100/60' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="p-3 font-bold text-gray-900">{row.segment}</td>
                    <td className="p-3">
                      <span className="text-blue-600 border-b border-blue-200">{row.permit_type}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">{row.action}</td>
                    <td className="p-3 font-medium text-gray-800">{row.owner}</td>
                    <td className="p-3 text-gray-500 font-mono">{row.due}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.riskBg}`}>
                        {row.risk}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">
                  No permit records match your active filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        {filteredRows.length > 0 && (
          <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50 text-xs text-gray-500">
            {activeView === 'list' ? (
              <>
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
              </>
            ) : (
              <span>Showing all {filteredRows.length} entries</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}