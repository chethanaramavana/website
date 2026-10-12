'use client';
import { useEffect, useState } from 'react';
type Account={user_id:string;email:string;name:string;last_sign_in_ms:number|null;sign_in_count:number;last_seen_ms:number;teacher:boolean};
type Attempt={id:string;name:string;email:string;teacher:boolean;opened_at_ms:number;started_at_ms:number|null;last_seen_ms:number;submitted_at_ms:number|null;answered:number;paper:{title:string;free:boolean;total:number}|null};
type Data={now:number;accounts:Account[];attempts:Attempt[]};
const date=(n:number|null)=>n?new Date(n).toLocaleString('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'Not recorded yet';
export default function StudentActivity(){
  const[data,setData]=useState<Data|null>(null),[error,setError]=useState(''),[showTeachers,setShowTeachers]=useState(false);
  async function refresh(){try{const r=await fetch('/api/teacher/activity',{cache:'no-store'});if(!r.ok)throw Error('Activity could not be loaded. Please retry.');setData(await r.json());setError('');}catch(e){setError(e instanceof Error?e.message:'Activity unavailable.');}}
  useEffect(()=>{void refresh();const timer=setInterval(()=>{if(document.visibilityState==='visible')void refresh();},30000);return()=>clearInterval(timer);},[]);
  const accounts=(data?.accounts??[]).filter(a=>showTeachers||!a.teacher),attempts=(data?.attempts??[]).filter(a=>showTeachers||!a.teacher);
  const active=(n:number)=>Boolean(data&&data.now-n<120000);
  return <section className="student-activity-panel" aria-labelledby="student-activity-title"><header><div><h2 id="student-activity-title">Student activity</h2><p>Sign-ins and free or paid test activity · Times shown in IST</p></div><button type="button" onClick={()=>void refresh()}>Refresh activity</button></header>
    <p>Updates every 30 seconds. Active means the page checked in within the last two minutes; it does not confirm the student is answering. Records begin from this update.</p>
    {error&&<p role="alert">{error}</p>}
    <label className="activity-teacher-toggle"><input type="checkbox" checked={showTeachers} onChange={e=>setShowTeachers(e.target.checked)}/> Include teacher accounts</label>
    {!data&&!error?<p>Loading student activity…</p>:<>
      <h3>Test activity</h3>
      {!attempts.length?<p>No test activity recorded yet.</p>:<div className="activity-table-scroll"><table><thead><tr><th>Student</th><th>Test</th><th>Status</th><th>Progress</th><th>Started / opened</th><th>Last activity</th></tr></thead><tbody>{attempts.map(a=><tr key={a.id}><td>{a.name}{a.teacher?' (teacher)':''}<small>{a.email}</small></td><td>{a.paper?.title??'Test'}<small>{a.paper?.free?'Free':'Paid'}</small></td><td>{a.submitted_at_ms?'Submitted':active(a.last_seen_ms)?a.started_at_ms?'Taking test · active':'Test opened · active':a.started_at_ms?'Inactive · unfinished':'Opened · inactive'}</td><td>{a.answered} / {a.paper?.total??'—'} answered</td><td>{date(a.started_at_ms??a.opened_at_ms)}</td><td>{date(a.submitted_at_ms??a.last_seen_ms)}</td></tr>)}</tbody></table></div>}
      <h3>Sign-ins and recent visits</h3>
      {!accounts.length?<p>No student visits recorded yet. Existing signed-in students appear on their next page visit.</p>:<div className="activity-table-scroll"><table><thead><tr><th>Student</th><th>Latest sign-in</th><th>Sign-ins recorded</th><th>Last seen</th><th>Status</th></tr></thead><tbody>{accounts.map(a=><tr key={a.user_id}><td>{a.name}{a.teacher?' (teacher)':''}<small>{a.email}</small></td><td>{date(a.last_sign_in_ms)}</td><td>{a.sign_in_count}</td><td>{date(a.last_seen_ms)}</td><td>{active(a.last_seen_ms)?'Active recently':'Inactive'}</td></tr>)}</tbody></table></div>}
      <p className="activity-footnote">Showing up to 100 recent accounts and 100 recent test attempts. Participation is recorded automatically; this does not require teacher marking.</p>
    </>}
  </section>;
}
