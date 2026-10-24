// Verify the catalogue has no story gaps and new prose typesets valid maths.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const ts=require('typescript');
const katex=require('katex');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const root=path.join(__dirname,'..');
const topics=JSON.parse(fs.readFileSync(path.join(root,'lib/math-basics-content.json'),'utf8'));
const {basicsStories}=require('../lib/basics-stories.ts');
const {basicsMathText}=require('../lib/basics-math-notation.ts');
assert.deepEqual(Object.keys(basicsStories).sort(),topics.map(t=>t.slug).sort(),'Stories must follow the current topic catalogue.');
let total=0;
for(const topic of topics){
 const stories=basicsStories[topic.slug];
 assert.equal(stories.length,topic.concepts.length,`Missing or extra story in ${topic.slug}`);
 for(const [index,story]of stories.entries()){
  for(const field of ['title','scene','question']){
   assert.equal(typeof story[field],'string',`${topic.slug}/${index}: missing ${field}`);
   assert.ok(story[field].trim(),`${topic.slug}/${index}: empty ${field}`);
   for(const match of basicsMathText(story[field]).matchAll(/\$([^$]+)\$/g))katex.renderToString(match[1],{throwOnError:true,strict:'error'});
  }
  total++;
 }
}
for(const formula of [String.raw`\mathbb{N}=\{1,2,3,\ldots\}`,String.raw`\mathbb{W}=\{0,1,2,3,\ldots\}`])katex.renderToString(formula,{throwOnError:true});
console.log(`Basics story checks passed: ${total} concepts across ${topics.length} topics; story maths and number-family notation typeset successfully.`);
