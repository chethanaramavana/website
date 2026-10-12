import MathText from '@/app/notes/math-text';

/** Preserve the complete authored solution, including every subpart. */
export function splitSolutionSteps(solution: string) {
  if(solution.includes("$")) return solution.trim().split(/\n+/).filter(Boolean);
  return solution.trim()
    .split(/\n+|;\s*|(?<=[.!?])\s+(?=[A-Z(])|\s+(?=\([a-z]\)\s)/)
    .map((step) => step.trim())
    .filter(Boolean);
}

export default function SolutionSteps({ solution }: { solution: string }) {
  const steps = splitSolutionSteps(solution);
  if (!steps.length) return <p>Solution unavailable. Please contact your teacher.</p>;
  return <ol className="exam-solution-steps">{steps.map((step, index) => (
    <li key={index}><MathText>{step}</MathText></li>
  ))}</ol>;
}
