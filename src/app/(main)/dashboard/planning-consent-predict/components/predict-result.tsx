export default function PredictResult() {
  // 这里可以根据实际 API 调用结果传入结果值
  const predictedDays = 85; // Example static value

  return (
    <div className="mt-8 rounded border p-4">
      <h2 className="mb-2 text-xl font-semibold">Predicted Planning Consent Time</h2>
      <p className="text-4xl font-bold text-blue-600">{predictedDays} days</p>
      {/* 这里可以引入 ResultCaseTable 显示相邻案例 */}
    </div>
  );
}
