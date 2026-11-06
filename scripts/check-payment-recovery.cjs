const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const {DatabaseSync}=require('node:sqlite');
const sql=new DatabaseSync(':memory:');
sql.exec(`CREATE TABLE payment_requests(id TEXT PRIMARY KEY,user_id TEXT,student_name TEXT,paper_id TEXT,transaction_id TEXT,amount_paise INTEGER,status TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP,reviewed_at TEXT); CREATE TABLE basics_progress(user_id TEXT,topic_slug TEXT,completed INTEGER);`);
function statement(query,args=[]){return {bind:(...a)=>statement(query,a),first:async()=>sql.prepare(query).get(...args)||null,all:async()=>({results:sql.prepare(query).all(...args)}),run:async()=>({meta:{changes:sql.prepare(query).run(...args).changes}})};}
const db={prepare:statement};
const user={userId:'alice',email:'alice@example.test',displayName:'Alice'};
const config={keyId:'rzp_live_example',keySecret:'test-only',testMode:false};
const server={getDatabase:()=>db,getRequestUser:async()=>user,isAdmin:()=>false,sameOrigin:()=>true,jsonError:(error,status)=>Response.json({error},{status})};
const razor={getRazorpayConfiguration:()=>config,isRazorpayTestUser:()=>false,razorpayAuthorization:()=> 'test-only'};
const cache={};
function load(file){file=path.resolve(file);if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));if(cache[file])return cache[file].exports;const m={exports:{}};cache[file]=m;const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;vm.runInThisContext('(function(require,module,exports){'+code+'\n})',{filename:file})(name=>{if(name==='@/lib/server'||name==='./server')return server;if(name==='@/lib/razorpay')return razor;if(name==='@/lib/assessment')return {getPaperAssessment:id=>id==='written'};let f=name.startsWith('@/')?path.resolve(name.slice(2)):path.resolve(path.dirname(file),name);return load(fs.existsSync(f)?f:f+'.ts');},m,m.exports);return m.exports;}
let lists={},calls=[];
global.fetch=async(url,opts={})=>{calls.push({url,opts});if(url.endsWith('/capture')){const id=/payments\/([^/]+)\/capture/.exec(url)[1];return Response.json(lists[id]);}if(url.endsWith('/v1/orders'))return Response.json({id:'order_created',amount:JSON.parse(opts.body).amount,currency:'INR'});const id=/orders\/([^/]+)\/payments/.exec(url)[1].replace(/^order_/,'');if(lists[id]==='error')return Response.json({error:{}},{status:502});return Response.json({items:lists[id]||[]});};
const insert=(id,paper,amount,status='pending',owner='alice',created='2026-01-01 00:00:00')=>sql.prepare('INSERT INTO payment_requests(id,user_id,paper_id,transaction_id,amount_paise,status,created_at) VALUES(?,?,?,?,?,?,?)').run(id,owner,paper,'order_'+id,amount,status,created);
const reset=()=>{sql.exec('DELETE FROM payment_requests');lists={};calls=[];};
const payment=(order,amount,status='captured',currency='INR')=>({id:'pay_'+order,order_id:'order_'+order,amount,status,currency});
const request=id=>new Request('https://example.test/api',{method:'POST',body:JSON.stringify({paperId:id,studentName:'Alice'})});
(async()=>{
 const {recoverPurchase}=load('lib/payment-recovery.ts');
 const {hasMcqAccess}=load('lib/mcq-access.ts'),{hasIntegralsAccess}=load('lib/integrals-access.ts'),{hasBasicsPackage}=load('lib/basics-access.ts');
 const order=load('app/api/razorpay/order/route.ts').POST,status=load('app/api/razorpay/status/route.ts').POST;
 insert('historical','cbse-10-ch-6-50',1000,'approved');assert(await hasMcqAccess(user,6));assert(!await hasMcqAccess({...user,userId:'bob'},6));
 insert('integral','integrals-pdf-board-01',1000,'approved');assert(await hasIntegralsAccess(user,'integrals-pdf-board-01'));
 insert('base','maths-basics-5-8',9000,'approved');insert('extension','maths-basics-9-10',11000,'approved');assert(await hasBasicsPackage(user));assert(await hasBasicsPackage(user,'extension'));
 reset();insert('pending','cbse-10-ch-6-50',2000);assert(!await hasMcqAccess(user,6));
 reset();insert('old','written',2500);insert('new','written',3000,'pending','alice','2026-02-01 00:00:00');lists.old=[payment('old',2500)];
 let r=await order(request('written'));assert.equal(r.status,200);assert((await r.json()).alreadyPaid);assert(!calls.some(c=>c.url.endsWith('/v1/orders')));assert.equal(sql.prepare("SELECT status FROM payment_requests WHERE id='old'").get().status,'approved');
 reset();insert('paidold','written',2500);insert('authnew','written',3000,'pending','alice','2026-02-01 00:00:00');lists.paidold=[payment('paidold',2500)];lists.authnew=[payment('authnew',3000,'authorized')];r=await status(request('written'));assert((await r.json()).approved);assert(!calls.some(c=>c.url.endsWith('/capture')));
 reset();insert('older','written',3000);insert('broken','written',3000,'pending','alice','2026-02-01 00:00:00');lists.broken='error';lists.older=[payment('older',3000)];assert((await recoverPurchase('alice','written',config)).approved);
 reset();insert('unverified','written',3000);lists.unverified='error';r=await order(request('written'));assert.equal(r.status,502);assert(!calls.some(c=>c.url.endsWith('/v1/orders')));
 reset();insert('auth','written',2500);lists.auth=[payment('auth',2500,'authorized')];r=await order(request('written'));assert.equal(r.status,502);assert(!calls.some(c=>c.url.endsWith('/capture')));lists.pay_auth=payment('auth',2500);r=await status(request('written'));assert((await r.json()).approved);assert.equal(JSON.parse(calls.find(c=>c.url.endsWith('/capture')).opts.body).amount,2500);
 for(const bad of [payment('bad',2999),payment('bad',3000,'captured','USD'),payment('other',3000),payment('bad',3000,'failed')]){reset();insert('bad','written',3000);lists.bad=[bad];if(bad.status==='captured')await assert.rejects(()=>recoverPurchase('alice','written',config));else assert(!(await recoverPurchase('alice','written',config)).approved);}
 reset();insert('foreign','written',3000,'pending','bob');lists.foreign=[payment('foreign',3000)];assert(!(await recoverPurchase('alice','written',config)).approved);assert.equal(calls.length,0);
 reset();insert('approved','written',1000,'approved');r=await order(request('written'));assert((await r.json()).alreadyPaid);assert.equal(calls.length,0);
 reset();r=await order(request('written'));assert.equal((await r.json()).amount,3000);assert.equal(calls.filter(c=>c.url.endsWith('/v1/orders')).length,1);
 console.log('PASS: historical prices retain MCQ, integrals and package access; unapproved/other-user purchases denied; older captured orders recovered before checkout; lookup failures and outstanding authorisations block repayment; capture uses original amount; amount/currency/order mismatches denied; new orders keep current price.');
})().catch(e=>{console.error(e);process.exitCode=1});
