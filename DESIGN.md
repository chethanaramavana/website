# Ramavana website design guide

Updated 20 October 2026. This is the main design brief for the existing Ramavana Mathematical Centre website. It consolidates the owner's identity brief and subsequent decisions. Later explicit owner instructions take precedence.

The accompanying visual reference is `Ramavana Identity.pdf`, dated 20 October 2026, kept locally at `docs/reference/Ramavana Identity.pdf` and excluded from GitHub at the owner's request. Its sketches illustrate layout and identity, not production student data. This guide incorporates its direction; the owner's later approval of imagegen and header-background removal overrides the PDF's earlier restrictions in those two areas.

## Principle

The art plays; the interface stays calm. Buttons, menus and lesson text are quiet and consistent. Numbers, artwork and rewards carry the fun. Preserve the existing learning, sign-in, payment, assessment and teacher workflows while updating their presentation.

Draw the identity from mathematics and everyday Indian school and craft traditions: painted number lettering, geometric figures, rangoli, report cards, red-pen marks and stamps. Avoid generic stock-child hero imagery, decorative icon rows and interchangeable slogans.

## Homepage structure

Use a compact header with Syllabus, Maths Basics, Past papers, Contact and Log in as the reference navigation, preserving practical access to the existing student and teacher areas.

Keep the hero clear and spacious, with the parent-facing headline “Understand the maths. Prepare for the exam.” Explain the offering concretely: chapter notes explain concepts, worked examples show steps, and exam-style papers provide practice before the real test. Retain “Choose your syllabus” and “Try a free lesson” as the actions. Place “Run by professional mathematicians” prominently above the headline, replacing the previous vague eyebrow and small byline. Use organisation-level attribution throughout; do not name an individual teacher, use “[Name], PhD”, or add teacher biographies. Biodata may be added much later if the owner requests it.

Use direct, useful copy for navigation and syllabus cards. The board section is headed “Choose your board”, without an introductory eyebrow or an extra explanation alongside it. Card descriptions state which materials are available, such as chapter notes, worked examples and practice papers. Avoid vague promises or slogans such as “Your next step”, “exam-ready understanding” and “a strong foundation” in place of information.

The hero visual cycles through three concepts of increasing complexity: triangular numbers, Pythagoras’ theorem, and the integral of a square curve. Start with a randomly chosen concept on each page load, then rotate every nine seconds. Place previous/next arrows at the left and right edges of the diagram. Omit dots and a pause button to keep the hero compact. Manual selection pauses rotation. Pause while hovered, off screen or in a hidden tab; respect keyboard focus and start paused for reduced-motion preferences. Explain each concept with an exact formula and a plain caption. Use the existing ten-dancer artwork for the triangular number, and exact SVGs for the geometry and calculus diagrams. Put the weekly-problem board immediately beneath the hero. Keep Bengaluru location and contact information accessible; retain Terms, Privacy and teacher access in the footer.

Give Maths Basics a substantial standalone section, with the heading “Strengthen the skills your child needs”, specific topics and a clear free-lesson link. Use exact mathematical graphics, such as the same fraction represented by a partitioned bar and a number line, rather than decorative icons.

The parent-value section is headed “Study the chapter. Attempt a paper. Review the marks.” Give exam-style papers the largest panel and illustrate it with an extract from an actual existing paper. Supporting panels explain chapter notes and worked examples, plus marks and feedback. Distinguish automatic MCQ scoring from teacher marking of submitted written papers. Any sample remark must be clearly labelled as an example; do not invent student results, testimonials or guarantees.

## Crest and header

- Preserve the supplied crest: no recolouring, redrawing, outlines, shadows, effects or cropping of the artwork.
- The owner explicitly authorises removing the background from `public/ramavana-mark.png` to create a transparent header asset. Preserve the original file and save the transparent export separately. Background removal is the only approved alteration.
- The approved header direction is the preserved unlettered crest beside the original supplied RAMAVANA lettering, with a small “Mathematical Center” subtitle in Source Serif 4, following the latest owner feedback. Keep the compact 60px header. Use the faithfully traced `public/ramavana-wordmark.svg` in the header and oversized footer; retain the original PNG and supplied logo. `scripts/trace-wordmark.py` reproduces the vector trace. Do not trace or redraw the crest.
- The footer places the preserved unlettered crest to the left of the large SVG RAMAVANA wordmark, matching their heights. No separate small logo appears above. Align the Bengaluru attribution with the footer navigation; retain the full organisation name in accessible text and copyright.
- Use the supplied full crest with lettering, centred at about 170px wide on plain paper, at the head of every exam paper, report card and certificate. `public/ramavana-paper-logo.png` already has transparency.
- The owner confirms these represent the same crest, with and without lettering. Choose the appropriate supplied version for each context; do not regenerate the crest with imagegen.
- The owner explicitly approved pixel-preserving exterior-background removal after rejecting imagegen's altered result. The local header uses `public/ramavana-crest-transparent.png`, exported from the original header crest by `scripts/extract-crest.py`. Keep the original canvas and RGB values, preserve internal white details, and change exterior alpha only. Use the original full transparent crest on papers and reports.

