// src/components/StatCard.jsx
export default function StatCard({ label, value, subtext, color, icon: Icon }) {
  return (
    <div className={`bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm ${color || ''}`}>
      {Icon && (
        <div className="p-2 w-fit rounded-lg bg-gray-50 mb-2">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</div>
      <div className="text-xl font-extrabold text-gray-900 my-0.5">{value}</div>
      {subtext && <div className="text-[10px] text-gray-500 font-medium">{subtext}</div>}
    </div>
  );
}