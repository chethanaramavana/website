import type { PaperDefinition } from './papers';
import partA from './grade12-part-a.json';
import partB from './grade12-part-b.json';
import partC from './grade12-part-c.json';

type ChapterSeed = Omit<PaperDefinition, 'paperNumber'> & {
  paperNumber?: string;
  answerKey: number[];
  solutions: Record<number, string>;
};

const integralsSeed: ChapterSeed =
  {
    id: 'g12-integrals-01',
    chapter: 'Integrals',
    chapterNumber: 7,
    focus: 'Choose the method before integrating: simplify first, then use substitution, partial fractions, integration by parts or a definite-integral property.',
    mcqs: [
      ['∫ (3x² − 4x + 5) dx is', ['x³ − 2x² + 5x + C', '6x − 4 + C', 'x³ − 4x² + 5 + C', '3x³ − 2x² + 5x + C']],
      ['∫ e²ˣ dx is', ['e²ˣ + C', '2e²ˣ + C', '½e²ˣ + C', '½eˣ + C']],
      ['∫ dx/(1 + x²) is', ['tan⁻¹x + C', '½ log(1 + x²) + C', 'sin⁻¹x + C', '1/(1 + x²) + C']],
      ['∫ cos x/(1 + sin x) dx is', ['log|cos x| + C', 'log|1 + sin x| + C', '−log|1 + sin x| + C', '1/(1 + sin x) + C']],
      ['∫ x/(x² + 4) dx is', ['log(x² + 4) + C', '½ log(x² + 4) + C', '2 log(x² + 4) + C', '1/(x² + 4) + C']],
      ['∫ x eˣ² dx is', ['eˣ² + C', '½eˣ² + C', 'x²eˣ² + C', '½e²ˣ + C']],
      ['For x > 0, ∫ x log x dx is', ['x² log x − x²/2 + C', '(x²/2) log x − x²/4 + C', 'x log x − x + C', '(x²/2) log x + x²/4 + C']],
      ['∫ dx/[(x + 1)(x + 2)] is', ['log|(x + 1)(x + 2)| + C', 'log|(x + 2)/(x + 1)| + C', '1/[(x + 1)(x + 2)] + C', 'log|(x + 1)/(x + 2)| + C']],
      ['∫ dx/√(9 − x²) is', ['sin⁻¹(x/3) + C', '⅓sin⁻¹(x/3) + C', 'tan⁻¹(x/3) + C', 'log|x + √(x² − 9)| + C']],
      ['If f is continuous on [0, a], then ∫₀ᵃ f(x) dx equals', ['∫₀ᵃ f(a − x) dx', '−∫₀ᵃ f(a − x) dx', '∫₋ₐ⁰ f(x) dx', 'f(a) − f(0)']],
      ['If f(a − x) = f(x) on [0, a], then ∫₀ᵃ f(x) dx equals', ['∫₀^(a/2) f(x) dx', '2∫₀^(a/2) f(x) dx', '½∫₀^(a/2) f(x) dx', '0']],
      ['∫₋₂² (x³ + x) dx equals', ['−4', '4', '0', '8']],
      ['∫₀^(π/2) [sin x/(sin x + cos x)] dx equals', ['0', 'π/2', 'π/4', '1']],
      ["If F′(x) = f(x), then ∫ₐᵇ f(x) dx equals", ['F(a) − F(b)', 'F(b) − F(a)', 'F(a) + F(b)', 'f(b) − f(a)']],
    ].map(([question, options], index) => ({ number: index + 1, question: question as string, options: options as string[] })),
    assertions: [
      {
        number: 15,
        assertion: 'Every indefinite integral represents a family of functions.',
        reason: 'Any two antiderivatives of the same function on an interval differ by a constant.',
      },
      {
        number: 16,
        assertion: '∫₀ᵃ f(x) dx = 0 for every odd function f.',
        reason: 'For an integrable odd function, ∫₋ₐᵃ f(x) dx = 0.',
      },
    ],
    written: {
      17: 'Evaluate ∫ (2x + 3/x) dx.',
      18: 'Evaluate ∫ sin²x dx.',
      19: 'Using substitution, evaluate ∫₀¹ (2x + 1)² dx.',
      20: 'Using partial fractions, evaluate ∫ (3x + 5)/[(x + 1)(x + 2)] dx.',
      21: 'Evaluate ∫ x²eˣ dx using integration by parts.',
      22: 'Evaluate ∫₀^(π/2) x cos x dx.',
      23: 'Using a suitable property of definite integrals, evaluate I = ∫₀^(π/2) x/(sin x + cos x)² dx.',
      24: [
        '(a) Use the Fundamental Theorem of Calculus to find F′(x). [1]',
        '(b) Find F(0). [1]',
        '(c) Evaluate F(2) and F(2) − F(1). [2]',
      ],
    },
    caseStudy: 'While studying accumulation, a student defines F(x) = ∫₀ˣ (3t² − 4t + 2) dt.',
    answerKey: [0, 2, 0, 1, 1, 1, 1, 3, 0, 0, 1, 2, 2, 1, 0, 3],
    solutions: {
      17: 'Integrate term by term: ∫ 2x dx = x² and ∫ 3/x dx = 3 log|x|. Therefore, the integral is x² + 3 log|x| + C.',
      18: 'Use sin²x = (1 − cos 2x)/2. Therefore, ∫ sin²x dx = x/2 − (sin 2x)/4 + C.',
      19: 'Let u = 2x + 1, so dx = du/2. The new limits are 1 and 3. The integral is ½∫₁³ u² du = [u³/6]₁³ = (27 − 1)/6 = 13/3.',
      20: 'Resolve (3x + 5)/[(x + 1)(x + 2)] = 2/(x + 1) + 1/(x + 2). Hence the integral is 2 log|x + 1| + log|x + 2| + C.',
      21: 'Let I = ∫ x²eˣ dx. By parts, I = x²eˣ − 2∫ xeˣ dx. Also, ∫ xeˣ dx = xeˣ − eˣ. Therefore, I = eˣ(x² − 2x + 2) + C.',
      22: 'Take u = x and dv = cos x dx. Then the integral is [x sin x]₀^(π/2) − ∫₀^(π/2) sin x dx = π/2 − 1.',
      23: 'Replace x by π/2 − x. Then I = ∫₀^(π/2) (π/2 − x)/(sin x + cos x)² dx. Adding this to the original expression gives 2I = (π/2)J, where J = ∫₀^(π/2) dx/(sin x + cos x)². Since sin x + cos x = √2 cos(x − π/4), J = ½[tan(x − π/4)]₀^(π/2) = 1. Therefore, I = π/4.',
      24: '(a) By the Fundamental Theorem of Calculus, F′(x) = 3x² − 4x + 2. (b) F(0) = 0. (c) An antiderivative is t³ − 2t² + 2t. Thus F(2) = 4, F(1) = 1, and F(2) − F(1) = 3.',
    },
  };

const importedSeeds = [
  ...partA.papers,
  ...partB.papers,
  ...partC.papers,
] as unknown as ChapterSeed[];

const seeds = [...importedSeeds, integralsSeed]
  .sort((first, second) => first.chapterNumber - second.chapterNumber);

export const grade12PaperDefinitions: Record<string, PaperDefinition> = Object.fromEntries(
  seeds.map(({ answerKey: _answerKey, solutions: _solutions, ...paper }) => [paper.id, {
    ...paper,
    board: 'CBSE' as const,
    grade: 12,
    book: paper.book?.startsWith('NCERT ') ? paper.book : `NCERT ${paper.book ?? 'Mathematics Part II'}`,
    paperNumber: paper.paperNumber ?? '01',
  }]),
);

export const grade12PaperAssessments = Object.fromEntries(seeds.map((paper) => [paper.id, {
  title: `${paper.chapter} · Paper 01`,
  mcqAnswerKey: Object.fromEntries(paper.answerKey.map((answer, index) => [index + 1, answer])),
  writtenSolutions: paper.solutions,
}]));
