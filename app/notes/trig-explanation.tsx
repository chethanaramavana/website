import MathText from './math-text';

export default function TrigExplanation() {
  return <section className="circle-teaching study-trig-explanation">
    <h2>Choose the ratio from the triangle</h2>
    <svg viewBox="0 0 640 340" role="img" aria-label="Right triangle with reference angle theta at A, opposite height h, adjacent distance d, and hypotenuse l">
      <path d="M90 250H490V75Z" fill="#e8f6f5" stroke="#16858d" strokeWidth="3" />
      <path d="M466 250V226H490M145 250A55 55 0 0 0 141 228" fill="none" stroke="#184562" strokeWidth="2" />
      <path d="M265 109 286 150" stroke="#718995" strokeWidth="1.5" />
      <g fill="#184562" fontSize="18" fontFamily="Arial, sans-serif">
        <text x="67" y="269">A</text><text x="496" y="269">B</text><text x="494" y="64">C</text><text x="151" y="235">θ</text>
        <text x="280" y="285" textAnchor="middle">AB = d: adjacent side</text><text x="280" y="309" textAnchor="middle">horizontal distance</text>
        <text x="502" y="153">BC = h</text><text x="502" y="177">opposite side</text><text x="502" y="201">vertical height</text>
        <text x="260" y="65" textAnchor="middle">AC = l: hypotenuse</text><text x="260" y="90" textAnchor="middle">line of sight</text>
      </g>
    </svg>
    <p>Stand at A and look towards C. The angle θ is measured from the horizontal AB. The right angle is at B, so AC is the hypotenuse. The letter l means the length of the line of sight.</p>
    <div className="study-ratio-explanations">
      <section><h3>Height and ground distance → tangent</h3><p>Use this when the two sides are BC and AB: the side opposite θ and the side next to θ.</p><p className="circle-equation"><MathText formula>tan θ = h/d</MathText></p><p><MathText>For d = 10 m and θ = 45°, h = 10 × tan 45° = 10 m.</MathText></p></section>
      <section><h3>Height and line of sight → sine</h3><p>Use this when the two sides are BC and AC: opposite and hypotenuse.</p><p className="circle-equation"><MathText formula>sin θ = h/l</MathText></p><p><MathText>If l = 10 m and θ = 30°, h = 10 × sin 30° = 5 m.</MathText></p></section>
      <section><h3>Ground distance and line of sight → cosine</h3><p>Use this when the two sides are AB and AC: adjacent and hypotenuse.</p><p className="circle-equation"><MathText formula>cos θ = d/l</MathText></p><p><MathText>If l = 10 m and θ = 60°, d = 10 × cos 60° = 5 m.</MathText></p></section>
    </div>
    <aside className="study-before"><strong>If the observer’s eyes are above the ground</strong><p>In this triangle, h measures height above eye level. Add the observer’s eye height to find the total height of the object. Do not add it again if the triangle already begins at ground level.</p></aside>
  </section>;
}