## Typography

Load Shrikhand, Baloo Tamma 2 (weights 400–800), Source Serif 4 (400, 600 and italic), and Newsreader (500, for the wordmark only) from Google Fonts.

- **Shrikhand:** numerals and short number labels only, including chapter numbers, scores, “No. 12” and a toy's final answer. At most two Shrikhand items per screen, except the report-card marks column, where the owner explicitly approved Shrikhand in every marks cell. On light backgrounds use gold `#D9A231` with `text-shadow: 2px 2px 0 #011E47`. Scores and weekly-problem numbers use red `#B0300E`. The owner explicitly requested the dark painted-sign offset shadow on the weekly-problem number too.
- **Baloo Tamma 2:** headings at 800; buttons and menus at 600–700; interface and body text at 400 and 17–18px. Use for Kannada text too.
- **Source Serif 4:** lesson text, exam-paper prose and teacher remarks. Remarks are italic. Render mathematics through KaTeX, retaining its compatible mathematical fonts for correct symbols and layout.

## Colours and controls

| Role | Colour |
| --- | --- |
| Interface ink, text and primary buttons | `#011E47` |
| Red pen: ticks, marks, scores, remarks, urgent notices | `#B0300E` |
| Gold numerals and artwork accents | `#D9A231` |
| Highlighter and weekly-problem board | `#F4E0AE` |
| Tests not yet taken | `#4E5B70` |
| Diagram grid dots | `#C9D2DF` |

Use white as the paper surface. Artwork may freely combine ink, red, gold, highlighter and white. Keep interface red reserved for the specified marking and notice roles.

Buttons are pills with `border-radius: 999px`. Primary buttons have an ink background and white text. Secondary buttons use a 1.5px ink outline.

Highlight one key phrase per screen in `#F4E0AE`. After reviewing the first homepage, the owner requested a subtler treatment instead of the large rectangular band. Use a thin, slightly angled marker stroke tucked behind the lower part of the letters, with no large block extending below the word. Size and position the stroke independently of the font's inline box.

## Artwork and chapter figures

The owner subsequently approved using the imagegen skill for artwork, replacing the original instruction to use commissioned-art placeholders only. Generate Warli- or Chittara-inspired artwork with white figures on ink or red panels, with a 10px panel radius. Keep illustrations separate from controls and lesson text. Do not describe generated art as commissioned or handmade.

Chapter figures remain exact, code-authored SVG mathematical diagrams. Draw them in ink with gold or red accents on a dot grid: dots `#C9D2DF`, spaced 12px apart. Put the chapter number in Shrikhand at the top left, subject to the screen-wide typography limit. Use one consistent chapter-card style across all chapters, without per-chapter background colours.

Use artwork to explain a mathematical relationship, with a short caption. Reference ideas include twelve dancers 30° apart and a lotus rangoli on a 9 × 9 dot grid with a visible symmetry line. Any instructional angles, counts, grids and symmetry must be mathematically verified; use exact SVG overlays or diagrams where generated artwork cannot guarantee accuracy. The teacher reviews chapter figures before they become teaching content.

The PDF's first chapter collection is CBSE Grade 6: Patterns in Mathematics; Lines and Angles; Number Play; Data Handling and Presentation; Prime Time; Perimeter and Area; Fractions; Playing with Constructions; Symmetry; The Other Side of Zero. Keep this list aligned with the existing curriculum records rather than changing routing from the sketch. Show real access and completion states instead of the PDF's sample statuses and scores.

Avoid mandala borders, paisley, temple arches, saffron gradients, Latin fonts styled to imitate Devanagari, cartoon mascots, confetti and bouncing buttons.

## Rewards and marking

Eventually trace SVG ticks, crosses and circles from the teacher's supplied red-pen samples. Until those arrive, use a simple stroked tick. A correct answer draws the tick once over 320ms.

Use a round red “ಭೇಷ್! / WELL DONE” stamp, rotated about −13 degrees, for papers scoring at least 80%. The owner approved a stamp beside each qualifying paper. Use its final score, including automatically completed MCQ papers. Do not stamp partial MCQ marks while written marking is pending.

