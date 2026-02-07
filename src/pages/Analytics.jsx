import { useEffect, useState } from "react";
import API from "../api/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const Analytics = () => {
  const [overview, setOverview] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const overviewRes = await API.get("/api/analytics/overview");
      const attendanceRes = await API.get("/api/analytics/attendance-distribution");
      const performanceRes = await API.get("/api/analytics/performance-distribution");

      setOverview(overviewRes.data);
      setAttendanceData(attendanceRes.data);
      setPerformanceData(performanceRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin Analytics</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          Total Students: {overview.totalStudents}
        </div>
        <div className="bg-white p-4 rounded shadow text-red-600">
          Low Attendance: {overview.lowAttendance}
        </div>
        <div className="bg-white p-4 rounded shadow text-yellow-600">
          Low Performance: {overview.lowPerformance}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-2">Attendance Distribution</h2>
          <PieChart width={300} height={300}>
            <Pie data={attendanceData} dataKey="value" nameKey="name" outerRadius={100}>
              {attendanceData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-2">Performance Distribution</h2>
          <PieChart width={300} height={300}>
            <Pie data={performanceData} dataKey="value" nameKey="name" outerRadius={100}>
              {performanceData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
