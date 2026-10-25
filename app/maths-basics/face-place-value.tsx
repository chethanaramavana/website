'use client';
import SuccessPraise from './success-praise';

import {useState} from 'react';

const examples=[{number:'735',position:0,place:'hundreds',unit:100,value:700},{number:'375',position:1,place:'tens',unit:10,value:70},{number:'357',position:2,place:'ones',unit:1,value:7}];

export default function FacePlaceValue(){
 const [selected,setSelected]=useState(0);
 const [answer,setAnswer]=useState<number|null>(null);
 const example=examples[selected];
 return <section className="face-place-lesson" aria-labelledby="face-place-title">
  <h3 id="face-place-title">Same digit. Different place.</h3>
  <p>Asha moves the digit <strong>7</strong> to a different place in a three-digit number. Does the digit itself change? Does the amount it represents change?</p>
  <div className="lesson-family-grid">
   <div><h4>Face value</h4><p>The face value is the digit itself, wherever it appears. The face value of <strong>7</strong> is always <strong>7</strong>.</p></div>
   <div><h4>Place value</h4><p>The place value is the digit multiplied by the value of its position: ones, tens, hundreds and so on.</p></div>
  </div>
  <div className="lesson-controls" role="group" aria-label="Move the digit 7"><button type="button" aria-pressed={selected===0} onClick={()=>setSelected(0)}>7 in hundreds</button><button type="button" aria-pressed={selected===1} onClick={()=>setSelected(1)}>7 in tens</button><button type="button" aria-pressed={selected===2} onClick={()=>setSelected(2)}>7 in ones</button></div>
  <div className="face-place-example" aria-live="polite" aria-atomic="true">
   <div className="face-place-digits" aria-label={`The number ${example.number}, with 7 in the ${example.place} place`}>{['Hundreds','Tens','Ones'].map((place,i)=><div key={place}><span>{place}</span><strong className={i===example.position?'is-selected':''}>{example.number[i]}</strong></div>)}</div>
   <p>In <strong>{example.number}</strong>, the face value of 7 is <strong>7</strong>. Its place value is <strong>7 × {example.unit} = {example.value}</strong>.</p>
  </div>
  <p className="lesson-small-note">For the digit 0, both its face value and its place value are 0. It still holds a place in the number.</p>
  <fieldset className="story-question"><legend>In 375, what are the face value and place value of 7?</legend><div className="story-answer-options">{['Face value 7; place value 70','Face value 70; place value 7','Face value 7; place value 700'].map((option,i)=><button type="button" key={option} aria-pressed={answer===i} onClick={()=>setAnswer(i)}>{option}</button>)}</div><div role="status" aria-live="polite" aria-atomic="true">{answer!==null&&<p className={`story-answer-feedback ${answer===0?'is-correct':'try-again'}`}><strong>{answer===0?<SuccessPraise/>:'Let’s look again.'}</strong> The digit itself is 7, so its face value is 7. It is in the tens place, so its place value is 7 × 10 = 70.{answer!==0&&' Try another option.'}</p>}</div></fieldset>
 </section>;
}
