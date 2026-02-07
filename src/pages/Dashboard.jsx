import { useEffect, useState } from "react";
import API from "../api/api";
import SummaryCard from "../components/SummaryCard";
import AlertCard from "../components/AlertCard";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const s = await API.get("/api/students");
      const a = await API.get("/api/alerts");
      setStudents(s.data);
      setAlerts(a.data);
    }
    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Students" value={students.length} />
        <SummaryCard title="Total Alerts" value={alerts.length} />
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-semibold mb-2">Recent Alerts</h3>
        {alerts.map(a => (
          <AlertCard
            key={a._id}
            name={a.studentId?.name}
            reason={a.reason}
            level={a.status}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
