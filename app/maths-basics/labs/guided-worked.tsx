'use client';
import {useState} from 'react';
import Tex from '../math-text';
export default function GuidedWorked({steps}:{steps:string[]}){const [shown,setShown]=useState(1);return <div className="lab-guided-worked"><h3>Let’s work it through, one step at a time</h3><ol>{steps.slice(0,shown).map((step,i)=><li key={i}><span>{i+1}</span><p><Tex>{step}</Tex></p></li>)}</ol><div className="lesson-controls"><button type="button" disabled={shown>=steps.length} onClick={()=>setShown(n=>n+1)}>{shown>=steps.length?'All steps shown':'Show the next step'}</button><button type="button" className="lesson-add" onClick={()=>setShown(1)}>Start again</button></div></div>;}
