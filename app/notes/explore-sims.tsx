'use client';
import {useState,type ReactNode} from 'react';
import MathText from './math-text';
import './explore-sims.css';

const ink='#011e47',gold='#d9a231',cream='#f4e0ae',blue='#5b8fc7';
const f2=(n:number)=>(Math.round(n*100)/100).toString().replace(/^-/,'−');
function Box({title,children}:{title:string;children:ReactNode}){return <section className="explore-box" aria-label={title}><h3>{title}</h3>{children}</section>;}
function Slide({label,value,min,max,step=1,onChange,show}:{label:string;value:number;min:number;max:number;step?:number;onChange:(n:number)=>void;show?:string}){return <label className="explore-slider">{label}: <strong>{show??f2(value)}</strong><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></label>;}
function Pick({labels,value,onChange}:{labels:string[];value:number;onChange:(n:number)=>void}){return <div className="explore-buttons">{labels.map((l,i)=><button type="button" key={l} aria-pressed={value===i} onClick={()=>onChange(i)}>{l}</button>)}</div>;}
function Say({children}:{children:ReactNode}){return <div className="explore-why" aria-live="polite">{children}</div>;}
function Axes({X,Y,xs,ys}:{X:(x:number)=>number;Y:(y:number)=>number;xs:number[];ys:number[]}){return <g>{xs.map(x=><path key={'x'+x} d={`M${X(x)} ${Y(ys[0])}V${Y(ys[ys.length-1])}`} stroke="#e3e8ef"/>)}{ys.map(y=><path key={'y'+y} d={`M${X(xs[0])} ${Y(y)}H${X(xs[xs.length-1])}`} stroke="#e3e8ef"/>)}<path d={`M${X(xs[0])} ${Y(0)}H${X(xs[xs.length-1])}M${X(0)} ${Y(ys[0])}V${Y(ys[ys.length-1])}`} stroke={ink} strokeWidth="1.8"/>{xs.filter(x=>x!==0).map(x=><text key={'tx'+x} x={X(x)} y={Y(0)+16} textAnchor="middle" fontSize="12" fill={ink}>{String(x).replace('-','−')}</text>)}{ys.filter(y=>y!==0).map(y=><text key={'ty'+y} x={X(0)-6} y={Y(y)+4} textAnchor="end" fontSize="12" fill={ink}>{String(y).replace('-','−')}</text>)}</g>;}

/** Limits and derivatives: the secant through P and Q turns into the tangent as Q slides to P. */
function SecantTangent(){
 const H=[2,1.5,1,0.5,0.25,0.1,0.01,0.001];const [i,setI]=useState(0);const h=H[i];
 const X=(x:number)=>300+x*90,Y=(y:number)=>300-y*45,f=(x:number)=>x*x,m=(f(1+h)-f(1))/h;
 const curve=Array.from({length:61},(_,k)=>{const x=-0.6+k*0.06;return `${k?'L':'M'}${X(x)} ${Y(f(x))}`;}).join('');
 const sec=(x:number)=>1+m*(x-1),tan=(x:number)=>1+2*(x-1);
 return <Box title="Watch a secant become a tangent">
  <Slide label="Gap h between P and Q" value={i} min={0} max={H.length-1} onChange={setI} show={String(h)}/>
  <svg className="explore-canvas" viewBox="0 0 600 330" role="img" aria-label={`y = x squared; P(1, 1); Q at x = ${1+h}; secant slope ${f2(m)}`}>
   <Axes X={X} Y={Y} xs={[-1,0,1,2,3]} ys={[-0.5,0,1,2,3,4,5,6]}/>
   <path d={curve} fill="none" stroke={ink} strokeWidth="2.5"/>
   <path d={`M${X(-0.8)} ${Y(tan(-0.8))}L${X(3)} ${Y(tan(3))}`} stroke={blue} strokeWidth="2" strokeDasharray="7 5"/>
   <path d={`M${X(-0.8)} ${Y(sec(-0.8))}L${X(3)} ${Y(sec(3))}`} stroke={gold} strokeWidth="3"/>
   <circle cx={X(1)} cy={Y(1)} r="6" fill={ink}/><text x={X(1)-30} y={Y(1)+4} fontSize="15" fontWeight="700" fill={ink}>P</text>
   <circle cx={X(1+h)} cy={Y(f(1+h))} r="6" fill={gold} stroke={ink}/><text x={X(1+h)+10} y={Y(f(1+h))+4} fontSize="15" fontWeight="700" fill={ink}>Q</text>
   <text x="30" y="24" fontSize="14" fill={ink}>gold: secant PQ · blue dashed: tangent at P</text>
  </svg>
  <MathText>{`Slope of PQ = (f(1 + h) − f(1))/h = ((1 + h)² − 1)/h = 2 + h = ${f2(2+h)}`}</MathText>
  <Say><p>Make h smaller. Q slides towards P, and the secant turns towards the tangent. The slope 2 + h gets closer to 2.</p><p>The derivative is this limit: f′(1) = lim (h → 0) of (f(1 + h) − f(1))/h = 2.</p></Say>
 </Box>;
}

