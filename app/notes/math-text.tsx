import type { ReactNode } from 'react';
import Tex from './tex';

const superscripts: Record<string, string> = {
  '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9',
  '⁺':'+','⁻':'−','⁼':'=','⁽':'(', '⁾':')','ⁿ':'n','ⁱ':'i','ˣ':'x',
  'ᵃ':'a','ᵇ':'b','ᶜ':'c','ᵈ':'d','ᵉ':'e','ᶠ':'f','ᵍ':'g','ʰ':'h','ʲ':'j','ᵏ':'k',
  'ˡ':'l','ᵐ':'m','ᵒ':'o','ᵖ':'p','ʳ':'r','ˢ':'s','ᵗ':'t','ᵘ':'u','ᵛ':'v','ʷ':'w','ʸ':'y','ᶻ':'z',
};
const subscripts: Record<string, string> = {
  '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9',
  '₊':'+','₋':'−','₌':'=','₍':'(', '₎':')','ₐ':'a','ₑ':'e','ₕ':'h','ᵢ':'i','ⱼ':'j',
  'ₖ':'k','ₗ':'l','ₘ':'m','ₙ':'n','ₒ':'o','ₚ':'p','ᵣ':'r','ₛ':'s','ₜ':'t','ₓ':'x',
};

const superscriptCharacters = new Set(Object.keys(superscripts));
const subscriptCharacters = new Set(Object.keys(subscripts));
const functionNames = new Set(['sin', 'cos', 'tan', 'sec', 'cosec', 'csc', 'cot', 'log', 'ln', 'ar']);
// Words that name a quantity in a ratio: opposite/hypotenuse, height/distance, sin/cos.
const mathWords = new Set(['opposite', 'adjacent', 'hypotenuse', 'opp', 'adj', 'hyp', 'height', 'distance', 'slant', 'shadow', 'base', 'perpendicular', 'favourable', 'total', 'area', 'perimeter', 'speed', 'time', 'sin', 'cos', 'tan', 'sec', 'cosec', 'cot', 'numerator', 'denominator', 'rate', 'price', 'gst', 'cost', 'profit', 'loss', 'difference']);
// Short English words that must never become a letter product (odd/even, and/or, per/km).
const shortWords = new Set(['an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if', 'in', 'is', 'it', 'me', 'my', 'no', 'of', 'on', 'or', 'so', 'to', 'up', 'us', 'we', 'add', 'all', 'and', 'any', 'are', 'but', 'can', 'for', 'has', 'his', 'how', 'its', 'may', 'new', 'not', 'now', 'odd', 'one', 'our', 'out', 'per', 'see', 'set', 'sum', 'the', 'two', 'use', 'was', 'who', 'why', 'yes', 'you', 'day', 'man', 'men', 'box', 'bag', 'pen', 'run', 'own', 'off', 'max', 'min', 'log', 'sin', 'cos', 'tan', 'sec', 'cot']);
const units = new Set(['mm', 'cm', 'm', 'km', 's', 'min', 'h', 'hr', 'g', 'kg', 'ml', 'l']);
const atomCharacter = /[\p{L}\p{N}.′'°πθφ√Σ\u0304⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣⁱ⁺⁻⁼⁽⁾ᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷʸᶻ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜₓ]/u;

type Operand = { start: number; end: number; value: string; grouped: boolean };
type FractionMatch = { start: number; end: number; numerator: string; denominator: string };

function translateScript(value: string, map: Record<string, string>) {
  return [...value].map((character) => map[character] ?? character).join('');
}

function findOpeningBracket(value: string, closeIndex: number) {
  const close = value[closeIndex];
  const open = close === ')' ? '(' : close === ']' ? '[' : close === '}' ? '{' : '';
  if (!open) return -1;
  let depth = 0;
  for (let index = closeIndex; index >= 0; index -= 1) {
    if (value[index] === close) depth += 1;
    if (value[index] === open) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function findClosingBracket(value: string, openIndex: number) {
  const open = value[openIndex];
  const close = open === '(' ? ')' : open === '[' ? ']' : open === '{' ? '}' : '';
  if (!close) return -1;
  let depth = 0;
  for (let index = openIndex; index < value.length; index += 1) {
    if (value[index] === open) depth += 1;
    if (value[index] === close) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function readLeftOperand(value: string, slashIndex: number): Operand | null {
  let end = slashIndex;
  while (end > 0 && /\s/.test(value[end - 1])) end -= 1;
  if (end === 0) return null;
  // A bracket raised to a power, such as Σ(x − x̄)²/n, is one grouped operand.
  let bracketEnd = end;
  while (bracketEnd > 0 && superscriptCharacters.has(value[bracketEnd - 1])) bracketEnd -= 1;
  const finalCharacter = value[bracketEnd - 1];
  if (')]}'.includes(finalCharacter)) {
    let start = findOpeningBracket(value, bracketEnd - 1);
    if (start < 0) return null;
    if (start > 0 && value[start - 1] === '^') {
      const base = readLeftOperand(value, start - 1);
      if (base) return { start: base.start, end, value: value.slice(base.start, end), grouped: false };
    }
    let prefixEnd = start;
    while (prefixEnd > 0 && /\s/.test(value[prefixEnd - 1])) prefixEnd -= 1;
    let prefixStart = prefixEnd;
    while (prefixStart > 0 && /\p{L}/u.test(value[prefixStart - 1])) prefixStart -= 1;
    if (functionNames.has(value.slice(prefixStart, prefixEnd)) || value.slice(prefixStart, prefixEnd) === 'Σ') start = prefixStart;
    else if (prefixEnd > 0 && value[prefixEnd - 1] === '√') start = prefixEnd - 1;
    return { start, end, value: value.slice(start, end), grouped: true };
  }

  let start = end;
  while (start > 0 && atomCharacter.test(value[start - 1])) start -= 1;
  if (start === end) return null;
  if (start > 0 && value[start - 1] === '^') {
    const base = readLeftOperand(value, start - 1);
    if (base) start = base.start;
  }

  const previousText = value.slice(0, start);
  const functionMatch = previousText.match(/(?:^|\s)(sin|cos|tan|sec|cosec|cot|log|ln)\s+$/);
  if (functionMatch) start = previousText.length - functionMatch[0].trimStart().length;
  return { start, end, value: value.slice(start, end), grouped: false };
}

function readRightOperand(value: string, slashIndex: number): Operand | null {
  let start = slashIndex + 1;
  while (start < value.length && /\s/.test(value[start])) start += 1;
  if (start >= value.length) return null;

  if ('([{'.includes(value[start])) {
    const closeIndex = findClosingBracket(value, start);
    if (closeIndex < 0) return null;
    let end = closeIndex + 1;
    while (end < value.length && superscriptCharacters.has(value[end])) end += 1;
    if (value[end] === '^') {
      const exponent = readCaretValue(value, end);
      if (exponent) end = exponent.end;
    }
    return { start, end, value: value.slice(start, end), grouped: true };
  }

  if (value[start] === '√' && '([{'.includes(value[start + 1] ?? '')) {
    const closeIndex = findClosingBracket(value, start + 1);
    if (closeIndex < 0) return null;
    let end = closeIndex + 1;
    while (end < value.length && superscriptCharacters.has(value[end])) end += 1;
    return { start, end, value: value.slice(start, end), grouped: true };
  }

  let end = start;
  if (value[end] === '−' || value[end] === '-') end += 1;
  const atomStart = end;
  while (end < value.length && atomCharacter.test(value[end])) {
    if (value[end] === '.' && !/\d/.test(value[end + 1] ?? '')) break;
    end += 1;
  }
  if (end === atomStart) return null;
  if (value[end] === '^') {
    const exponent = readCaretValue(value, end);
    if (exponent) end = exponent.end;
  }

  const functionName = plainAtom(value.slice(start, end));
  if (functionNames.has(functionName)) {
    let argumentStart = end;
    while (argumentStart < value.length && /\s/.test(value[argumentStart])) argumentStart += 1;
    if (argumentStart < value.length) {
      if ('([{'.includes(value[argumentStart])) {
        const closeIndex = findClosingBracket(value, argumentStart);
        if (closeIndex >= 0) return { start, end: closeIndex + 1, value: value.slice(start, closeIndex + 1), grouped: true };
      } else {
        let argumentEnd = argumentStart;
        while (argumentEnd < value.length && atomCharacter.test(value[argumentEnd])) {
          if (value[argumentEnd] === '.' && !/\d/.test(value[argumentEnd + 1] ?? '')) break;
          argumentEnd += 1;
        }
        if (argumentEnd > argumentStart) return { start, end: argumentEnd, value: value.slice(start, argumentEnd), grouped: false };
      }
    }
  }
  return { start, end, value: value.slice(start, end), grouped: false };
}

function plainAtom(value: string) {
  return value
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿˣⁱ⁺⁻⁼⁽⁾ᵃᵇᶜᵈᵉᶠᵍʰʲᵏˡᵐᵒᵖʳˢᵗᵘᵛʷʸᶻ₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜₓ]/gu, '')
    .replace(/[−-]/g, '')
    .trim();
}

function isClearMathOperand(operand: Operand, relaxed = true) {
  if (operand.grouped) return true;
  if (/^[\d\p{L}]+(?:\^(?:\{[^{}]+\}|\([^()]+\)|[\d\p{L}]+))$/u.test(operand.value)) return true;
  const compact = operand.value.replace(/\s+/g, '');
  const base = plainAtom(compact);
  if (!base) return false;
  if (/^\d+(?:\.\d+)?°?$/u.test(base)) return true;
  if (/^[πθφ]$/u.test(base)) return true;
  if (/^d[\p{L}]$/u.test(base)) return true;
  if (/^\d*(?:√\d+|[\p{L}])$/u.test(base)) return true;
  if (/^[A-Z]{1,2}$/u.test(base)) return true;
  const words = operand.value.trim().split(/\s+/);
  if (words.length === 2 && functionNames.has(words[0]) && /^[\p{L}\p{N}]+$/u.test(plainAtom(words[1]).replace(/°/g, ''))) return true;
  // The rules below read a slash between words as division, so they need a tight slash (a/b, not a / b).
  if (!relaxed) return false;
  // A function with a power or a multiple-angle argument: cos²A, sin²θ, sin2x.
  if (/^(?:sin|cos|tan|sec|cosec|csc|cot)\d*[\p{L}]$/u.test(base)) return true;
  // A product of a power and a root: r²√3.
  if (/^[a-z]√\d+$/u.test(base)) return true;
  // A named length squared: diagonal², side², radius².
  if (/^(?:diagonal|side|radius|diameter|base|height)$/u.test(base) && /[²³]/u.test(compact)) return true;
  // π with a coefficient and up to two letters: πr, 2πr, πt.
  if (/^\d*π[a-z]{0,2}$/u.test(base)) return true;
  // Σx², Σfx, x̄: a summation sign or an overbar on a short symbol.
  const symbol = base.replace(/^Σ/u, '').replace(/\u0304/gu, '');
  if (symbol !== base && /^[a-zα-ω][a-zα-ωᵢⱼ]{0,2}$/u.test(symbol)) return true;
  // Short letter products (bc, abc, αβ), but not English words or units.
  if (/^(?:[a-z]{2,3}|[α-ω]{2,3})$/u.test(base) && !shortWords.has(base) && !units.has(base)) return true;
  // Named ratios such as opposite/hypotenuse or favourable/total.
  return words.length === 1 && mathWords.has(base.toLowerCase());
}

function tokenContaining(value: string, index: number) {
  let start = index;
  let end = index + 1;
  while (start > 0 && !/\s/.test(value[start - 1])) start -= 1;
  while (end < value.length && !/\s/.test(value[end])) end += 1;
  return value.slice(start, end);
}

function displayOperand(operand: Operand) {
  const trimmed = operand.value.trim();
  if (!operand.grouped || trimmed.startsWith('√')) return trimmed;
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  if ((first === '(' && last === ')') || (first === '[' && last === ']') || (first === '{' && last === '}')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function isInsideStructuralGroup(value: string, index: number) {
  const openings: number[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (let cursor = 0; cursor < index; cursor += 1) {
    const character = value[cursor];
    if ('([{'.includes(character)) openings.push(cursor);
    else if (pairs[character] && value[openings[openings.length - 1]] === pairs[character]) openings.pop();
  }
  return openings.some((opening) => {
    const close = findClosingBracket(value, opening);
    if (close < index) return false;
    let previous = opening - 1;
    while (previous >= 0 && /\s/.test(value[previous])) previous -= 1;
    return previous >= 0 && '√^_'.includes(value[previous]);
  });
}

function findFraction(value: string): FractionMatch | null {
  let best: (FractionMatch & { depth: number }) | null = null;
  const bracketStack: string[] = [];
  for (let index = 0; index < value.length; index += 1) {
    if ('([{'.includes(value[index])) {
      bracketStack.push(value[index]);
      continue;
    }
    if (')]}'.includes(value[index])) {
      bracketStack.pop();
      continue;
    }
    if (value[index] !== '/' && value[index] !== '⁄') continue;
    if (value[index - 1] === '\\' || value[index - 1] === '/' || value[index + 1] === '/') continue;
    if (isInsideStructuralGroup(value, index)) continue;
    const token = tokenContaining(value, index);
    if (/^(?:https?:|www\.|\/api\/)/i.test(token)) continue;

    const left = readLeftOperand(value, index);
    let right = readRightOperand(value, index);
    // N/2th observation: the ordinal ending is not part of the denominator.
    const ordinal = right && !right.grouped ? right.value.match(/^(\d+)(?=(?:th|st|nd|rd)$)/u) : null;
    if (right && ordinal) right = { start: right.start, end: right.start + ordinal[1].length, value: ordinal[1], grouped: false };
    // 1/3πr²h means (1/3)πr²h: a number over a number that runs straight into π or a letter.
    if (left && right && !right.grouped && /^\d+(?:\.\d+)?$/.test(left.value.trim())) {
      const lead = right.value.match(/^(\d+)(?=[π\p{L}])/u);
      if (lead && !units.has(plainAtom(right.value.slice(lead[1].length)).toLowerCase())) right = { start: right.start, end: right.start + lead[1].length, value: lead[1], grouped: false };
    }
    // A spaced slash (a / b) or a slash inside a path (grade-10/ch-1) needs the strict rules.
    const relaxed = !/\s/.test(value[index - 1] ?? '') && !/\s/.test(value[index + 1] ?? '');
    if (!left || !right || !isClearMathOperand(left, relaxed) || !isClearMathOperand(right, relaxed)) continue;
    const classic = isClearMathOperand(left, false) && isClearMathOperand(right, false);
    if (!classic && (value[right.end] === '-' || value[left.start - 1] === '-')) continue;

    let before = left.start - 1;
    let after = right.end;
    while (before >= 0 && /\s/.test(value[before])) before -= 1;
    while (after < value.length && /\s/.test(value[after])) after += 1;
    if (value[before] === '/' || value[before] === '⁄' || value[after] === '/' || value[after] === '⁄') continue;

    const leftUnit = plainAtom(left.value).toLowerCase();
    const rightUnit = plainAtom(right.value).toLowerCase();
    if (units.has(leftUnit) && units.has(rightUnit)) continue;
    // Four-digit numerators are valid mathematics too (for example 2160/12).

    const candidate = {
      start: left.start,
      end: right.end,
      numerator: displayOperand(left),
      denominator: displayOperand(right),
      depth: bracketStack.length,
    };
    if (!best || candidate.depth < best.depth) best = candidate;
  }
  if (!best) return null;
  const { depth: _depth, ...fraction } = best;
  return fraction;
}

function readCaretValue(value: string, caretIndex: number) {
  const start = caretIndex + 1;
  if ('([{'.includes(value[start] ?? '')) {
    const closeIndex = findClosingBracket(value, start);
    if (closeIndex >= 0) return { value: value.slice(start + 1, closeIndex), end: closeIndex + 1 };
  }
  let end = start;
  if (value[end] === '-' || value[end] === '−') end += 1;
  while (end < value.length && !/[\s,;=+×÷<>_^/)\]}−-]/.test(value[end])) end += 1;
  return end > start ? { value: value.slice(start, end), end } : null;
}

function formatPlainText(value: string) {
  return value
    .split(/(https?:\/\/\S+|\/api\/\S+)/gi)
    .map((part) => /^(?:https?:\/\/|\/api\/)/i.test(part) ? part : part.replace(/\s*([=+×÷±≤≥≈<>⊥∥−])\s*/g, ' $1 '))
    .join('')
    .replace(/\\\//g, '/');
}

function renderAtoms(value: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let text = '';
  let index = 0;
  const flushText = () => {
    if (!text) return;
    nodes.push(<span key={`${keyPrefix}-t-${nodes.length}`}>{formatPlainText(text)}</span>);
    text = '';
  };

  while (index < value.length) {
    const character = value[index];
    if (character === '∫') {
      flushText();
      let cursor = index + 1;
      let lower = '';
      let upper = '';
      while (cursor < value.length && subscriptCharacters.has(value[cursor])) lower += value[cursor++];
      while (cursor < value.length && superscriptCharacters.has(value[cursor])) upper += value[cursor++];
      if (value[cursor] === '_') {
        const bound = readCaretValue(value, cursor);
        if (bound) { lower = bound.value; cursor = bound.end; }
      }
      if (value[cursor] === '^') {
        const bound = readCaretValue(value, cursor);
        if (bound) { upper = bound.value; cursor = bound.end; }
      }
      const lowerText = translateScript(lower, subscripts);
      const upperText = translateScript(upper, superscripts);
      if (lowerText || upperText) {
        nodes.push(
          <span className="math-integral" key={`${keyPrefix}-i-${nodes.length}`} role="math" aria-label={`integral${lowerText ? ` from ${lowerText}` : ''}${upperText ? ` to ${upperText}` : ''}`}>
            <span className="math-integral-symbol" aria-hidden="true">∫</span>
            <span className="math-integral-limits" aria-hidden="true">
              <span>{upperText ? renderExpression(upperText, `${keyPrefix}-iu-${nodes.length}`) : '\u00a0'}</span>
              <span>{lowerText ? renderExpression(lowerText, `${keyPrefix}-il-${nodes.length}`) : '\u00a0'}</span>
            </span>
          </span>,
        );
      } else {
        nodes.push(<span className="math-integral-symbol standalone" key={`${keyPrefix}-i-${nodes.length}`}>∫</span>);
      }
      index = cursor;
      continue;
    }

    if (character === '√') {
      flushText();
      let radicand = '';
      let end = index + 1;
      if ('([{'.includes(value[end] ?? '')) {
        const closeIndex = findClosingBracket(value, end);
        if (closeIndex >= 0) {
          radicand = value.slice(end + 1, closeIndex);
          end = closeIndex + 1;
        }
      } else {
        while (end < value.length && atomCharacter.test(value[end])) {
          if (value[end] === '.' && !/\d/.test(value[end + 1] ?? '')) break;
          radicand += value[end++];
        }
      }
      if (radicand) {
        nodes.push(
          <span className="math-root" key={`${keyPrefix}-r-${nodes.length}`} role="math" aria-label={`square root of ${radicand}`}>
            <span className="math-root-symbol" aria-hidden="true">√</span><span className="math-radicand" aria-hidden="true">{renderExpression(radicand, `${keyPrefix}-rr-${nodes.length}`)}</span>
          </span>,
        );
        index = end;
        continue;
      }
      text += character;
      index += 1;
      continue;
    }

    if (superscriptCharacters.has(character) || subscriptCharacters.has(character)) {
      flushText();
      const isSuperscript = superscriptCharacters.has(character);
      let script = '';
      while (index < value.length && (isSuperscript ? superscriptCharacters : subscriptCharacters).has(value[index])) script += value[index++];
      const translated = translateScript(script, isSuperscript ? superscripts : subscripts);
      nodes.push(isSuperscript
        ? <sup key={`${keyPrefix}-s-${nodes.length}`}>{translated}</sup>
        : <sub key={`${keyPrefix}-s-${nodes.length}`}>{translated}</sub>);
      continue;
    }

    if (character === '^') {
      const exponent = readCaretValue(value, index);
      if (exponent) {
        flushText();
        nodes.push(<sup key={`${keyPrefix}-c-${nodes.length}`}>{renderExpression(exponent.value, `${keyPrefix}-ce-${nodes.length}`)}</sup>);
        index = exponent.end;
        continue;
      }
    }

    text += character;
    index += 1;
  }
  flushText();
  return nodes;
}

function renderExpression(value: string, keyPrefix = 'math'): ReactNode[] {
  const fraction = findFraction(value);
  if (!fraction) return renderAtoms(value, keyPrefix);
  return [
    ...renderExpression(value.slice(0, fraction.start), `${keyPrefix}-before`),
    <span
      className="math-fraction"
      key={`${keyPrefix}-fraction-${fraction.start}`}
      role="math"
      aria-label={`${fraction.numerator} divided by ${fraction.denominator}`}
    >
      <span className="math-fraction-numerator" aria-hidden="true">{renderExpression(fraction.numerator, `${keyPrefix}-num`)}</span>
      <span className="math-fraction-denominator" aria-hidden="true">{renderExpression(fraction.denominator, `${keyPrefix}-den`)}</span>
    </span>,
    ...renderExpression(value.slice(fraction.end), `${keyPrefix}-after-${fraction.end}`),
  ];
}

export default function MathText({ children, formula = false }: { children: string; formula?: boolean }) {
  if (children.includes('$')) return <Tex>{children}</Tex>;
  return <span className={formula ? 'math-typeset formula' : 'math-typeset'}>{renderExpression(children.trim())}</span>;
}
