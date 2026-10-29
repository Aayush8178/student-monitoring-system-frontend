import React from 'react';
import StatusBadge from './StatusBadge';

export const RecommendedClassesWidget = ({ recommendations = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/50 animate-pulse">
        <div className="h-6 w-1/3 bg-indigo-200/50 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-12 w-full bg-white/60 rounded-xl"></div>
          <div className="h-12 w-full bg-white/60 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/50 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">📅 Recommended Classes</h3>
        <p className="text-gray-500 text-sm">Upload your timetable and mark your preferences to see personalized recommendations!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/50 p-6 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 tracking-tight">📅 Recommended Classes</h3>
        <span className="text-xs font-semibold text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">Smart Schedule</span>
      </div>
      <p className="text-gray-600 mb-5 text-sm">
        Based on your current attendance patterns and uploaded timetable, here are the most critical classes to attend.
      </p>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border border-gray-100 shadow-sm hover:translate-x-1 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 text-indigo-700 font-bold px-3 py-2 rounded-lg text-center min-w-[60px]">
                <div className="text-xs uppercase">{rec.day.substring(0, 3)}</div>
                <div className="text-sm">{rec.time}</div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{rec.subject}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{rec.duration} mins • Shortage: {rec.shortage} classes</p>
              </div>
            </div>
            <StatusBadge status={rec.priority === 'Critical' ? 'CRITICAL' : rec.priority === 'Needed' ? 'HIGH' : 'SAFE'} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedClassesWidget;