/** Conic sections: the string ellipse and the focus–directrix parabola. */
function Conics(){
 const [mode,setMode]=useState(0),[t,setT]=useState(60);
 const X=(x:number)=>300+x*40,Y=(y:number)=>175-y*40;
 if(mode===0){const a=5,b=3,c=4,th=t*Math.PI/180,P=[a*Math.cos(th),b*Math.sin(th)],d1=Math.hypot(P[0]+c,P[1]),d2=Math.hypot(P[0]-c,P[1]);
  const path=Array.from({length:Math.max(2,Math.round(t/3)+1)},(_,k)=>{const s=k*3*Math.PI/180;return `${k?'L':'M'}${X(a*Math.cos(Math.min(s,th)))} ${Y(b*Math.sin(Math.min(s,th)))}`;}).join('');
  return <Box title="Draw an ellipse with a string">
   <Pick labels={['Ellipse','Parabola']} value={mode} onChange={setMode}/>
   <Slide label="Move the pencil (degrees)" value={t} min={0} max={360} step={5} onChange={setT}/>
   <svg className="explore-canvas" viewBox="0 0 600 350" role="img" aria-label={`Ellipse x²/25 + y²/9 = 1; PF1 ${f2(d1)} plus PF2 ${f2(d2)} equals 10`}>
    <Axes X={X} Y={Y} xs={[-6,-4,-2,0,2,4,6]} ys={[-4,-2,0,2,4]}/>
    <ellipse cx={X(0)} cy={Y(0)} rx={a*40} ry={b*40} fill="none" stroke="#c9d3df" strokeDasharray="4 4"/>
    <path d={path} fill="none" stroke={ink} strokeWidth="3"/>
    <path d={`M${X(-c)} ${Y(0)}L${X(P[0])} ${Y(P[1])}L${X(c)} ${Y(0)}`} fill="none" stroke={gold} strokeWidth="2.5"/>
    {[[-c,'F₁'],[c,'F₂']].map(([x,l])=><g key={l as string}><circle cx={X(x as number)} cy={Y(0)} r="6" fill={blue}/><text x={X(x as number)-8} y={Y(0)-12} fontSize="14" fontWeight="700" fill={ink}>{l}</text></g>)}
    <circle cx={X(P[0])} cy={Y(P[1])} r="7" fill={gold} stroke={ink}/><text x={X(P[0])+10} y={Y(P[1])-8} fontSize="15" fontWeight="700" fill={ink}>P</text>
   </svg>
   <MathText>{`PF₁ + PF₂ = ${f2(d1)} + ${f2(d2)} = 10 = 2a`}</MathText>
   <Say><p>Pin a string of length 10 at the two foci F₁(−4, 0) and F₂(4, 0). Keep it tight with a pencil and move round. The pencil draws an ellipse.</p><p>For every point P, PF₁ + PF₂ = 2a = 10. Here a = 5, c = 4, so b² = a² − c² = 9 and the ellipse is x²/25 + y²/9 = 1.</p></Say>
  </Box>;}
 const a=1,x=(t-180)/40,y=x*x/(4*a),pf=Math.hypot(x,y-a),pm=y+a;const Yp=(v:number)=>290-v*40;
 return <Box title="A parabola from a focus and a directrix">
  <Pick labels={['Ellipse','Parabola']} value={mode} onChange={setMode}/>
  <Slide label="Move point P" value={t} min={20} max={340} step={5} onChange={setT} show={`x = ${f2(x)}`}/>
  <svg className="explore-canvas" viewBox="0 0 600 350" role="img" aria-label={`Parabola x² = 4y; PF ${f2(pf)} equals PM ${f2(pm)}`}>
   <Axes X={X} Y={Yp} xs={[-4,-2,0,2,4]} ys={[-1,0,2,4,6]}/>
   <path d={Array.from({length:81},(_,k)=>{const u=-4+k*0.1;return `${k?'L':'M'}${X(u)} ${Yp(u*u/4)}`;}).join('')} fill="none" stroke={ink} strokeWidth="3"/>
   <path d={`M${X(-6)} ${Yp(-a)}H${X(6)}`} stroke={blue} strokeWidth="2.5" strokeDasharray="8 5"/><text x={X(4.2)} y={Yp(-a)+18} fontSize="13" fill={ink}>directrix y = −1</text>
   <circle cx={X(0)} cy={Yp(a)} r="6" fill={blue}/><text x={X(0)+10} y={Yp(a)+4} fontSize="14" fontWeight="700" fill={ink}>F(0, 1)</text>
   <path d={`M${X(x)} ${Yp(y)}L${X(0)} ${Yp(a)}M${X(x)} ${Yp(y)}V${Yp(-a)}`} stroke={gold} strokeWidth="2.5"/>
   <circle cx={X(x)} cy={Yp(y)} r="7" fill={gold} stroke={ink}/><text x={X(x)+10} y={Yp(y)-8} fontSize="15" fontWeight="700" fill={ink}>P</text><text x={X(x)+6} y={Yp(-a)-6} fontSize="14" fontWeight="700" fill={ink}>M</text>
  </svg>
  <MathText>{`PF = ${f2(pf)},  PM = ${f2(pm)}`}</MathText>
  <Say><p>P is always as far from the focus F as from the directrix: PF = PM. Move P and the two gold lengths stay equal.</p><p>The set of all such points is the parabola x² = 4ay with a = 1, that is x² = 4y.</p></Say>
 </Box>;
}

