/**
 * ============================================================================
 * COMPONENT: RowSequencingBoard
 * ============================================================================
 * Description: Parcel acquisition timelines aligned with design submittals and site access priority[cite: 4]. */

export default function RowSequencingBoard() {
  const columns = ['IN NEGOTIATION', 'AGREEMENT REACHED', 'ACQUIRED / CLEARED'];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">ROW Sequencing Board</h1>
        <p className="text-xs text-gray-500 mt-0.5">Parcel acquisition timelines aligned with design submittals and site access priority[cite: 4]</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {columns.map((col, idx) => (
          <div key={col} className="bg-gray-100/70 p-3 rounded-xl border border-gray-200">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
              <span>{col}</span>
              <span className="bg-gray-200 text-gray-700 px-1.5 rounded">{idx + 2}</span>
            </div>

            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm space-y-1">
                <div className="font-bold text-xs text-amber-600 font-mono">PARCEL ROW-108</div>
                <div className="text-xs font-semibold text-gray-800">Station 2 Entry Plaza</div>
                <div className="text-[11px] text-gray-500">Target Access: Aug 2025</div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm space-y-1">
                <div className="font-bold text-xs text-amber-600 font-mono">PARCEL ROW-112</div>
                <div className="text-xs font-semibold text-gray-800">Utility Corridor Segment B</div>
                <div className="text-[11px] text-gray-500">Target Access: Oct 2025</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}