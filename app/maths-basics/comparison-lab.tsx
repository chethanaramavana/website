'use client';

import {useState} from 'react';

const pairs=[[5399,5406],[3481,3418],[999,1000]];
const places=['Thousands','Hundreds','Tens','Ones'];
const format=(n:number)=>n.toLocaleString('en-IN');

export default function ComparisonLab(){
 const [pair,setPair]=useState(0),[step,setStep]=useState(0);
 const [left,setLeft]=useState(4),[right,setRight]=useState(7);
 const [order,setOrder]=useState<number[]>([]),[hint,setHint]=useState('');
 const [a,b]=pairs[pair];
 const digits=[String(a).padStart(4,' '),String(b).padStart(4,' ')];
 const firstDifference=digits[0].split('').findIndex((digit,i)=>digit!==digits[1][i]);
 const differentLengths=String(a).length!==String(b).length;
 const stop=differentLengths?0:firstDifference;
 const done=step>stop;
 function selectNumber(n:number){const remaining=[907,970,790].filter(value=>!order.includes(value));if(n===Math.min(...remaining)){setOrder([...order,n]);setHint('Well done! That is the smallest number left.');}else setHint('Look at the hundreds first, then the tens. Try the smallest number still available.');}
 return <section className="comparison-lab" aria-label="Explore comparing and ordering">
  <h3>Let’s compare the numbers together</h3>
  <div className="lesson-controls" role="group" aria-label="Choose numbers to compare">{pairs.map(([x,y],i)=><button type="button" key={i} aria-pressed={pair===i} onClick={()=>{setPair(i);setStep(0);}}>{format(x)} and {format(y)}</button>)}</div>
  <p>First count the digits. If the counts match, compare one place at a time from the left.</p>
  <div className="comparison-place-grid" role="table" aria-label="Compare the place-value columns">
   <div role="row">{places.map(place=><span role="columnheader" key={place}>{place}</span>)}</div>
   {digits.map((row,r)=><div role="row" key={r}>{row.split('').map((digit,i)=><strong role="cell" key={i} className={i===Math.min(step,stop)?'compare-active':''}>{digit===' '?<span aria-label="No digit in this place">—</span>:digit}</strong>)}</div>)}
  </div>
  <div className="comparison-notice" aria-live="polite" aria-atomic="true">{done?<p><strong>{format(a)} {a>b?'is greater than':'is less than'} {format(b)}.</strong> {differentLengths?`${format(b)} has more digits, so it is greater.`:`The first unequal digits are in the ${places[stop].toLowerCase()} place. Later digits cannot change the result.`}</p>:differentLengths?<p>{format(a)} has {String(a).length} digits; {format(b)} has {String(b).length}. Which is greater?</p>:<p><strong>{places[step]}:</strong> compare {digits[0][step]} and {digits[1][step]}. {step<stop?'They match. Move one place to the right.':'They differ. We can decide here.'}</p>}</div>
  <div className="lesson-controls"><button type="button" disabled={done} onClick={()=>setStep(n=>n+1)}>{done?'Comparison complete':step===stop?'Show the comparison':'Compare next place'}</button><button type="button" className="lesson-add" onClick={()=>setStep(0)}>Start again</button></div>

  <h3 className="comparison-subheading">Move the dots. Which number is greater?</h3>
  <div className="comparison-sliders"><label>Gold dot: {left}<input type="range" min="0" max="10" step="1" value={left} onChange={e=>setLeft(Number(e.target.value))}/></label><label>Navy dot: {right}<input type="range" min="0" max="10" step="1" value={right} onChange={e=>setRight(Number(e.target.value))}/></label></div>
  <svg viewBox="0 0 600 140" className="comparison-number-line" role="img" aria-label={`On the number line, gold is at ${left} and navy is at ${right}. ${left===right?'The numbers are equal.':`${Math.max(left,right)} is farther right and is greater.`}`}>
   <path d="M40 70H560" stroke="#011e47" strokeWidth="2"/>{Array.from({length:11},(_,i)=><g key={i}><path d={`M${40+i*52} 64v12`} stroke="#011e47"/><text x={40+i*52} y="108" textAnchor="middle" fontSize="19" fill="#011e47">{i}</text></g>)}
   <circle cx={40+left*52} cy="52" r="11" fill="#d9a231" stroke="#011e47"/><circle cx={40+right*52} cy="70" r="10" fill="#011e47"/>
  </svg>
  <p aria-live="polite">{left===right?`${left} = ${right}: both dots show the same number.`:`${Math.max(left,right)} > ${Math.min(left,right)}. The number farther right is greater.`}</p>

  <h3 className="comparison-subheading">Build a staircase from smallest to largest</h3>
  <p>Choose the smallest number left each time.</p>
  <div className="lesson-controls" role="group" aria-label="Numbers to put in ascending order">{[907,970,790].map(n=><button type="button" key={n} disabled={order.includes(n)} onClick={()=>selectNumber(n)}>{n}</button>)}</div>
  <div className="comparison-order" aria-label="Your ascending order">{[0,1,2].map((_,i)=><div key={i} style={{paddingTop:(2-i)*24}}><strong>{order[i]??'?'}</strong><span>{['Smallest','Next','Largest'][i]}</span></div>)}</div>
  <p role="status">{order.length===3?'Well done! 790 < 907 < 970. Ascending order means smallest to largest.':hint}</p>
  <div className="lesson-controls"><button type="button" className="lesson-add" onClick={()=>{setOrder([]);setHint('');}}>Try the staircase again</button></div>
 </section>;
}