/** Binomial theorem: Pascal's triangle. */
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',sup=(n:number)=>String(n).split('').map(d=>SUP[Number(d)]).join('');
const C=(n:number,r:number)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-i+1)/i;return Math.round(v);};
function Pascal(){
 const [n,setN]=useState(4),[odd,setOdd]=useState(0),R=10;
 const term=(r:number)=>{const c=C(n,r),pa=n-r,pb=r;const part=(v:string,p:number)=>p===0?'':p===1?v:`${v}${sup(p)}`;return `${c===1&&(pa||pb)?'':c}${part('a',pa)}${part('b',pb)}`;};
 return <Box title="Pascal's triangle and (a + b)ⁿ">
  <Slide label="Power n" value={n} min={0} max={R} onChange={setN}/>
  <Pick labels={['Show row n','Colour the odd numbers']} value={odd} onChange={setOdd}/>
  <svg className="explore-canvas" viewBox="0 0 600 350" role="img" aria-label={`Row ${n} of Pascal's triangle: ${Array.from({length:n+1},(_,r)=>C(n,r)).join(', ')}`}>
   {Array.from({length:R+1},(_,row)=>Array.from({length:row+1},(_,r)=>{const x=300+(r-row/2)*52,y=20+row*30,v=C(row,r),on=odd?v%2===1:row===n;return <g key={`${row}-${r}`}><rect x={x-24} y={y} width="48" height="26" rx="6" fill={on?(odd?gold:cream):'#fff'} stroke={row===n?gold:'#c9d3df'} strokeWidth={row===n?2.5:1}/><text x={x} y={y+18} textAnchor="middle" fontSize={v>99?12:14} fontWeight={row===n?700:400} fill={ink}>{v}</text></g>;}))}
  </svg>
  <div className="explore-math"><MathText>{`(a + b)${sup(n)} = ${Array.from({length:n+1},(_,r)=>term(r)).join(' + ')||'1'}`}</MathText></div>
  <Say><p>{odd?'The odd numbers make a pattern of triangles inside triangles (the Sierpinski triangle).':`Row ${n} gives the coefficients of (a + b)${sup(n)}. Each number is the sum of the two numbers above it.`}</p><p>{`The r-th number in row n is ⁿCᵣ. The row adds to 2${sup(n)} = ${2**n}.`}</p></Say>
 </Box>;
}

