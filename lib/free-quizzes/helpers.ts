import type { Question } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';
export type { Question };
export function fraction(n:number,d:number):string { const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a; const g=gcd(Math.abs(n),Math.abs(d)); n/=g;d/=g;if(d<0){n=-n;d=-d;}return d===1?String(n):`${n}/${d}`; }
export function item(prompt:string,correct:string|number,wrong:(string|number)[],solution:string,topic:string):Question {
  const format=(v:string|number)=>typeof v === "number" ? String(Number(v.toFixed(10))) : v;
  const options=[format(correct),...wrong.map(format)];
  if(options.length!==4 || new Set(options).size!==4) throw new Error(`Invalid options: ${prompt}: ${options.join(', ')}`);
  const answer=[...prompt].reduce((a,c)=>a+c.charCodeAt(0),0)%4;
  options.splice(0,1);options.splice(answer,0,format(correct));
  return {prompt,options,answer,solution,topic};
}
export function numeric(prompt:string,correct:number,solution:string,topic:string,step=1):Question {return item(prompt,correct,[correct-step,correct+step,correct+2*step],solution,topic);}
export function assertion(a:string,r:string,answer:number,solution:string):Question {return {prompt:`Assertion (A): ${a}\nReason (R): ${r}`,options:['Both A and R are true, and R correctly explains A.','Both A and R are true, but R does not correctly explain A.','A is true, but R is false.','A is false, but R is true.'],answer,solution,topic:'Assertion–reason',assertion:true};}

