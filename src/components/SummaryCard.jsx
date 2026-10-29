import React from 'react';

function SummaryCard({ title, value, change = 0, positive = true, icon = null }) {
  const gradients = {
    default: 'from-blue-50/80 to-blue-100/80 border-blue-400 text-blue-500',
    positive: 'from-emerald-50/80 to-teal-100/80 border-emerald-400 text-emerald-500',
    negative: 'from-rose-50/80 to-red-100/80 border-rose-400 text-rose-500',
  };

  const selectedTheme = positive ? gradients.positive : gradients.negative;

  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-br ${selectedTheme.split(' text-')[0]} backdrop-blur-sm
        border border-white/50
        rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]
        transition-all duration-300 ease-out
        p-6 border-l-4
        group cursor-default
      `}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            {title}
          </h3>
          {icon && <span className={`text-2xl ${selectedTheme.split(' text-')[1]}`}>{icon}</span>}
        </div>

        <p className="text-4xl font-extrabold text-gray-800 tracking-tight mb-3">{value}</p>

        {change !== 0 && (
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold ${
              positive ? 'text-emerald-500' : 'text-rose-500'
            }`}
          >
            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${positive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {positive ? '↑' : '↓'}
            </span>
            <span>{Math.abs(change)}% vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;
