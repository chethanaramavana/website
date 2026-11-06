'use client';
import SuccessPraise from './success-praise';

import {useState} from 'react';

const examples=[{number:'735',position:0,place:'hundreds',unit:100,value:700},{number:'375',position:1,place:'tens',unit:10,value:70},{number:'357',position:2,place:'ones',unit:1,value:7}];
const blockStyle=(unit:number)=>({display:'inline-flex',alignItems:'center',justifyContent:'center',minWidth:unit===100?44:unit===10?34:26,height:unit===100?44:unit===10?30:24,margin:3,borderRadius:6,border:'2px solid #011e47',background:unit===100?'#f4e0ae':unit===10?'#dce7f3':'#fff',fontWeight:700,fontSize:14});

/** Moves the digit 7 to each place. The digit stays 7; what it is worth changes. */
export default function FacePlaceValue(){
 const [selected,setSelected]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const example=examples[selected];
 return <section className="face-place-lesson" aria-labelledby="face-place-title">
  <h3 id="face-place-title">Move the 7. Watch what it is worth.</h3>
  <p>The digit 7 moves to a new place. It is still the digit 7, but it is worth a different amount.</p>
  <div className="lesson-family-grid">
   <div><h4>Face value</h4><p>The digit you see. Here it is always <strong>7</strong>.</p></div>
   <div><h4>Place value</h4><p>What the digit is worth in its place: 7 ones, 7 tens or 7 hundreds.</p></div>
  </div>
  <div className="lesson-controls" role="group" aria-label="Move the digit 7"><button type="button" aria-pressed={selected===0} onClick={()=>setSelected(0)}>7 in hundreds</button><button type="button" aria-pressed={selected===1} onClick={()=>setSelected(1)}>7 in tens</button><button type="button" aria-pressed={selected===2} onClick={()=>setSelected(2)}>7 in ones</button></div>
  <div className="face-place-example" aria-live="polite" aria-atomic="true">
   <div className="face-place-digits" aria-label={`The number ${example.number}, with 7 in the ${example.place} place`}>{['Hundreds','Tens','Ones'].map((place,i)=><div key={place}><span>{place}</span><strong className={i===example.position?'is-selected':''}>{example.number[i]}</strong></div>)}</div>
   <div role="img" aria-label={`7 blocks of ${example.unit}`} style={{display:'flex',flexWrap:'wrap',alignItems:'center',margin:'12px 0'}}>{Array.from({length:7},(_,i)=><span key={i} style={blockStyle(example.unit)}>{example.unit}</span>)}<strong style={{marginLeft:10,fontSize:18}}>= {example.value}</strong></div>
   <p>In <strong>{example.number}</strong>, the 7 is in the {example.place} place. It is worth <strong>7 {example.place} = {example.value}</strong>.</p>
  </div>
  <p className="lesson-small-note">A 0 is worth nothing, but it keeps a place: 705 is not the same as 75.</p>
  <fieldset className="story-question"><legend>In 375, what are the face value and the place value of 7?</legend><div className="story-answer-options">{['Face value 7; place value 70','Face value 70; place value 7','Face value 7; place value 700'].map((option,i)=><button type="button" key={option} aria-pressed={answer===i} onClick={()=>setAnswer(i)}>{option}</button>)}</div><div role="status" aria-live="polite" aria-atomic="true">{answer!==null&&<p className={`story-answer-feedback ${answer===0?'is-correct':'try-again'}`}><strong>{answer===0?<SuccessPraise/>:'Let’s look again.'}</strong> The digit you see is 7, so the face value is 7. It is in the tens place, so it is worth 7 tens = 70.{answer!==0&&' Try another option.'}</p>}</div></fieldset>
 </section>;
}
