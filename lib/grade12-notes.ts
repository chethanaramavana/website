import type { ChapterNotes } from './chapter-notes';
import partA from './grade12-part-a.json';
import partB from './grade12-part-b.json';
import partC from './grade12-part-c.json';

const note = (value: ChapterNotes): ChapterNotes => ({
  ...value,
  board: 'CBSE',
  grade: 12,
  book: value.book?.startsWith('NCERT ') ? value.book : `NCERT ${value.book ?? 'Mathematics Part II'}`,
});

const integralsNotes = note({
    slug: 'g12-integrals',
    chapter: 'Integrals',
    number: 7,
    subtitle: 'Antiderivatives, Methods & Definite Integrals',
    concepts: [
      { title: 'Integration as an inverse process', text: 'An antiderivative F of f satisfies F′(x) = f(x). The indefinite integral ∫ f(x) dx = F(x) + C represents the complete family of antiderivatives.' },
      { title: 'Choosing a method', text: 'Simplify first. Look for a function with its derivative for substitution, a rational function for partial fractions, or a product suited to integration by parts.' },
      { title: 'Definite integrals', text: 'The Fundamental Theorem of Calculus gives ∫ₐᵇ f(x) dx = F(b) − F(a), where F′(x) = f(x). A definite integral has no arbitrary constant.' },
      { title: 'Symmetry and properties', text: 'Changing x to a − x, or checking whether a function is even or odd, can turn a difficult definite integral into a short calculation.' },
    ],
    formulas: [
      '∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C, n ≠ −1',
      '∫ dx/x = log|x| + C; ∫ eˣ dx = eˣ + C',
      '∫ sin x dx = −cos x + C; ∫ cos x dx = sin x + C',
      '∫ dx/(a² + x²) = (1/a) tan⁻¹(x/a) + C',
      '∫ dx/√(a² − x²) = sin⁻¹(x/a) + C',
      '∫ u dv = uv − ∫ v du',
      '∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b − x) dx',
      'If f is odd, ∫₋ₐᵃ f(x) dx = 0; if f is even, it equals 2∫₀ᵃ f(x) dx',
    ],
    method: [
      'Simplify the integrand and identify its structure.',
      'Choose substitution, partial fractions, integration by parts or a definite-integral property.',
      'For an indefinite integral, include the constant C.',
      'Differentiate the result to verify it; for definite integrals, also check the sign and size.',
    ],
    example: {
      question: 'Evaluate ∫ x²eˣ dx.',
      steps: [
        'Use integration by parts with u = x² and dv = eˣ dx.',
        'This gives x²eˣ − 2∫ xeˣ dx.',
        'Apply integration by parts again: ∫ xeˣ dx = xeˣ − eˣ.',
      ],
      answer: '∫ x²eˣ dx = eˣ(x² − 2x + 2) + C.',
    },
    practice: [
      { question: 'Evaluate ∫ (4x³ − 3x² + 2) dx.', answer: 'x⁴ − x³ + 2x + C', marks: 2 },
      { question: 'Evaluate ∫ 2x/(1 + x²) dx.', answer: 'log(1 + x²) + C', marks: 2 },
      { question: 'Evaluate ∫ sin²x dx.', answer: 'x/2 − (sin 2x)/4 + C', marks: 2 },
      { question: 'Evaluate ∫ dx/[(x + 1)(x + 2)].', answer: 'log|(x + 1)/(x + 2)| + C', marks: 3 },
      { question: 'Evaluate ∫ x log x dx for x > 0.', answer: '(x²/2)log x − x²/4 + C', marks: 3 },
      { question: 'Using a property, evaluate ∫₀^π x sin x dx.', answer: 'π', marks: 4 },
    ],
    tips: [
      'The constant of integration belongs only to indefinite integrals.',
      'Change the limits when using substitution in a definite integral, or return to x before applying them.',
      'In integration by parts, choose u so that differentiating it makes the remaining integral simpler.',
      'Use absolute-value signs with logarithms obtained from ∫ dx/x.',
    ],
  });

const importedNotes = [
  ...partA.notes,
  ...partB.notes,
  ...partC.notes,
] as unknown as ChapterNotes[];

export const grade12Notes: ChapterNotes[] = [...importedNotes.map(note), integralsNotes]
  .sort((first, second) => first.number - second.number);
