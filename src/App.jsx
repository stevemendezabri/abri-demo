import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import {
  LayoutDashboard,
  FileCheck,
  Droplets,
  TreePine,
  Layers,
  FileText,
  ChartNoAxesCombined,
  Clock} from 'lucide-react';

import ProgramDashboard from './views/ProgramDashboard';
import PermitTracker from './views/PermitTracker';
import WaterQualityDashboard from './views/WaterQualityDashboard';
import TreeTracking from './views/TreeTracking';
import RowSequencingBoard from './views/RowSequencingBoard';
import WeeklyDigest from './views/WeeklyDigest';
import ItemsPendingReview from './views/ItemsPendingReview';
import ProgramAnalytics from './views/ProgramAnalytics';

export default function App() {
  // Read saved tab from localStorage on initial render, default to 'Tree Tracking'
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'Tree Tracking';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const navTabs = [
    { name: 'Program Dashboard', icon: LayoutDashboard },
    { name: 'Permit Tracker', icon: FileCheck },
    { name: 'Water Quality Dashboard', icon: Droplets, headerName: 'Water Quality' },
    { name: 'Tree Tracking', icon: TreePine },
    { name: 'ROW Sequencing Board', icon: Layers },
    { name: 'Weekly Digest', icon: FileText },
    { name: 'Items Pending Review', icon: Clock },
    { name: 'Program Analytics', icon: ChartNoAxesCombined }
  ];

  return (
    <Layout navTabs={navTabs} activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'Program Dashboard' && <ProgramDashboard />}
      {activeTab === 'Permit Tracker' && <PermitTracker />}
      {(activeTab === 'Water Quality Dashboard' || activeTab === 'Water Quality') && <WaterQualityDashboard />}
      {activeTab === 'Tree Tracking' && <TreeTracking />}
      {activeTab === 'ROW Sequencing Board' && <RowSequencingBoard />}
      {activeTab === 'Weekly Digest' && <WeeklyDigest />}
      {activeTab === 'Items Pending Review' && <ItemsPendingReview />}
      {activeTab === 'Program Analytics' && <ProgramAnalytics />}
    </Layout>
  );
}