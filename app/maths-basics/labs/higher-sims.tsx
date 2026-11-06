'use client';
import {useState,type CSSProperties,type ReactNode} from 'react';
import {Lab,MathLine,Why,Choices,Slider,Canvas,CoordinateGrid,X,Y,ink,gold,cream,blue,fmt} from './lab-kit';

const move=(x:number,y:number,deg=0):CSSProperties=>({transform:`translate(${x}px,${y}px) rotate(${deg}deg)`,transformOrigin:'0 0',transition:'transform .9s ease'});
const r1=(n:number)=>Math.round(n*10)/10;

/** Pythagoras: the same four triangles leave c² uncovered, then a² + b² uncovered. */
export function PythagorasLab(){
 const [a,setA]=useState(3),[mode,setMode]=useState(0);const b=7-a,s=a+b,k=280/s,ox=160,oy=20;
 const c=Math.sqrt(a*a+b*b);
 const place=mode===0?[[0,0],[s,0],[s,s],[0,s]]:[[0,a],[s,0],[a,s],[a,a]];
 const P=(x:number,y:number)=>`${ox+x*k},${oy+y*k}`;
 return <Lab title="Prove Pythagoras by moving four triangles">
  <Slider label="Short leg a (and b = 7 − a)" value={a} min={1} max={3} onChange={setA}/>
  <Choices labels={['Arrangement 1: show c²','Arrangement 2: show a² and b²']} value={mode} onChange={setMode} label="Arrangement"/>
  <Canvas label={`Square of side ${s} with four right triangles of legs ${a} and ${b}; ${mode===0?`uncovered square c² = ${a*a+b*b}`:`uncovered squares a² = ${a*a} and b² = ${b*b}`}`} height={320}>
   <rect x={ox} y={oy} width={s*k} height={s*k} fill="#fff" stroke={ink} strokeWidth="2"/>
   {mode===0?<><polygon points={[P(a,0),P(s,a),P(b,s),P(0,b)].join(' ')} fill={blue}/><text x={ox+s*k/2} y={oy+s*k/2+7} textAnchor="middle" fontSize="22" fontWeight="700" fill={ink}>c² = {a*a+b*b}</text></>
    :<><rect x={ox} y={oy} width={a*k} height={a*k} fill={blue}/><text x={ox+a*k/2} y={oy+a*k/2+6} textAnchor="middle" fontSize="18" fontWeight="700" fill={ink}>a² = {a*a}</text><rect x={ox+a*k} y={oy+a*k} width={b*k} height={b*k} fill={blue}/><text x={ox+(a+b/2)*k} y={oy+(a+b/2)*k+7} textAnchor="middle" fontSize="20" fontWeight="700" fill={ink}>b² = {b*b}</text></>}
   {place.map(([x,y],i)=><g key={i} style={move(ox+x*k,oy+y*k,i*90)}><polygon points={`0,0 ${a*k},0 0,${b*k}`} fill={cream} stroke={gold} strokeWidth="2.5"/><text x={a*k/3} y={b*k/3+5} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink} transform={`rotate(${-i*90} ${a*k/3} ${b*k/3})`}>{i+1}</text></g>)}
   <text x={ox-10} y={oy+s*k/2} textAnchor="end" fontSize="15" fill={ink}>side a + b = {s}</text>
  </Canvas>
  <MathLine>{mode===0?`Uncovered area = c² = ${a*a+b*b}, so c = ${fmt(Math.round(c*1000)/1000)}`:`Uncovered area = a² + b² = ${a*a} + ${b*b} = ${a*a+b*b}`}</MathLine>
  <Why><p>Both pictures use the same big square and the same four triangles. So the white area left over must be the same in both pictures.</p><p>{mode===0?'Switch to arrangement 2. Watch the triangles slide: the tilted square c² turns into two squares a² and b².':'The left-over area was c² before and is a² + b² now. So a² + b² = c² for every right triangle.'}</p></Why>
 </Lab>;
}

