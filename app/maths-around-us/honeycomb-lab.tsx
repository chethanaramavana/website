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
      <p className="rmc-eyebrow">First, make the corners meet</p>
      <h2 id="corners-title">A full turn has room for 360°.</h2>
      <p>Choose a shape. Can identical corners close the space around the dot?</p>
      <div className="nature-choices" role="group" aria-label="Choose a regular polygon">{cellShapes.map(s => <button key={s.sides} aria-pressed={sides === s.sides} onClick={() => setSides(s.sides)}>{s.name}</button>)}</div>
      <div className="nature-corner-result"><CornerFigure sides={sides}/><div aria-live="polite"><h3>{shape.tiles ? 'The corners fit. No gap!' : 'A little gap remains.'}</h3>{shape.tiles ? <p>{shape.count} corners of {shape.angle}° make exactly 360°. Identical regular {sides === 3 ? 'triangles' : sides === 4 ? 'squares' : 'hexagons'} can tile a flat surface without gaps or overlaps.</p> : <><p>Three 108° corners make 324°, leaving a 36° gap. A fourth would make 432° and overlap.</p><p>So identical <strong>regular</strong> pentagons cannot tile a flat surface by themselves. Some irregular pentagons can!</p></>}</div></div>
    </section>
    <section className="nature-investigation" aria-labelledby="wax-title">
      <p className="rmc-eyebrow">Then, compare the walls</p>
      <h2 id="wax-title">Same storage space. How much wall?</h2>
      <p>Triangles and squares work too. But, for the same floor area, a regular hexagon has a shorter boundary than either.</p>
      <label className="nature-slider">Floor area of each cell: <strong>{area} cm²</strong><input type="range" min="25" max="100" step="25" value={area} onChange={e => setArea(Number(e.target.value))}/></label>
      <div className="nature-area-grid">{cellShapes.filter(s => s.tiles).map(s => { const perimeter = cellPerimeter(s.sides, area); return <figure key={s.sides}><h3>{s.name}</h3><EqualAreaFigure sides={s.sides} area={area}/><figcaption><strong>≈ {perimeter.toFixed(1)} cm</strong> around the cell</figcaption><div className="nature-length" aria-hidden="true"><span style={{width:`${perimeter / cellPerimeter(3,100) * 100}%`}}/></div></figure>;})}</div>
      <p className="nature-remark">All three drawings use the same scale and enclose the same area. The bar shows boundary length. For 100 cm², the hexagon needs about 37.2 cm of boundary; the square needs 40 cm, and the triangle about 45.6 cm.</p>
      <p>Neighbours share their walls. In a large repeating pattern of equal-area cells, the hexagonal honeycomb uses the least total boundary length. With the same wall height and thickness, shorter walls mean less wax.</p>
    </section>
  </>;
}
