export type ChapterNotes = {
  slug: string;
  chapter: string;
  number: number;
  subtitle: string;
  concepts: { title: string; text: string }[];
  formulas: string[];
  method: string[];
  example: { question: string; steps: string[]; answer: string };
  practice: { question: string; answer: string; marks: number }[];
  tips: string[];
};

const notes = (value: ChapterNotes) => value;

export const chapterNotesBySlug: Record<string, ChapterNotes> = Object.fromEntries([
  notes({
    slug:'polynomials', chapter:'Polynomials', number:2, subtitle:'Zeroes, Coefficients & Division Algorithm',
    concepts:[
      {title:'Polynomial and degree',text:'A polynomial in x has non-negative integral powers of x. Its degree is the greatest power with a non-zero coefficient.'},
      {title:'Zero of a polynomial',text:'A number α is a zero of p(x) when p(α)=0. Graphically, real zeroes are the x-coordinates where y=p(x) meets the x-axis.'},
      {title:'Factor Theorem',text:'x−a is a factor of p(x) exactly when p(a)=0. The Remainder Theorem says the remainder on division by x−a is p(a).'},
      {title:'Division Algorithm',text:'For polynomials p and g, p(x)=g(x)q(x)+r(x), where r=0 or degree r is less than degree g.'},
    ],
    formulas:['For ax²+bx+c: α+β=−b/a','For ax²+bx+c: αβ=c/a','Polynomial with sum S and product P: x²−Sx+P'],
    method:['Write the polynomial in descending powers.','Factorise or apply the coefficient relations.','Substitute the zeroes back into p(x).','For division, verify dividend = divisor × quotient + remainder.'],
    example:{question:'Find the zeroes of 2x²−7x+3.',steps:['Split −7x as −6x−x.','2x²−6x−x+3=(2x−1)(x−3).','Set each factor equal to zero.'],answer:'The zeroes are 1/2 and 3; sum 7/2 and product 3/2.'},
    practice:[
      {question:'Find the zeroes of x²−9x+20.',answer:'4 and 5',marks:2},{question:'Form a polynomial with zeroes −2 and 7.',answer:'x²−5x−14',marks:2},{question:'Find the remainder when x³−2x²+4 is divided by x−2.',answer:'4',marks:2},{question:'If one zero of x²+kx−12 is 3, find k.',answer:'k=1',marks:2},{question:'Verify the coefficient relations for 3x²−5x−2.',answer:'Zeroes 2 and −1/3',marks:3},{question:'Divide 2x³−3x²−11x+6 by x−3.',answer:'Quotient 2x²+3x−2, remainder 0',marks:4},
    ], tips:['Check signs in −b/a carefully.','A degree n polynomial has at most n real zeroes.','Always verify a proposed factor by substitution.'],
  }),
  notes({
    slug:'linear-equations', chapter:'Pair of Linear Equations in Two Variables', number:3, subtitle:'Consistency, Graphs & Algebraic Solutions',
    concepts:[
      {title:'One solution',text:'Intersecting lines have one common point. Algebraically, a₁/a₂ ≠ b₁/b₂.'},
      {title:'No solution',text:'Parallel distinct lines have no common point: a₁/a₂ = b₁/b₂ ≠ c₁/c₂.'},
      {title:'Infinitely many solutions',text:'Coincident lines represent the same equation: a₁/a₂ = b₁/b₂ = c₁/c₂.'},
      {title:'Word problems',text:'Choose variables, translate each condition into one linear equation, solve, and interpret with units.'},
    ],
    formulas:['Unique: a₁/a₂ ≠ b₁/b₂','No solution: a₁/a₂=b₁/b₂≠c₁/c₂','Infinite: a₁/a₂=b₁/b₂=c₁/c₂'],
    method:['Simplify both equations first.','Use substitution when one variable is isolated.','Use elimination when coefficients are easy to match.','Substitute the solution in both original equations.'],
    example:{question:'Solve 2x+y=7 and x−y=2.',steps:['From x−y=2, y=x−2.','Substitute: 2x+x−2=7.','Thus x=3 and y=1.'],answer:'(x,y)=(3,1).'},
    practice:[
      {question:'Solve x+y=9 and x−y=3.',answer:'x=6,y=3',marks:2},{question:'Check consistency: 2x+4y=6; x+2y=5.',answer:'No solution',marks:2},{question:'Find k for infinitely many solutions: 2x+3y=5; 4x+ky=10.',answer:'k=6',marks:2},{question:'Solve 3x+2y=16; x−y=2.',answer:'x=4,y=2',marks:3},{question:'Two numbers total 42 and differ by 8. Find them.',answer:'25 and 17',marks:3},{question:'Two adult and three child tickets cost ₹310; three adult and two child tickets cost ₹340.',answer:'Adult ₹80, child ₹50',marks:4},
    ], tips:['Use the full coefficients including constants.','Parallel lines have equal slopes.','Reject answers that do not fit the real-life context.'],
  }),
  notes({
    slug:'quadratic-equations', chapter:'Quadratic Equations', number:4, subtitle:'Roots, Discriminant & Applications',
    concepts:[
      {title:'Standard form',text:'A quadratic equation is ax²+bx+c=0 with a≠0. Simplify before deciding whether an equation is quadratic.'},
      {title:'Factorisation',text:'Split the middle term or identify factors whose product is ac and sum is b.'},
      {title:'Quadratic formula',text:'Use the formula when factorisation is not immediate. Simplify the discriminant before taking its square root.'},
      {title:'Nature of roots',text:'D>0 gives distinct real roots, D=0 equal real roots, and D<0 no real roots.'},
    ],
    formulas:['x=(−b±√(b²−4ac))/2a','Discriminant D=b²−4ac','Sum of roots=−b/a; product=c/a'],
    method:['Write in standard form.','Identify a, b and c with signs.','Factorise or compute D and use the formula.','Check roots in the original equation.'],
    example:{question:'Solve 2x²−5x−3=0.',steps:['a=2,b=−5,c=−3; D=25+24=49.','x=(5±7)/4.','Evaluate both signs.'],answer:'x=3 or x=−1/2.'},
    practice:[
      {question:'Solve x²−11x+28=0.',answer:'4,7',marks:2},{question:'Find the nature of 2x²+x+3=0.',answer:'No real roots',marks:2},{question:'Find k for equal roots: x²+kx+25=0.',answer:'k=±10',marks:2},{question:'Solve 3x²−2x−1=0.',answer:'1,−1/3',marks:3},{question:'Two consecutive integers have product 420.',answer:'20 and 21',marks:3},{question:'A rectangle has area 300 m² and length 5 m more than breadth.',answer:'Breadth 15 m, length 20 m',marks:4},
    ], tips:['Do not lose the ± sign.','D concerns real roots, not the degree.','Reject negative lengths and times when context requires.'],
  }),
  notes({
    slug:'arithmetic-progressions', chapter:'Arithmetic Progressions', number:5, subtitle:'Common Difference, nth Term & Sum',
    concepts:[
      {title:'Recognising an AP',text:'An AP has a constant difference between every pair of consecutive terms.'},
      {title:'nth term',text:'Start with a and add the common difference n−1 times to reach the nth term.'},
      {title:'Sum of n terms',text:'Pairing first with last gives n equal averages; use the sum formula.'},
      {title:'Finding missing data',text:'Translate given term or sum conditions into linear equations in a and d.'},
    ],
    formulas:['aₙ=a+(n−1)d','Sₙ=n/2[2a+(n−1)d]','Sₙ=n/2(a+l) when last term l is known'],
    method:['Identify a and d.','Write the correct term or sum equation.','Solve for the unknown.','Check that n is a positive integer.'],
    example:{question:'Find the 20th term and S₂₀ of 5,9,13,…',steps:['a=5,d=4.','a₂₀=5+19×4=81.','S₂₀=10(5+81).'],answer:'20th term=81; sum=860.'},
    practice:[
      {question:'Find the 18th term of 3,8,13,…',answer:'88',marks:2},{question:'Which term of 7,11,15,… is 99?',answer:'24th',marks:2},{question:'Find S₂₅ for 2,5,8,…',answer:'950',marks:2},{question:'Find a and d if a₄=14 and a₉=34.',answer:'a=2,d=4',marks:3},{question:'Find the sum of first 40 natural numbers.',answer:'820',marks:3},{question:'A theatre row begins with 18 seats and increases by 2 for 20 rows.',answer:'Last row 56; total 740',marks:4},
    ], tips:['nth term uses n−1, not n.','A negative d still forms an AP.','A sum equation may produce two valid values of n.'],
  }),
  notes({
    slug:'triangles', chapter:'Triangles', number:6, subtitle:'Similarity & Proportionality',
    concepts:[
      {title:'Similarity',text:'Similar triangles have equal corresponding angles and proportional corresponding sides.'},
      {title:'Criteria',text:'AA/AAA, SAS and SSS establish similarity. Keep the vertex order consistent.'},
      {title:'Basic Proportionality Theorem',text:'A line parallel to one side divides the other two sides in the same ratio.'},
      {title:'Area relation',text:'Areas of similar triangles are proportional to squares of corresponding sides.'},
    ],
    formulas:['If ΔABC~ΔDEF: AB/DE=BC/EF=AC/DF','Area ratio=(corresponding side ratio)²','For altitude to hypotenuse: h²=pq'],
    method:['Mark equal angles.','Write the similarity statement in matching order.','Use corresponding sides only.','Square or square-root the ratio when moving between sides and areas.'],
    example:{question:'Similar triangles have areas 64 cm² and 121 cm². A corresponding side of the first is 16 cm.',steps:['Side ratio=√64:√121=8:11.','16/x=8/11.','Cross multiply.'],answer:'The corresponding second side is 22 cm.'},
    practice:[
      {question:'If side ratio is 3:5, find area ratio.',answer:'9:25',marks:2},{question:'DE∥BC, AD=4, DB=6, AE=5. Find EC.',answer:'7.5',marks:2},{question:'Similar perimeters are 18:30. Find side ratio.',answer:'3:5',marks:2},{question:'Prove two equiangular triangles are similar.',answer:'AA similarity',marks:3},{question:'Area ratio 49:81; first side 14. Find second.',answer:'18',marks:3},{question:'A 1.2 m pole casts 0.8 m shadow; a tree casts 6 m shadow.',answer:'Tree height 9 m',marks:4},
    ], tips:['Corresponding order matters.','Do not use area ratio directly as side ratio.','Draw the parallel line clearly in BPT questions.'],
  }),
  notes({
    slug:'coordinate-geometry', chapter:'Coordinate Geometry', number:7, subtitle:'Distance, Section Formula & Area',
    concepts:[
      {title:'Distance formula',text:'Horizontal and vertical differences form the legs of a right triangle; apply Pythagoras.'},
      {title:'Midpoint',text:'The midpoint is the average of the x-coordinates and the average of the y-coordinates.'},
      {title:'Section formula',text:'For internal ratio m:n, use the opposite weights m on the second point and n on the first.'},
      {title:'Area and collinearity',text:'Use the coordinate area determinant. Three points are collinear exactly when the area is zero.'},
    ],
    formulas:['Distance=√[(x₂−x₁)²+(y₂−y₁)²]','Midpoint=((x₁+x₂)/2,(y₁+y₂)/2)','Section=((mx₂+nx₁)/(m+n),(my₂+ny₁)/(m+n))'],
    method:['Plot a rough diagram.','Substitute coordinates with brackets.','Square negative differences correctly.','State units or square units.'],
    example:{question:'Find the point dividing (2,−3) and (8,9) in ratio 1:2.',steps:['m=1,n=2.','x=(1×8+2×2)/3=4.','y=(1×9+2×−3)/3=1.'],answer:'The point is (4,1).'},
    practice:[
      {question:'Distance between (1,2) and (7,10).',answer:'10 units',marks:2},{question:'Midpoint of (−5,3) and (7,−1).',answer:'(1,1)',marks:2},{question:'Point dividing (0,0),(9,6) in ratio 1:2.',answer:'(3,2)',marks:2},{question:'Show (1,1),(2,3),(3,5) are collinear.',answer:'Area=0',marks:3},{question:'Area of triangle (0,0),(6,0),(2,4).',answer:'12 sq units',marks:3},{question:'Find k if (2,k),(4,5),(6,9) are collinear.',answer:'k=1',marks:4},
    ], tips:['Distance is never negative.','Use absolute value for axis distances.','Collinearity means area zero—not equal pairwise distances.'],
  }),
  notes({
    slug:'introduction-trigonometry', chapter:'Introduction to Trigonometry', number:8, subtitle:'Ratios, Standard Values & Identities',
    concepts:[
      {title:'Six ratios',text:'Relative to an acute angle, identify perpendicular, base and hypotenuse before writing a ratio.'},
      {title:'Reciprocal pairs',text:'sin and cosec, cos and sec, tan and cot are reciprocal pairs.'},
      {title:'Complementary angles',text:'Sine changes to cosine and tangent changes to cotangent for complementary angles.'},
      {title:'Identities',text:'Start from one side and use the three basic identities; do not manipulate both sides together.'},
    ],
    formulas:['sinθ=P/H; cosθ=B/H; tanθ=P/B','sin²θ+cos²θ=1','1+tan²θ=sec²θ; 1+cot²θ=cosec²θ'],
    method:['Draw and label a right triangle.','Find the missing side by Pythagoras.','Write ratios relative to the stated angle.','For identities, convert sec/cosec/cot if useful.'],
    example:{question:'If tan A=3/4, find sin A and cos A.',steps:['Take perpendicular=3 and base=4.','Hypotenuse=5 by Pythagoras.','Use P/H and B/H.'],answer:'sin A=3/5 and cos A=4/5.'},
    practice:[
      {question:'Evaluate sin30°+cos60°.',answer:'1',marks:2},{question:'If cosA=12/13, find sinA.',answer:'5/13',marks:2},{question:'Evaluate tan45°·cot45°.',answer:'1',marks:2},{question:'Prove (1−sin²A)/cos²A=1.',answer:'Use sin²A+cos²A=1',marks:3},{question:'If secA+tanA=2, find secA−tanA.',answer:'1/2',marks:3},{question:'sin(A+B)=1, cos(A−B)=√3/2; A,B acute.',answer:'A=60°,B=30°',marks:4},
    ], tips:['Hypotenuse is opposite the right angle.','Standard values must be exact.','tan90° and sec90° are not defined.'],
  }),
  notes({
    slug:'applications-trigonometry', chapter:'Some Applications of Trigonometry', number:9, subtitle:'Heights, Distances & Line of Sight',
    concepts:[
      {title:'Line of sight',text:'The straight line from the observer’s eye to the object is the line of sight.'},
      {title:'Elevation and depression',text:'Elevation is measured upward from a horizontal; depression is measured downward.'},
      {title:'Parallel horizontals',text:'An angle of depression equals the corresponding angle of elevation by alternate interior angles.'},
      {title:'Model first',text:'Draw a right triangle and include eye height before selecting a trigonometric ratio.'},
    ],
    formulas:['tanθ=vertical height/horizontal distance','sinθ=height/line of sight','cosθ=horizontal distance/line of sight'],
    method:['Draw the horizontal through the observer.','Mark known distance and angle.','Choose the ratio containing the known and required sides.','Add or subtract observer height when necessary.'],
    example:{question:'A point is 20 m from a tower and sees its top at 60°.',steps:['Let height be h.','tan60°=h/20.','h=20√3.'],answer:'Tower height=20√3 m.'},
    practice:[
      {question:'A 10 m shadow is cast at 45°. Find height.',answer:'10 m',marks:2},{question:'A 13 m ladder reaches 12 m high. Find base distance.',answer:'5 m',marks:2},{question:'From 30 m away angle is 30°. Find height.',answer:'10√3 m',marks:2},{question:'A 50 m string is at 60°. Find vertical height.',answer:'25√3 m',marks:3},{question:'From 20 m building, depression to point is 30°. Find distance.',answer:'20√3 m',marks:3},{question:'Angles 60° and 30° from points 20 m apart. Find tower height.',answer:'10√3 m',marks:4},
    ], tips:['Keep the ground horizontal and object vertical.','Do not confuse line-of-sight length with horizontal distance.','Use exact surds unless a decimal is requested.'],
  }),
  notes({
    slug:'circles', chapter:'Circles', number:10, subtitle:'Tangents & Radius Properties',
    concepts:[
      {title:'Tangent',text:'A tangent meets a circle at exactly one point, called the point of contact.'},
      {title:'Radius theorem',text:'The tangent at a point is perpendicular to the radius through that point.'},
      {title:'Equal tangents',text:'Tangent segments from the same external point are equal.'},
      {title:'Counting tangents',text:'Inside: none; on the circle: one; outside: two.'},
    ],
    formulas:['At contact T: OT⊥PT','From external P: PA=PB','Tangent length PT=√(OP²−r²)'],
    method:['Join the centre to each contact point.','Mark the right angles.','Use RHS congruence for equal tangents.','Use angle sum of a quadrilateral when two tangents appear.'],
    example:{question:'OP=13 cm and radius=5 cm. Find tangent PT.',steps:['OT⊥PT, so ΔOPT is right.','PT²=OP²−OT².','PT²=169−25=144.'],answer:'PT=12 cm.'},
    practice:[
      {question:'PA and PB are tangents; PA=9. Find PB.',answer:'9 cm',marks:2},{question:'OP=10,r=6. Find tangent.',answer:'8 cm',marks:2},{question:'Tangents make 70°. Find central angle.',answer:'110°',marks:2},{question:'Prove tangents from one point are equal.',answer:'RHS congruence',marks:3},{question:'A circumscribed quadrilateral has AB=8,BC=6,CD=7. Find AD.',answer:'9',marks:3},{question:'Concentric radii 5 and 13; chord tangent to inner circle.',answer:'24 cm',marks:4},
    ], tips:['The right angle is at the contact point.','A tangent segment length is outside the circle.','Use equal tangent pairs from each vertex.'],
  }),
  notes({
    slug:'areas-circles', chapter:'Areas Related to Circles', number:11, subtitle:'Sectors, Arcs & Segments',
    concepts:[
      {title:'Sector',text:'A sector is enclosed by two radii and the included arc. Its fraction of the circle is θ/360.'},
      {title:'Segment',text:'A segment is enclosed by a chord and its arc. Minor segment area is sector area minus triangle area.'},
      {title:'Perimeter',text:'Include every straight and curved boundary shown; a semicircle perimeter includes its diameter.'},
      {title:'Combined figures',text:'Break the figure into familiar regions, label radii, then add or subtract areas.'},
    ],
    formulas:['Circumference=2πr; area=πr²','Arc length=(θ/360)2πr','Sector area=(θ/360)πr²'],
    method:['Convert diameter to radius.','Identify θ and use the same fraction for arc/sector.','For a segment subtract the central triangle.','Write square units for area.'],
    example:{question:'Find a 120° sector area for r=7 cm.',steps:['Fraction=120/360=1/3.','Area=(1/3)π(7²).','Use π=22/7.'],answer:'154/3 cm².'},
    practice:[
      {question:'Circumference for r=10.5 cm.',answer:'66 cm',marks:2},{question:'90° sector area, r=14 cm.',answer:'154 cm²',marks:2},{question:'60° arc, r=21 cm.',answer:'22 cm',marks:2},{question:'Minor segment, r=14, central angle 90°.',answer:'56 cm²',marks:3},{question:'Wheel r=35 cm, 100 revolutions.',answer:'220 m',marks:3},{question:'Path width 3.5 m around circle r=14 m.',answer:'346.5 m²',marks:4},
    ], tips:['Use π=22/7 when instructed.','Perimeter and area have different units.','A 90° sector is a quadrant, 180° is a semicircle.'],
  }),
  notes({
    slug:'surface-areas-volumes', chapter:'Surface Areas and Volumes', number:12, subtitle:'Combined Solids & Recasting',
    concepts:[
      {title:'Surface area',text:'Count only exposed surfaces. Joined circular faces inside a combined solid are not exposed.'},
      {title:'Volume',text:'Volume measures occupied space; add component volumes for combined solids.'},
      {title:'Recasting',text:'When material is melted and recast, volume is conserved even though surface area changes.'},
      {title:'Capacity',text:'Capacity uses internal dimensions. Convert 1000 cm³ to 1 litre.'},
    ],
    formulas:['Cylinder: CSA=2πrh, V=πr²h','Cone: l=√(r²+h²), CSA=πrl, V=⅓πr²h','Sphere: SA=4πr², V=⁴⁄₃πr³; hemisphere CSA=2πr²'],
    method:['Sketch and split the solid.','Mark common radii and heights.','Decide exposed versus joined faces.','Keep units consistent before converting capacity.'],
    example:{question:'A cone has r=6 cm and h=8 cm.',steps:['l=√(36+64)=10 cm.','CSA=πrl.','Volume=⅓πr²h.'],answer:'l=10 cm, CSA=60π cm², V=96π cm³.'},
    practice:[
      {question:'Cylinder r=7,h=10: find CSA.',answer:'440 cm²',marks:2},{question:'Sphere r=3: find volume.',answer:'36π cm³',marks:2},{question:'Hemisphere r=7: find TSA.',answer:'462 cm²',marks:2},{question:'Cylinder and cone same base/height: volume ratio.',answer:'3:1',marks:3},{question:'Sphere r=6 recast into r=2 spheres.',answer:'27 spheres',marks:3},{question:'Cone on hemisphere r=7, cone h=24: exposed area.',answer:'858 cm²',marks:4},
    ], tips:['Use slant height only for cone surface area.','Do not include hidden joined bases.','Cube the scale factor for volume.'],
  }),
  notes({
    slug:'statistics', chapter:'Statistics', number:13, subtitle:'Mean, Median, Mode & Cumulative Frequency',
    concepts:[
      {title:'Grouped data',text:'Use class marks xᵢ=(upper+lower)/2 to represent intervals when finding the mean.'},
      {title:'Median',text:'Locate the N/2th observation using cumulative frequency, then apply the grouped median formula.'},
      {title:'Mode',text:'The modal class has the highest frequency. Use the two neighbouring frequencies in the formula.'},
      {title:'Empirical relation',text:'For moderately skewed distributions, Mode≈3 Median−2 Mean.'},
    ],
    formulas:['Mean=Σfᵢxᵢ/Σfᵢ','Median=l+[(N/2−cf)/f]h','Mode=l+[(f₁−f₀)/(2f₁−f₀−f₂)]h'],
    method:['Make a clear frequency table.','Compute class marks/cumulative frequencies.','Identify the correct median or modal class.','Substitute l, cf, f and h with labels.'],
    example:{question:'Find mean for x:10,20,30; f:2,3,5.',steps:['Σf=10.','Σfx=20+60+150=230.','Mean=230/10.'],answer:'Mean=23.'},
    practice:[
      {question:'Mean of 4,6,8,10.',answer:'7',marks:2},{question:'Median of 3,7,9,11,14.',answer:'9',marks:2},{question:'Mean=18 for 5 values; four total 70.',answer:'Fifth=20',marks:2},{question:'Use x:5,10,15; f:2,4,2.',answer:'Mean=10',marks:3},{question:'Mean=20, median=22: estimate mode.',answer:'26',marks:3},{question:'Find median: 0–10:5,10–20:9,20–30:12,30–40:4.',answer:'≈20.83',marks:4},
    ], tips:['N means total frequency.','cf is frequency before the median class.','Use class boundaries consistently for continuous data.'],
  }),
  notes({
    slug:'probability', chapter:'Probability', number:14, subtitle:'Equally Likely Outcomes & Complements',
    concepts:[
      {title:'Experiment and outcome',text:'A random experiment has known possible outcomes but an uncertain individual result.'},
      {title:'Theoretical probability',text:'For equally likely outcomes, probability is favourable outcomes divided by total outcomes.'},
      {title:'Complement',text:'The event “not E” contains every outcome outside E, so their probabilities total 1.'},
      {title:'Range',text:'Every probability lies from 0 to 1 inclusive; impossible is 0 and certain is 1.'},
    ],
    formulas:['P(E)=number of favourable outcomes/total outcomes','0≤P(E)≤1','P(not E)=1−P(E)'],
    method:['Write the complete sample space.','Count equally likely total outcomes.','Count favourable outcomes without repetition.','Reduce the fraction and check it lies from 0 to 1.'],
    example:{question:'Two coins are tossed. Find P(at least one head).',steps:['S={HH,HT,TH,TT}.','Favourable={HH,HT,TH}.','P=3/4.'],answer:'3/4.'},
    practice:[
      {question:'Die: P(prime).',answer:'1/2',marks:2},{question:'Deck: P(king).',answer:'1/13',marks:2},{question:'Bag 3 red,2 blue: P(not blue).',answer:'3/5',marks:2},{question:'Two dice: P(sum 7).',answer:'1/6',marks:3},{question:'Choose 1–30: P(multiple of 5).',answer:'1/5',marks:3},{question:'Cards 1–20: P(prime or multiple of 4).',answer:'12/20=3/5',marks:4},
    ], tips:['“At least one” often suits the complement method.','Do not count outcomes twice in unions.','A probability above 1 signals a counting error.'],
  }),
].map((item) => [item.slug, item]));

export function getChapterNotes(slug: string) {
  return chapterNotesBySlug[slug] ?? null;
}