/** Algebra tiles: arrange x² + bx + c into a rectangle to factorise it. */
const EXPR=[[2,3],[3,4],[3,3],[1,3]];
export function AlgebraTilesLab(){
 const [e,setE]=useState(0),[made,setMade]=useState(0);const [p,q]=EXPR[e],U=26,XL=4*U,ox=70,oy=20;
 const tiles:{w:number;h:number;fill:string;at:[number,number];to:[number,number]}[]=[{w:XL,h:XL,fill:blue,at:[0,0],to:[0,0]}];
 for(let i=0;i<p;i++)tiles.push({w:U,h:XL,fill:cream,at:[XL+14+i*(U+10),0],to:[XL+i*U,0]});
 for(let j=0;j<q;j++)tiles.push({w:XL,h:U,fill:cream,at:[0,XL+14+j*(U+10)],to:[0,XL+j*U]});
 for(let k=0;k<p*q;k++)tiles.push({w:U,h:U,fill:'#f3c7b4',at:[XL+14+p*(U+10)+8+(k%4)*(U+8),XL+14+Math.floor(k/4)*(U+8)],to:[XL+(k%p)*U,XL+Math.floor(k/p)*U]});
 const expr=`x² + ${p+q}x + ${p*q}`;
 return <Lab title="Factorise with algebra tiles">
  <Choices labels={EXPR.map(([m,n])=>`x² + ${m+n}x + ${m*n}`)} value={e} onChange={v=>{setE(v);setMade(0);}} label="Choose an expression"/>
  <Choices labels={['Loose tiles','Make a rectangle']} value={made} onChange={setMade} label="Tiles"/>
  <Canvas label={`${expr}: ${made?`a rectangle of (x + ${p}) by (x + ${q})`:'loose tiles'}`} height={330}>
   {tiles.map((t,i)=>{const [x,y]=made?t.to:t.at;return <g key={`${e}-${i}`} style={move(ox+x,oy+y)}><rect width={t.w} height={t.h} fill={t.fill} stroke={ink} strokeWidth="1.5"/>{i===0&&<text x={XL/2} y={XL/2+7} textAnchor="middle" fontSize="20" fontWeight="700" fill={ink}>x²</text>}{t.w!==t.h&&<text x={t.w/2} y={t.h/2+5} textAnchor="middle" fontSize="13" fill={ink}>x</text>}{t.w===U&&t.h===U&&<text x={U/2} y={U/2+5} textAnchor="middle" fontSize="12" fill={ink}>1</text>}</g>;})}
   {made===1&&<><text x={ox+(XL+p*U)/2} y={oy+XL+q*U+28} textAnchor="middle" fontSize="17" fontWeight="700" fill={ink}>x + {p}</text><text x={ox-12} y={oy+(XL+q*U)/2} textAnchor="end" fontSize="17" fontWeight="700" fill={ink}>x + {q}</text></>}
  </Canvas>
  <MathLine>{made?`${expr} = (x + ${p})(x + ${q})`:`${expr}: 1 big square, ${p+q} strips, ${p*q} small squares`}</MathLine>
  <Why><p>{made?`The tiles fit into one rectangle. Its sides are x + ${p} and x + ${q}, so these are the factors.`:'Put the x² tile in the corner. Put strips along two sides. Then fill the corner gap with the small squares.'}</p><p>{`The two numbers ${p} and ${q} add to ${p+q} (the strips) and multiply to ${p*q} (the small squares).`}</p></Why>
 </Lab>;
}

