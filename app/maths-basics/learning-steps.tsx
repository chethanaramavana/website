/** One equation grows from counting, to equal groups, to an unknown. */
export default function LearningSteps() {
  return (
    <svg
      className="basics-learning-steps"
      viewBox="0 0 440 350"
      role="img"
      aria-labelledby="steps-title steps-desc"
    >
      <title id="steps-title">From counting to equations</title>
      <desc id="steps-desc">
        Count six dots. Arrange the same six as two groups of three. Then solve
        two times x equals six: x is three.
      </desc>
      <defs>
        <pattern
          id="basics-step-dots"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="6" cy="6" r=".8" fill="#C9D2DF" />
        </pattern>
      </defs>
      <rect width="440" height="350" fill="url(#basics-step-dots)" />
      <path
        d="M20 322H148V217H290V112H420"
        fill="none"
        stroke="#011E47"
        strokeWidth="2"
      />
      <g fill="#011E47">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={38 + (i % 3) * 24}
            cy={259 + Math.floor(i / 3) * 24}
            r="5"
          />
        ))}
      </g>
      <g fontFamily="'Baloo Tamma 2', sans-serif" fill="#011E47" fontSize="16">
        <text x="25" y="233">
          Count
        </text>
        <text x="25" y="344">
          6 dots
        </text>
        <text x="161" y="122">
          Group by 3
        </text>
        <text x="308" y="24">
          Solve
        </text>
      </g>
      <g fill="#011E47">
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={181 + i * 24} cy="151" r="5" />
            <circle cx={181 + i * 24} cy="184" r="5" />
          </g>
        ))}
      </g>
      <g fill="none" stroke="#D9A231" strokeWidth="2">
        <rect x="167" y="139" width="76" height="24" rx="12" />
        <rect x="167" y="172" width="76" height="24" rx="12" />
      </g>
      <g fontFamily="'Source Serif 4',serif" fill="#011E47" fontSize="24">
        <text x="160" y="246">
          2 × 3 = 6
        </text>
        <text x="308" y="61">
          2 × x = 6
        </text>
        <text x="328" y="96">
          x = 3
        </text>
      </g>
      <path d="M321 101H389" stroke="#D9A231" strokeWidth="3" />
    </svg>
  );
}
