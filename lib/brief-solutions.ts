const briefSolutionOverrides: Record<string, Record<number, string>> = {
  'g6-patterns-01': {
    17: 'Differences: 3, 5, 7, 9, …; next differences: 11, 13, 15. Next terms: 37, 50, 65; aₙ=n²+1.',
    18: 'T₄=1+2+3+4=10 dots.',
    19: '1+3+⋯+(2n−1)=n². For n=12, the sum is 12²=144.',
    20: '36=6² and 36=T₈=1+2+3+4+5+6+7+8.',
    21: 'aₙ=4+3(n−1)=3n+1, so a₂₀=61 sticks.',
    22: 'Start at 1 and add 2, 4, 6, 8, 10: 1, 3, 7, 13, 21, 31.',
    23: '(a) 1+3+5+7=16; 1+3+5+7+9=25. (b) 1+3+⋯+(2n−1)=n².',
    24: '(a) Add 3 seats per row. (b) a₁₀=35. (c) S₁₀=10/2(8+35)=215 seats.',
  },
};

const briefMcqSolutionOverrides: Record<string, Record<number, string>> = {
  'g6-patterns-01': {
    1: 'The increases are 2, 3, 4, 5; add 6 next: 15+6=21.',
    2: '1, 4, 9, 16 are 1², 2², 3², 4².',
    3: '(2n−1)+2=2n+1, the next odd number.',
    4: '“Hexa” means six, so a hexagon has 6 sides.',
    5: 'The sum of the first n odd numbers is n²; for n=5, it is 25.',
    6: 'The terms are n(n+1); the next term is 5×6=30.',
    7: 'Triangular numbers are 1, 1+2, 1+2+3, …',
    8: '36=6² and 36=1+2+3+4+5+6+7+8.',
    9: 'An n by n square array has n×n=n² dots.',
    10: 'Figure 5 adds 5 dots to Figure 4: 10+5=15.',
    11: 'A periodic pattern repeats after a fixed number of steps.',
    12: 'Add 3 each time: 10+3=13.',
    13: 'Each term is 5 more than the previous term.',
    14: 'Multiply by 3 each time: 27×3=81.',
    15: 'Each new odd-number border turns an n×n square into the next square, so the reason explains the assertion.',
    16: 'An n-row, n-column square array contains n² objects, so the reason explains the assertion.',
  },
};

export function getBriefSolution(paperId: string, questionNumber: number, fallback: string) {
  return briefSolutionOverrides[paperId]?.[questionNumber] ?? fallback;
}

export function getBriefMcqSolution(paperId: string, questionNumber: number) {
  return briefMcqSolutionOverrides[paperId]?.[questionNumber];
}
