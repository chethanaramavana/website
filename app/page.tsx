'use client';

import { useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  ChevronRight,
  Folder,
  FolderOpen,
  GraduationCap,
  Home,
  LockKeyhole,
  Printer,
  ShieldCheck,
  Upload,
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
  DialogTrigger,
} from '@/components/ui/dialog';

const boards = [
  { name: 'CBSE', ready: true },
  { name: 'ICSE', ready: false },
  { name: 'IGCSE', ready: false },
] as const;

const chapters = [
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

const realNumbersMcqs = [
  {
    number: 1,
    question: 'The prime factorisation of 1260 is',
    options: ['2² × 3² × 5 × 7', '2³ × 3² × 5 × 7', '2² × 3 × 5 × 7', '2 × 3² × 5² × 7'],
  },
  {
    number: 2,
    question: 'The HCF of 96 and 404 is',
    options: ['2', '4', '8', '12'],
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

const assertionReasonOptions = [
  'Both A and R are true, and R is the correct explanation of A.',
  'Both A and R are true, but R is not the correct explanation of A.',
  'A is true, but R is false.',
  'A is false, but R is true.',
] as const;

type BoardName = (typeof boards)[number]['name'];

export default function HomePage() {
  const [board, setBoard] = useState<BoardName | null>(null);
  const [gradeOpen, setGradeOpen] = useState(false);
  const [chapter, setChapter] = useState<string | null>(null);

  function goHome() {
    setBoard(null);
    setGradeOpen(false);
    setChapter(null);
  }

  function openBoard(nextBoard: BoardName) {
    setBoard(nextBoard);
    setGradeOpen(false);
    setChapter(null);
  }

  function openGrade() {
    const currentScrollPosition = window.scrollY;
    setGradeOpen(true);
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
          <span className="brand-mark"><img src="/ramavana-logo.png" alt="" /></span>
          <span className="brand-name"><strong>Ramavana</strong><small>Mathematical Center</small></span>
        </button>
        <div className="header-actions">
          <span className="private-badge"><LockKeyhole /> Private</span>
        </div>
      </header>

      {!board ? (
        <HomeView onOpenBoard={openBoard} />
      ) : !gradeOpen ? (
        <BoardView board={board} onHome={goHome} onOpenGrade={openGrade} />
      ) : !chapter ? (
        <ChaptersView onHome={goHome} onBoard={() => openBoard('CBSE')} onOpenChapter={openChapter} />
      ) : (
        <ChapterView chapter={chapter} onHome={goHome} onChapters={() => setChapter(null)} />
      )}

      <footer className="site-footer">
        <div className="footer-brand"><strong>Ramavana Mathematical Center</strong><span>Learn · Practise · Progress</span></div>
        <nav className="footer-links" aria-label="Legal information">
          <LegalDialog type="terms" />
          <LegalDialog type="privacy" />
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
          <button className="hero-action" type="button" onClick={() => onOpenBoard('CBSE')}>Start Grade 10 CBSE <ArrowRight /></button>
          <div className="hero-highlights" aria-label="Practice features">
            <span>Exam-style</span><span>Chapter-wise</span><span>Write & upload</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Students learning mathematics together">
          <div className="study-photo-shape"><img src="/students-studying.png" alt="High-school students solving mathematics together with books and pens" /></div>
          <span className="math-note note-one">x² + y²</span>
          <span className="math-note note-two">√2</span>
        </div>
      </section>
      <section className="library-section" aria-labelledby="curriculum-title">
        <div className="section-heading">
          <div><p>Ready to begin?</p><h2 id="curriculum-title">Where do you study?</h2><span>Tap your board and start practising.</span></div>
        </div>
        <div className="board-grid">
          {boards.map((item, index) => (
            <button key={item.name} className={`folder-card board-folder board-${index + 1}`} type="button" onClick={() => onOpenBoard(item.name)}>
              <span className="folder-icon"><Folder /></span>
              <span className="folder-copy"><strong>{item.name}</strong></span>
              <span className={`folder-status ${item.ready ? 'ready' : ''}`}>{item.ready ? 'Grade 10' : 'Coming soon'}</span>
              <ChevronRight className="folder-arrow" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function BoardView({ board, onHome, onOpenGrade }: { board: BoardName; onHome: () => void; onOpenGrade: () => void }) {
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
          <div className="list-heading"><h2>Grades</h2><span>1 folder</span></div>
          <button className="grade-folder" type="button" onClick={onOpenGrade}>
            <span className="folder-icon"><GraduationCap /></span>
            <span><small>CBSE Mathematics</small><strong>Grade 10</strong><em>14 chapters</em></span>
            <ChevronRight />
          </button>
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

function ChaptersView({ onHome, onBoard, onOpenChapter }: { onHome: () => void; onBoard: () => void; onOpenChapter: (chapter: string) => void }) {
  const [pendingChapter, setPendingChapter] = useState<string | null>(null);
  const isFreePaper = pendingChapter === 'Real Numbers';

  function beginTest() {
    if (!pendingChapter || !isFreePaper) return;
    onOpenChapter(pendingChapter);
    setPendingChapter(null);
  }

  return (
    <div className="content-view">
      <Breadcrumb items={['CBSE', 'Grade 10']} onHome={onHome} onFirstItem={onBoard} />
      <section className="folder-page-heading compact">
        <span className="large-folder"><BookOpen /></span>
        <div><p>CBSE Mathematics</p><h1>Grade 10</h1><span>Chapter folders</span></div>
      </section>
      <section className="folder-content">
        <div className="list-heading"><h2>Chapters</h2><span>14 folders</span></div>
        <div className="chapter-grid">
          {chapters.map((item, index) => (
            <button key={item} className="chapter-folder" type="button" onClick={() => setPendingChapter(item)}>
              <span className="chapter-folder-icon"><Folder /></span>
              <span className="chapter-number">Chapter {String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              <ChevronRight />
            </button>
          ))}
        </div>
      </section>

      <Dialog open={pendingChapter !== null} onOpenChange={(open) => { if (!open) setPendingChapter(null); }}>
        <DialogContent className="start-test-dialog">
          <DialogHeader>
            <span className="start-test-icon"><ShieldCheck /></span>
            <p className="start-test-chapter">{pendingChapter}</p>
            <DialogTitle>Do you want to write the test now?</DialogTitle>
            <DialogDescription>
              {isFreePaper
                ? 'Your first question paper is free. Start when you are ready and complete it in one sitting.'
                : 'This paper will cost ₹30 when it is ready. The secure payment step will appear here before the test begins.'}
            </DialogDescription>
          </DialogHeader>
          <div className={`test-price-card ${isFreePaper ? 'free' : ''}`}>
            <span>{isFreePaper ? 'First paper' : 'Test access'}</span>
            <strong>{isFreePaper ? 'FREE' : '₹30'}</strong>
          </div>
          <ul className="test-start-points">
            <li>Answer MCQs on the screen.</li>
            <li>Write longer answers on paper and upload clear photos.</li>
            <li>Submit only after completing the full test.</li>
          </ul>
          <DialogFooter>
            <DialogClose render={<button className="test-later-button" type="button" />}>Not now</DialogClose>
            <button className="test-start-button" type="button" onClick={beginTest} disabled={!isFreePaper}>
              {isFreePaper ? 'Yes, start free test' : 'Paper coming soon'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChapterView({ chapter, onHome, onChapters }: { chapter: string; onHome: () => void; onChapters: () => void }) {
  if (chapter === 'Real Numbers') {
    return <RealNumbersPaper onHome={onHome} onChapters={onChapters} />;
  }

  return (
    <div className="content-view">
      <Breadcrumb items={['CBSE', 'Grade 10', chapter]} onHome={onHome} />
      <section className="chapter-empty-view">
        <span className="chapter-open-icon"><FolderOpen /></span>
        <p>Grade 10 · CBSE Mathematics</p>
        <h1>{chapter}</h1>
        <div className="gold-rule" />
        <strong>Chapter folder created</strong>
        <span>Question sets will be added here next.</span>
        <button type="button" onClick={onChapters}><ArrowLeft /> Back to chapters</button>
      </section>
    </div>
  );
}

function RealNumbersPaper({ onHome, onChapters }: { onHome: () => void; onChapters: () => void }) {
  return (
    <div className="content-view paper-page">
      <div className="paper-toolbar">
        <Breadcrumb items={['CBSE', 'Grade 10', 'Real Numbers']} onHome={onHome} />
        <div className="paper-toolbar-actions">
          <button type="button" onClick={onChapters}><ArrowLeft /> Chapters</button>
          <button className="print-button" type="button" onClick={() => window.print()}><Printer /> Print paper</button>
        </div>
      </div>

      <article className="question-paper">
        <header className="paper-heading">
          <img src="/ramavana-logo.png" alt="Ramavana Mathematical Center" />
          <div className="paper-kicker"><span>Teacher review draft</span><strong>Paper 01</strong></div>
          <p>CBSE Mathematics (Standard) · Grade 10</p>
          <h1>Chapter 1 — Real Numbers</h1>
          <div className="paper-meta"><span>Time: 90 minutes</span><span>Maximum marks: 40</span></div>
        </header>

        <section className="student-fields" aria-label="Student details">
          <label>Name <span /></label>
          <label>Date <span /></label>
        </section>

        <section className="paper-instructions">
          <h2>General instructions</h2>
          <ol>
            <li>This paper contains 24 compulsory questions divided into Sections A to E.</li>
            <li>Tick one correct option for each MCQ. Write descriptive answers on paper, then upload the scan below the matching question.</li>
            <li>Show the required steps and reasoning. Use of calculators is not allowed.</li>
            <li>The paper covers the Fundamental Theorem of Arithmetic and proofs of irrationality.</li>
          </ol>
        </section>

        <PaperSection title="Section A" subtitle="Questions 1–16 carry 1 mark each." marks="16 × 1 = 16">
          <div className="mcq-list">
            {realNumbersMcqs.map((item) => (
              <fieldset className="paper-question mcq-question" key={item.number}>
                <legend><strong>{item.number}.</strong> {item.question} <b>[1]</b></legend>
                <div className="option-grid">
                  {item.options.map((option, index) => (
                    <label key={option}>
                      <input type="radio" name={`question-${item.number}`} />
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

          <AssertionQuestion
            number={15}
            assertion="HCF(26, 91) = 13."
            reason="26 = 2 × 13 and 91 = 7 × 13, and 13 is their greatest common factor."
          />
          <AssertionQuestion
            number={16}
            assertion="√2 + √3 is an irrational number."
            reason="The sum of any two irrational numbers is always irrational."
          />
        </PaperSection>

        <PaperSection title="Section B" subtitle="Questions 17–19 are Very Short Answer questions carrying 2 marks each." marks="3 × 2 = 6">
          <WrittenQuestion number={17} marks={2}>Using prime factorisation, find the HCF of 378 and 504.</WrittenQuestion>
          <WrittenQuestion number={18} marks={2}>Show that 7√5 is irrational.</WrittenQuestion>
          <WrittenQuestion number={19} marks={2}>Find the least positive number that is exactly divisible by 45, 60 and 75.</WrittenQuestion>
        </PaperSection>

        <PaperSection title="Section C" subtitle="Questions 20–22 are Short Answer questions carrying 3 marks each." marks="3 × 3 = 9">
          <WrittenQuestion number={20} marks={3}>The HCF and LCM of two positive integers are 18 and 756 respectively. If one integer is 108, find the other integer and verify your answer using prime factorisation.</WrittenQuestion>
          <WrittenQuestion number={21} marks={3}>Prove that 3 + 2√5 is irrational.</WrittenQuestion>
          <WrittenQuestion number={22} marks={3}>A school has 144 boys and 180 girls. They are to be arranged in rows so that every row has the same number of students and no row mixes boys and girls. Find the greatest possible number of students in each row. Also find the number of rows of boys and girls.</WrittenQuestion>
        </PaperSection>

        <PaperSection title="Section D" subtitle="Question 23 is a Long Answer question carrying 5 marks." marks="1 × 5 = 5">
          <WrittenQuestion number={23} marks={5}>
            <span>(a) Prove that √3 is irrational.</span>
            <span>(b) Hence, prove that 5 + 2√3 is irrational.</span>
          </WrittenQuestion>
        </PaperSection>

        <PaperSection title="Section E" subtitle="Question 24 is a case-study question carrying 4 marks." marks="1 × 4 = 4">
          <div className="case-study">
            <div className="case-study-label">Case study</div>
            <p>For Mathematics Day, a teacher has 84 red tokens, 126 blue tokens and 210 gold tokens. She wants to make the greatest possible number of identical prize packets, using every token and placing the same number of each colour in every packet.</p>
          </div>
          <WrittenQuestion number={24} marks={4}>
            <span>(a) Write the prime factorisation of 210. <b>[1]</b></span>
            <span>(b) Find the greatest possible number of identical packets. <b>[1]</b></span>
            <span>(c) Find the number of red, blue and gold tokens in each packet. Hence find the total number of tokens in one packet. <b>[2]</b></span>
          </WrittenQuestion>
        </PaperSection>

        <footer className="paper-end"><span>— End of question paper —</span><strong>Total: 40 marks</strong></footer>
      </article>
    </div>
  );
}

function PaperSection({ title, subtitle, marks, children }: { title: string; subtitle: string; marks: string; children: ReactNode }) {
  return (
    <section className="exam-section">
      <header><div><h2>{title}</h2><p>{subtitle}</p></div><span>{marks}</span></header>
      {children}
    </section>
  );
}

function WrittenQuestion({ number, marks, children }: { number: number; marks: number; children: ReactNode }) {
  const [files, setFiles] = useState<File[]>([]);
  const cameraInputId = `answer-camera-${number}`;
  const fileInputId = `answer-file-${number}`;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    setFiles((current) => [...current, ...Array.from(fileList)]);
  }

  return (
    <div className="paper-question written-question-wrap">
      <div className="written-question">
        <strong>{number}.</strong>
        <div>{children}</div>
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
          <div className="selected-answer" aria-live="polite">
            <span>
              <strong>{files.length} {files.length === 1 ? 'file' : 'files'} selected</strong>
              <small>{files.map((file) => file.name).join(', ')}</small>
            </span>
            <button type="button" onClick={() => setFiles([])} aria-label={`Remove selected answer files for question ${number}`}><X /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function AssertionQuestion({ number, assertion, reason }: { number: number; assertion: string; reason: string }) {
  return (
    <fieldset className="paper-question assertion-question">
      <legend><strong>{number}.</strong> <span><b>Assertion (A):</b> {assertion}<br /><b>Reason (R):</b> {reason}</span><em>[1]</em></legend>
      <div className="assertion-options">
        {assertionReasonOptions.map((_, index) => (
          <label key={index}><input type="radio" name={`question-${number}`} /><span>{String.fromCharCode(65 + index)}</span></label>
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

function LegalDialog({ type }: { type: 'terms' | 'privacy' }) {
  const isTerms = type === 'terms';
  return (
    <Dialog>
      <DialogTrigger render={<button className="legal-link" type="button" />}>{isTerms ? 'Terms & Conditions' : 'Privacy Policy'}</DialogTrigger>
      <DialogContent className="legal-dialog">
        <DialogHeader>
          <DialogTitle>{isTerms ? 'Terms & Conditions' : 'Privacy Policy'}</DialogTitle>
          <DialogDescription>Ramavana Mathematical Center</DialogDescription>
        </DialogHeader>
        {isTerms ? (
          <div className="legal-copy">
            <section><h3>Learning use</h3><p>The question papers and feedback are provided for educational practice. They are not official examination papers or school results.</p></section>
            <section><h3>Access and payment</h3><p>Any fee, validity period and access conditions will be shown clearly before payment. This private preview does not collect payments.</p></section>
            <section><h3>Student work</h3><p>Students should upload only their own answers. Practice material may not be copied, resold or shared outside the permitted access.</p></section>
            <section><h3>Assessment</h3><p>Marks and comments are learning guidance. Students should follow their school and board instructions for official examinations.</p></section>
          </div>
        ) : (
          <div className="legal-copy">
            <section><h3>Information used</h3><p>We may use a student’s name, selected answers, uploaded answer sheets and payment confirmation only to provide access, marking and support.</p></section>
            <section><h3>Payment safety</h3><p>Ramavana will never ask for a UPI PIN, bank password, card PIN or one-time password inside this website.</p></section>
            <section><h3>Uploads</h3><p>Answer-sheet images are used for assessment and are not sold. Access is limited to the people and services needed to operate the learning experience.</p></section>
            <section><h3>Control</h3><p>Students or parents may request correction or deletion of submitted information through the centre’s published contact channel.</p></section>
          </div>
        )}
        <p className="legal-review-note">These starter policies should be reviewed before the website is opened to students.</p>
      </DialogContent>
    </Dialog>
  );
}