/** Vector algebra: triangle law of addition. */
function Vectors(){
 const [a1,setA1]=useState(3),[a2,setA2]=useState(1),[b1,setB1]=useState(1),[b2,setB2]=useState(3),[sub,setSub]=useState(0);
 const vec=(x:number,y:number)=>`${f2(x)}i ${y<0?'−':'+'} ${f2(Math.abs(y))}j`;
 const s=sub?-1:1,r1=a1+s*b1,r2=a2+s*b2,X=(x:number)=>300+x*30,Y=(y:number)=>200-y*30;
 const arrow=(x0:number,y0:number,x1:number,y1:number,col:string,lab:string)=>{const dx=X(x1)-X(x0),dy=Y(y1)-Y(y0),L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,hx=X(x1),hy=Y(y1);return <g><path d={`M${X(x0)} ${Y(y0)}L${hx} ${hy}`} stroke={col} strokeWidth="3.5"/><path d={`M${hx} ${hy}L${hx-12*ux+6*uy} ${hy-12*uy-6*ux}L${hx-12*ux-6*uy} ${hy-12*uy+6*ux}Z`} fill={col}/><text x={(X(x0)+hx)/2+8*uy+4} y={(Y(y0)+hy)/2-8*ux+4} fontSize="15" fontWeight="700" fill={col}>{lab}</text></g>;};
 return <Box title="Add two vectors">
  <Pick labels={['a + b','a − b']} value={sub} onChange={setSub}/>
  <div className="explore-grid"><Slide label="a: x" value={a1} min={-4} max={4} onChange={setA1}/><Slide label="a: y" value={a2} min={-4} max={4} onChange={setA2}/><Slide label="b: x" value={b1} min={-4} max={4} onChange={setB1}/><Slide label="b: y" value={b2} min={-4} max={4} onChange={setB2}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 400" role="img" aria-label={`a = (${a1}, ${a2}), b = (${b1}, ${b2}); ${sub?'a − b':'a + b'} = (${r1}, ${r2})`}>
   <Axes X={X} Y={Y} xs={[-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9]} ys={[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]}/>
   {arrow(0,0,a1,a2,blue,'a')}
   {arrow(a1,a2,r1,r2,gold,sub?'−b':'b')}
   {arrow(0,0,r1,r2,ink,sub?'a − b':'a + b')}
  </svg>
  <MathText>{`a = ${vec(a1,a2)},  b = ${vec(b1,b2)},  ${sub?'a − b':'a + b'} = ${vec(r1,r2)},  |${sub?'a − b':'a + b'}| = ${f2(Math.hypot(r1,r2))}`}</MathText>
  <Say><p>{sub?'To subtract b, add the opposite vector −b. Put −b at the head of a.':'Triangle law: put the tail of b at the head of a. The vector from the start to the end is a + b.'}</p><p>Add the components separately: x-parts give the i component, y-parts give the j component.</p></Say>
 </Box>;
}

const SIMS:Record<string,()=>ReactNode>={'g11-limits-derivatives':()=><SecantTangent/>,'g11-conic-sections':()=><Conics/>,'g11-binomial-theorem':()=><Pascal/>,'g12-vector-algebra':()=><Vectors/>};
export const hasExplore=(slug:string)=>slug in SIMS;
export default function ExploreSims({slug}:{slug:string}){const S=SIMS[slug];if(!S)return null;return <div className="notes-explore"><h2>Explore with a simulation</h2><p>Move the sliders and watch the picture change.</p>{S()}</div>;}
