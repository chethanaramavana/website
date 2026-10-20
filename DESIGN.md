# Ramavana website design guide

Updated 20 October 2026. This is the main design brief for the existing Ramavana Mathematical Centre website. It consolidates the owner's identity brief and subsequent decisions. Later explicit owner instructions take precedence.

The accompanying visual reference is `Ramavana Identity.pdf`, dated 20 October 2026, kept locally at `docs/reference/Ramavana Identity.pdf` and excluded from GitHub at the owner's request. Its sketches illustrate layout and identity, not production student data. This guide incorporates its direction; the owner's later approval of imagegen and header-background removal overrides the PDF's earlier restrictions in those two areas.

## Principle

The art plays; the interface stays calm. Buttons, menus and lesson text are quiet and consistent. Numbers, artwork and rewards carry the fun. Preserve the existing learning, sign-in, payment, assessment and teacher workflows while updating their presentation.

Draw the identity from mathematics and everyday Indian school and craft traditions: painted number lettering, geometric figures, rangoli, report cards, red-pen marks and stamps. Avoid generic stock-child hero imagery, decorative icon rows and interchangeable slogans.

## Homepage structure

Use a compact header with Syllabus, Maths Basics, Past papers, Contact and Log in as the reference navigation, preserving practical access to the existing student and teacher areas.

Keep the hero clear and spacious: a short teaching proposition, supporting copy about chapter notes, worked examples and timed CBSE/ICSE papers, and two actions: “Choose your syllabus” and “Try a free lesson”. Describe the organisation as “run by professional mathematicians”. Use organisation-level attribution throughout; do not name an individual teacher, use “[Name], PhD”, or add teacher biographies. Biodata may be added much later if the owner requests it.

Pair the hero with one mathematical artwork panel. The reference shows groups of 1, 3, 6 and 10 dancers forming triangular numbers, with a caption explaining the mathematics. Put the weekly-problem board immediately beneath the hero. Keep Bengaluru location and contact information accessible; retain Terms, Privacy and teacher access in the footer.

## Crest and header

- Preserve the supplied crest: no recolouring, redrawing, outlines, shadows, effects or cropping of the artwork.
- The owner explicitly authorises removing the background from `public/ramavana-mark.png` to create a transparent header asset. Preserve the original file and save the transparent export separately. Background removal is the only approved alteration.
- Use the crest without lettering in the header at 52px. Beside it, set “RAMAVANA” in Baloo Tamma 2, weight 800, letter spacing 0.16em, with “Mathematical Centre” below at 13px.
- Use the supplied full crest with lettering, centred at about 170px wide on plain paper, at the head of every exam paper, report card and certificate. `public/ramavana-paper-logo.png` already has transparency.
- The owner confirms these represent the same crest, with and without lettering. Choose the appropriate supplied version for each context; do not regenerate the crest with imagegen.
- The owner explicitly approved pixel-preserving exterior-background removal after rejecting imagegen's altered result. The local header uses `public/ramavana-crest-transparent.png`, exported from the original header crest by `scripts/extract-crest.py`. Keep the original canvas and RGB values, preserve internal white details, and change exterior alpha only. Use the original full transparent crest on papers and reports.

## Typography

Load Shrikhand, Baloo Tamma 2 (weights 400–800), and Source Serif 4 (400, 600 and italic) from Google Fonts.

- **Shrikhand:** numerals and short number labels only, including chapter numbers, scores, “No. 12” and a toy's final answer. At most two Shrikhand items per screen. On light backgrounds use gold `#D9A231` with `text-shadow: 2px 2px 0 #011E47`. Scores and weekly-problem numbers use red `#B0300E`.
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

Highlight one key phrase per screen with:

```css
background: linear-gradient(transparent 55%, #F4E0AE 55%, #F4E0AE 92%, transparent 92%);
```

## Artwork and chapter figures

The owner subsequently approved using the imagegen skill for artwork, replacing the original instruction to use commissioned-art placeholders only. Generate Warli- or Chittara-inspired artwork with white figures on ink or red panels, with a 10px panel radius. Keep illustrations separate from controls and lesson text. Do not describe generated art as commissioned or handmade.

