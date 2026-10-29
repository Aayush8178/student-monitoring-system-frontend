import React from 'react';

/**
 * Trend indicator component for showing performance trends
 */
export const TrendIndicator = ({ 
  value, 
  trend = 0,
  isPositive = true,
  label = '',
  showIcon = true
}) => {
  const isIncreasing = trend > 0;
  const trendColor = (isPositive && isIncreasing) || (!isPositive && !isIncreasing) 
    ? 'text-green-600' 
    : 'text-red-600';

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <div className={`text-lg font-bold ${trendColor}`}>
          {isIncreasing ? '📈' : '📉'}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">
          {value}
          {label && <span className="text-xs text-gray-500 ml-1">{label}</span>}
        </span>
        {trend !== 0 && (
          <span className={`text-xs font-medium ${trendColor}`}>
            {isIncreasing ? '+' : ''}{trend}% trend
          </span>
        )}
      </div>
    </div>
  );
};

export default TrendIndicator;
