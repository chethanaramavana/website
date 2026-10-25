'use client';
import SuccessPraise from './success-praise';

import {useState} from 'react';
import {ArrowLeft,ArrowRight,Minus,Plus,RotateCcw} from 'lucide-react';
import Tex from './math-text';

const starPlaces=[[80,65],[215,110],[350,55],[465,100],[540,165]];
const mangoPlaces=[[235,295],[300,280],[365,295],[270,335],[335,335]];

function FiveFingers(){
 return <svg viewBox="0 -22 150 190" role="img" aria-label="One hand with five fingers, numbered 1 to 5" className="story-five-fingers">
  <path d="M52 145C45 130 28 113 13 91C8 84 18 76 24 82L49 104 43 33C42 23 55 22 56 33L61 79 62 16C62 6 76 6 76 16L78 78 84 22C86 12 98 15 97 25L93 82 103 41C106 31 118 35 115 45L105 112C103 130 93 143 85 150Z" fill="#f4e0ae" stroke="#011e47" strokeWidth="2"/>
  {[[12,68],[45,17],[69,0],[91,8],[116,27]].map(([x,y],i)=><text key={i} x={x} y={y} textAnchor="middle" fill="#011e47" fontSize="17">{i+1}</text>)}
 </svg>;
}

function CountTheStars(){
 const [count,setCount]=useState(0);
 return <section className="number-story" aria-labelledby="star-story-title">
  <span className="lesson-kicker">1 · Asha’s evening on the terrace</span>
  <h3 id="star-story-title">“How many stars can I see?”</h3>
  <p>Asha spots five bright stars in this picture. She points to each one and starts counting: <strong>1, 2, 3…</strong> Count along with her.</p>
  <figure className="number-story-figure">
   <div className="story-illustration" role="img" aria-label={`Five stars above Asha’s terrace; ${count} ${count===1?'has':'have'} been counted`}>
    <img src="/lesson-stories/counting-stars.webp" width="1050" height="700" alt=""/>
    <svg viewBox="0 0 600 400" className="story-exact-overlay" aria-hidden="true">
     {starPlaces.map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}>
      <path d="M0-13 3.8-4 13-4 6 2 8 12 0 6-8 12-6 2-13-4-3.8-4Z" fill={i<count?'#f4e0ae':'#fff'} stroke="#d9a231" strokeWidth="1.5"/>
      {i<count&&<text y="40" textAnchor="middle" fill="#fff" fontSize="25">{i+1}</text>}
     </g>)}
    </svg>
   </div>
   <figcaption aria-live="polite" aria-atomic="true">{count===0?'Start with the first star. Say “one”.':`${count} ${count===1?'star':'stars'} counted.${count===5?' We started at 1 and counted every star once.':''}`}</figcaption>
  </figure>
  <div className="lesson-controls">
   <button type="button" onClick={()=>setCount(n=>n+1)} disabled={count===5}><Plus aria-hidden="true"/>Count the next star</button>
   <button type="button" className="lesson-add" onClick={()=>setCount(0)} disabled={count===0}><RotateCcw aria-hidden="true"/>Count again</button>
  </div>
  <div className="story-natural-notation">
   <div><h4>These are the natural numbers.</h4><p>We use them to count stars, fingers, books and many other things. We write their family as <strong>ℕ</strong>.</p><p className="lesson-sequence"><Tex>{'$\\mathbb{N}=\\{1,2,3,\\ldots\\}$'}</Tex></p><p className="lesson-small-note">Try your own hand: 1, 2, 3, 4, 5.</p></div>
   <FiveFingers/>
  </div>
 </section>;
}

function StoryQuestion({title,options,correct,explanation}:{title:string;options:string[];correct:number;explanation:string}){
 const [answer,setAnswer]=useState<number|null>(null);
 return <fieldset className="story-question">
  <legend>{title}</legend>
  <div className="story-answer-options">{options.map((option,i)=><button type="button" key={option} aria-pressed={answer===i} onClick={()=>setAnswer(i)}>{option}</button>)}</div>
  <div role="status" aria-live="polite" aria-atomic="true">{answer!==null&&<p className={`story-answer-feedback ${answer===correct?'is-correct':'try-again'}`}><strong>{answer===correct?<SuccessPraise/>:'Let’s look again.'}</strong> {explanation}{answer!==correct&&' Choose another option to try again.'}</p>}</div>
 </fieldset>;
}

