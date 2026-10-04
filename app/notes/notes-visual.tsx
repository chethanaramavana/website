import type { ChapterNotes } from '@/lib/chapter-notes';

export type NotesVisualKind =
  | 'patterns' | 'angles' | 'place-value' | 'data' | 'factors' | 'area'
  | 'fractions' | 'construction' | 'symmetry' | 'number-line' | 'sets'
  | 'ratio' | 'percentage' | 'speed' | 'algebra-tiles' | 'balance'
  | 'geometry' | 'solid-net' | 'polynomial' | 'linear-lines' | 'quadratic'
  | 'sequence' | 'similarity' | 'coordinate' | 'trigonometry' | 'heights'
  | 'circle' | 'sector' | 'solids' | 'statistics' | 'probability'
  | 'mapping' | 'unit-circle' | 'complex-plane' | 'inequality'
  | 'counting' | 'pascal' | 'straight-line' | 'conics' | 'three-d'
  | 'derivative' | 'matrix' | 'determinant' | 'continuity' | 'calculus-area'
  | 'between-curves' | 'slope-field' | 'vector' | 'linear-programming';

const visualBySlug: Record<string, NotesVisualKind> = {
  'g6-patterns': 'patterns',
  'g6-lines-angles': 'angles',
  'g6-number-play': 'place-value',
  'g6-data': 'data',
  'g6-prime-time': 'factors',
  'g6-perimeter-area': 'area',
  'g6-fractions': 'fractions',
  'g6-constructions': 'construction',
  'g6-symmetry': 'symmetry',
  'g6-integers': 'number-line',
  'real-numbers': 'factors',
  polynomials: 'polynomial',
  'linear-equations': 'linear-lines',
  'quadratic-equations': 'quadratic',
  'arithmetic-progressions': 'sequence',
  triangles: 'similarity',
  'coordinate-geometry': 'coordinate',
  'introduction-trigonometry': 'trigonometry',
  'applications-trigonometry': 'heights',
  circles: 'circle',
  'areas-circles': 'sector',
  'surface-areas-volumes': 'solids',
  statistics: 'statistics',
  probability: 'probability',
  'g11-sets': 'sets',
  'g11-relations-functions': 'mapping',
  'g11-trigonometric-functions': 'unit-circle',
  'g11-complex-numbers': 'complex-plane',
  'g11-linear-inequalities': 'inequality',
  'g11-permutations-combinations': 'counting',
  'g11-binomial-theorem': 'pascal',
  'g11-sequences-series': 'sequence',
  'g11-straight-lines': 'straight-line',
  'g11-conic-sections': 'conics',
  'g11-three-dimensional-geometry': 'three-d',
  'g11-limits-derivatives': 'derivative',
  'g11-statistics': 'statistics',
  'g11-probability': 'probability',
  'g12-relations-functions': 'mapping',
  'g12-inverse-trigonometric-functions': 'unit-circle',
  'g12-matrices': 'matrix',
  'g12-determinants': 'determinant',
  'g12-continuity-differentiability': 'continuity',
  'g12-applications-derivatives': 'derivative',
  'g12-integrals': 'calculus-area',
  'g12-applications-integrals': 'between-curves',
  'g12-differential-equations': 'slope-field',
  'g12-vector-algebra': 'vector',
  'g12-three-dimensional-geometry': 'three-d',
  'g12-linear-programming': 'linear-programming',
  'g12-probability': 'probability',
  'icse6-knowing-numbers': 'place-value',
  'icse6-whole-numbers': 'number-line',
  'icse6-playing-with-numbers': 'factors',
  'icse6-integers': 'number-line',
  'icse6-sets': 'sets',
  'icse6-fractions': 'fractions',
  'icse6-decimals': 'place-value',
  'icse6-ratio-proportion': 'ratio',
  'icse6-percentage-unitary-method': 'percentage',
  'icse6-speed-time-distance': 'speed',
  'icse6-algebraic-expressions': 'algebra-tiles',
  'icse6-linear-equations': 'balance',
  'icse6-basic-geometry': 'geometry',
  'icse6-angles-triangles-quadrilaterals': 'angles',
  'icse6-3d-shapes-nets': 'solid-net',
  'icse6-symmetry-practical-geometry': 'construction',
  'icse6-mensuration-conversions': 'area',
  'icse6-data-handling': 'data',
};

type VisualMeta = { title: string; caption: string; connection: string; before: string };

