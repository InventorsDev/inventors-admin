import React from "react";

const colorMap = {
  yellow: "text-yellow-500",
  teal: "text-teal-600",
  orange: "text-orange-500",
  amber: "text-amber-500",
  gray: "text-gray-700",
};

const bgColorMap = {
  yellow: "bg-yellow-100",
  teal: "bg-teal-100",
  orange: "bg-orange-100",
  amber: "bg-amber-100",
  gray: "bg-gray-100",
};

export default function DashboardStat({ icon, title, stats, variant, badge }) {
  const titleColor = colorMap[variant] || "text-gray-800";
  const iconBg = bgColorMap[variant] || "bg-gray-100";

  return (
    <div className="bg-white p-4 rounded-lg flex justify-between items-start">
      <div>
        <div
          className={`inline-flex p-3 ${titleColor} rounded-full items-center justify-center mb-2 ${iconBg}`}
        >
          {icon}
        </div>
        <div className={`mt-5 ${titleColor}`}>
          <h3 className={`text-xl font-normal`}>{title}</h3>
          <p className="text-sm mt-1">{stats}</p>
        </div>
      </div>
      {badge && (
        <span className="text-sm text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
