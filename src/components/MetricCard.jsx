import React from 'react';

/**
 * Enhanced metric card with gradient backgrounds and trend indicators
 */
export const MetricCard = ({ 
  title, 
  value, 
  change = 0, 
  positive = true,
  icon = null,
  gradient = 'from-indigo-50/80 to-purple-50/80',
  borderColor = 'border-indigo-400'
}) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-br ${gradient} backdrop-blur-sm
      border border-white/50
      rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
      hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]
      transition-all duration-300 ease-out
      p-6 border-l-4 ${borderColor}
      group
    `}>
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
            {title}
          </h3>
          <p className="text-4xl font-extrabold text-gray-800 tracking-tight mb-3">{value}</p>
          
          {change !== 0 && (
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${
              positive ? 'text-emerald-500' : 'text-rose-500'
            }`}>
              <span className={`flex items-center justify-center w-5 h-5 rounded-full ${positive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {positive ? '↑' : '↓'}
              </span>
              <span>{Math.abs(change)}% vs last period</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`p-4 rounded-xl bg-white/70 shadow-sm text-2xl text-indigo-500 h-14 w-14 flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
