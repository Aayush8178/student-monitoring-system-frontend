import React, { useState } from 'react';
import API from '../api/api';
import Button from './Button';
import StatusBadge from './StatusBadge';

/**
 * Timetable Upload Component
 * Handles file upload and preview of parsed schedule
 */
const TimetableUpload = ({ studentId, onSuccess = null }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parsedSchedule, setParsedSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [manualEdit, setManualEdit] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload PDF, DOC, DOCX, XLS, or XLSX');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setParsedSchedule(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!studentId) {
      setError('Student ID is required');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('studentId', studentId);

      const response = await API.post('/api/timetable/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setParsedSchedule(response.data.timetable.schedule);
      setEditedSchedule(response.data.timetable.schedule);
      setSuccess(`Successfully parsed ${response.data.scheduleParsed} classes`);
      setFile(null);

      if (onSuccess) {
        onSuccess(response.data.timetable);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload timetable');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleEdit = (index, field, value) => {
    const updated = [...editedSchedule];
    updated[index][field] = value;
    setEditedSchedule(updated);
  };

  const handleSaveEdits = async () => {
    setLoading(true);
    try {
      const response = await API.put(`/api/timetable/${studentId}`, {
        schedule: editedSchedule
      });

      setSuccess('Timetable updated successfully');
      setParsedSchedule(response.data.timetable.schedule);
      setManualEdit(false);

      if (onSuccess) {
        onSuccess(response.data.timetable);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save timetable');
    } finally {
      setLoading(false);
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Timetable</h2>
      <p className="text-gray-600 mb-6">
        Upload your class schedule in PDF, DOC, DOCX, XLS, or XLSX format
      </p>

      {/* Alerts */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="text-red-800 font-medium">❌ {error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <p className="text-green-800 font-medium">✓ {success}</p>
        </div>
      )}

      {/* Upload Section */}
      {!parsedSchedule && (
        <form onSubmit={handleUpload} className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <div className="text-4xl mb-4">📄</div>
            <label className="cursor-pointer">
              <span className="text-blue-600 font-semibold hover:underline">Click to upload</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="hidden"
              />
            </label>
            <p className="text-gray-600 mt-2">or drag and drop</p>
            <p className="text-sm text-gray-500 mt-2">
              {file ? `Selected: ${file.name}` : 'Supported formats: PDF, DOC, DOCX, XLS, XLSX'}
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            loading={loading}
            disabled={!file}
          >
            {loading ? 'Parsing...' : 'Upload & Parse'}
          </Button>
        </form>
      )}

      {/* Preview & Edit Section */}
      {parsedSchedule && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Parsed Schedule</h3>
            {!manualEdit && (
              <button
                onClick={() => setManualEdit(true)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                ✎ Edit
              </button>
            )}
          </div>

          {manualEdit ? (
            // Edit Mode
            <div className="space-y-4 mb-6">
              {editedSchedule.map((entry, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={entry.subject}
                        onChange={(e) => handleScheduleEdit(idx, 'subject', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Day
                      </label>
                      <select
                        value={entry.day}
                        onChange={(e) => handleScheduleEdit(idx, 'day', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select day</option>
                        {daysOfWeek.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time (HH:MM)
                      </label>
                      <input
                        type="time"
                        value={entry.time}
                        onChange={(e) => handleScheduleEdit(idx, 'time', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={entry.duration}
                        onChange={(e) => handleScheduleEdit(idx, 'duration', parseInt(e.target.value))}
                        min="15"
                        max="480"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSaveEdits}
                  loading={loading}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setManualEdit(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-3 mb-6">
              {editedSchedule.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No classes scheduled</p>
              ) : (
                editedSchedule.map((entry, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📚</span>
                        <div>
                          <p className="font-semibold text-gray-900">{entry.subject}</p>
                          <p className="text-sm text-gray-600">
                            {entry.day} at {entry.time} ({entry.duration} min)
                          </p>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status="REQUIRED" size="sm" />
                  </div>
                ))
              )}
            </div>
          )}

          {/* Upload New File */}
          <button
            onClick={() => {
              setParsedSchedule(null);
              setEditedSchedule([]);
              setFile(null);
            }}
            className="w-full text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Upload Different File
          </button>
        </div>
      )}
    </div>
  );
};

export default TimetableUpload;
