const fs=require('node:fs'),assert=require('node:assert/strict'),ts=require('typescript'),katex=require('katex');
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {relationsPracticePaper:qs}=require('../lib/relations-practice-paper.ts');
assert.equal(qs.length,14);assert.equal(qs.reduce((s,q)=>s+q.marks,0),30);
let formulas=0;for(const q of qs){for(const s of [q.question,q.solution,...q.options||[]])for(const m of s.matchAll(/\$([^$]+)\$/g)){katex.renderToString(m[1],{throwOnError:true,strict:'error'});formulas++;}}
assert.deepEqual(qs.map(q=>q.number),Array.from({length:14},(_,i)=>i+1));
const pairs=[];for(const x of [1,2,3])for(const y of [2,4,6])if(x<y)pairs.push([x,y]);assert.equal(pairs.length,7);
for(let x=-9.9;x<10;x+=.2){if(Math.abs(x-Math.round(x))>1e-8)assert.equal(Math.floor(x)+Math.floor(-x),-1);}
for(const y of [-100,-3,0,1,1.99,2.01,3,100]){const x=(y+3)/(2-y);assert.notEqual(x,-1);assert(Math.abs((2*x-3)/(x+1)-y)<1e-8);}
const charge=m=>40+15*(Math.ceil(m)-1);assert.deepEqual([1,1.01,2,2.01,3,3.01,4].map(charge),[40,55,55,70,70,85,85]);
console.log(`PASS: 14 questions, 30 marks, ${formulas} valid KaTeX expressions; relation enumeration, floor identity, rational range and tariff boundaries checked.`);
