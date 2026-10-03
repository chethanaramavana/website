import type { ChapterNotes } from './chapter-notes';

export const grade11Notes: ChapterNotes[] = [
  {
    "slug": "g11-sets",
    "chapter": "Sets",
    "number": 1,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Representing and combining collections precisely",
    "concepts": [
      {
        "title": "Representing sets",
        "text": "A set is a well-defined collection; roster and set-builder forms describe the same collection in different ways."
      },
      {
        "title": "Subsets and power sets",
        "text": "A subset contains no element outside the parent set; an n-element set has 2ⁿ subsets."
      },
      {
        "title": "Set operations",
        "text": "Union collects elements from either set, while intersection keeps only common elements."
      },
      {
        "title": "Complements and Venn regions",
        "text": "Complement is always relative to a chosen universal set; Venn regions help track difference and complement."
      }
    ],
    "formulas": [
      "n(P(A)) = 2ⁿ when n(A) = n",
      "n(A ∪ B) = n(A) + n(B) − n(A ∩ B)",
      "A − B = A ∩ B′",
      "(A ∪ B)′ = A′ ∩ B′",
      "(A ∩ B)′ = A′ ∪ B′",
      "A ∪ A′ = U and A ∩ A′ = ∅",
      "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)"
    ],
    "method": [
      "Identify the universal set and rewrite all sets in one clear form.",
      "Mark intersection regions before only-one regions in a Venn diagram.",
      "Translate difference into intersection with a complement when simplifying.",
      "Check that all disjoint region counts add to the required union or universal total."
    ],
    "example": {
      "question": "If n(U)=40, n(A)=24, n(B)=19 and n(A∩B)=8, find n(A′∩B′).",
      "steps": [
        "Use inclusion–exclusion: n(A∪B)=24+19−8=35.",
        "By De Morgan’s law, A′∩B′=(A∪B)′.",
        "Subtract the union from the universal set: 40−35=5."
      ],
      "answer": "n(A′∩B′)=5."
    },
    "practice": [
      {
        "question": "Write {x∈R: 1≤x<5} as an interval.",
        "answer": "[1,5)",
        "marks": 1
      },
      {
        "question": "How many subsets has a five-element set?",
        "answer": "2⁵=32",
        "marks": 1
      },
      {
        "question": "If A={1,3,5} and B={3,4,5}, find A−B.",
        "answer": "{1}",
        "marks": 1
      },
      {
        "question": "Simplify (A′∪B′)′.",
        "answer": "A∩B",
        "marks": 2
      },
      {
        "question": "If n(A)=18, n(B)=16 and n(A∪B)=27, find n(A∩B).",
        "answer": "18+16−27=7",
        "marks": 2
      },
      {
        "question": "For U={1,…,12}, A=multiples of 2 and B=multiples of 4, find A∩B and state the subset relation.",
        "answer": "A∩B={4,8,12}=B, so B⊆A.",
        "marks": 3
      }
    ],
    "tips": [
      "Do not write repeated elements in a set.",
      "Distinguish ∅ from {∅}; the second set has one element.",
      "An endpoint uses a round bracket when excluded and a square bracket when included.",
      "Fill the deepest Venn intersection first to avoid double counting."
    ]
  },
  {
    "slug": "g11-relations-functions",
    "chapter": "Relations and Functions",
    "number": 2,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "From ordered pairs to real-valued functions",
    "concepts": [
      {
        "title": "Cartesian products",
        "text": "An ordered pair depends on order: (a,b)=(c,d) only when a=c and b=d."
      },
      {
        "title": "Relations",
        "text": "A relation from A to B is any subset of A×B; its domain contains first components and its range contains attained second components."
      },
      {
        "title": "Functions",
        "text": "A function gives exactly one image to every element of its domain; different inputs may still share an image."
      },
      {
        "title": "Graphs and operations",
        "text": "Standard real functions are recognised by their domains, ranges and graphs; function algebra uses common-domain restrictions."
      }
    ],
    "formulas": [
      "n(A×B)=n(A)n(B)",
      "Number of relations from A to B = 2^(n(A)n(B))",
      "(f±g)(x)=f(x)±g(x)",
      "(fg)(x)=f(x)g(x)",
      "(f/g)(x)=f(x)/g(x), where g(x)≠0",
      "|x|=x for x≥0 and −x for x<0",
      "sgn(x)=−1,0,1 according as x<0,x=0,x>0"
    ],
    "method": [
      "For a relation, list all first components for the domain and distinct second components for the range.",
      "To test a function, check every domain element has one and only one image.",
      "For a formula-defined function, impose every denominator, square-root and logarithm restriction.",
      "For sums/products/quotients, simplify first and then retain all original domain restrictions."
    ],
    "example": {
      "question": "Find the domain and range of f(x)=√(4−x²).",
      "steps": [
        "For a real square root, require 4−x²≥0.",
        "Solving gives −2≤x≤2, which is the domain.",
        "The square root ranges from 0 at x=±2 to 2 at x=0."
      ],
      "answer": "Domain = [−2,2] and range = [0,2]."
    },
    "practice": [
      {
        "question": "If |A|=4 and |B|=3, find |A×B|.",
        "answer": "12",
        "marks": 1
      },
      {
        "question": "Find the domain of {(1,a),(2,b),(1,c)}.",
        "answer": "{1,2}",
        "marks": 1
      },
      {
        "question": "Is {(1,2),(2,2),(3,4)} a function from {1,2,3}?",
        "answer": "Yes; every input has exactly one image.",
        "marks": 1
      },
      {
        "question": "Find the domain of 1/(x²−9).",
        "answer": "R−{−3,3}",
        "marks": 2
      },
      {
        "question": "State the range of |x|+2.",
        "answer": "[2,∞)",
        "marks": 2
      },
      {
        "question": "If f=x² and g=x−1, find f+g and f/g with its domain.",
        "answer": "f+g=x²+x−1; f/g=x²/(x−1), domain R−{1}.",
        "marks": 3
      }
    ],
    "tips": [
      "Do not confuse codomain with range.",
      "A repeated first component with two different second components means the relation is not a function.",
      "For a quotient of functions, explicitly exclude zeros of the denominator.",
      "Greatest integer [x] means the largest integer ≤x, especially for negative x."
    ]
  },
  {
    "slug": "g11-trigonometric-functions",
    "chapter": "Trigonometric Functions",
    "number": 3,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Angles, unit-circle graphs and identities",
    "concepts": [
      {
        "title": "Angle measure",
        "text": "Radians measure an angle by arc length divided by radius; π radians equals 180°."
      },
      {
        "title": "Unit-circle values",
        "text": "On the unit circle, cos x is the x-coordinate and sin x the y-coordinate, which determines signs and ranges."
      },
      {
        "title": "Function behaviour",
        "text": "Sine and cosine are periodic functions; tangent is sin/cos and is undefined when cos x=0."
      },
      {
        "title": "Core identities",
        "text": "Addition formulas generate exact values, double/triple-angle identities and sum-to-product transformations."
      }
    ],
    "formulas": [
      "180°=π radians",
      "sin²x+cos²x=1",
      "sin(x±y)=sinx cosy±cosx siny",
      "cos(x±y)=cosx cosy∓sinx siny",
      "tan(x±y)=(tanx±tany)/(1∓tanx tany)",
      "sin2x=2sinx cosx",
      "cos2x=cos²x−sin²x=1−2sin²x=2cos²x−1",
      "sin3x=3sinx−4sin³x"
    ],
    "method": [
      "Convert all angles to one unit and identify the quadrant.",
      "Choose the nearest standard-angle sum or difference for exact values.",
      "For identities, transform the more complicated side using standard formulas.",
      "Check denominators before cancelling and state where the identity is defined."
    ],
    "example": {
      "question": "Evaluate cos75° exactly.",
      "steps": [
        "Write 75° as 45°+30°.",
        "Use cos(A+B)=cos A cos B−sin A sin B.",
        "Substitute the standard values and simplify."
      ],
      "answer": "cos75°=(√6−√2)/4."
    },
    "practice": [
      {
        "question": "Convert 300° to radians.",
        "answer": "5π/3",
        "marks": 1
      },
      {
        "question": "State the range of 2−3cosx.",
        "answer": "[−1,5]",
        "marks": 1
      },
      {
        "question": "Evaluate sin105°.",
        "answer": "(√6+√2)/4",
        "marks": 2
      },
      {
        "question": "If tanx=3/4, find sin2x.",
        "answer": "24/25",
        "marks": 2
      },
      {
        "question": "Prove sin4x+sin2x=2sin3x cosx.",
        "answer": "Apply sinA+sinB=2sin((A+B)/2)cos((A−B)/2).",
        "marks": 2
      },
      {
        "question": "If sinx=5/13 and cosy=4/5 with x,y acute, find cos(x+y).",
        "answer": "cosx=12/13, siny=3/5; cos(x+y)=48/65−15/65=33/65.",
        "marks": 3
      }
    ],
    "tips": [
      "Track the quadrant before choosing signs of square roots.",
      "Do not mix degrees and radians inside one calculation.",
      "Addition formulas use opposite signs in the cosine formula.",
      "A cancelled factor may be zero, so retain the phrase ‘where defined’ in identity proofs."
    ]
  },
  {
    "slug": "g11-complex-numbers",
    "chapter": "Complex Numbers and Quadratic Equations",
    "number": 4,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Algebra and geometry of numbers a+ib",
    "concepts": [
      {
        "title": "The imaginary unit",
        "text": "The number i satisfies i²=−1; every complex number has Cartesian form a+ib."
      },
      {
        "title": "Complex-number algebra",
        "text": "Complex numbers are equal exactly when their real parts and imaginary parts are separately equal."
      },
      {
        "title": "Conjugate and modulus",
        "text": "The conjugate reflects a point in the real axis and helps make a complex denominator real."
      },
      {
        "title": "The Argand plane",
        "text": "The Argand plane represents a+ib by (a,b); modulus is its distance from the origin."
      }
    ],
    "formulas": [
      "i²=−1, i³=−i, i⁴=1 and powers repeat every 4",
      "(a+ib)+(c+id)=(a+c)+i(b+d)",
      "(a+ib)(c+id)=(ac−bd)+i(ad+bc)",
      "z̄=a−ib when z=a+ib",
      "z+z̄=2Re(z)",
      "zz̄=|z|²=a²+b²",
      "1/(a+ib)=(a−ib)/(a²+b²), z≠0",
      "Distance between z₁,z₂ is |z₁−z₂|"
    ],
    "method": [
      "Replace every i² by −1 and collect real and imaginary parts.",
      "Reduce a large power of i using its remainder modulo 4.",
      "For division, multiply top and bottom by the denominator’s conjugate.",
      "For Argand questions, translate a+ib to the coordinate point (a,b)."
    ],
    "example": {
      "question": "Express (2+3i)/(1−2i) as a+ib.",
      "steps": [
        "Multiply the numerator and denominator by the conjugate 1+2i.",
        "The denominator becomes (1−2i)(1+2i)=5.",
        "Expand the numerator: (2+3i)(1+2i)=−4+7i."
      ],
      "answer": "(2+3i)/(1−2i)=−4/5+(7/5)i."
    },
    "practice": [
      {
        "question": "Evaluate i²³.",
        "answer": "−i",
        "marks": 1
      },
      {
        "question": "Find the conjugate of 4−7i.",
        "answer": "4+7i",
        "marks": 1
      },
      {
        "question": "Find |−5+12i|.",
        "answer": "13",
        "marks": 1
      },
      {
        "question": "Simplify (2+i)(1−3i).",
        "answer": "5−5i",
        "marks": 2
      },
      {
        "question": "Express 1/(2+i) as a+ib.",
        "answer": "2/5−(1/5)i",
        "marks": 2
      },
      {
        "question": "Find x,y if (x+2y)+i(2x−y)=8+i.",
        "answer": "x=2,y=3",
        "marks": 3
      }
    ],
    "tips": [
      "Never treat i as a real variable; use i²=−1.",
      "Conjugation changes only the sign of the imaginary part.",
      "Modulus is always non-negative.",
      "Polar form and complex roots of real quadratics are formative-only in the current CBSE syllabus, so they are intentionally omitted here."
    ]
  },
  {
    "slug": "g11-linear-inequalities",
    "chapter": "Linear Inequalities",
    "number": 5,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Solving and representing one-variable constraints",
    "concepts": [
      {
        "title": "Solution sets",
        "text": "An inequality describes a range of values rather than usually a single value."
      },
      {
        "title": "Sign changes",
        "text": "Adding or subtracting the same quantity on both sides preserves order."
      },
      {
        "title": "Interval notation",
        "text": "Multiplying or dividing by a negative number reverses the inequality sign."
      },
      {
        "title": "Number-line checks",
        "text": "A solution set can be written in inequality form, interval notation or on a number line."
      }
    ],
    "formulas": [
      "a<b ⇒ a+c<b+c",
      "a<b and c>0 ⇒ ac<bc",
      "a<b and c<0 ⇒ ac>bc",
      "x<a corresponds to (−∞,a)",
      "x≤a corresponds to (−∞,a]",
      "a<x≤b corresponds to (a,b]",
      "‘and’ means intersection of solution sets"
    ],
    "method": [
      "Remove brackets and clear denominators using a positive common multiple where possible.",
      "Collect variable terms on one side and constants on the other.",
      "Reverse the sign exactly when multiplying or dividing by a negative number.",
      "Check endpoints and write the final intersection in interval or number-line form."
    ],
    "example": {
      "question": "Solve −3≤(2x+1)/5<2.",
      "steps": [
        "Multiply by 5: −15≤2x+1<10.",
        "Subtract 1: −16≤2x<9.",
        "Divide by 2: −8≤x<9/2."
      ],
      "answer": "The solution interval is [−8,9/2)."
    },
    "practice": [
      {
        "question": "Solve x+4>9.",
        "answer": "x>5",
        "marks": 1
      },
      {
        "question": "Solve −3x≤12.",
        "answer": "x≥−4",
        "marks": 1
      },
      {
        "question": "Write x≥2 in interval notation.",
        "answer": "[2,∞)",
        "marks": 1
      },
      {
        "question": "Solve 2≤x+5<8.",
        "answer": "−3≤x<3",
        "marks": 2
      },
      {
        "question": "Solve (x−1)/2≤(x+5)/3.",
        "answer": "3x−3≤2x+10, so x≤13.",
        "marks": 2
      },
      {
        "question": "Find the integral solutions of −1<(3x−2)/4≤4.",
        "answer": "−4<3x−2≤16 ⇒ −2/3<x≤6, so x=0,1,2,3,4,5,6.",
        "marks": 3
      }
    ],
    "tips": [
      "Circle the step where the sign reverses.",
      "Infinity always uses a round bracket.",
      "For simultaneous inequalities, intersect rather than unite the solution intervals.",
      "Test one interior value and each included endpoint to catch sign errors."
    ]
  },
  {
    "slug": "g11-permutations-combinations",
    "chapter": "Permutations and Combinations",
    "number": 6,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Counting Principles, Arrangements & Selections",
    "concepts": [
      {
        "title": "Fundamental principle of counting",
        "text": "If one stage can be completed in m ways and a following stage in n ways, the two-stage task can be completed in mn ways."
      },
      {
        "title": "Permutations",
        "text": "Use a permutation when order or position matters, such as arranging people or assigning distinct offices."
      },
      {
        "title": "Combinations",
        "text": "Use a combination when only the selected group matters and different orders of the same group are identical."
      },
      {
        "title": "Repeated objects and restrictions",
        "text": "Divide by factorials of repeated counts, and handle restrictions by blocks, complementary counting or separate cases."
      }
    ],
    "formulas": [
      "n! = n(n − 1)(n − 2)…2·1; 0! = 1",
      "ⁿPᵣ = n!/(n − r)!",
      "ⁿCᵣ = n!/[r!(n − r)!]",
      "ⁿPᵣ = r! · ⁿCᵣ",
      "ⁿCᵣ = ⁿCₙ₋ᵣ",
      "Arrangements of n objects with repetitions p, q, … = n!/(p!q!…)",
      "Selections of r non-adjacent objects from n in a row = ⁿ⁻ʳ⁺¹Cᵣ"
    ],
    "method": [
      "Describe one complete outcome and identify its successive choices.",
      "Ask whether order matters: use permutations if it does and combinations if it does not.",
      "Apply restrictions by fixing positions, forming a block, splitting into cases or counting the complement.",
      "Check that cases do not overlap and that a leading zero has not been counted as a digit."
    ],
    "example": {
      "question": "How many four-digit numbers can be formed from 0, 1, 2, 3, 4 without repetition?",
      "steps": [
        "The first digit cannot be 0, so it has 4 choices.",
        "After choosing the first digit, the remaining places have 4, 3 and 2 choices.",
        "Multiply the independent choices."
      ],
      "answer": "4 × 4 × 3 × 2 = 96 numbers."
    },
    "practice": [
      {
        "question": "Evaluate ⁸P₃.",
        "answer": "8 × 7 × 6 = 336",
        "marks": 2
      },
      {
        "question": "Evaluate ¹⁰C₄.",
        "answer": "210",
        "marks": 2
      },
      {
        "question": "How many distinct arrangements does the word SCHOOL have?",
        "answer": "6!/2! = 360",
        "marks": 2
      },
      {
        "question": "How many committees of 3 can be chosen from 8 people?",
        "answer": "⁸C₃ = 56",
        "marks": 2
      },
      {
        "question": "How many arrangements of 5 people in a row place A and B together?",
        "answer": "2 × 4! = 48",
        "marks": 3
      },
      {
        "question": "How many five-digit numbers can be formed from 0 to 6 without repetition?",
        "answer": "6 × 6 × 5 × 4 × 3 = 2160",
        "marks": 3
      }
    ],
    "tips": [
      "Distinct jobs make order matter even when the same people are being selected.",
      "For repeated letters, divide by the factorial of each repetition count.",
      "Split a divisibility or leading-zero restriction into disjoint cases.",
      "Test a formula on a small example before trusting the count."
    ]
  },
  {
    "slug": "g11-binomial-theorem",
    "chapter": "Binomial Theorem",
    "number": 7,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Positive Integral Powers & Pascal's Triangle",
    "concepts": [
      {
        "title": "Binomial expansion",
        "text": "For a positive integer n, (a + b)ⁿ expands into n + 1 terms with powers of a decreasing and powers of b increasing."
      },
      {
        "title": "Pascal's triangle",
        "text": "Each row supplies the coefficients of a binomial power, and each interior entry is the sum of the two entries above it."
      },
      {
        "title": "Signs in (a − b)ⁿ",
        "text": "Treat subtraction as addition of −b; the signs then alternate."
      },
      {
        "title": "Simple applications",
        "text": "Substitute convenient values to find sums of coefficients, evaluate nearby powers or establish divisibility."
      }
    ],
    "formulas": [
      "(a + b)² = a² + 2ab + b²",
      "(a + b)³ = a³ + 3a²b + 3ab² + b³",
      "(a − b)³ = a³ − 3a²b + 3ab² − b³",
      "(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴",
      "Pascal identity: ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ",
      "Sum of coefficients: substitute every variable by 1",
      "Alternating sum of coefficients in P(x): evaluate P(−1)"
    ],
    "method": [
      "Write the correct Pascal row for the given positive integral power.",
      "Keep the powers of the first quantity descending and of the second quantity ascending.",
      "Include the sign of each power when the binomial contains subtraction.",
      "Check the first term, last term and coefficient sum."
    ],
    "example": {
      "question": "Expand (2x − 1)⁴.",
      "steps": [
        "Use Pascal coefficients 1, 4, 6, 4, 1.",
        "Apply them to powers of 2x and −1 in complementary order.",
        "Simplify each term and retain alternating signs."
      ],
      "answer": "16x⁴ − 32x³ + 24x² − 8x + 1."
    },
    "practice": [
      {
        "question": "Expand (x + 2)³.",
        "answer": "x³ + 6x² + 12x + 8",
        "marks": 2
      },
      {
        "question": "Expand (2a − b)⁴.",
        "answer": "16a⁴ − 32a³b + 24a²b² − 8ab³ + b⁴",
        "marks": 3
      },
      {
        "question": "Find the sum of the coefficients of (3x − 2)⁵.",
        "answer": "1",
        "marks": 2
      },
      {
        "question": "Use the theorem to evaluate 99³.",
        "answer": "970299",
        "marks": 3
      },
      {
        "question": "Simplify (x + 2)⁴ + (x − 2)⁴.",
        "answer": "2x⁴ + 48x² + 32",
        "marks": 3
      },
      {
        "question": "Show that 5ⁿ − 4n − 1 is divisible by 16 for positive integer n.",
        "answer": "Expand (1 + 4)ⁿ; every term after 1 + 4n has a factor 16.",
        "marks": 4
      }
    ],
    "tips": [
      "The row for power n contains n + 1 coefficients.",
      "Write −b in brackets before raising it to successive powers.",
      "Use x = 1 for a coefficient sum and x = −1 for an alternating sum.",
      "General-term and middle-term questions are formative-only in the current CBSE syllabus and are intentionally omitted here."
    ]
  },
  {
    "slug": "g11-sequences-series",
    "chapter": "Sequences and Series",
    "number": 8,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Geometric Progressions, Means & Infinite Sums",
    "concepts": [
      {
        "title": "Sequence and series",
        "text": "A sequence is an ordered list of terms; a series is the indicated sum of terms of a sequence."
      },
      {
        "title": "Geometric progression",
        "text": "A GP has a constant non-zero ratio between each term and its preceding term."
      },
      {
        "title": "Finite and infinite sums",
        "text": "Use the finite-sum formula for a stated number of terms. An infinite GP has a sum only when |r| < 1."
      },
      {
        "title": "Arithmetic and geometric means",
        "text": "For positive numbers, AM is at least GM; equality occurs exactly when the numbers are equal."
      }
    ],
    "formulas": [
      "GP nth term: aₙ = arⁿ⁻¹",
      "Finite GP: Sₙ = a(rⁿ − 1)/(r − 1), r ≠ 1",
      "Equivalent form: Sₙ = a(1 − rⁿ)/(1 − r), r ≠ 1",
      "Infinite GP: S∞ = a/(1 − r), |r| < 1",
      "AM of a and b = (a + b)/2",
      "GM of positive a and b = √ab",
      "For a, b > 0: AM ≥ GM"
    ],
    "method": [
      "Check whether successive non-zero terms have the same ratio.",
      "Identify a, r and either n or the final term.",
      "Choose the nth-term, finite-sum or infinite-sum formula as required.",
      "Check |r| < 1 before using a sum to infinity."
    ],
    "example": {
      "question": "Find the sum of the first six terms of 2, 6, 18, ….",
      "steps": [
        "The first term is 2 and the common ratio is 3.",
        "Use Sₙ = a(rⁿ − 1)/(r − 1) with n = 6.",
        "Simplify 2(3⁶ − 1)/(3 − 1)."
      ],
      "answer": "S₆ = 728."
    },
    "practice": [
      {
        "question": "Find the eighth term of 3, 6, 12, ….",
        "answer": "384",
        "marks": 2
      },
      {
        "question": "Find the sum of the first six terms of 1, 2, 4, ….",
        "answer": "63",
        "marks": 2
      },
      {
        "question": "Find the sum to infinity of 9 + 3 + 1 + ….",
        "answer": "27/2",
        "marks": 2
      },
      {
        "question": "Insert three geometric means between 1 and 16.",
        "answer": "2, 4, 8",
        "marks": 3
      },
      {
        "question": "If AM = 10 and GM = 8 for two positive numbers, find them.",
        "answer": "4 and 16",
        "marks": 3
      },
      {
        "question": "Express 0.363636… as a fraction using an infinite GP.",
        "answer": "4/11",
        "marks": 3
      }
    ],
    "tips": [
      "Do not use the infinite-sum formula unless |r| < 1.",
      "For inserted geometric means, include both endpoints when counting ratio intervals.",
      "In rebound problems, the first drop occurs once but each rebound height usually occurs twice.",
      "The special sums Σk, Σk² and Σk³ are formative-only in the current CBSE syllabus and are intentionally omitted here."
    ]
  },
  {
    "slug": "g11-straight-lines",
    "chapter": "Straight Lines",
    "number": 9,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Slope, Standard Forms, Angles & Distance",
    "concepts": [
      {
        "title": "Slope and inclination",
        "text": "For a non-vertical line, slope is the change in y divided by the change in x and equals tan θ, where θ is its inclination."
      },
      {
        "title": "Parallel and perpendicular lines",
        "text": "Parallel non-vertical lines have equal slopes; perpendicular non-vertical lines have slope product −1."
      },
      {
        "title": "Choosing an equation form",
        "text": "Use point–slope, two-point, slope–intercept or intercept form according to the information given."
      },
      {
        "title": "Distance from a line",
        "text": "Perpendicular distance measures the shortest distance from a point to a line and is always non-negative."
      }
    ],
    "formulas": [
      "Slope through (x₁, y₁), (x₂, y₂): m = (y₂ − y₁)/(x₂ − x₁)",
      "Inclination: m = tan θ",
      "Angle between slopes: tan θ = |(m₂ − m₁)/(1 + m₁m₂)|",
      "Point–slope form: y − y₁ = m(x − x₁)",
      "Two-point form: (y − y₁)/(y₂ − y₁) = (x − x₁)/(x₂ − x₁)",
      "Slope–intercept form: y = mx + c",
      "Intercept form: x/a + y/b = 1",
      "Distance from (x₁, y₁) to Ax + By + C = 0: |Ax₁ + By₁ + C|/√(A² + B²)"
    ],
    "method": [
      "Extract two points, a point and slope, or the two intercepts from the question.",
      "Calculate the slope and use any parallel or perpendicular condition.",
      "Choose the standard equation form that needs the least algebra.",
      "Substitute the given point and verify any requested angle, intercept or distance."
    ],
    "example": {
      "question": "Find the line through (2, 1) perpendicular to y = 3x − 4.",
      "steps": [
        "The given slope is 3.",
        "A perpendicular line has slope −1/3.",
        "Use point–slope form through (2, 1)."
      ],
      "answer": "y − 1 = −(1/3)(x − 2)."
    },
    "practice": [
      {
        "question": "Find the slope through (−1, 2) and (3, 10).",
        "answer": "2",
        "marks": 2
      },
      {
        "question": "Find the line through (4, −2) with slope 3/2.",
        "answer": "y + 2 = (3/2)(x − 4)",
        "marks": 2
      },
      {
        "question": "Find the line with intercepts 5 and −3.",
        "answer": "x/5 − y/3 = 1",
        "marks": 2
      },
      {
        "question": "Find the acute angle between slopes 0 and 1.",
        "answer": "45°",
        "marks": 2
      },
      {
        "question": "Find the distance of (3, 1) from 4x − 3y + 6 = 0.",
        "answer": "3",
        "marks": 3
      },
      {
        "question": "Find the distance between y = x + 1 and y = x − 5.",
        "answer": "3√2",
        "marks": 3
      }
    ],
    "tips": [
      "A vertical line has undefined slope; a horizontal line has slope 0.",
      "Use the acute-angle absolute value unless an oriented angle is requested.",
      "Clear fractions carefully before applying the point-to-line distance formula.",
      "Normal form and the general equation as standalone topics are formative-only in the current syllabus and are not tested here."
    ]
  },
  {
    "slug": "g11-conic-sections",
    "chapter": "Conic Sections",
    "number": 10,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Circle, Parabola, Ellipse & Hyperbola",
    "concepts": [
      {
        "title": "Conic sections",
        "text": "A circle, ellipse, parabola or hyperbola arises when a plane cuts a double cone at different inclinations; certain cuts give degenerate conics."
      },
      {
        "title": "Parabola",
        "text": "A parabola is the locus of a point equidistant from a fixed focus and a fixed directrix."
      },
      {
        "title": "Ellipse",
        "text": "For an ellipse, the sum of distances from the two foci is constant and its eccentricity is less than 1."
      },
      {
        "title": "Hyperbola",
        "text": "For a hyperbola, the absolute difference of distances from the two foci is constant and its eccentricity is greater than 1."
      }
    ],
    "formulas": [
      "Circle centred at origin: x² + y² = r²",
      "Parabolas: y² = ±4ax and x² = ±4ay",
      "Ellipse: x²/a² + y²/b² = 1, a > b; c² = a² − b²; e = c/a",
      "Hyperbola: x²/a² − y²/b² = 1; c² = a² + b²; e = c/a",
      "Parabola latus-rectum length = 4a",
      "Ellipse or hyperbola latus-rectum length = 2b²/a",
      "Ellipse directrices x = ±a/e for a horizontal major axis",
      "Hyperbola directrices x = ±a/e for a horizontal transverse axis"
    ],
    "method": [
      "Identify the conic from the signs, squared variables and denominators.",
      "Read a² and b² from the standard equation and note the direction of the major or transverse axis.",
      "Use c² = a² − b² for an ellipse and c² = a² + b² for a hyperbola.",
      "State requested vertices, foci, directrices or latus rectum and substitute back to verify."
    ],
    "example": {
      "question": "Find the foci and eccentricity of x²/25 + y²/16 = 1.",
      "steps": [
        "The larger denominator is 25, so a = 5 and b = 4.",
        "For an ellipse, c² = a² − b² = 9, so c = 3.",
        "The foci lie on the x-axis and e = c/a."
      ],
      "answer": "Foci (±3, 0); eccentricity 3/5."
    },
    "practice": [
      {
        "question": "Find the focus and directrix of y² = 20x.",
        "answer": "Focus (5, 0); directrix x = −5",
        "marks": 2
      },
      {
        "question": "Find the equation of the circle centred at the origin with radius 7.",
        "answer": "x² + y² = 49",
        "marks": 2
      },
      {
        "question": "Find the foci of x²/16 + y²/7 = 1.",
        "answer": "(±3, 0)",
        "marks": 2
      },
      {
        "question": "Find the vertices and eccentricity of x²/9 − y²/16 = 1.",
        "answer": "Vertices (±3, 0); eccentricity 5/3",
        "marks": 3
      },
      {
        "question": "Find the latus-rectum length of x²/25 + y²/9 = 1.",
        "answer": "18/5",
        "marks": 3
      },
      {
        "question": "An ellipse has a = 10 and e = 3/5. Find its standard equation with major axis along the x-axis.",
        "answer": "x²/100 + y²/64 = 1",
        "marks": 4
      }
    ],
    "tips": [
      "The larger denominator in an ellipse lies under the major-axis variable.",
      "Use subtraction for ellipse c² and addition for hyperbola c².",
      "The sign in a parabola tells its direction: +x right, −x left, +y up, −y down.",
      "Keep semi-axis lengths a and b distinct from the full axis lengths 2a and 2b."
    ]
  },
  {
    "slug": "g11-three-dimensional-geometry",
    "chapter": "Introduction to Three-dimensional Geometry",
    "number": 11,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Coordinate Planes, Octants & Distance",
    "concepts": [
      {
        "title": "Axes and coordinate planes",
        "text": "The x-, y- and z-axes are mutually perpendicular. The xy-, yz- and xz-planes divide space into eight octants."
      },
      {
        "title": "Coordinates and signs",
        "text": "A point P(x, y, z) is located by its directed distances from the yz-, xz- and xy-planes respectively. The signs of x, y and z identify its octant."
      },
      {
        "title": "Zeros reveal location",
        "text": "A zero coordinate places a point on a coordinate plane. Two zero coordinates place it on an axis, and three zero coordinates give the origin."
      },
      {
        "title": "Distance in space",
        "text": "The three-dimensional distance formula is the Pythagorean theorem applied successively in mutually perpendicular directions."
      }
    ],
    "formulas": [
      "If P(x₁, y₁, z₁) and Q(x₂, y₂, z₂), then PQ = √[(x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)²]",
      "OP = √(x² + y² + z²) for P(x, y, z)",
      "Distance of P(x, y, z) from the yz-plane = |x|",
      "Distance of P(x, y, z) from the xz-plane = |y|",
      "Distance of P(x, y, z) from the xy-plane = |z|",
      "Space diagonal of a rectangular box = √(l² + b² + h²)"
    ],
    "method": [
      "Mark which coordinates change between the two points.",
      "Write the three coordinate differences in the same order and square them.",
      "Add the squares, simplify, and take the non-negative square root.",
      "Check whether the result and the signs of coordinates match the geometry described."
    ],
    "example": {
      "question": "Show that A(1, 1, 1), B(4, 1, 1) and C(4, 5, 1) form a right triangle.",
      "steps": [
        "AB = √[(4 − 1)²] = 3.",
        "BC = √[(5 − 1)²] = 4 and AC = √(3² + 4²) = 5.",
        "Since AB² + BC² = AC², the converse of Pythagoras applies."
      ],
      "answer": "ΔABC is right-angled at B."
    },
    "practice": [
      {
        "question": "Name the coordinate plane containing (0, −3, 4).",
        "answer": "The yz-plane",
        "marks": 2
      },
      {
        "question": "Identify the octant containing (2, −1, −3).",
        "answer": "The eighth octant",
        "marks": 2
      },
      {
        "question": "Find the distance between (1, 2, 3) and (4, 6, 3).",
        "answer": "5 units",
        "marks": 2
      },
      {
        "question": "Find the distance of (−4, 2, 5) from each coordinate plane.",
        "answer": "From yz, xz and xy: 4, 2 and 5 units respectively",
        "marks": 3
      },
      {
        "question": "Find the points on the z-axis at distance 5 from (3, 0, 1).",
        "answer": "(0, 0, 5) and (0, 0, −3)",
        "marks": 3
      },
      {
        "question": "Find the space diagonal of a box measuring 6 × 3 × 2 units.",
        "answer": "7 units",
        "marks": 4
      }
    ],
    "tips": [
      "Keep x-, y- and z-differences in the same order.",
      "A distance is never negative.",
      "A point on a coordinate plane has one zero coordinate; a point on an axis has two.",
      "Do not use section formula in this summative test; CBSE lists it as formative-only for 2026–27."
    ]
  },
  {
    "slug": "g11-limits-derivatives",
    "chapter": "Limits and Derivatives",
    "number": 12,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Standard Limits, Slopes & Rates of Change",
    "concepts": [
      {
        "title": "Limit",
        "text": "lim x→a f(x) describes the value approached by f(x) as x comes arbitrarily close to a. Direct substitution works when it does not produce an indeterminate form."
      },
      {
        "title": "Derivative from first principles",
        "text": "The derivative f′(a) is the limiting rate of change lim h→0 [f(a + h) − f(a)]/h, when this finite limit exists."
      },
      {
        "title": "Geometric and physical meaning",
        "text": "The derivative gives the slope of the tangent to y = f(x). For displacement s(t), ds/dt is instantaneous velocity."
      },
      {
        "title": "Rules in summative scope",
        "text": "Use derivatives of polynomial and trigonometric functions with sum, difference, product and quotient rules. Composite-function chain rule is formative-only in the 2026–27 Class XI syllabus."
      }
    ],
    "formulas": [
      "lim x→0 (sin x)/x = 1 and lim x→0 (tan x)/x = 1",
      "lim x→0 (1 − cos x)/x² = 1/2",
      "lim x→0 (eˣ − 1)/x = 1",
      "lim x→0 ln(1 + x)/x = 1",
      "f′(a) = lim h→0 [f(a + h) − f(a)]/h",
      "(u ± v)′ = u′ ± v′ and (uv)′ = u′v + uv′",
      "(u/v)′ = (vu′ − uv′)/v², v ≠ 0",
      "d(xⁿ)/dx = nxⁿ⁻¹; d(sin x)/dx = cos x; d(cos x)/dx = −sin x"
    ],
    "method": [
      "Try direct substitution in a limit; if it gives 0/0, factor, rationalise or use a standard limit.",
      "For first-principles differentiation, expand f(a + h) − f(a), divide by h, then take h→0.",
      "Before differentiating, identify whether the expression is a sum, product or quotient.",
      "Interpret the sign and unit of a derivative when the question describes a rate of change."
    ],
    "example": {
      "question": "Evaluate lim x→0 [√(1 + x) − 1]/x.",
      "steps": [
        "Direct substitution gives 0/0, so rationalise the numerator.",
        "Multiply numerator and denominator by √(1 + x) + 1.",
        "For x ≠ 0 the expression becomes 1/[√(1 + x) + 1]."
      ],
      "answer": "The limit is 1/2."
    },
    "practice": [
      {
        "question": "Evaluate lim x→3 (x² − 9)/(x − 3).",
        "answer": "6",
        "marks": 2
      },
      {
        "question": "Evaluate lim x→0 sin 4x/sin 3x.",
        "answer": "4/3",
        "marks": 2
      },
      {
        "question": "Evaluate lim x→0 ln(1 + 2x)/x.",
        "answer": "2",
        "marks": 2
      },
      {
        "question": "Using first principles, find the derivative of x² at x = 2.",
        "answer": "4",
        "marks": 3
      },
      {
        "question": "Differentiate x² cos x.",
        "answer": "2x cos x − x² sin x",
        "marks": 3
      },
      {
        "question": "For s(t) = t³ − 3t² + 2t, find the velocity at t = 2.",
        "answer": "2 units per unit time",
        "marks": 4
      }
    ],
    "tips": [
      "Angles in standard trigonometric limits are measured in radians.",
      "Do not substitute until an indeterminate expression has been simplified.",
      "The product derivative is not the product of the derivatives.",
      "Avoid chain-rule questions in this summative chapter test because CBSE marks that topic formative-only."
    ]
  },
  {
    "slug": "g11-statistics",
    "chapter": "Statistics",
    "number": 13,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Range, Mean Deviation, Variance & Standard Deviation",
    "concepts": [
      {
        "title": "Dispersion",
        "text": "Measures of dispersion describe how widely data values are spread. Two sets can have the same mean but very different variation."
      },
      {
        "title": "Range and mean deviation",
        "text": "Range uses only the extremes. Mean deviation averages absolute distances from a chosen central value, so positive and negative deviations cannot cancel."
      },
      {
        "title": "Variance and standard deviation",
        "text": "Variance is the mean of squared deviations from the mean. Standard deviation is its non-negative square root and has the same unit as the observations."
      },
      {
        "title": "Grouped data",
        "text": "In a frequency distribution, each value or class mark must be weighted by its frequency. The total number of observations is N = Σf."
      }
    ],
    "formulas": [
      "Range = largest value − smallest value",
      "x̄ = Σx/n for ungrouped data; x̄ = Σfx/Σf for frequency data",
      "Mean deviation about A = Σ|x − A|/n",
      "Grouped mean deviation about A = Σf|x − A|/Σf",
      "Variance σ² = Σ(x − x̄)²/n = Σx²/n − x̄²",
      "Grouped variance σ² = Σf(x − x̄)²/Σf = Σfx²/Σf − x̄²",
      "Standard deviation σ = √(σ²)"
    ],
    "method": [
      "Find n or N = Σf and calculate the mean accurately.",
      "Make columns for deviations, absolute deviations or squared deviations as required.",
      "Multiply by frequencies before adding for grouped data.",
      "Divide by the total frequency, then take a square root only when standard deviation is asked."
    ],
    "example": {
      "question": "For x = 10, 20, 30 with frequencies 2, 3, 5, find the variance.",
      "steps": [
        "N = 10 and x̄ = [2(10) + 3(20) + 5(30)]/10 = 23.",
        "Σfx² = 2(100) + 3(400) + 5(900) = 5900.",
        "Use σ² = Σfx²/N − x̄² = 590 − 529."
      ],
      "answer": "Variance = 61 and standard deviation = √61."
    },
    "practice": [
      {
        "question": "Find the range of 7, 4, 12, 9, 15.",
        "answer": "11",
        "marks": 2
      },
      {
        "question": "Find the mean deviation about the mean of 1, 3, 5, 7.",
        "answer": "2",
        "marks": 2
      },
      {
        "question": "Find the variance of 2, 2, 4, 4.",
        "answer": "1",
        "marks": 2
      },
      {
        "question": "Values 1, 2, 3 have frequencies 1, 2, 1. Find the standard deviation.",
        "answer": "1/√2",
        "marks": 3
      },
      {
        "question": "If Σfx² = 500, N = 10 and x̄ = 6, find the variance.",
        "answer": "14",
        "marks": 3
      },
      {
        "question": "For class intervals 0–10, 10–20, 20–30 with frequencies 2, 4, 2, find σ.",
        "answer": "5√2",
        "marks": 4
      }
    ],
    "tips": [
      "Use class marks for continuous grouped data.",
      "Variance has squared units; standard deviation has the original unit.",
      "Adding a constant changes the mean but not the variance.",
      "Multiplying all values by k multiplies variance by k² and standard deviation by |k|."
    ]
  },
  {
    "slug": "g11-probability",
    "chapter": "Probability",
    "number": 14,
    "grade": 11,
    "book": "NCERT Mathematics",
    "subtitle": "Events, Complements & the Addition Rule",
    "concepts": [
      {
        "title": "Axiomatic probability",
        "text": "Every event A has 0 ≤ P(A) ≤ 1, the certain event has probability 1, and probabilities of mutually exclusive events add."
      },
      {
        "title": "Not, and and or",
        "text": "Not A is the complement A′, A and B is A ∩ B, and A or B is the inclusive union A ∪ B."
      },
      {
        "title": "Mutually exclusive and exhaustive",
        "text": "Mutually exclusive events cannot occur together. Exhaustive events together cover every permitted case; the two ideas should not be confused."
      },
      {
        "title": "Avoiding double-counting",
        "text": "In P(A ∪ B), cases in A ∩ B appear in both P(A) and P(B), so the intersection must be subtracted once."
      }
    ],
    "formulas": [
      "0 ≤ P(A) ≤ 1",
      "P(A′) = 1 − P(A)",
      "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
      "If A and B are mutually exclusive, P(A ∩ B) = 0",
      "P(neither A nor B) = 1 − P(A ∪ B)",
      "P(exactly one of A, B) = P(A) + P(B) − 2P(A ∩ B)"
    ],
    "method": [
      "Translate the words not, and, or, neither and exactly one into set operations.",
      "Write the addition formula before substituting the data.",
      "Subtract the overlap once for a union and twice for exactly one.",
      "Check that the final probability is between 0 and 1 and that complementary answers total 1."
    ],
    "example": {
      "question": "In a group of 40 students, 22 like cricket, 18 like badminton and 10 like both. Find the probability that a randomly selected student likes at least one.",
      "steps": [
        "The union count is 22 + 18 − 10 = 30.",
        "Divide the favourable count by the total 40.",
        "Check that the complement, 10/40, makes the total 1."
      ],
      "answer": "P(at least one) = 30/40 = 3/4."
    },
    "practice": [
      {
        "question": "If P(A) = 0.37, find P(A′).",
        "answer": "0.63",
        "marks": 2
      },
      {
        "question": "Mutually exclusive A and B have probabilities 0.2 and 0.5. Find P(A ∪ B).",
        "answer": "0.7",
        "marks": 2
      },
      {
        "question": "If P(A) = 0.6, P(B) = 0.5 and P(A ∩ B) = 0.25, find P(A ∪ B).",
        "answer": "0.85",
        "marks": 2
      },
      {
        "question": "If P(A ∪ B) = 0.72, find the probability of neither A nor B.",
        "answer": "0.28",
        "marks": 3
      },
      {
        "question": "An integer from 1 to 20 is selected at random. Find the probability that it is divisible by 2 or 5.",
        "answer": "3/5",
        "marks": 3
      },
      {
        "question": "A card is drawn from a standard deck. Find the probability of a queen or a spade.",
        "answer": "4/13",
        "marks": 4
      }
    ],
    "tips": [
      "The word or is inclusive unless the question says exactly one.",
      "Mutually exclusive does not mean exhaustive.",
      "For neither, find the union first and take its complement.",
      "Do not assess construction of sample spaces here; CBSE lists that topic as formative-only for Class XI in 2026–27."
    ]
  }
];
