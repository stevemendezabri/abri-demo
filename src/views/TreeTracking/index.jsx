import React, { useState } from 'react';
import TreeKpiCards from './TreeKpiCards';
import TreeFilters from './TreeFilters';
import TreeMapView from './TreeMapView';
import TreeTable from './TreeTable';

export default function TreeTracking({ treeInventory, selectedTree, setSelectedTree, onQueryChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Trees');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onQueryChange(val, statusFilter, segmentFilter);
  };

  const handleFilterClick = (status) => {
    setStatusFilter(status);
    onQueryChange(searchTerm, status, segmentFilter);
  };

  const handleSegmentChange = (segment) => {
    setSegmentFilter(segment);
    onQueryChange(searchTerm, statusFilter, segment);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Tree Tracking</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Track trees within the Austin Light Rail program – removal, mitigation, protection, and compliance through completion
        </p>
      </div>

      <TreeKpiCards />

      <TreeFilters 
        searchTerm={searchTerm} 
        onSearchChange={handleSearch}
        statusFilter={statusFilter}
        onStatusChange={handleFilterClick}
        segmentFilter={segmentFilter}
        onSegmentChange={handleSegmentChange}
      />

      <TreeMapView selectedTree={selectedTree} />

      <TreeTable 
        treeInventory={treeInventory} 
        onSelectTree={setSelectedTree} 
      />
    </div>
  );
}