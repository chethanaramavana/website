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

/* ---------------- Grade 6 simulations ---------------- */
const pale='#dbe8f6',muted='#5b6b80';
const BRIGHT6=['#ff9b85','#8fd0f7','#8fdc9a','#c3aef5','#ffc46b','#f7a8cc','#7dd6cf','#ffe27a','#ff9b85','#8fd0f7'],EDGE6=['#c2432b','#1f6fae','#2b8a45','#6a45c4','#b86e00','#b03c74','#13786f','#a88200','#c2432b','#1f6fae'];
const signed=(n:number)=>n<0?`(−${-n})`:String(n);
const minus=(n:number)=>String(n).replace('-','−');

/** Patterns: odd numbers build a square. */
function OddSquare(){
 const [n,setN]=useState(4);const s=Math.min(36,300/n),x0=300-n*s/2,y0=16;
 const odds=Array.from({length:n},(_,k)=>2*k+1);
 return <Box title="Odd numbers build a square">
  <Slide label="How many odd numbers" value={n} min={1} max={10} onChange={setN}/>
  <svg className="explore-canvas" viewBox="0 0 600 332" role="img" aria-label={`${odds.join(' + ')} = ${n*n}`}>
   {Array.from({length:n*n},(_,i)=>{const r=Math.floor(i/n),c=i%n,l=Math.max(r,c);return <rect key={i} x={x0+c*s} y={y0+r*s} width={s} height={s} fill={BRIGHT6[l]} stroke={EDGE6[l]} strokeWidth="1.5"/>;})}
  </svg>
  <p style={{fontSize:'1.2rem',fontWeight:700}}>{odds.map((o,k)=><span key={k}>{k?' + ':''}<span style={{color:EDGE6[k]}}>{o}</span></span>)} = {n*n} = {n} × {n}</p>
  <Say><p>Each colour is one L-shape. The newest L-shape has {2*n-1} tiles, the {n === 1 ? '1st' : n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`} odd number. It turns the {n-1} by {n-1} square into a {n} by {n} square.</p></Say>
 </Box>;
}

/** Lines and angles: turn an arm and name the angle. */
function AngleMaker(){
 const [a,setA]=useState(60);const cx=300,cy=180,r=140,ar=48,rad=a*Math.PI/180;
 const ex=cx+r*Math.cos(rad),ey=cy-r*Math.sin(rad),ax=cx+ar*Math.cos(rad),ay=cy-ar*Math.sin(rad);
 const kind=a===0?'zero angle':a<90?'acute angle':a===90?'right angle':a<180?'obtuse angle':a===180?'straight angle':a<360?'reflex angle':'full turn';
 const arc=a>=360?<circle cx={cx} cy={cy} r={ar} fill="none" stroke={gold} strokeWidth="4"/>:a>0?<path d={`M${cx+ar} ${cy}A${ar} ${ar} 0 ${a>180?1:0} 0 ${ax} ${ay}`} fill="none" stroke={gold} strokeWidth="4"/>:null;
 return <Box title="Make an angle">
  <Slide label="Turn the blue arm" value={a} min={0} max={360} step={5} onChange={setA} show={`${a}°`}/>
  <svg className="explore-canvas" viewBox="0 0 600 340" role="img" aria-label={`${a} degrees, ${kind}`}>
   <path d={`M${cx} ${cy}H${cx+r}`} stroke={ink} strokeWidth="3"/>
   <path d={`M${cx} ${cy}L${ex} ${ey}`} stroke={blue} strokeWidth="4"/>
   {arc}<circle cx={cx} cy={cy} r="6" fill={ink}/>
   <text x="20" y="32" fontSize="22" fontWeight="700" fill={ink}>{a}°</text><text x="20" y="58" fontSize="17" fill={muted}>{kind}</text>
  </svg>
  <Say><p>Acute: less than 90°. Right: 90°. Obtuse: between 90° and 180°. Straight: 180°. Reflex: between 180° and 360°. Full turn: 360°.</p></Say>
 </Box>;
}

/** Number play: Kaprekar's routine. */
function Kaprekar(){
 const [v,setV]=useState('3524');
 const digits=v.padStart(4,'0'),ok=v.length>0&&new Set(digits.split('')).size>1;
 const steps:[string,string,number][]=[];
 if(ok){let x=Number(v);for(let k=0;k<8&&x!==6174;k++){const s=String(x).padStart(4,'0').split('');const big=[...s].sort().reverse().join(''),small=[...s].sort().join('');x=Number(big)-Number(small);steps.push([big,small,x]);}}
 return <Box title="Kaprekar's machine">
  <label className="explore-slider">Type a number with up to 4 digits<input type="text" inputMode="numeric" maxLength={4} value={v} onChange={e=>setV(e.target.value.replace(/\D/g,'').slice(0,4))} style={{fontSize:'1.2rem',padding:'6px 10px',border:'2px solid #011e47',borderRadius:8,maxWidth:180}}/></label>
  {ok?<ol style={{fontSize:'1.15rem',lineHeight:1.9,margin:'8px 0'}}>{steps.map(([b,s,d],i)=><li key={i}>{`${b} − ${s} = `}<strong style={{color:d===6174?'#b07a12':ink}}>{d}</strong></li>)}</ol>:<p>Use digits that are not all the same, for example 2026.</p>}
  <Say><p>{!ok?'With four equal digits, the largest and smallest arrangements are equal, and the answer is 0.':steps.length===0?'6174 is Kaprekar’s number: 7641 − 1467 = 6174 again.':`You reached 6174 in ${steps.length} step${steps.length===1?'':'s'}. Every such 4-digit number gets there in at most 7 steps.`}</p></Say>
 </Box>;
}

/** Data handling: build a bar graph with a scale. */
function BarBuilder(){
 const names=['Cricket','Football','Kabaddi','Chess'],scales=[5,10,20];
 const [v,setV]=useState([40,25,35,10]),[sc,setSc]=useState(1);const unit=scales[sc],units=60/unit,h=240/units;
 return <Box title="Build a bar graph">
  <div className="explore-grid">{names.map((n,i)=><Slide key={n} label={n} value={v[i]} min={0} max={60} step={5} onChange={x=>setV(v.map((y,j)=>j===i?x:y))}/>)}</div>
  <Pick labels={scales.map(s=>`1 unit = ${s} students`)} value={sc} onChange={setSc}/>
  <svg className="explore-canvas" viewBox="0 0 600 340" role="img" aria-label={names.map((n,i)=>`${n} ${v[i]}`).join(', ')}>
   {Array.from({length:units+1},(_,k)=><g key={k}><path d={`M80 ${300-k*h}H580`} stroke="#e3e8ef"/><text x="70" y={300-k*h+4} textAnchor="end" fontSize="12" fill={ink}>{k*unit}</text></g>)}
   <path d="M80 300H580M80 300V50" stroke={ink} strokeWidth="2"/>
   {v.map((x,i)=><g key={i}><rect x={110+i*115} y={300-x/unit*h} width="70" height={x/unit*h} rx="5" fill={BRIGHT6[i]} stroke={EDGE6[i]} strokeWidth="2"/><text x={145+i*115} y={294-x/unit*h} textAnchor="middle" fontSize="13" fill={ink}>{f2(x/unit)} unit{x/unit===1?'':'s'}</text><text x={145+i*115} y="322" textAnchor="middle" fontSize="13" fill={ink}>{names[i]}</text></g>)}
  </svg>
  <Say><p>Bar height = value ÷ scale. With 1 unit = {unit} students, Cricket’s bar is {v[0]} ÷ {unit} = {f2(v[0]/unit)} units tall.</p><p>Pick the scale that keeps every bar on the page and easy to read.</p></Say>
 </Box>;
}

/** Prime time: the sieve of Eratosthenes up to 60. */
function Sieve(){
 const ps=[2,3,5,7],[k,setK]=useState(0);
 const crossed=(n:number)=>ps.slice(0,k).some(p=>n!==p&&n%p===0);
 const isP=(n:number)=>n>1&&Array.from({length:n-2},(_,i)=>i+2).every(d=>n%d);
 const shown=(n:number)=>k===4?isP(n):ps.slice(0,k).includes(n);
 return <Box title="The sieve of Eratosthenes">
  <Pick labels={['Start','Cross out 2s','Cross out 3s','Cross out 5s','Cross out 7s']} value={k} onChange={setK}/>
  <svg className="explore-canvas" viewBox="0 0 600 330" role="img" aria-label="Numbers 1 to 60">
   {Array.from({length:60},(_,i)=>{const n=i+1,x=50+(i%10)*50,y=20+Math.floor(i/10)*50,c=crossed(n);return <g key={n}><rect x={x} y={y} width="46" height="44" rx="6" fill={shown(n)?BRIGHT6[2]:n===1||c?'#eef1f5':'#fff'} stroke={ink} strokeWidth="1"/><text x={x+23} y={y+28} textAnchor="middle" fontSize="16" fontWeight="700" fill={c||n===1?'#9aa6b5':ink}>{n}</text>{c&&<path d={`M${x+6} ${y+38}L${x+40} ${y+6}`} stroke="#cf624f" strokeWidth="2"/>}</g>;})}
  </svg>
  <Say><p>{k===0?'1 is neither prime nor composite. Press “Cross out 2s” to keep 2 and cross out every other multiple of 2.':k<4?`${ps[k-1]} stays, and its other multiples are crossed out. Next: ${ps[k]}.`:'After 2, 3, 5 and 7, every number left is prime. There are 17 primes up to 60.'}</p><p>We can stop at 7, because 7 × 7 = 49 and the next prime square, 11 × 11 = 121, is more than 60.</p></Say>
 </Box>;
}

/** Perimeter and area of a rectangle. */
function RectSim(){
 const [l,setL]=useState(6),[b,setB]=useState(4);const s=36,x0=300-l*s/2,y0=20;
 return <Box title="Perimeter and area of a rectangle">
  <div className="explore-grid"><Slide label="Length (cm)" value={l} min={1} max={12} onChange={setL}/><Slide label="Breadth (cm)" value={b} min={1} max={8} onChange={setB}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 320" role="img" aria-label={`${l} by ${b} rectangle`}>
   {Array.from({length:l*b},(_,i)=><rect key={i} x={x0+(i%l)*s} y={y0+Math.floor(i/l)*s} width={s} height={s} fill={(i%l+Math.floor(i/l))%2?BRIGHT6[1]:BRIGHT6[2]} stroke="#fff" strokeWidth="1.5"/>)}
   <rect x={x0} y={y0} width={l*s} height={b*s} fill="none" stroke={EDGE6[0]} strokeWidth="5"/>
  </svg>
  <MathText>{`Perimeter = 2 × (${l} + ${b}) = ${2*(l+b)} cm      Area = ${l} × ${b} = ${l*b} cm²`}</MathText>
  <Say><p>The coral border is the perimeter. The coloured unit squares make the area: {b} rows of {l} squares.</p><p>Try length 9 and breadth 1, then length 5 and breadth 5: the perimeter is 20 cm both times, but the areas are 9 cm² and 25 cm².</p></Say>
 </Box>;
}

/** Fractions: compare two fractions with strips. */
const gcd2=(a:number,b:number):number=>b?gcd2(b,a%b):a;
function FractionCompare(){
 const [a,setA]=useState(3),[b,setB]=useState(4),[c,setC]=useState(2),[d,setD]=useState(3);
 const A=Math.min(a,b),C2=Math.min(c,d),L=b*d/gcd2(b,d),p=A*L/b,q=C2*L/d,sign=p>q?'>':p<q?'<':'=';
 const strip=(n:number,den:number,y:number,col:string)=><g>{Array.from({length:den},(_,k)=><rect key={k} x={60+k*480/den} y={y} width={480/den} height="56" fill={k<n?col:'#eef1f5'} stroke="#fff" strokeWidth="3"/>)}</g>;
 return <Box title="Compare two fractions">
  <div className="explore-grid"><Slide label="First: parts shaded" value={A} min={0} max={b} onChange={setA}/><Slide label="First: equal parts" value={b} min={1} max={12} onChange={x=>{setB(x);setA(Math.min(A,x));}}/><Slide label="Second: parts shaded" value={C2} min={0} max={d} onChange={setC}/><Slide label="Second: equal parts" value={d} min={1} max={12} onChange={x=>{setD(x);setC(Math.min(C2,x));}}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 190" role="img" aria-label={`${A}/${b} ${sign} ${C2}/${d}`}>
   <text x="50" y="58" textAnchor="end" fontSize="18" fontWeight="700" fill={ink}>{A}/{b}</text>{strip(A,b,24,BRIGHT6[1])}
   <text x="50" y="140" textAnchor="end" fontSize="18" fontWeight="700" fill={ink}>{C2}/{d}</text>{strip(C2,d,106,BRIGHT6[0])}
  </svg>
  <MathText>{`${A}/${b} = ${p}/${L} and ${C2}/${d} = ${q}/${L}, so ${A}/${b} ${sign} ${C2}/${d}`}</MathText>
  <Say><p>Both fractions are written with the common denominator {L}. Then compare the numerators: {p} {sign} {q}.</p></Say>
 </Box>;
}

/** Constructions: points at equal distance from A and B. */
function Bisector(){
 const [px,setPx]=useState(0),[py,setPy]=useState(3);const X=(x:number)=>300+x*40,Y=(y:number)=>190-y*40;
 const pa=Math.hypot(px+3,py),pb=Math.hypot(px-3,py),eq=Math.abs(pa-pb)<1e-9;
 return <Box title="Points at equal distance from A and B">
  <div className="explore-grid"><Slide label="Move P left or right" value={px} min={-5} max={5} step={0.5} onChange={setPx}/><Slide label="Move P up or down" value={py} min={-4} max={4} step={0.5} onChange={setPy}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 380" role="img" aria-label={`PA ${f2(pa)}, PB ${f2(pb)}`}>
   <path d={`M${X(0)} 10V370`} stroke="#cf624f" strokeWidth="2" strokeDasharray="7 6"/>
   <path d={`M${X(-3)} ${Y(0)}H${X(3)}`} stroke={ink} strokeWidth="3"/>
   <path d={`M${X(-3)} ${Y(0)}L${X(px)} ${Y(py)}L${X(3)} ${Y(0)}`} fill="none" stroke={eq?gold:blue} strokeWidth="3"/>
   {[[-3,'A'],[3,'B']].map(([x,l])=><g key={l as string}><circle cx={X(x as number)} cy={Y(0)} r="7" fill={ink}/><text x={X(x as number)} y={Y(0)+26} textAnchor="middle" fontSize="16" fontWeight="700" fill={ink}>{l}</text></g>)}
   <circle cx={X(px)} cy={Y(py)} r="8" fill={eq?gold:'#fff'} stroke={ink} strokeWidth="2"/><text x={X(px)+12} y={Y(py)-10} fontSize="16" fontWeight="700" fill={ink}>P</text>
  </svg>
  <MathText>{`PA = ${f2(pa)} cm,  PB = ${f2(pb)} cm`}</MathText>
  <Say><p>{eq?'PA = PB: P is on the red line, which passes through the mid-point of AB at 90°.':'PA and PB are different. Move P onto the red dashed line to make them equal.'}</p></Say>
 </Box>;
}

/** Symmetry: turn a shape and look for rotational symmetry. */
const SHAPES=[{name:'Square',order:4,pts:[[-90,-90],[90,-90],[90,90],[-90,90]]},{name:'Equilateral triangle',order:3,pts:[0,1,2].map(k=>[100*Math.cos((90+120*k)*Math.PI/180),-100*Math.sin((90+120*k)*Math.PI/180)])},
 {name:'Regular hexagon',order:6,pts:[0,1,2,3,4,5].map(k=>[100*Math.cos(60*k*Math.PI/180),-100*Math.sin(60*k*Math.PI/180)])},{name:'Rectangle',order:2,pts:[[-120,-60],[120,-60],[120,60],[-120,60]]},{name:'L-shape',order:1,pts:[[-70,-90],[-10,-90],[-10,30],[70,30],[70,90],[-70,90]]}];
export function RotateSim(){
 const [i,setI]=useState(0),[t,setT]=useState(0);const sh=SHAPES[i],step=360/sh.order,same=t>0&&t<360&&t%step===0;
 const pts=sh.pts.map(p=>p.join(',')).join(' ');
 return <Box title="Turn a shape">
  <Pick labels={SHAPES.map(s=>s.name)} value={i} onChange={n=>{setI(n);setT(0);}}/>
  <Slide label="Turn" value={t} min={0} max={360} step={15} onChange={setT} show={`${t}°`}/>
  <svg className="explore-canvas" viewBox="0 0 600 300" role="img" aria-label={`${sh.name} turned ${t} degrees`}>
   <g transform="translate(300 150)"><polygon points={pts} fill="none" stroke="#9aa6b5" strokeWidth="2" strokeDasharray="6 5"/>
    <g transform={`rotate(${-t})`}><polygon points={pts} fill={same?BRIGHT6[2]:BRIGHT6[1]} stroke={same?EDGE6[2]:EDGE6[1]} strokeWidth="3"/><circle cx={sh.pts[0][0]} cy={sh.pts[0][1]} r="9" fill={EDGE6[0]}/></g><circle r="5" fill={ink}/></g>
  </svg>
  <Say><p>{same?`It looks the same after ${t}°!`:t===0||t===360?'The shape is in its starting position.':'Not the same yet. Keep turning.'} The red dot shows how far the shape has turned.</p><p>{sh.order>1?`${sh.name}: angle of symmetry ${step}°, order ${sh.order}.`:'The L-shape looks the same only after a full turn: it has no rotational symmetry.'}</p></Say>
 </Box>;
}

/** Integers: jumps on the number line. */
function IntegerWalk(){
 const [s,setS]=useState(3),[m,setM]=useState(-5),[op,setOp]=useState(0);const e=op?s-m:s+m,X=(v:number)=>300+v*13.5,y=200;
 const mid=(X(s)+X(e))/2,hgt=Math.min(150,30+Math.abs(e-s)*8);
 return <Box title="Add and subtract on the number line">
  <Pick labels={['Add','Subtract']} value={op} onChange={setOp}/>
  <div className="explore-grid"><Slide label="Start" value={s} min={-10} max={10} onChange={setS} show={minus(s)}/><Slide label={op?'Subtract':'Add'} value={m} min={-10} max={10} onChange={setM} show={minus(m)}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 260" role="img" aria-label={`${s} ${op?'minus':'plus'} ${m} = ${e}`}>
   <path d={`M${X(-21)} ${y}H${X(21)}`} stroke={ink} strokeWidth="2"/>
   {Array.from({length:41},(_,k)=>k-20).map(v=><g key={v}><path d={`M${X(v)} ${y-(v%5?5:9)}V${y+(v%5?5:9)}`} stroke={ink}/>{v%5===0&&<text x={X(v)} y={y+28} textAnchor="middle" fontSize="13" fill={ink}>{minus(v)}</text>}</g>)}
   {e!==s&&<path d={`M${X(s)} ${y-8}Q${mid} ${y-8-hgt} ${X(e)} ${y-8}`} fill="none" stroke={gold} strokeWidth="3"/>}
   <circle cx={X(s)} cy={y} r="8" fill={blue}/><circle cx={X(e)} cy={y} r="8" fill={gold} stroke={ink}/>
   <text x={X(e)} y={y+52} textAnchor="middle" fontSize="16" fontWeight="700" fill={ink}>{minus(e)}</text>
  </svg>
  <MathText>{op?`${minus(s)} − ${signed(m)} = ${minus(s)} + ${signed(-m)} = ${minus(e)}`:`${minus(s)} + ${signed(m)} = ${minus(e)}`}</MathText>
  <Say><p>{op?'Subtracting a number is the same as adding its opposite. ':''}Adding a positive number moves right. Adding a negative number moves left.</p></Say>
 </Box>;
}

/** ICSE 7 Sets: counts in a two-set Venn diagram. */
function VennSim(){
 const [u,setU]=useState(40),[a,setA]=useState(22),[b,setB]=useState(15),[c,setC]=useState(6);
 const both=Math.min(c,a,b),onlyA=a-both,onlyB=b-both,union=a+b-both,uu=Math.max(u,union),none=uu-union;
 return <Box title="Count the regions of a Venn diagram">
  <div className="explore-grid"><Slide label="n(U)" value={uu} min={10} max={60} onChange={setU}/><Slide label="n(A)" value={a} min={0} max={30} onChange={setA}/><Slide label="n(B)" value={b} min={0} max={30} onChange={setB}/><Slide label="n(A ∩ B)" value={both} min={0} max={Math.min(a,b)} onChange={setC}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 300" role="img" aria-label={`only A ${onlyA}, both ${both}, only B ${onlyB}, neither ${none}`}>
   <rect x="40" y="20" width="520" height="260" rx="14" fill="#fffaf0" stroke={ink} strokeWidth="2"/><text x="58" y="46" fontSize="16" fontWeight="700" fill={ink}>U</text>
   <circle cx="245" cy="150" r="105" fill={BRIGHT6[0]} fillOpacity="0.55" stroke={EDGE6[0]} strokeWidth="3"/>
   <circle cx="355" cy="150" r="105" fill={BRIGHT6[1]} fillOpacity="0.55" stroke={EDGE6[1]} strokeWidth="3"/>
   <text x="180" y="60" fontSize="17" fontWeight="700" fill={EDGE6[0]}>A</text><text x="410" y="60" fontSize="17" fontWeight="700" fill={EDGE6[1]}>B</text>
   <text x="195" y="158" textAnchor="middle" fontSize="24" fontWeight="700" fill={ink}>{onlyA}</text>
   <text x="300" y="158" textAnchor="middle" fontSize="24" fontWeight="700" fill={EDGE6[3]}>{both}</text>
   <text x="405" y="158" textAnchor="middle" fontSize="24" fontWeight="700" fill={ink}>{onlyB}</text>
   <text x="520" y="262" textAnchor="middle" fontSize="20" fontWeight="700" fill={EDGE6[6]}>{none}</text>
  </svg>
  <MathText>{`n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = ${a} + ${b} − ${both} = ${union}`}</MathText>
  <Say><p>Fill the middle first: {both} elements are in both sets. Then only A = {a} − {both} = {onlyA} and only B = {b} − {both} = {onlyB}.</p><p>Outside both circles: n(U) − n(A ∪ B) = {uu} − {union} = {none}.{u<union?' (n(U) cannot be smaller than n(A ∪ B), so it moved up.)':''}</p></Say>
 </Box>;
}

/** ICSE 7 Speed, distance and time: two travellers move towards each other. */
function MeetSim(){
 const [d,setD]=useState(240),[v1,setV1]=useState(60),[v2,setV2]=useState(40),[t,setT]=useState(1);
 const meet=d/(v1+v2),tt=Math.min(t,meet),p1=v1*tt,p2=d-v2*tt,X=(km:number)=>50+km*500/d;
 const gx=(h:number)=>70+h*460/6,gy=(km:number)=>290-km*110/d;
 return <Box title="When do they meet?">
  <div className="explore-grid"><Slide label="Distance apart (km)" value={d} min={60} max={360} step={30} onChange={setD}/><Slide label="Speed of A (km/h)" value={v1} min={10} max={90} step={10} onChange={setV1}/><Slide label="Speed of B (km/h)" value={v2} min={10} max={90} step={10} onChange={setV2}/><Slide label="Time (h)" value={t} min={0} max={6} step={0.25} onChange={setT}/></div>
  <svg className="explore-canvas" viewBox="0 0 600 310" role="img" aria-label={`after ${f2(tt)} hours A has gone ${f2(p1)} km and B ${f2(d-p2)} km`}>
   <path d={`M50 70H550`} stroke={ink} strokeWidth="3"/><text x="50" y="100" textAnchor="middle" fontSize="13" fill={ink}>0</text><text x="550" y="100" textAnchor="middle" fontSize="13" fill={ink}>{d} km</text>
   <path d={`M${X(0)} 70H${X(p1)}`} stroke={EDGE6[0]} strokeWidth="7"/><path d={`M${X(p2)} 70H${X(d)}`} stroke={EDGE6[1]} strokeWidth="7"/>
   <circle cx={X(p1)} cy="70" r="12" fill={BRIGHT6[0]} stroke={EDGE6[0]} strokeWidth="2"/><text x={X(p1)} y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill={EDGE6[0]}>A</text>
   <circle cx={X(p2)} cy="70" r="12" fill={BRIGHT6[1]} stroke={EDGE6[1]} strokeWidth="2"/><text x={X(p2)} y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill={EDGE6[1]}>B</text>
   <path d="M70 290H540M70 290V170" stroke={ink} strokeWidth="1.5"/>{[0,1,2,3,4,5,6].map(h=><text key={h} x={gx(h)} y="306" textAnchor="middle" fontSize="11" fill={ink}>{h} h</text>)}
   <path d={`M${gx(0)} ${gy(0)}L${gx(meet)} ${gy(v1*meet)}`} stroke={EDGE6[0]} strokeWidth="2.5"/><path d={`M${gx(0)} ${gy(d)}L${gx(meet)} ${gy(d-v2*meet)}`} stroke={EDGE6[1]} strokeWidth="2.5"/>
   <path d={`M${gx(tt)} 170V290`} stroke={gold} strokeDasharray="5 4"/><circle cx={gx(meet)} cy={gy(v1*meet)} r="6" fill={EDGE6[3]}/>
   <text x="560" y="180" textAnchor="end" fontSize="12" fill={ink}>distance from A’s start</text>
  </svg>
  <MathText>{`They close the gap at ${v1} + ${v2} = ${v1+v2} km/h, so time to meet = ${d} ÷ ${v1+v2} = ${f2(meet)} h`}</MathText>
  <Say><p>{t>=meet?`They meet after ${f2(meet)} h, ${f2(v1*meet)} km from A’s start.`:`After ${f2(tt)} h the gap is ${f2(p2-p1)} km.`}</p><p>When two objects move towards each other, add their speeds. The purple dot on the graph is the meeting point.</p></Say>
 </Box>;
}

/** ICSE 7 Inequalities: solve ax + b ? c and show the answer on a number line. */
function InequalitySim(){
 const A=[-3,-2,-1,1,2,3],S=['<','≤','>','≥'],flip=[2,3,0,1];
 const [ai,setAi]=useState(4),[b,setB]=useState(3),[c,setC]=useState(11),[si,setSi]=useState(0);
 const a=A[ai],r=(c-b)/a,so=a<0?flip[si]:si,sign=S[so],closed=so%2===1,right=so>=2;
 const X=(v:number)=>300+v*25,y=150,rr=Math.max(-11,Math.min(11,r));
 const term=`${a===1?'':a===-1?'−':minus(a)}x ${b<0?'−':'+'} ${Math.abs(b)}`;
 return <Box title="Solve an inequality and draw the answer">
  <div className="explore-grid"><Slide label="a" value={ai} min={0} max={5} onChange={setAi} show={minus(a)}/><Slide label="b" value={b} min={-10} max={10} onChange={setB} show={minus(b)}/><Slide label="c" value={c} min={-10} max={12} onChange={setC} show={minus(c)}/></div>
  <Pick labels={S} value={si} onChange={setSi}/>
  <svg className="explore-canvas" viewBox="0 0 600 230" role="img" aria-label={`x ${sign} ${f2(r)}`}>
   <path d={right?`M${X(rr)} ${y}H585`:`M15 ${y}H${X(rr)}`} stroke={EDGE6[2]} strokeWidth="9" strokeLinecap="round" opacity="0.8"/>
   <path d={`M15 ${y}H585`} stroke={ink} strokeWidth="2"/>
   {Array.from({length:23},(_,k)=>k-11).map(v=><g key={v}><path d={`M${X(v)} ${y-6}V${y+6}`} stroke={ink}/>{v%2===0&&<text x={X(v)} y={y+26} textAnchor="middle" fontSize="12" fill={ink}>{minus(v)}</text>}</g>)}
   <circle cx={X(rr)} cy={y} r="9" fill={closed?EDGE6[2]:'#fff'} stroke={EDGE6[2]} strokeWidth="3"/>
   <text x="300" y="50" textAnchor="middle" fontSize="20" fontWeight="700" fill={ink}>{`${term} ${S[si]} ${minus(c)}`}</text>
   <text x="300" y="210" textAnchor="middle" fontSize="18" fontWeight="700" fill={EDGE6[2]}>{`x ${sign} ${f2(r)}`}</text>
  </svg>
  <MathText>{`${a===1?'x':`${minus(a)}x`} ${S[si]} ${minus(c)} − ${signed(b)}, so ${a===1?'x':`${minus(a)}x`} ${S[si]} ${minus(c-b)}  →  x ${sign} ${f2(r)}`}</MathText>
  <Say><p>{a<0?`You divided by ${minus(a)}, a negative number, so the sign turned round: ${S[si]} became ${sign}.`:`You divided by ${a}, a positive number, so the sign stays ${sign}.`}</p><p>{closed?'A filled dot means the boundary value is included.':'An open dot means the boundary value is not included.'}</p></Say>
 </Box>;
}

const SIMS:Record<string,()=>ReactNode>={'g6-patterns':()=><OddSquare/>,'g6-lines-angles':()=><AngleMaker/>,'g6-number-play':()=><Kaprekar/>,'g6-data':()=><BarBuilder/>,'g6-prime-time':()=><Sieve/>,'g6-perimeter-area':()=><RectSim/>,'g6-fractions':()=><FractionCompare/>,'g6-constructions':()=><Bisector/>,'g6-integers':()=><IntegerWalk/>,'g11-limits-derivatives':()=><SecantTangent/>,'g11-conic-sections':()=><Conics/>,'g11-binomial-theorem':()=><Pascal/>,'g12-vector-algebra':()=><Vectors/>,'icse7-sets':()=><VennSim/>,'icse7-speed-distance-time':()=><MeetSim/>,'icse7-inequalities':()=><InequalitySim/>,'icse7-constructions':()=><Bisector/>};
export const hasExplore=(slug:string)=>slug in SIMS;
export default function ExploreSims({slug}:{slug:string}){const S=SIMS[slug];if(!S)return null;return <div className="notes-explore"><h2>Explore with a simulation</h2><p>Move the sliders and watch the picture change.</p>{S()}</div>;}
