const CircularLineProgress = ({ value }: { value: number }) => {
  // คำนวณเปอร์เซ็นต์
  const percentage = value * 10;

  // ค่าคงที่สำหรับ SVG
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = isNaN(percentage)
    ? 0
    : circumference - (percentage / 100) * circumference;

  // คำนวณสีตามค่า
  const getColor = (percent: number) => {
    if (percent >= 90) return "stroke-green-600";
    if (percent >= 80) return "stroke-green-500";
    if (percent >= 70) return "stroke-amber-400";
    if (percent >= 50) return "stroke-amber-600";
    return "stroke-red-600";
  };

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="transform -rotate-90 w-full h-full">
        {/* เส้นวงกลมพื้นหลัง */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="stroke-gray-200"
          strokeWidth="8"
          fill="none"
        />

        {/* เส้นวงกลมแสดงความคืบหน้า */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className={`${getColor(percentage)} transition-all duration-500`}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>

      {/* แสดงค่าตรงกลาง */}
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default CircularLineProgress;
