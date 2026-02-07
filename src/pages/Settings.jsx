import { useState } from "react";
import API from "../api/api";

function Settings() {
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [assessmentFile, setAssessmentFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file, endpoint) => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      await API.post(endpoint, formData);

      setMessage("✅ Upload successful");
      setTimeout(() => setMessage(""), 3000); // Auto hide after 3s
    } catch (err) {
      console.error(err);
      setMessage(" Upload failed");
      setTimeout(() => setMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700">Admin Tools</h2>

      {/* attendance upload section */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Upload Attendance</h3>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
          <p className="text-gray-500 mb-2">Select Excel file (.xlsx)</p>

          <label className="cursor-pointer inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition">
            Choose File
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setAttendanceFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {attendanceFile && (
            <p className="text-sm text-gray-600 mt-3">📄 {attendanceFile.name}</p>
          )}
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
          onClick={() => uploadFile(attendanceFile, "/api/attendance/upload")}
          disabled={!attendanceFile || loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Uploading...
            </>
          ) : (
            "Upload Attendance"
          )}
        </button>
      </div>

      {/* assessment upload sectin */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Upload Assessment</h3>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition">
          <p className="text-gray-500 mb-2">Select Excel file (.xlsx)</p>

          <label className="cursor-pointer inline-block bg-green-50 text-green-600 px-4 py-2 rounded-md hover:bg-green-100 transition">
            Choose File
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setAssessmentFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {assessmentFile && (
            <p className="text-sm text-gray-600 mt-3">📄 {assessmentFile.name}</p>
          )}
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
          onClick={() => uploadFile(assessmentFile, "/api/assessments/upload")}
          disabled={!assessmentFile || loading}
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Uploading...
            </>
          ) : (
            "Upload Assessment"
          )}
        </button>
      </div>

      {message && (
        <p className="text-center text-sm font-medium text-gray-600 animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}

export default Settings;
