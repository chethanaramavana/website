'use client';
import { useState } from 'react';
import { cellPerimeter, cellShapes } from '@/lib/nature-stories';
import { CornerFigure, EqualAreaFigure } from './figures';

export default function HoneycombLab() {
  const [sides, setSides] = useState(5);
  const [area, setArea] = useState(100);
  const shape = cellShapes.find(s => s.sides === sides)!;
  return <>
    <section className="nature-investigation" aria-labelledby="corners-title">
      <h2 id="corners-title">Will the corners fit?</h2>
      <p>Pick a shape to see how its corners fit around the dot.</p>
      <div className="nature-choices" role="group" aria-label="Choose a regular polygon">{cellShapes.map(s => <button key={s.sides} aria-pressed={sides === s.sides} onClick={() => setSides(s.sides)}>{s.name}</button>)}</div>
      <div className="nature-corner-result"><CornerFigure sides={sides}/><div aria-live="polite"><h3>{shape.tiles ? 'No gaps' : '36° gap'}</h3>{shape.tiles ? <p>{shape.count} × {shape.angle}° = 360°. The corners fill a full turn.</p> : <p>Three 108° corners leave a gap. Four corners overlap.</p>}</div></div>
    </section>
    <section className="nature-investigation" aria-labelledby="wax-title">
      <h2 id="wax-title">Which shape needs the least wall?</h2>
      <p>Change the area to compare the three shapes.</p>
      <label className="nature-slider">Area per cell <strong>{area} cm²</strong><input type="range" min="25" max="100" step="25" value={area} onChange={e => setArea(Number(e.target.value))}/></label>
      <div className="nature-area-grid">{cellShapes.filter(s => s.tiles).map(s => { const perimeter = cellPerimeter(s.sides, area); return <figure key={s.sides}><h3>{s.name}</h3><EqualAreaFigure sides={s.sides} area={area}/><figcaption><strong>≈ {perimeter.toFixed(1)} cm</strong> perimeter</figcaption><div className="nature-length" aria-hidden="true"><span style={{width:`${perimeter / cellPerimeter(3,100) * 100}%`}}/></div></figure>;})}</div>
      <p>For the same area, the hexagon has the shortest perimeter of the three. Shorter walls use less wax.</p>
    </section>
  </>;
}
