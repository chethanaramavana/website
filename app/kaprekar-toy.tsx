'use client';
import { useState } from 'react';
import { kaprekar } from '@/lib/kaprekar';
export default function KaprekarToy() {
  const [input, setInput] = useState('2026');
  const [steps, setSteps] = useState<ReturnType<typeof kaprekar> | null>(null);
  const [error, setError] = useState('');
  return (
    <section className="kaprekar-toy">
      <p className="rmc-eyebrow">Number Play · Try it</p>
      <h2>The 6174 machine</h2>
      <p>
        Pick four digits that are not all the same. Arrange them from largest to
        smallest, reverse them, then subtract. Repeat with the answer.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          try {
            setSteps(kaprekar(input));
            setError('');
          } catch (reason) {
            setError((reason as Error).message);
            setSteps(null);
          }
        }}
      >
        <label htmlFor="kaprekar-input">
          Your four digits
          <input
            id="kaprekar-input"
            inputMode="numeric"
            maxLength={4}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-describedby={error ? 'kaprekar-error' : undefined}
          />
        </label>
        <button className="rmc-button" type="submit">
          Run the machine
        </button>
      </form>
      {error && (
        <p id="kaprekar-error" role="alert">
          {error}
        </p>
      )}
      <div aria-live="polite">
        {steps && (
          <>
            <ol>
              {steps.map((step, i) => (
                <li key={i}>
                  <code>
                    {step.descending} − {step.ascending} = {step.result}
                  </code>
                </li>
              ))}
            </ol>
            <p className="kaprekar-answer">6174</p>
            <p>
              {steps.length
                ? `Reached in ${steps.length} ${steps.length === 1 ? 'step' : 'steps'}.`
                : 'You started at 6174.'}{' '}
              Try another number. Does it lead to the same answer?
            </p>
          </>
        )}
      </div>
    </section>
  );
}
