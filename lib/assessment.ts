import { additionalPaperAssessments } from './assessment-additional';

export const writtenQuestionMarks: Record<number, number> = {
  17: 2, 18: 2, 19: 2, 20: 3, 21: 3, 22: 3, 23: 5, 24: 4,
};

type PaperAssessment = {
  title: string;
  mcqAnswerKey: Record<number, number>;
  writtenSolutions: Record<number, string>;
};

const basePaperAssessments: Record<string, PaperAssessment> = {
  'real-numbers-01': {
    title: 'Real Numbers · Paper 01',
    mcqAnswerKey: {
      1: 0, 2: 3, 3: 2, 4: 2, 5: 2, 6: 1, 7: 2, 8: 1,
      9: 1, 10: 2, 11: 1, 12: 2, 13: 0, 14: 0, 15: 0, 16: 2,
    },
    writtenSolutions: {
      17: '378 = 2 × 3³ × 7 and 504 = 2³ × 3² × 7. Therefore, HCF = 2 × 3² × 7 = 126.',
      18: 'Assume that 7√5 is rational. Dividing it by the non-zero rational number 7 would make √5 rational, which is a contradiction. Hence, 7√5 is irrational.',
      19: '644 = 2² × 7 × 23 and 462 = 2 × 3 × 7 × 11. Therefore, LCM = 2² × 3 × 7 × 11 × 23 = 21,252.',
      20: 'The product of the two integers is HCF × LCM = 18 × 756 = 13,608. The other integer is 13,608 ÷ 108 = 126. Also, 108 = 2² × 3³ and 126 = 2 × 3² × 7, giving HCF 18 and LCM 756.',
      21: 'Assume that 4√2 + 5/3 is rational, say r. Then √2 = (r − 5/3) ÷ 4 would be rational because rational numbers are closed under subtraction and division by a non-zero rational number. This contradicts the given fact that √2 is irrational. Hence, 4√2 + 5/3 is irrational.',
      22: 'HCF(144, 180) = 36, so each row has 36 students. The boys form 144 ÷ 36 = 4 rows and the girls form 180 ÷ 36 = 5 rows.',
      23: '(a) Assume √3 = p/q in lowest terms. Then 3q² = p², so 3 divides p. Writing p = 3k shows that 3 also divides q, a contradiction. Thus √3 is irrational. (b) If 5 + 2√3 were rational, subtracting 5 and dividing by 2 would make √3 rational. Therefore, 5 + 2√3 is irrational.',
      24: '210 = 2 × 3 × 5 × 7. HCF(84, 126, 210) = 42, so 42 identical packets can be made. Each packet contains 2 red, 3 blue and 5 gold tokens, making 10 tokens in all.',
    },
  },
  'applications-trigonometry-01': {
    title: 'Some Applications of Trigonometry · Paper 01',
    mcqAnswerKey: {
      1: 0, 2: 1, 3: 1, 4: 1, 5: 0, 6: 1, 7: 1, 8: 2,
      9: 2, 10: 1, 11: 3, 12: 1, 13: 0, 14: 1, 15: 0, 16: 0,
    },
    writtenSolutions: {
      17: 'Let the tree height be h. tan 30° = h/(10√3), so h = 10√3 × 1/√3 = 10 m.',
      18: 'Using Pythagoras, the ground distance is √(13² − 12²) = √25 = 5 m.',
      19: 'Height above the hand = 50 sin 60° = 25√3 m. Adding the hand height, the kite is 25√3 + 1.5 m above the ground (about 44.8 m).',
      20: 'Let the tower height be h. tan 60° = h/20, hence h = 20√3 m.',
      21: 'Let the horizontal distance be d. From the angle of depression, tan 30° = 20/d, so d = 20√3 m. The extra height of the tower is d tan 45° = 20√3 m. Therefore, tower height = 20 + 20√3 m.',
      22: 'Let the nearer point be x m from the tower and the height be h. Then h = x tan 60° = x√3 and h = (x + 20) tan 30° = (x + 20)/√3. Thus 3x = x + 20, giving x = 10 and h = 10√3 m.',
      23: 'The farther boat is 60/tan 30° = 60√3 m from the lighthouse and the nearer boat is 60/tan 60° = 20√3 m away. Their separation is 40√3 m.',
      24: 'Use tan θ = height/horizontal distance. If the original distance is x and the height is h, then h/x = tan 45° and h/(x − 40) = tan 60°. Hence h = x and x = √3(x − 40). Solving gives x = h = 60 + 20√3 m.',
    },
  },
};

export const paperAssessments: Record<string, PaperAssessment> = {
  ...basePaperAssessments,
  ...additionalPaperAssessments,
};

export function getPaperAssessment(paperId: string) {
  return paperAssessments[paperId] ?? null;
}

export function scoreMcqs(answers: Record<string, number>, answerKey: Record<number, number>) {
  return Object.entries(answerKey).reduce(
    (score, [question, answer]) => score + (answers[question] === answer ? 1 : 0),
    0,
  );
}
