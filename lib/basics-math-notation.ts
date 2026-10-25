// Typeset the course's plain-text arithmetic without changing stored answers.
// Explicit $...$ and $$...$$ notation always takes precedence.
const number=String.raw`\d+(?:,\d{3})*(?:\.\d+)?`;
const variable=String.raw`(?:[abcpqxyznkrswhldm]|ab|bc|xy|π|θ)(?:[₀₁₂₃₄₅₆₇₈₉ₙ])?`;
const atom=String.raw`(?:${number}(?:[½¼¾]|${variable})?|[½¼¾□]|${variable}|(?:sin|cos|tan)\s*θ)`;
const power=String.raw`(?:[⁰¹²³⁴⁵⁶⁷⁸⁹ᵐⁿ⁺⁻]+|\^\d+)?(?:%|°)?`;
const simple=String.raw`(?:[√∛]\s*)?${atom}${power}`;
const inside=String.raw`[−-]?${simple}(?:\s*[+−\-×÷*/]\s*[−-]?${simple})*`;
const group=String.raw`(?:${simple}|(?:[√∛]\s*)?\(${inside}\)${power})`;
const term=String.raw`[−-]?${group}(?:${group})*`;
const expression=new RegExp(String.raw`(?<![\p{L}\p{N}])${term}(?:\s*(?:[+−\-×÷*/=<>≈]|≠|≤|≥|→)\s*${term})*(?![\p{L}\p{N}])`,'gu');

function equation(source:string){
 let s=source.replace(/−/g,'-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ᵐⁿ⁺⁻]+/g,power=>'^{'+Array.from(power).map(c=>({ '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ᵐ':'m','ⁿ':'n','⁺':'+','⁻':'-' }[c])).join('')+'}').replace(/[₀₁₂₃₄₅₆₇₈₉ₙ]/g,c=>'_{'+('₀₁₂₃₄₅₆₇₈₉'.includes(c)?'₀₁₂₃₄₅₆₇₈₉'.indexOf(c):'n')+'}');
 s=s.replace(/∛\s*(\d+)/g,'\\sqrt[3]{$1}').replace(/([0-9])([½¼¾])/g,'$1 $2').replace(/½/g,'\\dfrac{1}{2}').replace(/¼/g,'\\dfrac{1}{4}').replace(/¾/g,'\\dfrac{3}{4}');
 s=s.replace(/√\s*\(([^()]+)\)/g,'\\sqrt{$1}').replace(/√\s*(\d+|[a-z])/g,'\\sqrt{$1}');
 const operand=String.raw`(?:\([^()]+\)|\\sqrt\{[^{}]+\}|(?:\d+(?:,\d{3})*(?:\.\d+)?|[a-zθπ]+)(?:_\{[^{}]+\})?(?:\^\{[^{}]+\})?)`;
 s=s.replace(new RegExp(`(${operand})\\s*/\\s*(${operand})`,'g'),(_,a:string,b:string)=>`\\dfrac{${a}}{${b}}`);
 return s.replace(/□/g,'\\boxed{\\phantom{00}}').replace(/%/g,'\\%').replace(/°/g,'^{\\circ}').replace(/×/g,'\\times ').replace(/÷/g,'\\div ').replace(/≈/g,'\\approx ').replace(/≠/g,'\\ne ').replace(/≤/g,'\\le ').replace(/≥/g,'\\ge ').replace(/→/g,'\\to ').replace(/π/g,'\\pi ').replace(/θ/g,'\\theta ').replace(/\b(sin|cos|tan)\b/g,'\\$1 ').replace(/,(?=\d{3}(?:\D|$))/g,'{,}');
}
export function basicsMathText(source:string){return source.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g).map(part=>part.startsWith('$')?part:part.replace(expression,match=>{
 if(!/[\d⁰¹²³⁴⁵⁶⁷⁸⁹ᵐⁿ½¼¾□√∛+−\-×÷*/=<>≈≠≤≥→πθ]/.test(match)&&!['x','y'].includes(match))return match;
 const prose=match.match(/^(?:by|as)\s+(?=[+−-]\s*\d)/i);
 return prose?prose[0]+'$'+equation(match.slice(prose[0].length))+'$':'$'+equation(match)+'$';
})).join('');}
