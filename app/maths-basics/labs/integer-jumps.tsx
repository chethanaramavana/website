'use client';
import {useEffect,useState} from 'react';
import {Lab,MathLine,Why,Choices,Slider,ink,gold,cream,blue,fmt} from './lab-kit';
import './integer-jumps.css';

/** One move of the man: he turns around, or he jumps from one number to another. */
type Action={kind:'turn'}|{kind:'jump';from:number;to:number;back:boolean};
const signed=(n:number)=>n<0?`(${fmt(n)})`:fmt(n);
const sign=(n:number)=>n<0?-1:1;

/** Steps through the actions one at a time, or plays them all with a pause between moves. */
function useStepper(total:number,resetKey:string){
 const [step,setStep]=useState(0),[playing,setPlaying]=useState(false);
 useEffect(()=>{setStep(0);setPlaying(false);},[resetKey]);
 useEffect(()=>{if(!playing)return;if(step>=total){setPlaying(false);return;}const t=setTimeout(()=>setStep(s=>s+1),step===0?250:700);return()=>clearTimeout(t);},[playing,step,total]);
 return {step,play:()=>{if(step>=total)setStep(0);setPlaying(true);},next:()=>{setPlaying(false);setStep(s=>Math.min(total,s+1));},reset:()=>{setPlaying(false);setStep(0);}};
}

function Controls({stepper,total,nextLabel='Next jump'}:{stepper:ReturnType<typeof useStepper>;total:number;nextLabel?:string}){
 return <div className="lesson-controls"><button type="button" onClick={stepper.play}>▶ Play</button><button type="button" className="lesson-add" disabled={stepper.step>=total} onClick={stepper.next}>{nextLabel}</button><button type="button" className="lesson-add" onClick={stepper.reset}>Start again</button></div>;
}

/** A number line with a man who stands on a number, faces left or right, turns around and jumps. */
export function JumpLine({min,max,start,actions,step,label,labelEvery=1,tickEvery=1,marks=[],showMan=true,sizeLabels=false}:{min:number;max:number;start:number;actions:Action[];step:number;label:string;labelEvery?:number;tickEvery?:number;marks?:number[];showMan?:boolean;sizeLabels?:boolean}){
 const X=(v:number)=>40+(v-min)*520/(max-min),axis=176;
 let pos=start,right=true;
 const done=actions.slice(0,step);
 for(const a of done){if(a.kind==='turn')right=!right;else pos=a.to;}
 const last=done[done.length-1];
 const jumps=done.filter((a):a is Extract<Action,{kind:'jump'}>=>a.kind==='jump');
 const ticks:number[]=[];for(let v=Math.ceil(min/tickEvery)*tickEvery;v<=max;v+=tickEvery)ticks.push(v);
 return <svg className="lab-canvas int-jump" viewBox="0 70 600 166" role="img" aria-label={label}>
  {min<0&&<rect x={40} y={axis-5} width={X(0)-40} height={10} fill={blue}/>}
  {max>0&&<rect x={X(Math.max(0,min))} y={axis-5} width={560-X(Math.max(0,min))} height={10} fill={cream}/>}
  <line x1="34" y1={axis} x2="566" y2={axis} stroke={ink} strokeWidth="2"/>
  {ticks.map(v=><g key={v}><path d={`M${X(v)} ${axis-7}v14`} stroke={ink} strokeWidth={v===0?3:1.5}/>{v%labelEvery===0&&<text x={X(v)} y={axis+26} textAnchor="middle" fontSize={max-min>20?12:14} fontWeight={v===0?700:400} fill={ink}>{fmt(v)}</text>}</g>)}
  {marks.map(v=><circle key={v} cx={X(v)} cy={axis} r="6" fill={gold} stroke={ink}/>)}
  {min<0&&<text x="40" y="230" fontSize="13" fill={ink}>← negative side</text>}
  {max>0&&min<0&&<text x="560" y="230" textAnchor="end" fontSize="13" fill={ink}>positive side →</text>}
  {jumps.map((j,i)=>{const a=X(j.from),b=X(j.to),h=Math.min(70,16+Math.abs(b-a)*0.45),mid=(a+b)/2,d=b>a?1:-1;
   return <g key={i}><path d={`M${a} ${axis-3}Q${mid} ${axis-3-2*h} ${b} ${axis-3}`} fill="none" stroke={j.back?'#2f6f9f':gold} strokeWidth="3" strokeDasharray={j.back?'7 5':undefined}/><path d={`M${b} ${axis-3}l${-7*d} -9l${3*d} 0z`} fill={j.back?'#2f6f9f':gold}/>{jumps.length<=12&&<text x={mid} y={axis-h-10} textAnchor="middle" fontSize="12" fontWeight={sizeLabels&&Math.abs(j.to-j.from)>1?700:400} fill={ink}>{sizeLabels?(Math.abs(j.to-j.from)>1?`+${Math.abs(j.to-j.from)}`:`+1`):i+1}</text>}</g>;})}
  <path d={`M${X(start)} ${axis+36}l-6 -8h12z`} fill={ink}/>
  {showMan&&<g className="int-man" style={{transform:`translate(${X(pos)}px,0px)`}}>
   <g key={step} className={last?.kind==='jump'?'int-hop':last?.kind==='turn'?'int-turn':''}>
    <g transform={`scale(${right?1:-1},1)`}>
     <circle cx="0" cy={axis-60} r="10" fill={cream} stroke={ink} strokeWidth="2"/>
     <circle cx="4" cy={axis-62} r="1.8" fill={ink}/>
     <path d={`M0 ${axis-50}V${axis-26}M0 ${axis-44}l-10 10M0 ${axis-44}l11 8M0 ${axis-26}l-8 22M0 ${axis-26}l8 22`} stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none"/>
     <path d={`M-12 ${axis-82}h22l-7 -6M10 ${axis-82}l-7 6`} stroke={gold} strokeWidth="3" strokeLinecap="round" fill="none"/>
    </g>
   </g>
  </g>}
 </svg>;
}

