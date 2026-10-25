// Render the actual lesson components, not a parallel set of example formulas.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),assert=require('node:assert/strict'),ts=require('typescript');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..'),resolve=Module._resolveFilename;
Module._resolveFilename=function(name,parent,...rest){let target=name.startsWith('@/')?path.join(root,name.slice(2)):name;if(name.startsWith('@/'))for(const ext of ['.tsx','.ts'])if(fs.existsSync(target+ext)){target+=ext;break;}return resolve.call(this,target,parent,...rest);};
require.extensions['.css']=()=>{};
for(const extension of ['.ts','.tsx'])require.extensions[extension]=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);
const Lesson=require('../app/maths-basics/concept-lesson.tsx').default;
const {investigationTopics}=require('../app/maths-basics/labs/investigation-lab.tsx');
const topics=require('../lib/math-basics-content.json');
let rendered=0,investigations=0;
for(const topic of topics)for(let index=0;index<topic.concepts.length;index++){
 let html;try{html=renderToStaticMarkup(React.createElement(Lesson,{topic,index}));}catch(e){throw Error(`${topic.slug}/${index}: ${e.message}`,{cause:e});}
 assert(!html.includes('katex-error'),`${topic.slug}/${index}: invalid maths`);
 assert(!/\b(?:NaN|Infinity)\b/.test(html),`${topic.slug}/${index}: non-finite result`);
 assert(html.includes('<svg')||html.includes('lab-cells')||html.includes('lab-dots')||html.includes('lab-base-ten')||html.includes('lab-factor-tree')||html.includes('lab-calendar')||html.includes('lab-money-columns')||html.includes('lab-root-tiles')||html.includes('lab-mystery-boxes')||html.includes('lab-unit-grid')||html.includes('lab-receipts')||html.includes('lab-progression')||html.includes('lab-data-chart')||html.includes('lab-signed-pieces')||html.includes('lab-ribbon')||html.includes('lab-price-strip')||html.includes('lab-two'),`${topic.slug}/${index}: missing visual`);
 if(investigationTopics[topic.slug]){assert(html.includes('why-lab'),`${topic.slug}/${index}: missing investigation`);assert(html.includes('What does the picture tell us?'),`${topic.slug}/${index}: missing reasoning`);investigations++;}
 assert(html.includes('type="range"')||html.includes('type="button"'),`${topic.slug}/${index}: missing interaction`);
 rendered++;
}
assert.equal(rendered,66);assert.equal(investigations,60);
console.log(`PASS: ${rendered} actual concept views rendered, including ${investigations} new investigations; visual, interaction, reasoning, finite values and KaTeX checks passed.`);
