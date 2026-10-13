import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ navTabs, activeTab, setActiveTab, children }) {
  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1F2937] font-sans antialiased overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar navTabs={navTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN VIEW AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <Header navTabs={navTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}