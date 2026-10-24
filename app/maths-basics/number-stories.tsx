'use client';

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
   <div><h4>These are the natural numbers.</h4><p>We use them to count stars, fingers, books and many other things. We write their family as <strong>ℕ</strong>.</p><p className="lesson-sequence"><Tex>{'$\\mathbb{N}=\\{1,2,3,\\ldots\\}$'}</Tex></p><p className="lesson-small-note">Try your own hand: 1, 2, 3, 4, 5. Natural numbers keep going—there is no last one.</p></div>
   <FiveFingers/>
  </div>
 </section>;
}

function House({number,current=false}:{number:number|null;current?:boolean}){
 return <svg viewBox="0 0 160 160" aria-hidden="true" className="story-house">
  {number===null?<><path d="M15 145H145" stroke="#c9d2df" strokeWidth="2" strokeDasharray="5 5"/><text x="80" y="105" textAnchor="middle" fill="#4e5b70" fontSize="30">—</text></>:<>
   <path d="M20 65H140V145H20Z" fill={current?'#f4e0ae':'#f4f6f9'} stroke="#011e47" strokeWidth="2"/>
   <path d="M9 65 80 10 151 65Z" fill={current?'#011e47':'#e4eaf1'} stroke="#011e47" strokeWidth="2"/>
   <rect x="54" y="88" width="52" height="57" rx="3" fill="#fff" stroke="#011e47" strokeWidth="2"/>
   <text x="80" y="123" textAnchor="middle" fill="#011e47" fontSize="28">{number}</text>
  </>}
 </svg>;
}

export default function NumberStories(){
 const [count,setCount]=useState(3);
 const [number,setNumber]=useState(9);
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
   <p className="lesson-small-note">In this course, natural numbers start at 1, and we use W for whole numbers. Both families continue without end.</p>
  </section>
  <section className="number-story lesson-neighbours" aria-labelledby="street-story-title">
   <span className="lesson-kicker">3 · A walk along Asha’s street</span>
   <h3 id="street-story-title">Who lives just before? Who lives just after?</h3>
   <p>Asha starts at house 9. Her friend just before her is at house 8. One house after hers is house 10. In our story, the street starts at house 0 and the numbers increase to the right.</p>
   <p>Walk with Asha: the number <strong>just before</strong> is the <strong>predecessor</strong>. The number <strong>just after</strong> is the <strong>successor</strong>.</p>
   <div className="lesson-neighbour-diagram story-street" aria-live="polite" aria-atomic="true">
    <div><span>Predecessor</span><House number={number===0?null:number-1}/><strong className="sr-only">{number===0?'None':number-1}</strong><small>{number===0?'No whole number before 0':'One less'}</small></div>
    <div className="lesson-current-number"><span>Asha is here</span><House number={number} current/><strong className="sr-only">{number}</strong><small>Her number now</small></div>
    <div><span>Successor</span><House number={number+1}/><strong className="sr-only">{number+1}</strong><small>One more</small></div>
   </div>
   <p className="story-street-status" aria-live="polite">{number===0?'Asha has reached house 0. There is no house before it on this whole-number street.':`Asha is at ${number}. Her predecessor is ${number-1}; her successor is ${number+1}.`}</p>
   <div className="lesson-controls lesson-number-controls">
    <button type="button" onClick={()=>setNumber(n=>n-1)} disabled={number===0}><ArrowLeft aria-hidden="true"/>Walk left</button>
    <button type="button" onClick={()=>setNumber(n=>n+1)} disabled={number>=999}><ArrowRight aria-hidden="true"/>Walk right</button>
   </div>
   {number>=999&&<p className="lesson-small-note">This picture explorer stops at 999. The whole numbers keep going: the next is 1,000.</p>}
  </section>
 </>;
}
