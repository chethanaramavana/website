'use client';
import {useState} from 'react';
import {Lab,Why,Slider,ink,gold,cream} from './lab-kit';

const rust='#b0300e';
const targets=[16,24,32];
const X0=20,W=560,Y0=24,H=150,E=W/8;

function Frac({top,bottom,className=''}:{top:string|number;bottom:string|number;className?:string}){
 return <span className={`fcut-frac ${className}`}><span>{top}</span><span>{bottom}</span></span>;
}
function Tick(){return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#286146"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;}

export function FractionCutLab(){
 const [split,setSplit]=useState(1),[goal,setGoal]=useState(0);
 const target=targets[goal],done=8*split===target,last=goal===targets.length-1;
 return <Lab title="Cut every piece again—does the amount change?">
  <p className="fcut-goal"><strong>Challenge {goal+1} of {targets.length}:</strong> make a fraction equal to <Frac top={3} bottom={8}/> that has <strong>{target}</strong> equal pieces.</p>
  <Slider label="Pieces made from each original eighth" value={split} min={1} max={4} onChange={setSplit}/>
  <svg className="fcut-bar" viewBox="0 0 600 232" role="img" aria-label={`${3*split} of ${8*split} equal pieces shaded. The shaded amount is still three eighths of the snack.`}>
   {Array.from({length:8},(_,i)=><rect key={i} x={X0+i*E} y={Y0} width={E} height={H} fill={i<3?cream:'#fff'}/>)}
   {[2,3,4].map(s=><g key={s} className="fcut-cuts" style={{opacity:s===split?1:0}}>
    {Array.from({length:8},(_,i)=>Array.from({length:s-1},(_,j)=>{const x=X0+i*E+E*(j+1)/s;return <line key={`${i}-${j}`} x1={x} x2={x} y1={Y0+6} y2={Y0+H-6} stroke={rust} strokeWidth="2.5" strokeDasharray="7 5"/>;}))}
   </g>)}
   {Array.from({length:9},(_,i)=><line key={i} x1={X0+i*E} x2={X0+i*E} y1={Y0} y2={Y0+H} stroke={ink} strokeWidth="3.5"/>)}
   <line x1={X0} x2={X0+W} y1={Y0} y2={Y0} stroke={ink} strokeWidth="3.5"/><line x1={X0} x2={X0+W} y1={Y0+H} y2={Y0+H} stroke={ink} strokeWidth="3.5"/>
   <rect x={X0-4} y={Y0-8} width={3*E+8} height={H+16} rx="6" fill="none" stroke={gold} strokeWidth="5"/>
   <text x={X0+1.5*E} y={Y0+H+44} textAnchor="middle" fontSize="26" fontWeight="600" fill={ink}>{3*split} shaded</text>
   <text x={X0+5.5*E} y={Y0+H+44} textAnchor="middle" fontSize="26" fill={ink}>{5*split} not shaded</text>
  </svg>
  <div className="fcut-legend" aria-hidden="true"><span className="fcut-key-old">Original eighths</span><span className="fcut-key-new">New cuts</span><span className="fcut-key-shade">Shaded amount: always the same</span></div>
  <div className="fcut-eq" aria-label={`3 over 8 equals ${3*split} over ${8*split}`}>
   <Frac top={3} bottom={8}/><span>=</span>
   {split>1&&<><Frac className="fcut-new" top={`3 × ${split}`} bottom={`8 × ${split}`}/><span>=</span></>}
   <Frac key={split} className="fcut-pop" top={3*split} bottom={8*split}/>
  </div>
  <div aria-live="polite" aria-atomic="true">
   {done?<div className="fcut-success"><Tick/><p><strong>Well done.</strong> {3*split}/{8*split} names the same amount as 3/8. You multiplied the top and the bottom by {split}.</p></div>
   :<p className="fcut-hint">{8*split<target?'Cut more: move the slider to the right.':'Too many pieces: move the slider to the left.'}</p>}
  </div>
  {done&&<div className="lesson-controls"><button type="button" onClick={()=>{setGoal(last?0:goal+1);setSplit(1);}}>{last?'Start the challenges again':'Next challenge'}</button></div>}
  <Why><p>The whole snack and the shaded amount stay the same. Every original piece is cut equally, so the numerator and denominator are multiplied by the same number.</p><p>The denominator counts equal pieces in the whole. The numerator counts the pieces selected. Unequal cuts would not represent this fraction.</p></Why>
 </Lab>;
}
