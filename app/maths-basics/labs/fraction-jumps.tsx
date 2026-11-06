'use client';
import {useState} from 'react';
import {Lab,MathLine,Why,Choices,ink,gold,cream,blue,gcd} from './lab-kit';
import {JumpLine,useStepper,Controls,unitJumps,type Action} from './integer-jumps';

const neg='#5b8fc7';
/** Write n/d in lowest terms with a true minus sign. */
const frac=(n:number,d:number)=>{if(n===0)return '0';const g=gcd(Math.abs(n),d),a=Math.abs(n)/g,b=d/g;return `${n<0?'−':''}${b===1?a:`${a}/${b}`}`;};
const br=(n:number,d:number)=>n<0?`(${frac(n,d)})`:frac(n,d);

/** A strip of d equal pieces. |n| pieces are coloured: blue for negative, gold for positive. */
function PieceBar({n,d,y,title}:{n:number;d:number;y:number;title:string}){
 const W=420,x0=150,w=W/d;
 return <g>
  <text x={x0-14} y={y+24} textAnchor="end" fontSize="17" fontWeight="700" fill={ink}>{title}</text>
  {Array.from({length:d},(_,i)=><rect key={i} x={x0+i*w} y={y} width={w} height="36" fill={i<Math.abs(n)?(n<0?neg:gold):'#fff'} stroke={ink} strokeWidth="1.5"/>)}
  {d<=12&&Array.from({length:Math.abs(n)},(_,i)=><text key={i} x={x0+i*w+w/2} y={y+23} textAnchor="middle" fontSize={d>8?11:13} fontWeight="700" fill={n<0?'#fff':ink}>{n<0?'−':'+'}1/{d}</text>)}
 </g>;
}

/** Adding and subtracting: cut into equal pieces, then the man jumps one piece at a time. */
const ADD=[
 {name:'−2/3 + 5/6',a:[-2,3],b:[5,6],op:1,d:6},
 {name:'−1/2 + (−1/4)',a:[-1,2],b:[-1,4],op:1,d:4},
 {name:'−1/3 − 1/2',a:[-1,3],b:[1,2],op:-1,d:6},
 {name:'1/4 − 3/4',a:[1,4],b:[3,4],op:-1,d:4},
];
function AddFractions(){
 const [pick,setPick]=useState(0);const e=ADD[pick],d=e.d;
 const A=e.a[0]*d/e.a[1],B=e.b[0]*d/e.b[1],result=A+e.op*B;
 const actions:Action[]=[...(e.op<0?[{kind:'turn'} as Action]:[]),...unitJumps(A,Math.abs(B),Math.sign(e.op*B),B<0)];
 const stepper=useStepper(actions.length,String(pick)),finished=stepper.step>=actions.length;
 const sym=e.op<0?'−':'+',first=frac(e.a[0],e.a[1]),second=br(e.b[0],e.b[1]);
 let pos=A,turned=false;for(const a of actions.slice(0,stepper.step)){if(a.kind==='turn')turned=true;else pos=a.to;}
 return <>
  <Choices labels={ADD.map(x=>x.name)} value={pick} onChange={setPick} label="Choose a sum"/>
  <svg className="lab-canvas" viewBox="0 0 600 236" role="img" aria-label={`${first} is ${frac(A,d)} and ${frac(e.b[0],e.b[1])} is ${frac(B,d)}; pieces of 1/${d}`}>
   <text x="300" y="20" textAnchor="middle" fontSize="15" fill={ink}>Step 1: cut both fractions into equal pieces of 1/{d}</text>
   <PieceBar n={e.a[0]} d={e.a[1]} y={34} title={first}/>
   <PieceBar n={A} d={d} y={76} title={`= ${A<0?'−':''}${Math.abs(A)}/${d}`}/>
   <PieceBar n={e.b[0]} d={e.b[1]} y={136} title={frac(e.b[0],e.b[1])}/>
   <PieceBar n={B} d={d} y={178} title={`= ${B<0?'−':''}${Math.abs(B)}/${d}`}/>
  </svg>
  <MathLine>{`${first} ${sym} ${second} = ${A<0?'−':''}${Math.abs(A)}/${d} ${sym} ${B<0?`(−${Math.abs(B)}/${d})`:`${B}/${d}`} = ${finished?frac(result,d):'?'}`}</MathLine>
  <p className="int-status">Step 2: each jump is one piece of 1/{d}.</p>
  <JumpLine min={-d} max={d} start={A} actions={actions} step={stepper.step} format={v=>frac(v,d)} label={`Man starts at ${frac(A,d)}${e.op<0?', turns around,':''} and ${B<0?'walks backward':'walks forward'} ${Math.abs(B)} pieces of 1/${d} to ${frac(result,d)}`}/>
  <p className="int-status" aria-live="polite">{stepper.step===0?`He stands on ${frac(A,d)} and faces the positive side.`:finished?`He lands on ${frac(result,d)}.`:turned&&pos===A?'Minus: he turns around.':`He is on ${frac(pos,d)}.`}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <Why>
   <p>{e.a[1]===e.b[1]?`Both fractions already use pieces of 1/${d}, so we can count them straight away.`:`Pieces of 1/${e.a[1]} and 1/${e.b[1]} are different sizes, so we cannot count them together. First cut every piece into pieces of 1/${d}: now all the pieces are the same size.`}</p>
   <p>{`${e.op<0?'Minus means turn around first. ':''}${B<0?`${frac(e.b[0],e.b[1])} is negative, so he walks backward`:`${frac(e.b[0],e.b[1])} is positive, so he walks forward`} ${Math.abs(B)} piece${Math.abs(B)===1?'':'s'}. ${finished?`He lands on ${frac(result,d)}.`:''}`} This is the same rule as for integers: only the piece size is smaller.</p>
  </Why>
 </>;
}

