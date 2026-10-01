'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Archive,
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
  Mail,
  Save,
  Send,
  ShieldCheck,
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
import { paperDefinitions as sharedPaperDefinitions, type QuestionVisual } from '@/lib/papers';

const boards = [
  { name: 'CBSE', ready: true },
  { name: 'ICSE', ready: false },
  { name: 'IGCSE', ready: false },
] as const;

const helpDeskEmail = 'chethanamanasa21@gmail.com';
const helpDeskPhone = '+91 93539 28169';

const previousPaperResources = [
  {
    label: 'Board examination papers',
    detail: 'Class 10 papers from recent CBSE examinations, arranged year-wise.',
    href: 'https://www.cbse.gov.in/cbsenew/question-paper.html',
    action: 'Open CBSE archive',
  },
  {
    label: 'Sample papers & marking schemes',
    detail: 'Official sample papers with the corresponding CBSE marking schemes.',
    href: 'https://cbseacademic.nic.in/sqp_archive.html',
    action: 'View sample-paper archive',
  },
  {
    label: 'Class 10 question bank',
    detail: 'Competency-focused questions published by the CBSE Academic Unit.',
    href: 'https://cbseacademic.nic.in/qbclass10.html',
    action: 'Open question bank',
  },
] as const;

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

const chaptersByGrade: Record<number, string[]> = { 6: grade6Chapters, 10: grade10Chapters };

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

Object.assign(paperDefinitions, sharedPaperDefinitions);

type BoardName = (typeof boards)[number]['name'];

