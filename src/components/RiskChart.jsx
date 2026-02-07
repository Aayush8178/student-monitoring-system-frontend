import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", Critical: 10, High: 20, Medium: 35, Low: 168 },
  { month: "Feb", Critical: 12, High: 22, Medium: 33, Low: 170 },
  { month: "Mar", Critical: 15, High: 18, Medium: 30, Low: 175 },
  { month: "Apr", Critical: 14, High: 25, Medium: 32, Low: 165 },
  { month: "May", Critical: 16, High: 20, Medium: 35, Low: 168 },
];

function RiskChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Critical" stroke="red" />
        <Line type="monotone" dataKey="High" stroke="orange" />
        <Line type="monotone" dataKey="Medium" stroke="gold" />
        <Line type="monotone" dataKey="Low" stroke="green" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default RiskChart;