/** Simple and compound interest: bars for each year. */
export function InterestLab(){
 const [rate,setRate]=useState(10),[years,setYears]=useState(5),P=1000;
 const si=(t:number)=>P*(1+rate*t/100),ci=(t:number)=>P*Math.pow(1+rate/100,t);
 const max=ci(years),H=230,bw=Math.min(36,220/years),gap=(520-2*bw*years)/(years+1);
 const h=(v:number)=>v/max*H;
 return <Lab title="Simple interest and compound interest">
  <Slider label="Rate (% each year)" value={rate} min={5} max={20} onChange={setRate}/>
  <Slider label="Years" value={years} min={1} max={10} onChange={setYears}/>
  <Canvas label={`₹1000 at ${rate}% for ${years} years: simple ₹${Math.round(si(years))}, compound ₹${Math.round(ci(years))}`} height={320}>
   <path d="M40 270H580" stroke={ink} strokeWidth="2"/>
   {Array.from({length:years},(_,i)=>{const t=i+1,x=40+gap+i*(2*bw+gap);return <g key={t}>
    <rect x={x} y={270-h(si(t))} width={bw} height={h(si(t))} fill={blue} stroke={ink}/>
    <rect x={x+bw} y={270-h(si(t))} width={bw} height={h(si(t))} fill={cream} stroke={ink}/>
    <rect x={x+bw} y={270-h(ci(t))} width={bw} height={h(ci(t))-h(si(t))} fill={gold} stroke={ink}/>
    <text x={x+bw} y="292" textAnchor="middle" fontSize="14" fill={ink}>{t}</text></g>;})}
   <rect x="40" y="10" width="16" height="16" fill={blue} stroke={ink}/><text x="62" y="23" fontSize="14" fill={ink}>simple</text>
   <rect x="130" y="10" width="16" height="16" fill={cream} stroke={ink}/><text x="152" y="23" fontSize="14" fill={ink}>compound</text>
   <rect x="250" y="10" width="16" height="16" fill={gold} stroke={ink}/><text x="272" y="23" fontSize="14" fill={ink}>interest on interest</text>
   <text x="300" y="314" textAnchor="middle" fontSize="14" fill={ink}>year</text>
  </Canvas>
  <MathLine>{`SI: A = 1000(1 + ${rate}×${years}/100) = ${fmt(r1(si(years)))}   CI: A = 1000(1 + ${rate}/100)^${years} = ${fmt(r1(ci(years)))}`}</MathLine>
  <Why><p>{`Simple interest adds the same ₹${rate*10} every year, so its bars grow in equal steps. Compound interest also earns interest on the old interest.`}</p><p>{`The gold part is the interest on interest. After ${years} years it is ₹${fmt(r1(ci(years)-si(years)))}. It grows faster every year.`}</p></Why>
 </Lab>;
}

/** Fold a net into a cube (CSS 3D). */
export function NetFoldLab(){
 const [f,setF]=useState(0),[turn,setTurn]=useState(30);
 const faceBase:CSSProperties={position:'absolute',width:70,height:70,boxSizing:'border-box',background:'rgba(244,224,174,.88)',border:`2px solid ${ink}`,transformStyle:'preserve-3d',transition:'transform .4s ease',display:'grid',placeItems:'center',font:'700 20px/1 system-ui,sans-serif',color:ink};
 const face=(n:number,style:CSSProperties,child?:ReactNode)=><div className="cube-face" style={{...faceBase,...(n===1?{background:'rgba(220,231,243,.95)'}:{}),...style}}><span>{n}</span>{child}</div>;
 return <Lab title="Fold a net into a cube">
  <Slider label="Fold (degrees)" value={f} min={0} max={90} step={5} onChange={setF}/>
  <Slider label="Turn the view" value={turn} min={-60} max={60} step={5} onChange={setTurn}/>
  <div className="cube-stage" style={{height:300,display:'grid',placeItems:'center',perspective:900,background:'#fff',borderRadius:12,margin:'.6rem 0',overflow:'hidden'}} role="img" aria-label={`Cross-shaped net of six squares folded ${f} degrees`}>
   <div className="cube-net" style={{position:'relative',width:70,height:70,transformStyle:'preserve-3d',transition:'transform .4s ease',transform:`rotateX(55deg) rotateZ(${turn}deg)`}}>
    {face(1,{position:'relative'},<>
     {face(2,{top:'100%',left:0,transformOrigin:'top',transform:`rotateX(${f}deg)`})}
     {face(3,{top:'-100%',left:0,transformOrigin:'bottom',transform:`rotateX(${-f}deg)`},face(6,{top:'-100%',left:0,transformOrigin:'bottom',transform:`rotateX(${-f}deg)`}))}
     {face(4,{left:'-100%',top:0,transformOrigin:'right',transform:`rotateY(${f}deg)`})}
     {face(5,{left:'100%',top:0,transformOrigin:'left',transform:`rotateY(${-f}deg)`})}
    </>)}
   </div>
  </div>
  <svg className="lab-canvas" style={{maxHeight:44}} viewBox="0 0 600 40" role="img" aria-label="Faces 6, edges 12, vertices 8"><text x="300" y="27" textAnchor="middle" fontSize="18" fontWeight="700" fill={ink}>Faces F = 6 · Edges E = 12 · Vertices V = 8</text></svg>
  <MathLine>{'F + V − E = 6 + 8 − 12 = 2'}</MathLine>
  <Why><p>{f<90?'Move the fold slider. The four side squares stand up around square 1, and square 6 closes the top like a lid.':'The net is now a closed cube. Square 6 sits opposite square 1, square 2 opposite 3, and square 4 opposite 5.'}</p><p>A net is a flat shape that folds into a solid. A cube has 6 faces, 12 edges and 8 vertices, and F + V − E = 2.</p></Why>
 </Lab>;
}

