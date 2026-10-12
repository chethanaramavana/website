'use client';
import { useEffect, useRef } from 'react';

async function sendActivity(body: object) {
  try { return (await fetch('/api/activity',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),keepalive:true})).status; } catch { return 0; }
}

export default function StudentPresence() {
  useEffect(()=>{
    let stopped=false;
    const ping=async()=>{if(stopped || document.visibilityState!=='visible')return;const status=await sendActivity({kind:'presence'});if(status===401)stopped=true;};
    void ping();const timer=window.setInterval(()=>void ping(),30000);
    document.addEventListener('visibilitychange',ping);
    return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',ping);};
  },[]);
  return null;
}

export function useTestActivity(paperId:string,answered:number,submitted:boolean,started=false) {
  const latest=useRef({answered,submitted,started});latest.current={answered,submitted,started};
  const attempt=useRef<{id:string;paperId:string;completed:boolean}|null>(null);
  const began=answered>0||started;
  useEffect(()=>{
    if(!attempt.current || attempt.current.paperId!==paperId || (attempt.current.completed&&!submitted))attempt.current={id:crypto.randomUUID(),paperId,completed:false};
    if(submitted)attempt.current.completed=true;
    const id=attempt.current.id;
    let stopped=false;
    const ping=async()=>{
      if(stopped || (document.visibilityState!=='visible'&&!latest.current.submitted))return;
      const value=latest.current;
      const status=await sendActivity({kind:'test',id,paperId,answered:value.answered,state:value.submitted?'submitted':value.answered>0||value.started?'started':'opened'});
      if(status===401||status===403)stopped=true;
      if(status===204&&value.submitted){if(attempt.current?.id===id)attempt.current.completed=true;stopped=true;}
    };
    void ping();const timer=window.setInterval(()=>void ping(),30000);
    document.addEventListener('visibilitychange',ping);
    return()=>{stopped=true;clearInterval(timer);document.removeEventListener('visibilitychange',ping);};
  },[paperId,submitted,began]);
}
