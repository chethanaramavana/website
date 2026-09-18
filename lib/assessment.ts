export const mcqAnswerKey: Record<number, number> = {
  1: 0, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 7: 2, 8: 1,
  9: 1, 10: 2, 11: 1, 12: 2, 13: 0, 14: 0, 15: 0, 16: 2,
};

export const writtenQuestionMarks: Record<number, number> = {
  17: 2, 18: 2, 19: 2, 20: 3, 21: 3, 22: 3, 23: 5, 24: 4,
};

export function scoreMcqs(answers: Record<string, number>) {
  return Object.entries(mcqAnswerKey).reduce(
    (score, [question, answer]) => score + (answers[question] === answer ? 1 : 0),
    0,
  );
}
