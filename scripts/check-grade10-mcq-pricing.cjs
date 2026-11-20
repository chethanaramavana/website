const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const assert = require('node:assert/strict');
function load(file, dependencies) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  vm.runInNewContext(code, {exports, require: name => { assert.ok(name in dependencies, name); return dependencies[name]; }});
  return exports;
}
const g12 = {g12PracticeChapter:n=>n>=1&&n<=13?{number:n,title:'Chapter'}:null,g12PracticeChapters:[],g12PracticeReady:new Set()};
const catalog = load('lib/free-quizzes/catalog.ts', {'../g12-practice-catalog':g12});
let paid=false, bundle=false;
const access=load('lib/mcq-access.ts', {
  '@/lib/free-quizzes/catalog':catalog,
  '@/lib/server':{isAdmin:u=>u.teacher,getDatabase:()=>({prepare:()=>({bind:()=>({first:async()=>paid?{id:'paid'}:null})})})},
  './grade10-package-access':{hasGrade10Package:async()=>bundle},
  './grade12-package-access':{hasGrade12Package:async()=>false}
});
(async()=>{
  for(let n=1;n<=14;n++) {
    assert.equal(catalog.quizPrice(n),n%2?0:2000);
    assert.equal(catalog.quizPriceById(catalog.quizId(n)),n%2?0:2000);
    assert.equal(await access.hasMcqAccess({},n),n%2===1);
  }
  assert.equal(await access.hasMcqAccess({teacher:true},2),true);
  paid=true;assert.equal(await access.hasMcqAccess({},2),true);
  paid=false;bundle=true;assert.equal(await access.hasMcqAccess({},2),true);
  assert.equal(catalog.quizPrice(2,11),0);
  assert.equal(catalog.quizPrice(7,12),0);
  assert.equal(catalog.quizPrice(2,12),3000);
  assert.equal(catalog.quizPrice(2,7,'ICSE'),3000);
  console.log('PASS: all 14 alternating prices, price-by-ID, unpaid student gates, teacher access, existing payments, package access and other grades preserved.');
})().catch(e=>{console.error(e);process.exitCode=1});