/** Multiplying: the area gives the size, the sign rule gives the sign. */
const MUL=[{name:'(−2/3) × (3/4)',s:[-1,1]},{name:'(−2/3) × (−3/4)',s:[-1,-1]},{name:'(2/3) × (−3/4)',s:[1,-1]},{name:'(2/3) × (3/4)',s:[1,1]}];
function MultiplyFractions(){
 const [pick,setPick]=useState(0);const [s1,s2]=MUL[pick].s,positive=s1*s2>0,W=240,H=240,x0=70,y0=20;
 return <>
  <Choices labels={MUL.map(m=>m.name)} value={pick} onChange={setPick} label="Choose a product"/>
  <div className="frac-mul">
   <svg className="lab-canvas" viewBox="0 0 380 300" role="img" aria-label="A unit square cut into 3 columns and 4 rows; 2 columns times 3 rows overlap in 6 of 12 small rectangles">
    {Array.from({length:12},(_,i)=>{const c=i%3,r=Math.floor(i/3),inC=c<2,inR=r<3;return <rect key={i} x={x0+c*W/3} y={y0+r*H/4} width={W/3} height={H/4} fill={inC&&inR?(positive?gold:neg):inC?blue:inR?cream:'#fff'} stroke={ink} strokeWidth="1.5"/>;})}
    <rect x={x0} y={y0} width={W} height={H} fill="none" stroke={ink} strokeWidth="3"/>
    <text x={x0+W/3} y={y0+H+24} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>2/3 of the width</text>
    <text x={x0-10} y={y0+H*3/8} textAnchor="end" fontSize="15" fontWeight="700" fill={ink} transform={`rotate(-90 ${x0-10} ${y0+H*3/8})`}>3/4 of the height</text>
    <text x={x0+W/3} y={y0+H*3/8+6} textAnchor="middle" fontSize="18" fontWeight="700" fill={positive?ink:'#fff'}>6 of 12</text>
   </svg>
   <table className="int-sign-table"><thead><tr><th>Signs</th><th>Answer</th></tr></thead><tbody>
    {[[1,1],[-1,-1],[1,-1],[-1,1]].map(([a,b])=><tr key={`${a}${b}`} className={a===s1&&b===s2?'is-current':''}><td>{a<0?'−':'+'} × {b<0?'−':'+'}</td><td>{a*b>0?'+':'−'}</td></tr>)}
   </tbody></table>
  </div>
  <MathLine>{`${MUL[pick].name} = ${positive?'':'−'}6/12 = ${positive?'':'−'}1/2`}</MathLine>
  <Why>
   <p>Step 1, the size: take 2/3 of the width and 3/4 of the height. The overlap is 6 of the 12 small pieces, so 2/3 × 3/4 = 6/12 = 1/2.</p>
   <p>{`Step 2, the sign: ${positive?'the signs are the same, so the answer is positive':'the signs are different, so the answer is negative'}. Fractions follow the same sign rules as integers.`}</p>
  </Why>
 </>;
}

