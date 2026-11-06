'use client';
import {useState,type ReactNode} from 'react';
import {Lab,MathLine,Why,Choices,Slider,ink,gold,cream,blue} from './lab-kit';

const CX=300,CY=175,R=125;
const pt=(deg:number,r=R):[number,number]=>[CX+r*Math.cos(deg*Math.PI/180),CY-r*Math.sin(deg*Math.PI/180)];
const angleAt=(v:[number,number],a:[number,number],b:[number,number])=>{const ux=a[0]-v[0],uy=a[1]-v[1],wx=b[0]-v[0],wy=b[1]-v[1];return Math.acos((ux*wx+uy*wy)/Math.hypot(ux,uy)/Math.hypot(wx,wy))*180/Math.PI;};
const r1=(n:number)=>Math.round(n*10)/10;
function Dot({p,label,dx=10,dy=-10,color=ink}:{p:[number,number];label?:string;dx?:number;dy?:number;color?:string}){return <g><circle cx={p[0]} cy={p[1]} r="5" fill={color}/>{label&&<text x={p[0]+dx} y={p[1]+dy} fontSize="17" fontWeight="700" fill={ink}>{label}</text>}</g>;}
const Base=({children,label}:{children:ReactNode;label:string})=><svg className="lab-canvas" viewBox="0 0 600 350" role="img" aria-label={label}><circle cx={CX} cy={CY} r={R} fill="#fff" stroke={ink} strokeWidth="2.5"/>{children}</svg>;

