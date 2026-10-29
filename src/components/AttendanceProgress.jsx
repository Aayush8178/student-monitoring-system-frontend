import React from 'react';

/**
 * Attendance progress visualization component
 */
export const AttendanceProgress = ({ 
  attended = 0, 
  total = 0,
  subject = '',
  showDetails = true
}) => {
  const percentage = total === 0 ? 0 : Math.round((attended / total) * 100);
  
  let progressColor = 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  let bgColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  
  if (percentage < 60) {
    progressColor = 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
    bgColor = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (percentage < 75) {
    progressColor = 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]';
    bgColor = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  const riskLabel = percentage < 60 ? '⚠️ At Risk' : percentage < 75 ? '⚡ Caution' : '✓ Safe';

  return (
    <div className="space-y-2">
      {subject && (
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-700">{subject}</span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${bgColor}`}>
            {percentage}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner flex relative">
        <div className="absolute inset-0 bg-white/40 pattern-diagonal-lines-sm opacity-50 pointer-events-none mix-blend-overlay"></div>
        <div
          className={`${progressColor} h-full transition-all duration-1000 ease-out rounded-full relative`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showDetails && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">{attended} / {total} classes</span>
          <span className="font-semibold text-gray-700">{riskLabel}</span>
        </div>
      )}
    </div>
  );
};

export default AttendanceProgress;