function NumberSteps({number}:{number:number}){
 return <svg viewBox="0 0 640 250" role="img" aria-label={`Asha stands on step ${number}. ${number===0?'There is no whole-number step before zero.':`Step ${number-1} is one less.`} Step ${number+1} is one more.`} className="story-number-steps">
  {[[90,170,number===0?null:number-1],[270,120,number],[450,70,number+1]].map(([x,y,n],i)=><g key={i}>
   <path d={`M${x} ${y}h140v60h-140Z`} fill={i===1?'#f4e0ae':'#f4f6f9'} stroke="#011e47" strokeWidth="2" strokeDasharray={n===null?'5 5':undefined}/>
   <text x={Number(x)+70} y={Number(y)+40} textAnchor="middle" fill="#011e47" fontSize="30">{n===null?'—':n}</text>
   {i!==1&&<text x={Number(x)+70} y={Number(y)-15} textAnchor="middle" fill="#4e5b70" fontSize="15">{i===0?'One step down':'One step up'}</text>}
   {i===1&&<><circle cx={Number(x)+70} cy={Number(y)-75} r="13" fill="#011e47"/><path d={`M${Number(x)+70} ${Number(y)-62}v26m0-17-17 10m17-10 17 10m-17 7-14 16m14-16 14 16`} stroke="#011e47" strokeWidth="4" fill="none" strokeLinecap="round"/></>}
  </g>)}
 </svg>;
}

function LargestNumberQuestion(){
 const [answer,setAnswer]=useState<number|null>(null);
 return <section className="story-infinity" aria-labelledby="largest-number-title">
  <h3 id="largest-number-title">Is there a largest natural number?</h3>
  <fieldset className="story-question"><legend>What do you think?</legend><div className="story-answer-options">{['Yes, there is a largest natural number.','No, there is no largest natural number.'].map((option,i)=><button type="button" key={option} aria-pressed={answer===i} onClick={()=>setAnswer(i)}>{option}</button>)}</div><div role="status" aria-live="polite">{answer===0&&<p className="story-answer-feedback try-again">Try adding 1 to the number you think is largest. Does that give you a bigger natural number? Have another try.</p>}{answer===1&&<p className="story-answer-feedback is-correct"><strong><SuccessPraise>Good thinking!</SuccessPraise></strong> Now choose the reason.</p>}</div></fieldset>
  {answer===1&&<StoryQuestion title="Why is there no largest natural number?" options={['Adding 1 to any natural number gives a larger natural number.','Because zero is a whole number.','Because 1 is the first natural number.']} correct={0} explanation="Whatever natural number you choose, adding 1 gives a larger one. Even 999,999 + 1 = 1,000,000. So the natural numbers never end."/>}
 </section>;
}

