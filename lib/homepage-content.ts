// Preview content for the homepage design review. The teacher-area publishing
// workflow will replace this source when weekly-problem editing is implemented.
export const homepageProblem = {
  number: 1,
  question: '1 and 36 are both square and triangular numbers. What is the next number that is both?',
  solution: 'The next is $1225$: it is $35^2$, and also the sum of the first 49 positive integers.',
  working: 'A triangular number has the form $n(n+1)/2$. For $n=49$, $49\\times50/2=1225$. Checking the triangular numbers after 36 up to this point gives no earlier square.',
} as const;
