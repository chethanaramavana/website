'use client';

import {useState} from 'react';
import Tex from './math-text';

export default function MultiplicationGarden(){
 const [mode,setMode]=useState(0);
 const [removed,setRemoved]=useState(false);
 const rows=mode===0?4:mode===1?6:mode===2?7:10,columns=mode===1?4:mode===3?7:6;
 return <div className="multiplication-garden">
  <h3>A little garden, one row at a time</h3>
  <p>Asha plants 6 flowers in each of 4 rows. Let’s count her flowers by rows instead of one by one.</p>
  <div className="lesson-controls" role="group" aria-label="Arrange the flower garden">{['4 rows of 6','Turn the garden','Grow 7 rows','Try 9 × 7'].map((label,i)=><button type="button" key={label} aria-pressed={mode===i} onClick={()=>{setMode(i);setRemoved(false);}}>{label}</button>)}</div>
  <figure className="garden-picture">
   <svg viewBox={`0 0 440 ${rows*38+40}`} role="img" aria-label={mode===3&&removed?'Ten rows of 7, with the last row crossed out. Nine rows remain: 63 flowers.':`${rows} equal rows of ${columns} flowers: ${rows*columns} flowers altogether${mode===2?'. Five gold rows contain 30 flowers; two navy rows contain 12.':''}`}>
    {Array.from({length:rows},(_,r)=><g key={r} opacity={mode===3&&removed&&r===9?.25:1}>{Array.from({length:columns},(_,c)=><g key={c} transform={`translate(${(440-columns*58)/2+c*58+29} ${30+r*38})`}>
     <path d="M0 7v17m0-5-6-4m6 0 6-4" stroke="#567961" strokeWidth="1.8" fill="none"/>
     {[[-6,0],[6,0],[0,-6],[0,6]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5.5" fill={mode===2&&r>=5?'#011e47':'#f4e0ae'} stroke="#011e47" strokeWidth="1"/>)}
     <circle r="3.5" fill="#d9a231" stroke="#011e47" strokeWidth="1"/>
    </g>)}</g>)}
    {mode===3&&removed&&<path d="M15 372H425" stroke="#b0300e" strokeWidth="3"/>}
   </svg>
   <figcaption aria-live="polite" aria-atomic="true">{mode===0?<><Tex>{'6 + 6 + 6 + 6 = 24'}</Tex><p>Four equal rows. Six flowers in each. <strong>24 flowers altogether!</strong></p></>:mode===1?<><Tex>{'4 × 6 = 6 × 4 = 24'}</Tex><p>New arrangement, same flowers! Now there are 6 rows of 4. The total stays <strong>24</strong>.</p></>:mode===2?<><p><strong>Five gold rows + two navy rows</strong></p><Tex>{'5 × 6 + 2 × 6 = 30 + 12 = 42'}</Tex><p>Use a fact you know, then add two more rows. <strong>7 rows of 6 make 42 flowers.</strong></p></>:<><Tex>{removed?'9 × 7 = (10 − 1) × 7 = 70 − 7 = 63':'10 × 7 = 70'}</Tex><p>{removed?'One row of 7 is crossed out. Nine rows remain: 63 flowers.':'Start with 10 rows of 7 flowers. Take away one whole row to leave 9 rows.'}</p></>}</figcaption>
  </figure>
  {mode===3&&<div className="lesson-controls"><button type="button" onClick={()=>setRemoved(v=>!v)}>{removed?'Put the row back':'Take away one row'}</button></div>}
  <div className="garden-property"><h4>Meet the distributive property</h4><p>Split the number of rows into two parts. Multiply <strong>each part</strong> by the number of flowers in a row, then add the results. This is the <strong>distributive property</strong>.</p><p><Tex>{'7 × 6 = (5 + 2) × 6 = 5 × 6 + 2 × 6'}</Tex></p><p>You can also start with an extra row and take it away. For 9 rows of 7, start with 10 rows and remove one row of 7. Try “9 × 7” above before answering the practice question.</p><p><Tex>{'9 × 7 = (10 − 1) × 7 = 10 × 7 − 1 × 7'}</Tex></p></div>
 </div>;
}