const unitJumps=(from:number,count:number,dir:number,back:boolean):Action[]=>Array.from({length:count},(_,i)=>({kind:'jump',from:from+dir*i,to:from+dir*(i+1),back}));

function RuleCards({current}:{current:'same'|'different'}){
 return <div className="int-rules"><div className={current==='same'?'is-current':''}><h4>Same signs</h4><p>Add the sizes. Keep the sign. 3 + 4 = 7 and (−3) + (−4) = −7.</p></div><div className={current==='different'?'is-current':''}><h4>Different signs</h4><p>Subtract the smaller size from the bigger size. Use the sign of the bigger size. 6 + (−2) = 4 and 2 + (−6) = −4.</p></div></div>;
}

/** Addition: he faces the positive side. A positive number: walk forward. A negative number: walk backward. */
export function AddJumpLab(){
 const cases=[{name:'Both positive',a:3,b:4},{name:'Positive is bigger',a:6,b:-2},{name:'Negative is bigger',a:2,b:-6},{name:'Both negative',a:-3,b:-4},{name:'Make your own',a:0,b:0}];
 const [pick,setPick]=useState(0),[ca,setA]=useState(-5),[cb,setB]=useState(7);
 const own=pick===4,a=own?ca:cases[pick].a,b=own?cb:cases[pick].b,result=a+b;
 const actions=unitJumps(a,Math.abs(b),sign(b),b<0);
 const stepper=useStepper(actions.length,`${a},${b}`);
 const finished=stepper.step>=actions.length;
 const same=a===0||b===0||sign(a)===sign(b);
 return <Lab title="Watch the man jump: adding integers">
  <Choices labels={cases.map(c=>c.name)} value={pick} onChange={setPick} label="Choose a case"/>
  {own&&<><Slider label="First number" value={ca} min={-6} max={6} onChange={setA}/><Slider label="Number to add" value={cb} min={-6} max={6} onChange={setB}/></>}
  <MathLine>{`${signed(a)} + ${signed(b)} = ${finished?fmt(result):'?'}`}</MathLine>
  <JumpLine min={-12} max={12} start={a} actions={actions} step={stepper.step} label={`Man starts at ${fmt(a)}, faces the positive side and ${b<0?'walks backward':'walks forward'} ${Math.abs(b)} steps to ${fmt(result)}`}/>
  <p className="int-status" aria-live="polite">{stepper.step===0?`He stands on ${fmt(a)} and faces the positive side.`:finished?`He lands on ${fmt(result)}.`:`Jump ${stepper.step} of ${actions.length}: he is on ${fmt(a+sign(b)*stepper.step)}.`}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <Why>
   <p>{b===0?'Adding 0 does not move him.':b>0?`${fmt(b)} is positive, so he walks forward ${b} steps (gold jumps, to the right).`:`${fmt(b)} is negative, so he walks backward ${-b} steps (blue dashed jumps, to the left).`} {finished&&`He lands on ${fmt(result)}, so ${signed(a)} + ${signed(b)} = ${fmt(result)}.`}</p>
   <p>{a===0||b===0?'Adding 0 changes nothing.':same?`Both numbers have the same sign. Add the sizes: ${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(result)}. Keep the sign: the answer is ${fmt(result)}.`:`The signs are different. Subtract the sizes: ${Math.max(Math.abs(a),Math.abs(b))} − ${Math.min(Math.abs(a),Math.abs(b))} = ${Math.abs(result)}. ${Math.abs(a)===Math.abs(b)?'The sizes are equal, so the answer is 0.':`The bigger size belongs to ${Math.abs(a)>Math.abs(b)?fmt(a):fmt(b)}, so the answer is ${fmt(result)}.`}`}</p>
  </Why>
  <RuleCards current={same?'same':'different'}/>
 </Lab>;
}

