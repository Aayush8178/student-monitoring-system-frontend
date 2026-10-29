import React from 'react';
import StatusBadge from './StatusBadge';

export const AttendanceRecoveryPlanner = ({ plan = {}, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 p-6 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-100 rounded-xl"></div>
          <div className="h-32 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">🎯 Attendance Recovery Planner</h3>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">Weekly Plan</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map(day => {
          const dayPlan = plan[day] || [];
          const hasClasses = dayPlan.length > 0;

          return (
            <div key={day} className={`rounded-xl border p-4 transition-colors ${hasClasses ? 'bg-indigo-50/30 border-indigo-100' : 'bg-gray-50/50 border-gray-100'}`}>
              <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">{day}</h4>
              
              {!hasClasses ? (
                <p className="text-xs text-gray-400 italic">No critical classes scheduled.</p>
              ) : (
                <div className="space-y-2">
                  {dayPlan.map((classData, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-gray-50 flex items-center justify-between group hover:border-indigo-200 transition-colors">
                      <div>
                        <p className="font-bold text-sm text-gray-800 group-hover:text-indigo-600 transition-colors">{classData.subject}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{classData.time}</p>
                      </div>
                      <StatusBadge status={classData.priority === 'Critical' ? 'CRITICAL' : 'HIGH'} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceRecoveryPlanner;