const visualMeta: Record<NotesVisualKind, VisualMeta> = {
  patterns: { title: 'A pattern grows for a reason', caption: 'Dot pictures make triangular and square numbers visible before a formula is used.', connection: 'Floor tiles, staircases and seating rows all grow by rules. Spotting what changes—and what stays fixed—is the beginning of algebra.', before: 'Be comfortable with counting numbers and repeated addition.' },
  angles: { title: 'An angle measures a turn', caption: 'The same pair of rays can be read as a small turn or a larger turn; the vertex and direction matter.', connection: 'Clock hands, door hinges and road junctions all create turns. Angle language helps us describe those turns exactly.', before: 'Recall a full turn, a half turn and a quarter turn.' },
  'place-value': { title: 'Position gives a digit its value', caption: 'Moving one place left makes a digit ten times as valuable; moving right divides its value by ten.', connection: 'Prices, populations and measurements only make sense when every digit is placed correctly.', before: 'Recall the powers of ten and how zero holds an empty place.' },
  data: { title: 'A picture should tell the truth', caption: 'A clear scale turns raw counts into a graph that can be compared without distortion.', connection: 'Sports scores, attendance and weather records become useful only after they are organised and displayed clearly.', before: 'Practise counting, comparing and reading a labelled scale.' },
  factors: { title: 'Break numbers into prime building blocks', caption: 'A factor tree exposes the prime factors used to build a composite number.', connection: 'Equal grouping, repeating schedules and pack sizes all depend on factors and multiples.', before: 'Recall multiplication tables and exact division.' },
  area: { title: 'Boundary and surface are different', caption: 'Perimeter follows the outside edge; area counts the square units covering the inside.', connection: 'Fencing a garden and tiling the same garden require different measurements.', before: 'Recall length units and multiplication of whole numbers.' },
  fractions: { title: 'Fractions are numbers, not two unrelated digits', caption: 'Equal fraction strips occupy the same length even when their numerators and denominators differ.', connection: 'Sharing food, measuring ingredients and reading time all use equal parts of a whole.', before: 'Recall multiplication tables and the meaning of equal parts.' },
  construction: { title: 'Arcs create exact positions', caption: 'Equal-radius arcs locate points that are the same distance from both ends of a segment.', connection: 'Geometric construction is the mathematics behind accurate layouts, patterns and technical drawings.', before: 'Know how to use a ruler, compass and sharp pencil safely.' },
  symmetry: { title: 'A transformation preserves a match', caption: 'Reflection uses a mirror line; rotation uses a centre and an angle of turn.', connection: 'Textiles, rangoli, buildings and logos use repeated balance and symmetry.', before: 'Recall halves, turns and corresponding points.' },
  'number-line': { title: 'Direction gives a number its sign', caption: 'Rightward movement increases a value; leftward movement decreases it.', connection: 'Temperatures, bank balances, lifts and sea levels all move above and below a reference point.', before: 'Recall ordering whole numbers and addition facts.' },
  sets: { title: 'Venn diagrams make relationships visible', caption: 'The overlap belongs to both sets; the outside region belongs to neither set.', connection: 'Whenever objects are sorted by more than one property, sets help us avoid missing or double-counting items.', before: 'Be able to classify objects by a stated property.' },
  ratio: { title: 'A ratio compares in the same order', caption: 'Tape diagrams show how equal-sized parts build two related quantities.', connection: 'Recipes, maps and mixtures keep the same comparison even when the total size changes.', before: 'Recall equivalent fractions and multiplication tables.' },
  percentage: { title: 'Percent means out of one hundred', caption: 'A hundred grid connects a fraction, a decimal and a percentage to the same shaded amount.', connection: 'Discounts, marks, interest and survey results are commonly compared per hundred.', before: 'Recall fractions with denominator 100 and decimal place value.' },
  speed: { title: 'Three quantities, one relationship', caption: 'Distance, speed and time can be arranged so the unknown is found from the other two.', connection: 'Every journey links how far we travel, how fast we move and how long it takes.', before: 'Recall unit conversion and multiplication or division.' },
  'algebra-tiles': { title: 'Like terms have the same shape', caption: 'Algebra tiles separate x-terms, square terms and constants so only like terms are combined.', connection: 'Algebra is a compact language for repeated patterns and unknown quantities.', before: 'Recall the meaning of a variable and signed numbers.' },
  balance: { title: 'An equation stays balanced', caption: 'Whatever operation is performed on one side must also be performed on the other.', connection: 'A weighing balance is a useful model for keeping two expressions equal while an unknown is found.', before: 'Recall inverse operations and the meaning of equality.' },
  geometry: { title: 'Small marks carry precise meaning', caption: 'A point, line, ray and segment differ by their endpoints and how far they extend.', connection: 'Maps, plans and designs begin with points, paths, boundaries and circles.', before: 'Know how to name points with capital letters.' },
  'solid-net': { title: 'A flat net folds into a solid', caption: 'Faces joined along matching edges fold to form a cube without overlap.', connection: 'Boxes and packages are designed flat, cut out, and then folded into three-dimensional forms.', before: 'Recognise common polygons and solid faces.' },
  polynomial: { title: 'Zeroes are visible on a graph', caption: 'A real zero is the x-coordinate where the graph meets the x-axis.', connection: 'Curves can model height, profit and motion; their zeroes mark moments when the measured quantity becomes zero.', before: 'Recall plotting coordinates and factorising simple expressions.' },
  'linear-lines': { title: 'The graph reveals how many solutions exist', caption: 'Intersecting, parallel and coincident lines correspond to one, no and infinitely many solutions.', connection: 'Two conditions—such as two price plans—can be compared by finding where their straight-line models meet.', before: 'Recall plotting a linear equation on coordinate axes.' },
  quadratic: { title: 'The discriminant predicts the graph', caption: 'Two crossings, one touch or no crossing correspond to positive, zero or negative discriminant.', connection: 'Projectile paths and area problems often produce quadratic relationships.', before: 'Recall factorisation, square roots and the coordinate plane.' },
  sequence: { title: 'A rule links position to value', caption: 'A staircase shows a fixed change from one term to the next and connects it to the term number.', connection: 'Savings plans, seating rows and repeated growth are naturally described by sequences.', before: 'Recall signed addition, multiplication and simple algebra.' },
  similarity: { title: 'Same shape, proportional size', caption: 'Matching angles fix the shape; corresponding side lengths change by one scale factor.', connection: 'Maps, models, shadows and photographs enlarge or reduce shapes without changing their form.', before: 'Recall ratios, angle sums and corresponding vertices.' },
  coordinate: { title: 'Coordinates turn geometry into calculation', caption: 'Differences in x and y create a right triangle, while a section point lies a fixed fraction along a segment.', connection: 'Digital maps and design software locate points using ordered coordinates.', before: 'Recall the coordinate quadrants and Pythagoras’ theorem.' },
  trigonometry: { title: 'Name the sides from the chosen angle', caption: 'The opposite and adjacent sides change with the reference angle; the hypotenuse does not.', connection: 'Surveyors use right triangles to find lengths that cannot be measured directly.', before: 'Recall right triangles, ratios and Pythagoras’ theorem.' },
  heights: { title: 'Turn the situation into a right triangle', caption: 'A horizontal, a vertical and a line of sight form the triangle used for elevation or depression.', connection: 'Heights of towers, trees and hills can be found from a safe distance using an angle.', before: 'Recall trigonometric ratios and standard-angle values.' },
  circle: { title: 'A radius meets its tangent at a right angle', caption: 'Joining the centre to a point of contact creates the right triangle used in tangent problems.', connection: 'Wheels, tracks and circular mechanisms use tangents wherever straight motion touches a circle.', before: 'Recall radii, chords and right-triangle reasoning.' },
  sector: { title: 'A central angle selects a fraction of a circle', caption: 'A sector includes the central triangle; a segment is the curved part left after that triangle is removed.', connection: 'Fans, tracks, clock faces and round designs combine straight and curved boundaries.', before: 'Recall circumference, circle area and angle fractions of 360°.' },
  solids: { title: 'Count only surfaces that are exposed', caption: 'When solids are joined, the touching faces become internal even though their volumes remain.', connection: 'Containers, tanks and models require different calculations for material, volume and capacity.', before: 'Recall circle area, unit conversion and the names of common solids.' },
  statistics: { title: 'Centre and spread tell different stories', caption: 'Two distributions can share a centre yet have very different spread.', connection: 'Marks, temperatures and performance data need a typical value and a measure of variation.', before: 'Recall averages, frequency and the coordinate axes.' },
  probability: { title: 'Organise outcomes before counting', caption: 'A tree or overlap diagram prevents outcomes from being missed or counted twice.', connection: 'Games, forecasts and risk decisions compare favourable possibilities with all permitted possibilities.', before: 'Recall fractions, sets and careful counting.' },
  mapping: { title: 'Arrows reveal what a function does', caption: 'Every domain element must have exactly one image; one-one and onto describe different arrow patterns.', connection: 'A rule that assigns one output to each input can model conversion, cost or motion.', before: 'Recall ordered pairs, sets and the meaning of input and output.' },
  'unit-circle': { title: 'Angles become coordinates', caption: 'On the unit circle, the point reached by an angle has coordinates (cos θ, sin θ).', connection: 'Rotation, waves and periodic motion are naturally described by circular functions.', before: 'Recall radians, coordinates and right-triangle ratios.' },
  'complex-plane': { title: 'A complex number is a point and a vector', caption: 'The real and imaginary parts locate z; its modulus is the distance from the origin.', connection: 'Complex numbers extend the number line into a plane and make previously impossible equations solvable.', before: 'Recall coordinates, Pythagoras’ theorem and square roots.' },
  inequality: { title: 'An inequality describes a region', caption: 'A boundary separates points that satisfy the inequality from those that do not.', connection: 'Budgets, limits and safety ranges usually allow many answers rather than one exact value.', before: 'Recall solving linear equations and plotting a number line.' },
  counting: { title: 'Count choices without listing everything', caption: 'A branching tree and empty slots show when choices multiply and when order matters.', connection: 'Passwords, seating arrangements and team selection create large numbers of possibilities.', before: 'Recall factorial notation and the multiplication principle.' },
  pascal: { title: 'Binomial coefficients form a pattern', caption: 'Every interior Pascal-triangle entry is the sum of the two entries directly above it.', connection: 'Repeated expansion creates a predictable coefficient pattern instead of requiring long multiplication.', before: 'Recall powers, combinations and simple algebraic expansion.' },
  'straight-line': { title: 'Slope measures rise for each run', caption: 'A slope triangle links the graph of a line to the ratio of vertical and horizontal change.', connection: 'Constant rates—such as a fixed price per kilometre—produce straight-line graphs.', before: 'Recall coordinates, ratios and linear equations.' },
  conics: { title: 'A focus rule creates each conic', caption: 'Parabola, ellipse and hyperbola arise from precise distance relationships.', connection: 'Satellite dishes, orbits and cooling towers use the reflective or structural properties of conic curves.', before: 'Recall distance on the coordinate plane and standard algebraic forms.' },
  'three-d': { title: 'Three coordinates locate a point in space', caption: 'The x-, y- and z-directions are mutually perpendicular and describe movement in space.', connection: 'Navigation, architecture and computer graphics all need a three-dimensional coordinate system.', before: 'Recall two-dimensional coordinates, vectors and Pythagoras’ theorem.' },
  derivative: { title: 'A secant becomes a tangent', caption: 'As two points on a curve come closer, the slope between them approaches the instantaneous slope.', connection: 'A speedometer reports an instantaneous rate—the same idea measured by a derivative.', before: 'Recall function graphs, slope and algebraic simplification.' },
  matrix: { title: 'Rows and columns organise a transformation', caption: 'A matrix stores numbers by position; multiplication combines rows with columns.', connection: 'Images, networks and simultaneous data can be transformed efficiently using matrices.', before: 'Recall ordered arithmetic and solving linear equations.' },
  determinant: { title: 'A determinant measures signed scale', caption: 'In two dimensions, the determinant records the signed area scale of a parallelogram.', connection: 'Determinants test whether equations have a unique solution and how a transformation changes area.', before: 'Recall matrices, algebraic signs and coordinate area.' },
  continuity: { title: 'A continuous graph has no break at the point', caption: 'A filled value, a hole and a jump show three different behaviours near the same x-value.', connection: 'Smooth motion and physical change are often modelled by functions without sudden breaks.', before: 'Recall limits, function values and one-sided approach.' },
  'calculus-area': { title: 'An integral accumulates signed area', caption: 'Thin vertical strips build an area; strips below the x-axis contribute negatively.', connection: 'Accumulating changing rates gives total distance, quantity or area.', before: 'Recall antiderivatives, graphs and the area of simple shapes.' },
  'between-curves': { title: 'Top minus bottom gives a vertical strip', caption: 'The intersection points set the limits and the gap between curves gives each strip’s height.', connection: 'Areas enclosed by changing boundaries appear in design, motion and optimisation.', before: 'Recall definite integrals and solving equations for intersections.' },
  'slope-field': { title: 'A differential equation prescribes local slope', caption: 'Short line segments show the slope at many points; solution curves follow their direction.', connection: 'Growth, cooling and motion are modelled by rules about how quickly a quantity changes.', before: 'Recall derivatives, coordinates and separation of variables.' },
  vector: { title: 'Vectors combine by direction and magnitude', caption: 'The parallelogram rule shows vector addition; projection measures one vector along another.', connection: 'Forces, velocities and displacements require both size and direction.', before: 'Recall coordinates, Pythagoras’ theorem and trigonometry.' },
  'linear-programming': { title: 'The feasible region contains every allowed solution', caption: 'Each inequality shades a half-plane; their common polygon is tested at its corner points.', connection: 'Limited time, money and materials can be allocated to maximise profit or minimise cost.', before: 'Recall linear inequalities, graphing lines and evaluating expressions.' },
};

