import { useEffect, useState } from "react";
import API from "../api/api";

const AtRiskStudents = () => {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await API.get("/api/alerts");
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/api/alerts/${id}/status`, { status });
    fetchAlerts();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">At Risk Students</h1>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white p-5 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Attendance %</th>
              <th className="p-3">Marks %</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No active alerts!!!!
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr key={alert._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{alert.studentId.name}</td>
                  <td className="p-3">{alert.reason}</td>
                  <td className="p-3">{alert.studentId.attendancePercentage}%</td>
                  <td className="p-3">{alert.studentId.averageScore}%</td>
                  <td className="p-3 font-semibold capitalize">{alert.status}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => updateStatus(alert._id, "contacted")}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Contacted
                    </button>
                    <button
                      onClick={() => updateStatus(alert._id, "resolved")}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Resolved
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-white p-5 rounded-xl shadow-md text-center text-gray-500">
            No active alerts !!!!
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert._id} className="bg-white p-4 rounded-xl shadow-md space-y-2">
              <p className="font-semibold text-lg">{alert.studentId.name}</p>
              <p className="text-sm text-gray-600">{alert.reason}</p>
              <p className="text-sm">
                Attendance: <b>{alert.studentId.attendancePercentage}%</b>
              </p>
              <p className="text-sm">
                Marks: <b>{alert.studentId.averageScore}%</b>
              </p>
              <p className="text-sm font-semibold capitalize">
                Status: {alert.status}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => updateStatus(alert._id, "contacted")}
                  className="flex-1 px-2 py-2 bg-yellow-500 text-white rounded"
                >
                  Contacted
                </button>
                <button
                  onClick={() => updateStatus(alert._id, "resolved")}
                  className="flex-1 px-2 py-2 bg-green-600 text-white rounded"
                >
                  Resolved
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AtRiskStudents;
