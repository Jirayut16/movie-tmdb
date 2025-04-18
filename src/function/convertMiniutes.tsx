export const convertMinutesToTime = (minutes: number): string => {
  // คำนวณชั่วโมง
  const hours = Math.floor(minutes / 60);
  // คำนวณนาทีที่เหลือ
  const remainingMinutes = minutes % 60;

  // รูปแบบผลลัพธ์ "XhYm"
  return `${hours}h ${remainingMinutes}m`;
};
