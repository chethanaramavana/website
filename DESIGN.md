# Ramavana website design guide

Updated 20 October 2026. This is the main design brief for the existing Ramavana Mathematical Centre website. It consolidates the owner's identity brief and subsequent decisions. Later explicit owner instructions take precedence.

## Principle

The art plays; the interface stays calm. Buttons, menus and lesson text are quiet and consistent. Numbers, artwork and rewards carry the fun. Preserve the existing learning, sign-in, payment, assessment and teacher workflows while updating their presentation.

## Crest and header

- Preserve the supplied crest: no recolouring, redrawing, outlines, shadows, effects or cropping of the artwork.
- The owner explicitly authorises removing the background from `public/ramavana-mark.png` to create a transparent header asset. Preserve the original file and save the transparent export separately. Background removal is the only approved alteration.
- Use the crest without lettering in the header at 52px. Beside it, set “RAMAVANA” in Baloo Tamma 2, weight 800, letter spacing 0.16em, with “Mathematical Centre” below at 13px.
- Use the supplied full crest with lettering, centred at about 170px wide on plain paper, at the head of every exam paper, report card and certificate. `public/ramavana-paper-logo.png` already has transparency.
- The owner confirms these represent the same crest, with and without lettering. Choose the appropriate supplied version for each context; do not regenerate the crest with imagegen.

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
6. End with “Issued [date]” and the teacher's name above a signature line.

The teacher's display name remains to be supplied. The requirement for Shrikhand marks across a long report table needs to be reconciled with the maximum of two Shrikhand items per screen before implementation; preserve both requirements here rather than silently dropping either.

## Weekly problem

Place a board directly below the homepage hero, on a highlighter panel with a 10px radius. Include:

- “No. n” in Shrikhand red.
- “THIS WEEK'S PROBLEM · SET BY [NAME]”.
- Problem text in Source Serif 4 at 21px, with KaTeX mathematics.
- Links to earlier problems and their solutions.

The owner approved adding the editor to the existing teacher area. Store problems and solutions as editable content so the authorised teacher can add and publish them without code. Reuse existing teacher authentication and access checks. The teacher should control publication; do not assume an automatic weekly schedule.

## Chapter toys

Small interactive mathematics toys live within their relevant chapter. A Kaprekar 6174 machine belongs in Number Play, for example. Each toy has one input, one button, working shown line by line, and its final answer in Shrikhand. Explain invalid inputs clearly and respect reduced motion.

## Review criteria

Check the homepage, chapter cards, lesson pages, quizzes, exam papers, teacher area and student report at mobile and desktop widths. Confirm readable mathematics, keyboard access, visible focus, colour contrast and reduced-motion behaviour. Preserve crest proportions and transparency. Keep existing student records, payments, draft answers and teacher marking functional.

## Remaining owner input

- Teacher name for weekly-problem attribution and report signature.
- Stamp placement: each qualifying paper or overall report.
- Teacher red-pen samples when available; simple ticks are authorised in the meantime.

The two-item Shrikhand limit and report-table marks also require an explicit design resolution before implementing the report.