/** Parts of a circle: choose a part and see it highlighted. The chord slider shows that the diameter is the longest chord. */
function PartsLab(){
 const parts=['Centre','Radius','Diameter','Chord','Arcs','Segments','Sector','Secant','Tangent'];
 const [pick,setPick]=useState(3),[d,setD]=useState(60);
 const w=Math.sqrt(R*R-d*d),A:[number,number]=[CX-w,CY-d],B:[number,number]=[CX+w,CY-d],O:[number,number]=[CX,CY];
 const part=parts[pick];
 const minor=`M${A[0]} ${A[1]}L${B[0]} ${B[1]}A${R} ${R} 0 0 0 ${A[0]} ${A[1]}Z`,major=`M${A[0]} ${A[1]}L${B[0]} ${B[1]}A${R} ${R} 0 1 1 ${A[0]} ${A[1]}Z`;
 const usesChord=['Chord','Arcs','Segments','Secant'].includes(part);
 const text:Record<string,string>={
  Centre:'The centre O is the fixed point in the middle. Every point on the circle is the same distance from O.',
  Radius:'A radius joins the centre to a point on the circle. All radii of a circle are equal: here each is 5 units.',
  Diameter:'A diameter is a chord through the centre. It is made of two radii, so diameter = 2 × radius. It is the longest chord.',
  Chord:`A chord joins two points on the circle. Move it: the nearer it is to the centre, the longer it is. ${d===0?'Now it passes through the centre, so it is a diameter: the longest chord.':''}`,
  Arcs:'A chord cuts the circle into two arcs. The smaller one is the minor arc (gold). The bigger one is the major arc (blue).',
  Segments:'A chord cuts the circular region into two segments. The part with the minor arc is the minor segment (gold). The other part is the major segment (blue).',
  Sector:'A sector is the region between two radii and an arc, like a slice of pizza. Here the gold slice is a minor sector.',
  Secant:'A secant is a line that cuts the circle at two points. The part of it inside the circle is a chord.',
  Tangent:'A tangent touches the circle at exactly one point, called the point of contact. It is perpendicular to the radius at that point.',
 };
 return <Lab title="Explore the parts of a circle">
  <Choices labels={parts} value={pick} onChange={setPick} label="Choose a part"/>
  {usesChord&&<Slider label="Distance of the chord from the centre" value={Math.round(d/25)} min={0} max={4} onChange={v=>setD(v*25)}/>}
  <Base label={`${part} of a circle with centre O`}>
   {part==='Segments'&&<><path d={major} fill={blue}/><path d={minor} fill={cream}/><text x={CX} y={A[1]-(R-d)/2+6} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>minor segment</text><text x={CX} y={CY+60} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>major segment</text></>}
   {part==='Sector'&&<><path d={`M${CX} ${CY}L${pt(120)[0]} ${pt(120)[1]}A${R} ${R} 0 0 1 ${pt(50)[0]} ${pt(50)[1]}Z`} fill={cream} stroke={gold} strokeWidth="3"/><text x={CX+2} y={CY-70} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>sector</text></>}
   {part==='Arcs'&&<><path d={`M${B[0]} ${B[1]}A${R} ${R} 0 0 0 ${A[0]} ${A[1]}`} fill="none" stroke={gold} strokeWidth="7"/><path d={`M${B[0]} ${B[1]}A${R} ${R} 0 1 1 ${A[0]} ${A[1]}`} fill="none" stroke="#5b8fc7" strokeWidth="7"/><text x={CX} y={CY-R-12} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>minor arc</text><text x={CX} y={CY+R+24} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>major arc</text></>}
   {(part==='Chord'||part==='Segments'||part==='Arcs')&&<><path d={`M${A[0]} ${A[1]}L${B[0]} ${B[1]}`} stroke={part==='Chord'?gold:ink} strokeWidth={part==='Chord'?5:2.5}/><Dot p={A} label="A" dx={-22}/><Dot p={B} label="B"/></>}
   {part==='Secant'&&<><path d={`M${A[0]-90} ${A[1]}L${B[0]+90} ${B[1]}`} stroke={gold} strokeWidth="4"/><Dot p={A} label="A" dx={-6} dy={-12}/><Dot p={B} label="B" dx={-6} dy={-12}/><text x={B[0]+60} y={B[1]-12} fontSize="15" fontWeight="700" fill={ink}>secant</text></>}
   {part==='Radius'&&[30,150,260].map(a=><path key={a} d={`M${CX} ${CY}L${pt(a)[0]} ${pt(a)[1]}`} stroke={gold} strokeWidth="4"/>)}
   {part==='Radius'&&<text x={pt(30,R/2)[0]} y={pt(30,R/2)[1]-10} fontSize="15" fontWeight="700" fill={ink}>r</text>}
   {part==='Diameter'&&<><path d={`M${CX-R} ${CY}L${CX+R} ${CY}`} stroke={gold} strokeWidth="5"/><Dot p={[CX-R,CY]} label="P" dx={-24} dy={6}/><Dot p={[CX+R,CY]} label="Q" dx={10} dy={6}/><text x={CX-R/2} y={CY-10} textAnchor="middle" fontSize="15" fill={ink}>r</text><text x={CX+R/2} y={CY-10} textAnchor="middle" fontSize="15" fill={ink}>r</text></>}
   {part==='Tangent'&&<><path d={`M${CX-200} ${CY-R}L${CX+200} ${CY-R}`} stroke={gold} strokeWidth="4"/><path d={`M${CX} ${CY}L${CX} ${CY-R}`} stroke={ink} strokeWidth="2.5" strokeDasharray="6 4"/><path d={`M${CX} ${CY-R+14}h14v-14`} fill="none" stroke={ink} strokeWidth="2"/><Dot p={[CX,CY-R]} label="T" dx={8} dy={-10}/><text x={CX+150} y={CY-R-12} fontSize="15" fontWeight="700" fill={ink}>tangent</text></>}
   {part==='Sector'&&<><path d={`M${CX} ${CY}L${pt(120)[0]} ${pt(120)[1]}M${CX} ${CY}L${pt(50)[0]} ${pt(50)[1]}`} stroke={ink} strokeWidth="2.5"/></>}
   <Dot p={O} label="O" dx={-20} dy={20} color={part==='Centre'?gold:ink}/>
   {part==='Centre'&&<circle cx={CX} cy={CY} r="14" fill="none" stroke={gold} strokeWidth="4"/>}
  </Base>
  {usesChord&&<MathLine>{`AB = ${r1(2*Math.sqrt(25-(d/25)**2))} units (radius 5, diameter 10)`}</MathLine>}
  <Why><p>{text[part]}</p><p>Radius r, diameter d = 2r. A circle has infinitely many radii, diameters and chords.</p></Why>
 </Lab>;
}

