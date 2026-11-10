import { cellShapes, cornerPolygon } from '@/lib/nature-stories';

export function CornerFigure({ sides }: { sides: number }) {
  const shape = cellShapes.find(s => s.sides === sides)!;
  const side = { 3: 75, 4: 54, 5: 47, 6: 40 }[sides] || 40;
  return <svg viewBox="0 0 220 210" role="img" aria-label={`${shape.count} ${shape.name.toLowerCase()} corners meet: ${shape.count * shape.angle} degrees${shape.tiles ? ', no gap' : ', leaving a 36 degree gap'}`}>
    <g transform="translate(110 100)">
      {Array.from({ length: shape.count }, (_, i) => <polygon key={i} points={cornerPolygon(sides, side)} transform={`rotate(${i * shape.angle})`} fill={i % 2 ? '#f4e0ae' : '#edbd55'} stroke="#011e47" strokeWidth="1.8" />)}
      {!shape.tiles && <><path d="M0 0 L44.5 -32.3 A55 55 0 0 1 55 0Z" fill="#b0300e" fillOpacity=".18" stroke="#b0300e" strokeDasharray="3 3"/><text x="48" y="-19" fill="#b0300e" fontSize="13">36°</text></>}
      <circle r="3" fill="#011e47" />
    </g>
    <text x="110" y="198" textAnchor="middle" fill="#011e47" fontSize="17">{shape.count} × {shape.angle}° = {shape.count * shape.angle}°</text>
  </svg>;
}

export function EqualAreaFigure({ sides, area }: { sides: number; area: number }) {
  const radius = Math.sqrt(2 * area / (sides * Math.sin(2 * Math.PI / sides))) * 8;
  const points = Array.from({length:sides},(_,i)=>{
    const angle = 2 * Math.PI * i / sides - Math.PI / 2 + (sides === 4 ? Math.PI / 4 : 0);
    return `${120 + radius * Math.cos(angle)},${110 + radius * Math.sin(angle)}`;
  }).join(' ');
  return <svg viewBox="0 0 240 230" role="img" aria-label={`Regular ${sides}-sided cell with area ${area} square centimetres, at the same drawing scale as the other cells`}><polygon points={points} fill="#f4e0ae" stroke="#011e47" strokeWidth="2"/><text x="120" y="116" textAnchor="middle" fontSize="21" fill="#011e47">{area} cm²</text></svg>;
}