/** Dividing: how many jumps of the divisor reach the dividend? */
const DIV=[{name:'(−2/3) ÷ (1/6)',a:-4,b:1,d:6},{name:'(−3/4) ÷ (−1/4)',a:-3,b:-1,d:4},{name:'(1/2) ÷ (−1/6)',a:3,b:-1,d:6}];
function DivideFractions(){
 const [pick,setPick]=useState(0);const e=DIV[pick],d=e.d,count=e.a/e.b,n=Math.abs(count);
 const actions:Action[]=[...(e.b<0?[{kind:'turn'} as Action]:[]),...unitJumps(0,n,Math.sign(e.a),count<0)];
 const stepper=useStepper(actions.length,String(pick)),finished=stepper.step>=actions.length;
 const jumpsDone=Math.max(0,stepper.step-(e.b<0?1:0));
 return <>
  <Choices labels={DIV.map(x=>x.name)} value={pick} onChange={setPick} label="Choose a division"/>
  <MathLine>{`${e.name} = ${finished?String(count).replace('-','−'):'?'}`}</MathLine>
  <JumpLine min={-d} max={d} start={0} marks={[e.a]} actions={actions} step={stepper.step} format={v=>frac(v,d)} label={`Man starts at 0 and takes ${n} jumps of ${frac(e.b,d)} to reach ${frac(e.a,d)}`}/>
  <p className="int-status" aria-live="polite">{stepper.step===0?`Question: how many jumps of ${frac(e.b,d)} take him from 0 to the gold dot ${frac(e.a,d)}?`:finished?`${n} jumps, ${count<0?'walking backward':'walking forward'}: the answer is ${String(count).replace('-','−')}.`:jumpsDone===0?'The divisor is negative, so he turns around.':`${jumpsDone} jump${jumpsDone===1?'':'s'} so far.`}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <Why>
   <p>{`He faces the way the divisor ${frac(e.b,d)} points${e.b<0?' (he turns, because it is negative)':''}. To reach ${frac(e.a,d)} he walks ${count<0?'backward':'forward'} ${n} jumps, so the answer is ${String(count).replace('-','−')}.`}</p>
   <p>{`Dividing by 1/${d} is the same as multiplying by ${d}: ${e.name} = ${frac(e.a,d)} × ${e.b<0?`(−${d})`:d} = ${String(count).replace('-','−')}. For any fraction, multiply by its reciprocal: (−2/3) ÷ (5/6) = (−2/3) × (6/5) = −4/5.`}</p>
  </Why>
 </>;
}

export function SignedFractionLab(){
 const [mode,setMode]=useState(0);
 return <Lab title="Calculate with signed fractions">
  <Choices labels={['Add and subtract','Multiply','Divide']} value={mode} onChange={setMode} label="Choose an operation"/>
  {mode===0?<AddFractions/>:mode===1?<MultiplyFractions/>:<DivideFractions/>}
 </Lab>;
}