/** Three cones of water fill a cylinder of the same base and height. */
export function ConePourLab(){
 const [n,setN]=useState(0),[r,setR]=useState(7),h=12;
 const cyl=22/7*r*r*h,cone=cyl/3;
 return <Lab title="Pour cones into a cylinder">
  <Slider label="Radius r (cm), height h = 12 cm" value={r} min={7} max={21} step={7} onChange={v=>{setR(v);setN(0);}}/>
  <Choices labels={['Empty','Pour 1 cone','Pour 2 cones','Pour 3 cones']} value={n} onChange={setN} label="Cones poured"/>
  <Canvas label={`${n} cones poured; the cylinder is ${n} third${n===1?'':'s'} full`} height={300}>
   <polygon points="110,250 190,250 150,60" fill={n<3?'#9cc3e8':'#fff'} stroke={ink} strokeWidth="2.5"/>
   <text x="150" y="282" textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>cone</text>
   <rect x="300" y="60" width="200" height="190" fill="#fff" stroke="none"/>
   <rect x="300" y="60" width="200" height="190" fill="#9cc3e8" style={{transform:`scaleY(${n/3})`,transformBox:'fill-box',transformOrigin:'bottom',transition:'transform .8s ease'}}/>
   {[1,2].map(i=><path key={i} d={`M300 ${250-i*190/3}h200`} stroke={ink} strokeDasharray="5 5"/>)}
   <path d="M300 60V250H500V60" fill="none" stroke={ink} strokeWidth="2.5"/>
   <text x="400" y="282" textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>cylinder (same r and h)</text>
   <text x="515" y="215" fontSize="14" fill={ink}>⅓</text><text x="515" y="152" fontSize="14" fill={ink}>⅔</text><text x="515" y="88" fontSize="14" fill={ink}>full</text>
  </Canvas>
  <MathLine>{`V(cylinder) = πr²h = 22/7 × ${r}² × 12 = ${Math.round(cyl)} cm³,  V(cone) = ${Math.round(cyl)} ÷ 3 = ${Math.round(cone)} cm³`}</MathLine>
  <Why><p>{n<3?`${n} cone${n===1?'':'s'} of water fill${n===1?'s':''} ${n} third${n===1?'':'s'} of the cylinder. Pour again.`:'Three full cones fill the cylinder exactly.'}</p><p>So the volume of a cone is one third of the cylinder with the same base and height: V = ⅓πr²h.</p></Why>
 </Lab>;
}

