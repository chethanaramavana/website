const fs=require('fs'),path=require('path'),ts=require('typescript'),vm=require('vm'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite');const sql=new DatabaseSync(':memory:');for(const f of fs.readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('drizzle/'+f,'utf8'));
const db={prepare(q){let a=[];return{bind(...args){a=args;return this},async run(){return sql.prepare(q).run(...a)},async first(){return sql.prepare(q).get(...a)||null},async all(){return{results:sql.prepare(q).all(...a)}}}}};
let user={userId:'alice',email:'alice@example.test',displayName:'Alice',fullName:null};
const server={getDatabase:()=>db,getRequestUser:async()=>user,isAdmin:u=>u.userId==='teacher',sameOrigin:r=>r.headers.get('origin')===new URL(r.url).origin,jsonError:(error,status)=>Response.json({error},{status})};
const activity={activityPaper:()=>null,recordPresence:async u=>{await db.prepare('INSERT INTO student_presence(user_id,email,name,last_seen_ms) VALUES (?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET last_seen_ms=excluded.last_seen_ms').bind(u.userId,u.email,u.displayName,Date.now()).run();}};
const cache={};function load(file){file=path.resolve(file);if(cache[file])return cache[file];const m={exports:{}};const requireTest=name=>{if(name==='@/lib/server')return server;if(name==='@/lib/student-activity')return activity;if(name==='@/lib/activity-page')return load('lib/activity-page.ts');if(name==='@/lib/identity')return{isTeacherEmail:e=>e==='teacher@example.test'};if(name.includes('catalog'))return{quizTitle:id=>id};if(name.endsWith('-access'))return{};throw Error(name)};const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInNewContext(code,{require:requireTest,module:m,exports:m.exports,Response,Request,URL,Date,console});return cache[file]=m.exports;}
const post=load('app/api/activity/route.ts').POST,get=load('app/api/teacher/activity/route.ts').GET;
const req=(body,origin='https://example.test')=>new Request('https://example.test/api/activity',{method:'POST',headers:{origin},body:JSON.stringify(body)});
(async()=>{
for(const path of ['//evil.example','https://evil.example','/api/auth/google','/notes/a?token=secret','/notes/a#secret','/notes/../teacher'])assert.equal((await post(req({kind:'presence',page:{path}}))).status,400);
assert.equal((await post(req({kind:'presence'},'https://evil.example'))).status,403);
assert.equal((await post(req({kind:'presence',page:{path:'/cbse/grade-10/ch-2/free-mcq',title:'Polynomials'}}))).status,204);
let a=sql.prepare('SELECT * FROM student_presence WHERE user_id=?').get('alice');assert.equal(a.last_page_title,'Polynomials');assert(a.last_page_seen_ms);assert.equal(a.sign_in_count,0);
await post(req({kind:'presence'}));a=sql.prepare('SELECT * FROM student_presence WHERE user_id=?').get('alice');assert.equal(a.last_page_title,'Polynomials','Old clients do not erase last view');
user={userId:'bob',email:'bob@example.test',displayName:'Bob'};await post(req({kind:'presence',userId:'alice',page:{path:'/notes/real-numbers',title:'Real Numbers'}}));assert.equal(sql.prepare('SELECT last_page_title FROM student_presence WHERE user_id=?').get('alice').last_page_title,'Polynomials');
assert.equal((await get(new Request('https://example.test/api/teacher/activity'))).status,403);
user=null;assert.equal((await post(req({kind:'presence'}))).status,401);
user={userId:'teacher',email:'teacher@example.test',displayName:'Teacher'};const response=await get(new Request('https://example.test/api/teacher/activity'));assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');const data=await response.json();assert.equal(data.accounts.length,2);assert(data.accounts.some(a=>a.email==='bob@example.test'&&a.last_page_path==='/notes/real-numbers'));
console.log('PASS: page storage, old-client compatibility, account isolation, unsafe URL rejection, origin checks, authentication and teacher-only activity access.');
})().catch(e=>{console.error(e);process.exitCode=1});
