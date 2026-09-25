export type QuestionSource = string;

export type PaperDefinition = {
  id: 'real-numbers-01' | 'applications-trigonometry-01';
  chapter: 'Real Numbers' | 'Some Applications of Trigonometry';
  chapterNumber: number;
  paperNumber: string;
  mcqs: { number: number; question: string; options: string[]; source?: QuestionSource }[];
  assertions: { number: number; assertion: string; reason: string }[];
  focus: string;
  written: Record<number, string | string[]>;
  questionSources?: Record<number, QuestionSource>;
  caseStudy: string;
};

export const paperDefinitions: Record<PaperDefinition['chapter'], PaperDefinition> = {
  'Real Numbers': {
    id: 'real-numbers-01',
    chapter: 'Real Numbers',
    chapterNumber: 1,
    paperNumber: '01',
    mcqs: [
      { number: 1, question: 'The prime factorisation of 1260 is', options: ['2² × 3² × 5 × 7', '2³ × 3² × 5 × 7', '2² × 3 × 5 × 7', '2 × 3² × 5² × 7'] },
      { number: 2, question: 'The HCF of 40, 110 and 360 is', options: ['40', '110', '360', '10'], source: 'CBSE Board 2025 · Set 30/2/2 · Q6' },
      { number: 3, question: 'If HCF(65, 117) = 13, then LCM(65, 117) is', options: ['455', '525', '585', '760'] },
      { number: 4, question: 'The least positive number that is exactly divisible by 12, 15 and 18 is', options: ['90', '120', '180', '360'] },
      { number: 5, question: 'If p = 2³ × 3² × 5 and q = 2² × 3³ × 7, then HCF(p, q) is', options: ['12', '18', '36', '108'] },
      { number: 6, question: 'Which of the following is irrational?', options: ['√49', '3 + 2√5', '0.125', '22/7'] },
      { number: 7, question: 'The product of a non-zero rational number and an irrational number is always', options: ['a natural number', 'a rational number', 'an irrational number', 'an integer'] },
      { number: 8, question: 'If a = 2ˣ × 3², b = 2³ × 3 × 5 and HCF(a, b) = 12, then x equals', options: ['1', '2', '3', '4'] },
      { number: 9, question: 'In the prime factorisation of a perfect square, the exponent of every prime is', options: ['odd', 'even', 'a prime number', 'zero'] },
      { number: 10, question: 'A rectangular floor is 8.4 m long and 6 m wide. The greatest possible side of a square tile that fits it exactly is', options: ['60 cm', '100 cm', '120 cm', '140 cm'] },
      { number: 11, question: 'If 5 divides n², where n is a positive integer, then', options: ['5 need not divide n', '5 divides n', '25 always divides n', 'n is irrational'] },
      { number: 12, question: 'For every positive integer n, 6ⁿ cannot end with the digit 0 because its prime factorisation has no factor', options: ['2', '3', '5', '6'] },
      { number: 13, question: 'The number √3 + √12 is equal to', options: ['3√3, which is irrational', '5√3, which is irrational', '15, which is rational', '√15, which is irrational'] },
      { number: 14, question: 'The least number by which 2³ × 3² must be multiplied to make a perfect square is', options: ['2', '3', '6', '12'] },
    ],
    assertions: [
      { number: 15, assertion: 'HCF(26, 91) = 13.', reason: '26 = 2 × 13 and 91 = 7 × 13, and 13 is their greatest common factor.' },
      { number: 16, assertion: '√2 + √3 is an irrational number.', reason: 'The sum of any two irrational numbers is always irrational.' },
    ],
    focus: 'The paper covers the Fundamental Theorem of Arithmetic and proofs of irrationality.',
    written: {
      17: 'Using prime factorisation, find the HCF of 378 and 504.',
      18: 'Show that 7√5 is irrational.',
      19: 'Find the smallest number which is divisible by both 644 and 462.',
      20: 'The HCF and LCM of two positive integers are 18 and 756 respectively. If one integer is 108, find the other integer and verify your answer using prime factorisation.',
      21: 'Prove that 4√2 + 5/3 is an irrational number, given that √2 is irrational.',
      22: 'A school has 144 boys and 180 girls. They are to be arranged in rows so that every row has the same number of students and no row mixes boys and girls. Find the greatest possible number of students in each row. Also find the number of rows of boys and girls.',
      23: ['(a) Prove that √3 is irrational.', '(b) Hence, prove that 5 + 2√3 is irrational.'],
      24: ['(a) Write the prime factorisation of 210. [1]', '(b) Find the greatest possible number of identical packets. [1]', '(c) Find the number of red, blue and gold tokens in each packet. Hence find the total number of tokens in one packet. [2]'],
    },
    questionSources: { 19: 'CBSE Board 2025 · Set 30/3/2 · Q23(a)', 21: 'CBSE Board 2025 · Set 30/3/2 · Q26' },
    caseStudy: 'For Mathematics Day, a teacher has 84 red tokens, 126 blue tokens and 210 gold tokens. She wants to make the greatest possible number of identical prize packets, using every token and placing the same number of each colour in every packet.',
  },
  'Some Applications of Trigonometry': {
    id: 'applications-trigonometry-01',
    chapter: 'Some Applications of Trigonometry',
    chapterNumber: 9,
    paperNumber: '01',
    mcqs: [
      { number: 1, question: 'A 20 m high pole casts a shadow 20√3 m long. The angle of elevation of the Sun is', options: ['30°', '45°', '60°', '90°'] },
      { number: 2, question: 'From a point 30 m from the foot of a tower, its top is seen at an angle of elevation of 45°. The height of the tower is', options: ['15 m', '30 m', '30√3 m', '60 m'] },
      { number: 3, question: 'The angle of depression of a car from the top of a building is 45°. The angle of elevation of the top of the building from the car is', options: ['30°', '45°', '60°', '90°'] },
      { number: 4, question: 'A 10 m ladder makes an angle of 60° with the ground. The height reached on the wall is', options: ['5 m', '5√3 m', '10√3 m', '20 m'] },
      { number: 5, question: 'A 15 m high tower is viewed from a point 15√3 m away. The angle of elevation is', options: ['30°', '45°', '60°', '75°'] },
      { number: 6, question: 'If the length of the shadow of a vertical pole is equal to its height, the angle of elevation of the Sun is', options: ['30°', '45°', '60°', '90°'] },
      { number: 7, question: 'The straight line joining an observer’s eye to the object being viewed is called the', options: ['horizontal line', 'line of sight', 'vertical line', 'base line'] },
      { number: 8, question: 'The top of a tower is seen at 30° from a point 50 m from its foot. The height of the tower is', options: ['25 m', '25√3 m', '50√3/3 m', '50√3 m'] },
      { number: 9, question: 'A student 1.5 m tall stands 20 m from a building. If the angle of elevation of its top from her eye is 45°, the building is', options: ['18.5 m', '20 m', '21.5 m', '40 m'] },
      { number: 10, question: 'A taut 100 m kite string makes an angle of 60° with the horizontal. Ignoring the height of the hand, the kite is at a height of', options: ['50 m', '50√3 m', '100 m', '100√3 m'] },
      { number: 11, question: 'An aeroplane at a height of 1000 m is seen at an angle of elevation of 30°. The line-of-sight distance is', options: ['500 m', '1000 m', '1000√3 m', '2000 m'] },
      { number: 12, question: 'As an observer walks towards a tower on level ground, the angle of elevation of its top generally', options: ['decreases', 'increases', 'remains unchanged', 'becomes zero'] },
      { number: 13, question: 'From the top of a 30 m lighthouse, the angle of depression of a boat is 60°. Its horizontal distance from the lighthouse is', options: ['10√3 m', '15√3 m', '30√3 m', '60 m'] },
      { number: 14, question: 'When the angle of elevation of the Sun increases, the shadow of a fixed vertical object', options: ['becomes longer', 'becomes shorter', 'remains the same', 'first doubles'] },
    ],
    assertions: [
      { number: 15, assertion: 'If the height of a tower equals the horizontal distance of an observer from its foot, the angle of elevation of its top is 45°.', reason: 'tan 45° = 1.' },
      { number: 16, assertion: 'The angle of depression of an object from a horizontal line equals the angle of elevation of the observer from the object.', reason: 'The two horizontal lines are parallel, so the relevant alternate interior angles are equal.' },
    ],
    focus: 'Draw a labelled right triangle wherever required. Assume the ground is level and objects are vertical.',
    written: {
      17: 'A tree casts a shadow 10√3 m long when the angle of elevation of the Sun is 30°. Find the height of the tree.',
      18: 'A 13 m ladder reaches a window 12 m above the ground. Find the distance of the foot of the ladder from the wall.',
      19: 'A 50 m kite string makes an angle of 60° with the horizontal. If the hand holding it is 1.5 m above the ground, find the height of the kite above the ground.',
      20: 'From a point 20 m from the foot of a vertical tower, the angle of elevation of its top is 60°. Draw a labelled figure and find the height of the tower.',
      21: 'From the top of a 20 m building, the angle of depression of the foot of a tower is 30° and the angle of elevation of its top is 45°. Find the height of the tower.',
      22: 'The angles of elevation of the top of a tower from two points on the same straight line with its foot are 60° and 30°. The points are 20 m apart and lie on the same side of the tower. Find the height of the tower.',
      23: ['From the top of a 60 m lighthouse, the angles of depression of two boats on the same side are 30° and 60°.', '(a) Draw a labelled diagram.', '(b) Find the distance between the two boats.'],
      24: ['(a) Name the trigonometric ratio that relates height and horizontal distance. [1]', '(b) If the original distance is x metres, write the two equations for the observations. [1]', '(c) Find the original distance from the tower and the height of the tower. [2]'],
    },
    caseStudy: 'A surveyor observes the top of a tower at an angle of elevation of 45°. After walking 40 m directly towards the tower, the angle becomes 60°. The surveyor’s eye level is taken at ground level for this calculation.',
  },
};

export const paperDefinitionsById = Object.fromEntries(
  Object.values(paperDefinitions).map((paper) => [paper.id, paper]),
) as Record<PaperDefinition['id'], PaperDefinition>;

export function isPaperDefinition(value: unknown): value is PaperDefinition {
  if (!value || typeof value !== 'object') return false;
  const paper = value as Partial<PaperDefinition>;
  if (!paper.id || !paper.chapter || !Array.isArray(paper.mcqs) || paper.mcqs.length !== 14) return false;
  if (!Array.isArray(paper.assertions) || paper.assertions.length !== 2 || !paper.written) return false;
  if (paper.mcqs.some((item) => !item || typeof item.question !== 'string' || item.question.length > 600 || !Array.isArray(item.options) || item.options.length !== 4 || item.options.some((option) => typeof option !== 'string' || option.length > 250))) return false;
  if (paper.assertions.some((item) => !item || typeof item.assertion !== 'string' || typeof item.reason !== 'string')) return false;
  return [17, 18, 19, 20, 21, 22, 23, 24].every((number) => typeof paper.written?.[number] === 'string' || Array.isArray(paper.written?.[number]));
}
