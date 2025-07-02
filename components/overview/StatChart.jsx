import React, { useState } from "react";
import { Icon } from "@iconify/react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const tabs = ["Lead", "Blog", "Event"];

const data = [
  { day: "Sun", Approved: 10, Pending: 10, Deactivated: 10 },
  { day: "Mon", Approved: 15, Pending: 10, Deactivated: 8 },
  { day: "Tue", Approved: 18, Pending: 9, Deactivated: 9 },
  { day: "Wed", Approved: 22, Pending: 10, Deactivated: 9 },
  { day: "Thu", Approved: 15, Pending: 9, Deactivated: 8 },
  { day: "Fri", Approved: 12, Pending: 10, Deactivated: 8 },
  { day: "Sat", Approved: 16, Pending: 9, Deactivated: 8 },
];

export default function StatChart() {
  const [activeTab, setActiveTab] = useState("Lead");

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-7">
      {/* Tabs, Legend, and Filter as grid */}
      <div className="grid md:grid-cols-3 gap-4 items-center mb-4">
        {/* Tab group: col-span-2, gray bg, no active bg */}
        <div className="col-span-2 bg-gray-100 rounded-t-lg p-1 grid grid-cols-3 gap-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full px-3 py-2 text-base border-b-[3px] ${
                activeTab === tab
                  ? "border-teal-600 text-teal-700 font-semibold"
                  : "border-transparent text-gray-500 hover:text-teal-600"
              }`}
              style={{ background: "none" }}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Filter: col 3, normal select */}
        <div className="flex md:justify-end">
          <select className="w-40 border border-gray-300 text-sm px-4 py-3 rounded-lg text-gray-600 bg-white select-custom">
            <option>Last month</option>
          </select>
        </div>
      </div>
      {/* Legend under tab group */}
      <div className="flex space-x-6 mb-4 ml-1">
        <LegendItem color="bg-teal-600" label="Approved" />
        <LegendItem color="bg-yellow-400" label="Pending" />
        <LegendItem color="bg-gray-700" label="Deactivated" />
      </div>
      {/* Chart */}
      <div className="bg-teal-50 p-2 rounded-lg">
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={data} barCategoryGap="40%" barGap={4}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="Pending"
              stackId="a"
              fill="#facc15"
              barSize={12}
              radius={[0, 0, 8, 8]}
            />
            <Bar
              dataKey="Deactivated"
              stackId="a"
              fill="#374151"
              barSize={12}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="Approved"
              stackId="a"
              fill="#0d9488"
              barSize={12}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Download button full width below chart */}
      <div className="mt-6">
        <button className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 flex items-center justify-center space-x-2">
          <span>Download</span>
          <Icon icon="mynaui:chevron-down-solid" />
        </button>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
        <div className="font-semibold text-gray-700 mb-1">{label}</div>
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center space-x-2 mb-0.5"
          >
            <span
              className={`inline-block w-2 h-2 rounded-full`}
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize text-gray-600">{entry.dataKey}:</span>
            <span className="font-semibold text-gray-800">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