/** Basic proportionality theorem. */
export function BptLab(){
 const [t,setT]=useState(0.4),[tilt,setTilt]=useState(0);
 const A=[300,40],B=[90,300],C=[530,300],AB=10,AC=15,u=Math.min(.9,t+(tilt?0.2:0));
 const D=[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t],E=[A[0]+(C[0]-A[0])*u,A[1]+(C[1]-A[1])*u];
 const ad=AB*t,db=AB-ad,ae=AC*u,ec=AC-ae;
 return <Lab title="Cut a triangle with a line parallel to one side">
  <Slider label="Position of D on AB" value={t} min={0.2} max={0.8} step={0.1} onChange={setT}/>
  <Choices labels={['DE parallel to BC','Tilt DE']} value={tilt} onChange={setTilt} label="Line DE"/>
  <Canvas label={`AD ${fmt(r1(ad))}, DB ${fmt(r1(db))}, AE ${fmt(r1(ae))}, EC ${fmt(r1(ec))}`} height={330}>
   <polygon points={`${A} ${B} ${C}`} fill="#fff" stroke={ink} strokeWidth="2.5"/>
   <path d={`M${D[0]} ${D[1]}L${E[0]} ${E[1]}`} stroke={gold} strokeWidth="4"/>
   {[[A,'A',0,-12],[B,'B',-22,10],[C,'C',10,10],[D,'D',-24,0],[E,'E',10,0]].map(([p,l,dx,dy])=>{const q=p as number[];return <g key={l as string}><circle cx={q[0]} cy={q[1]} r="5" fill={ink}/><text x={q[0]+(dx as number)} y={q[1]+(dy as number)} fontSize="17" fontWeight="700" fill={ink}>{l as string}</text></g>;})}
   <text x={(A[0]+D[0])/2-46} y={(A[1]+D[1])/2} fontSize="15" fill={ink}>{fmt(r1(ad))}</text><text x={(D[0]+B[0])/2-46} y={(D[1]+B[1])/2} fontSize="15" fill={ink}>{fmt(r1(db))}</text>
   <text x={(A[0]+E[0])/2+12} y={(A[1]+E[1])/2} fontSize="15" fill={ink}>{fmt(r1(ae))}</text><text x={(E[0]+C[0])/2+12} y={(E[1]+C[1])/2} fontSize="15" fill={ink}>{fmt(r1(ec))}</text>
  </Canvas>
  <MathLine>{`AD/DB = ${fmt(r1(ad))}/${fmt(r1(db))} = ${fmt(Math.round(ad/db*100)/100)},  AE/EC = ${fmt(r1(ae))}/${fmt(r1(ec))} = ${fmt(Math.round(ae/ec*100)/100)}`}</MathLine>
  <Why><p>{tilt?'Now DE is not parallel to BC. The two ratios are different, so the theorem needs the parallel line.':'DE is parallel to BC. Move D: the two ratios change, but they always stay equal.'}</p><p>Basic proportionality theorem (Thales): a line parallel to one side of a triangle divides the other two sides in the same ratio.</p></Why>
 </Lab>;
}

/** Heights and distances: walk towards a tower and watch the angle of elevation. */
export function HeightLab(){
 const [d,setD]=useState(52),h=30,th=Math.atan(h/d)*180/Math.PI,k=6,base=290,tx=540,ox=tx-d*k;
 const presets=[[52,'30°'],[30,'45°'],[17,'60°']] as const;
 return <Lab title="Walk towards a tower">
  <Slider label="Distance from the tower (m)" value={d} min={10} max={80} onChange={setD}/>
  <Choices labels={presets.map(p=>`Stand where θ ≈ ${p[1]}`)} value={presets.findIndex(p=>p[0]===d)} onChange={i=>setD(presets[i][0])} label="Special angles"/>
  <Canvas label={`Tower 30 m; observer ${d} m away; angle of elevation ${Math.round(th)} degrees`} height={320}>
   <path d="M20 290H590" stroke={ink} strokeWidth="2"/>
   <rect x={tx} y={base-h*k} width="22" height={h*k} fill={blue} stroke={ink} strokeWidth="2"/>
   <path d={`M${ox} ${base}L${tx} ${base-h*k}`} stroke={gold} strokeWidth="3" strokeDasharray="8 5"/>
   <path d={`M${ox+40} ${base}A40 40 0 0 0 ${ox+40*Math.cos(th*Math.PI/180)} ${base-40*Math.sin(th*Math.PI/180)}`} fill="none" stroke={ink} strokeWidth="2"/>
   <text x={ox+48} y={base-8} fontSize="15" fontWeight="700" fill={ink}>θ = {Math.round(th)}°</text>
   <g transform={`translate(${ox} ${base})`}><circle cx="0" cy="-34" r="6" fill={ink}/><path d="M0 -28V-12M0 -12L-6 0M0 -12L6 0M-7 -22H7" stroke={ink} strokeWidth="2.5"/></g>
   <text x={tx-6} y={base-h*k/2} textAnchor="end" fontSize="15" fontWeight="700" fill={ink}>30 m</text>
   <text x={(ox+tx)/2} y="312" textAnchor="middle" fontSize="15" fill={ink}>{d} m</text>
  </Canvas>
  <MathLine>{`tan θ = height / distance = 30/${d} = ${fmt(Math.round(h/d*1000)/1000)},  θ ≈ ${Math.round(th)}°`}</MathLine>
  <Why><p>Walk closer to the tower: the line of sight gets steeper and the angle of elevation grows.</p><p>{`At 30√3 ≈ 52 m the angle is 30°. At 30 m it is 45°, because tan 45° = 1. At 10√3 ≈ 17 m it is 60°.`}</p></Why>
 </Lab>;
}

