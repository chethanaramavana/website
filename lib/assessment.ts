export const mcqAnswerKey: Record<number, number> = {
  1: 0, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 7: 2, 8: 1,
  9: 1, 10: 2, 11: 1, 12: 2, 13: 0, 14: 0, 15: 0, 16: 2,
};

export const writtenQuestionMarks: Record<number, number> = {
  17: 2, 18: 2, 19: 2, 20: 3, 21: 3, 22: 3, 23: 5, 24: 4,
};

export const writtenSolutions: Record<number, string> = {
  17: '378 = 2 × 3³ × 7 and 504 = 2³ × 3² × 7. Therefore, HCF = 2 × 3² × 7 = 126.',
  18: 'Assume that 7√5 is rational. Dividing it by the non-zero rational number 7 would make √5 rational, which is a contradiction. Hence, 7√5 is irrational.',
  19: '45 = 3² × 5, 60 = 2² × 3 × 5 and 75 = 3 × 5². Therefore, LCM = 2² × 3² × 5² = 900.',
  20: 'The product of the two integers is HCF × LCM = 18 × 756 = 13,608. The other integer is 13,608 ÷ 108 = 126. Also, 108 = 2² × 3³ and 126 = 2 × 3² × 7, giving HCF 18 and LCM 756.',
  21: 'Assume that 3 + 2√5 is rational, say r. Then √5 = (r − 3) ÷ 2 would be rational, which contradicts the irrationality of √5. Hence, 3 + 2√5 is irrational.',
  22: 'HCF(144, 180) = 36, so each row has 36 students. The boys form 144 ÷ 36 = 4 rows and the girls form 180 ÷ 36 = 5 rows.',
  23: '(a) Assume √3 = p/q in lowest terms. Then 3q² = p², so 3 divides p. Writing p = 3k shows that 3 also divides q, a contradiction. Thus √3 is irrational. (b) If 5 + 2√3 were rational, subtracting 5 and dividing by 2 would make √3 rational. Therefore, 5 + 2√3 is irrational.',
  24: '210 = 2 × 3 × 5 × 7. HCF(84, 126, 210) = 42, so 42 identical packets can be made. Each packet contains 2 red, 3 blue and 5 gold tokens, making 10 tokens in all.',
};

export function scoreMcqs(answers: Record<string, number>) {
  return Object.entries(mcqAnswerKey).reduce(
    (score, [question, answer]) => score + (answers[question] === answer ? 1 : 0),
    0,
  );
}
