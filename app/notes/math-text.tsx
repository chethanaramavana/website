import type { ReactNode } from 'react';

const superscripts: Record<string, string> = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ⁿ':'n','ˣ':'x','ⁱ':'i','⁺':'+','⁻':'−' };
const subscripts: Record<string, string> = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₙ':'n','ᵢ':'i','₊':'+','₋':'−' };
const scriptPattern = /([⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣⁱ⁺⁻]+|[₀₁₂₃₄₅₆₇₈₉ₙᵢ₊₋]+)/g;
const scriptOnlyPattern = /^([⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣⁱ⁺⁻]+|[₀₁₂₃₄₅₆₇₈₉ₙᵢ₊₋]+)$/;

function scriptNode(value: string, key: number): ReactNode {
  const isSuperscript = value[0] in superscripts;
  const translated = [...value].map((character) => (isSuperscript ? superscripts : subscripts)[character] ?? character).join('');
  return isSuperscript ? <sup key={key}>{translated}</sup> : <sub key={key}>{translated}</sub>;
}

export default function MathText({ children, formula = false }: { children: string; formula?: boolean }) {
  const formatted = children
    .replace(/\s*([=+×÷±≤≥≈<>])\s*/g, ' $1 ')
    .replace(/([A-Za-z0-9)])\/([A-Za-z0-9(])/g, '$1⁄$2')
    .replace(/\s+/g, ' ')
    .trim();
  const parts = formatted.split(scriptPattern).filter(Boolean);
  return <span className={formula ? 'math-typeset formula' : 'math-typeset'}>{parts.map((part, index) => scriptOnlyPattern.test(part) ? scriptNode(part, index) : <span key={index}>{part}</span>)}</span>;
}
