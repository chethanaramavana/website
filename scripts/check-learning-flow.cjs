// Meaningful checks for the new pure learning/report logic using the real catalogues.
const ts = require('typescript');
const fs = require('node:fs');
const assert = require('node:assert/strict');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename,'utf8');
  module._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,filename);
};
const {kaprekar} = require('../lib/kaprekar.ts');
assert.deepEqual(kaprekar('2026').map(s=>s.result),['5994','5355','1998','8082','8532','6174']);
assert.equal(kaprekar('1000')[0].ascending,'0001');
assert.equal(kaprekar('6174').length,0);
for (const value of ['1111','0000','123','12345','12x4']) assert.throws(()=>kaprekar(value));
for (let n=0;n<10000;n++) {
  const value=String(n).padStart(4,'0');
  if(new Set(value).size===1)continue;
  const steps=kaprekar(value);
  assert.ok(steps.length<=7);
  assert.equal(steps.at(-1)?.result ?? value,'6174');
}
const {reportRows} = require('../lib/report-card.ts');
const records={submissions:[{id:'marked',paper_id:'real-numbers-01',status:'marked',mcq_score:14,total_score:34,teacher_feedback:'Show working.'},{id:'pending',paper_id:'polynomials-01',status:'submitted',mcq_score:10,total_score:null,teacher_feedback:''}],mcqResults:[{id:'quiz',quizId:'cbse-10-ch-6-50',title:'Triangles',score:40,total:50}],mcqDrafts:[{quizId:'cbse-10-ch-2-50',title:'Polynomials',path:'/cbse/grade-10/ch-2/free-mcq',answered:12,total:50}],access:['real-numbers-01','cbse-10-ch-6-50','cbse-10-ch-7-50','integrals-pdf-board-01','maths-basics-6']};
const rows=reportRows(records);
assert.equal(rows.length,7);
assert.equal(rows.find(r=>r.id==='marked').maximum,40);
assert.equal(rows.find(r=>r.id==='pending').maximum,16);
assert.equal(rows.find(r=>r.id==='pending').pending,true);
assert.equal(rows.find(r=>r.id==='quiz').grade,10);
assert.equal(rows.filter(r=>r.chapter==='Real Numbers').length,1);
assert.ok(rows.find(r=>r.id==='access-cbse-10-ch-7-50').href.endsWith('/ch-7/free-mcq'));
assert.equal(reportRows({submissions:[],mcqResults:[],mcqDrafts:[],access:[]}).length,0);
const {validWeeklyProblem} = require('../lib/weekly-problems.ts');
assert.equal(validWeeklyProblem({number:1,question:'What is $2+2$?',solution:'4',published:true,solutionVisible:true}),true);
for(const problem of [{number:0,question:'Q',solution:'A',published:true,solutionVisible:false},{number:1,question:'',solution:'A',published:true,solutionVisible:false},{number:1,question:'Q',solution:'',published:true,solutionVisible:true}])assert.equal(validWeeklyProblem(problem),false);
console.log('Learning checks passed: all 9,990 valid Kaprekar inputs; report rows, access and partial marks; weekly-problem validation.');