/** The perpendicular from the centre bisects a chord. Equal chords are equally far from the centre. */
function ChordLab(){
 const [d,setD]=useState(3),[twin,setTwin]=useState(0);
 const s=R/5,half=Math.sqrt(25-d*d),w=half*s,yA=CY-d*s,A:[number,number]=[CX-w,yA],B:[number,number]=[CX+w,yA],M:[number,number]=[CX,yA];
 const rot=(p:[number,number],deg:number):[number,number]=>{const t=deg*Math.PI/180,x=p[0]-CX,y=p[1]-CY;return [CX+x*Math.cos(t)-y*Math.sin(t),CY+x*Math.sin(t)+y*Math.cos(t)];};
 const C=rot(A,130),D=rot(B,130),N=rot(M,130);
 return <Lab title="Drop a perpendicular from the centre to a chord">
  <Slider label="Distance OM from the centre (units)" value={d} min={0} max={4} onChange={setD}/>
  <Choices labels={['One chord','Add an equal chord']} value={twin} onChange={setTwin} label="Chords"/>
  <Base label={`Circle of radius 5 units; chord AB at distance ${d} from O; AM = MB = ${r1(half)}`}>
   <path d={`M${A[0]} ${A[1]}L${B[0]} ${B[1]}`} stroke={gold} strokeWidth="4"/>
   {d>0&&<><path d={`M${CX} ${CY}L${M[0]} ${M[1]}`} stroke={ink} strokeWidth="2.5" strokeDasharray="6 4"/><path d={`M${CX} ${yA+14}h14v-14`} fill="none" stroke={ink} strokeWidth="2"/></>}
   <path d={`M${CX} ${CY}L${A[0]} ${A[1]}`} stroke="#5b8fc7" strokeWidth="2.5"/>
   <text x={(CX+A[0])/2-18} y={(CY+A[1])/2+6} fontSize="15" fill={ink}>5</text>
   {d>0&&<text x={CX+8} y={(CY+yA)/2+5} fontSize="15" fill={ink}>{d}</text>}
   <text x={(A[0]+M[0])/2} y={yA-10} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>{r1(half)}</text>
   <text x={(B[0]+M[0])/2} y={yA-10} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>{r1(half)}</text>
   <Dot p={A} label="A" dx={-22}/><Dot p={B} label="B"/><Dot p={M} label="M" dx={4} dy={-14}/>
   {twin===1&&<><path d={`M${C[0]} ${C[1]}L${D[0]} ${D[1]}`} stroke={gold} strokeWidth="4"/><path d={`M${CX} ${CY}L${N[0]} ${N[1]}`} stroke={ink} strokeWidth="2.5" strokeDasharray="6 4"/><Dot p={C} label="C" dx={-22}/><Dot p={D} label="D"/><Dot p={N} label="N" dx={8} dy={14}/></>}
   <Dot p={[CX,CY]} label="O" dx={-22} dy={18}/>
  </Base>
  <MathLine>{`AM = √(25 − ${d*d}) = ${r1(half)}, so AB = ${r1(2*half)}`}</MathLine>
  <Why>
   <p>{d===0?'The chord passes through the centre: it is a diameter, AB = 10, the longest chord.':`OM is perpendicular to AB, and it cuts AB into two equal halves: AM = MB = ${r1(half)}. Triangle OMA has a right angle at M, so AM² = OA² − OM² = 25 − ${d*d}.`}</p>
   <p>{twin===1?'Chord CD is at the same distance from O as AB, and it has the same length. Equal chords are equidistant from the centre, and chords equidistant from the centre are equal.':'Move the chord away from the centre: it gets shorter. Chords nearer the centre are longer.'}</p>
  </Why>
 </Lab>;
}

