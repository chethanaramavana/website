export default function TeacherTick() {
  return (
    <svg className="teacher-tick" viewBox="0 0 32 28" aria-hidden="true">
      <path
        d="m4 14 8 9L28 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function WellDoneStamp() {
  return (
    <span
      className="well-done-stamp"
      aria-label="Well done, at least 80 percent"
    >
      <span lang="kn">ಭೇಷ್!</span>
      <span>WELL DONE</span>
    </span>
  );
}
