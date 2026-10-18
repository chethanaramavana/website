export type BasicsQuestion={prompt:string;answer:string;solution:string;options:string[]|null};
export type BasicsTopic={slug:string;title:string;tier:string;concepts:{title:string;explain:string;visual:Record<string,unknown>;steps:string[];practice:BasicsQuestion[];remember:string}[];test:BasicsQuestion[]};
export type BasicsProgress={index:number;understood:Record<string,boolean>;practice:Record<string,string>;checked:Record<string,boolean>;test:boolean;answers:Record<string,string>;submitted:boolean};
export const emptyBasicsProgress=():BasicsProgress=>({index:0,understood:{},practice:{},checked:{},test:false,answers:{},submitted:false});
export function basicsMatch(value:string,answer:string){const normal=(s:string)=>s.trim().replace(/,/g,'').replace(/−/g,'-');const a=normal(value),b=normal(answer);return a!==''&&(a===b||(/^[-+]?\d+(\.\d+)?$/.test(a)&&/^[-+]?\d+(\.\d+)?$/.test(b)&&Number(a)===Number(b)));}