Chapter figures remain exact, code-authored SVG mathematical diagrams. Draw them in ink with gold or red accents on a dot grid: dots `#C9D2DF`, spaced 12px apart. Put the chapter number in Shrikhand at the top left, subject to the screen-wide typography limit. Use one consistent chapter-card style across all chapters, without per-chapter background colours.

Use artwork to explain a mathematical relationship, with a short caption. Reference ideas include twelve dancers 30° apart and a lotus rangoli on a 9 × 9 dot grid with a visible symmetry line. Any instructional angles, counts, grids and symmetry must be mathematically verified; use exact SVG overlays or diagrams where generated artwork cannot guarantee accuracy. The teacher reviews chapter figures before they become teaching content.

The PDF's first chapter collection is CBSE Grade 6: Patterns in Mathematics; Lines and Angles; Number Play; Data Handling and Presentation; Prime Time; Perimeter and Area; Fractions; Playing with Constructions; Symmetry; The Other Side of Zero. Keep this list aligned with the existing curriculum records rather than changing routing from the sketch. Show real access and completion states instead of the PDF's sample statuses and scores.

Avoid mandala borders, paisley, temple arches, saffron gradients, Latin fonts styled to imitate Devanagari, cartoon mascots, confetti and bouncing buttons.

## Rewards and marking

Eventually trace SVG ticks, crosses and circles from the teacher's supplied red-pen samples. Until those arrive, use a simple stroked tick. A correct answer draws the tick once over 320ms.

Use a round red “ಭೇಷ್! / WELL DONE” stamp, rotated about −13 degrees, for papers scoring at least 80%. The owner still needs to confirm whether it appears beside each qualifying paper or once for an overall report score; do not silently invent an aggregate rule.

Respect `prefers-reduced-motion` throughout the website, including marking feedback, artwork transitions and scrolling. Show the completed feedback immediately when reduced motion is requested.

## Student dashboard as a report card

Replace the separate results lists with one report table while retaining access to unfinished tests, answer reviews and purchased content.

1. Centre the full crest at the top.
2. Set “Progress report · 2026–27” in spaced capitals.
3. Add a ruled identification line with Student, Class and Book. Derive class and book from available student and paper records; do not invent profile values. Where the student spans multiple classes or books, keep the context explicit.
4. Use one table: Chapter | Paper | Marks | Remark.
5. Set marks in Shrikhand red and remarks in Source Serif 4 italic red. Set tests not yet taken in `#4E5B70`.
6. End with “Issued [date]” and “Ramavana Mathematical Centre” above a signature line; do not identify an individual teacher.

The requirement for Shrikhand marks across a long report table needs to be reconciled with the maximum of two Shrikhand items per screen before implementation; preserve both requirements here rather than silently dropping either.

## Weekly problem

Place a board directly below the homepage hero, on a highlighter panel with a 10px radius. Include:

- “No. n” in Shrikhand red.
- “THIS WEEK'S PROBLEM · RAMAVANA”, with organisation-level attribution.
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

The owner approved the foundation and homepage first. Develop and review locally at the normal homepage route; a `/v2` route is unnecessary when using local preview. Do not deploy these iterations to Sites. Keep the public site unchanged until the owner requests publication. Once the homepage is approved, extend the design to grades, chapters and the full learning path. The weekly-problem editor and report-card workflow belong to subsequent implementation; label any homepage sample problem as a preview rather than implying that the publishing workflow already exists.

## Review criteria

Check the homepage, chapter cards, lesson pages, quizzes, exam papers, teacher area and student report at mobile and desktop widths. Confirm readable mathematics, keyboard access, visible focus, colour contrast and reduced-motion behaviour. Preserve crest proportions and transparency. Keep existing student records, payments, draft answers and teacher marking functional.

## Remaining owner input

- Stamp placement: each qualifying paper or overall report.
- Teacher red-pen samples when available; simple ticks are authorised in the meantime.

The two-item Shrikhand limit and report-table marks also require an explicit design resolution before implementing the report.
