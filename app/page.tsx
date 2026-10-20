'use client';
import GoogleSignIn from './google-sign-in';
import LearningHeader from './learning-header';
import { SiteFooter } from './brand';
import ChapterFigure from './chapter-figure';
import KaprekarToy from './kaprekar-toy';
import { quizListings } from '@/lib/free-quizzes/catalog';
import { quizPrice } from '@/lib/free-quizzes/catalog';
import { useTestActivity } from '@/app/student-activity';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Folder,
  FolderOpen,
  GraduationCap,
  Headphones,
  Home,
  LockKeyhole,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Minus,
  Save,
  Send,
  ShieldCheck,
  Star,
  Timer,
  Upload,
  UserRound,
  X,
} from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MathText from '@/app/notes/math-text';
import { getPaperDefinition as getSharedPaperDefinition, paperDefinitionsById, type QuestionVisual } from '@/lib/papers';
import { getBriefMcqSolution } from '@/lib/brief-solutions';
import SolutionSteps from '@/app/solution-steps';
import Homepage from './homepage';

const boards = [
  { name: 'CBSE', ready: true },
  { name: 'ICSE', ready: true },
  { name: 'IGCSE', ready: false },
] as const;

type BoardName = (typeof boards)[number]['name'];

const helpDeskEmail = 'chethanamanasa21@gmail.com';
const helpDeskPhone = '+91 93539 28169';
const googleMapsUrl = 'https://www.google.com/maps?cid=9059168596499950165';
const googleMapsEmbedUrl = 'https://www.google.com/maps?q=12.9011804,77.6539704&z=16&output=embed';



const grade10Chapters = [
  'Real Numbers',
  'Polynomials',
  'Pair of Linear Equations in Two Variables',
  'Quadratic Equations',
  'Arithmetic Progressions',
  'Triangles',
  'Coordinate Geometry',
  'Introduction to Trigonometry',
  'Some Applications of Trigonometry',
  'Circles',
  'Areas Related to Circles',
  'Surface Areas and Volumes',
  'Statistics',
  'Probability',
];

const grade6Chapters = [
  'Patterns in Mathematics',
  'Lines and Angles',
  'Number Play',
  'Data Handling and Presentation',
  'Prime Time',
  'Perimeter and Area',
  'Fractions',
  'Playing with Constructions',
  'Symmetry',
  'The Other Side of Zero',
];

const grade12Chapters = [
  'Relations and Functions',
  'Inverse Trigonometric Functions',
  'Matrices',
  'Determinants',
  'Continuity and Differentiability',
  'Applications of Derivatives',
  'Integrals',
  'Applications of Integrals',
  'Differential Equations',
  'Vector Algebra',
  'Three Dimensional Geometry',
  'Linear Programming',
  'Probability',
];

const grade11Chapters = [
  'Sets',
  'Relations and Functions',
  'Trigonometric Functions',
  'Complex Numbers and Quadratic Equations',
  'Linear Inequalities',
  'Permutations and Combinations',
  'Binomial Theorem',
  'Sequences and Series',
  'Straight Lines',
  'Conic Sections',
  'Introduction to Three-dimensional Geometry',
  'Limits and Derivatives',
  'Statistics',
  'Probability',
];

const icseGrade6Chapters = [
  'Knowing Our Numbers',
  'Whole Numbers',
  'Playing with Numbers',
  'Integers',
  'Sets',
  'Fractions',
  'Decimals',
  'Ratio and Proportion',
  'Percentage and Unitary Method',
  'Speed, Time and Distance',
  'Algebraic Expressions',
  'Simple Linear Equations',
  'Basic Geometrical Ideas',
  'Angles, Triangles and Quadrilaterals',
  'Three-Dimensional Shapes and Nets',
  'Symmetry and Practical Geometry',
  'Perimeter, Area and Unit Conversions',
  'Data Handling',
];

const chaptersByBoard: Record<BoardName, Record<number, string[]>> = {
  CBSE: { 6: grade6Chapters, 10: grade10Chapters, 11: grade11Chapters, 12: grade12Chapters },
  ICSE: { 6: icseGrade6Chapters },
  IGCSE: {},
};

function chaptersFor(board: BoardName | null, grade: number) {
  return board ? chaptersByBoard[board][grade] ?? [] : [];
}

const realNumbersMcqs = [
  {
    number: 1,
    question: 'The prime factorisation of 1260 is',
    options: ['2² × 3² × 5 × 7', '2³ × 3² × 5 × 7', '2² × 3 × 5 × 7', '2 × 3² × 5² × 7'],
  },
  {
    number: 2,
    question: 'The HCF of 40, 110 and 360 is',
    options: ['40', '110', '360', '10'],
    source: 'CBSE Board 2025 · Set 30/2/2 · Q6',
  },
  {
    number: 3,
    question: 'If HCF(65, 117) = 13, then LCM(65, 117) is',
    options: ['455', '525', '585', '760'],
  },
  {
    number: 4,
    question: 'The least positive number that is exactly divisible by 12, 15 and 18 is',
    options: ['90', '120', '180', '360'],
  },
  {
    number: 5,
    question: 'If p = 2³ × 3² × 5 and q = 2² × 3³ × 7, then HCF(p, q) is',
    options: ['12', '18', '36', '108'],
  },
  {
    number: 6,
    question: 'Which of the following is irrational?',
    options: ['√49', '3 + 2√5', '0.125', '22/7'],
  },
  {
    number: 7,
    question: 'The product of a non-zero rational number and an irrational number is always',
    options: ['a natural number', 'a rational number', 'an irrational number', 'an integer'],
  },
  {
    number: 8,
    question: 'If a = 2ˣ × 3², b = 2³ × 3 × 5 and HCF(a, b) = 12, then x equals',
    options: ['1', '2', '3', '4'],
  },
  {
    number: 9,
    question: 'In the prime factorisation of a perfect square, the exponent of every prime is',
    options: ['odd', 'even', 'a prime number', 'zero'],
  },
  {
    number: 10,
    question: 'A rectangular floor is 8.4 m long and 6 m wide. The greatest possible side of a square tile that fits it exactly is',
    options: ['60 cm', '100 cm', '120 cm', '140 cm'],
  },
  {
    number: 11,
    question: 'If 5 divides n², where n is a positive integer, then',
    options: ['5 need not divide n', '5 divides n', '25 always divides n', 'n is irrational'],
  },
  {
    number: 12,
    question: 'For every positive integer n, 6ⁿ cannot end with the digit 0 because its prime factorisation has no factor',
    options: ['2', '3', '5', '6'],
  },
  {
    number: 13,
    question: 'The number √3 + √12 is equal to',
    options: ['3√3, which is irrational', '5√3, which is irrational', '15, which is rational', '√15, which is irrational'],
  },
  {
    number: 14,
    question: 'The least number by which 2³ × 3² must be multiplied to make a perfect square is',
    options: ['2', '3', '6', '12'],
  },
] as const;

const applicationsTrigonometryMcqs = [
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
] as const;

const assertionReasonOptions = [
  'Both A and R are true, and R is the correct explanation of A.',
  'Both A and R are true, but R is not the correct explanation of A.',
  'A is true, but R is false.',
  'A is false, but R is true.',
] as const;

type PaperDefinition = {
  id: string;
  chapter: string;
  chapterNumber: number;
  paperNumber: string;
  board?: 'CBSE' | 'ICSE';
  grade?: number;
  book?: string;
  mcqs: readonly { number: number; question: string; options: readonly string[]; source?: string }[];
  assertions: readonly { number: number; assertion: string; reason: string }[];
  focus: string;
  written: Record<number, string | readonly string[]>;
  questionSources?: Record<number, string>;
  questionVisuals?: Partial<Record<number, QuestionVisual>>;
  caseStudy: string;
};

