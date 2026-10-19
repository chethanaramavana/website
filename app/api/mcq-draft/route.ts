import {getRequestUser,getDatabase,sameOrigin,jsonError} from '@/lib/server';
import {hasMcqAccess} from '@/lib/mcq-access';
import {freeQuizzes} from '@/lib/free-quizzes';
import {emptyMcqDraft,type McqDraft} from '@/lib/mcq-draft';
export async function GET(request:Request){
 try{const user=await getRequestUser(request);if(!user)return jsonError('Please sign in again.',401);
 const quiz=freeQuizzes.find(q=>q.id===new URL(request.url).searchParams.get('quiz'));if(!quiz)return jsonError('Unknown quiz.',400);
 if(!await hasMcqAccess(user,quiz.chapter,quiz.grade))return jsonError('Unlock this quiz first.',403);
 const row=await getDatabase().prepare('SELECT state_json,revision FROM mcq_drafts WHERE user_id=? AND quiz_id=?').bind(user.userId,quiz.id).first<{state_json:string;revision:number}>();
 const state:McqDraft=row?JSON.parse(row.state_json):emptyMcqDraft();
 if(state.attemptId){const result=await getDatabase().prepare('SELECT answers_json FROM free_quiz_attempts WHERE id=? AND user_id=? AND quiz_id=?').bind(state.attemptId,user.userId,quiz.id).first<{answers_json:string}>();if(result){state.answers=JSON.parse(result.answers_json);state.submitted=true;}}
 return Response.json({state,revision:row?.revision||0},{headers:{'Cache-Control':'no-store'}});
 }catch{return jsonError('Could not load your answers. Retry before starting.',503);}
}
export async function POST(request:Request){
 if(!sameOrigin(request))return jsonError('Invalid origin.',403);
 try{const user=await getRequestUser(request);if(!user)return jsonError('Sign in again to save your answers.',401);
 const raw=await request.text();if(raw.length>10000)return jsonError('Draft too large.',400);const body=JSON.parse(raw);
 const quiz=freeQuizzes.find(q=>q.id===body.quizId);const s=body.state;
 if(!quiz||!Number.isInteger(body.revision)||body.revision<0||!s||typeof s.attemptId!=='string'||! /^[a-f0-9-]{36}$/i.test(s.attemptId)||!s.answers||typeof s.answers!=='object'||Array.isArray(s.answers))return jsonError('Invalid draft.',400);
 if(!await hasMcqAccess(user,quiz.chapter,quiz.grade))return jsonError('Unlock this quiz first.',403);
 const answers:Record<number,number>={};for(const [key,value] of Object.entries(s.answers)){const i=Number(key);if(!/^\d+$/.test(key)||i<0||i>=quiz.questions.length||!Number.isInteger(value)||Number(value)<0||Number(value)>=quiz.questions[i].options.length)return jsonError('Invalid answer.',400);answers[i]=Number(value);}
 const state:McqDraft={answers,attemptId:s.attemptId,submitted:s.submitted===true};
 if(state.submitted&&!(quiz.grade===12&&quiz.chapter===7)){const submitted=await getDatabase().prepare('SELECT answers_json FROM free_quiz_attempts WHERE id=? AND user_id=? AND quiz_id=?').bind(state.attemptId,user.userId,quiz.id).first<{answers_json:string}>();if(!submitted)return jsonError('Submit your test before saving its result.',400);state.answers=JSON.parse(submitted.answers_json);}
 const db=getDatabase();const result=body.revision===0?await db.prepare('INSERT INTO mcq_drafts (user_id,quiz_id,state_json,revision,updated_at_ms) VALUES (?,?,?,1,?) ON CONFLICT(user_id,quiz_id) DO NOTHING').bind(user.userId,quiz.id,JSON.stringify(state),Date.now()).run():await db.prepare('UPDATE mcq_drafts SET state_json=?,revision=revision+1,updated_at_ms=? WHERE user_id=? AND quiz_id=? AND revision=?').bind(JSON.stringify(state),Date.now(),user.userId,quiz.id,body.revision).run();
 if(!result.meta.changes)return jsonError('This quiz changed in another tab. Reload to continue with the latest saved answers.',409);
 return Response.json({revision:body.revision+1});
 }catch{return jsonError('Could not save online. Keep this page open and retry.',503);}
}
