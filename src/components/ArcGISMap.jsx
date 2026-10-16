import React from 'react';

export default function ArcGISMap({ src, title = "GIS Map", className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-200 shadow-sm overflow-hidden h-[640px] relative ${className}`}>
      <iframe
        title={title}
        src={src}
        className="w-full h-[calc(100%+57px)] -mt-[57px] border-0"
        allowFullScreen
      />
    </div>
  );
}