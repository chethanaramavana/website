'use client';

import { useState } from 'react';

export default function SymmetryQuiz() {
  const [answer, setAnswer] = useState<number>();

  return (
    <section className="nature-investigation" aria-labelledby="symmetry-quiz">
      <h2 id="symmetry-quiz">How many lines of symmetry does a square have?</h2>
      <div className="nature-choices" role="group" aria-label="Choose the number of lines">
        {[2, 4, 8].map(option => (
          <button key={option} type="button" aria-pressed={answer === option} onClick={() => setAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <p role="status">
        {answer === 4 && 'Four. Fold across the middle in two directions, then along each diagonal.'}
        {answer === 2 && 'You found the two middle folds. Try folding corner to corner as well.'}
        {answer === 8 && 'Count each crease once. How many different folds make the halves match?'}
      </p>
    </section>
  );
}