/** Angles in a circle: angle at the centre is double; angles in the same segment are equal; semicircle gives 90°; cyclic quadrilateral. */
function AnglesLab(){
 const modes=['Centre is double','Same segment','Semicircle','Cyclic quadrilateral'];
 const [mode,setMode]=useState(0),[p,setP]=useState(90);
 const A=mode===2?pt(180):pt(215),B=mode===2?pt(0):pt(325),O:[number,number]=[CX,CY];
 const P=pt(mode===3?Math.min(80,Math.max(10,p/2)):Math.min(200,Math.max(mode===2?10:-15,p))),Q=pt(130);
 const D=pt(140);
 const aP=angleAt(P,A,B),aO=angleAt(O,A,B),aQ=angleAt(Q,A,B);
 const quad=mode===3?{A:angleAt(A,D,B),B:angleAt(B,A,P),C:angleAt(P,B,D),D:angleAt(D,P,A)}:null;
 return <Lab title="Angles made by an arc">
  <Choices labels={modes} value={mode} onChange={v=>{setMode(v);setP(90);}} label="Choose a theorem"/>
  <Slider label={mode===3?'Move vertex C':'Move point P on the circle'} value={p} min={mode===3?20:-10} max={mode===3?160:190} onChange={setP}/>
  <Base label={`${modes[mode]}: angle at P is ${Math.round(aP)} degrees`}>
   {mode!==3&&<><path d={`M${A[0]} ${A[1]}L${P[0]} ${P[1]}L${B[0]} ${B[1]}`} fill="none" stroke={gold} strokeWidth="3.5"/>
    {mode===0&&<path d={`M${A[0]} ${A[1]}L${CX} ${CY}L${B[0]} ${B[1]}`} fill="none" stroke="#5b8fc7" strokeWidth="3.5"/>}
    {mode===1&&<path d={`M${A[0]} ${A[1]}L${Q[0]} ${Q[1]}L${B[0]} ${B[1]}`} fill="none" stroke="#5b8fc7" strokeWidth="3.5"/>}
    {mode===2&&<path d={`M${A[0]} ${A[1]}L${B[0]} ${B[1]}`} stroke={ink} strokeWidth="2.5"/>}
    <Dot p={A} label="A" dx={-24} dy={14}/><Dot p={B} label="B" dx={10} dy={14}/><Dot p={P} label={`P ${Math.round(aP)}°`} dx={P[0]<CX?-70:10} dy={-12} color={gold}/>
    {mode===1&&<Dot p={Q} label={`Q ${Math.round(aQ)}°`} dx={-74} dy={-8} color="#5b8fc7"/>}
    {mode===0&&<text x={CX+10} y={CY+28} fontSize="16" fontWeight="700" fill={ink}>{Math.round(aO)}°</text>}</>}
   {mode===3&&quad&&<><path d={`M${A[0]} ${A[1]}L${B[0]} ${B[1]}L${P[0]} ${P[1]}L${D[0]} ${D[1]}Z`} fill={cream} fillOpacity=".6" stroke={gold} strokeWidth="3.5"/>
    <Dot p={A} label={`A ${Math.round(quad.A)}°`} dx={-80} dy={16}/><Dot p={B} label={`B ${Math.round(quad.B)}°`} dx={10} dy={16}/><Dot p={P} label={`C ${Math.round(quad.C)}°`} dx={10} dy={-8} color={gold}/><Dot p={D} label={`D ${Math.round(quad.D)}°`} dx={-82} dy={-8}/></>}
   <Dot p={O} label="O" dx={-20} dy={-8}/>
  </Base>
  <MathLine>{mode===0?`∠AOB = ${Math.round(aO)}° = 2 × ${Math.round(aP)}°`:mode===1?`∠APB = ∠AQB = ${Math.round(aP)}°`:mode===2?`∠APB = ${Math.round(aP)}°`:`∠A + ∠C = ${Math.round(quad!.A+quad!.C)}°, ∠B + ∠D = ${Math.round(quad!.B+quad!.D)}°`}</MathLine>
  <Why>
   <p>{mode===0?'Move P anywhere on the major arc. The angle at P stays the same, and the angle at the centre O is always twice as big.':mode===1?'P and Q are in the same segment (both on the major arc). The angles they make with chord AB are equal, wherever P goes.':mode===2?'AB is a diameter. The angle at the centre is 180°, so the angle at P is half of it: 90°. The angle in a semicircle is a right angle.':'All four vertices lie on the circle, so ABCD is a cyclic quadrilateral. Move C: the opposite angles always add up to 180°.'}</p>
   <p>{mode===3?'Reason: ∠A and ∠C stand on arcs that together make the whole circle. Their angles at the centre add to 360°, so the angles themselves add to 180°.':'Reason: the angle at the centre is double the angle at the circle. Equal arcs give equal angles.'}</p>
  </Why>
 </Lab>;
}

