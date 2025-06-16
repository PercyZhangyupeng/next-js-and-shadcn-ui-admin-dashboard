export default function CouncilTable() {
  // 示例静态数据
  const data = [
    { council: "Mitcham", avgDays: 108.4 },
    { council: "West Torrens", avgDays: 107.38 },
    { council: "Adelaide", avgDays: 106.25 },
  ];

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-xl font-semibold">Council Approval Time Table</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Council</th>
            <th className="border px-2 py-1">Average Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{item.council}</td>
              <td className="border px-2 py-1">{item.avgDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
