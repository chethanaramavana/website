// Check the geometry taught by the real interactive story.
const fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),Module=require('node:module'),assert=require('node:assert/strict');
const file=path.resolve(__dirname,'../lib/nature-stories.ts');
const mod=new Module(file);mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {cellShapes,cellPerimeter,cornerPolygon,natureStories}=mod.exports;
for(const s of cellShapes){
  const p=cornerPolygon(s.sides,10).split(' ').map(v=>v.split(',').map(Number));
  assert.equal(p.length,s.sides);
  for(let i=0;i<p.length;i++)assert(Math.abs(Math.hypot(p[i][0]-p[(i+1)%p.length][0],p[i][1]-p[(i+1)%p.length][1])-10)<.001,'polygon edges must be equal');
  assert.equal(s.angle,180*(s.sides-2)/s.sides);
  if(s.tiles)assert.equal(s.count*s.angle,360);
  else{assert.equal(360-s.count*s.angle,36);assert((s.count+1)*s.angle>360);}
}
for(const a of [25,50,75,100]){
  assert(Math.abs(cellPerimeter(4,a)-4*Math.sqrt(a))<1e-10);
  assert(cellPerimeter(6,a)<cellPerimeter(4,a)&&cellPerimeter(4,a)<cellPerimeter(3,a));
}
assert(Math.abs(cellPerimeter(6,100)-37.22419436)<1e-7);
assert.equal(new Set(natureStories.map(s=>s.number)).size,natureStories.length);
assert.equal(natureStories[0].number,1);
assert(fs.existsSync(path.resolve(__dirname,'../public'+natureStories[0].poster)));
console.log('PASS: regular polygon edges, full turns, pentagon gap, equal-area boundary lengths and issue 1 asset.');
