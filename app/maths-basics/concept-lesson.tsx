'use client';

import {basicsStories} from '@/lib/basics-stories';
import NumberStories from './number-stories';
import FacePlaceValue from './face-place-value';
import ComparisonLab from './comparison-lab';
import MultiplicationGarden from './multiplication-garden';
import {MultiplicationSplit,MultiplicationWritten} from './multiplication-place';
import type {BasicsTopic} from '@/lib/basics-types';
import TopicPicture from './topic-picture';
import ComparingNumbers from './comparing-numbers';
import WorkedExamples from './worked-examples';
import Tex from './math-text';
import DivisionStories from './division-stories';
import FactorPairs from './factor-pairs';

export default function ConceptLesson({topic,index}:{topic:BasicsTopic;index:number}){
 const concept=topic.concepts[index]||topic.concepts[0];
 const discoverZero=topic.slug==='numbers'&&index===0;
 const story=basicsStories[topic.slug]?.[index];
 if(topic.slug==='multiplication-division'&&index===2)return <div className="concept-lesson"><header className="lesson-opening"><span className="lesson-kicker">Concept {index+1} of {topic.concepts.length}</span><h2>{concept.title}</h2></header><DivisionStories/></div>;
 return <div className="concept-lesson">
  <header className="lesson-opening">
   <span className="lesson-kicker">Concept {index+1} of {topic.concepts.length}</span>
   <h2>{concept.title}</h2>
   {!discoverZero&&!story&&<p className="lesson-lead"><Tex>{concept.explain}</Tex></p>}
  </header>
  {discoverZero?<NumberStories/>:<>
   {story&&<section className="lesson-story-opening" aria-label="A story to start"><h3>{story.title}</h3><p><Tex>{story.scene}</Tex></p></section>}
   {!(topic.slug==='factors-multiples'&&index===0)&&<div className="lesson-picture-first"><TopicPicture slug={topic.slug} index={index} v={concept.visual}/></div>}
   {story&&<><div className="lesson-story-question"><strong>What do you think?</strong><p><Tex>{story.question}</Tex></p></div><section className="lesson-story-bridge" aria-label="Connect the story to the maths"><span className="lesson-kicker">Connect the story to the maths</span><p><Tex>{concept.explain}</Tex></p></section></>}
   {topic.slug==='numbers'&&index===1&&<FacePlaceValue/>}
   {topic.slug==='factors-multiples'&&index===0?<FactorPairs/>:topic.slug==='numbers'&&index===2?<ComparisonLab/>:topic.slug==='multiplication-division'&&index===1?<MultiplicationSplit/>:!!concept.teaching?.length&&<section className="lesson-thinking" aria-label="Why it works"><span className="lesson-kicker">Why it works</span><ol>{concept.teaching.map((paragraph,i)=><li key={i}><span aria-hidden="true">{i+1}</span><p><Tex>{paragraph}</Tex></p></li>)}</ol></section>}
  </>}
  {!discoverZero&&<><section className="lesson-worked" aria-label="Worked example">
   {topic.slug==='multiplication-division'&&index===0?<MultiplicationGarden/>:topic.slug==='multiplication-division'&&index===1?<MultiplicationWritten/>:topic.slug==='numbers'&&index===2?<ComparingNumbers/>:concept.workedExamples?<WorkedExamples examples={concept.workedExamples}/>:<><h3>Let’s work it out</h3><ol className="lesson-worked-steps">{concept.steps.map((step,i)=><li key={i}><Tex>{step}</Tex></li>)}</ol></>}
  </section>
  <div className="lesson-takeaway"><strong>Take this with you</strong><p><Tex>{concept.remember}</Tex></p></div></>}
 </div>;
}
