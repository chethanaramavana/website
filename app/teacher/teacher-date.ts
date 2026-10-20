/** SQLite timestamps are UTC; show the teacher's review dates in IST. */
export function teacherDate(value: string, addHours = 0) {
  const date = new Date(
    /^\d{4}-\d{2}-\d{2} \d{2}:/.test(value)
      ? `${value.replace(' ', 'T')}Z`
      : value,
  );
  date.setTime(date.getTime() + addHours * 60 * 60 * 1000);
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
