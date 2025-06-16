export default function ResultCaseTable() {
  // 示例静态数据
  const cases = [
    { zone: "Urban Activity Centre Zone", housingType: "Residential Flat Building", avgDays: 120 },
    { zone: "Waterfront Neighbourhood Zone", housingType: "Group Dwelling", avgDays: 110 },
  ];

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-lg font-medium">Neighbouring Case Reference</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Zone</th>
            <th className="border px-2 py-1">Housing Type</th>
            <th className="border px-2 py-1">Average Days</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{c.zone}</td>
              <td className="border px-2 py-1">{c.housingType}</td>
              <td className="border px-2 py-1">{c.avgDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