export default function NumberStories(){
 const [count,setCount]=useState(3);
 const [number,setNumber]=useState(5);
 return <>
  <CountTheStars/>
  <section className="number-story story-zero" aria-labelledby="picnic-story-title">
   <span className="lesson-kicker">2 · A picnic with friends</span>
   <h3 id="picnic-story-title">The last mango leaves the basket.</h3>
   <p>The next day, Asha brings three mangoes to a picnic. She shares them one at a time. What number describes the basket when the last mango is gone?</p>
   <figure className="number-story-figure">
    <div className="story-illustration" role="img" aria-label={count===0?'Asha and her friend look at an empty basket':`Asha’s basket contains ${count} ${count===1?'mango':'mangoes'}`}>
     <img src="/lesson-stories/picnic-basket.webp" width="1050" height="700" alt="" loading="lazy"/>
     <svg viewBox="0 0 600 400" className="story-exact-overlay" aria-hidden="true">
      {mangoPlaces.slice(0,count).map(([x,y],i)=><g key={i} transform={`translate(${x} ${y})`}><path d="M0-15C10-24 25-8 18 12C14 27-9 24-16 9C-25-2-10-13 0-15Z" fill="#e9ae35" stroke="#011e47" strokeWidth="1.5"/><path d="M0-15Q12-35 25-27Q18-11 0-15Z" fill="#567961" stroke="#011e47" strokeWidth="1"/></g>)}
     </svg>
    </div>
    <figcaption className="story-count-caption" aria-live="polite" aria-atomic="true"><strong>{count}</strong><span>{count===0?<>The basket is empty. We need a number for <b>none</b>: zero.</>:<>{count} {count===1?'mango is':'mangoes are'} left. Share one and count again.</>}</span></figcaption>
   </figure>
   <div className="lesson-controls">
    <button type="button" onClick={()=>setCount(n=>n-1)} disabled={count===0}><Minus aria-hidden="true"/>Share one mango</button>
    <button type="button" className="lesson-add" onClick={()=>setCount(n=>n+1)} disabled={count===5}><Plus aria-hidden="true"/>Put one back</button>
   </div>
  </section>
  <section className="lesson-number-families" aria-labelledby="number-families-title">
   <span className="lesson-kicker">The story gives us a new number family</span>
   <h3 id="number-families-title">Include zero. Meet the whole numbers.</h3>
   <div className="lesson-family-grid">
    <div><h4>Natural numbers</h4><p className="lesson-sequence"><Tex>{'$\\mathbb{N}=\\{1,2,3,\\ldots\\}$'}</Tex></p><p>Asha starts at 1 when she counts the stars.</p></div>
    <div><h4>Whole numbers</h4><p className="lesson-sequence"><Tex>{'$\\mathbb{W}=\\{0,1,2,3,\\ldots\\}$'}</Tex></p><p>Zero lets her describe the empty basket too.</p></div>
   </div>
   <StoryQuestion title="Which statement is true?" options={['Every natural number is a whole number.','Every whole number is a natural number.']} correct={0} explanation="All the natural numbers—1, 2, 3 and so on—also belong to the whole numbers. But 0 is a whole number and is not a natural number. So the first statement is true."/>
  </section>
  <section className="number-story lesson-neighbours" aria-labelledby="steps-story-title">
   <span className="lesson-kicker">3 · Asha climbs the number steps</span>
   <h3 id="steps-story-title">One step down. One step up.</h3>
   <p>Asha is playing on steps labelled 0, 1, 2, 3 and so on. She starts on step 5. One step down takes her to 4; one step up takes her to 6.</p>
   <NumberSteps number={number}/>
   <div className="lesson-neighbour-diagram" aria-live="polite" aria-atomic="true">
    <div><span>Predecessor</span><strong>{number===0?'—':number-1}</strong><small>{number===0?'No whole number before 0':'One less'}</small></div>
    <div className="lesson-current-number"><span>Current number</span><strong>{number}</strong></div>
    <div><span>Successor</span><strong>{number+1}</strong><small>One more</small></div>
   </div>
   <p>The <strong>predecessor</strong> is the number just before: subtract 1. The <strong>successor</strong> is the number just after: add 1.</p>
   <div className="lesson-controls lesson-number-controls">
    <button type="button" onClick={()=>setNumber(n=>n-1)} disabled={number===0}><ArrowLeft aria-hidden="true"/>One step down</button>
    <button type="button" onClick={()=>setNumber(n=>n+1)} disabled={number>=20}><ArrowRight aria-hidden="true"/>One step up</button>
   </div>
   {number===0&&<p className="lesson-small-note">Asha is at 0. There is no whole number before 0. Its successor is 1.</p>}
   {number>=20&&<p className="lesson-small-note">This picture stops at step 20. The numbers continue: 21, 22, 23…</p>}
   <StoryQuestion title="Asha reaches step 12. What are its predecessor and successor?" options={['11 and 13','10 and 14','13 and 11']} correct={0} explanation="One less than 12 is 11, its predecessor. One more than 12 is 13, its successor."/>
  </section>
  <LargestNumberQuestion/>
 </>;
}
