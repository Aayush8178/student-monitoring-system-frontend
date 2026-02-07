function SummaryCard({ title, value, change, positive }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 flex flex-col gap-2 border-l-4 ${
        positive ? "border-green-500" : "border-red-500"
      }`}
    >
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
        {title}
      </h3>

      <p className="text-3xl font-bold text-gray-800">{value}</p>

      <p
        className={`text-sm font-medium flex items-center gap-1 ${
          positive ? "text-green-600" : "text-red-600"
        }`}
      >
        <span>{positive ? "▲" : "▼"}</span>
        {change} from last week
      </p>
    </div>
  );
}

export default SummaryCard;
