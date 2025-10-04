import React from "react";

export default function PerformanceChart({ data = [] }) {
  const months = (data || []).slice(0, 6).reverse();
  if (!months.length) return <div className="text-gray-500">No performance data</div>;
  const max = Math.max(...months.map(m => m.sales || 0), 1);

  return (
    <div className="w-full h-40 flex items-end space-x-3">
      {months.map((m, idx) => {
        const height = ((m.sales || 0) / max) * 100;
        return (
          <div key={idx} className="flex-1 text-center">
            <div className="mx-auto h-40 flex items-end">
              <div className="bg-blue-500 rounded-t" style={{ height: `${height}%`, width: "100%" }} />
            </div>
            <div className="text-xs mt-2 text-gray-600">{m.month}</div>
          </div>
        );
      })}
    </div>
  );
}
