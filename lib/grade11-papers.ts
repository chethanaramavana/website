import type { PaperDefinition } from './papers';

type ChapterSeed = Omit<PaperDefinition, 'grade' | 'book' | 'paperNumber'> & {
  answerKey: number[];
  solutions: Record<number, string>;
};

const seeds: ChapterSeed[] = [
  {
    "id": "g11-sets-01",
    "chapter": "Sets",
    "chapterNumber": 1,
    "focus": "Set notation, subsets, interval operations, Venn reasoning and complement laws",
    "mcqs": [
      {
        "number": 1,
        "question": "If A = {x ∈ N : x² < 20}, where N = {1, 2, 3, …}, then A is",
        "options": [
          "{1, 2, 3, 4}",
          "{0, 1, 2, 3, 4}",
          "{1, 2, 3, 4, 5}",
          "{1, 4, 9, 16}"
        ]
      },
      {
        "number": 2,
        "question": "The interval form of {x ∈ R : −2 ≤ x < 3} is",
        "options": [
          "(−2, 3)",
          "[−2, 3)",
          "(−2, 3]",
          "[−2, 3]"
        ]
      },
      {
        "number": 3,
        "question": "If A ⊆ B and B ⊆ A, then",
        "options": [
          "A ∩ B = ∅",
          "A = B",
          "A is a proper subset of B",
          "B is a proper subset of A"
        ]
      },
      {
        "number": 4,
        "question": "The number of elements in P({a, b, c}) is",
        "options": [
          "3",
          "6",
          "8",
          "9"
        ]
      },
      {
        "number": 5,
        "question": "If A = {1, 2, 3} and B = {3, 4}, then A ∪ B equals",
        "options": [
          "{3}",
          "{1, 2, 4}",
          "{1, 2, 3, 4}",
          "{1, 2, 3, 3, 4}"
        ]
      },
      {
        "number": 6,
        "question": "For every set A, A ∩ ∅ is",
        "options": [
          "A",
          "∅",
          "{∅}",
          "the universal set"
        ]
      },
      {
        "number": 7,
        "question": "A − B is equal to",
        "options": [
          "A ∩ B′",
          "A′ ∩ B",
          "A ∪ B′",
          "(A ∩ B)′"
        ]
      },
      {
        "number": 8,
        "question": "Let U = {1, 2, …, 10} and A be the set of even elements of U. Then A′ is",
        "options": [
          "{2, 4, 6, 8, 10}",
          "{1, 3, 5, 7, 9}",
          "{1, 2, 3, 4, 5}",
          "∅"
        ]
      },
      {
        "number": 9,
        "question": "If n(A) = 20, n(B) = 15 and n(A ∩ B) = 6, then n(A ∪ B) is",
        "options": [
          "29",
          "35",
          "41",
          "9"
        ]
      },
      {
        "number": 10,
        "question": "According to De Morgan’s law, (A ∪ B)′ equals",
        "options": [
          "A′ ∪ B′",
          "A′ ∩ B′",
          "A ∩ B′",
          "A′ ∩ B"
        ]
      },
      {
        "number": 11,
        "question": "A set with four elements has how many proper subsets?",
        "options": [
          "8",
          "15",
          "16",
          "4"
        ]
      },
      {
        "number": 12,
        "question": "If A ∩ B = A, then",
        "options": [
          "A ⊆ B",
          "B ⊆ A",
          "A ∩ B = ∅",
          "A = B must hold"
        ]
      },
      {
        "number": 13,
        "question": "If A = [−1, 4) and B = (2, 6], then A ∩ B is",
        "options": [
          "[−1, 6]",
          "[2, 4)",
          "(2, 4)",
          "(2, 6]"
        ]
      },
      {
        "number": 14,
        "question": "If A = {1, 2, 3, 4} and B = {3, 4, 5}, then (A − B) ∪ (B − A) is",
        "options": [
          "{3, 4}",
          "{1, 2, 5}",
          "{1, 2, 3, 4, 5}",
          "{1, 2}"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "The empty set is a subset of every set.",
        "reason": "The empty set has exactly one element, namely ∅."
      },
      {
        "number": 16,
        "assertion": "If A ∩ B = ∅, then A and B have no common element.",
        "reason": "If A and B are disjoint, then A ∪ B = ∅."
      }
    ],
    "written": {
      "17": "Write {x ∈ R : −3 < x ≤ 2} in interval notation, and state whether each endpoint belongs to the set.",
      "18": "Using set identities, express A − (B ∪ C) without the difference symbol.",
      "19": "For A = {1, 2, 3, 4} and B = {2, 4, 6}, find A ∪ B, A ∩ B and A − B.",
      "20": "In a universal set U, n(U) = 60, n(A) = 35, n(B) = 28 and n(A ∩ B) = 12. Find the numbers of elements in only A, only B and neither A nor B.",
      "21": "Prove by the element method that (A ∩ B)′ = A′ ∪ B′.",
      "22": "Simplify (A ∪ B) ∩ (A ∪ B′), giving a reason for each main step.",
      "23": "Let A, B and C be subsets of U with n(U) = 60, n(A) = 32, n(B) = 28, n(C) = 20, n(A ∩ B) = 12, n(B ∩ C) = 9, n(C ∩ A) = 8 and n(A ∩ B ∩ C) = 4. Find (i) n(A ∪ B ∪ C), (ii) the number belonging to exactly one of A, B, C, and (iii) the number belonging to none of them.",
      "24": [
        "(a) Write A ∩ B. (1)",
        "(b) Find n(A ∪ B). (1)",
        "(c) Find A′ ∩ B′ and verify that it equals (A ∪ B)′. (2)"
      ]
    },
    "caseStudy": "Take U = {1, 2, …, 20}. Let A be the set of multiples of 2 in U and B the set of multiples of 3 in U.",
    "answerKey": [
      0,
      1,
      1,
      2,
      2,
      1,
      0,
      1,
      0,
      1,
      1,
      0,
      2,
      1,
      2,
      2
    ],
    "solutions": {
      "17": "The strict inequality at −3 gives an open endpoint and ≤ at 2 gives a closed endpoint. Hence the interval is (−3, 2]. Thus −3 does not belong, while 2 belongs.",
      "18": "A − (B ∪ C) = A ∩ (B ∪ C)′ = A ∩ (B′ ∩ C′) = A ∩ B′ ∩ C′.",
      "19": "A ∪ B = {1, 2, 3, 4, 6}; A ∩ B = {2, 4}; A − B = {1, 3}.",
      "20": "Only A = 35 − 12 = 23. Only B = 28 − 12 = 16. n(A ∪ B) = 35 + 28 − 12 = 51, so neither = 60 − 51 = 9.",
      "21": "For any x, x ∈ (A ∩ B)′ ⇔ x ∉ A ∩ B ⇔ x ∉ A or x ∉ B ⇔ x ∈ A′ or x ∈ B′ ⇔ x ∈ A′ ∪ B′. Therefore the two sets are equal.",
      "22": "By the distributive law, (A ∪ B) ∩ (A ∪ B′) = A ∪ (B ∩ B′). Since B ∩ B′ = ∅, this becomes A ∪ ∅ = A.",
      "23": "n(A ∪ B ∪ C) = 32 + 28 + 20 − 12 − 9 − 8 + 4 = 55. Only A = 32 − 12 − 8 + 4 = 16; only B = 28 − 12 − 9 + 4 = 11; only C = 20 − 8 − 9 + 4 = 7. Exactly one = 16 + 11 + 7 = 34. None = 60 − 55 = 5.",
      "24": "A = {2,4,6,8,10,12,14,16,18,20}; B = {3,6,9,12,15,18}. (a) A ∩ B = {6,12,18}. (b) n(A ∪ B) = 10 + 6 − 3 = 13. (c) A′ ∩ B′ = {1,5,7,11,13,17,19}. The complement of A ∪ B in U is the same set, verifying De Morgan’s law."
    }
  },
  {
    "id": "g11-relations-functions-01",
    "chapter": "Relations and Functions",
    "chapterNumber": 2,
    "focus": "Cartesian products, relation/function tests, domains and ranges, standard graphs and algebra of functions",
    "mcqs": [
      {
        "number": 1,
        "question": "If (2x − 1, y + 3) = (5, 7), then (x, y) is",
        "options": [
          "(2, 4)",
          "(3, 4)",
          "(3, 10)",
          "(2, 10)"
        ]
      },
      {
        "number": 2,
        "question": "If n(A) = 3 and n(B) = 2, then n(A × B) is",
        "options": [
          "5",
          "6",
          "8",
          "9"
        ]
      },
      {
        "number": 3,
        "question": "If A has 2 elements and B has 3 elements, the number of relations from A to B is",
        "options": [
          "6",
          "8",
          "32",
          "64"
        ]
      },
      {
        "number": 4,
        "question": "The domain of R = {(1, 2), (2, 3), (1, 4), (3, 4)} is",
        "options": [
          "{1, 2, 3}",
          "{2, 3, 4}",
          "{1, 2, 3, 4}",
          "{1, 3}"
        ]
      },
      {
        "number": 5,
        "question": "The range of R = {(−1, 2), (0, 2), (1, 4), (2, 6)} is",
        "options": [
          "{−1, 0, 1, 2}",
          "{2, 4, 6}",
          "{2, 2, 4, 6}",
          "{−1, 6}"
        ]
      },
      {
        "number": 6,
        "question": "Which relation from A = {1, 2, 3} to B = {a, b} is a function?",
        "options": [
          "{(1,a),(2,a),(3,b)}",
          "{(1,a),(1,b),(2,a),(3,b)}",
          "{(1,a),(2,b)}",
          "{(1,a),(2,a),(2,b),(3,b)}"
        ]
      },
      {
        "number": 7,
        "question": "The domain of f(x) = 1/(x − 4) is",
        "options": [
          "R",
          "R − {0}",
          "R − {4}",
          "(4, ∞)"
        ]
      },
      {
        "number": 8,
        "question": "The range of f(x) = |x − 2| is",
        "options": [
          "R",
          "(0, ∞)",
          "[0, ∞)",
          "(−∞, 2]"
        ]
      },
      {
        "number": 9,
        "question": "If sgn(x) is the signum function, then sgn(−5) equals",
        "options": [
          "−5",
          "−1",
          "0",
          "1"
        ]
      },
      {
        "number": 10,
        "question": "If [x] denotes the greatest integer not exceeding x, then [2.7] is",
        "options": [
          "2",
          "3",
          "2.7",
          "−2"
        ]
      },
      {
        "number": 11,
        "question": "If f(x)=x² and g(x)=2x−1, then (f+g)(2) is",
        "options": [
          "3",
          "5",
          "7",
          "9"
        ]
      },
      {
        "number": 12,
        "question": "If f(x)=x+1 and g(x)=x−3, the domain of f/g is",
        "options": [
          "R",
          "R−{−1}",
          "R−{3}",
          "(3,∞)"
        ]
      },
      {
        "number": 13,
        "question": "The range of f(x)=2ˣ, x∈R, is",
        "options": [
          "R",
          "[0,∞)",
          "(0,∞)",
          "[1,∞)"
        ]
      },
      {
        "number": 14,
        "question": "The domain of f(x)=log₁₀(x+2) is",
        "options": [
          "(−2,∞)",
          "[−2,∞)",
          "(0,∞)",
          "R−{−2}"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Every function is a relation, but every relation need not be a function.",
        "reason": "A function assigns exactly one image to every element of its domain, while a general relation need not do so."
      },
      {
        "number": 16,
        "assertion": "The domain and range of f(x)=|x| are both R.",
        "reason": "For every real x, |x| ≥ 0."
      }
    ],
    "written": {
      "17": "Let A = {1, 2} and B = {a, b, c}. Write A × B and B × A. Are they equal?",
      "18": "Find the domain and range of R = {(x, x²) : x ∈ {−2, −1, 0, 1, 2}}.",
      "19": "If f(x)=x²−1 and g(x)=2x+3, find (f+g)(x) and (fg)(x).",
      "20": "Find the domain and range of the real-valued function f(x)=√(9−x²).",
      "21": "For A={1,2,3} and B={1,4,9}, consider R={(1,1),(2,4),(3,9)} from A to B. Explain why R is a function and state its domain, codomain and range.",
      "22": "Describe the graph of the signum function by writing its piecewise rule. State its domain and range, and give its values at −3, 0 and 5.",
      "23": "Let f(x)=|x−2| and g(x)=x+1. (i) Write f as a piecewise function. (ii) Find (f+g)(x) and (fg)(x). (iii) Find (f/g)(x) and state its domain.",
      "24": [
        "(a) Write f as a set of ordered pairs. (1)",
        "(b) State the range of f. (1)",
        "(c) If g(x)=x² on A, find (f+g)(2) and (fg)(3). (2)"
      ]
    },
    "caseStudy": "A finite function f maps A={0,1,2,3} into B={3,5,7,9,11} by f(x)=2x+3.",
    "answerKey": [
      1,
      1,
      3,
      0,
      1,
      0,
      2,
      2,
      1,
      0,
      2,
      2,
      2,
      0,
      0,
      3
    ],
    "solutions": {
      "17": "A×B={(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)}. B×A={(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)}. They are not equal because order matters in ordered pairs.",
      "18": "The ordered pairs are (−2,4),(−1,1),(0,0),(1,1),(2,4). Domain={−2,−1,0,1,2}; range={0,1,4}.",
      "19": "(f+g)(x)=x²−1+2x+3=x²+2x+2. (fg)(x)=(x²−1)(2x+3)=2x³+3x²−2x−3.",
      "20": "For real values, 9−x²≥0, so −3≤x≤3. Thus domain=[−3,3]. Since f(x) is a square root, its minimum is 0 at x=±3 and maximum is 3 at x=0. Range=[0,3].",
      "21": "Each element 1,2,3 of A appears exactly once as a first component and has one image, so R is a function. Domain=A={1,2,3}; codomain=B={1,4,9}; range={1,4,9}.",
      "22": "sgn(x)=−1 for x<0, 0 for x=0, and 1 for x>0. Domain=R and range={−1,0,1}. Therefore sgn(−3)=−1, sgn(0)=0 and sgn(5)=1.",
      "23": "(i) f(x)=2−x for x<2 and x−2 for x≥2. (ii) (f+g)(x)=3 for x<2 and 2x−1 for x≥2. (fg)(x)=(2−x)(x+1) for x<2 and (x−2)(x+1) for x≥2. (iii) (f/g)(x)=|x−2|/(x+1), with domain R−{−1}.",
      "24": "(a) f={(0,3),(1,5),(2,7),(3,9)}. (b) Range={3,5,7,9}; 11 is in the codomain but is not attained. (c) (f+g)(2)=f(2)+g(2)=7+4=11; (fg)(3)=f(3)g(3)=9×9=81."
    }
  },
  {
    "id": "g11-trigonometric-functions-01",
    "chapter": "Trigonometric Functions",
    "chapterNumber": 3,
    "focus": "Angle measure, unit-circle values, graphs, identities and exact-value applications",
    "mcqs": [
      {
        "number": 1,
        "question": "225° in radians is",
        "options": [
          "3π/4",
          "5π/4",
          "7π/4",
          "5π/6"
        ]
      },
      {
        "number": 2,
        "question": "7π/6 radians in degrees is",
        "options": [
          "150°",
          "180°",
          "210°",
          "240°"
        ]
      },
      {
        "number": 3,
        "question": "The value of sin(7π/6) is",
        "options": [
          "1/2",
          "−1/2",
          "√3/2",
          "−√3/2"
        ]
      },
      {
        "number": 4,
        "question": "The range of f(x)=3+2sin x is",
        "options": [
          "[−2,2]",
          "[1,5]",
          "[3,5]",
          "[−1,5]"
        ]
      },
      {
        "number": 5,
        "question": "The least positive period of cos 2x is",
        "options": [
          "2π",
          "π",
          "π/2",
          "4π"
        ]
      },
      {
        "number": 6,
        "question": "sin 75° equals",
        "options": [
          "(√6+√2)/4",
          "(√6−√2)/4",
          "(√3+1)/2",
          "1/√2"
        ]
      },
      {
        "number": 7,
        "question": "cos 15° equals",
        "options": [
          "(√6−√2)/4",
          "(√6+√2)/4",
          "(√3−1)/2",
          "1/2"
        ]
      },
      {
        "number": 8,
        "question": "tan 75° equals",
        "options": [
          "2−√3",
          "2+√3",
          "√3−1",
          "√3+1"
        ]
      },
      {
        "number": 9,
        "question": "sin(x+y) is",
        "options": [
          "sin x cos y + cos x sin y",
          "sin x cos y − cos x sin y",
          "cos x cos y − sin x sin y",
          "cos x sin y + sin x sin y"
        ]
      },
      {
        "number": 10,
        "question": "If sin x=3/5, cos x=4/5, sin y=5/13 and cos y=12/13, then sin(x+y) is",
        "options": [
          "16/65",
          "33/65",
          "56/65",
          "63/65"
        ]
      },
      {
        "number": 11,
        "question": "sin A + sin B equals",
        "options": [
          "2sin((A+B)/2)cos((A−B)/2)",
          "2cos((A+B)/2)sin((A−B)/2)",
          "2sin((A−B)/2)cos((A+B)/2)",
          "2cos((A−B)/2)cos((A+B)/2)"
        ]
      },
      {
        "number": 12,
        "question": "cos A − cos B equals",
        "options": [
          "2sin((A+B)/2)sin((A−B)/2)",
          "−2sin((A+B)/2)sin((A−B)/2)",
          "2cos((A+B)/2)cos((A−B)/2)",
          "−2cos((A+B)/2)sin((A−B)/2)"
        ]
      },
      {
        "number": 13,
        "question": "If tan x=1/2, then cos 2x is",
        "options": [
          "3/5",
          "4/5",
          "−3/5",
          "1/5"
        ]
      },
      {
        "number": 14,
        "question": "sin 3x equals",
        "options": [
          "3sin x+4sin³x",
          "3sin x−4sin³x",
          "4sin x−3sin³x",
          "sin³x−3sin x"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "For every real x, sin(−x)=−sin x.",
        "reason": "On the unit circle, reflecting the point for angle x in the x-axis changes the y-coordinate’s sign but not its magnitude."
      },
      {
        "number": 16,
        "assertion": "tan(x+y)=(tan x+tan y)/(1−tan x tan y), whenever both sides are defined.",
        "reason": "Dividing the addition formulas for sin(x+y) and cos(x+y), and then dividing numerator and denominator by cos x cos y, gives the stated formula."
      }
    ],
    "written": {
      "17": "Convert 11π/18 radians to degrees and −150° to radians.",
      "18": "Evaluate sin 15° exactly.",
      "19": "Prove that sin(x+y)sin(x−y)=sin²x−sin²y.",
      "20": "If cos x=−12/13 and x lies in the third quadrant, find sin 2x, cos 2x and tan 2x.",
      "21": "Prove that (sin 3x + sin x)/(cos 3x + cos x)=tan 2x wherever the expressions are defined.",
      "22": "Prove that cos 20° cos 40° cos 80°=1/8.",
      "23": "Prove that (sin x+sin 3x+sin 5x)/(cos x+cos 3x+cos 5x)=tan 3x, wherever the denominator is non-zero. Hence evaluate the ratio when x=10°.",
      "24": [
        "(a) State the period of T. (1)",
        "(b) Find T(3). (1)",
        "(c) Find the range of T and compare T(9) with the mean temperature 25°C. (2)"
      ]
    },
    "caseStudy": "The temperature in a laboratory over a 12-hour cycle is modelled by T(t)=25+4sin(πt/6), where t is in hours.",
    "answerKey": [
      1,
      2,
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      2,
      0,
      1,
      0,
      1,
      0,
      0
    ],
    "solutions": {
      "17": "11π/18 × 180°/π = 110°. Also −150° × π/180° = −5π/6 radians.",
      "18": "sin15°=sin(45°−30°)=sin45°cos30°−cos45°sin30°=(1/√2)(√3/2)−(1/√2)(1/2)=(√6−√2)/4.",
      "19": "sin(x+y)sin(x−y)=(sin x cos y+cos x sin y)(sin x cos y−cos x sin y)=sin²x cos²y−cos²x sin²y=sin²x(1−sin²y)−(1−sin²x)sin²y=sin²x−sin²y.",
      "20": "In quadrant III, sin x=−5/13. Thus sin2x=2sinx cosx=120/169; cos2x=cos²x−sin²x=(144−25)/169=119/169; tan2x=sin2x/cos2x=120/119.",
      "21": "Using sum-to-product, sin3x+sinx=2sin2x cosx and cos3x+cosx=2cos2x cosx. Their ratio is tan2x after cancelling 2cosx, wherever cancellation and the original ratio are defined.",
      "22": "Use sin2θ=2sinθcosθ successively: sin160°=2sin80°cos80°=4sin40°cos40°cos80°=8sin20°cos20°cos40°cos80°. Since sin160°=sin20° and sin20°≠0, cos20°cos40°cos80°=1/8.",
      "23": "sinx+sin5x=2sin3x cos2x, so the numerator is sin3x(1+2cos2x). Similarly cosx+cos5x=2cos3x cos2x, so the denominator is cos3x(1+2cos2x). The ratio is tan3x wherever defined. At x=10°, it is tan30°=1/√3.",
      "24": "(a) sin(πt/6) has period 2π/(π/6)=12 hours. (b) T(3)=25+4sin(π/2)=29°C. (c) Since −1≤sin≤1, 21≤T≤29. T(9)=25+4sin(3π/2)=21°C, which is 4°C below the mean 25°C."
    }
  },
  {
    "id": "g11-complex-numbers-01",
    "chapter": "Complex Numbers and Quadratic Equations",
    "chapterNumber": 4,
    "focus": "Cartesian form, powers of i, arithmetic, conjugate, modulus and Argand-plane interpretation",
    "mcqs": [
      {
        "number": 1,
        "question": "i³⁷ equals",
        "options": [
          "1",
          "i",
          "−1",
          "−i"
        ]
      },
      {
        "number": 2,
        "question": "(3+2i)+(1−5i) equals",
        "options": [
          "4−3i",
          "2+7i",
          "4+7i",
          "2−3i"
        ]
      },
      {
        "number": 3,
        "question": "(2+i)(3−2i) equals",
        "options": [
          "4−i",
          "8−i",
          "8+i",
          "6−i"
        ]
      },
      {
        "number": 4,
        "question": "The conjugate of −2+7i is",
        "options": [
          "2−7i",
          "−2−7i",
          "2+7i",
          "−7+2i"
        ]
      },
      {
        "number": 5,
        "question": "If z=3−4i, then |z| is",
        "options": [
          "1",
          "5",
          "7",
          "25"
        ]
      },
      {
        "number": 6,
        "question": "(1+i)/(1−i) equals",
        "options": [
          "1",
          "−1",
          "i",
          "−i"
        ]
      },
      {
        "number": 7,
        "question": "If z=3+5i, then z+z̄ equals",
        "options": [
          "6",
          "10i",
          "6+10i",
          "0"
        ]
      },
      {
        "number": 8,
        "question": "If x+iy=4−3i, where x,y∈R, then",
        "options": [
          "x=4,y=3",
          "x=−4,y=−3",
          "x=4,y=−3",
          "x=−3,y=4"
        ]
      },
      {
        "number": 9,
        "question": "(1−i)² equals",
        "options": [
          "2",
          "−2",
          "2i",
          "−2i"
        ]
      },
      {
        "number": 10,
        "question": "1/(3−4i) equals",
        "options": [
          "(3−4i)/25",
          "(3+4i)/25",
          "3+4i",
          "(4+3i)/25"
        ]
      },
      {
        "number": 11,
        "question": "The number (k−2)+5i is purely imaginary when",
        "options": [
          "k=−2",
          "k=0",
          "k=2",
          "k=5"
        ]
      },
      {
        "number": 12,
        "question": "The point representing −3+2i in the Argand plane lies in",
        "options": [
          "Quadrant I",
          "Quadrant II",
          "Quadrant III",
          "Quadrant IV"
        ]
      },
      {
        "number": 13,
        "question": "The distance between the points representing 2+i and −1+5i is",
        "options": [
          "4",
          "5",
          "6",
          "7"
        ]
      },
      {
        "number": 14,
        "question": "i²⁰²⁶ equals",
        "options": [
          "1",
          "i",
          "−1",
          "−i"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "For every complex number z, z+z̄ is real.",
        "reason": "If z=a+ib, then z+z̄=2a."
      },
      {
        "number": 16,
        "assertion": "For every complex number z, zz̄=|z|² is a non-negative real number.",
        "reason": "The modulus |z| can be negative when the imaginary part of z is negative."
      }
    ],
    "written": {
      "17": "Simplify (3+4i)−(1−2i)+i(2−i), expressing the answer as a+ib.",
      "18": "Express (5+2i)/(1−i) in the form a+ib.",
      "19": "Find real x and y if (2x−y)+i(x+2y)=7+i.",
      "20": "Evaluate (1+i)⁸ without expanding all eight factors.",
      "21": "For z₁=2−3i and z₂=−1+4i, verify numerically that the conjugate of z₁+z₂ equals z̄₁+z̄₂. Also find |z₁+z₂|.",
      "22": "Points P and Q in the Argand plane represent z₁=2+3i and z₂=−2+i. Find PQ and the complex number represented by the midpoint of PQ.",
      "23": "Let z=x+iy satisfy z+2z̄=9+3i. Find x and y, and hence find z, z̄, |z| and z/z̄.",
      "24": [
        "(a) Write the Cartesian coordinates of A and B. (1)",
        "(b) Find the complex number representing the displacement from A to B, z_B−z_A. (1)",
        "(c) Find AB and the complex number represented by the midpoint of AB. (2)"
      ]
    },
    "caseStudy": "In an Argand diagram, A and B represent z_A=2+3i and z_B=−1+i.",
    "answerKey": [
      1,
      0,
      1,
      1,
      1,
      2,
      0,
      2,
      3,
      1,
      2,
      1,
      1,
      2,
      0,
      2
    ],
    "solutions": {
      "17": "(3+4i)−(1−2i)=2+6i. Also i(2−i)=2i−i²=1+2i. Therefore the result is 3+8i.",
      "18": "Multiply numerator and denominator by 1+i: (5+2i)(1+i)/[(1−i)(1+i)]=(3+7i)/2=3/2+(7/2)i.",
      "19": "Equating real and imaginary parts gives 2x−y=7 and x+2y=1. From y=2x−7, x+4x−14=1, so x=3 and y=−1.",
      "20": "(1+i)²=2i, so (1+i)⁴=(2i)²=−4 and (1+i)⁸=(−4)²=16.",
      "21": "z₁+z₂=1+i, whose conjugate is 1−i. Also z̄₁+z̄₂=(2+3i)+(−1−4i)=1−i, so they agree. |z₁+z₂|=|1+i|=√2.",
      "22": "z₁−z₂=(2+3i)−(−2+i)=4+2i, so PQ=|4+2i|=√20=2√5. The midpoint is (z₁+z₂)/2=(0+4i)/2=2i.",
      "23": "z+2z̄=(x+iy)+2(x−iy)=3x−iy. Equating with 9+3i gives 3x=9 and −y=3, so x=3,y=−3. Hence z=3−3i, z̄=3+3i and |z|=√(9+9)=3√2. Finally z/z̄=(1−i)/(1+i)=−i.",
      "24": "(a) A=(2,3), B=(−1,1). (b) z_B−z_A=(−1+i)−(2+3i)=−3−2i. (c) AB=|−3−2i|=√13. The midpoint represents (z_A+z_B)/2=(1+4i)/2=1/2+2i."
    }
  },
  {
    "id": "g11-linear-inequalities-01",
    "chapter": "Linear Inequalities",
    "chapterNumber": 5,
    "focus": "Equivalent transformations, sign reversal, compound conditions, interval notation and number-line representation",
    "mcqs": [
      {
        "number": 1,
        "question": "The solution of 3x−5>7 is",
        "options": [
          "x>4",
          "x<4",
          "x≥4",
          "x≤4"
        ]
      },
      {
        "number": 2,
        "question": "The solution of −2x+3≤9 is",
        "options": [
          "x≤−3",
          "x≥−3",
          "x≤3",
          "x≥3"
        ]
      },
      {
        "number": 3,
        "question": "The interval representing x<5 is",
        "options": [
          "(−∞,5)",
          "(−∞,5]",
          "[5,∞)",
          "(5,∞)"
        ]
      },
      {
        "number": 4,
        "question": "The solution of 2≤3x+5<11 is",
        "options": [
          "−1<x≤2",
          "−1≤x<2",
          "−1≤x≤2",
          "−2≤x<1"
        ]
      },
      {
        "number": 5,
        "question": "The solution of 5−2x>1 is",
        "options": [
          "x>2",
          "x<2",
          "x>−2",
          "x<−2"
        ]
      },
      {
        "number": 6,
        "question": "The solution of 4x+7≤3x+12 is",
        "options": [
          "x≥5",
          "x≤5",
          "x≥−5",
          "x≤−5"
        ]
      },
      {
        "number": 7,
        "question": "The solution set of 2(x−1)≤2x+3 is",
        "options": [
          "∅",
          "R",
          "[−2,∞)",
          "(−∞,3]"
        ]
      },
      {
        "number": 8,
        "question": "The solution set of 3x+2>3x+5 is",
        "options": [
          "R",
          "(3,∞)",
          "∅",
          "(−∞,3)"
        ]
      },
      {
        "number": 9,
        "question": "The number of integral solutions of −2<x≤3 is",
        "options": [
          "4",
          "5",
          "6",
          "7"
        ]
      },
      {
        "number": 10,
        "question": "For x∈N={1,2,3,…}, the number of solutions of 2x+1<10 is",
        "options": [
          "3",
          "4",
          "5",
          "infinite"
        ]
      },
      {
        "number": 11,
        "question": "The solution of (2x−1)/3≥(x+2)/2 is",
        "options": [
          "x≤8",
          "x≥8",
          "x≤−8",
          "x≥−8"
        ]
      },
      {
        "number": 12,
        "question": "The solution of 7−3x≤x+11 is",
        "options": [
          "x≤−1",
          "x≥−1",
          "x≤1",
          "x≥1"
        ]
      },
      {
        "number": 13,
        "question": "If a<b, then which statement is always true?",
        "options": [
          "−3a<−3b",
          "−3a>−3b",
          "a−3>b−3",
          "a/2>b/2"
        ]
      },
      {
        "number": 14,
        "question": "The common solution of x≥−2 and x<4 is",
        "options": [
          "(−2,4)",
          "[−2,4)",
          "(−∞,−2]∪[4,∞)",
          "[−2,4]"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Multiplying both sides of an inequality by a negative number reverses the inequality sign.",
        "reason": "Multiplication by a negative number reflects ordered points across zero on the real number line, reversing their order."
      },
      {
        "number": 16,
        "assertion": "The solution set of 2x+1<2x+5 is R.",
        "reason": "Subtracting 2x from both sides reduces the inequality to the always-true statement 1<5."
      }
    ],
    "written": {
      "17": "Solve 5x−7≤3x+9 and represent the solution on the number line.",
      "18": "Solve the compound inequality −4<2x+6≤10 and write the answer in interval notation.",
      "19": "Solve (3x−2)/5>(x+4)/3.",
      "20": "Find the common solution of 2x−5<7 and 3x+4≥−2. Express it as an interval and indicate the endpoints on a number line.",
      "21": "Solve −7≤(2x−1)/3<5. Hence list all integral solutions and state how many there are.",
      "22": "Solve (2x−3)/4−(x+1)/3≥1/6, showing the effect of clearing the positive denominators.",
      "23": "Find all real x satisfying both (x−2)/3+(x+1)/2≤5 and 4−2x<10. Write the solution in interval form, list its integral solutions and find their sum.",
      "24": [
        "(a) Form the linear inequality for x. (1)",
        "(b) Find the maximum distance the student can travel. (1)",
        "(c) For a 10 km trip, find the total fare and the money left from ₹260, and verify that the distance satisfies the inequality. (2)"
      ]
    },
    "caseStudy": "A cab fare is ₹80 plus ₹12 per kilometre. A student can spend at most ₹260 on one trip. Let x be the distance in kilometres.",
    "answerKey": [
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      2,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0
    ],
    "solutions": {
      "17": "5x−7≤3x+9 ⇒ 2x≤16 ⇒ x≤8. The number line has a closed point at 8 and shading to the left; interval (−∞,8].",
      "18": "−4<2x+6≤10 ⇒ −10<2x≤4 ⇒ −5<x≤2. Thus the interval is (−5,2].",
      "19": "Multiply by 15>0, so the sign is unchanged: 3(3x−2)>5(x+4). Hence 9x−6>5x+20, so 4x>26 and x>13/2.",
      "20": "2x−5<7 gives x<6. Also 3x+4≥−2 gives x≥−2. Their intersection is −2≤x<6, i.e. [−2,6). Use a closed point at −2 and an open point at 6.",
      "21": "−7≤(2x−1)/3<5 ⇒ −21≤2x−1<15 ⇒ −20≤2x<16 ⇒ −10≤x<8. Integral solutions are −10,−9,…,7, a total of 18 integers.",
      "22": "Multiply throughout by 12>0: 3(2x−3)−4(x+1)≥2. Thus 6x−9−4x−4≥2, so 2x≥15 and x≥15/2.",
      "23": "The first inequality gives 2(x−2)+3(x+1)≤30, so 5x−1≤30 and x≤31/5. The second gives −2x<6, so x>−3. Hence −3<x≤31/5, or (−3,31/5]. Integral solutions are −2,−1,0,1,2,3,4,5,6. Their sum is 18.",
      "24": "(a) 80+12x≤260, with x≥0. (b) 12x≤180, so x≤15; the maximum is 15 km. (c) At x=10, fare=80+120=₹200 and money left=₹60. Since 200≤260 (equivalently 10≤15), the trip satisfies the inequality."
    }
  },
  {
    "id": "g11-permutations-combinations-01",
    "chapter": "Permutations and Combinations",
    "chapterNumber": 6,
    "focus": "Decide first whether order matters, then count systematically without omission or repetition.",
    "mcqs": [
      {
        "number": 1,
        "question": "A student has 4 shirts and 3 pairs of trousers. The number of different shirt–trouser outfits is",
        "options": [
          "7",
          "12",
          "24",
          "64"
        ]
      },
      {
        "number": 2,
        "question": "The value of ⁷P₂ is",
        "options": [
          "21",
          "35",
          "42",
          "49"
        ]
      },
      {
        "number": 3,
        "question": "The number of ways to choose 2 students from 8 students is",
        "options": [
          "16",
          "24",
          "28",
          "56"
        ]
      },
      {
        "number": 4,
        "question": "For n ≥ 2, n!/(n − 2)! equals",
        "options": [
          "n²",
          "n(n − 1)",
          "(n − 1)(n − 2)",
          "2n"
        ]
      },
      {
        "number": 5,
        "question": "⁹C₂ is equal to",
        "options": [
          "⁹C₁",
          "⁹C₆",
          "⁹C₇",
          "⁹C₈"
        ]
      },
      {
        "number": 6,
        "question": "The number of distinct arrangements of the letters of LEVEL is",
        "options": [
          "20",
          "30",
          "60",
          "120"
        ]
      },
      {
        "number": 7,
        "question": "Six people stand in a row. If two specified people must stand together, the number of arrangements is",
        "options": [
          "48",
          "120",
          "240",
          "720"
        ]
      },
      {
        "number": 8,
        "question": "The number of three-member teams that can be formed from 7 students is",
        "options": [
          "21",
          "28",
          "35",
          "42"
        ]
      },
      {
        "number": 9,
        "question": "A committee has 2 boys chosen from 5 boys and 2 girls chosen from 4 girls. The number of possible committees is",
        "options": [
          "30",
          "45",
          "60",
          "90"
        ]
      },
      {
        "number": 10,
        "question": "Using the digits 0, 1, 2, 3, 4 and 5 without repetition, the number of four-digit numbers that can be formed is",
        "options": [
          "120",
          "240",
          "300",
          "360"
        ]
      },
      {
        "number": 11,
        "question": "Seven distinct books are placed in a row. If one specified book must be first and another specified book must be last, the number of arrangements is",
        "options": [
          "24",
          "120",
          "240",
          "720"
        ]
      },
      {
        "number": 12,
        "question": "The number of diagonals in an octagon is",
        "options": [
          "16",
          "20",
          "28",
          "56"
        ]
      },
      {
        "number": 13,
        "question": "A captain and a vice-captain are to be selected from 8 students. The number of selections is",
        "options": [
          "16",
          "28",
          "56",
          "64"
        ]
      },
      {
        "number": 14,
        "question": "If each pair among 10 people shakes hands exactly once, the total number of handshakes is",
        "options": [
          "20",
          "40",
          "45",
          "90"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "A president and a secretary can be selected from 6 students in 30 ways.",
        "reason": "The two offices are distinct, so order matters."
      },
      {
        "number": 16,
        "assertion": "For 0 ≤ r ≤ n, ⁿCᵣ = ⁿCₙ₋ᵣ.",
        "reason": "For every allowed r, ⁿPᵣ = ⁿPₙ₋ᵣ."
      }
    ],
    "written": {
      "17": "How many three-digit even numbers can be formed from the digits 1, 2, 3, 4, 5 and 6 without repetition?",
      "18": "A four-member team is chosen from 6 boys and 5 girls. In how many ways can the team contain exactly 2 girls?",
      "19": "Find the number of distinct arrangements of the letters of BANANA.",
      "20": "How many five-digit numbers divisible by 5 can be formed from the digits 0, 1, 2, 3, 4, 5 and 6 without repetition?",
      "21": "Nine seats are in a row. In how many ways can 4 seats be selected so that no two selected seats are adjacent?",
      "22": "Find the number of distinct arrangements of the letters of MATHEMATICS in which all the vowels are together.",
      "23": "From 7 boys and 5 girls, a five-member team containing at least 2 girls is formed. A captain is then selected from the five team members. Find the total number of possible outcomes.",
      "24": [
        "(a) How many choices are there for the first character? [1]",
        "(b) In how many ways can the three digit positions be filled? [1]",
        "(c) Find (i) the total number of valid codes and (ii) the number of valid codes that end in an even digit. [2]"
      ]
    },
    "caseStudy": "A library code has four characters. The first character is one of A, B, C or D. The remaining three characters are distinct digits chosen from 0, 1, 2, 3, 4 and 5.",
    "answerKey": [
      1,
      2,
      2,
      1,
      2,
      1,
      2,
      2,
      2,
      2,
      1,
      1,
      2,
      2,
      0,
      2
    ],
    "solutions": {
      "17": "The units digit has 3 choices: 2, 4 or 6. After it is chosen, the hundreds digit has 5 choices and the tens digit has 4 choices. Hence the number is 3 × 5 × 4 = 60.",
      "18": "Choose 2 girls from 5 and 2 boys from 6. The required number is ⁵C₂ × ⁶C₂ = 10 × 15 = 150.",
      "19": "BANANA has 6 letters, with A repeated 3 times and N repeated 2 times. The number of distinct arrangements is 6!/(3!2!) = 60.",
      "20": "A number divisible by 5 ends in 0 or 5. If it ends in 0, the remaining places can be filled in 6 × 5 × 4 × 3 = 360 ways. If it ends in 5, the first digit has 5 non-zero choices and the remaining three places have 5 × 4 × 3 choices, giving 300 ways. Total = 360 + 300 = 660.",
      "21": "Let the selected seat numbers be x₁ < x₂ < x₃ < x₄ with gaps of at least 2. Put yᵢ = xᵢ − (i − 1). Then 1 ≤ y₁ < y₂ < y₃ < y₄ ≤ 6. Thus the count is ⁶C₄ = 15.",
      "22": "The vowels A, A, E, I form one block. Together with the 7 consonants, there are 8 objects; M and T are each repeated twice. Their arrangements number 8!/(2!2!). The vowels within their block can be arranged in 4!/2! ways. Required number = [8!/(2!2!)] × (4!/2!) = 120960.",
      "23": "Count teams by number of girls. The number of teams is ⁵C₂⁷C₃ + ⁵C₃⁷C₂ + ⁵C₄⁷C₁ + ⁵C₅⁷C₀ = 350 + 210 + 35 + 1 = 596. Each team offers 5 choices for captain. Hence the total number of outcomes is 596 × 5 = 2980.",
      "24": "(a) There are 4 letter choices. (b) The digit positions can be filled in ⁶P₃ = 6 × 5 × 4 = 120 ways. (c)(i) Total codes = 4 × 120 = 480. (ii) The final digit has 3 even choices: 0, 2 or 4. The other two digit positions have 5 × 4 choices. Therefore the number is 4 × 3 × 5 × 4 = 240."
    }
  },
  {
    "id": "g11-binomial-theorem-01",
    "chapter": "Binomial Theorem",
    "chapterNumber": 7,
    "focus": "Use Pascal coefficients and the theorem accurately for positive integral powers and simple applications.",
    "mcqs": [
      {
        "number": 1,
        "question": "The expansion of (x + y)² is",
        "options": [
          "x² + y²",
          "x² + 2xy + y²",
          "x² − 2xy + y²",
          "2x² + 2y²"
        ]
      },
      {
        "number": 2,
        "question": "The coefficient of x² in the direct expansion of (x + 2)³ is",
        "options": [
          "3",
          "6",
          "8",
          "12"
        ]
      },
      {
        "number": 3,
        "question": "The constant term in the expansion of (2 + x)⁴ is",
        "options": [
          "2",
          "8",
          "16",
          "32"
        ]
      },
      {
        "number": 4,
        "question": "The row of Pascal's triangle corresponding to power 5 is",
        "options": [
          "1, 5, 10, 10, 5, 1",
          "1, 4, 6, 4, 1",
          "1, 5, 15, 15, 5, 1",
          "1, 6, 15, 20, 15, 6, 1"
        ]
      },
      {
        "number": 5,
        "question": "The sum of the coefficients in (2x − 1)⁴ is",
        "options": [
          "0",
          "1",
          "16",
          "81"
        ]
      },
      {
        "number": 6,
        "question": "The alternating sum of the coefficients in (1 + x)⁶ is",
        "options": [
          "0",
          "1",
          "32",
          "64"
        ]
      },
      {
        "number": 7,
        "question": "The coefficient of x³ in the direct expansion of (1 + x)⁴ is",
        "options": [
          "1",
          "4",
          "6",
          "8"
        ]
      },
      {
        "number": 8,
        "question": "The coefficient of a³b² in the expansion of (a + b)⁵ is",
        "options": [
          "5",
          "10",
          "15",
          "20"
        ]
      },
      {
        "number": 9,
        "question": "If (1 + x)⁴ = 1 + 4x + kx² + 4x³ + x⁴, then k is",
        "options": [
          "4",
          "5",
          "6",
          "8"
        ]
      },
      {
        "number": 10,
        "question": "Using (100 + 1)², the value of 101² is",
        "options": [
          "10001",
          "10101",
          "10201",
          "10301"
        ]
      },
      {
        "number": 11,
        "question": "(x + 1)³ + (x − 1)³ simplifies to",
        "options": [
          "2x³ + 6x",
          "2x³ + 6x²",
          "2x³ + 2",
          "6x³ + 2x"
        ]
      },
      {
        "number": 12,
        "question": "(x + 1)⁴ − (x − 1)⁴ simplifies to",
        "options": [
          "8x(x² + 1)",
          "8x²(x + 1)",
          "4x(x² + 1)",
          "2x⁴ + 12x² + 2"
        ]
      },
      {
        "number": 13,
        "question": "The sum of the coefficients in (x − 2)³ is",
        "options": [
          "−1",
          "0",
          "1",
          "8"
        ]
      },
      {
        "number": 14,
        "question": "The coefficient of x in the direct expansion of (2x + 3)³ is",
        "options": [
          "18",
          "36",
          "54",
          "108"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Every interior entry of Pascal's triangle is the sum of the two entries immediately above it.",
        "reason": "The identity ⁿCᵣ = ⁿ⁻¹Cᵣ₋₁ + ⁿ⁻¹Cᵣ holds for 1 ≤ r ≤ n − 1."
      },
      {
        "number": 16,
        "assertion": "The coefficient of x in (1 + x)⁵ is 5.",
        "reason": "The sum of all coefficients in (1 + x)⁵ is 32."
      }
    ],
    "written": {
      "17": "Expand (2x − 3)⁴.",
      "18": "Use the binomial theorem to evaluate 102³.",
      "19": "If (1 + x)⁴ = 1 + ax + bx² + ax³ + x⁴, find a and b.",
      "20": "Simplify (x + 1)⁵ + (x − 1)⁵ using binomial expansions.",
      "21": "Use the binomial theorem to prove that 7ⁿ − 6n − 1 is divisible by 36 for every positive integer n.",
      "22": "Show that (1 + x)⁵ − (1 − x)⁵ = 10x + 20x³ + 2x⁵. Hence evaluate (3/2)⁵ − (1/2)⁵.",
      "23": "Construct the Pascal-triangle row for power 6 from the row for power 5. Hence expand (2x − 1)⁶ completely.",
      "24": [
        "(a) Write the Pascal coefficients for power 4. [1]",
        "(b) Expand (1 + r)⁴. [1]",
        "(c) Use the expansion to find the value of the investment after four years, correct to the nearest paise. [2]"
      ]
    },
    "caseStudy": "An investment of ₹10,000 grows by 5% each year. Ignoring taxes and fees, its value after four years is 10000(1 + r)⁴, where r = 0.05.",
    "answerKey": [
      1,
      1,
      2,
      0,
      1,
      0,
      1,
      1,
      2,
      2,
      0,
      0,
      0,
      2,
      0,
      1
    ],
    "solutions": {
      "17": "Using coefficients 1, 4, 6, 4, 1: (2x − 3)⁴ = 16x⁴ − 96x³ + 216x² − 216x + 81.",
      "18": "102³ = (100 + 2)³ = 100³ + 3(100²)(2) + 3(100)(2²) + 2³ = 1000000 + 60000 + 1200 + 8 = 1061208.",
      "19": "The Pascal coefficients for power 4 are 1, 4, 6, 4, 1. Comparing coefficients gives a = 4 and b = 6.",
      "20": "Add the two expansions. Terms containing even powers contributed with opposite signs inside the odd power cancel appropriately, leaving (x + 1)⁵ + (x − 1)⁵ = 2x⁵ + 20x³ + 10x.",
      "21": "Expand 7ⁿ = (1 + 6)ⁿ = 1 + 6n + 36·ⁿC₂ + 6³·ⁿC₃ + ···. Every term after 1 + 6n contains the factor 36. Therefore 7ⁿ − 6n − 1 is divisible by 36.",
      "22": "Subtract the expansions of (1 − x)⁵ from (1 + x)⁵. The even-power terms cancel, giving 10x + 20x³ + 2x⁵. Put x = 1/2: (3/2)⁵ − (1/2)⁵ = 5 + 5/2 + 1/16 = 121/16.",
      "23": "The power-5 row is 1, 5, 10, 10, 5, 1. Adding adjacent entries gives the power-6 row 1, 6, 15, 20, 15, 6, 1. Hence (2x − 1)⁶ = 64x⁶ − 192x⁵ + 240x⁴ − 160x³ + 60x² − 12x + 1.",
      "24": "(a) The coefficients are 1, 4, 6, 4, 1. (b) (1 + r)⁴ = 1 + 4r + 6r² + 4r³ + r⁴. (c) At r = 0.05, the factor is 1.21550625. The value is ₹10000 × 1.21550625 = ₹12,155.0625, or ₹12,155.06 to the nearest paise."
    }
  },
  {
    "id": "g11-sequences-series-01",
    "chapter": "Sequences and Series",
    "chapterNumber": 8,
    "focus": "Recognise a geometric progression, choose the correct finite or infinite sum, and use the AM–GM relation responsibly.",
    "mcqs": [
      {
        "number": 1,
        "question": "For aₙ = 3·2ⁿ⁻¹, the value of a₄ is",
        "options": [
          "12",
          "16",
          "24",
          "32"
        ]
      },
      {
        "number": 2,
        "question": "The common ratio of 3, 6, 12, 24, … is",
        "options": [
          "1",
          "2",
          "3",
          "6"
        ]
      },
      {
        "number": 3,
        "question": "The seventh term of the GP 5, 10, 20, … is",
        "options": [
          "160",
          "240",
          "300",
          "320"
        ]
      },
      {
        "number": 4,
        "question": "The sum of the first five terms of 3, 6, 12, … is",
        "options": [
          "45",
          "63",
          "93",
          "96"
        ]
      },
      {
        "number": 5,
        "question": "The sum to infinity of 8 + 4 + 2 + … is",
        "options": [
          "12",
          "16",
          "20",
          "24"
        ]
      },
      {
        "number": 6,
        "question": "An infinite GP with first term a has a finite sum when",
        "options": [
          "r > 1",
          "r ≥ 1",
          "|r| < 1",
          "|r| > 1"
        ]
      },
      {
        "number": 7,
        "question": "The geometric mean of 4 and 9 is",
        "options": [
          "5",
          "√13",
          "6",
          "13/2"
        ]
      },
      {
        "number": 8,
        "question": "The arithmetic mean of 7 and 15 is",
        "options": [
          "10",
          "11",
          "12",
          "22"
        ]
      },
      {
        "number": 9,
        "question": "If the geometric mean of 4 and b is 10 and b > 0, then b is",
        "options": [
          "20",
          "24",
          "25",
          "40"
        ]
      },
      {
        "number": 10,
        "question": "For positive a and b, equality in AM ≥ GM occurs when",
        "options": [
          "a = b",
          "a + b = 1",
          "ab = 1",
          "a = 2b"
        ]
      },
      {
        "number": 11,
        "question": "Three geometric means are inserted between 2 and 32. The second inserted mean is",
        "options": [
          "4",
          "6",
          "8",
          "16"
        ]
      },
      {
        "number": 12,
        "question": "The sum 1 + 1/3 + 1/9 + 1/27 is",
        "options": [
          "10/9",
          "13/9",
          "13/27",
          "40/27"
        ]
      },
      {
        "number": 13,
        "question": "In the GP 81, 27, 9, …, the term equal to 1 is the",
        "options": [
          "third",
          "fourth",
          "fifth",
          "sixth"
        ]
      },
      {
        "number": 14,
        "question": "The recurring decimal 0.777… is equal to",
        "options": [
          "7/10",
          "7/9",
          "77/90",
          "8/9"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Every infinite geometric progression has a finite sum.",
        "reason": "An infinite GP has a finite sum when the modulus of its common ratio is less than 1."
      },
      {
        "number": 16,
        "assertion": "For positive numbers a and b, (a + b)/2 ≥ √ab.",
        "reason": "The inequality (√a − √b)² ≥ 0 gives a + b ≥ 2√ab."
      }
    ],
    "written": {
      "17": "Insert two geometric means between 3 and 81.",
      "18": "In a GP, the fourth term is 54 and the seventh term is 1458. Find the first term and the common ratio.",
      "19": "Find the sum to infinity of 12 − 6 + 3 − 3/2 + ….",
      "20": "Find the sum 5 + 15 + 45 + … + 3645.",
      "21": "Insert four geometric means between 1 and 243.",
      "22": "Two positive numbers have arithmetic mean 13 and geometric mean 12. Find the numbers.",
      "23": "A ball is dropped from a height of 12 m. After each impact it rises to two-thirds of the preceding height. Find the total distance travelled by the ball before it comes to rest.",
      "24": [
        "(a) Find the amount saved in the second month. [1]",
        "(b) Find the amount saved in the third month. [1]",
        "(c) Find the total saved during the first four months. [2]"
      ]
    },
    "caseStudy": "A student saves ₹500 in the first month and increases the amount saved each month by 10% of the preceding month's amount. Thus the monthly savings form a GP with common ratio 1.1.",
    "answerKey": [
      2,
      1,
      3,
      2,
      1,
      2,
      2,
      1,
      2,
      0,
      2,
      3,
      2,
      1,
      3,
      0
    ],
    "solutions": {
      "17": "Let 3, G₁, G₂, 81 be a GP with ratio r. Then 3r³ = 81, so r³ = 27 and r = 3. Thus G₁ = 9 and G₂ = 27.",
      "18": "Let the first term be a and ratio be r. Then ar³ = 54 and ar⁶ = 1458. Dividing gives r³ = 27, so r = 3. Therefore a = 54/27 = 2.",
      "19": "Here a = 12 and r = −1/2, with |r| < 1. The sum is a/(1 − r) = 12/[1 − (−1/2)] = 8.",
      "20": "The last term satisfies 5·3ⁿ⁻¹ = 3645, so 3ⁿ⁻¹ = 729 = 3⁶ and n = 7. Thus S₇ = 5(3⁷ − 1)/(3 − 1) = 5465.",
      "21": "Let 1, G₁, G₂, G₃, G₄, 243 be a GP. Then r⁵ = 243 = 3⁵, so r = 3. The inserted means are 3, 9, 27 and 81.",
      "22": "If the numbers are x and y, then x + y = 26 and xy = 144. Hence they are roots of t² − 26t + 144 = 0 = (t − 8)(t − 18). The numbers are 8 and 18.",
      "23": "The initial downward distance is 12 m. Rebound heights form the infinite GP 8, 16/3, 32/9, … with ratio 2/3 and sum 8/(1 − 2/3) = 24 m. Every rebound height is travelled upward and downward, so total distance = 12 + 2(24) = 60 m.",
      "24": "(a) Second month = ₹500(1.1) = ₹550. (b) Third month = ₹500(1.1)² = ₹605. (c) The first four amounts are ₹500, ₹550, ₹605 and ₹665.50. Their sum is ₹2,320.50."
    }
  },
  {
    "id": "g11-straight-lines-01",
    "chapter": "Straight Lines",
    "chapterNumber": 9,
    "focus": "Translate geometric information into slope and the appropriate standard form of a line, then verify the result.",
    "mcqs": [
      {
        "number": 1,
        "question": "The slope of the line through (2, 3) and (6, 11) is",
        "options": [
          "1/2",
          "1",
          "2",
          "4"
        ]
      },
      {
        "number": 2,
        "question": "The slope of a line inclined at 45° to the positive x-axis is",
        "options": [
          "0",
          "1",
          "√3",
          "Undefined"
        ]
      },
      {
        "number": 3,
        "question": "Two non-vertical parallel lines have",
        "options": [
          "equal slopes",
          "product of slopes −1",
          "reciprocal slopes",
          "zero slopes only"
        ]
      },
      {
        "number": 4,
        "question": "If two non-vertical lines with slopes m₁ and m₂ are perpendicular, then",
        "options": [
          "m₁ = m₂",
          "m₁m₂ = 1",
          "m₁ + m₂ = 0",
          "m₁m₂ = −1"
        ]
      },
      {
        "number": 5,
        "question": "The equation of the line through (1, −2) with slope 3 is",
        "options": [
          "y − 2 = 3(x + 1)",
          "y + 2 = 3(x − 1)",
          "y + 1 = 3(x − 2)",
          "y − 1 = 3(x + 2)"
        ]
      },
      {
        "number": 6,
        "question": "A line has x-intercept 4 and y-intercept 6. Its intercept form is",
        "options": [
          "x/6 + y/4 = 1",
          "4x + 6y = 1",
          "x/4 + y/6 = 1",
          "x + y = 10"
        ]
      },
      {
        "number": 7,
        "question": "The line parallel to the y-axis and passing through (−3, 5) is",
        "options": [
          "x = −3",
          "y = −3",
          "x = 5",
          "y = 5"
        ]
      },
      {
        "number": 8,
        "question": "The line parallel to the x-axis and passing through (2, 5) is",
        "options": [
          "x = 2",
          "y = 2",
          "x = 5",
          "y = 5"
        ]
      },
      {
        "number": 9,
        "question": "The acute angle between lines of slopes 1 and 3 is",
        "options": [
          "tan⁻¹(1/2)",
          "tan⁻¹2",
          "45°",
          "90°"
        ]
      },
      {
        "number": 10,
        "question": "The perpendicular distance of (2, −1) from 3x − 4y + 5 = 0 is",
        "options": [
          "1",
          "2",
          "3",
          "5"
        ]
      },
      {
        "number": 11,
        "question": "The equation of the line through (2, 3) and (4, 7) is",
        "options": [
          "y − 3 = x − 2",
          "y − 3 = 2(x − 2)",
          "y + 3 = 2(x + 2)",
          "y − 7 = 4(x − 4)"
        ]
      },
      {
        "number": 12,
        "question": "The inclination of the line y = −√3x + 2, measured between 0° and 180°, is",
        "options": [
          "60°",
          "90°",
          "120°",
          "150°"
        ]
      },
      {
        "number": 13,
        "question": "The line through (3, 1) parallel to 2x − 3y + 5 = 0 is",
        "options": [
          "y − 1 = −(3/2)(x − 3)",
          "y − 1 = (2/3)(x − 3)",
          "y + 1 = (2/3)(x + 3)",
          "y − 3 = (2/3)(x − 1)"
        ]
      },
      {
        "number": 14,
        "question": "The distance between y = 2x + 3 and y = 2x − 7 is",
        "options": [
          "√5",
          "2√5",
          "5",
          "10"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Lines with slopes 2 and −1/2 are perpendicular.",
        "reason": "The product of the slopes of two non-vertical perpendicular lines is −1."
      },
      {
        "number": 16,
        "assertion": "The line x = 4 has slope 0.",
        "reason": "A line parallel to the y-axis has undefined slope."
      }
    ],
    "written": {
      "17": "Find the equation of the line through (−2, 5) parallel to the line joining (1, 2) and (4, 8).",
      "18": "Find the acute angle between two lines whose slopes are 1/2 and 2.",
      "19": "Find the perpendicular distance of the point (1, 2) from the line x/3 + y/4 = 1.",
      "20": "A line passes through (2, −3), and its x-intercept is twice its y-intercept. Find its equation in intercept form and then simplify it.",
      "21": "Find the equation of the line through (1, 2) making an angle of 45° with the positive x-axis. Also find its intercepts on the axes.",
      "22": "Find the equation of the line through A(2, −1) and B(5, 5). Hence find its x- and y-intercepts.",
      "23": "For the triangle A(1, 2), B(7, 5), C(4, −1): (a) find the equation of AC; (b) find the perpendicular distance of B from AC; and (c) hence find the area of the triangle.",
      "24": [
        "(a) Find the slope of Road A. [1]",
        "(b) Find the slope of Road B and state the relation between the roads. [1]",
        "(c) Find the coordinates of their intersection. [2]"
      ]
    },
    "caseStudy": "On a coordinate map, Road A passes through (0, 2) and (4, 4), while Road B passes through (0, 6) and (3, 0). Both roads are straight.",
    "answerKey": [
      2,
      1,
      0,
      3,
      1,
      2,
      0,
      3,
      0,
      2,
      1,
      2,
      1,
      1,
      0,
      3
    ],
    "solutions": {
      "17": "The slope of the given line is (8 − 2)/(4 − 1) = 2. A parallel line through (−2, 5) is y − 5 = 2(x + 2).",
      "18": "tan θ = |(2 − 1/2)/(1 + 2·1/2)| = (3/2)/2 = 3/4. Hence the acute angle is θ = tan⁻¹(3/4).",
      "19": "Rewrite the line as 4x + 3y − 12 = 0. The distance is |4(1) + 3(2) − 12|/√(4² + 3²) = 2/5.",
      "20": "Let the y-intercept be b, so the x-intercept is 2b. Using intercept form and the point (2, −3): 2/(2b) − 3/b = 1, so −2/b = 1 and b = −2. Thus the intercept form is x/(−4) + y/(−2) = 1, which simplifies to x + 2y = −4.",
      "21": "The slope is tan 45° = 1. By point–slope form, y − 2 = x − 1, so y = x + 1. Setting y = 0 gives x = −1; setting x = 0 gives y = 1. The intercepts are (−1, 0) and (0, 1).",
      "22": "The slope is (5 + 1)/(5 − 2) = 2. Thus y + 1 = 2(x − 2), or y = 2x − 5. Setting y = 0 gives x = 5/2; setting x = 0 gives y = −5.",
      "23": "(a) Slope of AC is (−1 − 2)/(4 − 1) = −1, so y − 2 = −(x − 1), or x + y − 3 = 0. (b) Distance of B from AC is |7 + 5 − 3|/√2 = 9/√2. (c) AC = √[(4 − 1)² + (−1 − 2)²] = 3√2. Area = 1/2 × 3√2 × 9/√2 = 27/2 square units.",
      "24": "(a) Slope of A = (4 − 2)/(4 − 0) = 1/2. (b) Slope of B = (0 − 6)/(3 − 0) = −2. Their slope product is −1, so the roads are perpendicular. (c) Their equations are y = x/2 + 2 and y = −2x + 6. Solving gives x = 8/5 and y = 14/5. The intersection is (8/5, 14/5)."
    }
  },
  {
    "id": "g11-conic-sections-01",
    "chapter": "Conic Sections",
    "chapterNumber": 10,
    "focus": "Recognise each standard conic, identify its axis and parameters, and connect its equation with focus, directrix and latus rectum.",
    "mcqs": [
      {
        "number": 1,
        "question": "The radius of the circle x² + y² = 25 is",
        "options": [
          "3",
          "5",
          "10",
          "25"
        ]
      },
      {
        "number": 2,
        "question": "The focus of the parabola y² = 12x is",
        "options": [
          "(3, 0)",
          "(−3, 0)",
          "(0, 3)",
          "(0, −3)"
        ]
      },
      {
        "number": 3,
        "question": "The focus of the parabola x² = −8y is",
        "options": [
          "(2, 0)",
          "(−2, 0)",
          "(0, 2)",
          "(0, −2)"
        ]
      },
      {
        "number": 4,
        "question": "The foci of x²/25 + y²/9 = 1 are",
        "options": [
          "(±3, 0)",
          "(±4, 0)",
          "(0, ±4)",
          "(±5, 0)"
        ]
      },
      {
        "number": 5,
        "question": "The eccentricity of x²/25 + y²/9 = 1 is",
        "options": [
          "3/5",
          "4/5",
          "5/4",
          "1"
        ]
      },
      {
        "number": 6,
        "question": "The vertices of x²/16 − y²/9 = 1 are",
        "options": [
          "(±3, 0)",
          "(0, ±3)",
          "(±4, 0)",
          "(0, ±4)"
        ]
      },
      {
        "number": 7,
        "question": "The eccentricity of x²/16 − y²/9 = 1 is",
        "options": [
          "3/4",
          "4/5",
          "1",
          "5/4"
        ]
      },
      {
        "number": 8,
        "question": "The length of the latus rectum of x²/25 + y²/9 = 1 is",
        "options": [
          "6/5",
          "18/5",
          "10",
          "18"
        ]
      },
      {
        "number": 9,
        "question": "The length of the latus rectum of y² = 20x is",
        "options": [
          "5",
          "10",
          "20",
          "40"
        ]
      },
      {
        "number": 10,
        "question": "The directrix of y² = −16x is",
        "options": [
          "x = −4",
          "x = 4",
          "y = −4",
          "y = 4"
        ]
      },
      {
        "number": 11,
        "question": "The circle centred at the origin and passing through (3, 4) is",
        "options": [
          "x² + y² = 5",
          "x² + y² = 7",
          "x² + y² = 25",
          "x² + y² = 49"
        ]
      },
      {
        "number": 12,
        "question": "The degenerate conic x² − y² = 0 represents",
        "options": [
          "a point",
          "the pair of lines y = ±x",
          "one straight line",
          "a circle"
        ]
      },
      {
        "number": 13,
        "question": "The major axis of x²/9 + y²/16 = 1 lies along the",
        "options": [
          "x-axis",
          "y-axis",
          "line y = x",
          "line y = −x"
        ]
      },
      {
        "number": 14,
        "question": "The point (3, 4) lies on",
        "options": [
          "x² + y² = 16",
          "x² + y² = 20",
          "x² + y² = 25",
          "x² + y² = 36"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "The eccentricity of a non-circular ellipse lies between 0 and 1.",
        "reason": "For an ellipse with a > b > 0, c² = a² − b², so c < a."
      },
      {
        "number": 16,
        "assertion": "The focus of x² = 12y is (3, 0).",
        "reason": "For x² = 4ay, the focus is (0, a)."
      }
    ],
    "written": {
      "17": "Find the equation and directrix of the parabola with vertex at the origin and focus (2, 0).",
      "18": "An ellipse has vertices (±5, 0) and foci (±3, 0). Find its standard equation.",
      "19": "For the hyperbola x²/9 − y²/16 = 1, find the foci and eccentricity.",
      "20": "Find the equation of the circle centred at the origin and passing through (6, 8). Also state its intercepts on the coordinate axes.",
      "21": "A point on the parabola y² = 16x has ordinate 4. Find its abscissa and its distance from the focus.",
      "22": "For the ellipse x²/36 + y²/20 = 1, find the foci, eccentricity and length of the latus rectum.",
      "23": "A hyperbola has vertices (±4, 0) and eccentricity 5/4. Find its standard equation, foci, directrices and length of its latus rectum.",
      "24": [
        "(a) Find the focus of the cross-section. [1]",
        "(b) Find its directrix. [1]",
        "(c) At a depth x = 8, find the two y-coordinates on the rim and hence the width of the dish there. [2]"
      ]
    },
    "caseStudy": "A parabolic satellite dish has cross-section y² = 8x, with its vertex at the origin. Distances are measured in metres.",
    "answerKey": [
      1,
      0,
      3,
      1,
      1,
      2,
      3,
      1,
      2,
      1,
      2,
      1,
      1,
      2,
      0,
      3
    ],
    "solutions": {
      "17": "For y² = 4ax, the focus is (a, 0) and directrix is x = −a. Here a = 2. Thus the equation is y² = 8x and the directrix is x = −2.",
      "18": "Here a = 5 and c = 3. For an ellipse, b² = a² − c² = 25 − 9 = 16. Hence the equation is x²/25 + y²/16 = 1.",
      "19": "For x²/a² − y²/b² = 1, c² = a² + b² = 9 + 16 = 25, so c = 5. The foci are (±5, 0) and eccentricity e = c/a = 5/3.",
      "20": "The radius is √(6² + 8²) = 10. Therefore the equation is x² + y² = 100. The intercepts are (±10, 0) and (0, ±10).",
      "21": "Putting y = 4 in y² = 16x gives 16 = 16x, so x = 1. The focus is (4, 0). The distance from (1, 4) to (4, 0) is √[(1 − 4)² + 4²] = 5.",
      "22": "Here a² = 36, b² = 20, so c² = 16 and c = 4. The foci are (±4, 0). The eccentricity is e = c/a = 2/3. The latus-rectum length is 2b²/a = 40/6 = 20/3.",
      "23": "Here a = 4 and e = 5/4, so c = ae = 5. Since c² = a² + b², b² = 25 − 16 = 9. The equation is x²/16 − y²/9 = 1. The foci are (±5, 0), the directrices are x = ±a/e = ±16/5, and the latus-rectum length is 2b²/a = 18/4 = 9/2.",
      "24": "For y² = 4ax, 4a = 8, so a = 2. (a) The focus is (2, 0). (b) The directrix is x = −2. (c) At x = 8, y² = 64, so y = ±8. The width is 8 − (−8) = 16 m."
    }
  },
  {
    "id": "g11-three-dimensional-geometry-01",
    "chapter": "Introduction to Three-dimensional Geometry",
    "chapterNumber": 11,
    "focus": "Read signs and zero coordinates geometrically, then use the three-dimensional distance formula accurately. Section formula is deliberately excluded because CBSE lists it for formative assessment only.",
    "mcqs": [
      {
        "number": 1,
        "question": "The coordinates of the origin in three-dimensional space are",
        "options": [
          "(0, 0, 0)",
          "(1, 0, 0)",
          "(0, 1, 0)",
          "(0, 0, 1)"
        ]
      },
      {
        "number": 2,
        "question": "Which point lies in the yz-plane?",
        "options": [
          "(4, 0, 5)",
          "(0, −3, 5)",
          "(4, −3, 0)",
          "(4, −3, 5)"
        ]
      },
      {
        "number": 3,
        "question": "A general point on the y-axis has the form",
        "options": [
          "(a, 0, 0)",
          "(0, 0, c)",
          "(0, b, 0)",
          "(a, b, 0)"
        ]
      },
      {
        "number": 4,
        "question": "The distance between (1, −2, 3) and (4, 2, 3) is",
        "options": [
          "4",
          "5",
          "√10",
          "√34"
        ]
      },
      {
        "number": 5,
        "question": "The point (−3, 4, −2) lies in the",
        "options": [
          "fifth octant",
          "sixth octant",
          "seventh octant",
          "eighth octant"
        ]
      },
      {
        "number": 6,
        "question": "The distance of the point (2, −3, 6) from the origin is",
        "options": [
          "√41",
          "11",
          "5",
          "7"
        ]
      },
      {
        "number": 7,
        "question": "The perpendicular distance of (4, −2, −5) from the xy-plane is",
        "options": [
          "4",
          "2",
          "5",
          "√45"
        ]
      },
      {
        "number": 8,
        "question": "A point lies below the xy-plane precisely when",
        "options": [
          "x < 0",
          "y < 0",
          "z > 0",
          "z < 0"
        ]
      },
      {
        "number": 9,
        "question": "The reflection of (−2, 4, 5) in the yz-plane is",
        "options": [
          "(2, 4, 5)",
          "(−2, −4, 5)",
          "(−2, 4, −5)",
          "(2, −4, −5)"
        ]
      },
      {
        "number": 10,
        "question": "A rectangular box has mutually perpendicular edge lengths 2, 3 and 6 units. The distance between a pair of opposite vertices is",
        "options": [
          "6",
          "√13",
          "7",
          "11"
        ]
      },
      {
        "number": 11,
        "question": "If A = (a, 0, 0) and B = (0, b, 0), then AB equals",
        "options": [
          "√(a² + b²)",
          "|a + b|",
          "|a − b|",
          "a² + b²"
        ]
      },
      {
        "number": 12,
        "question": "If P = (x, 2, 3) is 4 units from Q = (1, 2, 3), then x is",
        "options": [
          "5 only",
          "−3 only",
          "5 or −3",
          "3 or −5"
        ]
      },
      {
        "number": 13,
        "question": "Which point lies in the second octant?",
        "options": [
          "(2, 3, 4)",
          "(−2, 3, 4)",
          "(−2, −3, 4)",
          "(2, −3, 4)"
        ]
      },
      {
        "number": 14,
        "question": "The distance between P(a, b, c) and Q(−a, −b, −c) is",
        "options": [
          "√(a² + b² + c²)",
          "2(a + b + c)",
          "a² + b² + c²",
          "2√(a² + b² + c²)"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Every point on the z-axis lies in both the xz-plane and the yz-plane.",
        "reason": "The z-axis is the line of intersection of the xz-plane and the yz-plane."
      },
      {
        "number": 16,
        "assertion": "The distance from P to Q is equal to the distance from Q to P.",
        "reason": "Reversing each coordinate difference changes its sign but not its square."
      }
    ],
    "written": {
      "17": "State the coordinate plane containing A(3, −2, 0), the coordinate plane containing B(0, 4, −5), and the coordinate axis containing C(0, −6, 0).",
      "18": "Find the distance between P(2, −1, 3) and Q(5, 3, 3).",
      "19": "If the distance between A(a, 2, −1) and B(1, −2, 2) is √34, find all possible values of a.",
      "20": "Find the point P on the x-axis that is equidistant from A(1, 2, 3) and B(5, −2, 1).",
      "21": "Show that A(1, 1, 1), B(4, 1, 1) and C(4, 5, 1) form a right-angled triangle.",
      "22": "Find the points on the z-axis whose distance from A(3, 0, 1) is 5 units.",
      "23": "For A(1, 2, 3), B(4, 6, 3) and C(4, 6, 15), calculate all three side lengths, prove that ΔABC is right-angled, and find its perimeter.",
      "24": [
        "(a) Which coordinate plane represents the floor? [1]",
        "(b) Find the distance from O to C. [1]",
        "(c) A light is fixed at L(4, 3, 4) and a switch is at S(0, 0, 1). Find the minimum straight length of wire LS. [2]"
      ]
    },
    "caseStudy": "A rectangular room is represented using O(0, 0, 0), X(8, 0, 0), Y(0, 6, 0) and Z(0, 0, 4), measured in metres. The vertex opposite O is C(8, 6, 4).",
    "answerKey": [
      0,
      1,
      2,
      1,
      1,
      3,
      2,
      3,
      0,
      2,
      0,
      2,
      1,
      3,
      0,
      0
    ],
    "solutions": {
      "17": "A has z = 0, so A lies in the xy-plane. B has x = 0, so B lies in the yz-plane. C has x = z = 0, so C lies on the y-axis.",
      "18": "PQ = √[(5 − 2)² + (3 + 1)² + (3 − 3)²] = √(9 + 16) = 5 units.",
      "19": "34 = (a − 1)² + (2 + 2)² + (−1 − 2)² = (a − 1)² + 25. Hence (a − 1)² = 9, so a − 1 = ±3 and a = 4 or −2.",
      "20": "Let P = (x, 0, 0). PA² = (x − 1)² + 13 and PB² = (x − 5)² + 5. Equating gives x² − 2x + 14 = x² − 10x + 30, so 8x = 16 and x = 2. Therefore P = (2, 0, 0).",
      "21": "AB = 3, BC = 4 and AC = √[(4 − 1)² + (5 − 1)²] = 5. Since AB² + BC² = 9 + 16 = 25 = AC², the triangle is right-angled at B.",
      "22": "Let P = (0, 0, z). Then PA² = (0 − 3)² + (z − 1)² = 25. Thus (z − 1)² = 16, so z = 5 or −3. The required points are (0, 0, 5) and (0, 0, −3).",
      "23": "AB = √(3² + 4²) = 5, BC = √(12²) = 12 and AC = √(3² + 4² + 12²) = 13. Since 5² + 12² = 13², ΔABC is right-angled at B. Its perimeter is 5 + 12 + 13 = 30 units.",
      "24": "(a) The floor is the xy-plane. (b) OC = √(8² + 6² + 4²) = √116 = 2√29 m. (c) LS = √[(4 − 0)² + (3 − 0)² + (4 − 1)²] = √34 m."
    }
  },
  {
    "id": "g11-limits-derivatives-01",
    "chapter": "Limits and Derivatives",
    "chapterNumber": 12,
    "focus": "Resolve standard limits and interpret derivatives as slopes and rates of change, using only definition, sum, difference, product and quotient rules. Chain-rule questions are deliberately excluded.",
    "mcqs": [
      {
        "number": 1,
        "question": "lim x→2 (x² − 4)/(x − 2) is",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ]
      },
      {
        "number": 2,
        "question": "lim x→0 sin 5x/sin 2x is",
        "options": [
          "2/5",
          "5/2",
          "3/2",
          "1"
        ]
      },
      {
        "number": 3,
        "question": "lim x→0 (1 − cos x)/x² is",
        "options": [
          "0",
          "1/2",
          "1",
          "2"
        ]
      },
      {
        "number": 4,
        "question": "lim x→1 (x³ − 1)/(x − 1) is",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ]
      },
      {
        "number": 5,
        "question": "lim x→0 (eˣ − 1)/x is",
        "options": [
          "1",
          "e",
          "0",
          "does not exist"
        ]
      },
      {
        "number": 6,
        "question": "lim x→0 ln(1 + x)/x is",
        "options": [
          "0",
          "e",
          "−1",
          "1"
        ]
      },
      {
        "number": 7,
        "question": "If f(x) = x², then f′(3) is",
        "options": [
          "3",
          "5",
          "6",
          "9"
        ]
      },
      {
        "number": 8,
        "question": "A particle has displacement s(t) = t³ − 2t. Its instantaneous velocity at t = 2 is",
        "options": [
          "4",
          "6",
          "8",
          "10"
        ]
      },
      {
        "number": 9,
        "question": "d/dx (x³ + sin x) equals",
        "options": [
          "3x² + cos x",
          "3x² − cos x",
          "x² + cos x",
          "3x + sin x"
        ]
      },
      {
        "number": 10,
        "question": "d/dx (x² sin x) equals",
        "options": [
          "2x cos x",
          "x² cos x",
          "2x sin x + x² cos x",
          "2x sin x − x² cos x"
        ]
      },
      {
        "number": 11,
        "question": "Using the quotient rule on sin x/cos x gives d/dx(tan x) =",
        "options": [
          "cosec²x",
          "sec²x",
          "cot x",
          "1"
        ]
      },
      {
        "number": 12,
        "question": "The slope of the tangent to y = x² at x = −1 is",
        "options": [
          "−2",
          "−1",
          "1",
          "2"
        ]
      },
      {
        "number": 13,
        "question": "lim x→π/2 cos x/(π − 2x) is",
        "options": [
          "−1/2",
          "0",
          "1/2",
          "1"
        ]
      },
      {
        "number": 14,
        "question": "If y = (x² + 1)/(x + 1), then y′ at x = 1 is",
        "options": [
          "0",
          "1/4",
          "1/2",
          "1"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "If lim h→0 [f(a + h) − f(a)]/h exists as a finite number, then f is differentiable at a.",
        "reason": "That limit is the definition of f′(a)."
      },
      {
        "number": 16,
        "assertion": "lim x→0 sin x/x = 1.",
        "reason": "The limit is obtained by direct substitution because sin 0/0 = 1."
      }
    ],
    "written": {
      "17": "Evaluate lim x→1 (x² + 5x − 6)/(x − 1).",
      "18": "Evaluate lim x→0 sin 5x/sin 2x.",
      "19": "Using the definition of derivative, find f′(2) when f(x) = x² − 3x.",
      "20": "Evaluate lim x→0 [√(1 + x) − 1]/x.",
      "21": "Differentiate y = (x² + 1) sin x.",
      "22": "For x ≠ 0, differentiate y = sin x/x.",
      "23": "The displacement of a particle is s(t) = t³ − 6t² + 9t metres. (i) Find its velocity function. (ii) Find the positive times when it is at rest. (iii) Find its velocity at t = 4 seconds.",
      "24": [
        "(a) Find the average rate of change of T from t = 1 to t = 3. [1]",
        "(b) Find the instantaneous rate dT/dt. [1]",
        "(c) Find the instantaneous rates at t = 1 and t = 3, and state whether the temperature is falling or rising at each time. [2]"
      ]
    },
    "caseStudy": "During a controlled experiment, the temperature after t minutes is T(t) = t² − 4t + 20 degrees Celsius, for 0 ≤ t ≤ 4.",
    "answerKey": [
      2,
      1,
      1,
      2,
      0,
      3,
      2,
      3,
      0,
      2,
      1,
      0,
      2,
      2,
      0,
      2
    ],
    "solutions": {
      "17": "Factor x² + 5x − 6 = (x − 1)(x + 6). For x ≠ 1 the expression is x + 6, so the limit is 7.",
      "18": "Write sin 5x/sin 2x = 5/2 · [sin 5x/(5x)] · [2x/sin 2x]. Both bracketed limits are 1, so the answer is 5/2.",
      "19": "f′(2) = lim h→0 {[f(2 + h) − f(2)]/h}. Now f(2 + h) = (2 + h)² − 3(2 + h) = h² + h − 2 and f(2) = −2. Hence the quotient is (h² + h)/h = h + 1, whose limit is 1.",
      "20": "Rationalise: [√(1 + x) − 1]/x = 1/[√(1 + x) + 1] for x ≠ 0. Therefore the limit is 1/2.",
      "21": "By the product rule, y′ = 2x sin x + (x² + 1) cos x.",
      "22": "By the quotient rule, y′ = [x cos x − sin x]/x².",
      "23": "(i) v(t) = ds/dt = 3t² − 12t + 9 = 3(t − 1)(t − 3). (ii) v(t) = 0 at t = 1 s and t = 3 s. (iii) v(4) = 3(16) − 48 + 9 = 9 m/s.",
      "24": "(a) [T(3) − T(1)]/(3 − 1) = (17 − 17)/2 = 0 °C/min. (b) dT/dt = 2t − 4. (c) At t = 1, dT/dt = −2 °C/min, so the temperature is falling; at t = 3, dT/dt = 2 °C/min, so it is rising."
    }
  },
  {
    "id": "g11-statistics-01",
    "chapter": "Statistics",
    "chapterNumber": 13,
    "focus": "Select the correct measure of dispersion, retain frequency weights, and distinguish variance from standard deviation for both ungrouped and grouped data.",
    "mcqs": [
      {
        "number": 1,
        "question": "The range of 4, 8, 6, 11, 3 is",
        "options": [
          "7",
          "8",
          "9",
          "11"
        ]
      },
      {
        "number": 2,
        "question": "The mean deviation about the mean of 2, 4, 6, 8 is",
        "options": [
          "1",
          "3/2",
          "2",
          "5/2"
        ]
      },
      {
        "number": 3,
        "question": "If the same constant is added to every observation, the variance",
        "options": [
          "remains unchanged",
          "increases by that constant",
          "decreases by that constant",
          "is multiplied by that constant"
        ]
      },
      {
        "number": 4,
        "question": "If every observation is multiplied by k, the variance becomes",
        "options": [
          "k times",
          "|k| times",
          "k² times",
          "unchanged"
        ]
      },
      {
        "number": 5,
        "question": "If all observations are equal, their variance is",
        "options": [
          "1",
          "0",
          "equal to the common observation",
          "undefined"
        ]
      },
      {
        "number": 6,
        "question": "The variance of 1, 2, 3 is",
        "options": [
          "1/3",
          "2/3",
          "1",
          "√(2/3)"
        ]
      },
      {
        "number": 7,
        "question": "If the variance is 25, the standard deviation is",
        "options": [
          "25",
          "10",
          "√5",
          "5"
        ]
      },
      {
        "number": 8,
        "question": "For values 1, 2, 3 with respective frequencies 1, 2, 1, the mean is",
        "options": [
          "3/2",
          "2",
          "5/2",
          "3"
        ]
      },
      {
        "number": 9,
        "question": "Mean deviation is always",
        "options": [
          "non-negative",
          "negative",
          "equal to the mean",
          "greater than the range"
        ]
      },
      {
        "number": 10,
        "question": "The variance of 2, 4, 6, 8, 10 is",
        "options": [
          "4",
          "6",
          "8",
          "10"
        ]
      },
      {
        "number": 11,
        "question": "If Σfx = 120 and Σf = 20, the mean is",
        "options": [
          "5",
          "6",
          "10",
          "20"
        ]
      },
      {
        "number": 12,
        "question": "If Σfx² = 500, Σf = 10 and the mean is 6, the variance is",
        "options": [
          "10",
          "12",
          "14",
          "16"
        ]
      },
      {
        "number": 13,
        "question": "The class mark of the interval 20–30 is",
        "options": [
          "20",
          "25",
          "30",
          "50"
        ]
      },
      {
        "number": 14,
        "question": "For values 0, 1, 2 with respective frequencies 1, 2, 1, the standard deviation is",
        "options": [
          "1/2",
          "1",
          "√2",
          "1/√2"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "Adding 10 to every observation does not change the variance.",
        "reason": "The mean also increases by 10, so every deviation from the mean remains unchanged."
      },
      {
        "number": 16,
        "assertion": "Mean deviation about the mean can be negative.",
        "reason": "Mean deviation uses absolute deviations, each of which is non-negative."
      }
    ],
    "written": {
      "17": "For the data 12, 7, 15, 10, 6, find the range and the mean deviation about the mean.",
      "18": "Find the variance and standard deviation of 2, 2, 4, 4.",
      "19": "The values 1, 2 and 5 have frequencies 2, k and 1 respectively. If the mean is 9/4, find k.",
      "20": "Find the mean deviation about the mean for 1, 3, 5, 7, 9.",
      "21": "The values 10, 20 and 30 have frequencies 2, 3 and 5 respectively. Find the mean, variance and standard deviation.",
      "22": "For the grouped distribution with class intervals 0–10, 10–20, 20–30 and frequencies 2, 4, 2 respectively, find the variance and standard deviation.",
      "23": "For values x = 10, 20, 30, 40, 50 with respective frequencies f = 1, 2, 4, 2, 1, find the mean, mean deviation about the mean, variance and standard deviation.",
      "24": [
        "(a) Find the range. [1]",
        "(b) Find the mean. [1]",
        "(c) Find the variance and standard deviation. [2]"
      ]
    },
    "caseStudy": "The travel times, in minutes, for five school-bus runs on the same route were 20, 22, 24, 26 and 28.",
    "answerKey": [
      1,
      2,
      0,
      2,
      1,
      1,
      3,
      1,
      0,
      2,
      1,
      2,
      1,
      3,
      0,
      3
    ],
    "solutions": {
      "17": "The mean is (12 + 7 + 15 + 10 + 6)/5 = 10. Range = 15 − 6 = 9. Mean deviation about 10 = (2 + 3 + 5 + 0 + 4)/5 = 14/5 = 2.8.",
      "18": "The mean is 3. The squared deviations are 1, 1, 1, 1, so variance = 4/4 = 1 and standard deviation = √1 = 1.",
      "19": "The total frequency is k + 3 and Σfx = 2(1) + k(2) + 1(5) = 7 + 2k. Thus (7 + 2k)/(k + 3) = 9/4. Hence 28 + 8k = 9k + 27, giving k = 1.",
      "20": "The mean is 5. The absolute deviations are 4, 2, 0, 2, 4. Hence mean deviation = 12/5 = 2.4.",
      "21": "N = 10, Σfx = 230, so mean = 23. Also Σfx² = 5900. Variance = 5900/10 − 23² = 590 − 529 = 61. Standard deviation = √61.",
      "22": "The class marks are 5, 15, 25 and N = 8. The mean is [2(5) + 4(15) + 2(25)]/8 = 15. Variance = [2(5 − 15)² + 4(0)² + 2(25 − 15)²]/8 = 50. Standard deviation = √50 = 5√2.",
      "23": "By symmetry, the mean is 30. N = 10. The sum of weighted absolute deviations is 1(20) + 2(10) + 4(0) + 2(10) + 1(20) = 80, so mean deviation = 8. The sum of weighted squared deviations is 1(400) + 2(100) + 0 + 2(100) + 1(400) = 1200, so variance = 120 and standard deviation = √120 = 2√30.",
      "24": "(a) Range = 28 − 20 = 8 minutes. (b) Mean = 120/5 = 24 minutes. (c) Variance = [16 + 4 + 0 + 4 + 16]/5 = 8 min², and standard deviation = √8 = 2√2 minutes."
    }
  },
  {
    "id": "g11-probability-01",
    "chapter": "Probability",
    "chapterNumber": 14,
    "focus": "Translate not, and and or into complements, intersections and unions, then apply the axioms and addition rule without double-counting. Questions do not assess the formative-only construction of sample spaces.",
    "mcqs": [
      {
        "number": 1,
        "question": "For every event E, its probability satisfies",
        "options": [
          "P(E) < 0",
          "P(E) > 1",
          "0 ≤ P(E) ≤ 1",
          "P(E) is an integer"
        ]
      },
      {
        "number": 2,
        "question": "P(not A) equals",
        "options": [
          "1 − P(A)",
          "1 + P(A)",
          "P(A)",
          "−P(A)"
        ]
      },
      {
        "number": 3,
        "question": "If P(A) = 0.35, then P(not A) is",
        "options": [
          "0.35",
          "0.55",
          "0.65",
          "1.35"
        ]
      },
      {
        "number": 4,
        "question": "If A and B are mutually exclusive, then P(A ∩ B) is",
        "options": [
          "0",
          "1",
          "P(A) + P(B)",
          "P(A)P(B)"
        ]
      },
      {
        "number": 5,
        "question": "If A and B are exhaustive events, then P(A ∪ B) is",
        "options": [
          "0",
          "P(A)P(B)",
          "P(A) + P(B)",
          "1"
        ]
      },
      {
        "number": 6,
        "question": "For any two events A and B, P(A ∪ B) equals",
        "options": [
          "P(A) + P(B)",
          "P(A) + P(B) − P(A ∩ B)",
          "P(A ∩ B) − P(A)",
          "1 − P(A ∩ B)"
        ]
      },
      {
        "number": 7,
        "question": "If P(A) = 0.6, P(B) = 0.5 and P(A ∩ B) = 0.2, then P(A ∪ B) is",
        "options": [
          "0.3",
          "0.7",
          "0.9",
          "1.1"
        ]
      },
      {
        "number": 8,
        "question": "If P(A ∪ B) = 0.8, P(A) = 0.5 and P(B) = 0.4, then P(A ∩ B) is",
        "options": [
          "0.1",
          "0.2",
          "0.3",
          "0.9"
        ]
      },
      {
        "number": 9,
        "question": "Mutually exclusive events A and B have probabilities 0.3 and 0.4. Then P(A ∪ B) is",
        "options": [
          "0.1",
          "0.7",
          "0.12",
          "1"
        ]
      },
      {
        "number": 10,
        "question": "If A ⊆ B, then",
        "options": [
          "A ∪ B = A",
          "A ∩ B = B",
          "A ∩ B = A",
          "A and B are mutually exclusive"
        ]
      },
      {
        "number": 11,
        "question": "An integer is selected at random from 1 to 20. The probability that it is a multiple of 3 is",
        "options": [
          "1/5",
          "3/10",
          "1/3",
          "2/5"
        ]
      },
      {
        "number": 12,
        "question": "For an event A and its complement A′, P(A ∪ A′) is",
        "options": [
          "0",
          "P(A)",
          "P(A′)",
          "1"
        ]
      },
      {
        "number": 13,
        "question": "If P(A ∪ B) = 0.72, the probability that neither A nor B occurs is",
        "options": [
          "0.18",
          "0.22",
          "0.28",
          "0.72"
        ]
      },
      {
        "number": 14,
        "question": "Mutually exclusive events A and B have P(A) = 0.45 and P(B) = 0.30. The probability that exactly one occurs is",
        "options": [
          "0.75",
          "0.15",
          "0.135",
          "1"
        ]
      }
    ],
    "assertions": [
      {
        "number": 15,
        "assertion": "If two events are both mutually exclusive and exhaustive, each is the complement of the other.",
        "reason": "Their intersection is empty and their union is the certain event."
      },
      {
        "number": 16,
        "assertion": "P(A ∪ B) = P(A) + P(B) for every pair of events A and B.",
        "reason": "When A and B are mutually exclusive, P(A ∩ B) = 0 and the addition rule reduces to P(A ∪ B) = P(A) + P(B)."
      }
    ],
    "written": {
      "17": "If P(E) = 0.68, find P(not E) and verify that the two probabilities add to 1.",
      "18": "Mutually exclusive events A and B have P(A) = 0.35 and P(B) = 0.25. Find the probability that one of them occurs and the probability that neither occurs.",
      "19": "If P(A) = 0.5, P(B) = 0.4 and P(A ∪ B) = 0.7, find P(A ∩ B).",
      "20": "An integer is selected at random from 1 to 30. Find the probability that it is divisible by 2 or by 5.",
      "21": "One card is drawn from a standard deck of 52 cards. Find the probability that it is a king or a heart.",
      "22": "In a class of 40 students, 22 like cricket, 18 like badminton and 10 like both. If a student is selected at random, find the probabilities that the student (i) likes at least one game, (ii) likes neither game, and (iii) likes exactly one game.",
      "23": "For two events A and B, P(A) = 0.55, P(B) = 0.45 and P(A ∩ B) = 0.25. Find (i) P(A ∪ B), (ii) the probability of neither A nor B, (iii) the probability of A only, (iv) the probability of B only, and (v) the probability of exactly one of A or B.",
      "24": [
        "(a) Find the probability that a selected student uses a bus or a bicycle. [1]",
        "(b) Find the probability that the student uses neither. [1]",
        "(c) Find the probability that the student uses exactly one of these two modes. [2]"
      ]
    },
    "caseStudy": "At a school of 120 students, 70 students use a bus, 45 use a bicycle on at least some days, and 20 use both modes. One student is selected at random.",
    "answerKey": [
      2,
      0,
      2,
      0,
      3,
      1,
      2,
      0,
      1,
      2,
      1,
      3,
      2,
      0,
      0,
      3
    ],
    "solutions": {
      "17": "P(not E) = 1 − P(E) = 1 − 0.68 = 0.32. Also 0.68 + 0.32 = 1, as required.",
      "18": "Since A and B are mutually exclusive, P(A ∪ B) = 0.35 + 0.25 = 0.60. Therefore the probability of neither is 1 − 0.60 = 0.40.",
      "19": "By P(A ∪ B) = P(A) + P(B) − P(A ∩ B), 0.7 = 0.5 + 0.4 − P(A ∩ B). Hence P(A ∩ B) = 0.2.",
      "20": "There are 15 multiples of 2, 6 multiples of 5 and 3 multiples of both 2 and 5. Hence the favourable count is 15 + 6 − 3 = 18, and the probability is 18/30 = 3/5.",
      "21": "There are 4 kings and 13 hearts, with the king of hearts counted in both. Thus the favourable count is 4 + 13 − 1 = 16, so the probability is 16/52 = 4/13.",
      "22": "At least one = 22 + 18 − 10 = 30 students, so the probability is 30/40 = 3/4. Neither = 10 students, so its probability is 1/4. Exactly one = (22 − 10) + (18 − 10) = 20 students, so its probability is 1/2.",
      "23": "(i) P(A ∪ B) = 0.55 + 0.45 − 0.25 = 0.75. (ii) Neither = 1 − 0.75 = 0.25. (iii) A only = 0.55 − 0.25 = 0.30. (iv) B only = 0.45 − 0.25 = 0.20. (v) Exactly one = 0.30 + 0.20 = 0.50.",
      "24": "(a) The union contains 70 + 45 − 20 = 95 students, so the probability is 95/120 = 19/24. (b) Neither contains 120 − 95 = 25 students, so the probability is 25/120 = 5/24. (c) Exactly one contains (70 − 20) + (45 − 20) = 75 students, so the probability is 75/120 = 5/8."
    }
  }
];

export const grade11PaperDefinitions: Record<string, PaperDefinition> = Object.fromEntries(
  seeds.map(({ answerKey: _answerKey, solutions: _solutions, ...paper }) => [paper.id, {
    ...paper,
    grade: 11,
    book: 'NCERT Mathematics',
    paperNumber: '01',
  }]),
);

export const grade11PaperAssessments = Object.fromEntries(seeds.map((paper) => [paper.id, {
  title: `${paper.chapter} · Grade 11 · Paper 01`,
  mcqAnswerKey: Object.fromEntries(paper.answerKey.map((answer, index) => [index + 1, answer])),
  writtenSolutions: paper.solutions,
}]));
