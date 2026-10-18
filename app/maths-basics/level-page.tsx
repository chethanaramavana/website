import {notFound} from 'next/navigation';
import {getGoogleUser,googleSignInPath} from '@/app/google-auth';
import {getDatabase,isAdmin} from '@/lib/server';
import {hasBasicsPackage,basicsCompleted} from '@/lib/basics-access';
import {getBasicsCourse,getBasicsProduct,basicsLevelPath} from '@/lib/basics-catalog';
import topics from '@/lib/math-basics-content.json';
import type {BasicsTopic} from '@/lib/basics-types';
import Checkout from '@/app/cbse/grade-12/integrals/checkout';
import FirstTopic from './first-topic';
export default async function LevelPage({slug,courseId='foundations',preview=false}:{slug:string;courseId?:string;preview?:boolean}){
 const course=getBasicsCourse(courseId);if(!course)notFound();const levelIndex=(course.topics as readonly string[]).indexOf(slug);const topic=topics.find(t=>t.slug===slug) as BasicsTopic|undefined;if(levelIndex<0||!topic)notFound();const user=await getGoogleUser();const path=basicsLevelPath(courseId,slug);const previous=topics.find(t=>t.slug===course.topics[levelIndex-1]);
 if(!user)return <section className="basics-entry"><p className="basics-label">{course.title} · Level {levelIndex+1}{levelIndex===0?' · Free':''}</p><h1>{topic.title}</h1><p>Sign in to save your answers and continue from where you stop.</p><a className="basics-button" href={googleSignInPath(path)}>Sign in to continue</a></section>;
 try{const teacherPreview=preview&&isAdmin(user);
  if(levelIndex>0&&!teacherPreview){
   if(!await basicsCompleted(user,previous!.slug))return <section className="basics-entry"><h1>One level at a time</h1><p>Complete Level {levelIndex}: {previous!.title}, then continue here.</p><a className="basics-button" href={basicsLevelPath(courseId,previous!.slug)}>Continue Level {levelIndex} →</a></section>;
   if(!await hasBasicsPackage(user,course.tier)){const base=await hasBasicsPackage(user);const product=getBasicsProduct(course.tier==='base'?'maths-basics-5-8':base?'maths-basics-9-10':'maths-basics-all')!;return <section className="basics-entry"><p className="basics-label">Your progress is saved ✓</p><h1>Continue to Level {levelIndex+1}</h1><h2>{topic.title}</h2><p>{product.title}</p><p className="basics-price">₹{product.amount/100} <small>{product.id==='maths-basics-all'?'₹150 for Grades 5–8 + ₹200 for Grades 9–10':product.id==='maths-basics-9-10'?'One-time extension to your Grades 5–8 package':'One payment for the Grades 5–7 and Grade 8 folders'}</small></p><Checkout id={product.id} amount={product.amount} title={product.title} name={user.displayName} email={user.email}/><p><a href={basicsLevelPath(courseId,course.topics[0])}>Review the free level</a></p>{isAdmin(user)&&<p><a href={`${path}?preview=teacher`}>Teacher preview</a></p>}</section>;}
  }
  await getDatabase().prepare('SELECT revision FROM basics_progress WHERE user_id=? AND topic_slug=?').bind(user.userId,slug).first();const next=topics.find(t=>t.slug===course.topics[levelIndex+1]);
  return <>{teacherPreview&&<p className="basics-label">Teacher preview</p>}<FirstTopic key={`${courseId}-${slug}`} topic={topic} courseId={courseId} userId={user.userId} level={levelIndex+1} next={next?{slug:next.slug,title:next.title}:null}/></>;
 }catch{return <section><h1>Your progress is temporarily unavailable</h1><p>Please reload this page before continuing or paying. Your saved work has not been reset.</p></section>;}
}
