import MathText from './math-text';

function TangentPicture({ both = false }: { both?: boolean }) {
  return <svg viewBox="0 0 600 320" role="img" aria-label={both ? 'Two equal tangents PA and PB from external point P to a circle with centre O' : 'Right triangle OPT with radius OT perpendicular to tangent PT'}>
    <circle cx="190" cy="160" r="100" fill="#e8f6f5" stroke="#16858d" strokeWidth="3" />
    <path d="M190 160H440M190 160 230 68.35" fill="none" stroke="#184562" strokeWidth="3" strokeDasharray="6 4" />
    <path d="M230 68.35 440 160" fill="none" stroke="#d65e4b" strokeWidth="4" />
    <path d="M225.2 79.35 236.2 84.15 241 73.15" fill="none" stroke="#184562" strokeWidth="2" />
    {both && <><path d="M190 160 230 251.65 440 160" fill="none" stroke="#d65e4b" strokeWidth="3" /><path d="M225.2 240.65 236.2 235.85 241 246.85" fill="none" stroke="#184562" strokeWidth="2" /><text x="225" y="280">B</text><text x="334" y="228">PB</text></>}
    {[[190,160],[230,68.35],[440,160]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4" fill="#184562" />)}
    <g fill="#184562" fontSize="19" fontFamily="Arial, sans-serif"><text x="164" y="184">O</text><text x="226" y="51">{both ? 'A' : 'T'}</text><text x="451" y="167">P</text><text x="174" y="112">radius</text><text x="326" y="94">{both ? 'PA' : 'tangent PT'}</text><text x="302" y="184">OP</text></g>
  </svg>;
}

export default function CircleTeaching() {
  return <section className="circle-teaching">
    <h3>Meet the points before using the formula</h3>
    <TangentPicture />
    <dl className="study-symbol-key"><dt>O</dt><dd>The centre of the circle.</dd><dt>P</dt><dd>A point outside the circle.</dd><dt>T</dt><dd>The point where the straight tangent touches the circle.</dd><dt>OT</dt><dd>The radius from the centre to the contact point.</dd><dt>OP</dt><dd>The distance from the centre to the outside point; it is the hypotenuse of triangle OPT, not a radius.</dd><dt>PT</dt><dd>The tangent segment whose length we want.</dd><dt>⊥</dt><dd>“Is perpendicular to”: the two lines meet at 90°.</dd></dl>
    <p><MathText>OT ⊥ PT, so ∠OTP = 90°. In the right triangle, OP² = OT² + PT².</MathText></p>
    <p><MathText>With OP = 13 cm and OT = 5 cm: PT² = 13² − 5² = 144, so PT = 12 cm.</MathText></p>
    <h3>Why two tangents from the same point are equal</h3>
    <TangentPicture both />
    <p><MathText>A and B are contact points. OA = OB because both are radii. OP is shared by triangles OAP and OBP, and both triangles have a right angle at contact. By RHS congruence, PA = PB.</MathText></p>
    <p>Join the centre to both contacts first. Mark the right angles before choosing the theorem: these are the facts that justify the shortcut.</p>
    <svg viewBox="0 0 600 190" role="img" aria-label="An interior point has zero tangents, a point on the circle one, and an exterior point two">
      {[90,280,470].map(x => <circle key={x} cx={x} cy="80" r="48" fill="#e8f6f5" stroke="#16858d" strokeWidth="2" />)}
      <circle cx="90" cy="80" r="4" fill="#d65e4b" /><path d="M35 80H145" stroke="#184562" strokeDasharray="5 4" />
      <circle cx="328" cy="80" r="4" fill="#d65e4b" /><path d="M328 20V140" stroke="#d65e4b" strokeWidth="3" />
      <circle cx="566" cy="80" r="4" fill="#d65e4b" /><path d="M494 38.43 566 80 494 121.57" fill="none" stroke="#d65e4b" strokeWidth="3" />
      <g fill="#184562" fontSize="16" textAnchor="middle"><text x="90" y="165">Inside: 0 tangents</text><text x="280" y="165">On: 1 tangent</text><text x="480" y="165">Outside: 2 tangents</text></g>
    </svg>
    <div className="study-tangent-count"><span><b>Inside</b><br />No tangent: a line through an interior point cuts the circle twice.</span><span><b>On the circle</b><br />One tangent: draw the perpendicular to the radius at that point.</span><span><b>Outside</b><br />Two tangents: PA and PB touch at different points.</span></div>
  </section>;
}