/** Pair of linear equations: x + 2y = 4 and 2x + ky = c. */
export function LinePairLab(){
 const [k,setK]=useState(3),[c,setC]=useState(6);
 const kind=k!==4?'intersect':c===8?'coincident':'parallel';
 const yAt=(x:number,a:number,b:number,cc:number)=>(cc-a*x)/b;
 const line=(a:number,b:number,cc:number)=>`M${X(-6)} ${Y(yAt(-6,a,b,cc))}L${X(6)} ${Y(yAt(6,a,b,cc))}`;
 const y0=k!==4?(c-8)/(k-4):0,x0=4-2*y0;
 return <Lab title="Two lines: meet, never meet or overlap">
  <Slider label="k in 2x + ky = c" value={k} min={1} max={6} onChange={setK}/>
  <Slider label="c in 2x + ky = c" value={c} min={2} max={12} step={2} onChange={setC}/>
  <CoordinateGrid label={`x + 2y = 4 and 2x + ${k}y = ${c}: the lines ${kind==='intersect'?`meet at (${fmt(r1(x0))}, ${fmt(r1(y0))})`:kind==='parallel'?'are parallel':'are the same line'}`}>
   <defs><clipPath id="lp-clip"><rect x="120" y="30" width="360" height="360"/></clipPath></defs>
   <g clipPath="url(#lp-clip)"><path d={line(1,2,4)} stroke="#5b8fc7" strokeWidth={kind==='coincident'?8:4}/><path d={line(2,k,c)} stroke={gold} strokeWidth="3.5" strokeDasharray={kind==='coincident'?'10 8':undefined}/>
   {kind==='intersect'&&Math.abs(x0)<=6&&Math.abs(y0)<=6&&<circle cx={X(x0)} cy={Y(y0)} r="7" fill={ink}/>}</g>
  </CoordinateGrid>
  <MathLine>{`a₁/a₂ = 1/2,  b₁/b₂ = 2/${k},  c₁/c₂ = 4/${c}`}</MathLine>
  <Why><p>{kind==='intersect'?`a₁/a₂ ≠ b₁/b₂, so the lines meet at one point (${fmt(r1(x0))}, ${fmt(r1(y0))}). There is exactly one solution.`:kind==='parallel'?'a₁/a₂ = b₁/b₂ ≠ c₁/c₂, so the lines are parallel. They never meet: there is no solution.':'a₁/a₂ = b₁/b₂ = c₁/c₂, so the two equations draw the same line. There are infinitely many solutions.'}</p><p>Blue line: x + 2y = 4. Gold line: 2x + ky = c. Set k = 4 to make the lines parallel, then set c = 8 to make them overlap.</p></Why>
 </Lab>;
}

