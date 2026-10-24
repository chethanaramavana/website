'use client';

import {useState} from 'react';
import {ArrowLeft, ArrowRight, Minus, Plus} from 'lucide-react';
import type {BasicsTopic} from '@/lib/basics-types';
import TopicPicture from './topic-picture';
import ComparingNumbers from './comparing-numbers';
import WorkedExamples from './worked-examples';
import Tex from './math-text';

function Shell(){
 return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 27C-3 5 42 0 35 27L25 34H16Z" fill="#f4e0ae" stroke="#011e47" strokeWidth="1.5"/><path d="M20 32 12 11M20 32 20 8M20 32 29 11" stroke="#011e47" fill="none"/></svg>;
}

function DiscoverZero(){
 const [count,setCount]=useState(3);
 const [number,setNumber]=useState(9);
 return <>
  <section className="lesson-explore" aria-labelledby="counting-question">
   <div className="lesson-explore-copy">
    <span className="lesson-kicker">Try the idea</span>
    <h3 id="counting-question">Take the shells away.<br/>What’s left?</h3>
    <p>Count each shell once. Then remove them, one at a time.</p>
    <div className="lesson-controls">
     <button type="button" onClick={()=>setCount(n=>n-1)} disabled={count===0}><Minus aria-hidden="true"/>Take one away</button>
     <button type="button" className="lesson-add" onClick={()=>setCount(n=>n+1)} disabled={count===6}><Plus aria-hidden="true"/>Add one</button>
    </div>
   </div>
   <figure className="lesson-counting">
    <div className={`lesson-shell-tray${count===0?' is-empty':''}`} role="img" aria-label={count===0?'An empty box':`${count} ${count===1?'shell':'shells'} in a box`}>
     {Array.from({length:count},(_,i)=><Shell key={i}/>)}
     {count===0&&<span>Nothing in the box.</span>}
    </div>
    <figcaption aria-live="polite" aria-atomic="true"><strong>{count}</strong><span>{count===0?<>No shells. The count is <b>zero</b>.</>:<>The last number you say tells you <b>how many</b>.</>}</span></figcaption>
   </figure>
  </section>

  <section className="lesson-number-families" aria-labelledby="number-families-title">
   <span className="lesson-kicker">Give the idea a name</span>
   <h3 id="number-families-title">Two number families. One difference.</h3>
   <div className="lesson-family-grid">
    <div><h4>Natural numbers</h4><p className="lesson-sequence" aria-label="1, 2, 3, 4 and so on">1, 2, 3, 4, …</p><p>The numbers we use when we start counting at 1.</p></div>
    <div><h4>Whole numbers</h4><p className="lesson-sequence" aria-label="0, 1, 2, 3, 4 and so on"><span>0</span>, 1, 2, 3, 4, …</p><p>Include <strong>zero</strong>, for when there are no objects.</p></div>
   </div>
   <p className="lesson-small-note">In this course, natural numbers start at 1. Both lists continue without end.</p>
  </section>

  <section className="lesson-neighbours" aria-labelledby="number-neighbours-title">
   <div><span className="lesson-kicker">Move along the numbers</span><h3 id="number-neighbours-title">One before. One after.</h3><p>Each step to the right adds 1. Try moving all the way back to zero.</p></div>
   <div className="lesson-neighbour-diagram" aria-live="polite" aria-atomic="true">
    <div><span>Predecessor</span><strong>{number===0?'—':number-1}</strong><small>{number===0?'No whole number before 0':'One less'}</small></div>
    <div className="lesson-current-number"><span>Your number</span><strong>{number}</strong><small>Whole number</small></div>
    <div><span>Successor</span><strong>{number+1}</strong><small>One more</small></div>
   </div>
   <div className="lesson-controls lesson-number-controls">
    <button type="button" onClick={()=>setNumber(n=>n-1)} disabled={number===0}><ArrowLeft aria-hidden="true"/>Move left</button>
    <button type="button" onClick={()=>setNumber(n=>n+1)} disabled={number>=999}><ArrowRight aria-hidden="true"/>Move right</button>
   </div>
   {number>=999&&<p className="lesson-small-note">This explorer stops at 999. Whole numbers keep going: the next is 1,000.</p>}
  </section>
 </>;
}

export default function ConceptLesson({topic,index}:{topic:BasicsTopic;index:number}){
 const concept=topic.concepts[index]||topic.concepts[0];
 const discoverZero=topic.slug==='numbers'&&index===0;
 return <div className="concept-lesson">
  <header className="lesson-opening">
   <span className="lesson-kicker">Concept {index+1} of {topic.concepts.length}</span>
   <h2>{concept.title}</h2>
   <p className="lesson-lead">{discoverZero?'Three shells, two shells, one shell… what number comes next?':<Tex>{concept.explain}</Tex>}</p>
  </header>
  {discoverZero?<DiscoverZero/>:<>
   <div className="lesson-picture-first"><TopicPicture slug={topic.slug} index={index} v={concept.visual}/></div>
   {!!concept.teaching?.length&&<section className="lesson-thinking" aria-label="Why it works"><span className="lesson-kicker">Why it works</span><ol>{concept.teaching.map((paragraph,i)=><li key={i}><span aria-hidden="true">{i+1}</span><p><Tex>{paragraph}</Tex></p></li>)}</ol></section>}
  </>}
  <section className="lesson-worked" aria-label="Worked example">
   <span className="lesson-kicker">Follow an example</span>
   {topic.slug==='numbers'&&index===2?<ComparingNumbers/>:concept.workedExamples?<WorkedExamples examples={concept.workedExamples}/>:<><h3>Let’s work it out</h3><ol className="lesson-worked-steps">{concept.steps.map((step,i)=><li key={i}><Tex>{step}</Tex></li>)}</ol></>}
  </section>
  <div className="lesson-takeaway"><strong>Take this with you</strong><p><Tex>{concept.remember}</Tex></p></div>
 </div>;
}