/** Tangents from a point: none from inside, one from a point on the circle, two equal tangents from outside. */
function TangentLab(){
 const [d,setD]=useState(6.5);
 const s=R/5,P:[number,number]=[CX+d*s,CY];
 const inside=d<5,on=d===5,len=d>5?Math.sqrt(d*d-25):0;
 const t=d>5?Math.acos(5/d)*180/Math.PI:0,T1=pt(t),T2=pt(-t);
 return <Lab title="How many tangents from a point?">
  <Slider label="Distance OP (radius 5)" value={d} min={2} max={11} step={0.5} onChange={setD}/>
  <svg className="lab-canvas" viewBox="0 0 600 350" role="img" aria-label={`Point P at distance ${d} from O; ${inside?'no tangent':on?'one tangent':`two tangents, each ${r1(len)} units`}`}>
   <circle cx={CX} cy={CY} r={R} fill="#fff" stroke={ink} strokeWidth="2.5"/>
   {!inside&&!on&&<><path d={`M${P[0]} ${P[1]}L${T1[0]} ${T1[1]}M${P[0]} ${P[1]}L${T2[0]} ${T2[1]}`} stroke={gold} strokeWidth="4"/><path d={`M${CX} ${CY}L${T1[0]} ${T1[1]}M${CX} ${CY}L${T2[0]} ${T2[1]}M${CX} ${CY}L${P[0]} ${P[1]}`} stroke={ink} strokeWidth="2" strokeDasharray="6 4"/><Dot p={T1} label="A" dx={-6} dy={-14}/><Dot p={T2} label="B" dx={-6} dy={26}/><text x={(P[0]+T1[0])/2+6} y={(P[1]+T1[1])/2-8} fontSize="15" fontWeight="700" fill={ink}>{r1(len)}</text><text x={(P[0]+T2[0])/2+6} y={(P[1]+T2[1])/2+20} fontSize="15" fontWeight="700" fill={ink}>{r1(len)}</text></>}
   {on&&<><path d={`M${P[0]} ${CY-150}L${P[0]} ${CY+150}`} stroke={gold} strokeWidth="4"/><path d={`M${CX} ${CY}L${P[0]} ${P[1]}`} stroke={ink} strokeWidth="2" strokeDasharray="6 4"/></>}
   <Dot p={[CX,CY]} label="O" dx={-20} dy={-8}/><Dot p={P} label="P" dx={10} dy={-10} color={gold}/>
  </svg>
  <MathLine>{inside?`OP = ${d}, less than r = 5: no tangent`:on?'OP = r = 5: one tangent':`PA = PB = √(${d*d} − 25) = ${r1(len)}`}</MathLine>
  <Why>
   <p>{inside?'P is inside the circle. Every line through P cuts the circle twice, so no tangent is possible.':on?'P is on the circle. Exactly one tangent passes through P, and it is perpendicular to the radius OP.':`P is outside the circle. Two tangents PA and PB touch the circle at A and B. Each makes a right angle with the radius (OA ⟂ PA), so Pythagoras gives PA = PB = ${r1(len)}.`}</p>
   <p>The two tangents from an outside point are always equal. Triangles OAP and OBP are congruent (RHS), and OP bisects the angle between the tangents.</p>
  </Why>
 </Lab>;
}

export function CirclesLab({index}:{index:number}){return index===0?<PartsLab/>:index===1?<ChordLab/>:index===2?<AnglesLab/>:<TangentLab/>;}
