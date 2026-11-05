export type BasicsQuestion={prompt:string;answer:string;solution:string;options:string[]|null};
export type BasicsTopic={slug:string;title:string;tier:string;concepts:{title:string;explain:string;teaching?:string[];visual:Record<string,unknown>;steps:string[];workedExamples?:{title:string;formula:string;meaning:string;substitution:string;working:string;conclusion:string}[];practice:BasicsQuestion[];remember:string}[];test:BasicsQuestion[]};
export type BasicsProgress={index:number;understood:Record<string,boolean>;practice:Record<string,string>;checked:Record<string,boolean>;test:boolean;answers:Record<string,string>;submitted:boolean};
export const emptyBasicsProgress=():BasicsProgress=>({index:0,understood:{},practice:{},checked:{},test:false,answers:{},submitted:false});
const unitSuffix=/(%|°|degrees?|rupees?|rs\.?|cm³|cm²|m²|m³|cm|mm|km|kg|litres?|ml|seconds?|minutes?|days?|units?|m|g|l|s)$/i;
/** Marks a typed answer. It accepts a unit or symbol after a number (35%, 55°, ₹720, 7 cm, x = 7) and equal fraction and decimal forms (1/100 = 0.01). */
export function basicsMatch(value:string,answer:string){
 const normal=(s:string)=>{let t=s.trim().replace(/[−–]/g,'-').replace(/,/g,'').replace(/\s+/g,'').toLowerCase().replace(/^(₹|rs\.?)/,'').replace(/^[a-zθ]=(?=[-+.\d])/,'');if(/^[-+.\d/]+[a-z%°²³.]+$/.test(t))t=t.replace(unitSuffix,'');return t;};
 const a=normal(value),b=normal(answer);if(a==='')return false;if(a===b)return true;
 const num=(s:string)=>{if(/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(s))return Number(s);const m=s.match(/^([-+]?\d+)\/(\d+)$/);return m&&Number(m[2])!==0?Number(m[1])/Number(m[2]):null;};
 const x=num(a),y=num(b);return x!==null&&y!==null&&Math.abs(x-y)<1e-9;}

export function reopenExpandedTest(state:BasicsProgress,count:number):BasicsProgress {return state.submitted&&Array.from({length:count},(_,i)=>state.answers?.[i]?.trim()).some(v=>!v)?{...state,submitted:false,test:true}:state;}

export function openBasicsLesson(state:BasicsProgress):BasicsProgress{return {...state,index:0,test:false};}