/** The mean is the balance point. */
export function MeanBalanceLab(){
 const [v,setV]=useState(8),[s,setS]=useState(5);
 const data=[2,4,4,6,v],mean=data.reduce((a,b)=>a+b,0)/5,torque=data.reduce((a,b)=>a+b-s,0);
 const ang=Math.max(-14,Math.min(14,torque*2)),Xp=(x:number)=>60+x*48,stack:Record<number,number>={};
 return <Lab title="Find the balance point of the data">
  <Slider label="Move the last value" value={v} min={0} max={10} onChange={setV}/>
  <Slider label="Place the support at" value={s} min={0} max={10} step={0.2} onChange={setS}/>
  <Choices labels={['Put the support at the mean']} value={Math.abs(s-mean)<1e-9?0:-1} onChange={()=>setS(Math.round(mean*5)/5)} label="Support"/>
  <Canvas label={`Data 2, 4, 4, 6, ${v}; mean ${fmt(mean)}; support at ${fmt(s)}; ${Math.abs(torque)<1e-9?'balanced':torque>0?'tips right':'tips left'}`} height={260}>
   <g style={{transform:`rotate(${ang}deg)`,transformOrigin:`${Xp(s)}px 170px`,transition:'transform .5s ease'}}>
    <rect x={Xp(0)-10} y="166" width={10*48+20} height="8" fill={ink}/>
    {data.map((x,i)=>{const n=stack[x]=(stack[x]||0)+1;return <rect key={i} x={Xp(x)-14} y={166-n*28} width="28" height="26" rx="4" fill={i===4?gold:cream} stroke={ink}/>;})}
    {Array.from({length:11},(_,i)=><text key={i} x={Xp(i)} y="192" textAnchor="middle" fontSize="13" fill={ink}>{i}</text>)}
   </g>
   <polygon points={`${Xp(s)},174 ${Xp(s)-16},214 ${Xp(s)+16},214`} fill={blue} stroke={ink} strokeWidth="2"/>
   <path d={`M${Xp(mean)} 228v14`} stroke={gold} strokeWidth="3"/><text x={Xp(mean)} y="256" textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>mean {fmt(mean)}</text>
  </Canvas>
  <MathLine>{`mean = (2 + 4 + 4 + 6 + ${v}) ÷ 5 = ${fmt(mean)},  sum of (x − ${fmt(s)}) = ${fmt(Math.round(torque*100)/100)}`}</MathLine>
  <Why><p>{Math.abs(torque)<1e-9?'The beam balances. The support is exactly at the mean.':torque>0?'The beam tips to the right: the data pulls more on the right side. Move the support to the right.':'The beam tips to the left. Move the support to the left.'}</p><p>The distances below the mean and above the mean cancel: the sum of (x − mean) is always 0. That is why the mean is the balance point.</p></Why>
 </Lab>;
}

/** Toss a coin or roll a die many times. */
export function ChanceLab(){
 const [die,setDie]=useState(0),[counts,setCounts]=useState<number[]>([0,0]);
 const sides=die?6:2,total=counts.reduce((a,b)=>a+b,0);
 const roll=(n:number)=>setCounts(c=>{const next=[...c];for(let i=0;i<n;i++)next[Math.floor(Math.random()*sides)]++;return next;});
 const labels=die?['1','2','3','4','5','6']:['Head','Tail'],bw=die?60:120,gap=(520-bw*sides)/(sides+1),H=180;
 return <Lab title="Toss and roll many times">
  <Choices labels={['Coin','Die']} value={die} onChange={v=>{setDie(v);setCounts(Array(v?6:2).fill(0));}} label="Experiment"/>
  <div className="lesson-controls">{[1,10,100,1000].map(n=><button type="button" key={n} onClick={()=>roll(n)}>{die?'Roll':'Toss'} {n}</button>)}<button type="button" className="lesson-add" onClick={()=>setCounts(Array(sides).fill(0))}>Start again</button></div>
  <Canvas label={`${total} trials: ${labels.map((l,i)=>`${l} ${counts[i]}`).join(', ')}`} height={260}>
   <path d="M40 220H580" stroke={ink} strokeWidth="2"/>
   <path d={`M40 ${220-H/sides*2}H580`} stroke={gold} strokeWidth="2.5" strokeDasharray="8 6"/><text x="44" y="20" textAnchor="start" fontSize="14" fontWeight="700" fill={ink}>dashed line: theory 1/{sides}</text>
   {counts.map((n,i)=>{const p=total?n/total:0,x=40+gap+i*(bw+gap);return <g key={i}><rect x={x} y={220-p*H*2} width={bw} height={p*H*2} fill={blue} stroke={ink}/><text x={x+bw/2} y="242" textAnchor="middle" fontSize="14" fill={ink}>{labels[i]}</text><text x={x+bw/2} y={214-p*H*2} textAnchor="middle" fontSize="13" fill={ink}>{total?fmt(Math.round(p*100)/100):''}</text></g>;})}
  </Canvas>
  <MathLine>{total?`${total} trials: experimental P(${labels[0]}) = ${counts[0]}/${total} ≈ ${fmt(Math.round(counts[0]/total*100)/100)},  theoretical = 1/${sides}`:`Theoretical probability of each outcome = 1/${sides}`}</MathLine>
  <Why><p>{total<50?'Toss a few times: the bars jump around a lot. Small experiments vary.':'With many trials, every bar comes close to the dashed theory line.'}</p><p>{`Each outcome is equally likely, so the theoretical probability is 1/${sides}. The experimental probability gets close to it when the number of trials is large.`}</p></Why>
 </Lab>;
}