Respect `prefers-reduced-motion` throughout the website, including marking feedback, artwork transitions and scrolling. Show the completed feedback immediately when reduced motion is requested.

## Student dashboard as a report card

Replace the separate results lists with one report table while retaining access to unfinished tests, answer reviews and purchased content.

1. Centre the full crest at the top.
2. Set “Progress report · 2026–27” in spaced capitals.
3. Add a ruled identification line with Student, Class and Book. Derive class and book from available student and paper records; do not invent profile values. Where the student spans multiple classes or books, keep the context explicit.
4. Use one table: Chapter | Paper | Marks | Remark.
5. Set marks in Shrikhand red and remarks in Source Serif 4 italic red. Set tests not yet taken in `#4E5B70`.
6. End with “Issued [date]” and “Ramavana Mathematical Centre” above a signature line; do not identify an individual teacher.

The owner explicitly approved the report-table exception to the two-item Shrikhand limit. Use red Shrikhand for all marks cells; untaken tests retain muted dashes.

## Weekly problem

Place a board directly below the homepage hero, on a highlighter panel with a 10px radius. Include:

- “No. n” in Shrikhand red.
- A prominent “This week’s problem” heading in Baloo at weight 800, approximately 26px on desktop and 24px on mobile, rather than small uppercase eyebrow text. Use organisation-level attribution where attribution is needed.
- Problem text in Source Serif 4 at 21px, with KaTeX mathematics.
- Links to earlier problems and their solutions.

The owner approved adding the editor to the existing teacher area. Store problems and solutions as editable content so the authorised teacher can add and publish them without code. Reuse existing teacher authentication and access checks. The teacher should control publication; do not assume an automatic weekly schedule.

The PDF proposes releasing each solution the following Monday. Support teacher-controlled solution visibility and a truthful release-date label. Do not display “Answer next Monday” unless that release has actually been set. The sample “No. 12” and its problem are illustrative, not a live publication instruction.

## Chapter toys

Small interactive mathematics toys live within their relevant chapter. A Kaprekar 6174 machine belongs in Number Play, for example. Each toy has one input, one button, working shown line by line, and its final answer in Shrikhand. Explain invalid inputs clearly and respect reduced motion.

Start with one small toy per grade. For Kaprekar, accept four digits that are not all identical, preserve leading zeroes in each sorted four-digit operand, and show descending minus ascending digits on every turn. A useful acceptance example from the PDF is `2026 → 5994 → 5355 → 1998 → 8082 → 8532 → 6174`.

## Language and teaching context

Use Indian English, including “Centre” and “practise”, rupees and day–month–year dates. Use Kannada where it feels natural, with readable typography. Add Indian mathematical history when it directly supports the topic, such as zero, number sequences or Kaprekar's routine; verify historical claims before publishing them. Keep lesson explanations coherent and calm.

## Implementation order

1. Establish the shared layout, transparent crest, typefaces, colours and controls.
2. Apply the chapter figures to one grade and build the student report card.
3. Add teacher-supplied red-pen marks when available, retaining the simple tick until then.
4. Develop approved imagegen artwork and the editable weekly problem alongside the shared design work.
5. Add chapter toys, starting with one per grade.

Implement and validate coherent milestones, with GitHub pushes as required by `AGENTS.md`. This guide records the redesign; saving it does not itself change or deploy the website interface.

### Current review scope

The homepage was approved and the owner requested the full learning flow. Review locally at the normal routes. Do not deploy to Sites until requested.

Implemented locally: shared crest/wordmark and large footer, board and grade libraries, uniform diagram cards, public chapter overviews, free notes, MCQ access and review styling, timed written-paper styling, Maths Basics and Integrals presentation, consolidated student report, per-paper stamps, a Number Play Kaprekar toy, and teacher-controlled weekly problems with an archive.

Chapter overviews are public. Starting a written paper uses the existing authentication and payment checks; `?paper=1` restores that intent on refresh and after sign-in. Existing APIs continue to control access, timers, drafts, uploads, payment verification and marking. No new teaching content is implied for chapters whose materials are still being prepared.

The weekly editor is `/teacher/weekly-problems`. Question publication and solution visibility are independent; hidden solutions are omitted from the public API. The new table is migration `drizzle/0008_weekly_problems.sql`. It has been added to the local preview database only; apply the normal migrations during an explicitly requested deployment. Until a problem is published, the homepage labels its sample as a preview.

`/design-review` provides clearly labelled synthetic report records, a real paper extract and sample MCQ feedback for local visual review without creating accounts or attempts. It returns not-found outside development. Example result links are disabled. Production sign-in, payment and teacher publishing require an authenticated integration check with the appropriate configuration; they have not been exercised by making real transactions during this redesign.

