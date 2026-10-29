import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", Critical: 10, High: 20, Medium: 35, Low: 168 },
  { month: "Feb", Critical: 12, High: 22, Medium: 33, Low: 170 },
  { month: "Mar", Critical: 15, High: 18, Medium: 30, Low: 175 },
  { month: "Apr", Critical: 14, High: 25, Medium: 32, Low: 165 },
  { month: "May", Critical: 16, High: 20, Medium: 35, Low: 168 },
];

/**
 * Custom tooltip for enhanced chart interaction
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function RiskChart() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Distribution Over Time</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart 
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="Critical" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="🔴 Critical"
          />
          <Line 
            type="monotone" 
            dataKey="High" 
            stroke="#f97316" 
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="🟠 High"
          />
          <Line 
            type="monotone" 
            dataKey="Medium" 
            stroke="#eab308" 
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="🟡 Medium"
          />
          <Line 
            type="monotone" 
            dataKey="Low" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
            name="🟢 Low"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RiskChart;