export default function HomePage() {
  const [board, setBoard] = useState<BoardName | null>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [chapter, setChapter] = useState<string | null>(null);
  const [studentRecords, setStudentRecords] = useState<StudentRecords | null>(null);

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

  function goHome() {
    setBoard(null);
    setGrade(null);
    setChapter(null);
  }

  function openBoard(nextBoard: BoardName) {
    setBoard(nextBoard);
    setGrade(null);
    setChapter(null);
  }

  function openGrade(nextGrade: number) {
    const currentScrollPosition = window.scrollY;
    setGrade(nextGrade);
    setChapter(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollPosition, behavior: 'auto' });
    });
  }

  function openChapter(nextChapter: string) {
    setChapter(nextChapter);
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <button className="brand-lockup" type="button" onClick={goHome} aria-label="Ramavana home">
          <span className="brand-mark"><img src="/ramavana-logo.webp" alt="" width="720" height="393" decoding="async" /></span>
          <span className="brand-name"><strong>Ramavana</strong><small>Mathematical Center</small></span>
        </button>
        <nav className="primary-nav" aria-label="Main navigation">
          <a href="/#study-library">Study Library</a>
          <a href="/#previous-papers">Previous Papers</a>
          <a href="#help-desk">Help Desk</a>
        </nav>
        <div className="account-links">
          <a className="teacher-login-link" href="/teacher"><ShieldCheck /><span>Teacher Login</span></a>
          <a className="student-login-link" href="/student"><UserRound /><span>{studentRecords?.signedIn ? studentRecords.displayName || studentRecords.email : 'Student Login'}</span></a>
        </div>
      </header>

      {!board ? (
        <HomeView onOpenBoard={openBoard} />
      ) : grade === null ? (
        <BoardView board={board} onHome={goHome} onOpenGrade={openGrade} />
      ) : !chapter ? (
        <ChaptersView grade={grade} onHome={goHome} onBoard={() => openBoard('CBSE')} onOpenChapter={openChapter} studentRecords={studentRecords} refreshStudentRecords={loadStudentRecords} />
      ) : (
        <ChapterView grade={grade} chapter={chapter} onHome={goHome} onChapters={() => setChapter(null)} />
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

      <footer className="site-footer">
        <div className="footer-brand"><strong>Ramavana Mathematical Center</strong><span>Learn · Practise · Progress</span></div>
        <nav className="footer-links" aria-label="Legal information">
          <a className="legal-link" href="/terms">Terms &amp; Conditions</a>
          <a className="legal-link" href="/privacy-policy">Privacy Policy</a>
        </nav>
        <span className="footer-copy">© 2026 Ramavana</span>
      </footer>
    </main>
  );
}

function HomeView({ onOpenBoard }: { onOpenBoard: (board: BoardName) => void }) {
  return (
    <div className="home-view">
      <section className="learning-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker"><BookOpen /> Built for exam practice</p>
          <h1 id="hero-title">Maths gets easier when you practise the <span>right questions.</span></h1>
          <p className="hero-intro">Work chapter by chapter with exam-style MCQs, mark-wise questions and handwritten-answer uploads.</p>
          <button className="hero-action" type="button" onClick={() => onOpenBoard('CBSE')}>Start CBSE practice <ArrowRight /></button>
          <div className="hero-highlights" aria-label="Practice features">
            <span>Exam-style</span><span>Chapter-wise</span><span>Write & upload</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Students learning mathematics together">
          <div className="study-photo-shape"><img src="/students-studying.webp" alt="High-school students solving mathematics together with books and pens" width="1200" height="600" decoding="async" fetchPriority="high" /></div>
          <span className="math-note note-one">x² + y²</span>
          <span className="math-note note-two">√2</span>
        </div>
      </section>
      <section className="library-section" id="study-library" aria-labelledby="curriculum-title">
        <div className="section-heading">
          <div><p>Ready to begin?</p><h2 id="curriculum-title">Where do you study?</h2><span>Tap your board and start practising.</span></div>
        </div>
        <div className="board-grid">
          {boards.map((item, index) => (
            <button key={item.name} className={`folder-card board-folder board-${index + 1}`} type="button" onClick={() => onOpenBoard(item.name)}>
              <span className="folder-icon"><Folder /></span>
              <span className="folder-copy"><strong>{item.name}</strong></span>
              <span className={`folder-status ${item.ready ? 'ready' : ''}`}>{item.ready ? 'Grades 6 & 10' : 'Coming soon'}</span>
              <ChevronRight className="folder-arrow" />
            </button>
          ))}
        </div>
      </section>
      <section className="previous-papers-section" id="previous-papers" aria-labelledby="previous-papers-title">
        <div className="previous-papers-heading">
          <span className="previous-papers-icon"><Archive /></span>
          <div>
            <p>Learn from the real pattern</p>
            <h2 id="previous-papers-title">Previous CBSE Papers</h2>
            <span>Use authentic board resources to understand question styles, difficulty and marking.</span>
          </div>
        </div>
        <div className="previous-paper-grid">
          {previousPaperResources.map((resource, index) => (
            <a key={resource.label} className="previous-paper-card" href={resource.href} target="_blank" rel="noreferrer">
              <span className={`paper-resource-number resource-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span>
              <FileText />
              <strong>{resource.label}</strong>
              <p>{resource.detail}</p>
              <span className="paper-resource-action">{resource.action} <ExternalLink /></span>
            </a>
          ))}
        </div>
        <p className="official-resource-note"><ShieldCheck /> These links open official CBSE resources in a new tab. Ramavana does not copy or alter the original papers.</p>
      </section>
    </div>
  );
}

function BoardView({ board, onHome, onOpenGrade }: { board: BoardName; onHome: () => void; onOpenGrade: (grade: number) => void }) {
  const isCbse = board === 'CBSE';
  return (
    <div className="content-view">
      <Breadcrumb items={[board]} onHome={onHome} />
      <section className="folder-page-heading">
        <span className="large-folder"><FolderOpen /></span>
        <div><p>Board</p><h1>{board}</h1><span>Mathematics</span></div>
      </section>
      {isCbse ? (
        <section className="folder-content">
          <div className="list-heading"><h2>Grades</h2><span>2 folders</span></div>
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
          </div>
        </section>
      ) : (
        <section className="empty-folder">
          <span><Folder /></span>
          <h2>This folder is ready.</h2>
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

function ChaptersView({ grade, onHome, onBoard, onOpenChapter, studentRecords, refreshStudentRecords }: { grade: number; onHome: () => void; onBoard: () => void; onOpenChapter: (chapter: string) => void; studentRecords: StudentRecords | null; refreshStudentRecords: () => Promise<void> }) {
  const [pendingChapter, setPendingChapter] = useState<string | null>(null);
  const [paymentStudentName, setPaymentStudentName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [razorpayStatus, setRazorpayStatus] = useState<RazorpayStatus>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');
  const razorpayRecoveryTimerRef = useRef<number | null>(null);
  const razorpayRecoveryAttemptsRef = useRef(0);
  const chapters = chaptersByGrade[grade] ?? [];
  const pendingPaper = pendingChapter ? paperDefinitions[pendingChapter as PaperDefinition['chapter']] : null;
  const isAvailablePaper = Boolean(pendingPaper && (pendingPaper.grade ?? 10) === grade);
  const selectedPaper = isAvailablePaper ? paperDefinitions[pendingChapter as PaperDefinition['chapter']] : null;
  const completedSubmission = selectedPaper
    ? studentRecords?.submissions.find((submission) => submission.paper_id === selectedPaper.id)
    : undefined;

  const stopRazorpayRecoveryTimer = useCallback(() => {
    if (razorpayRecoveryTimerRef.current !== null) window.clearInterval(razorpayRecoveryTimerRef.current);
    razorpayRecoveryTimerRef.current = null;
  }, []);

  useEffect(() => () => stopRazorpayRecoveryTimer(), [stopRazorpayRecoveryTimer]);

  const checkRazorpayStatus = useCallback(async (chapterName: PaperDefinition['chapter'], options: { silent?: boolean } = {}) => {
    const paper = paperDefinitions[chapterName];
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
        setPendingChapter(null);
        onOpenChapter(chapterName);
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
  }, [onOpenChapter, refreshStudentRecords, studentRecords?.signedIn]);

  function openChapter(nextChapter: string) {
    const paper = paperDefinitions[nextChapter as PaperDefinition['chapter']];
    if (paper && (paper.grade ?? 10) === grade && studentRecords?.signedIn) {
      const earlierSubmission = studentRecords.submissions.find((submission) => submission.paper_id === paper.id);
      if (!earlierSubmission && studentRecords.access.includes(paper.id)) {
        onOpenChapter(nextChapter);
        return;
      }
    }
    setPaymentStudentName(studentRecords?.displayName ?? '');
    setPaymentStatus('idle');
    setRazorpayStatus('idle');
    setPaymentMessage('');
    setPendingChapter(nextChapter);
    if (!paper || (paper.grade ?? 10) !== grade) return;
    if (studentRecords?.signedIn) void checkRazorpayStatus(nextChapter as PaperDefinition['chapter']);
  }

  async function startRazorpayPayment() {
    if (!selectedPaper || !pendingChapter) return;
    if (!studentRecords?.signedIn) {
      setPaymentMessage('Please log in or sign up before paying. This keeps the chapter and marks on the student account.');
      return;
    }
    const name = paymentStudentName.trim();
    if (name.length < 2) {
      setPaymentMessage('Please enter the student name.');
      return;
    }

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
        setPendingChapter(null);
        onOpenChapter(pendingChapter);
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
        name: 'Ramavana Mathematical Center',
        description: `${selectedPaper.chapter} chapter test`,
        order_id: order.orderId,
        prefill: { name, email: studentRecords.email },
        notes: { chapter: selectedPaper.chapter },
        theme: { color: '#5936a7' },
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
            setPendingChapter(null);
            onOpenChapter(chapterName);
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
      <Breadcrumb items={['CBSE', `Grade ${grade}`]} onHome={onHome} onFirstItem={onBoard} />
      <section className="folder-page-heading compact">
        <span className="large-folder"><BookOpen /></span>
        <div><p>CBSE Mathematics</p><h1>Grade {grade}</h1><span>{grade === 6 ? 'Ganita Prakash · ' : ''}Chapter folders</span></div>
      </section>
      <section className="folder-content">
        <div className="list-heading"><h2>Chapters</h2><span>{chapters.length} folders</span></div>
        <div className="chapter-grid">
          {chapters.map((item, index) => (
            <button key={item} className="chapter-folder" type="button" onClick={() => openChapter(item)}>
              <span className="chapter-folder-icon"><Folder /></span>
              <span className="chapter-number">Chapter {String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              <ChevronRight />
            </button>
          ))}
        </div>
      </section>

      <Dialog open={pendingChapter !== null} onOpenChange={(open) => { if (!open) setPendingChapter(null); }}>
        <DialogContent className={`start-test-dialog ${isAvailablePaper ? 'payment-dialog' : ''}`}>
          <DialogHeader>
            <span className="start-test-icon">{isAvailablePaper ? <ShieldCheck /> : <LockKeyhole />}</span>
            <p className="start-test-chapter">{pendingChapter}</p>
            <DialogTitle>{isAvailablePaper
              ? studentRecords === null
                ? 'Checking your account…'
                : !studentRecords.signedIn
                  ? 'Sign in with Google to continue'
                  : completedSubmission
                    ? 'Your completed paper is ready'
                    : 'Pay ₹30 to open this test'
              : 'This paper is coming soon'}</DialogTitle>
            <DialogDescription>
              {isAvailablePaper
                ? studentRecords === null
                  ? 'Please wait while we check your student account.'
                  : !studentRecords.signedIn
                    ? 'Sign in once to keep paid chapters, completed papers and marks available on every device.'
                    : completedSubmission
                      ? 'Review your most recent paper or start another attempt without paying again.'
                      : 'Enter the student name, pay securely and the question paper will open automatically.'
                : 'This chapter folder is ready. Its question paper and payment access will be added later.'}
            </DialogDescription>
          </DialogHeader>
          {isAvailablePaper ? (
            <div className="chapter-access-content">
              {selectedPaper && <ChapterNotesLink paper={selectedPaper} />}
              <div className="payment-divider"><span>Take the chapter test</span></div>
              {studentRecords === null ? (
                <div className="student-payment-loading"><Loader2 /><span>Checking login and chapter access…</span></div>
              ) : !studentRecords.signedIn ? (
                <a className="student-payment-login google-login-action" href="/api/auth/google?return_to=%2Fstudent"><UserRound /><span><strong>Continue with Google</strong><small>We use only your Google account email to identify your student account.</small></span><ChevronRight /></a>
              ) : completedSubmission ? (
                <div className="completed-paper-card">
                  <CheckCircle2 />
                  <span><strong>{completedSubmission.student_name || 'Completed paper'}</strong><small>Submitted {new Date(completedSubmission.submitted_at).toLocaleString()} · {completedSubmission.status === 'marked' ? 'Marks available' : 'Awaiting written-paper marking'}</small></span>
                  <div className="completed-paper-actions"><a href={`/student/results/${encodeURIComponent(completedSubmission.id)}`}>Open last paper</a><button type="button" onClick={() => { const chapterName = pendingChapter; setPendingChapter(null); if (chapterName) onOpenChapter(chapterName); }}>Retake free</button></div>
                </div>
              ) : (
                <>
                  <div className="student-payment-status"><CheckCircle2 /><span><strong>{studentRecords.displayName || 'Google account connected'}</strong><small>{studentRecords.email} · Approved chapters open without another payment.</small></span></div>
                  <div className="razorpay-checkout-card">
                    <div><span>Secure automatic payment</span><strong>₹30 · Razorpay</strong><small>After successful verification, this paper opens immediately and stays in the student account.</small></div>
                    <label htmlFor="razorpay-student-name"><span>Student name</span><input id="razorpay-student-name" value={paymentStudentName} onChange={(event) => setPaymentStudentName(event.target.value)} maxLength={80} autoComplete="name" placeholder="Enter your full name" /></label>
                    <button type="button" onClick={() => void startRazorpayPayment()} disabled={razorpayStatus !== 'idle'}>{razorpayStatus !== 'idle' ? <Loader2 /> : <ShieldCheck />}{razorpayStatus === 'starting' ? 'Opening checkout…' : razorpayStatus === 'checkout' ? 'Checkout in progress…' : razorpayStatus === 'verifying' ? 'Verifying payment…' : 'Pay ₹30 securely'}</button>
                    <p className={`payment-form-message ${paymentStatus === 'rejected' ? 'error' : ''}`} aria-live="polite">{paymentMessage || 'Payment verification is automatic. Failed or cancelled payments do not unlock the paper.'}</p>
                    {selectedPaper && <button className="razorpay-recovery-button" type="button" onClick={() => void checkRazorpayStatus(selectedPaper.chapter)} disabled={razorpayStatus !== 'idle'}><CheckCircle2 /> Check a completed payment</button>}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="test-price-card"><span>Test access</span><strong>₹30</strong></div>
          )}
          <DialogFooter>
            <DialogClose render={<button className="test-later-button" type="button" />}>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChapterView({ grade, chapter, onHome, onChapters }: { grade: number; chapter: string; onHome: () => void; onChapters: () => void }) {
  const paper = paperDefinitions[chapter as PaperDefinition['chapter']];
  if (paper && (paper.grade ?? 10) === grade) {
    return <ChapterPaper paper={paper} onHome={onHome} onChapters={onChapters} />;
  }

  return (
    <div className="content-view">
      <Breadcrumb items={['CBSE', `Grade ${grade}`, chapter]} onHome={onHome} />
      <section className="chapter-empty-view">
        <span className="chapter-open-icon"><FolderOpen /></span>
        <p>Grade {grade} · CBSE Mathematics</p>
        <h1>{chapter}</h1>
        <div className="gold-rule" />
        <strong>Chapter folder created</strong>
        <span>Question sets will be added here next.</span>
        <button type="button" onClick={onChapters}><ArrowLeft /> Back to chapters</button>
      </section>
    </div>
  );
}

function ChapterNotesLink({ paper }: { paper: PaperDefinition }) {
  const slug = paper.id.replace(/-01$/, '');
  return (
    <a className="revision-sheet revision-link" href={`/notes/${slug}`} target="_blank">
      <span><BookOpen /></span>
      <div><small>Free chapter notes</small><strong>{paper.chapter} Study Guide</strong><em>Clear explanations, worked examples and practice · 3 pages</em></div>
      <b>Open notes <ArrowRight /></b>
    </a>
  );
}

type SavedUpload = { id: string; fileName: string };

function ChapterPaper({ paper, onHome, onChapters }: { paper: PaperDefinition; onHome: () => void; onChapters: () => void }) {
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
    correctAnswers: Record<string, number>;
    writtenSolutions: Record<string, string>;
  } | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentPaper, setCurrentPaper] = useState(paper);
  const saveSequence = useRef(0);

  const writtenQuestions = [17, 18, 19, 20, 21, 22, 23, 24];
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
    if (!draftLoaded || !attemptId || !attemptKey || result) return;
    const sequence = ++saveSequence.current;
    setSavingDraft(true);
    setSaveMessage('Saving answers…');
    try {
      await readResponse(await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-attempt-key': attemptKey },
        body: JSON.stringify({ attemptId, paperId: paper.id, studentName: studentName.trim(), answers }),
      }));
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
    if (!files.length || !attemptId || !attemptKey) return;
    setUploadingQuestions((current) => ({ ...current, [question]: true }));
    setSaveMessage(`Saving answer for question ${question}…`);
    try {
      const startingIndex = savedUploads[question]?.length ?? 0;
      const uploaded: SavedUpload[] = [];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const uploadId = `${attemptId}-${question}-${startingIndex + index}`;
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
      await saveDraftMetadata('Answers saved.');
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
    const createCredentials = () => {
      const id = crypto.randomUUID();
      const secret = crypto.randomUUID();
      localStorage.setItem(attemptIdKey, id);
      localStorage.setItem(attemptSecretKey, secret);
      return { id, secret };
    };
    const storedId = localStorage.getItem(attemptIdKey);
    const storedSecret = localStorage.getItem(attemptSecretKey);
    const credentials = storedId && storedSecret ? { id: storedId, secret: storedSecret } : createCredentials();
    setAttemptId(credentials.id);
    setAttemptKey(credentials.secret);

    void (async () => {
      try {
        const payload = await readResponse(await fetch(`/api/submissions?attemptId=${encodeURIComponent(credentials.id)}`, {
          cache: 'no-store',
          headers: { 'x-attempt-key': credentials.secret },
        }));
        if (cancelled) return;
        if (payload.found && payload.status === 'draft') {
          setStudentName(String(payload.studentName ?? ''));
          setAnswers((payload.answers ?? {}) as Record<string, number>);
          const grouped: Record<number, SavedUpload[]> = {};
          const uploads = Array.isArray(payload.uploads) ? payload.uploads as Array<{ id: string; question: number; fileName: string }> : [];
          uploads.forEach((upload) => {
            grouped[upload.question] = [...(grouped[upload.question] ?? []), { id: upload.id, fileName: upload.fileName }];
          });
          setSavedUploads(grouped);
          setSaveMessage('Your saved answers have been restored.');
        } else if (payload.found) {
          const next = createCredentials();
          setAttemptId(next.id);
          setAttemptKey(next.secret);
        }
      } catch {
        if (!cancelled) setSaveMessage('Could not check saved answers. Your new answers will still save automatically.');
      } finally {
        if (!cancelled) setDraftLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [attemptIdKey, attemptSecretKey]);

  useEffect(() => {
    if (!draftLoaded || !attemptId || !attemptKey || result) return;
    const timer = window.setTimeout(() => {
      void saveDraftMetadata().catch(() => {});
    }, 900);
    return () => window.clearTimeout(timer);
  }, [studentName, answers, draftLoaded, attemptId, attemptKey, result]);

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

  async function submitTest() {
    setConfirmOpen(false);
    setSubmitting(true);
    setSubmissionError('');
    try {
      setProgress('Saving your completed test…');
      if (!(await saveEverything())) {
        setProgress('');
        return;
      }

      setProgress('Finishing your submission…');
      const final = await readResponse(await fetch(`/api/submissions/${attemptId}/finalize`, {
        method: 'POST',
        headers: { 'x-attempt-key': attemptKey },
      }));
      setResult({
        id: String(final.id),
        mcqScore: Number(final.mcqScore),
        mcqMaximum: Number(final.mcqMaximum),
        correctAnswers: final.correctAnswers as Record<string, number>,
        writtenSolutions: final.writtenSolutions as Record<string, string>,
      });
      localStorage.removeItem(attemptIdKey);
      localStorage.removeItem(attemptSecretKey);
      setProgress('');
    } catch (error) {
      setProgress('');
      setSubmissionError(error instanceof Error ? error.message : 'The test could not be submitted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="content-view paper-page">
      <div className="paper-toolbar">
        <Breadcrumb items={['CBSE', `Grade ${currentPaper.grade ?? 10}`, currentPaper.chapter]} onHome={() => requestExit(onHome)} />
        <div className="paper-toolbar-actions">
          <button type="button" onClick={() => requestExit(onChapters)}><ArrowLeft /> Chapters</button>
        </div>
      </div>

      <article className="question-paper">
        <header className="paper-heading">
          <img src="/ramavana-paper-logo.webp" alt="Ramavana Mathematical Center" width="720" height="720" decoding="async" />
          <div className="paper-kicker"><span>Chapter practice test</span><strong>Paper {currentPaper.paperNumber}</strong></div>
          <p>CBSE Mathematics{(currentPaper.grade ?? 10) === 10 ? ' (Standard)' : ''} · Grade {currentPaper.grade ?? 10}{currentPaper.book ? ` · ${currentPaper.book}` : ''}</p>
          <h1>Chapter {currentPaper.chapterNumber} — {currentPaper.chapter}</h1>
          <div className="paper-meta"><span>Time: 90 minutes</span><span>Maximum marks: 40</span></div>
        </header>

        <section className="student-fields" aria-label="Student details">
          <label>Student name <input value={studentName} onChange={(event) => setStudentName(event.target.value)} maxLength={80} placeholder="Enter your name" /></label>
          <label>Date <span>{new Date().toLocaleDateString()}</span></label>
        </section>

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
            <li>{currentPaper.focus}</li>
          </ol>
        </section>

        <PaperSection title="Section A" subtitle="Questions 1–16 carry 1 mark each." marks="16 × 1 = 16">
          <div className="mcq-list">
            {currentPaper.mcqs.map((item) => (
              <fieldset className="paper-question mcq-question" key={item.number}>
                <legend><strong>{item.number}.</strong> {item.question} <b>[1]</b>{item.source && <QuestionSource value={item.source} />}</legend>
                {currentPaper.questionVisuals?.[item.number] && <QuestionDiagram kind={currentPaper.questionVisuals[item.number]!} />}
                <div className="option-grid">
                  {item.options.map((option, index) => (
                    <label key={option}>
                      <input type="radio" name={`question-${item.number}`} checked={answers[String(item.number)] === index} onChange={() => setAnswers((current) => ({ ...current, [String(item.number)]: index }))} />
                      <span><em>{String.fromCharCode(65 + index)}</em>{option}</span>
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
              onChange={(answer) => setAnswers((current) => ({ ...current, [String(item.number)]: answer }))}
            />
          ))}
        </PaperSection>

        <PaperSection title="Section B" subtitle="Questions 17–19 are Very Short Answer questions carrying 2 marks each." marks="3 × 2 = 6">
          {[17, 18, 19].map((number) => <WrittenQuestion key={number} number={number} marks={2} source={currentPaper.questionSources?.[number]} files={writtenFiles[number] ?? []} savedFiles={savedUploads[number] ?? []} isSaving={Boolean(uploadingQuestions[number])} onFilesChange={(files) => updateWrittenFiles(number, files)}><QuestionContent value={currentPaper.written[number]} /></WrittenQuestion>)}
        </PaperSection>

        <PaperSection title="Section C" subtitle="Questions 20–22 are Short Answer questions carrying 3 marks each." marks="3 × 3 = 9">
          {[20, 21, 22].map((number) => <WrittenQuestion key={number} number={number} marks={3} source={currentPaper.questionSources?.[number]} files={writtenFiles[number] ?? []} savedFiles={savedUploads[number] ?? []} isSaving={Boolean(uploadingQuestions[number])} onFilesChange={(files) => updateWrittenFiles(number, files)}><QuestionContent value={currentPaper.written[number]} /></WrittenQuestion>)}
        </PaperSection>

        <PaperSection title="Section D" subtitle="Question 23 is a Long Answer question carrying 5 marks." marks="1 × 5 = 5">
          <WrittenQuestion number={23} marks={5} files={writtenFiles[23] ?? []} savedFiles={savedUploads[23] ?? []} isSaving={Boolean(uploadingQuestions[23])} onFilesChange={(files) => updateWrittenFiles(23, files)}>
            <QuestionContent value={currentPaper.written[23]} />
          </WrittenQuestion>
        </PaperSection>

        <PaperSection title="Section E" subtitle="Question 24 is a case-study question carrying 4 marks." marks="1 × 4 = 4">
          <div className="case-study">
            <div className="case-study-label">Case study</div>
            <p>{currentPaper.caseStudy}</p>
          </div>
          <WrittenQuestion number={24} marks={4} files={writtenFiles[24] ?? []} savedFiles={savedUploads[24] ?? []} isSaving={Boolean(uploadingQuestions[24])} onFilesChange={(files) => updateWrittenFiles(24, files)}>
            <QuestionContent value={currentPaper.written[24]} />
          </WrittenQuestion>
        </PaperSection>

        <footer className="paper-end"><span>— End of question paper —</span><strong>Total: 40 marks</strong></footer>

        <section className="test-submit-panel">
          <div><p>Finished the paper?</p><h2>Submit for marking</h2><span>Your MCQs will be checked immediately. Written answers will be sent securely to the teacher.</span></div>
          <button className="save-answers-button" type="button" onClick={() => void saveEverything()} disabled={!draftLoaded || isSaving || submitting || Boolean(result)}>{isSaving ? <Loader2 /> : <Save />}{isSaving ? 'Saving…' : 'Save answers'}</button>
          <button type="button" onClick={requestSubmission} disabled={submitting || Boolean(result)}>{submitting ? <Loader2 /> : result ? <CheckCircle2 /> : <Send />}{submitting ? 'Submitting…' : result ? 'Submitted' : 'Submit test'}</button>
          {(submissionError || progress) && <p className={submissionError ? 'submit-error' : 'submit-progress'} role="status">{submissionError || progress}</p>}
        </section>

        {result && showAnswers && (
          <section className="answer-review" id="answer-review" aria-labelledby="answer-review-title">
            <header className="answer-review-header">
              <div><p>Unlocked after submission</p><h2 id="answer-review-title">Answers and model solutions</h2></div>
              <span><CheckCircle2 /> Submitted</span>
            </header>

            <div className="answer-review-section">
              <h3>Section A — MCQ answers</h3>
              <div className="mcq-answer-review">
                {currentPaper.mcqs.map((item) => {
                  const studentAnswer = answers[String(item.number)];
                  const correctAnswer = result.correctAnswers[String(item.number)];
                  const isCorrect = studentAnswer === correctAnswer;
                  const studentAnswerText = studentAnswer === undefined ? 'Not answered' : `${String.fromCharCode(65 + studentAnswer)}. ${item.options[studentAnswer]}`;
                  return (
                    <div className={`answer-review-card ${isCorrect ? 'correct' : 'incorrect'}`} key={item.number}>
                      <div><strong>Question {item.number}</strong><span className="answer-status">{isCorrect ? 'Correct' : 'Check answer'}</span></div>
                      <p><span>Your answer</span><b>{studentAnswerText}</b></p>
                      <p><span>Correct answer</span><b>{String.fromCharCode(65 + correctAnswer)}. {item.options[correctAnswer]}</b></p>
                    </div>
                  );
                })}
                {[15, 16].map((number) => {
                  const studentAnswer = answers[String(number)];
                  const correctAnswer = result.correctAnswers[String(number)];
                  const isCorrect = studentAnswer === correctAnswer;
                  const studentAnswerText = studentAnswer === undefined ? 'Not answered' : `${String.fromCharCode(65 + studentAnswer)}. ${assertionReasonOptions[studentAnswer]}`;
                  return (
                    <div className={`answer-review-card ${isCorrect ? 'correct' : 'incorrect'}`} key={number}>
                      <div><strong>Question {number}</strong><span className="answer-status">{isCorrect ? 'Correct' : 'Check answer'}</span></div>
                      <p><span>Your answer</span><b>{studentAnswerText}</b></p>
                      <p><span>Correct answer</span><b>{String.fromCharCode(65 + correctAnswer)}. {assertionReasonOptions[correctAnswer]}</b></p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="answer-review-section written-solution-section">
              <h3>Sections B–E — Model solutions</h3>
              <p className="solution-note">Use these to compare your method. Your teacher will still review your uploaded work and award the written-answer marks.</p>
              <div className="written-solution-list">
                {writtenQuestions.map((number) => (
                  <article key={number}><strong>Question {number}</strong><p>{result.writtenSolutions[String(number)]}</p></article>
                ))}
              </div>
            </div>
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
          <DialogHeader><span className="start-test-icon"><ArrowLeft /></span><DialogTitle>Do you want to exit the test?</DialogTitle><DialogDescription>Your answers are saved automatically. You can return to this chapter later and continue from where you stopped.</DialogDescription></DialogHeader>
          <DialogFooter>
            <button className="test-later-button" type="button" onClick={() => setExitAction(null)} disabled={exitSaving}>Continue test</button>
            <button className="test-start-button" type="button" onClick={() => void saveAndExit()} disabled={exitSaving}>{exitSaving ? <Loader2 /> : <Save />}{exitSaving ? 'Saving…' : 'Save and exit'}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={result !== null && !showAnswers} onOpenChange={() => {}}>
        <DialogContent className="submission-success-dialog">
          <DialogHeader><span className="submission-success-icon"><CheckCircle2 /></span><DialogTitle>Test submitted successfully</DialogTitle><DialogDescription>Your answer sheets are now available in the teacher review area.</DialogDescription></DialogHeader>
          <div className="instant-score"><span>MCQ score</span><strong>{result?.mcqScore}/{result?.mcqMaximum}</strong></div>
          <p>Written-answer marks and teacher feedback will be added after review.</p>
          <DialogFooter className="submission-success-actions">
            <button className="test-later-button" type="button" onClick={onHome}>Return home</button>
            <button className="test-start-button" type="button" onClick={() => {
              setShowAnswers(true);
              requestAnimationFrame(() => document.getElementById('answer-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
            }}><BookOpen /> View answers</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function QuestionContent({ value }: { value: string | readonly string[] }) {
  return Array.isArray(value) ? <>{value.map((line) => <span key={line}>{line}</span>)}</> : <>{value}</>;
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
    return <figure className="question-visual"><svg viewBox="0 0 260 105" role="img" aria-label="Fraction strip divided into four equal parts with three parts shaded">{[0,1,2,3].map((index) => <rect key={index} className={index < 3 ? 'diagram-fill' : ''} x={30 + index * 50} y="25" width="50" height="42" />)}<text x="130" y="91" textAnchor="middle">3/4 shaded</text></svg></figure>;
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
  return <span className="question-source" title="Verified against an official CBSE question paper"><CheckCircle2 /> Previous exam: {value}</span>;
}

function WrittenQuestion({ number, marks, source, children, files, savedFiles, isSaving, onFilesChange }: {
  number: number;
  marks: number;
  source?: string;
  children: ReactNode;
  files: File[];
  savedFiles: SavedUpload[];
  isSaving: boolean;
  onFilesChange: (files: File[]) => void;
}) {
  const cameraInputId = `answer-camera-${number}`;
  const fileInputId = `answer-file-${number}`;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
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

function AssertionQuestion({ number, assertion, reason, selected, onChange }: { number: number; assertion: string; reason: string; selected?: number; onChange: (answer: number) => void }) {
  return (
    <fieldset className="paper-question assertion-question">
      <legend><strong>{number}.</strong> <span><b>Assertion (A):</b> {assertion}<br /><b>Reason (R):</b> {reason}</span><em>[1]</em></legend>
      <div className="assertion-options">
        {assertionReasonOptions.map((_, index) => (
          <label key={index}><input type="radio" name={`question-${number}`} checked={selected === index} onChange={() => onChange(index)} /><span>{String.fromCharCode(65 + index)}</span></label>
        ))}
      </div>
    </fieldset>
  );
}

function Breadcrumb({ items, onHome, onFirstItem }: { items: string[]; onHome: () => void; onFirstItem?: () => void }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <button type="button" onClick={onHome}><Home /><span>Home</span></button>
      {items.map((item, index) => (
        <span key={`${item}-${index}`}><ChevronRight />{index === 0 && onFirstItem ? <button type="button" onClick={onFirstItem}>{item}</button> : <em>{item}</em>}</span>
      ))}
    </nav>
  );
}

