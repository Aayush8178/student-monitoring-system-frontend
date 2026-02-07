function AlertCard({ name, reason, level }) {
  const color =
    level === "critical risk"
      ? "bg-red-100 text-red-700"
      : level === "high risk"
      ? "bg-orange-100 text-orange-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="flex justify-between items-center p-3 bg-white shadow rounded-lg mb-2">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{reason}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        {level}
      </span>
    </div>
  );
}

export default AlertCard;