export function getNotesVisualKind(notes: ChapterNotes): NotesVisualKind {
  return visualBySlug[notes.slug] ?? 'geometry';
}

export function getNotesVisualMeta(notes: ChapterNotes) {
  return visualMeta[getNotesVisualKind(notes)];
}

const axis = <>
  <path d="M80 160H570" className="visual-axis" />
  <path d="M320 34V280" className="visual-axis" />
  <path d="m570 160-12-7v14Z" className="visual-axis-fill" />
  <path d="m320 34-7 12h14Z" className="visual-axis-fill" />
</>;

function dots(points: Array<[number, number]>, className = 'visual-dot') {
  return points.map(([cx, cy], index) => <circle key={`${cx}-${cy}-${index}`} cx={cx} cy={cy} r="5" className={className} />);
}

function Diagram({ kind }: { kind: NotesVisualKind }) {
  switch (kind) {
    case 'patterns':
      return <>
        <text x="70" y="55" className="visual-label">triangular</text>
        {dots([[110,220],[110,190],[140,220],[110,160],[140,190],[170,220]])}
        <path d="M218 190h58" className="visual-arrow" /><path d="m276 190-12-7v14Z" className="visual-accent-fill" />
        <text x="300" y="55" className="visual-label">square</text>
        {dots([[360,150],[390,150],[420,150],[360,180],[390,180],[420,180],[360,210],[390,210],[420,210]], 'visual-dot-gold')}
        <text x="92" y="255" className="visual-small">1 + 2 + 3 = 6</text><text x="342" y="255" className="visual-small">3 × 3 = 9</text>
      </>;
    case 'angles':
      return <>
        <path d="M120 235H300M120 235 238 104" className="visual-line" />
        <path d="M177 235A57 57 0 0 0 158 192" className="visual-accent" />
        <circle cx="120" cy="235" r="6" className="visual-dot" /><text x="105" y="266" className="visual-small">vertex</text>
        <text x="172" y="206" className="visual-label">48°</text>
        <path d="M390 235H550M390 235V75" className="visual-line" /><path d="M390 205h30v30" className="visual-gold" />
        <text x="437" y="205" className="visual-label">90°</text>
      </>;
    case 'place-value':
      return <>
        {['Thousands','Hundreds','Tens','Ones'].map((label,index)=><g key={label}><rect x={60+index*132} y="86" width="120" height="126" rx="12" className={index===3?'visual-card-gold':'visual-card'} /><text x={120+index*132} y="120" textAnchor="middle" className="visual-small">{label}</text><text x={120+index*132} y="183" textAnchor="middle" className="visual-number">{['4','0','7','2'][index]}</text></g>)}
        <path d="M115 245H510" className="visual-arrow" /><path d="m510 245-12-7v14Z" className="visual-accent-fill" /><text x="312" y="275" textAnchor="middle" className="visual-small">each step right ÷ 10</text>
      </>;
    case 'data':
      return <>
        <path d="M95 250V60M95 250H560" className="visual-line" />
        {[120,200,280,360,440].map((x,index)=><rect key={x} x={x} y={245-[3,7,5,9,6][index]*17} width="54" height={[3,7,5,9,6][index]*17} rx="6" className={index===3?'visual-bar-gold':'visual-bar'} />)}
        {['A','B','C','D','E'].map((v,i)=><text key={v} x={147+i*80} y="278" textAnchor="middle" className="visual-small">{v}</text>)}
        <path d="M92 98H560" className="visual-guide" /><text x="55" y="104" className="visual-small">9</text>
      </>;
    case 'factors':
      return <>
        <g className="visual-tree-lines"><path d="M320 48 220 105M320 48 420 105M220 105 150 165M220 105 270 165M270 165 235 225M270 165 305 225M420 105 385 165M420 105 455 165" /></g>
        {[['72',320,42],['8',220,105],['9',420,105],['2',150,165],['4',270,165],['3',385,165],['3',455,165],['2',235,225],['2',305,225]].map(([t,x,y],i)=><g key={String(t)+i}><circle cx={Number(x)} cy={Number(y)} r={i===0?25:19} className={i>=3&&i!==4?'visual-node-gold':'visual-node'} /><text x={Number(x)} y={Number(y)+5} textAnchor="middle" className="visual-node-text">{t}</text></g>)}
        <text x="320" y="285" textAnchor="middle" className="visual-label">72 = 2³ × 3²</text>
      </>;
    case 'area':
      return <>
        <rect x="105" y="72" width="420" height="180" rx="7" className="visual-shape" />
        {[175,245,315,385,455].map(x=><path key={x} d={`M${x} 72v180`} className="visual-grid" />)}
        {[117,162,207].map(y=><path key={y} d={`M105 ${y}h420`} className="visual-grid" />)}
        <path d="M105 270H525" className="visual-accent" /><text x="315" y="296" textAnchor="middle" className="visual-small">perimeter follows the edge</text>
        <text x="315" y="168" textAnchor="middle" className="visual-label">24 square units</text>
      </>;
    case 'fractions':
      return <>
        <text x="75" y="72" className="visual-label">same amount</text>
        {[0,1,2,3].map(i=><rect key={i} x={75+i*115} y="95" width="105" height="54" className={i<3?'visual-fraction-fill':'visual-fraction-empty'} />)}
        {[0,1,2,3,4,5,6,7].map(i=><rect key={i} x={75+i*57.5} y="170" width="52.5" height="43" className={i<6?'visual-fraction-gold':'visual-fraction-empty'} />)}
        <text x="550" y="130" className="visual-label">3/4</text><text x="550" y="200" className="visual-label">6/8</text>
        <path d="M90 260H550" className="visual-line" />{[90,205,320,435,550].map((x,i)=><g key={x}><path d={`M${x} 250v20`} className="visual-line"/><text x={x} y="292" textAnchor="middle" className="visual-small">{i}/4</text></g>)}
      </>;
    case 'construction':
      return <>
        <path d="M120 205H520" className="visual-line" /><circle cx="120" cy="205" r="6" className="visual-dot"/><circle cx="520" cy="205" r="6" className="visual-dot"/>
        <path d="M120 205A235 235 0 0 1 320 82M520 205A235 235 0 0 0 320 82M120 205A235 235 0 0 0 320 286M520 205A235 235 0 0 1 320 286" className="visual-construction-arc" />
        <path d="M320 66V298" className="visual-accent" /><text x="102" y="230" className="visual-small">A</text><text x="526" y="230" className="visual-small">B</text><text x="334" y="120" className="visual-label">equal arcs</text>
      </>;
    case 'symmetry':
      return <>
        <path d="M320 42V278" className="visual-symmetry-line" />
        <path d="M300 75C210 55 140 120 175 178c23 39 71 47 125 24Z" className="visual-shape" />
        <path d="M340 75c90-20 160 45 125 103-23 39-71 47-125 24Z" className="visual-shape-gold" />
        <path d="M300 75c-38 55-48 103 0 127M340 75c38 55 48 103 0 127" className="visual-line" />
        <text x="320" y="305" textAnchor="middle" className="visual-small">corresponding points stay equally far from the mirror line</text>
      </>;
    case 'number-line':
      return <>
        <path d="M70 164H570" className="visual-line" /><path d="m570 164-12-7v14Z" className="visual-axis-fill" />
        {[-4,-3,-2,-1,0,1,2,3,4].map((v,i)=><g key={v}><path d={`M${100+i*55} 151v26`} className="visual-line"/><text x={100+i*55} y="202" textAnchor="middle" className="visual-small">{v}</text></g>)}
        <path d="M155 126C215 70 390 70 485 126" className="visual-accent" /><path d="m485 126-14-2 7-11Z" className="visual-accent-fill" /><text x="320" y="75" textAnchor="middle" className="visual-label">move right: +6</text>
      </>;
    case 'sets':
      return <>
        <rect x="65" y="42" width="510" height="236" rx="18" className="visual-universe" />
        <circle cx="260" cy="160" r="95" className="visual-set-a" /><circle cx="380" cy="160" r="95" className="visual-set-b" />
        <path d="M320 83c-31 17-52 44-52 77s21 60 52 77c31-17 52-44 52-77s-21-60-52-77Z" className="visual-overlap" />
        <text x="210" y="90" className="visual-label">A</text><text x="428" y="90" className="visual-label">B</text><text x="320" y="165" textAnchor="middle" className="visual-node-text">A ∩ B</text>
      </>;
    case 'ratio':
      return <>
        <text x="70" y="100" className="visual-label">2 parts</text>{[0,1].map(i=><rect key={i} x={170+i*90} y="70" width="80" height="55" rx="8" className="visual-card"/>)}
        <text x="70" y="205" className="visual-label">3 parts</text>{[0,1,2].map(i=><rect key={i} x={170+i*90} y="175" width="80" height="55" rx="8" className="visual-card-gold"/>)}
        <text x="510" y="162" className="visual-number">2 : 3</text>
      </>;
    case 'percentage':
      return <>
        {Array.from({length:100},(_,i)=><rect key={i} x={82+(i%10)*20} y={50+Math.floor(i/10)*20} width="17" height="17" rx="2" className={i<35?'visual-percent-fill':'visual-percent-empty'} />)}
        <text x="390" y="115" className="visual-number">35%</text><text x="390" y="160" className="visual-label">= 35/100</text><text x="390" y="205" className="visual-label">= 0.35</text>
      </>;
    case 'speed':
      return <>
        <path d="M120 220H520" className="visual-line" /><path d="m520 220-12-7v14Z" className="visual-axis-fill" />
        <circle cx="160" cy="220" r="11" className="visual-dot"/><circle cx="490" cy="220" r="11" className="visual-dot-gold"/>
        <path d="M170 183H478" className="visual-arrow"/><path d="m478 183-12-7v14Z" className="visual-accent-fill" />
        <text x="320" y="158" textAnchor="middle" className="visual-label">distance = speed × time</text><text x="160" y="255" textAnchor="middle" className="visual-small">start</text><text x="490" y="255" textAnchor="middle" className="visual-small">finish</text>
      </>;
    case 'algebra-tiles':
      return <>
        <rect x="70" y="65" width="120" height="120" className="visual-card"/><text x="130" y="137" textAnchor="middle" className="visual-number">x²</text>
        {[225,285,345].map(x=><g key={x}><rect x={x} y="65" width="45" height="120" className="visual-card-gold"/><text x={x+22.5} y="137" textAnchor="middle" className="visual-label">x</text></g>)}
        {[225,285,345,405].map(x=><rect key={x} x={x} y="215" width="40" height="40" className="visual-unit-tile"/>)}
        <text x="505" y="160" className="visual-label">x² + 3x + 4</text>
      </>;
    case 'balance':
      return <>
        <path d="M320 60V240M175 105H465M245 240H395" className="visual-line"/><path d="M175 105 115 215M175 105 235 215M465 105 405 215M465 105 525 215" className="visual-line"/>
        <path d="M105 215h140q-12 45-70 45t-70-45ZM395 215h140q-12 45-70 45t-70-45Z" className="visual-shape"/>
        <text x="175" y="242" textAnchor="middle" className="visual-number">x + 3</text><text x="465" y="242" textAnchor="middle" className="visual-number">9</text>
      </>;
    case 'geometry':
      return <>
        <circle cx="90" cy="95" r="6" className="visual-dot"/><text x="82" y="125" className="visual-small">point</text>
        <path d="M175 95H305" className="visual-line"/><circle cx="175" cy="95" r="5" className="visual-dot"/><circle cx="305" cy="95" r="5" className="visual-dot"/><text x="213" y="125" className="visual-small">segment</text>
        <path d="M365 95H545" className="visual-line"/><path d="m545 95-12-7v14Z" className="visual-axis-fill"/><circle cx="365" cy="95" r="5" className="visual-dot"/><text x="435" y="125" className="visual-small">ray</text>
        <circle cx="205" cy="220" r="60" className="visual-circle"/><path d="M145 220H265" className="visual-accent"/><path d="M170 178 240 255" className="visual-gold"/><text x="295" y="225" className="visual-label">diameter and chord</text>
      </>;
    case 'solid-net':
      return <>
        {[[220,45],[220,115],[150,115],[290,115],[360,115],[220,185]].map(([x,y],i)=><rect key={i} x={x} y={y} width="68" height="68" className={i===2?'visual-card-gold':'visual-card'} />)}
        <path d="M470 85 535 120v75l-65 38-65-38v-75Zm0 0v75m65-40-65 40-65-40m65 40v73" className="visual-line"/>
        <text x="252" y="284" textAnchor="middle" className="visual-small">net</text><text x="470" y="284" textAnchor="middle" className="visual-small">folded cube</text>
      </>;
    case 'polynomial':
      return <>
        {axis}
        <path d="M125 72C180 260 250 260 320 95C390 260 460 260 525 72" className="visual-curve" />
        <circle cx="165" cy="160" r="6" className="visual-dot-gold"/><circle cx="475" cy="160" r="6" className="visual-dot-gold"/>
        <text x="320" y="305" textAnchor="middle" className="visual-small">x-intercepts are real zeroes</text>
      </>;
    case 'quadratic':
      return <>
        {axis}
        <path d="M120 65Q320 285 520 65" className="visual-curve" />
        <circle cx="246" cy="160" r="6" className="visual-dot-gold"/><circle cx="394" cy="160" r="6" className="visual-dot-gold"/>
        <path d="M320 160V175" className="visual-guide" />
        <text x="320" y="305" textAnchor="middle" className="visual-small">D &gt; 0 gives two real x-intercepts</text>
      </>;
    case 'linear-lines':
      return <>
        <g transform="translate(-25 0)">{axis}</g><path d="M105 240 510 78M120 70 500 245" className="visual-curve"/><circle cx="307" cy="159" r="7" className="visual-dot-gold"/><text x="330" y="142" className="visual-small">one solution</text>
        <path d="M405 72 545 128M405 115 545 171" className="visual-gold"/><text x="458" y="205" className="visual-small">parallel: none</text>
      </>;
    case 'sequence':
      return <>
        {[0,1,2,3,4].map(i=><g key={i}><rect x={75+i*95} y={230-i*36} width="75" height={36+i*36} rx="5" className={i===4?'visual-card-gold':'visual-card'} /><text x={112+i*95} y="272" textAnchor="middle" className="visual-small">n={i+1}</text></g>)}
        <path d="M90 55H535" className="visual-arrow"/><path d="m535 55-12-7v14Z" className="visual-accent-fill"/><text x="315" y="42" textAnchor="middle" className="visual-label">constant change</text>
      </>;
    case 'similarity':
      return <>
        <path d="M85 245 205 90 285 245Z" className="visual-shape"/><path d="M345 245 430 135 490 245Z" className="visual-shape-gold"/>
        <text x="177" y="270" textAnchor="middle" className="visual-small">scale factor k</text><text x="420" y="270" textAnchor="middle" className="visual-small">same angles</text>
        <path d="M105 220A35 35 0 0 1 128 196M360 222A28 28 0 0 1 379 203" className="visual-accent"/><path d="M278 130H350" className="visual-arrow"/><path d="m350 130-12-7v14Z" className="visual-accent-fill"/>
      </>;
    case 'coordinate':
    case 'straight-line':
      return <>
        {axis}<path d="M120 235 500 78" className="visual-curve"/><path d="M205 200H390V123" className="visual-guide"/><circle cx="205" cy="200" r="6" className="visual-dot"/><circle cx="390" cy="123" r="6" className="visual-dot-gold"/><text x="278" y="220" className="visual-small">run</text><text x="405" y="165" className="visual-small">rise</text>
      </>;
    case 'trigonometry':
    case 'heights':
      return <>
        <path d="M105 250H535V75Z" className="visual-shape"/><path d="M505 250v-30h30" className="visual-line"/><path d="M170 250A65 65 0 0 1 156 211" className="visual-accent"/>
        <text x="180" y="230" className="visual-label">θ</text><text x="305" y="282" textAnchor="middle" className="visual-small">adjacent / horizontal distance</text><text x="550" y="170" className="visual-small">opposite / height</text><text x="330" y="140" className="visual-small">hypotenuse / line of sight</text>
      </>;
    case 'circle':
      return <>
        <circle cx="255" cy="165" r="105" className="visual-circle"/><circle cx="255" cy="165" r="6" className="visual-dot"/><path d="M255 165 338 230M338 230 470 62" className="visual-line"/><path d="M326 221 335 209 347 218" className="visual-gold"/>
        <text x="235" y="153" className="visual-small">O</text><text x="346" y="250" className="visual-small">T</text><text x="460" y="112" className="visual-label">tangent</text>
      </>;
    case 'sector':
      return <>
        <circle cx="235" cy="165" r="110" className="visual-circle"/><path d="M235 165 327 105A110 110 0 0 1 307 248Z" className="visual-sector"/><path d="M235 165 327 105M235 165 307 248M327 105Q390 165 307 248" className="visual-line"/>
        <text x="245" y="145" className="visual-label">θ</text><text x="400" y="145" className="visual-label">sector</text><text x="400" y="190" className="visual-small">segment = sector − triangle</text>
      </>;
    case 'solids':
      return <>
        <ellipse cx="235" cy="82" rx="85" ry="28" className="visual-shape"/><path d="M150 82v140c0 16 38 28 85 28s85-12 85-28V82" className="visual-shape"/><ellipse cx="235" cy="222" rx="85" ry="28" className="visual-shape"/>
        <path d="M405 220 495 65 585 220Z" className="visual-shape-gold"/><ellipse cx="495" cy="220" rx="90" ry="25" className="visual-shape-gold"/><path d="M320 152H405" className="visual-arrow"/><path d="m405 152-12-7v14Z" className="visual-accent-fill"/><text x="362" y="135" textAnchor="middle" className="visual-small">joined face is hidden</text>
      </>;
    case 'statistics':
      return <>
        <path d="M70 245H570" className="visual-line"/>
        {[[120,4],[170,5],[220,6],[270,7],[320,8]].flatMap(([x,n])=>Array.from({length:n-3},(_,i)=><circle key={`${x}-${i}`} cx={x} cy={225-i*25} r="7" className="visual-dot"/>))}
        {[[390,4],[435,4],[480,4],[525,4]].flatMap(([x,n])=>Array.from({length:n-2},(_,i)=><circle key={`${x}-${i}`} cx={x} cy={225-i*25} r="7" className="visual-dot-gold"/>))}
        <path d="M280 70V245M458 70V245" className="visual-guide"/><text x="280" y="55" textAnchor="middle" className="visual-small">centre</text><text x="458" y="55" textAnchor="middle" className="visual-small">same centre, different spread</text>
      </>;
    case 'probability':
      return <>
        <circle cx="230" cy="160" r="92" className="visual-set-a"/><circle cx="370" cy="160" r="92" className="visual-set-b"/><path d="M300 91c-28 17-46 42-46 69s18 52 46 69c28-17 46-42 46-69s-18-52-46-69Z" className="visual-overlap"/>
        <text x="188" y="165" className="visual-label">A</text><text x="402" y="165" className="visual-label">B</text><text x="300" y="165" textAnchor="middle" className="visual-small">both</text><text x="320" y="286" textAnchor="middle" className="visual-label">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</text>
      </>;
    case 'mapping':
      return <>
        <ellipse cx="180" cy="160" rx="78" ry="120" className="visual-set-a"/><ellipse cx="460" cy="160" rx="78" ry="120" className="visual-set-b"/>
        {[95,145,195,245].map((y,i)=><circle key={`a${y}`} cx="180" cy={y} r="7" className="visual-dot"/>)}{[105,160,215].map(y=><circle key={`b${y}`} cx="460" cy={y} r="7" className="visual-dot-gold"/>)}
        <path d="M190 95 448 105M190 145 448 160M190 195 448 215M190 245 448 215" className="visual-arrow"/>{[[448,105],[448,160],[448,215]].map(([x,y])=><path key={y} d={`m${x} ${y}-12-7v14Z`} className="visual-accent-fill"/>)}
        <text x="180" y="35" textAnchor="middle" className="visual-small">domain</text><text x="460" y="35" textAnchor="middle" className="visual-small">codomain</text>
      </>;
    case 'unit-circle':
      return <>
        {axis}<circle cx="320" cy="160" r="105" className="visual-circle"/><path d="M320 160 405 98M405 98V160M320 160H405" className="visual-line"/><circle cx="405" cy="98" r="7" className="visual-dot-gold"/><path d="M365 160A45 45 0 0 0 356 134" className="visual-accent"/><text x="370" y="150" className="visual-label">θ</text><text x="415" y="92" className="visual-small">(cos θ, sin θ)</text>
      </>;
    case 'complex-plane':
      return <>
        {axis}<path d="M320 160 455 80" className="visual-accent"/><circle cx="455" cy="80" r="8" className="visual-dot-gold"/><path d="M455 80V160M320 160H455" className="visual-guide"/><path d="M375 160A55 55 0 0 0 367 132" className="visual-gold"/><text x="380" y="147" className="visual-label">arg z</text><text x="462" y="75" className="visual-label">z = a + bi</text>
      </>;
    case 'inequality':
    case 'linear-programming':
      return <>
        {axis}<path d="M118 260 500 72" className="visual-curve"/><path d="M118 260 500 72 500 260Z" className="visual-feasible"/><path d="M205 58V260" className="visual-gold"/><circle cx="205" cy="217" r="7" className="visual-dot-gold"/><circle cx="500" cy="72" r="7" className="visual-dot-gold"/><circle cx="500" cy="260" r="7" className="visual-dot-gold"/><text x="370" y="210" className="visual-label">feasible region</text>
      </>;
    case 'counting':
      return <>
        <circle cx="100" cy="160" r="22" className="visual-node"/><text x="100" y="166" textAnchor="middle" className="visual-node-text">start</text>
        {[80,160,240].map((y,i)=><g key={y}><path d={`M122 160 245 ${y}`} className="visual-tree-lines"/><circle cx="260" cy={y} r="18" className="visual-node"/><text x="260" y={y+6} textAnchor="middle" className="visual-node-text">{String.fromCharCode(65+i)}</text>{[y-25,y+25].map((yy,j)=><g key={yy}><path d={`M278 ${y} 430 ${yy}`} className="visual-tree-lines"/><circle cx="445" cy={yy} r="16" className="visual-node-gold"/><text x="445" y={yy+5} textAnchor="middle" className="visual-node-text">{j+1}</text></g>)}</g>)}
        <text x="510" y="164" className="visual-label">3 × 2 = 6</text>
      </>;
    case 'pascal':
      return <>
        {[[[320,55,'1']],[[280,100,'1'],[360,100,'1']],[[240,145,'1'],[320,145,'2'],[400,145,'1']],[[200,190,'1'],[280,190,'3'],[360,190,'3'],[440,190,'1']],[[160,235,'1'],[240,235,'4'],[320,235,'6'],[400,235,'4'],[480,235,'1']]].flat().map(([x,y,t],i)=><g key={i}><circle cx={Number(x)} cy={Number(y)} r="20" className={String(t)==='1'?'visual-node':'visual-node-gold'}/><text x={Number(x)} y={Number(y)+6} textAnchor="middle" className="visual-node-text">{t}</text></g>)}
        <text x="320" y="290" textAnchor="middle" className="visual-small">each interior entry = two entries above</text>
      </>;
    case 'conics':
      return <>
        <ellipse cx="150" cy="160" rx="85" ry="55" className="visual-curve"/><circle cx="120" cy="160" r="5" className="visual-dot-gold"/><circle cx="180" cy="160" r="5" className="visual-dot-gold"/>
        <path d="M300 65Q430 160 300 255" className="visual-curve"/><path d="M275 60V260" className="visual-guide"/><circle cx="325" cy="160" r="5" className="visual-dot-gold"/>
        <path d="M500 60Q405 160 500 260M545 60Q640 160 545 260" className="visual-gold"/>
        <text x="150" y="245" textAnchor="middle" className="visual-small">ellipse</text><text x="335" y="280" textAnchor="middle" className="visual-small">parabola</text><text x="520" y="300" textAnchor="middle" className="visual-small">hyperbola</text>
      </>;
    case 'three-d':
      return <>
        <path d="M300 175H555M300 175 115 265M300 175V35" className="visual-line"/><path d="m555 175-12-7v14ZM115 265l14-1-6-12ZM300 35l-7 12h14Z" className="visual-axis-fill"/>
        <path d="M300 175 430 105M430 105V175M300 175H430" className="visual-guide"/><circle cx="430" cy="105" r="8" className="visual-dot-gold"/><text x="560" y="180" className="visual-label">x</text><text x="105" y="280" className="visual-label">y</text><text x="310" y="40" className="visual-label">z</text><text x="443" y="100" className="visual-small">P(x,y,z)</text>
      </>;
    case 'derivative':
      return <>
        {axis}<path d="M95 245C190 250 215 85 325 105s120 140 235 65" className="visual-curve"/><path d="M160 225 470 55" className="visual-accent"/><circle cx="300" cy="104" r="7" className="visual-dot-gold"/><circle cx="430" cy="107" r="6" className="visual-dot"/><text x="405" y="48" className="visual-label">tangent slope</text><path d="M300 104 430 107" className="visual-guide"/>
      </>;
    case 'matrix':
      return <>
        <path d="M175 65h-22v190h22M465 65h22v190h-22" className="visual-line"/>
        {[0,1].map(r=>[0,1,2].map(c=><g key={`${r}-${c}`}><rect x={195+c*85} y={82+r*85} width="62" height="62" rx="8" className={(r+c)%2?'visual-card-gold':'visual-card'}/><text x={226+c*85} y={121+r*85} textAnchor="middle" className="visual-number">{r*3+c+1}</text></g>))}
        <text x="320" y="292" textAnchor="middle" className="visual-small">2 rows × 3 columns</text>
      </>;
    case 'determinant':
      return <>
        <path d="M140 240 260 75 500 75 380 240Z" className="visual-feasible"/><path d="M140 240 260 75M140 240 380 240M260 75 500 75M380 240 500 75" className="visual-line"/><path d="M140 240 500 75" className="visual-guide"/>
        <text x="320" y="160" textAnchor="middle" className="visual-number">|ad − bc|</text><text x="320" y="287" textAnchor="middle" className="visual-small">signed area scale</text>
      </>;
    case 'continuity':
      return <>
        <path d="M65 245C130 210 175 95 255 110S350 235 420 170" className="visual-curve"/><circle cx="285" cy="130" r="10" className="visual-hole"/><circle cx="285" cy="205" r="8" className="visual-dot-gold"/><path d="M440 218C485 178 520 115 575 85" className="visual-gold"/>
        <text x="135" y="270" className="visual-small">continuous</text><text x="260" y="75" className="visual-small">hole: limit exists</text><text x="450" y="260" className="visual-small">jump</text>
      </>;
    case 'calculus-area':
    case 'between-curves':
      return <>
        {axis}<path d="M100 220C180 245 220 80 330 100S455 220 540 75" className="visual-curve"/>
        {Array.from({length:12},(_,i)=><rect key={i} x={145+i*27} y={118+Math.abs(i-6)*7} width="23" height={42-Math.abs(i-6)*2} className="visual-strip"/>)}
        <path d="M145 160H465" className="visual-gold"/><text x="315" y="285" textAnchor="middle" className="visual-label">∫ f(x) dx accumulates thin strips</text>
      </>;
    case 'slope-field':
      return <>
        {axis}{Array.from({length:9},(_,i)=>Array.from({length:5},(_,j)=>{const x=100+i*55,y=70+j*45,s=(j-2)*5+(i-4)*2;return <path key={`${i}-${j}`} d={`M${x-10} ${y-s} ${x+10} ${y+s}`} className="visual-field"/>}))}
        <path d="M90 250C165 245 205 210 260 160s135-55 210-80" className="visual-accent"/><text x="430" y="55" className="visual-small">solution follows local slopes</text>
      </>;
    case 'vector':
      return <>
        <path d="M120 240 335 110M120 240 410 240M335 110 530 110M410 240 530 110" className="visual-line"/>
        <path d="m335 110-14 1 7 12ZM410 240l-12-7v14ZM530 110l-14 1 7 12Z" className="visual-accent-fill"/>
        <text x="205" y="160" className="visual-label">a</text><text x="260" y="265" className="visual-label">b</text><text x="355" y="150" className="visual-label">a + b</text>
      </>;
  }
}

export default function NotesVisual({ notes }: { notes: ChapterNotes }) {
  const kind = getNotesVisualKind(notes);
  const meta = visualMeta[kind];
  return (
    <figure className="study-visual">
      <div className="study-visual-heading"><span>See the idea</span><h3>{meta.title}</h3></div>
      <svg viewBox="0 0 640 320" role="img" aria-label={`${meta.caption} This diagram supports ${notes.chapter}.`}>
        <title>{meta.caption}</title>
        <Diagram kind={kind} />
      </svg>
      <figcaption>{meta.caption}</figcaption>
    </figure>
  );
}