/** Subtraction: minus means turn around first. Then a positive number: walk forward. A negative number: walk backward. */
export function SubtractJumpLab(){
 const cases=[{name:'7 − 3',a:7,b:3},{name:'3 − 7',a:3,b:7},{name:'(−2) − 4',a:-2,b:4},{name:'4 − (−3)',a:4,b:-3},{name:'(−5) − (−2)',a:-5,b:-2},{name:'Make your own',a:0,b:0}];
 const [pick,setPick]=useState(0),[ca,setA]=useState(-1),[cb,setB]=useState(-5);
 const own=pick===5,a=own?ca:cases[pick].a,b=own?cb:cases[pick].b,result=a-b;
 const actions:Action[]=[{kind:'turn'},...unitJumps(a,Math.abs(b),-sign(b),b<0)];
 const stepper=useStepper(actions.length,`${a},${b}`);
 const finished=stepper.step>=actions.length,turned=stepper.step>=1;
 const at=actions.slice(0,stepper.step).reduce((p,x)=>x.kind==='jump'?x.to:p,a);
 return <Lab title="Minus means turn around: subtracting integers">
  <Choices labels={cases.map(c=>c.name)} value={pick} onChange={setPick} label="Choose a subtraction"/>
  {own&&<><Slider label="First number" value={ca} min={-6} max={6} onChange={setA}/><Slider label="Number to subtract" value={cb} min={-6} max={6} onChange={setB}/></>}
  <MathLine>{`${signed(a)} − ${signed(b)} = ${finished?fmt(result):'?'}`}</MathLine>
  <JumpLine min={-12} max={12} start={a} actions={actions} step={stepper.step} label={`Man starts at ${fmt(a)}, turns around to face the negative side, then ${b<0?'walks backward':'walks forward'} ${Math.abs(b)} steps to ${fmt(result)}`}/>
  <p className="int-status" aria-live="polite">{stepper.step===0?`He stands on ${fmt(a)} and faces the positive side. The sign is minus…`:stepper.step===1?'Minus: he turns around. Now he faces the negative side.':finished?`He lands on ${fmt(result)}.`:`Step ${stepper.step-1} of ${actions.length-1}: he is on ${fmt(at)}.`}</p>
  <Controls stepper={stepper} total={actions.length} nextLabel={turned?'Next jump':'Turn around'}/>
  <Why>
   <p>Minus means: turn around. {b===0?'Subtracting 0 does not move him.':b>0?`${fmt(b)} is positive, so he walks forward ${b} steps. Facing left, forward takes him to the left.`:`${fmt(b)} is negative, so he walks backward ${-b} steps. Facing left, backward takes him to the right.`} {finished&&`He lands on ${fmt(result)}.`}</p>
   <p>Shortcut: subtracting a number is the same as adding its opposite. {signed(a)} − {signed(b)} = {signed(a)} + {signed(-b)} = {fmt(result)}.</p>
  </Why>
 </Lab>;
}

