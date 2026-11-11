'use client';

import { useState } from 'react';

export default function PizzaQuiz() {
  const [choice, setChoice] = useState<'large' | 'small'>();

  return (
    <section id="symmetry-quiz" className="nature-investigation pizza-quiz" aria-labelledby="pizza-question">
      <h2 id="pizza-question">Pick your order</h2>
      <div className="pizza-orders" role="group" aria-label="Choose a pizza order">
        <button type="button" aria-pressed={choice === 'large'} onClick={() => setChoice('large')}>
          <span className="pizza-tray" aria-hidden="true"><span className="pizza-disc pizza-large" /></span>
          <strong>One 12-inch pizza</strong>
        </button>
        <button type="button" aria-pressed={choice === 'small'} onClick={() => setChoice('small')}>
          <span className="pizza-tray" aria-hidden="true"><span className="pizza-disc pizza-small" /><span className="pizza-disc pizza-small" /></span>
          <strong>Two 8-inch pizzas</strong>
        </button>
      </div>
      <div role="status">
        {choice && (
          <div className="pizza-reveal">
            <h3>The 12-inch pizza wins.</h3>
            <p>Halve each diameter to get the radius. Then multiply π × radius × radius.</p>
            <dl>
              <div><dt>One large</dt><dd>π × 6² = 36π in²</dd></div>
              <div><dt>Two small</dt><dd>2 × π × 4² = 32π in²</dd></div>
            </dl>
            <p>The large pizza gives you 12.5% more.</p>
          </div>
        )}
      </div>
    </section>
  );
}
