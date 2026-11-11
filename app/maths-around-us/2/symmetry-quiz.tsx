'use client';

import { useState } from 'react';

export default function SymmetryQuiz() {
  const [answer, setAnswer] = useState<'yes' | 'no'>();

  return (
    <section className="nature-investigation" aria-labelledby="symmetry-quiz">
      <h2 id="symmetry-quiz">Will a rectangle fold neatly along its diagonal?</h2>
      <p>A square folds exactly in half along a diagonal. Imagine folding a sheet of A4 paper along the line between opposite corners. Will the two halves line up?</p>
      <div className="nature-choices" role="group" aria-label="Will the two halves line up?">
        <button type="button" aria-pressed={answer === 'yes'} onClick={() => setAnswer('yes')}>Yes</button>
        <button type="button" aria-pressed={answer === 'no'} onClick={() => setAnswer('no')}>No</button>
      </div>
      <p role="status">
        {answer === 'yes' && 'Try the fold. Can you make a long edge line up with a short edge?'}
        {answer === 'no' && 'Right. The fold puts a long edge against a short one. Try folding through the middle to make the halves match.'}
      </p>
    </section>
  );
}
