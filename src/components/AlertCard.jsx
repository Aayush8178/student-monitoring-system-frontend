import StatusBadge from './StatusBadge';

function AlertCard({ name, reason, level = 'pending', timestamp = null }) {
  const getLevelVariant = (level) => {
    if (level === 'critical risk' || level === 'pending') return 'CRITICAL';
    if (level === 'high risk') return 'HIGH';
    return 'MEDIUM';
  };

  const getIcon = (level) => {
    if (level === 'critical risk' || level === 'pending') return '🔴';
    if (level === 'high risk') return '🟠';
    return '🟡';
  };

  return (
    <div className="
      bg-white shadow-md hover:shadow-lg rounded-lg p-4 mb-3
      border-l-4 border-red-400 transition-all duration-300
      hover:scale-102 flex items-center justify-between gap-4
    ">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className="text-2xl flex-shrink-0">{getIcon(level)}</span>
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{name}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{reason}</p>
          {timestamp && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(timestamp).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex-shrink-0">
        <StatusBadge status={getLevelVariant(level)} size="sm" />
      </div>
    </div>
  );
}

export default AlertCard;
