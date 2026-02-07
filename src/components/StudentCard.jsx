function StudentCard({
  name,
  grade,
  riskLevel,
  attendance,
  averageScore,
  factors,
}) {
  const color =
    riskLevel === "CRITICAL"
      ? "text-red-600"
      : riskLevel === "HIGH"
      ? "text-orange-600"
      : riskLevel === "MEDIUM"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
      <h3 className="text-lg font-bold">
        {name}
        <span className={`ml-2 text-sm ${color}`}>{riskLevel}</span>
      </h3>

      <p className="text-sm text-gray-500">{grade}</p>
      <p>Attendance: {attendance}%</p>
      <p>Average Score: {averageScore}</p>

      <div className="flex flex-wrap gap-2">
        {factors.map((f) => (
          <span key={f} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export default StudentCard;
