import StatusBadge from './StatusBadge';
import AttendanceProgress from './AttendanceProgress';

function StudentCard({
  name,
  grade,
  riskLevel,
  attendance,
  averageScore,
  factors = [],
  id = null,
  onClick = null,
}) {
  const riskGradient = {
    CRITICAL: 'from-red-50 to-red-100 border-l-4 border-red-500',
    HIGH: 'from-orange-50 to-orange-100 border-l-4 border-orange-500',
    MEDIUM: 'from-yellow-50 to-yellow-100 border-l-4 border-yellow-500',
    LOW: 'from-green-50 to-green-100 border-l-4 border-green-500',
    SAFE: 'from-emerald-50 to-emerald-100 border-l-4 border-emerald-500',
  }[riskLevel] || 'from-gray-50 to-gray-100';

  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br ${riskGradient}
        shadow-md hover:shadow-xl transition-all duration-300
        rounded-xl p-6 flex flex-col gap-4 cursor-pointer
        transform hover:scale-105
      `}
    >
      {/* Header with name and risk badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          {grade && <p className="text-sm text-gray-600 mt-1">Grade: {grade}</p>}
        </div>
        <StatusBadge status={riskLevel} size="sm" />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-600 font-medium uppercase">Attendance</p>
          <p className="text-2xl font-bold text-gray-900">{attendance}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-600 font-medium uppercase">Avg Score</p>
          <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
        </div>
      </div>

      {/* Risk factors */}
      {factors && factors.length > 0 && (
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-600 font-medium uppercase mb-2">Risk Factors</p>
          <div className="flex flex-wrap gap-2">
            {factors.map((f) => (
              <span
                key={f}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full text-xs font-medium text-gray-800 transition-colors"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
