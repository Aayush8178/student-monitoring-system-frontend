import { useEffect, useState } from "react";
import API from "../api/api";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await API.get("/api/students/me");
        const attendanceRes = await API.get("/api/attendance/my");
        const assessmentRes = await API.get("/api/assessments/my");

        setStudent(studentRes.data);
        setAttendance(attendanceRes.data);
        setAssessments(assessmentRes.data);
      } catch (err) {
        console.error("Failed to load student dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!student) return <p>Student data not found</p>;

  const isAtRisk =
    student.attendancePercentage < 60 || student.averageScore < 40;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Welcome, {student.name}</h1>

      {/* risk */}
      <div>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            isAtRisk
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isAtRisk ? "At Risk" : "Safe"}
        </span>
      </div>

      {/* summary cards of students  */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
          <h3 className="text-gray-600 font-medium">Attendance</h3>
          <p className="text-3xl font-bold">{student.attendancePercentage}%</p>
          <p className="text-sm text-gray-500">
            {student.attendedClasses} / {student.totalClasses} classes
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
          <h3 className="text-gray-600 font-medium">Average Marks</h3>
          <p className="text-3xl font-bold">{student.averageScore}%</p>
          <p className="text-sm text-gray-500">
            Total Tests: {student.totalTests}
          </p>
        </div>
      </div>

      {/* attendance history */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Attendance</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No attendance records
                  </td>
                </tr>
              ) : (
                attendance.map((record) => (
                  <tr key={record._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">{record.subject}</td>
                    <td
                      className={`p-3 font-semibold ${
                        record.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* assessment history */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Test Scores</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No assessment records
                  </td>
                </tr>
              ) : (
                assessments.map((test) => (
                  <tr key={test._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(test.testDate).toLocaleDateString()}
                    </td>
                    <td className="p-3">{test.subject}</td>
                    <td
                      className={`p-3 font-semibold ${
                        test.score < 40 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {test.score}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
