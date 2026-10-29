const fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),vm=require('node:vm'),assert=require('node:assert/strict');
let teacher=true,origin=true,file=true;const objects=new Map();let counter=0;
const server={getRequestUser:async()=>teacher?{role:'teacher'}:{role:'student'},isAdmin:u=>u.role==='teacher',sameOrigin:()=>origin,jsonError:(error,status)=>Response.json({error},{status}),getDatabase:()=>({prepare:()=>({bind:(fileId,submissionId)=>({first:async()=>file&&((fileId==='file-1'&&submissionId==='submission-1')||(fileId==='file-2'&&submissionId==='submission-2'))?{id:fileId}:null})})}),getBucket:()=>({get:async key=>{const obj=objects.get(key);return obj?{etag:obj.etag,json:async()=>JSON.parse(obj.body)}:null;},put:async(key,body,options)=>{const prev=objects.get(key);if(options.onlyIf.etagDoesNotMatch==='*'&&prev)return null;if(options.onlyIf.etagMatches&&prev?.etag!==options.onlyIf.etagMatches)return null;const etag=String(++counter).padStart(32,'0');objects.set(key,{body,etag});return{etag};}})};
const cache={};function load(file){file=path.resolve(file);if(cache[file])return cache[file].exports;const m={exports:{}};cache[file]=m;const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;vm.runInThisContext('(function(require,module,exports){'+code+'\n})',{filename:file})(s=>s==='@/lib/server'?server:load(path.resolve(s.replace('@/', ''))+'.ts'),m,m.exports);return m.exports;}
const route=load('app/api/teacher/submissions/[id]/files/[fileId]/annotations/route.ts');const ctx={params:Promise.resolve({id:'submission-1',fileId:'file-1'})};
const get=()=>new Request('https://example.test/api');const put=payload=>new Request('https://example.test/api',{method:'PUT',body:JSON.stringify(payload)});
const document={version:1,annotations:[{id:'tick-1',page:2,kind:'tick',points:[{x:.4,y:.6}]}]};
(async()=>{
 teacher=false;assert.equal((await route.GET(get(),ctx)).status,403);assert.equal((await route.PUT(put({document,revision:null}),ctx)).status,403);teacher=true;
 origin=false;assert.equal((await route.PUT(put({document,revision:null}),ctx)).status,403);origin=true;
 assert.equal((await route.GET(get(),{params:Promise.resolve({id:'submission-2',fileId:'file-1'})})).status,404);
 file=false;assert.equal((await route.GET(get(),ctx)).status,404);file=true;
 assert.deepEqual((await(await route.GET(get(),ctx)).json()).document,{version:1,annotations:[]});
 let r=await route.PUT(put({document,revision:null}),ctx);assert.equal(r.status,200);const revision=(await r.json()).revision;
 assert.deepEqual((await(await route.GET(get(),ctx)).json()).document,document);
 assert.equal((await route.PUT(put({document,revision:null}),ctx)).status,409);
 const updated={version:1,annotations:[...document.annotations,{id:'note',page:1,kind:'comment',points:[{x:.1,y:.2}],text:'Check your domain.'}]};
 assert.equal((await route.PUT(put({document:updated,revision}),ctx)).status,200);
 assert.equal((await route.PUT(put({document,revision}),ctx)).status,409);
 for(const invalid of [{...document,version:2},{version:1,annotations:[{...document.annotations[0],page:0}]},{version:1,annotations:[{...document.annotations[0],points:[{x:2,y:0}]}]},{version:1,annotations:[{...document.annotations[0],kind:'comment',text:'x'.repeat(241)}]}])assert.equal((await route.PUT(put({document:invalid,revision:null}),ctx)).status,400);
 const other={params:Promise.resolve({id:'submission-2',fileId:'file-2'})};assert.deepEqual((await(await route.GET(get(),other)).json()).document.annotations,[]);
 console.log('PASS: teacher-only annotations, origin checks, file ownership binding, persistence, file isolation, conflict protection, coordinate and size validation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
