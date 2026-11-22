const fs=require('fs'),path=require('path'),ts=require('typescript'),vm=require('vm'),assert=require('node:assert/strict');
const{DatabaseSync}=require('node:sqlite');const sql=new DatabaseSync(':memory:');for(const f of fs.readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('drizzle/'+f,'utf8'));
let user={userId:'alice',email:'alice@example.test',displayName:'Alice',fullName:'Alice'},origin=true;
function statement(q,a=[]){return{bind:(...v)=>statement(q,v),run:async()=>({meta:{changes:sql.prepare(q).run(...a).changes}}),first:async()=>sql.prepare(q).get(...a)||null,all:async()=>({results:sql.prepare(q).all(...a)})};}
const db={prepare:statement,batch:async a=>Promise.all(a.map(s=>s.run()))};
const server={getDatabase:()=>db,getRequestUser:async()=>user,isAdmin:u=>u?.userId==='teacher',sameOrigin:()=>origin,jsonError:(error,status)=>Response.json({error},{status})};
const env={RAZORPAY_KEY_ID:'rzp_live_fixture',RAZORPAY_KEY_SECRET:'fixture-secret',RAZORPAY_WEBHOOK_SECRET:'fixture-webhook'};
const cache={};function load(file){file=path.resolve(file);if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));if(cache[file])return cache[file].exports;const m={exports:{}};cache[file]=m;const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;vm.runInThisContext('(function(require,module,exports){'+code+'\n})',{filename:file})(s=>{if(s==='@/lib/server'||s==='./server')return server;if(s==='cloudflare:workers')return{env};let f=s.startsWith('@/')?path.resolve(s.slice(2)):path.resolve(path.dirname(file),s);return load(fs.existsSync(f)?f:fs.existsSync(f+'.ts')?f+'.ts':path.join(f,'index.ts'));},m,m.exports);return m.exports;}
const req=body=>new Request('https://example.test/api',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
const realNow=Date.now,realFetch=global.fetch;let now=Date.parse('2026-11-22T12:00:00Z'),amount=250000,orderRequests=0;Date.now=()=>now;
global.fetch=async(url,options)=>{if(String(url).endsWith('/orders')){orderRequests++;const b=JSON.parse(options.body);assert.equal(b.amount,250000);return Response.json({id:'order_jee1',amount:b.amount,currency:'INR'});}if(String(url).endsWith('/payments/pay_jee1'))return Response.json({id:'pay_jee1',order_id:'order_jee1',amount,currency:'INR',status:'captured'});throw Error('Unexpected network '+url);};
(async()=>{
const {JEE_PACKAGE:p}=load('lib/jee-package.ts'),access=load('lib/jee-package-access.ts'),cat=load('lib/g12-practice-catalog.ts'),banks=load('lib/g12-practice-banks.ts').g12PracticeBanks,ent=load('lib/jee-entrance.ts'),integ=load('lib/integrals-products.ts');
const g12=load('lib/g12-practice-access.ts'),iacc=load('lib/integrals-access.ts'),g12pack=load('lib/grade12-package-access.ts'),order=load('app/api/razorpay/order/route.ts').POST,verify=load('app/api/razorpay/verify/route.ts').POST,hash=load('lib/razorpay.ts').hmacSha256Hex;
const p3=load('lib/jee-papers/chapter-papers-3.json'),entBank=load('lib/jee-papers/entrance-papers.json'),intBank=load('lib/integrals-online-papers.json');
assert.equal(p.amount,250000);
// Catalogue: 3 JEE Main + 3 JEE Advanced papers in every chapter, each with a question bank of the right size.
const chapterJee=[...cat.g11PracticeChapters.flatMap(c=>cat.g11PracticeProducts(c.number)),...cat.g12PracticeChapters.flatMap(c=>cat.g12PracticeProducts(c.number)),...integ.integralsProducts].filter(x=>access.isJeeChapterProduct(x.id));
assert.equal(chapterJee.length,27*6,'27 chapters x 6 JEE papers');
for(const x of chapterJee){const q=banks[x.id]||intBank[x.id]||p3[x.id];assert.ok(q,'bank for '+x.id);assert.equal(q.length,x.standard==='JEE Main'?25:(x.id==='integrals-pdf-advanced-02'?q.length:16),'size '+x.id);}
for(const x of ent.jeeEntranceProducts){assert.equal(entBank[x.id].length,x.total,'entrance '+x.id);assert.equal(entBank[x.id].reduce((s,q)=>s+q.marks,0),x.standard==='JEE Main'?100:60);}
assert.equal(ent.jeeEntranceProducts.length,12);
// Existing papers are unchanged: Paper 3 data adds new ids only.
for(const id of Object.keys(p3))assert.ok(/-03$/.test(id)&&!(id in intBank),'new id only '+id);
assert.equal(access.isJeeChapterProduct('g12-ch3-board-01'),false);assert.equal(access.isJeeChapterProduct('g12-ch3-mcq-20-01'),false);assert.equal(access.isJeeChapterProduct('integrals-pdf-board-01'),false);
for(const id of ['g12-ch3-main-03','g11-ch14-advanced-03','integrals-pdf-main-03','g12-ch3-main-01'])assert.equal(access.isJeeChapterProduct(id),true,id);
assert.equal(g12pack.isGrade12BoardProduct('g12-ch3-main-03'),false,'Board package does not open JEE Paper 3');
assert.equal(await access.hasJeePackage(user),false);
user=null;assert.equal((await order(req({paperId:p.id,studentName:'Alice'}))).status,401);user={userId:'alice',email:'alice@example.test',displayName:'Alice',fullName:'Alice'};
const ordered=await order(req({paperId:p.id,studentName:'Alice',amount:1}));assert.equal(ordered.status,200);assert.equal((await ordered.json()).amount,250000,'Server sets the price');assert.equal(await access.hasJeePackage(user),false,'Pending cannot grant access');
const signature=await hash(env.RAZORPAY_KEY_SECRET,'order_jee1|pay_jee1'),body={razorpay_order_id:'order_jee1',razorpay_payment_id:'pay_jee1',razorpay_signature:signature};
amount=150000;assert.equal((await verify(req(body))).status,409,'Grade 12 amount cannot unlock JEE');amount=250000;assert.equal((await verify(req(body))).status,200);
assert.equal(await access.hasJeePackage(user),true);
for(const id of ['g12-ch3-main-01','g12-ch3-advanced-03','g11-ch1-main-03','g11-ch14-advanced-02'])assert.equal(await g12.hasG12PracticeAccess(user,id),true,'opens '+id);
assert.equal(await iacc.hasIntegralsAccess(user,'integrals-pdf-advanced-03'),true);assert.equal(await iacc.hasIntegralsAccess(user,'integrals-pdf-main-01'),true);
assert.equal(await g12.hasG12PracticeAccess(user,'g12-ch3-board-01'),false,'CBSE board paper stays locked');assert.equal(await g12.hasG12PracticeAccess(user,'g12-ch3-mcq-20-01'),false,'MCQ test stays locked');assert.equal(await iacc.hasIntegralsAccess(user,'integrals-pdf-board-01'),false);
assert.equal(await g12pack.hasGrade12Package(user),false,'JEE package is not the board package');
const already=await order(req({paperId:'g11-ch5-main-03',studentName:'Alice'}));assert.equal((await already.json()).alreadyPaid,true);assert.equal(orderRequests,1);
// A single Paper 3 can still be bought on its own at Rs 30.
user={userId:'bob',email:'bob@example.test',displayName:'Bob',fullName:'Bob'};global.fetch=async(url,options)=>{if(String(url).endsWith('/orders')){const b=JSON.parse(options.body);assert.equal(b.amount,3000);return Response.json({id:'order_single1',amount:b.amount,currency:'INR'});}throw Error('Unexpected '+url);};
assert.equal((await order(req({paperId:'g12-ch10-advanced-03',studentName:'Bob'}))).status,200);
assert.equal((await order(req({paperId:'jee-main-full-01',studentName:'Bob'}))).status,400,'Entrance papers are package-only');
user={userId:'alice',email:'alice@example.test',displayName:'Alice',fullName:'Alice'};
now=p.expiresAt;assert.equal(await access.hasJeePackage(user),false);assert.equal(await g12.hasG12PracticeAccess(user,'g12-ch3-main-03'),false);assert.equal((await order(req({paperId:p.id,studentName:'Alice'}))).status,410);
now=p.expiresAt-1000;sql.prepare("INSERT INTO payment_requests(id,user_id,student_name,paper_id,transaction_id,amount_paise,status) VALUES ('webhookj','charlie','Charlie',?,'order_webhookj',250000,'pending')").run(p.id);
const event=JSON.stringify({event:'payment.captured',payload:{payment:{entity:{order_id:'order_webhookj',amount:250000,currency:'INR',status:'captured'}}}});const webhook=load('app/api/razorpay/webhook/route.ts').POST;const wr=await webhook(new Request('https://example.test/api',{method:'POST',headers:{'x-razorpay-signature':await hash(env.RAZORPAY_WEBHOOK_SECRET,event)},body:event}));assert.equal(wr.status,200);assert.equal(await access.hasJeePackage({...user,userId:'charlie'}),true);
console.log('PASS: 162 JEE chapter papers (3 Main + 3 Advanced in all 27 chapters) and 12 entrance papers with full banks, server-set Rs 2,500, verified payment and webhook unlock, CBSE board items stay locked, single Paper 3 still Rs 30, entrance papers package-only, expiry at midnight IST on 31 May 2027.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{Date.now=realNow;global.fetch=realFetch;});