const signRows=[['+','+','+'],['+','−','−'],['−','+','−'],['−','−','+']];
function SignTable({a,b}:{a:number;b:number}){
 const row=(a<0?2:0)+(b<0?1:0);
 return <table className="int-sign-table"><thead><tr><th>First</th><th>Second</th><th>Answer</th></tr></thead><tbody>{signRows.map((r,i)=><tr key={i} className={i===row&&a!==0&&b!==0?'is-current':''}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>;
}

/** Multiplication: a × b means a jumps, each of size b. A negative first number: turn around first. */
export function MultiplyJumpLab(){
 const cases=[{name:'3 × 2',a:3,b:2},{name:'3 × (−2)',a:3,b:-2},{name:'(−3) × 2',a:-3,b:2},{name:'(−3) × (−2)',a:-3,b:-2},{name:'Make your own',a:0,b:0}];
 const [pick,setPick]=useState(0),[ca,setA]=useState(-4),[cb,setB]=useState(3);
 const own=pick===4,a=own?ca:cases[pick].a,b=own?cb:cases[pick].b,result=a*b;
 const face=sign(a),move=face*b;
 const actions:Action[]=[...(a<0?[{kind:'turn'} as Action]:[]),...Array.from({length:Math.abs(a)},(_,i):Action=>({kind:'jump',from:i*move,to:(i+1)*move,back:b<0}))];
 const stepper=useStepper(actions.length,`${a},${b}`);
 const finished=stepper.step>=actions.length;
 return <Lab title="Equal jumps from zero: multiplying integers">
  <Choices labels={cases.map(c=>c.name)} value={pick} onChange={setPick} label="Choose a multiplication"/>
  {own&&<><Slider label="Number of jumps" value={ca} min={-4} max={4} onChange={setA}/><Slider label="Size of each jump" value={cb} min={-3} max={3} onChange={setB}/></>}
  <MathLine>{`${signed(a)} × ${signed(b)} = ${finished?fmt(result):'?'}`}</MathLine>
  <JumpLine min={-12} max={12} start={0} actions={actions} step={stepper.step} label={`From 0, ${Math.abs(a)} jumps of size ${Math.abs(b)}${a<0?' after turning around':''}, landing on ${fmt(result)}`}/>
  <p className="int-status" aria-live="polite">{finished?`He lands on ${fmt(result)}.`:stepper.step===0?'He starts at 0 and faces the positive side.':`He is on ${fmt(actions.slice(0,stepper.step).reduce((p,x)=>x.kind==='jump'?x.to:p,0))}.`}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <Why>
   <p>{a===0||b===0?'With 0 jumps, or jumps of size 0, he stays at 0. Anything times 0 is 0.':`${signed(a)} × ${signed(b)} means ${Math.abs(a)} jumps, each ${Math.abs(b)} steps long. ${a<0?'The first number is negative, so he turns around first. ':''}${b<0?'The second number is negative, so every jump is backward.':'The second number is positive, so every jump is forward.'} He lands on ${fmt(result)}.`}</p>
   <p>Same signs give a positive answer. Different signs give a negative answer.</p>
  </Why>
  <SignTable a={a} b={b}/>
 </Lab>;
}

/** Division: a ÷ b asks for the size of each jump when b equal jumps from 0 land on a. */
export function DivideJumpLab(){
 const cases=[{name:'12 ÷ 3',a:12,b:3},{name:'(−12) ÷ 3',a:-12,b:3},{name:'12 ÷ (−3)',a:12,b:-3},{name:'(−12) ÷ (−3)',a:-12,b:-3},{name:'(−8) ÷ 4',a:-8,b:4}];
 const [pick,setPick]=useState(0);
 const {a,b}=cases[pick],q=a/b,face=sign(b),move=face*q;
 const actions:Action[]=[...(b<0?[{kind:'turn'} as Action]:[]),...Array.from({length:Math.abs(b)},(_,i):Action=>({kind:'jump',from:i*move,to:(i+1)*move,back:q<0}))];
 const stepper=useStepper(actions.length,`${a},${b}`);
 const finished=stepper.step>=actions.length;
 return <Lab title="How long is each jump? Dividing integers">
  <Choices labels={cases.map(c=>c.name)} value={pick} onChange={setPick} label="Choose a division"/>
  <p>{`${signed(a)} ÷ ${signed(b)}: the man must land on ${fmt(a)} in ${Math.abs(b)} equal jumps${b<0?', after turning around':''}. How long is each jump?`}</p>
  <MathLine>{`${signed(a)} ÷ ${signed(b)} = ${finished?fmt(q):'?'}`}</MathLine>
  <JumpLine min={-12} max={12} start={0} actions={actions} step={stepper.step} marks={[a]} label={`${Math.abs(b)} equal jumps from 0 land on ${fmt(a)}; each jump is ${fmt(q)}`}/>
  <p className="int-status" aria-live="polite">{finished?`${Math.abs(b)} jumps of ${Math.abs(q)} steps land on ${fmt(a)}.`:'The gold dot is where he must land.'}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <Why>
   <p>{`Each jump is ${Math.abs(q)} steps, because ${Math.abs(b)} × ${Math.abs(q)} = ${Math.abs(a)}. `}{b<0?'The divisor is negative, so he turns around first. ':''}{q<0?'He must walk backward to reach the target, so the answer is negative.':'He walks forward to reach the target, so the answer is positive.'}</p>
   <p>{`Check with multiplication: ${signed(b)} × ${signed(q)} = ${fmt(a)}. Division uses the same sign rule: same signs give a positive answer, different signs give a negative answer.`}</p>
  </Why>
  <SignTable a={a} b={b}/>
 </Lab>;
}

/** Skip counting: the man jumps by n from 0. Every landing number is a multiple of n. */
export function SkipCountLab(){
 const [n,setN]=useState(3),[jumps,setJumps]=useState(6),[target,setTarget]=useState(20);
 const max=Math.max(n*jumps,target,10),labelEvery=max>40?n*2:n;
 const actions=Array.from({length:jumps},(_,i):Action=>({kind:'jump',from:i*n,to:(i+1)*n,back:false}));
 const stepper=useStepper(actions.length,`${n},${jumps}`);
 const landed=Array.from({length:stepper.step},(_,i)=>(i+1)*n);
 const isMultiple=target%n===0;
 return <Lab title="Count in equal jumps: multiples">
  <Slider label="Count in" value={n} min={2} max={9} onChange={setN}/>
  <Slider label="Number of jumps" value={jumps} min={1} max={10} onChange={setJumps}/>
  <JumpLine min={0} max={max} start={0} actions={actions} step={stepper.step} labelEvery={labelEvery} tickEvery={max>60?n:1} marks={landed} label={`Jumps of ${n} from 0 land on ${landed.join(', ')||'nothing yet'}`}/>
  <p className="int-status" aria-live="polite">{landed.length?`He lands on ${landed.join(', ')}.`:`He starts at 0. Each jump is ${n} steps.`}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <p><strong>{`Multiples of ${n}: ${n}, ${2*n}, ${3*n}, ${4*n}, ${5*n}, …`}</strong></p>
  <Slider label="Does he land on" value={target} min={1} max={60} onChange={setTarget}/>
  <Why>
   <p>The numbers he lands on are the multiples of {n}: the {n} times table. They go on for ever.</p>
   <p>{isMultiple?`Yes. ${target} = ${n} × ${target/n}, so ${target} is a multiple of ${n}, and ${n} is a factor of ${target}.`:`No. He jumps from ${Math.floor(target/n)*n} to ${Math.floor(target/n)*n+n} and passes over ${target}. So ${target} is not a multiple of ${n}, and ${n} is not a factor of ${target}.`}</p>
  </Why>
 </Lab>;
}

const digitSum=(n:number)=>String(n).split('').reduce((s,d)=>s+Number(d),0);
/** Divisibility tests: look at the last digit, the last two digits or the sum of the digits. */
export function DivisibilityLab(){
 const numbers=[120,135,246,351,516,735,990];
 const [pick,setPick]=useState(2);
 const n=numbers[pick],last=n%10,lastTwo=n%100,sum=digitSum(n);
 const rows=[
  {d:2,look:`last digit ${last}`,rule:'last digit is 0, 2, 4, 6 or 8',ok:last%2===0},
  {d:3,look:`digit sum ${String(n).split('').join(' + ')} = ${sum}`,rule:'digit sum is in the 3 times table',ok:sum%3===0},
  {d:4,look:`last two digits ${String(lastTwo).padStart(2,'0')}`,rule:'last two digits make a multiple of 4',ok:lastTwo%4===0},
  {d:5,look:`last digit ${last}`,rule:'last digit is 0 or 5',ok:last%5===0},
  {d:9,look:`digit sum ${sum}`,rule:'digit sum is in the 9 times table',ok:sum%9===0},
  {d:10,look:`last digit ${last}`,rule:'last digit is 0',ok:last===0},
 ];
 const yes=rows.filter(r=>r.ok).map(r=>r.d);
 return <Lab title="Quick tests without dividing">
  <Choices labels={numbers.map(String)} value={pick} onChange={setPick} label="Choose a number"/>
  <svg className="lab-canvas" viewBox="0 0 600 150" role="img" aria-label={`The digits of ${n}: last digit ${last}, digit sum ${sum}`}>
   {String(n).split('').map((d,i,arr)=>{const x=300-arr.length*40+i*80;return <g key={i}><rect x={x} y={20} width={70} height={70} rx={10} fill={i===arr.length-1?cream:i===arr.length-2?blue:'#fff'} stroke={ink} strokeWidth="2"/><text x={x+35} y={70} textAnchor="middle" fontSize="38" fontWeight="700" fill={ink}>{d}</text></g>;})}
   <text x="300" y="125" textAnchor="middle" fontSize="18" fill={ink}>{`Last digit ${last} · last two digits ${String(lastTwo).padStart(2,'0')} · digit sum ${sum}`}</text>
  </svg>
  <div className="lab-table-wrap"><table className="div-table"><thead><tr><th>Divisible by</th><th>Rule</th><th>Look at</th><th>Answer</th></tr></thead><tbody>{rows.map(r=><tr key={r.d}><td>{r.d}</td><td>{r.rule}</td><td>{r.look}</td><td className={r.ok?'yes':'no'}>{r.ok?'Yes':'No'}</td></tr>)}</tbody></table></div>
  <MathLine>{yes.length?`${n} ÷ ${yes[yes.length-1]} = ${n/yes[yes.length-1]}`:`${n}`}</MathLine>
  <Why>
   <p>{yes.length?`${n} passes the tests for ${yes.join(', ')}. So ${yes.join(', ')} are factors of ${n}.`:`${n} passes none of these tests.`} Check one by dividing: {yes.length?`${n} ÷ ${yes[yes.length-1]} = ${n/yes[yes.length-1]}, with nothing left over.`:''}</p>
   <p>Each test looks at only a small part of the number, so it is quicker than long division.</p>
  </Why>
 </Lab>;
}

/** Addition of whole numbers: the man stands on the first number and walks forward. Big numbers: a jump of 10 first, then ones. */
export function WholeAddJumpLab(){
 const cases=[{name:'8 + 5',a:8,b:5},{name:'27 + 15',a:27,b:15},{name:'Make your own',a:0,b:0}];
 const [pick,setPick]=useState(0),[ca,setA]=useState(6),[cb,setB]=useState(7);
 const own=pick===2,a=own?ca:cases[pick].a,b=own?cb:cases[pick].b,result=a+b;
 const tens=Math.floor(b/10),ones=b%10;
 const actions:Action[]=[...Array.from({length:tens},(_,i):Action=>({kind:'jump',from:a+10*i,to:a+10*(i+1),back:false})),...unitJumps(a+10*tens,ones,1,false)];
 const stepper=useStepper(actions.length,`${a},${b}`);
 const finished=stepper.step>=actions.length;
 const at=actions.slice(0,stepper.step).reduce((p,x)=>x.kind==='jump'?x.to:p,a);
 const min=Math.max(0,Math.floor((a-2)/5)*5),max=Math.max(min+20,Math.ceil((result+2)/5)*5);
 return <Lab title="Add by walking forward on the number line">
  <Choices labels={cases.map(c=>c.name)} value={pick} onChange={setPick} label="Choose an addition"/>
  {own&&<><Slider label="Start number" value={ca} min={0} max={20} onChange={setA}/><Slider label="Number to add" value={cb} min={0} max={15} onChange={setB}/></>}
  <MathLine>{`${a} + ${b} = ${finished?result:'?'}`}</MathLine>
  <JumpLine min={min} max={max} start={a} actions={actions} step={stepper.step} labelEvery={max-min>25?5:1} sizeLabels label={`Man starts at ${a} and walks forward ${b} steps to ${result}`}/>
  <p className="int-status" aria-live="polite">{stepper.step===0?`He stands on ${a} and faces forward.`:finished?`He lands on ${result}.`:`He is on ${at}.`}</p>
  <Controls stepper={stepper} total={actions.length}/>
  <Why>
   <p>{`Start on the first number, ${a}. Adding ${b} means walking forward ${b} steps. ${tens?`For a big number, take a jump of 10 first: ${a} + 10 = ${a+10}. Then ${ones} small steps of 1.`:'Count each step: one, two, three, …'} He stops on ${result}, so ${a} + ${b} = ${result}.`}</p>
   <p>Start on the bigger number to save steps: 5 + 8 and 8 + 5 both make 13, but from 8 there are only 5 steps.</p>
  </Why>
 </Lab>;
}

function Frog({x,y,flip,color}:{x:number;y:number;flip:boolean;color:string}){
 return <g className="int-man" style={{transform:`translate(${x}px,${y}px)`}}><g transform={`scale(1,${flip?-1:1})`}>
  <ellipse cx="0" cy="-14" rx="14" ry="10" fill={color} stroke={ink} strokeWidth="2"/>
  <circle cx="-6" cy="-24" r="4.5" fill="#fff" stroke={ink} strokeWidth="1.5"/><circle cx="6" cy="-24" r="4.5" fill="#fff" stroke={ink} strokeWidth="1.5"/>
  <circle cx="-6" cy="-24" r="1.6" fill={ink}/><circle cx="6" cy="-24" r="1.6" fill={ink}/>
  <path d="M-12 -6l-6 6M12 -6l6 6" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
 </g></g>;
}

/** LCM: two frogs start at 0. The frog that is behind always jumps next. The first number where both land is the LCM. */
export function FrogsLcmLab(){
 const pairs=[[4,6],[3,5],[6,8],[2,7]];
 const [pick,setPick]=useState(0),[ca,setA]=useState(4),[cb,setB]=useState(10);
 const own=pick===4,[p,q]=own?[ca,cb]:pairs[pick];
 const moves:{frog:0|1;from:number;to:number}[]=[];
 let pa=0,pb=0;while(!(pa===pb&&pa>0)&&moves.length<40){if(pa<=pb){moves.push({frog:0,from:pa,to:pa+p});pa+=p;}else{moves.push({frog:1,from:pb,to:pb+q});pb+=q;}}
 const lcm=pa,stepper=useStepper(moves.length,`${p},${q}`),done=moves.slice(0,stepper.step),finished=stepper.step>=moves.length;
 const posA=done.filter(m=>m.frog===0).at(-1)?.to??0,posB=done.filter(m=>m.frog===1).at(-1)?.to??0;
 const landA=done.filter(m=>m.frog===0).map(m=>m.to),landB=done.filter(m=>m.frog===1).map(m=>m.to);
 const max=Math.ceil((lcm+2)/5)*5,X=(v:number)=>40+v*520/max,axis=120,step=max>40?5:max>20?2:1;
 const ticks=Array.from({length:max+1},(_,i)=>i);
 return <Lab title="Two frogs: where do they first land together?">
  <Choices labels={['4 and 6','3 and 5','6 and 8','2 and 7','Make your own']} value={pick} onChange={setPick} label="Choose the jump sizes"/>
  {own&&<><Slider label="Gold frog jumps" value={ca} min={2} max={9} onChange={setA}/><Slider label="Navy frog jumps" value={cb} min={2} max={12} onChange={setB}/></>}
  <svg className="lab-canvas int-jump" viewBox="0 30 600 190" role="img" aria-label={`Gold frog jumps in ${p}s, navy frog jumps in ${q}s. They first land together on ${lcm}.`}>
   <line x1="34" y1={axis} x2="566" y2={axis} stroke={ink} strokeWidth="2"/>
   {ticks.map(v=><g key={v}><path d={`M${X(v)} ${axis-5}v10`} stroke={ink} strokeWidth={v%step===0?1.5:.6}/></g>)}
   {done.map((m,i)=>{const a=X(m.from),b=X(m.to),h=Math.min(46,10+(b-a)*0.4),up=m.frog===0;return <path key={i} d={`M${a} ${axis+(up?-4:4)}Q${(a+b)/2} ${axis+(up?-1:1)*(4+2*h)} ${b} ${axis+(up?-4:4)}`} fill="none" stroke={up?gold:ink} strokeWidth="2.5" strokeDasharray={up?undefined:'6 4'}/>;})}
   {landA.map(v=><g key={'a'+v}><circle cx={X(v)} cy={axis} r="5" fill={gold} stroke={ink}/><text x={X(v)} y={axis-58} textAnchor="middle" fontSize="13" fontWeight="700" fill="#8a6514">{v}</text></g>)}
   {landB.map(v=><g key={'b'+v}><circle cx={X(v)} cy={axis} r="5" fill={ink}/><text x={X(v)} y={axis+62} textAnchor="middle" fontSize="13" fontWeight="700" fill={ink}>{v}</text></g>)}
   {finished&&<circle cx={X(lcm)} cy={axis} r="13" fill="none" stroke="#b0300e" strokeWidth="3"/>}
   <text x={X(0)} y={axis+22} textAnchor="middle" fontSize="13" fill={ink}>0</text>
   <Frog x={X(posA)} y={axis-8} flip={false} color={cream}/>
   <Frog x={X(posB)} y={axis+44} flip={false} color={blue}/>
  </svg>
  <p className="int-status" aria-live="polite">{finished?`Both frogs land on ${lcm}.`:stepper.step===0?'Both frogs start at 0. The frog that is behind jumps next.':`Gold frog: ${landA.join(', ')||'0'}. Navy frog: ${landB.join(', ')||'0'}.`}</p>
  <Controls stepper={stepper} total={moves.length}/>
  <p><strong>{finished?`LCM of ${p} and ${q} = ${lcm}`:`LCM of ${p} and ${q} = ?`}</strong></p>
  <Why>
   <p>{`The gold frog lands on the multiples of ${p}. The navy frog lands on the multiples of ${q}. ${finished?`${lcm} is the first number on both lists, so it is the lowest common multiple.`:'Watch for the first number that both frogs land on.'}`}</p>
   <p>{finished?`If they keep jumping, they meet again at ${2*lcm}, ${3*lcm}, … These are all common multiples, but ${lcm} is the lowest.${lcm===p*q?` Here the LCM is ${p} × ${q}, because ${p} and ${q} have no common factor except 1.`:` It is smaller than ${p} × ${q} = ${p*q}, because ${p} and ${q} share a common factor.`}`:'Use the LCM when two things repeat and you want the first time they happen together.'}</p>
  </Why>
 </Lab>;
}