## Review criteria

Check the homepage, chapter cards, lesson pages, quizzes, exam papers, teacher area and student report at mobile and desktop widths. Confirm readable mathematics, keyboard access, visible focus, colour contrast and reduced-motion behaviour. Preserve crest proportions and transparency. Keep existing student records, payments, draft answers and teacher marking functional.

Run `node scripts/check-learning-flow.cjs` for the Kaprekar, report-row and weekly-validation checks, plus TypeScript and the production build. The Kaprekar check covers all 9,990 valid four-digit inputs. Check that public routes load and unauthenticated teacher editor reads/writes return 403.

## Remaining owner input

Teacher red-pen samples when available; simple stroked ticks are authorised in the meantime. Report typography and stamp placement are resolved.

## Latest review refinements

- Keep notes compact and child-friendly. Remove the large book icon from covers, long introductory labels and repeated reading instructions. Use a short curiosity prompt beside the ink-and-gold question icon. Retain mathematical explanations, worked steps, practice questions and answers. Notes have natural section heights on screen, with print rules retained.
- Use one calm white style for every Maths Basics grade card. The hero diagram follows the same six dots through counting, two equal groups of three, and the equation 2 × x = 6. Labels and formulae must clear the steps.
- Use Google's unmodified pre-approved light pill sign-in image, sourced from its official branding bundle (`public/google-sign-in-source.txt`). The written-paper access dialog has a short title, a simple free-notes row and the Google button, without repeated explanations or decorative shield icons.
- Correct optical vertical alignment for Baloo numbers and labels in learning goals, breadcrumbs, level rows and pill buttons.
- Local mock sign-in is available at `/dev-login`, also reached by the regular Google sign-in action during localhost development. Student and teacher are fixed test identities; a banner identifies them. Student access is seeded only into the local database with clearly labelled fixture transactions. Google credentials and Razorpay are not used. Mock login and cookies are disabled in production builds and on non-loopback hosts.

Verification: local student opens a timed written paper and can save an MCQ answer back to the report. Local teacher can read the weekly editor; the student is denied. A separate production-build server returned 404 for mock login and 403 for teacher access with a forged mock cookie; student records stayed signed out. Run `node scripts/check-local-preview-auth.cjs` for the build-mode/host/role guards.


### Compact layout and report export

- Align the homepage authority line with the top of the concept diagram and keep the hero close to the header. Primary navy links use white text.
- Maths Basics folders use four compact columns on desktop, two on medium screens and one on mobile. Concept navigation uses numbered rows with a light selected state, a separate level-test control and a plain arrow link to the learning path.
- The report header is one bordered box: crest on the left, student/class/book beside it and Download Report on the right. The PDF contains only the report, including marks, remarks and qualifying stamps. Generate it locally in the browser from the report data; include repeated table headings and page numbers for long reports. Keep the prepared download link available until the report unmounts.
- Report fonts in public/fonts are OFL licensed. scripts/prepare-report-fonts.py reproduces static Baloo and Source Serif fonts from the official Google Fonts sources. Full Baloo embedding preserves its composite glyph outlines. Run node scripts/check-report-pdf.cjs and render the generated PDFs to check short reports, long remarks and continuation pages.
- Written-paper header links use the existing save-and-exit dialog when answers or uploads exist. An unchanged prefilled student name does not count as unsaved work. Successful saving permits the chosen navigation without a second browser warning.


### Notes alignment and paper timing

Use SVG warning marks instead of punctuation glyphs in notes. On screen, notes footers follow the content with a clear gap; keep their print positioning. Centre arrow and breadcrumb icons optically with Baloo labels. The paper timer sits in a compact sticky upper-right status row. Its time warning shares that row, offers a dismiss button and clears after twelve seconds independently of the per-second clock updates.


### Teacher workspace

Student tests is the default view. Keep Activity, Payments and Question papers in compact navigation beside MCQ results, weekly problems and Maths Basics. Navigation controls are 36px high with optically centred labels; secondary refresh controls are 34px. Use rectangular submission cards with separate student/status, chapter, metadata and score rows, and filters for all, to review and marked papers. Marking stays beside the queue on desktop and below it on mobile.

Payment requests show pending manual payments first; completed payments live under collapsed history. Keep PhonePe verification guidance and automatic Razorpay verification distinct. Never expose manual approval for Razorpay orders. Activity has a prominent All MCQ results action and a small Refresh control. Use ink, neutral borders, quiet grey panels and the shared interface font throughout. Teacher dates use IST, including the 24-hour review deadline.
