import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Low", value: 79 },
  { name: "Medium", value: 13 },
  { name: "High", value: 7 },
  { name: "Critical", value: 2 },
];

const COLORS = ["#22c55e", "#facc15", "#f97316", "#ef4444"];

function RiskPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default RiskPieChart;
