'use client';

import {useState} from 'react';
import Tex from './math-text';

const ink='#011e47',gold='#d9a231',cream='#f4e0ae';

function Flower({x,y,dark=false}:{x:number;y:number;dark?:boolean}){
 return <g transform={`translate(${x} ${y})`}>
  <path d="M0 7v15m0-5-6-4m6 0 6-4" stroke="#567961" strokeWidth="1.8" fill="none"/>
  {[[-6,0],[6,0],[0,-6],[0,6]].map(([px,py],i)=><circle key={i} cx={px} cy={py} r="5.5" fill={dark?ink:cream} stroke={ink} strokeWidth="1"/>)}
  <circle r="3.5" fill={gold} stroke={ink} strokeWidth="1"/>
 </g>;
}

/** Dots in rows for the three tricks: each row can be gold or navy, and one row can be crossed out. */
function DotRows({rows,perRow,darkFrom=Infinity,crossLast=false,label,notes=[]}:{rows:number;perRow:number;darkFrom?:number;crossLast?:boolean;label:string;notes?:{row:number;text:string}[]}){
 const gap=26,h=rows*gap+20,w=Math.max(perRow*gap,60)+190;
 return <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} style={{display:'block',width:'100%',maxWidth:w*1.3,height:'auto',margin:'8px auto'}}>
  {Array.from({length:rows},(_,r)=><g key={r} opacity={crossLast&&r===rows-1?.3:1}>{Array.from({length:perRow},(_,c)=><circle key={c} cx={20+c*gap} cy={18+r*gap} r="9" fill={r>=darkFrom?ink:cream} stroke={ink}/>)}</g>)}
  {crossLast&&<path d={`M6 ${18+(rows-1)*gap}H${20+perRow*gap}`} stroke="#b0300e" strokeWidth="3"/>}
  {notes.map(n=><text key={n.text} x={30+perRow*gap} y={n.row*gap+22} fontSize="15" fontWeight="700" fill={ink}>{n.text}</text>)}
 </svg>;
}

/** Plant a garden one row at a time. Each new row adds the same number of flowers, so the count goes up in equal steps. */
export default function MultiplicationGarden(){
 const [perRow,setPerRow]=useState(6),[rows,setRows]=useState(1),[trick,setTrick]=useState(0);
 const total=rows*perRow,rowW=perRow*44,width=Math.max(rowW+150,360);
 const counts=Array.from({length:rows},(_,r)=>(r+1)*perRow);
 return <div className="multiplication-garden">
  <h3>Plant a garden, one row at a time</h3>
  <p>Every row has the <strong>same number</strong> of flowers. Press <strong>Plant a row</strong> and watch the total grow.</p>
  <label className="lab-slider">Flowers in each row: <strong>{perRow}</strong><input type="range" min={2} max={9} value={perRow} onChange={e=>setPerRow(Number(e.target.value))}/></label>
  <div className="lesson-controls"><button type="button" disabled={rows>=10} onClick={()=>setRows(r=>Math.min(10,r+1))}>Plant a row</button><button type="button" className="lesson-add" disabled={rows<=0} onClick={()=>setRows(r=>Math.max(0,r-1))}>Remove a row</button><button type="button" className="lesson-add" onClick={()=>setRows(0)}>Start again</button></div>
  <figure className="garden-picture">
   <svg viewBox={`0 0 ${width} ${Math.max(rows,1)*40+20}`} role="img" aria-label={`${rows} rows of ${perRow} flowers: ${total} flowers altogether`}>
    {rows===0&&<text x={width/2} y="36" textAnchor="middle" fontSize="16" fill={ink}>The garden is empty. Plant the first row.</text>}
    {Array.from({length:rows},(_,r)=><g key={`${perRow}-${r}`} className="garden-row">
     <text x="8" y={34+r*40} fontSize="13" fill={ink}>Row {r+1}</text>
     {Array.from({length:perRow},(_,c)=><Flower key={c} x={70+c*44} y={24+r*40}/>)}
     <rect x={rowW+62} y={13+r*40} width="62" height="26" rx="13" fill={r===rows-1?gold:'#fff'} stroke={ink}/>
     <text x={rowW+93} y={31+r*40} textAnchor="middle" fontSize="15" fontWeight="700" fill={ink}>{(r+1)*perRow}</text>
    </g>)}
   </svg>
   <figcaption aria-live="polite" aria-atomic="true">{rows===0?<p>0 rows: 0 flowers.</p>:<>
    <p>Count in {perRow}s: <strong>{counts.join(', ')}</strong></p>
    <Tex>{`${Array.from({length:rows},()=>perRow).join(' + ')} = ${total}`}</Tex>
    <p><strong>{rows} {rows===1?'row':'rows'} of {perRow}</strong> is written <strong>{rows} × {perRow} = {total}</strong>.</p>
   </>}</figcaption>
  </figure>
  <div className="garden-property">
   <h4>Three tricks with rows</h4>
   <div className="lesson-controls" role="group" aria-label="Choose a trick">{['Turn the garden','Split the rows','One row less'].map((label,i)=><button type="button" key={label} aria-pressed={trick===i} onClick={()=>setTrick(i)}>{label}</button>)}</div>
   {trick===0&&<><p>4 rows of 6 and 6 rows of 4 use the same flowers. Only the garden is turned.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:12}}><DotRows rows={4} perRow={6} label="4 rows of 6 dots" notes={[{row:1,text:'4 × 6'}]}/><DotRows rows={6} perRow={4} label="6 rows of 4 dots" notes={[{row:2,text:'6 × 4'}]}/></div><Tex>{'4 × 6 = 6 × 4 = 24'}</Tex></>}
   {trick===1&&<><p>Do not know 7 × 6? Split the 7 rows into 5 rows and 2 rows. Use the easy facts, then add.</p><DotRows rows={7} perRow={6} darkFrom={5} label="7 rows of 6: 5 gold rows and 2 navy rows" notes={[{row:2,text:'5 × 6 = 30'},{row:5.5,text:'2 × 6 = 12'}]}/><Tex>{'7 × 6 = 5 × 6 + 2 × 6 = 30 + 12 = 42'}</Tex></>}
   {trick===2&&<><p>Do not know 9 × 7? Start with 10 rows of 7 (that is 70), then take away one row of 7.</p><DotRows rows={10} perRow={7} crossLast label="10 rows of 7 with the last row crossed out" notes={[{row:4,text:'10 × 7 = 70'},{row:9,text:'− 7'}]}/><Tex>{'9 × 7 = 10 × 7 − 7 = 70 − 7 = 63'}</Tex></>}
  </div>
 </div>;
}
