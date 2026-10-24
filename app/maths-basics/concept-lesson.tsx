'use client';

import {basicsStories} from '@/lib/basics-stories';
import NumberStories from './number-stories';
import type {BasicsTopic} from '@/lib/basics-types';
import TopicPicture from './topic-picture';
import ComparingNumbers from './comparing-numbers';
import WorkedExamples from './worked-examples';
import Tex from './math-text';

export default function ConceptLesson({topic,index}:{topic:BasicsTopic;index:number}){
 const concept=topic.concepts[index]||topic.concepts[0];
 const discoverZero=topic.slug==='numbers'&&index===0;
 const story=basicsStories[topic.slug]?.[index];
 return <div className="concept-lesson">
  <header className="lesson-opening">
   <span className="lesson-kicker">Concept {index+1} of {topic.concepts.length}</span>
   <h2>{concept.title}</h2>
   {discoverZero?<p className="lesson-lead">Count with Asha. Then discover a number for an empty basket—and visit the house next door.</p>:!story&&<p className="lesson-lead"><Tex>{concept.explain}</Tex></p>}
  </header>
  {discoverZero?<NumberStories/>:<>
   {story&&<section className="lesson-story-opening" aria-label="A story to start"><span className="lesson-kicker">Start with a story</span><h3>{story.title}</h3><p><Tex>{story.scene}</Tex></p></section>}
   <div className="lesson-picture-first"><TopicPicture slug={topic.slug} index={index} v={concept.visual}/></div>
   {story&&<><div className="lesson-story-question"><strong>What do you think?</strong><p><Tex>{story.question}</Tex></p></div><section className="lesson-story-bridge" aria-label="Connect the story to the maths"><span className="lesson-kicker">Connect the story to the maths</span><p><Tex>{concept.explain}</Tex></p></section></>}
   {!!concept.teaching?.length&&<section className="lesson-thinking" aria-label="Why it works"><span className="lesson-kicker">Why it works</span><ol>{concept.teaching.map((paragraph,i)=><li key={i}><span aria-hidden="true">{i+1}</span><p><Tex>{paragraph}</Tex></p></li>)}</ol></section>}
  </>}
  <section className="lesson-worked" aria-label="Worked example">
   <span className="lesson-kicker">Follow an example</span>
   {discoverZero?<><h3>Follow Asha’s numbers</h3><ol className="lesson-worked-steps"><li><Tex>{'She counts the five stars: 1, 2, 3, 4, 5. These belong to the natural numbers.'}</Tex></li><li><Tex>{'She shares all three mangoes: 3 − 1 − 1 − 1 = 0. Zero belongs to the whole numbers.'}</Tex></li><li><Tex>{'At house 9, one before is 9 − 1 = 8; one after is 9 + 1 = 10.'}</Tex></li></ol></>:topic.slug==='numbers'&&index===2?<ComparingNumbers/>:concept.workedExamples?<WorkedExamples examples={concept.workedExamples}/>:<><h3>Let’s work it out</h3><ol className="lesson-worked-steps">{concept.steps.map((step,i)=><li key={i}><Tex>{step}</Tex></li>)}</ol></>}
  </section>
  <div className="lesson-takeaway"><strong>Take this with you</strong><p><Tex>{concept.remember}</Tex></p></div>
 </div>;
}