const paperDefinitions: Record<PaperDefinition['chapter'], PaperDefinition> = {
  'Real Numbers': {
    id: 'real-numbers-01', chapter: 'Real Numbers', chapterNumber: 1, paperNumber: '01', mcqs: realNumbersMcqs,
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
    questionSources: {
      19: 'CBSE Board 2025 · Set 30/3/2 · Q23(a)',
      21: 'CBSE Board 2025 · Set 30/3/2 · Q26',
    },
    caseStudy: 'For Mathematics Day, a teacher has 84 red tokens, 126 blue tokens and 210 gold tokens. She wants to make the greatest possible number of identical prize packets, using every token and placing the same number of each colour in every packet.',
  },
  'Some Applications of Trigonometry': {
    id: 'applications-trigonometry-01', chapter: 'Some Applications of Trigonometry', chapterNumber: 9, paperNumber: '01', mcqs: applicationsTrigonometryMcqs,
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

function getPaperForChapter(board: BoardName, grade: number, chapterName: string) {
  if (board === 'IGCSE') return null;
  return getSharedPaperDefinition(grade, chapterName, board)
    ?? (((board === 'CBSE' && paperDefinitions[chapterName] && (paperDefinitions[chapterName].grade ?? 10) === grade)
      ? paperDefinitions[chapterName]
      : null));
}

type HomePageProps = {
  initialBoard?: BoardName | null;
  initialGrade?: number | null;
  initialChapterNumber?: number | null;
};

function boardPath(board: BoardName) {
  return `/${board.toLowerCase()}`;
}

function chapterPath(board: BoardName, grade: number, chapterName: string) {
  const chapterNumber = chaptersFor(board, grade).indexOf(chapterName) + 1;
  return chapterNumber > 0 ? `${boardPath(board)}/grade-${grade}/ch-${chapterNumber}` : `${boardPath(board)}/grade-${grade}`;
}

export default function HomePage({ initialBoard = null, initialGrade = null, initialChapterNumber = null }: HomePageProps = {}) {
  const initialChapter = initialGrade && initialChapterNumber
    ? chaptersFor(initialBoard, initialGrade)[initialChapterNumber - 1] ?? null
    : null;
  const initialPaper = initialChapter && initialGrade && initialBoard ? getPaperForChapter(initialBoard, initialGrade, initialChapter) : null;
  const [board, setBoard] = useState<BoardName | null>(initialBoard);
  const [grade, setGrade] = useState<number | null>(initialGrade);
  const [chapter, setChapter] = useState<string | null>(initialChapter);
  const [studentRecords, setStudentRecords] = useState<StudentRecords | null>(null);
  const [requestedPaperId, setRequestedPaperId] = useState<string | null>(null);
  const [takingPaper, setTakingPaper] = useState(false);
  useEffect(() => { if (initialPaper && new URLSearchParams(window.location.search).has('paper')) { setChapter(null); setRequestedPaperId(initialPaper.id); } }, []);
  const [routePaymentChapter, setRoutePaymentChapter] = useState<string | null>(null);

  const loadStudentRecords = useCallback(async () => {
    try {
      const response = await fetch('/api/student/records', { cache: 'no-store' });
      if (!response.ok) return;
      setStudentRecords(await response.json() as StudentRecords);
    } catch {
      // Account data is helpful but must never block the public chapter library.
    }
  }, []);

  useEffect(() => { void loadStudentRecords(); }, [loadStudentRecords]);

  useEffect(() => {
    if (!requestedPaperId || studentRecords === null) return;

    const requestedPaper = paperDefinitionsById[requestedPaperId];
    const hasAccess = studentRecords.access.includes(requestedPaperId)
      || studentRecords.submissions.some((submission) => submission.paper_id === requestedPaperId);

    if (requestedPaper && studentRecords.signedIn && hasAccess) {
      setBoard(requestedPaper.board ?? 'CBSE');
      setGrade(requestedPaper.grade ?? 10);
      setTakingPaper(true);
      setChapter(requestedPaper.chapter);
    } else {
      setRoutePaymentChapter(requestedPaper?.chapter ?? null);
    }
    setRequestedPaperId(null);
  }, [requestedPaperId, studentRecords]);

  function updateAddress(path: string, replace = false) {
    if (window.location.pathname === path && !window.location.search) return;
    window.history[replace ? 'replaceState' : 'pushState'](null, '', path);
  }

  function clearRequestedPaper() {
    setTakingPaper(false);
    setRequestedPaperId(null);
    setRoutePaymentChapter(null);
  }

  function goHome() {
    clearRequestedPaper();
    updateAddress('/');
    setBoard(null);
    setGrade(null);
    setChapter(null);
  }

  function openBoard(nextBoard: BoardName) {
    clearRequestedPaper();
    updateAddress(nextBoard === 'IGCSE' ? '/' : boardPath(nextBoard));
    setBoard(nextBoard);
    setGrade(null);
    setChapter(null);
  }

  function openGrade(nextGrade: number) {
    if (!board) return;
    const currentScrollPosition = window.scrollY;
    clearRequestedPaper();
    updateAddress(`${boardPath(board)}/grade-${nextGrade}`);
    setGrade(nextGrade);
    setChapter(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollPosition, behavior: 'auto' });
    });
  }

  function openChapter(nextChapter: string) {
    if (board && grade !== null) updateAddress(`${chapterPath(board, grade, nextChapter)}?paper=1`);
    setTakingPaper(true);
    setChapter(nextChapter);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  }

  function returnToChapters() {
    clearRequestedPaper();
    if (board && grade !== null) updateAddress(`${boardPath(board)}/grade-${grade}`);
    setChapter(null);
  }

  useEffect(() => {
    const handleBackOrForward = () => {
      const path = window.location.pathname;
      if (path === '/') {
        clearRequestedPaper();
        setBoard(null);
        setGrade(null);
        setChapter(null);
        return;
      }
      const boardMatch = path.match(/^\/(cbse|icse)\/?$/);
      if (boardMatch) {
        clearRequestedPaper();
        setBoard(boardMatch[1].toUpperCase() as BoardName);
        setGrade(null);
        setChapter(null);
        return;
      }
      const match = path.match(/^\/(cbse|icse)\/grade-(6|10|11|12)(?:\/ch-(\d+))?\/?$/);
      if (!match) return;
      const nextBoard = match[1].toUpperCase() as BoardName;
      const nextGrade = Number(match[2]);
      if (!chaptersFor(nextBoard, nextGrade).length) return;
      const nextChapter = match[3] ? chaptersFor(nextBoard, nextGrade)[Number(match[3]) - 1] ?? null : null;
      clearRequestedPaper();
      setBoard(nextBoard);
      setGrade(nextGrade);
      const nextPaper = nextChapter ? getPaperForChapter(nextBoard, nextGrade, nextChapter) : null;
      const hasAccess = nextPaper && studentRecords?.signedIn && (
        studentRecords.access.includes(nextPaper.id)
        || studentRecords.submissions.some((submission) => submission.paper_id === nextPaper.id)
      );
      if (nextPaper && new URLSearchParams(window.location.search).has('paper') && !hasAccess) {
        setChapter(null);
        setRoutePaymentChapter(nextChapter);
      } else {
        setTakingPaper(new URLSearchParams(window.location.search).has('paper') && !!hasAccess);
        setChapter(nextChapter);
      }
    };
    window.addEventListener('popstate', handleBackOrForward);
    return () => window.removeEventListener('popstate', handleBackOrForward);
  }, [studentRecords]);

  if (board === null) return <Homepage signedIn={studentRecords?.signedIn ?? false} />;

  return (
    <main className="site-shell">
      <LearningHeader signedIn={studentRecords?.signedIn ?? false} />

      {grade === null ? (
        <BoardView board={board} onHome={goHome} onOpenGrade={openGrade} />
      ) : !chapter ? (
        <ChaptersView onCloseAccess={() => { const previous = routePaymentChapter; setRoutePaymentChapter(null); if (previous) setChapter(previous); }} onBrowseChapter={(name) => { clearRequestedPaper(); if (board && grade) updateAddress(chapterPath(board, grade, name)); setChapter(name); window.scrollTo({top: 0}); }} board={board} grade={grade} onHome={goHome} onBoard={() => openBoard(board)} onOpenChapter={openChapter} initialPendingChapter={routePaymentChapter} studentRecords={studentRecords} refreshStudentRecords={loadStudentRecords} />
      ) : (
        <ChapterView takingPaper={takingPaper} onStartPaper={() => { setRoutePaymentChapter(chapter); setChapter(null); }} board={board} grade={grade} chapter={chapter} onHome={goHome} onBoard={() => openBoard(board)} onChapters={returnToChapters} />
      )}

      <section className="help-desk" id="help-desk" aria-labelledby="help-desk-title">
        <span className="help-desk-icon"><Headphones /></span>
        <div className="help-desk-copy">
          <p>Need assistance?</p>
          <h2 id="help-desk-title">Ramavana Help Desk</h2>
          <span>For login, payment and test-submission support.</span>
        </div>
        <div className="help-desk-contacts">
          {helpDeskPhone && <a href={`tel:${helpDeskPhone.replace(/\s/g, '')}`}><span>Call us</span><strong>{helpDeskPhone}</strong></a>}
          <a href={`mailto:${helpDeskEmail}`}><Mail /><span><small>Email us</small><strong>{helpDeskEmail}</strong></span></a>
        </div>
      </section>

      {board === null && (
        <section className="centre-location" id="location" aria-labelledby="location-title">
          <div className="centre-location-copy">
            <p className="centre-location-kicker"><MapPin /> Visit Ramavana</p>
            <h2 id="location-title">Find us in HSR Layout, Bengaluru</h2>
            <p className="centre-location-address">Near Sobha Daffodil, Haralur, PWD Quarters, 1st Sector, HSR Layout, Harlur, Bengaluru, Karnataka 560102.</p>
            <div className="centre-location-actions">
              <a className="centre-location-primary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin /> Open in Google Maps <ExternalLink />
              </a>
              <a className="centre-location-website" href="/">ramavanamath.com</a>
            </div>
          </div>
          <div className="centre-location-map">
            <span className="centre-location-map-fallback"><MapPin /> Interactive Google map</span>
            <iframe
              title="Ramavana Mathematical Centre location on Google Maps"
              src={googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

function BoardView({ board, onHome, onOpenGrade }: { board: BoardName; onHome: () => void; onOpenGrade: (grade: number) => void }) {
  const isCbse = board === 'CBSE';
  const isIcse = board === 'ICSE';
  return (
    <div className="content-view">
      <Breadcrumb items={[{ label: board }]} onHome={onHome} />
      <section className="folder-page-heading">
        <span className="large-folder"><FolderOpen /></span>
        <div><p>Board</p><h1>{board}</h1><span>Mathematics</span></div>
      </section>
      {isCbse ? (
        <section className="folder-content">
          <div className="list-heading"><h2>Grades</h2><span>4 grades</span></div>
          <div className="grade-folder-list">
            <button className="grade-folder" type="button" onClick={() => onOpenGrade(6)}>
              <span className="folder-icon"><GraduationCap /></span>
              <span><small>CBSE · Ganita Prakash</small><strong>Grade 6</strong><em>10 chapters</em></span>
              <ChevronRight />
            </button>
            <button className="grade-folder" type="button" onClick={() => onOpenGrade(10)}>
              <span className="folder-icon"><GraduationCap /></span>
              <span><small>CBSE Mathematics</small><strong>Grade 10</strong><em>14 chapters</em></span>
              <ChevronRight />
            </button>
            <button className="grade-folder" type="button" onClick={() => onOpenGrade(11)}>
              <span className="folder-icon"><GraduationCap /></span>
              <span><small>CBSE · NCERT Mathematics</small><strong>Grade 11</strong><em>14 chapters</em></span>
              <ChevronRight />
            </button>
            <button className="grade-folder" type="button" onClick={() => onOpenGrade(12)}>
              <span className="folder-icon"><GraduationCap /></span>
              <span><small>CBSE Mathematics · Part II</small><strong>Grade 12</strong><em>13 chapters</em></span>
              <ChevronRight />
            </button>
          </div>
        </section>
      ) : isIcse ? (
        <section className="folder-content">
          <div className="list-heading"><h2>Grades</h2><span>1 grade</span></div>
          <div className="grade-folder-list">
            <button className="grade-folder" type="button" onClick={() => onOpenGrade(6)}>
              <span className="folder-icon"><GraduationCap /></span>
              <span><small>ICSE · CISCE Upper Primary Curriculum</small><strong>Grade 6</strong><em>18 chapters</em></span>
              <ChevronRight />
            </button>
          </div>
        </section>
      ) : (
        <section className="empty-folder">
          <span><Folder /></span>
          <h2>Chapters are coming soon.</h2>
          <p>Grades and chapters will be added later.</p>
          <button type="button" onClick={onHome}><ArrowLeft /> Back to curricula</button>
        </section>
      )}
    </div>
  );
}

type PaymentStatus = 'idle' | 'approved' | 'rejected';
type StudentSubmission = {
  id: string;
  paper_id: string;
  student_name: string;
  status: 'submitted' | 'marked';
  submitted_at: string;
};
type StudentPayment = { paper_id: string; student_name: string; transaction_id: string; amount_paise: number; created_at: string; reviewed_at: string | null; payment_source: 'razorpay' | 'manual' };
type StudentRecords = { signedIn: boolean; email?: string; displayName?: string; access: string[]; payments: StudentPayment[]; submissions: StudentSubmission[] };
type RazorpayStatus = 'idle' | 'starting' | 'checkout' | 'verifying';

type RazorpaySuccess = { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string };
type RazorpayCheckout = { open: () => void; close?: () => void; on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

function ChaptersView({ board, grade, onHome, onBoard, onOpenChapter, initialPendingChapter, studentRecords, refreshStudentRecords, onBrowseChapter, onCloseAccess }: { onCloseAccess: () => void; onBrowseChapter: (chapter: string) => void; board: BoardName; grade: number; onHome: () => void; onBoard: () => void; onOpenChapter: (chapter: string) => void; initialPendingChapter?: string | null; studentRecords: StudentRecords | null; refreshStudentRecords: () => Promise<void> }) {
  const [pendingChapter, setPendingChapter] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [razorpayStatus, setRazorpayStatus] = useState<RazorpayStatus>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');
  const razorpayRecoveryTimerRef = useRef<number | null>(null);
  const razorpayRecoveryAttemptsRef = useRef(0);
  const chapters = chaptersFor(board, grade);
  const pendingPaper = pendingChapter ? getPaperForChapter(board, grade, pendingChapter) : null;
  const isAvailablePaper = Boolean(pendingPaper && (pendingPaper.grade ?? 10) === grade);
  const selectedPaper = isAvailablePaper ? pendingPaper : null;
  const completedSubmission = selectedPaper
    ? studentRecords?.submissions.find((submission) => submission.paper_id === selectedPaper.id)
    : undefined;

  const stopRazorpayRecoveryTimer = useCallback(() => {
    if (razorpayRecoveryTimerRef.current !== null) window.clearInterval(razorpayRecoveryTimerRef.current);
    razorpayRecoveryTimerRef.current = null;
  }, []);

  useEffect(() => () => stopRazorpayRecoveryTimer(), [stopRazorpayRecoveryTimer]);

  useEffect(() => {
    if (initialPendingChapter) setPendingChapter(initialPendingChapter);
  }, [initialPendingChapter]);

  function openPaperAfterDialog(chapterName: string) {
    setPendingChapter(null);
    window.setTimeout(() => {
      const root = document.documentElement;
      const body = document.body;
      root.removeAttribute('data-base-ui-scroll-locked');
      root.style.overflowX = '';
      root.style.overflowY = '';
      root.style.scrollbarGutter = '';
      root.style.scrollBehavior = '';
      body.style.position = '';
      body.style.height = '';
      body.style.width = '';
      body.style.boxSizing = '';
      body.style.overflowX = '';
      body.style.overflowY = '';
      body.style.scrollBehavior = '';
      onOpenChapter(chapterName);
    }, 120);
  }

  useEffect(() => {
    if (!pendingChapter || !selectedPaper || !studentRecords?.signedIn || completedSubmission) return;
    if (studentRecords.access.includes(selectedPaper.id)) openPaperAfterDialog(pendingChapter);
  }, [completedSubmission, pendingChapter, selectedPaper, studentRecords]);

  const checkRazorpayStatus = useCallback(async (chapterName: PaperDefinition['chapter'], options: { silent?: boolean } = {}) => {
    const paper = getPaperForChapter(board, grade, chapterName);
    if (!paper || !studentRecords?.signedIn) return false;
    if (!options.silent) {
      setRazorpayStatus('verifying');
      setPaymentMessage('Checking Razorpay for a completed payment…');
    }
    try {
      const response = await fetch('/api/razorpay/status', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ paperId: paper.id }),
      });
      const payload = await response.json() as { approved?: boolean; status?: 'none' | 'pending' | 'approved'; error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'The payment status could not be checked.');
      if (payload.approved) {
        void refreshStudentRecords();
        setRazorpayStatus('idle');
        setPaymentStatus('approved');
        setPaymentMessage('Payment verified. Opening your question paper…');
        openPaperAfterDialog(chapterName);
        return true;
      }
      if (!options.silent) {
        setRazorpayStatus('idle');
        setPaymentMessage(payload.status === 'pending'
          ? 'Razorpay has not confirmed a completed payment yet. You can reopen checkout or check again.'
          : 'No earlier Razorpay payment was found for this chapter.');
      }
      return false;
    } catch (error) {
      if (!options.silent) {
        setRazorpayStatus('idle');
        setPaymentMessage(error instanceof Error ? error.message : 'The payment status could not be checked.');
      }
      return false;
    }
  }, [board, grade, onOpenChapter, refreshStudentRecords, studentRecords?.signedIn]);

  async function startRazorpayPayment() {
    if (!selectedPaper || !pendingChapter) return;
    if (!studentRecords?.signedIn) {
      setPaymentMessage('Please log in or sign up before paying. This keeps the chapter and marks on the student account.');
      return;
    }
    const name = studentRecords.displayName?.trim() || studentRecords.email?.split('@')[0] || 'Student';

    setRazorpayStatus('starting');
    setPaymentMessage('Opening secure Razorpay checkout…');
    try {
      const orderResponse = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ studentName: name, paperId: selectedPaper.id }),
      });
      const order = await orderResponse.json() as { keyId?: string; orderId?: string; amount?: number; currency?: string; alreadyPaid?: boolean; error?: string };
      if (!orderResponse.ok) throw new Error(order.error ?? 'Razorpay could not start the payment.');
      if (order.alreadyPaid) {
        void refreshStudentRecords();
        openPaperAfterDialog(pendingChapter);
        return;
      }
      if (!order.keyId || !order.orderId || !order.amount || !order.currency) throw new Error('Razorpay returned an incomplete order.');

      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const existing = document.querySelector<HTMLScriptElement>('script[data-ramavana-razorpay]');
          if (existing) {
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error('Razorpay checkout could not load.')), { once: true });
            return;
          }
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.dataset.ramavanaRazorpay = 'true';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Razorpay checkout could not load.'));
          document.head.appendChild(script);
        });
      }
      if (!window.Razorpay) throw new Error('Razorpay checkout is unavailable.');

      const chapterName = pendingChapter;
      let recoveryInFlight = false;
      stopRazorpayRecoveryTimer();
      razorpayRecoveryAttemptsRef.current = 0;
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Ramavana Mathematical Centre',
        description: `${selectedPaper.chapter} chapter test`,
        order_id: order.orderId,
        prefill: { name, email: studentRecords.email },
        hidden: { contact: true, email: true },
        notes: { chapter: selectedPaper.chapter },
        theme: { color: '#011E47' },
        modal: { ondismiss: () => {
          setRazorpayStatus('verifying');
          setPaymentMessage('Checkout closed. Automatically checking whether a payment completed…');
          void checkRazorpayStatus(chapterName);
        } },
        handler: async (response: RazorpaySuccess) => {
          stopRazorpayRecoveryTimer();
          setRazorpayStatus('verifying');
          setPaymentMessage('Payment received. Verifying and opening your paper…');
          const verifyController = new AbortController();
          const verifyTimeout = window.setTimeout(() => verifyController.abort(), 15000);
          try {
            const verifyResponse = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(response),
              signal: verifyController.signal,
            });
            const verified = await verifyResponse.json() as { approved?: boolean; error?: string };
            if (!verifyResponse.ok || !verified.approved) throw new Error(verified.error ?? 'Payment verification failed.');
            void refreshStudentRecords();
            setPaymentStatus('approved');
            openPaperAfterDialog(chapterName);
          } catch (error) {
            const recovered = await checkRazorpayStatus(chapterName);
            if (!recovered) setPaymentMessage(error instanceof Error ? `${error.message} Check the completed payment again.` : 'Payment verification failed. Check the completed payment again.');
          } finally {
            window.clearTimeout(verifyTimeout);
          }
        },
      });
      checkout.on('payment.failed', (response) => {
        stopRazorpayRecoveryTimer();
        setRazorpayStatus('idle');
        setPaymentStatus('rejected');
        setPaymentMessage(response.error?.description ?? 'Payment failed or was cancelled. Access was not unlocked. Any temporary bank hold is normally reversed by the bank.');
      });
      checkout.open();
      setRazorpayStatus('checkout');
      razorpayRecoveryTimerRef.current = window.setInterval(() => {
        razorpayRecoveryAttemptsRef.current += 1;
        if (razorpayRecoveryAttemptsRef.current > 30) {
          stopRazorpayRecoveryTimer();
          setRazorpayStatus('idle');
          setPaymentMessage('No completed payment was found. You can safely try again. If your bank shows a debit, use “Check a completed payment” before making another payment.');
          return;
        }
        if (recoveryInFlight) return;
        recoveryInFlight = true;
        void checkRazorpayStatus(chapterName, { silent: true })
          .then((recovered) => {
            if (recovered) {
              stopRazorpayRecoveryTimer();
              checkout.close?.();
            }
          })
          .finally(() => { recoveryInFlight = false; });
      }, 4000);
    } catch (error) {
      setRazorpayStatus('idle');
      setPaymentMessage(error instanceof Error ? error.message : 'Razorpay could not start the payment.');
    }
  }

  return (
    <div className="content-view">
      <Breadcrumb items={[{ label: board, onClick: onBoard }, { label: `Grade ${grade}` }]} onHome={onHome} />
      <section className="folder-page-heading compact">
        <span className="large-folder"><BookOpen /></span>
        <div><p>{board} Mathematics</p><h1>Grade {grade}</h1><span>{board === 'CBSE' && grade === 6 ? 'Ganita Prakash · ' : board === 'ICSE' ? 'CISCE Upper Primary · ' : ''}Chapters</span></div>
      </section>
      <section className="folder-content">
        <div className="list-heading"><h2>Chapters</h2><span>{chapters.length} chapters</span></div>
        <div className="chapter-grid">
          {chapters.map((item, index) => (
            <button key={item} className="chapter-folder" type="button" onClick={() => onBrowseChapter(item)}>
              <ChapterFigure title={item} />
              <span className="chapter-number">Chapter {String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong><span className="chapter-card-status">{getPaperForChapter(board, grade, item) ? 'Notes & practice' : board === 'CBSE' && grade === 12 && item === 'Integrals' ? 'Notes & practice' : 'Materials coming soon'}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </section>

      <Dialog open={pendingChapter !== null} onOpenChange={(open) => { if (!open) { setPendingChapter(null); onCloseAccess(); } }}>
        <DialogContent className={`start-test-dialog ${isAvailablePaper ? 'payment-dialog' : ''}`}>
          <DialogHeader>

            <p className="start-test-chapter">{pendingChapter}</p>
            <DialogTitle>{!isAvailablePaper ? 'Coming soon' : studentRecords === null ? 'One moment…' : !studentRecords.signedIn ? 'Sign in' : completedSubmission ? 'Your paper' : 'Written paper · ₹30'}</DialogTitle>
            <DialogDescription className="sr-only">{pendingChapter} written practice paper.</DialogDescription>
          </DialogHeader>
          {isAvailablePaper ? (
            <div className="chapter-access-content">
              {selectedPaper && <ChapterNotesLink paper={selectedPaper} />}

              {studentRecords === null ? (
                <div className="student-payment-loading"><Loader2 /><span>Checking login and chapter access…</span></div>
              ) : !studentRecords.signedIn ? (
                <GoogleSignIn href={`/api/auth/google?return_to=${encodeURIComponent(chapterPath(board, grade, pendingChapter ?? '') + '?paper=1')}`} />
              ) : completedSubmission ? (
                <div className="completed-paper-card">
                  <CheckCircle2 />
                  <span><strong>{completedSubmission.student_name || 'Completed paper'}</strong><small>Submitted {new Date(completedSubmission.submitted_at).toLocaleString()} · {completedSubmission.status === 'marked' ? 'Marks available' : 'Awaiting written-paper marking'}</small></span>
                  <div className="completed-paper-actions"><a href={`/student/results/${encodeURIComponent(completedSubmission.id)}`}>Open last paper</a><button type="button" onClick={() => { const chapterName = pendingChapter; setPendingChapter(null); if (chapterName) onOpenChapter(chapterName); }}>Retake free</button></div>
                </div>
              ) : (
                <>
                  <div className="student-payment-status subtle"><CheckCircle2 /><span><strong>{studentRecords.displayName || 'Google account connected'}</strong><small>{studentRecords.email}</small></span></div>
                  <div className="razorpay-checkout-actions">
                    <button className="razorpay-pay-button" type="button" onClick={() => void startRazorpayPayment()} disabled={razorpayStatus !== 'idle'}>{razorpayStatus !== 'idle' ? <Loader2 /> : <ShieldCheck />}{razorpayStatus === 'starting' ? 'Opening checkout…' : razorpayStatus === 'checkout' ? 'Checkout in progress…' : razorpayStatus === 'verifying' ? 'Verifying payment…' : 'Pay ₹30 securely'}</button>
                    {selectedPaper && <button className="razorpay-recovery-link" type="button" onClick={() => void checkRazorpayStatus(selectedPaper.chapter)} disabled={razorpayStatus !== 'idle'}>Check a completed payment</button>}
                  </div>
                  {paymentMessage && <p className={`payment-form-message ${paymentStatus === 'rejected' ? 'error' : ''}`} aria-live="polite">{paymentMessage}</p>}
                </>
              )}
            </div>
          ) : (
            <div className="test-price-card"><span>Test access</span><strong>₹30</strong></div>
          )}
          {!isAvailablePaper && <DialogFooter>
            <DialogClose render={<button className="test-later-button" type="button" />}>Close</DialogClose>
          </DialogFooter>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChapterView({ board, grade, chapter, onHome, onBoard, onChapters, takingPaper, onStartPaper }: { takingPaper: boolean; onStartPaper: () => void; board: BoardName; grade: number; chapter: string; onHome: () => void; onBoard: () => void; onChapters: () => void }) {
  const paper = getPaperForChapter(board, grade, chapter);
  const isIntegrals = board === 'CBSE' && grade === 12 && chapter === 'Integrals';
  if (takingPaper && paper && (paper.grade ?? 10) === grade) {
    return <ChapterPaper paper={paper} onHome={onHome} onBoard={onBoard} onChapters={onChapters} />;
  }

  return (
    <div className="content-view">
      <Breadcrumb items={[{ label: board, onClick: onBoard }, { label: `Grade ${grade}`, onClick: onChapters }, { label: chapter }]} onHome={onHome} />
      <section className="chapter-overview-heading"><div><p className="rmc-eyebrow">{board} · Grade {grade} · Chapter {chaptersFor(board, grade).indexOf(chapter) + 1}</p><h1>{chapter}</h1><p>Choose what you want to work on.</p></div><ChapterFigure title={chapter} /></section>
      <section className="chapter-resource-grid" aria-label="Chapter materials">
        {paper && !isIntegrals ? <><a className="chapter-resource" href={`/notes/${paper.id.replace(/-01$/, '')}`}><BookOpen /><span className="rmc-eyebrow">Read & revise · Free</span><h2>Chapter notes</h2><p>Explanations, diagrams and worked examples for this chapter.</p><span className="rmc-card-action">Read the notes <ArrowRight /></span></a><button className="chapter-resource" onClick={onStartPaper}><FileText /><span className="rmc-eyebrow">90 minutes · 40 marks</span><h2>Written practice paper</h2><p>Answer MCQs, then upload your written working for marking. ₹30 chapter access; retake without paying again.</p><span className="rmc-card-action">Open paper access <ArrowRight /></span></button></> : isIntegrals ? <a className="chapter-resource" href="/cbse/grade-12/integrals"><BookOpen /><h2>Integrals learning materials</h2><p>Open chapter notes, practice papers and worked solutions.</p><span className="rmc-card-action">Open materials <ArrowRight /></span></a> : <div className="chapter-resource"><BookOpen /><h2>Materials coming soon</h2><p>This chapter is part of the syllabus. Notes and papers are being prepared.</p><a href={boardPath(board) + `/grade-${grade}`}>Back to chapters →</a></div>}
        {board === 'CBSE' && quizListings.filter(q => q.grade === grade && q.title === chapter).map(q => <a key={q.id} className="chapter-resource" href={q.path}><CheckCircle2 /><span className="rmc-eyebrow">50 questions · {quizPrice(q.chapter, q.grade) === 0 ? 'Free' : `₹${quizPrice(q.chapter, q.grade)/100}`}</span><h2>MCQ practice</h2><p>Saved answers, instant marks and worked solutions after submission.</p><span className="rmc-card-action">Start the quiz <ArrowRight /></span></a>)}
      </section>
      {board === 'CBSE' && grade === 6 && chapter === 'Number Play' && <KaprekarToy />}

    </div>
  );
}

function ChapterNotesLink({ paper }: { paper: PaperDefinition }) {
  const slug = paper.id.replace(/-01$/, '');
  return (
    <a className="revision-sheet revision-link" href={`/notes/${slug}`} target="_blank">
      <span><BookOpen /></span>
      <div><strong>Chapter notes</strong><small>Free</small></div>
      <b>Read <ArrowRight /></b>
    </a>
  );
}

type SavedUpload = { id: string; fileName: string };
type AttemptTiming = { startedAtMs: number; workDeadlineAtMs: number; uploadDeadlineAtMs: number };

const feedbackQuestions = [
  { key: 'uploadEase', label: 'Was it easy to upload your answers?' },
  { key: 'questionQuality', label: 'How would you rate the quality and relevance of the questions?' },
  { key: 'difficultyFit', label: 'Was the difficulty level appropriate for your grade?' },
  { key: 'mathClarity', label: 'Were the instructions and mathematical equations clear?' },
  { key: 'notesSolutions', label: 'How useful were the chapter notes and model solutions?' },
] as const;

function formatExamTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return `${hours > 0 ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function ChapterPaper({ paper, onHome, onBoard, onChapters }: { paper: PaperDefinition; onHome: () => void; onBoard: () => void; onChapters: () => void }) {
  const attemptIdKey = `rmc-${paper.id}-attempt-id`;
  const attemptSecretKey = `rmc-${paper.id}-attempt-secret`;
  const [studentName, setStudentName] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [writtenFiles, setWrittenFiles] = useState<Record<number, File[]>>({});
  const [savedUploads, setSavedUploads] = useState<Record<number, SavedUpload[]>>({});
  const [attemptId, setAttemptId] = useState('');
  const [attemptKey, setAttemptKey] = useState('');
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [uploadingQuestions, setUploadingQuestions] = useState<Record<number, boolean>>({});
  const [saveMessage, setSaveMessage] = useState('Your answers will save automatically.');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submissionGaps, setSubmissionGaps] = useState<{ mcqs: number[]; written: number[] }>({ mcqs: [], written: [] });
  const [exitAction, setExitAction] = useState<{ run: () => void } | null>(null);
  const [exitSaving, setExitSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [result, setResult] = useState<{
    id: string;
    mcqScore: number;
    mcqMaximum: number;
    answers: Record<string, number>;
    correctAnswers: Record<string, number>;
    writtenSolutions: Record<string, string>;
  } | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentPaper, setCurrentPaper] = useState(paper);
  const [timing, setTiming] = useState<AttemptTiming | null>(null);
  const [clockNow, setClockNow] = useState(0);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [attemptStartError, setAttemptStartError] = useState('');
  const [autoSubmitRetry, setAutoSubmitRetry] = useState(0);
  const saveSequence = useRef(0);
  const saveChain = useRef<Promise<void>>(Promise.resolve());
  const clockAnchor = useRef<{ serverNowMs: number; performanceNow: number } | null>(null);
  const warnedAtFifteen = useRef(false);
  const autoSubmitStarted = useRef(false);
  useTestActivity(paper.id,Object.keys(answers).length+Object.values(savedUploads).filter(files=>files.length>0).length,Boolean(result),Boolean(attemptId));

  const writtenQuestions = [17, 18, 19, 20, 21, 22, 23, 24];
  const remainingSeconds = timing ? Math.max(0, Math.ceil((timing.workDeadlineAtMs - clockNow) / 1000)) : 90 * 60;
  const workLocked = Boolean(timing && clockNow >= timing.workDeadlineAtMs);
  const uploadLocked = Boolean(timing && clockNow >= timing.uploadDeadlineAtMs);
  const isSaving = savingDraft || Object.values(uploadingQuestions).some(Boolean);
  const hasWork = Boolean(
    studentName.trim()
    || Object.keys(answers).length
    || Object.values(writtenFiles).some((files) => files.length)
    || Object.values(savedUploads).some((files) => files.length),
  );

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/papers/${encodeURIComponent(paper.id)}`, { cache: 'no-store' })
      .then(async (response) => response.ok ? response.json() as Promise<{ paper: PaperDefinition }> : null)
      .then((payload) => { if (!cancelled && payload?.paper) setCurrentPaper(payload.paper); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [paper.id]);

  async function readResponse(response: Response) {
    const payload = await response.json() as Record<string, unknown>;
    if (!response.ok) throw new Error(String(payload.error ?? 'Something went wrong.'));
    return payload;
  }

  async function saveDraftMetadata(successMessage = 'Saved automatically.') {
    if (!draftLoaded || !attemptId || !attemptKey || result || workLocked) return;
    const sequence = ++saveSequence.current;
    setSavingDraft(true);
    setSaveMessage('Saving answers…');
    const snapshot = { attemptId, paperId: paper.id, studentName: studentName.trim(), answers: { ...answers } };
    try {
      const queuedSave = saveChain.current.then(async () => {
        const payload = await readResponse(await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-attempt-key': attemptKey },
          body: JSON.stringify(snapshot),
        }));
        if (typeof payload.serverNowMs === 'number') {
          clockAnchor.current = { serverNowMs: payload.serverNowMs, performanceNow: performance.now() };
        }
      });
      saveChain.current = queuedSave.catch(() => {});
      await queuedSave;
      if (sequence === saveSequence.current) setSaveMessage(successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Answers could not be saved.';
      setSaveMessage(message);
      throw error;
    } finally {
      if (sequence === saveSequence.current) setSavingDraft(false);
    }
  }

  async function uploadQuestionFiles(question: number, files: File[]) {
    if (!files.length || !attemptId || !attemptKey || uploadLocked) return;
    setUploadingQuestions((current) => ({ ...current, [question]: true }));
    setSaveMessage(`Saving answer for question ${question}…`);
    try {
      const uploaded: SavedUpload[] = [];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const uploadId = crypto.randomUUID();
        const response = await fetch(`/api/submissions/${attemptId}/upload?question=${question}`, {
          method: 'POST',
          headers: {
            'content-type': file.type,
            'x-attempt-key': attemptKey,
            'x-file-name': encodeURIComponent(file.name),
            'x-file-size': String(file.size),
            'x-upload-id': uploadId,
          },
          body: file,
        });
        await readResponse(response);
        uploaded.push({ id: uploadId, fileName: file.name });
      }
      setSavedUploads((current) => {
        const existing = current[question] ?? [];
        const merged = [...existing];
        uploaded.forEach((item) => {
          const itemIndex = merged.findIndex((existingItem) => existingItem.id === item.id);
          if (itemIndex >= 0) merged[itemIndex] = item;
          else merged.push(item);
        });
        return { ...current, [question]: merged };
      });
      setWrittenFiles((current) => current[question] === files ? { ...current, [question]: [] } : current);
      setSaveMessage(`Question ${question} answer saved.`);
    } finally {
      setUploadingQuestions((current) => ({ ...current, [question]: false }));
    }
  }

  async function saveQuestionFiles(question: number, files: File[]) {
    try {
      await saveDraftMetadata('Answers saved.');
      await uploadQuestionFiles(question, files);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'This answer could not be saved. Please press Save answers and try again.');
    }
  }

  async function saveEverything() {
    setSubmissionError('');
    try {
      if (!workLocked) await saveDraftMetadata('Answers saved.');
      const pending = writtenQuestions
        .map((question) => ({ question, files: writtenFiles[question] ?? [] }))
        .filter((entry) => entry.files.length);
      for (const entry of pending) await uploadQuestionFiles(entry.question, entry.files);
      setSaveMessage('All answers saved. You can safely return later.');
      return true;
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Answers could not be saved. Please try again.');
      return false;
    }
  }

  function updateWrittenFiles(question: number, files: File[]) {
    if (uploadLocked) return;
    setWrittenFiles((current) => ({ ...current, [question]: files }));
    if (files.length) void saveQuestionFiles(question, files);
  }

  function requestExit(action: () => void) {
    if (result || !hasWork) action();
    else setExitAction({ run: action });
  }

  async function saveAndExit() {
    if (!exitAction) return;
    setExitSaving(true);
    const saved = await saveEverything();
    setExitSaving(false);
    if (!saved) return;
    const action = exitAction.run;
    setExitAction(null);
    action();
  }

  useEffect(() => {
    let cancelled = false;
    const secret = localStorage.getItem(attemptSecretKey) ?? crypto.randomUUID();
    localStorage.setItem(attemptSecretKey, secret);
    setAttemptKey(secret);
    void (async () => {
      try {
        const payload = await readResponse(await fetch('/api/submissions/start', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-attempt-key': secret },
          body: JSON.stringify({ paperId: paper.id }),
        }));
        if (cancelled) return;
        const startedAttemptId = String(payload.id ?? '');
        setAttemptId(startedAttemptId);
        localStorage.setItem(attemptIdKey, startedAttemptId);
        if (typeof payload.serverNowMs === 'number') {
          clockAnchor.current = { serverNowMs: payload.serverNowMs, performanceNow: performance.now() };
          setClockNow(payload.serverNowMs);
        }
        if (payload.status === 'draft') {
          setStudentName(String(payload.studentName ?? ''));
          setAnswers((payload.answers ?? {}) as Record<string, number>);
          const grouped: Record<number, SavedUpload[]> = {};
          const uploads = Array.isArray(payload.uploads) ? payload.uploads as Array<{ id: string; question: number; fileName: string }> : [];
          uploads.forEach((upload) => {
            grouped[upload.question] = [...(grouped[upload.question] ?? []), { id: upload.id, fileName: upload.fileName }];
          });
          setSavedUploads(grouped);
          setTiming({
            startedAtMs: Number(payload.startedAtMs),
            workDeadlineAtMs: Number(payload.workDeadlineAtMs),
            uploadDeadlineAtMs: Number(payload.uploadDeadlineAtMs),
          });
          setSaveMessage(uploads.length ? 'Your saved answers have been restored.' : 'Your answers will save automatically.');
        } else {
          setAnswers((payload.answers ?? {}) as Record<string, number>);
          setResult({
            id: startedAttemptId,
            mcqScore: Number(payload.mcqScore),
            mcqMaximum: Number(payload.mcqMaximum),
            answers: (payload.answers ?? {}) as Record<string, number>,
            correctAnswers: payload.correctAnswers as Record<string, number>,
            writtenSolutions: payload.writtenSolutions as Record<string, string>,
          });
          localStorage.removeItem(attemptIdKey);
        }
      } catch (error) {
        if (!cancelled) setAttemptStartError(error instanceof Error ? error.message : 'The timed test could not be started.');
      } finally {
        if (!cancelled) setDraftLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [attemptIdKey, attemptSecretKey]);

  useEffect(() => {
    if (!draftLoaded || !attemptId || !attemptKey || result || workLocked) return;
    const timer = window.setTimeout(() => {
      void saveDraftMetadata().catch(() => {});
    }, 900);
    return () => window.clearTimeout(timer);
  }, [studentName, answers, draftLoaded, attemptId, attemptKey, result, workLocked]);

  useEffect(() => {
    if (!timing || result) return;
    const updateClock = () => {
      const anchor = clockAnchor.current;
      setClockNow(anchor ? anchor.serverNowMs + (performance.now() - anchor.performanceNow) : Date.now());
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    document.addEventListener('visibilitychange', updateClock);
    window.addEventListener('focus', updateClock);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', updateClock);
      window.removeEventListener('focus', updateClock);
    };
  }, [timing, result]);

  useEffect(() => {
    if (!timing || result || warnedAtFifteen.current || remainingSeconds > 15 * 60 || remainingSeconds <= 0) return;
    warnedAtFifteen.current = true;
    setShowTimeWarning(true);
    const timer = window.setTimeout(() => setShowTimeWarning(false), 12000);
    return () => window.clearTimeout(timer);
  }, [remainingSeconds, result, timing]);

  useEffect(() => {
    if (!uploadLocked || result || submitting || autoSubmitStarted.current || !draftLoaded) return;
    autoSubmitStarted.current = true;
    void submitTest(true);
  }, [uploadLocked, result, submitting, draftLoaded, autoSubmitRetry]);

  useEffect(() => {
    if (!hasWork || result) return;
    const confirmBrowserExit = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', confirmBrowserExit);
    return () => window.removeEventListener('beforeunload', confirmBrowserExit);
  }, [hasWork, result]);

  function validateTest() {
    if (studentName.trim().length < 2) return 'Enter the student name at the top of the paper.';
    const largeFile = Object.values(writtenFiles).flat().find((file) => file.size > 10 * 1024 * 1024);
    if (largeFile) return `${largeFile.name} is larger than 10 MB. Choose a smaller photo or PDF.`;
    return '';
  }

  function requestSubmission() {
    const error = validateTest();
    setSubmissionError(error);
    if (error) return;
    setSubmissionGaps({
      mcqs: Array.from({ length: 16 }, (_, index) => index + 1).filter((number) => answers[String(number)] === undefined),
      written: writtenQuestions.filter((question) => !(writtenFiles[question]?.length) && !(savedUploads[question]?.length)),
    });
    setConfirmOpen(true);
  }

  async function submitTest(automatic = false) {
    setConfirmOpen(false);
    setSubmitting(true);
    setSubmissionError('');
    try {
      if (!automatic) {
        setProgress('Saving your completed test…');
        if (!(await saveEverything())) {
          setProgress('');
          return;
        }
      }

      setProgress(automatic ? 'Time is over. Submitting your saved work…' : 'Finishing your submission…');
      const final = await readResponse(await fetch(`/api/submissions/${attemptId}/finalize`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-attempt-key': attemptKey },
        body: JSON.stringify(automatic ? {} : { answers }),
      }));
      setResult({
        id: String(final.id),
        mcqScore: Number(final.mcqScore),
        mcqMaximum: Number(final.mcqMaximum),
        answers: (final.answers ?? {}) as Record<string, number>,
        correctAnswers: final.correctAnswers as Record<string, number>,
        writtenSolutions: final.writtenSolutions as Record<string, string>,
      });
      localStorage.removeItem(attemptIdKey);
      localStorage.removeItem(attemptSecretKey);
      setProgress('');
    } catch (error) {
      setProgress('');
      setSubmissionError(error instanceof Error ? error.message : 'The test could not be submitted. Please try again.');
      if (automatic) {
        window.setTimeout(() => {
          autoSubmitStarted.current = false;
          setAutoSubmitRetry((current) => current + 1);
        }, 5000);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!draftLoaded) {
    return <div className="content-view test-starting"><Loader2 /><strong>Preparing your timed test…</strong><span>Your saved attempt and secure timer are being loaded.</span></div>;
  }

  if (attemptStartError) {
    return <div className="content-view test-starting error"><ShieldCheck /><strong>The test could not be opened</strong><span>{attemptStartError}</span><button type="button" onClick={onChapters}><ArrowLeft /> Return to chapters</button></div>;
  }

  return (
    <div className="content-view paper-page">
      {!result && timing && (
        <aside className={`exam-timer ${remainingSeconds <= 15 * 60 ? 'warning' : ''} ${workLocked ? 'upload-only' : ''}`} aria-live="polite">
          <Timer />
          <span>{workLocked ? 'Answering time ended' : 'Time left'}<strong>{formatExamTime(remainingSeconds)}</strong></span>
          {workLocked && <small>Save any remaining answer scans now.</small>}
        </aside>
      )}
      {showTimeWarning && <div className="time-warning-toast" role="alert"><Timer /><span><strong>15 minutes left</strong><small>Review your answers and begin preparing your answer scans.</small></span></div>}
      <div className="paper-toolbar">
        <Breadcrumb items={[
          { label: currentPaper.board ?? 'CBSE', onClick: () => requestExit(onBoard) },
          { label: `Grade ${currentPaper.grade ?? 10}`, onClick: () => requestExit(onChapters) },
          { label: currentPaper.chapter },
        ]} onHome={() => requestExit(onHome)} />
        <div className="paper-toolbar-actions">
          <button type="button" onClick={() => requestExit(onChapters)}><ArrowLeft /> Chapters</button>
        </div>
      </div>

      <article className="question-paper">
        <header className="paper-heading">
          <img src="/ramavana-paper-logo.webp" alt="Ramavana Mathematical Centre" width="720" height="720" decoding="async" />
          <div className="paper-kicker"><span>Chapter practice test</span><strong>Paper {currentPaper.paperNumber}</strong></div>
          <p>{currentPaper.board ?? 'CBSE'} Mathematics{(currentPaper.board ?? 'CBSE') === 'CBSE' && (currentPaper.grade ?? 10) === 10 ? ' (Standard)' : ''} · Grade {currentPaper.grade ?? 10}{currentPaper.book ? ` · ${currentPaper.book}` : ''}</p>
          <h1>Chapter {currentPaper.chapterNumber} — {currentPaper.chapter}</h1>
          <div className="paper-meta"><span>Time: 90 minutes</span><span>Maximum marks: 40</span></div>
        </header>

        <section className="student-fields" aria-label="Student details">
          <label>Student name <input value={studentName} onChange={(event) => setStudentName(event.target.value)} maxLength={80} placeholder="Enter your name" disabled={workLocked} /></label>
          <label>Date <span>{new Date().toLocaleDateString()}</span></label>
        </section>
        <p className="activity-student-notice">Your teacher can see when you open, attempt and submit this test.</p>

        <section className={`draft-save-bar ${submissionError ? 'error' : ''}`} aria-live="polite">
          <span>{isSaving ? <Loader2 /> : <ShieldCheck />}</span>
          <div><strong>{isSaving ? 'Saving your work…' : 'Your work is protected'}</strong><p>{submissionError || saveMessage}</p></div>
        </section>

        <section className="paper-instructions">
          <h2>General instructions</h2>
          <ol>
            <li>This paper contains 24 compulsory questions divided into Sections A to E.</li>
            <li>Tick one correct option for each MCQ. Write descriptive answers on paper, then upload the scan below the matching question.</li>
            <li>Show the required steps and reasoning. Use of calculators is not allowed.</li>
            <li>The timer continues if you leave or refresh this page. Submit before the displayed time ends.</li>
            <li>{currentPaper.focus}</li>
          </ol>
        </section>

        <PaperSection title="Section A" subtitle="Questions 1–16 carry 1 mark each." marks="16 × 1 = 16">
          <div className="mcq-list">
            {currentPaper.mcqs.map((item) => (
              <fieldset className="paper-question mcq-question" key={item.number}>
                <legend><strong>{item.number}.</strong> <MathText>{item.question}</MathText> <b>[1]</b>{item.source && <QuestionSource value={item.source} />}</legend>
                {currentPaper.questionVisuals?.[item.number] && <QuestionDiagram kind={currentPaper.questionVisuals[item.number]!} />}
                <div className="option-grid">
                  {item.options.map((option, index) => (
                    <label key={option}>
                      <input type="radio" name={`question-${item.number}`} checked={answers[String(item.number)] === index} disabled={workLocked} onChange={() => setAnswers((current) => ({ ...current, [String(item.number)]: index }))} />
                      <span><em>{String.fromCharCode(65 + index)}</em><MathText formula>{option}</MathText></span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="assertion-note">
            <strong>For Questions 15 and 16, choose the correct option:</strong>
            <ol type="A">{assertionReasonOptions.map((option) => <li key={option}>{option}</li>)}</ol>
          </div>

          {currentPaper.assertions.map((item) => (
            <AssertionQuestion
              key={item.number}
              number={item.number}
              assertion={item.assertion}
              reason={item.reason}
              selected={answers[String(item.number)]}
              disabled={workLocked}
              onChange={(answer) => setAnswers((current) => ({ ...current, [String(item.number)]: answer }))}
            />
          ))}
        </PaperSection>

        <PaperSection title="Section B" subtitle="Questions 17–19 are Very Short Answer questions carrying 2 marks each." marks="3 × 2 = 6">
          {[17, 18, 19].map((number) => <WrittenQuestion key={number} number={number} marks={2} source={currentPaper.questionSources?.[number]} files={writtenFiles[number] ?? []} savedFiles={savedUploads[number] ?? []} isSaving={Boolean(uploadingQuestions[number])} disabled={uploadLocked} onFilesChange={(files) => updateWrittenFiles(number, files)}><QuestionContent value={currentPaper.written[number]} /></WrittenQuestion>)}
        </PaperSection>

        <PaperSection title="Section C" subtitle="Questions 20–22 are Short Answer questions carrying 3 marks each." marks="3 × 3 = 9">
          {[20, 21, 22].map((number) => <WrittenQuestion key={number} number={number} marks={3} source={currentPaper.questionSources?.[number]} files={writtenFiles[number] ?? []} savedFiles={savedUploads[number] ?? []} isSaving={Boolean(uploadingQuestions[number])} disabled={uploadLocked} onFilesChange={(files) => updateWrittenFiles(number, files)}><QuestionContent value={currentPaper.written[number]} /></WrittenQuestion>)}
        </PaperSection>

        <PaperSection title="Section D" subtitle="Question 23 is a Long Answer question carrying 5 marks." marks="1 × 5 = 5">
          <WrittenQuestion number={23} marks={5} files={writtenFiles[23] ?? []} savedFiles={savedUploads[23] ?? []} isSaving={Boolean(uploadingQuestions[23])} disabled={uploadLocked} onFilesChange={(files) => updateWrittenFiles(23, files)}>
            <QuestionContent value={currentPaper.written[23]} />
          </WrittenQuestion>
        </PaperSection>

        <PaperSection title="Section E" subtitle="Question 24 is a case-study question carrying 4 marks." marks="1 × 4 = 4">
          <div className="case-study">
            <div className="case-study-label">Case study</div>
            <p><MathText>{currentPaper.caseStudy}</MathText></p>
          </div>
          <WrittenQuestion number={24} marks={4} files={writtenFiles[24] ?? []} savedFiles={savedUploads[24] ?? []} isSaving={Boolean(uploadingQuestions[24])} disabled={uploadLocked} onFilesChange={(files) => updateWrittenFiles(24, files)}>
            <QuestionContent value={currentPaper.written[24]} />
          </WrittenQuestion>
        </PaperSection>

        <footer className="paper-end"><span>— End of question paper —</span><strong>Total: 40 marks</strong></footer>

        <section className="test-submit-panel">
          <div><p>Finished the paper?</p><h2>Submit for marking</h2><span>Your MCQs will be checked immediately. Written answers will be sent securely to the teacher.</span></div>
          <button className="save-answers-button" type="button" onClick={() => void saveEverything()} disabled={!draftLoaded || isSaving || submitting || Boolean(result) || uploadLocked}>{isSaving ? <Loader2 /> : <Save />}{isSaving ? 'Saving…' : workLocked ? 'Save scans' : 'Save answers'}</button>
          <button type="button" onClick={requestSubmission} disabled={submitting || Boolean(result)}>{submitting ? <Loader2 /> : result ? <CheckCircle2 /> : <Send />}{submitting ? 'Submitting…' : result ? 'Submitted' : 'Submit test'}</button>
          {(submissionError || progress) && <p className={submissionError ? 'submit-error' : 'submit-progress'} role="status">{submissionError || progress}</p>}
        </section>

        {result && showAnswers && (
          <section className="answer-review" id="answer-review" aria-labelledby="answer-review-title">
            <header className="answer-review-header">
              <div><p>Unlocked after submission</p><h2 id="answer-review-title">Answers and model solutions</h2></div>
              <span><CheckCircle2 /> Objective marks: {result.mcqScore}/{result.mcqMaximum}</span>
            </header>

            <div className="answer-review-score">
              <span><strong>{result.mcqScore}</strong> correct</span>
              <span><strong>{Object.keys(result.answers).length - result.mcqScore}</strong> incorrect</span>
              <span><strong>{result.mcqMaximum - Object.keys(result.answers).length}</strong> unanswered</span>
              <span><strong>Pending</strong> written marks</span>
            </div>

            <div className="answer-review-section">
              <h3>Section A — Objective-question review</h3>
              <div className="mcq-answer-review">
                {currentPaper.mcqs.map((item) => {
                  const studentAnswer = result.answers[String(item.number)];
                  const correctAnswer = result.correctAnswers[String(item.number)];
                  const isCorrect = studentAnswer === correctAnswer;
                  const status = isCorrect ? 'Correct' : studentAnswer === undefined ? 'Not answered' : 'Incorrect';
                  const outcome = isCorrect ? 'correct' : studentAnswer === undefined ? 'unanswered' : 'incorrect';
                  const briefSolution = getBriefMcqSolution(currentPaper.id, item.number);
                  return (
                    <div className={`answer-review-card ${outcome}`} key={item.number}>
                      <span className="answer-review-icon" aria-hidden="true">{isCorrect ? <CheckCircle2 /> : studentAnswer === undefined ? <Minus /> : <X />}</span>
                      <div className="answer-review-card-copy">
                        <div className="answer-review-card-heading"><strong>Question {item.number}</strong><span className="answer-status">{status}</span></div>
                        <p className="answer-review-question"><MathText>{item.question}</MathText></p>
                        <div className="quick-solution"><span>Answer</span><b>{String.fromCharCode(65 + correctAnswer)}. <MathText>{item.options[correctAnswer]}</MathText>{briefSolution && <> — <MathText>{briefSolution}</MathText></>}</b></div>
                      </div>
                    </div>
                  );
                })}
                {[15, 16].map((number) => {
                  const studentAnswer = result.answers[String(number)];
                  const correctAnswer = result.correctAnswers[String(number)];
                  const isCorrect = studentAnswer === correctAnswer;
                  const status = isCorrect ? 'Correct' : studentAnswer === undefined ? 'Not answered' : 'Incorrect';
                  const outcome = isCorrect ? 'correct' : studentAnswer === undefined ? 'unanswered' : 'incorrect';
                  const briefSolution = getBriefMcqSolution(currentPaper.id, number);
                  return (
                    <div className={`answer-review-card ${outcome}`} key={number}>
                      <span className="answer-review-icon" aria-hidden="true">{isCorrect ? <CheckCircle2 /> : studentAnswer === undefined ? <Minus /> : <X />}</span>
                      <div className="answer-review-card-copy">
                        <div className="answer-review-card-heading"><strong>Question {number}</strong><span className="answer-status">{status}</span></div>
                        <p className="answer-review-question"><b>Assertion:</b> <MathText>{currentPaper.assertions.find((item) => item.number === number)?.assertion ?? ''}</MathText> <b>Reason:</b> <MathText>{currentPaper.assertions.find((item) => item.number === number)?.reason ?? ''}</MathText></p>
                        <div className="quick-solution"><span>Answer</span><b>{String.fromCharCode(65 + correctAnswer)}. {assertionReasonOptions[correctAnswer]}{briefSolution && <> — <MathText>{briefSolution}</MathText></>}</b></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="answer-review-section written-solution-section">
              <h3>Sections B–E — Step-by-step solutions</h3>
              <p className="solution-note">Your teacher will review your written answers within 24 hours of submission and award partial marks where appropriate. Until then, practise with the model solutions below. Your final score will appear in your student account after review.</p>
              <div className="written-solution-list">
                {writtenQuestions.map((number) => (
                  <article key={number}><span className="written-solution-number">{number}</span><div><strong>Question {number}</strong><p><MathText>{Array.isArray(currentPaper.written[number]) ? (currentPaper.written[number] as string[]).join(' ') : currentPaper.written[number] as string}</MathText></p>{number === 24 && <p><MathText>{currentPaper.caseStudy}</MathText></p>}<SolutionSteps solution={result.writtenSolutions[String(number)] ?? ''} /></div></article>
                ))}
              </div>
            </div>

            <TestFeedback submissionId={result.id} attemptKey={attemptKey} />
          </section>
        )}
      </article>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="submit-confirm-dialog">
          <DialogHeader><span className="start-test-icon"><Send /></span><DialogTitle>{submissionGaps.mcqs.length || submissionGaps.written.length ? 'Some questions are unanswered' : 'Submit your completed test?'}</DialogTitle><DialogDescription>{submissionGaps.mcqs.length || submissionGaps.written.length ? 'You can go back and answer them, or submit anyway if you do not know the answers. Unanswered questions will receive no marks.' : 'You will not be able to change this attempt after it is submitted.'}</DialogDescription></DialogHeader>
          <div className="submit-summary"><span>{16 - submissionGaps.mcqs.length}/16 MCQs answered</span><span>{8 - submissionGaps.written.length}/8 written answers uploaded</span><strong>40 marks</strong></div>
          {(submissionGaps.mcqs.length > 0 || submissionGaps.written.length > 0) && <div className="submit-warning-list"><strong>Not answered</strong>{submissionGaps.mcqs.length > 0 && <span>MCQs: {submissionGaps.mcqs.join(', ')}</span>}{submissionGaps.written.length > 0 && <span>Written questions: {submissionGaps.written.join(', ')}</span>}</div>}
          <DialogFooter><button className="test-later-button" type="button" onClick={() => setConfirmOpen(false)}>Go back to paper</button><button className="test-start-button" type="button" onClick={() => void submitTest()}>{submissionGaps.mcqs.length || submissionGaps.written.length ? 'Submit anyway' : 'Yes, submit test'}</button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={exitAction !== null} onOpenChange={(open) => { if (!open && !exitSaving) setExitAction(null); }}>
        <DialogContent className="submit-confirm-dialog">
          <DialogHeader><span className="start-test-icon"><ArrowLeft /></span><DialogTitle>Do you want to exit the test?</DialogTitle><DialogDescription>Your saved answers will remain here, but the exam timer continues while you are away.</DialogDescription></DialogHeader>
          <DialogFooter>
            <button className="test-later-button" type="button" onClick={() => setExitAction(null)} disabled={exitSaving}>Continue test</button>
            <button className="test-start-button" type="button" onClick={() => void saveAndExit()} disabled={exitSaving}>{exitSaving ? <Loader2 /> : <Save />}{exitSaving ? 'Saving…' : 'Save and exit'}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={result !== null && !showAnswers} onOpenChange={() => {}}>
        <DialogContent className="submission-success-dialog">
          <DialogHeader><span className="submission-success-icon"><CheckCircle2 /></span><DialogTitle>Test submitted successfully</DialogTitle><DialogDescription>Your answer sheets are now available in the teacher review area.</DialogDescription></DialogHeader>
          <div className="submission-result-grid">
            <span><small>Correct</small><strong>{result?.mcqScore}</strong></span>
            <span><small>Incorrect</small><strong>{result ? Object.keys(result.answers).length - result.mcqScore : 0}</strong></span>
            <span><small>Unanswered</small><strong>{result ? result.mcqMaximum - Object.keys(result.answers).length : 0}</strong></span>
          </div>
          <div className="instant-score"><span>Objective marks</span><strong>{result?.mcqScore}/{result?.mcqMaximum}</strong></div>
          <p>All answers and step-by-step model solutions are available now. Your teacher will review your written answers within 24 hours of submission. The final mark out of 40 will appear in your student account after review.</p>
          <DialogFooter className="submission-success-actions">
            <button className="test-later-button" type="button" onClick={onHome}>Return home</button>
            <button className="test-start-button" type="button" onClick={() => {
              setShowAnswers(true);
              requestAnimationFrame(() => document.getElementById('answer-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
            }}><BookOpen /> View answers &amp; feedback</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function QuestionContent({ value }: { value: string | readonly string[] }) {
  return Array.isArray(value) ? <>{value.map((line) => <span key={line}><MathText>{line}</MathText></span>)}</> : <MathText>{value as string}</MathText>;
}

function TestFeedback({ submissionId, attemptKey }: { submissionId: string; attemptKey: string }) {
  type FeedbackKey = (typeof feedbackQuestions)[number]['key'];
  const [ratings, setRatings] = useState<Partial<Record<FeedbackKey, number>>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const complete = feedbackQuestions.every((question) => ratings[question.key]);

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/submissions/${encodeURIComponent(submissionId)}/feedback`, {
      cache: 'no-store',
      headers: { 'x-attempt-key': attemptKey },
    }).then(async (response) => {
      if (!response.ok) return;
      const payload = await response.json() as { feedback?: Record<string, number> | null };
      if (!cancelled && payload.feedback) {
        setRatings({
          uploadEase: payload.feedback.upload_ease,
          questionQuality: payload.feedback.question_quality,
          difficultyFit: payload.feedback.difficulty_fit,
          mathClarity: payload.feedback.math_clarity,
          notesSolutions: payload.feedback.notes_solutions,
        });
        setMessage('Thank you. Your feedback has been saved.');
      }
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [attemptKey, submissionId]);

  async function submitFeedback() {
    if (!complete) {
      setMessage('Please rate all five questions.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`/api/submissions/${encodeURIComponent(submissionId)}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-attempt-key': attemptKey },
        body: JSON.stringify(ratings),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'Feedback could not be saved.');
      setMessage('Thank you. Your feedback has been saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Feedback could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="test-feedback" aria-labelledby="test-feedback-title">
      <header><p>Help us improve</p><h3 id="test-feedback-title">Rate your test experience</h3><span>Select 1 to 5 stars for each question.</span></header>
      <div className="test-feedback-questions">
        {feedbackQuestions.map((question, index) => (
          <div key={question.key}>
            <label>{index + 1}. {question.label}</label>
            <span className="star-rating" role="radiogroup" aria-label={question.label}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  className={(ratings[question.key] ?? 0) >= rating ? 'selected' : ''}
                  role="radio"
                  aria-checked={ratings[question.key] === rating}
                  aria-label={`${rating} out of 5 stars`}
                  onClick={() => { setRatings((current) => ({ ...current, [question.key]: rating })); setMessage(''); }}
                ><Star /></button>
              ))}
            </span>
          </div>
        ))}
      </div>
      <footer><button type="button" onClick={() => void submitFeedback()} disabled={!complete || saving}>{saving ? <Loader2 /> : <Send />}{saving ? 'Saving…' : 'Send feedback'}</button>{message && <p role="status">{message}</p>}</footer>
    </section>
  );
}

function QuestionDiagram({ kind }: { kind: QuestionVisual }) {
  if (kind === 'triangular-dots') {
    const dots = [[120, 24], [103, 49], [137, 49], [86, 74], [120, 74], [154, 74], [69, 99], [103, 99], [137, 99], [171, 99]];
    return <figure className="question-visual"><svg viewBox="0 0 240 125" role="img" aria-label="Figure 4 triangular dot pattern with four rows and ten dots">{dots.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="7" />)}<text x="120" y="120" textAnchor="middle">Figure 4</text></svg></figure>;
  }
  if (kind === 'angle-pair') {
    return <figure className="question-visual"><svg viewBox="0 0 240 145" role="img" aria-label="Right angle AOC split by ray OB, with angle AOB equal to 37 degrees"><path d="M45 120 L45 24 M45 120 L198 120 M45 120 L142 50" /><path className="diagram-guide" d="M45 98 L67 98 L67 120" /><text x="34" y="22">A</text><text x="145" y="48">B</text><text x="202" y="125">C</text><text x="30" y="136">O</text><text x="63" y="82">37°</text><text x="112" y="111">?</text></svg></figure>;
  }
  if (kind === 'bar-graph') {
    return <figure className="question-visual"><svg viewBox="0 0 260 155" role="img" aria-label="Bar graph with values A 4, B 7, C 5 and D 6"><path d="M35 15 V125 H240" />{[4,7,5,6].map((value, index) => <g key={index}><rect className="diagram-bar" x={55 + index * 44} y={125 - value * 14} width="24" height={value * 14} /><text x={67 + index * 44} y={142} textAnchor="middle">{String.fromCharCode(65 + index)}</text><text x={67 + index * 44} y={119 - value * 14} textAnchor="middle">{value}</text></g>)}</svg></figure>;
  }
  if (kind === 'l-shape') {
    return <figure className="question-visual"><svg viewBox="0 0 260 165" role="img" aria-label="Ten by eight centimetre rectangle with a four by three centimetre corner removed"><path className="diagram-fill" d="M35 25 H225 V85 H149 V145 H35 Z" /><path d="M35 25 H225 V85 H149 V145 H35 Z" /><text x="130" y="18" textAnchor="middle">10 cm</text><text x="21" y="88" textAnchor="middle" transform="rotate(-90 21 88)">8 cm</text><text x="187" y="105" textAnchor="middle">4 cm</text><text x="157" y="119" transform="rotate(-90 157 119)">3 cm</text></svg></figure>;
  }
  if (kind === 'fraction-strip') {
    return <figure className="question-visual"><svg viewBox="0 0 260 105" role="img" aria-label="Fraction strip divided into four equal parts with three parts shaded">{[0,1,2,3].map((index) => <rect key={index} className={index < 3 ? 'diagram-fill' : ''} x={30 + index * 50} y="25" width="50" height="42" />)}<text x="130" y="91" textAnchor="middle">¾ shaded</text></svg></figure>;
  }
  if (kind === 'circle-radius') {
    return <figure className="question-visual"><svg viewBox="0 0 260 155" role="img" aria-label="Circle with horizontal diameter AB of ten centimetres and radius OP"><circle cx="130" cy="76" r="58" /><path d="M72 76 H188 M130 76 L156 24" /><circle cx="130" cy="76" r="3" /><text x="60" y="81">A</text><text x="193" y="81">B</text><text x="122" y="92">O</text><text x="158" y="21">P</text><text x="130" y="70" textAnchor="middle">10 cm</text></svg></figure>;
  }
  if (kind === 'half-turn') {
    return <figure className="question-visual"><svg viewBox="0 0 150 125" role="img" aria-label="Block letter Z shape with half-turn rotational symmetry"><polygon className="diagram-fill" points="20,18 130,18 130,42 65,83 130,83 130,107 20,107 20,83 85,42 20,42" /><path className="diagram-turn" d="M40 66 A42 42 0 0 1 109 40" /><text x="75" y="122" textAnchor="middle">turn about the centre</text></svg></figure>;
  }
  if (kind === 'integer-path') {
    return <figure className="question-visual"><svg viewBox="0 0 300 125" role="img" aria-label="Number line showing a move from minus three to two, then back to minus two"><path d="M25 75 H275" />{Array.from({ length: 10 }, (_, index) => index - 5).map((number, index) => <g key={number}><path d={`M${35 + index * 25} 68 V82`} /><text x={35 + index * 25} y="101" textAnchor="middle">{number}</text></g>)}<path className="diagram-arrow first" d="M85 55 Q148 10 210 55" /><path className="diagram-arrow second" d="M210 42 Q160 5 110 42" /><text x="148" y="19" textAnchor="middle">+5</text><text x="160" y="39" textAnchor="middle">−4</text></svg></figure>;
  }
  if (kind === 'set-diagram') {
    return <figure className="question-visual"><svg viewBox="0 0 280 150" role="img" aria-label="Set A containing the even numbers two, four, six and eight, with five outside the set"><rect x="18" y="16" width="244" height="118" rx="8" /><ellipse className="diagram-fill" cx="122" cy="75" rx="76" ry="45" /><text x="53" y="43">A</text><text x="83" y="80">2</text><text x="119" y="58">4</text><text x="158" y="80">6</text><text x="119" y="104">8</text><text x="224" y="78">5</text></svg></figure>;
  }
  if (kind === 'line-ray-segment') {
    return <figure className="question-visual"><svg viewBox="0 0 300 175" role="img" aria-label="A line, a ray and a line segment shown separately"><defs><marker id="diagram-arrow-head" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 Z" /></marker></defs><path d="M35 38 H265" markerStart="url(#diagram-arrow-head)" markerEnd="url(#diagram-arrow-head)" /><text x="150" y="27" textAnchor="middle">line</text><circle cx="52" cy="88" r="4" /><path d="M52 88 H260" markerEnd="url(#diagram-arrow-head)" /><text x="150" y="78" textAnchor="middle">ray</text><circle cx="55" cy="139" r="4" /><circle cx="245" cy="139" r="4" /><path d="M55 139 H245" /><text x="150" y="164" textAnchor="middle">line segment</text></svg></figure>;
  }
  if (kind === 'cube-net') {
    const squares = [[90,55],[130,55],[170,55],[210,55],[130,15],[130,95]];
    return <figure className="question-visual"><svg viewBox="0 0 330 155" role="img" aria-label="A valid net of a cube made from six equal squares">{squares.map(([x,y], index) => <rect key={index} className={index % 2 === 0 ? 'diagram-fill' : ''} x={x} y={y} width="40" height="40" />)}<text x="165" y="150" textAnchor="middle">six equal square faces</text></svg></figure>;
  }
  if (kind === 'pictograph') {
    const rows = [['A',4],['B',3],['C',5]] as const;
    return <figure className="question-visual"><svg viewBox="0 0 310 175" role="img" aria-label="Pictograph for groups A, B and C, where each dot represents two books">{rows.map(([label,count], row) => <g key={label}><text x="35" y={36 + row * 42}>{label}</text>{Array.from({ length: count }, (_, index) => <circle className="diagram-bar" key={index} cx={75 + index * 36} cy={31 + row * 42} r="10" />)}</g>)}<circle className="diagram-bar" cx="73" cy="157" r="7" /><text x="88" y="162">= 2 books</text></svg></figure>;
  }
  if (kind === 'intersecting-lines') {
    return <figure className="question-visual"><svg viewBox="0 0 280 150" role="img" aria-label="Two straight lines intersect at one point"><path d="M34 125 L238 28 M48 22 L246 130" /><circle cx="143" cy="73" r="3" /><text x="151" y="68">one solution</text><text x="25" y="136">l₁</text><text x="250" y="139">l₂</text></svg></figure>;
  }
  if (kind === 'parabola-roots') {
    return <figure className="question-visual"><svg viewBox="0 0 300 170" role="img" aria-label="A parabola crossing the x-axis at two distinct points"><path d="M26 112 H276 M150 18 V148" /><path className="diagram-curve" d="M58 28 Q150 212 242 28" /><circle cx="102" cy="112" r="3" /><circle cx="198" cy="112" r="3" /><text x="95" y="132">α</text><text x="202" y="132">β</text><text x="255" y="105">x</text><text x="157" y="28">y</text></svg></figure>;
  }
  if (kind === 'similar-triangles') {
    return <figure className="question-visual"><svg viewBox="0 0 300 180" role="img" aria-label="Triangle ABC with DE parallel to BC"><path d="M150 18 L45 154 H255 Z M109 72 H191" /><text x="148" y="14">A</text><text x="31" y="165">B</text><text x="260" y="165">C</text><text x="96" y="70">D</text><text x="194" y="70">E</text><text x="122" y="63">∥</text></svg></figure>;
  }
  if (kind === 'coordinate-line') {
    return <figure className="question-visual"><svg viewBox="0 0 300 180" role="img" aria-label="Coordinate plane showing the collinear points one two, two four and three six"><path d="M24 150 H276 M64 166 V18" /><path className="diagram-guide" d="M95 125 L126 100 L157 75" /><circle cx="95" cy="125" r="3" /><circle cx="126" cy="100" r="3" /><circle cx="157" cy="75" r="3" /><text x="82" y="140">(1,2)</text><text x="130" y="96">(2,4)</text><text x="161" y="70">(3,6)</text></svg></figure>;
  }
  if (kind === 'right-triangle') {
    return <figure className="question-visual"><svg viewBox="0 0 280 170" role="img" aria-label="Right triangle with sides three, four and five and angle theta"><path d="M42 140 H236 L42 30 Z" /><path className="diagram-guide" d="M42 120 H62 V140" /><path className="diagram-guide" d="M197 140 A39 39 0 0 0 205 116" /><text x="28" y="86">3</text><text x="135" y="157">4</text><text x="143" y="77">5</text><text x="199" y="133">θ</text></svg></figure>;
  }
  if (kind === 'tower-angle') {
    return <figure className="question-visual"><svg viewBox="0 0 310 175" role="img" aria-label="Thirty metre horizontal distance to a vertical tower with a forty-five degree line of sight"><path d="M32 145 H278 M235 145 V28 M32 145 L235 28" /><path className="diagram-guide" d="M215 145 V125 H235" /><path className="diagram-guide" d="M70 145 A38 38 0 0 0 65 126" /><text x="105" y="162">30 m</text><text x="43" y="136">45°</text><text x="242" y="86">h</text></svg></figure>;
  }
  if (kind === 'circle-tangents') {
    return <figure className="question-visual"><svg viewBox="0 0 300 180" role="img" aria-label="Two tangents from external point P touch a circle at A and B"><circle cx="110" cy="90" r="58" /><path d="M110 90 L148 46 M110 90 L148 134 M148 46 L264 90 L148 134 M110 90 L264 90" /><circle cx="110" cy="90" r="3" /><text x="97" y="105">O</text><text x="145" y="40">A</text><text x="145" y="150">B</text><text x="269" y="95">P</text><text x="198" y="87">60°</text></svg></figure>;
  }
  if (kind === 'circle-sector') {
    return <figure className="question-visual"><svg viewBox="0 0 250 180" role="img" aria-label="A ninety degree sector, one quarter of a circle"><path className="diagram-fill" d="M55 145 A90 90 0 0 1 145 55 L145 145 Z" /><path d="M55 145 A90 90 0 0 1 145 55 L145 145 Z" /><path className="diagram-guide" d="M126 145 A19 19 0 0 1 145 126" /><circle cx="145" cy="145" r="3" /><text x="112" y="124">90°</text><text x="151" y="160">O</text></svg></figure>;
  }
  if (kind === 'solid-comparison') {
    return <figure className="question-visual"><svg viewBox="0 0 320 185" role="img" aria-label="A cylinder and cone with equal base radius and height"><ellipse cx="85" cy="35" rx="45" ry="13" /><path d="M40 35 V145 M130 35 V145" /><ellipse cx="85" cy="145" rx="45" ry="13" /><ellipse cx="235" cy="145" rx="45" ry="13" /><path d="M190 145 L235 35 L280 145 M235 35 V145" /><text x="85" y="177" textAnchor="middle">cylinder</text><text x="235" y="177" textAnchor="middle">cone</text><text x="140" y="92">h</text><text x="242" y="92">h</text></svg></figure>;
  }
  if (kind === 'ogive') {
    return <figure className="question-visual"><svg viewBox="0 0 300 175" role="img" aria-label="Cumulative frequency curve rising across class boundaries"><path d="M35 18 V145 H275" /><path className="diagram-curve" d="M45 136 C86 130 90 112 126 105 S174 74 202 57 S237 31 265 24" /><circle cx="83" cy="124" r="3" /><circle cx="126" cy="105" r="3" /><circle cx="173" cy="78" r="3" /><circle cx="222" cy="44" r="3" /><text x="148" y="166" textAnchor="middle">upper class boundary</text><text x="13" y="90" transform="rotate(-90 13 90)">cumulative frequency</text></svg></figure>;
  }
  if (kind === 'inverse-cosine-graph') {
    return <figure className="question-visual"><svg viewBox="0 0 300 190" role="img" aria-label="A decreasing inverse cosine curve from minus one comma pi to one comma zero"><path d="M38 154 H268 M150 174 V20" /><path className="diagram-curve" d="M62 34 C92 34 112 56 132 78 S177 124 238 150" /><circle cx="62" cy="34" r="3" /><circle cx="150" cy="92" r="3" /><circle cx="238" cy="150" r="3" /><text x="45" y="29">(−1, π)</text><text x="155" y="86">(0, π/2)</text><text x="241" y="166">(1, 0)</text><text x="272" y="158">x</text><text x="157" y="24">y</text></svg></figure>;
  }
  if (kind === 'area-between-curves') {
    return <figure className="question-visual"><svg viewBox="0 0 300 190" role="img" aria-label="Shaded region enclosed by the line y equals x and the parabola y equals x squared between zero and one"><path d="M38 154 H270 M58 172 V20" /><path className="diagram-fill" d="M58 154 L238 34 C190 93 118 139 58 154 Z" /><path className="diagram-curve" d="M58 154 L238 34 M58 154 C118 150 190 93 238 34" /><circle cx="58" cy="154" r="3" /><circle cx="238" cy="34" r="3" /><text x="185" y="65">y = x</text><text x="177" y="121">y = x²</text><text x="242" y="164">1</text><text x="270" y="158">x</text><text x="64" y="24">y</text></svg></figure>;
  }
  if (kind === 'lpp-feasible-region') {
    return <figure className="question-visual"><svg viewBox="0 0 310 205" role="img" aria-label="First-quadrant feasible region with vertices zero zero, four zero, two three and zero four"><path d="M38 172 H286 M58 188 V18" /><path className="diagram-fill" d="M58 172 L58 62 L132 92 L218 172 Z" /><path className="diagram-curve" d="M58 62 L268 148 M58 23 L218 172" /><circle cx="58" cy="172" r="3" /><circle cx="58" cy="62" r="3" /><circle cx="132" cy="92" r="3" /><circle cx="218" cy="172" r="3" /><text x="68" y="187">O(0,0)</text><text x="8" y="61">C(0,4)</text><text x="137" y="87">B(2,3)</text><text x="220" y="187">A(4,0)</text><text x="210" y="128">constraint 1</text><text x="106" y="42">constraint 2</text><text x="286" y="177">x</text><text x="64" y="21">y</text></svg></figure>;
  }
  return <figure className="question-visual"><svg viewBox="0 0 300 180" role="img" aria-label="Outcome tree for tossing two coins, showing HH, HT, TH and TT"><path d="M40 90 L115 45 M40 90 L115 135 M115 45 L220 22 M115 45 L220 68 M115 135 L220 112 M115 135 L220 158" /><text x="28" y="95">start</text><text x="78" y="57">H</text><text x="78" y="128">T</text><text x="152" y="29">H</text><text x="152" y="65">T</text><text x="152" y="116">H</text><text x="152" y="153">T</text><text x="229" y="27">HH</text><text x="229" y="73">HT</text><text x="229" y="117">TH</text><text x="229" y="163">TT</text></svg></figure>;
}

function PaperSection({ title, subtitle, marks, children }: { title: string; subtitle: string; marks: string; children: ReactNode }) {
  return (
    <section className="exam-section">
      <header><div><h2>{title}</h2><p>{subtitle}</p></div><span>{marks}</span></header>
      {children}
    </section>
  );
}

function QuestionSource({ value }: { value: string }) {
  return <span className="question-source" title="Verified against the cited source"><CheckCircle2 /> Previous exam: {value}</span>;
}

function WrittenQuestion({ number, marks, source, children, files, savedFiles, isSaving, disabled, onFilesChange }: {
  number: number;
  marks: number;
  source?: string;
  children: ReactNode;
  files: File[];
  savedFiles: SavedUpload[];
  isSaving: boolean;
  disabled: boolean;
  onFilesChange: (files: File[]) => void;
}) {
  const cameraInputId = `answer-camera-${number}`;
  const fileInputId = `answer-file-${number}`;

  function addFiles(fileList: FileList | null) {
    if (!fileList || disabled) return;
    const availableSlots = Math.max(0, 4 - savedFiles.length);
    onFilesChange([...files, ...Array.from(fileList)].slice(0, availableSlots));
  }

  return (
    <div className="paper-question written-question-wrap">
      <div className="written-question">
        <strong>{number}.</strong>
        <div>{children}{source && <QuestionSource value={source} />}</div>
        <b>[{marks}]</b>
      </div>
      <div className="answer-upload-row">
        <input
          className="upload-input"
          id={cameraInputId}
          type="file"
          accept="image/*"
          capture="environment"
          disabled={disabled}
          onChange={(event) => addFiles(event.target.files)}
        />
        <label className="answer-upload camera-upload" htmlFor={cameraInputId}>
          <Camera />
          <span><strong>Scan with camera</strong><small>Take a clear photo</small></span>
        </label>
        <input
          className="upload-input"
          id={fileInputId}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          multiple
          disabled={disabled}
          onChange={(event) => addFiles(event.target.files)}
        />
        <label className="answer-upload" htmlFor={fileInputId}>
          <Upload />
          <span><strong>Choose files</strong><small>Photos or PDF</small></span>
        </label>
        {files.length > 0 && (
          <div className="selected-answer pending-answer" aria-live="polite">
            <span>
              <strong>{isSaving ? 'Saving answer…' : `${files.length} ${files.length === 1 ? 'file' : 'files'} ready to save`}</strong>
              <small>{files.map((file) => file.name).join(', ')}</small>
            </span>
            {isSaving ? <Loader2 /> : <button type="button" onClick={() => onFilesChange([])} aria-label={`Remove selected answer files for question ${number}`}><X /></button>}
          </div>
        )}
        {savedFiles.length > 0 && (
          <div className="selected-answer saved-answer" aria-live="polite">
            <CheckCircle2 />
            <span><strong>Answer saved</strong><small>{savedFiles.map((file) => file.fileName).join(', ')}</small></span>
          </div>
        )}
      </div>
    </div>
  );
}

function AssertionQuestion({ number, assertion, reason, selected, disabled, onChange }: { number: number; assertion: string; reason: string; selected?: number; disabled: boolean; onChange: (answer: number) => void }) {
  return (
    <fieldset className="paper-question assertion-question">
      <legend><strong>{number}.</strong> <span><b>Assertion (A):</b> <MathText>{assertion}</MathText><br /><b>Reason (R):</b> <MathText>{reason}</MathText></span><em>[1]</em></legend>
      <div className="assertion-options">
        {assertionReasonOptions.map((_, index) => (
          <label key={index}><input type="radio" name={`question-${number}`} checked={selected === index} disabled={disabled} onChange={() => onChange(index)} /><span>{String.fromCharCode(65 + index)}</span></label>
        ))}
      </div>
    </fieldset>
  );
}

function Breadcrumb({ items, onHome }: { items: { label: string; onClick?: () => void }[]; onHome: () => void }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <button type="button" onClick={onHome}><Home /><span>Home</span></button>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}><ChevronRight />{item.onClick ? <button type="button" onClick={item.onClick}>{item.label}</button> : <em>{item.label}</em>}</span>
      ))}
    </nav>
  );
}


