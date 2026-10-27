// Original chapter practice, aligned to the CBSE Class XI 2026–27 summative syllabus.
// This is a 30-mark chapter test, not an official CBSE question paper.
export const relationsPracticePaper = [
  { number: 1, marks: 1, section: 'A', question: String.raw`If $(2x-y,\,x+y)=(4,\,5)$, find $xy$.`, options: ['$3$', '$6$', '$9$', '$15$'], solution: String.raw`B. Adding the equations gives $3x=9$, so $x=3$, $y=2$ and $xy=6$. [1]` },
  { number: 2, marks: 1, section: 'A', question: String.raw`Let $A=\{1,2\}$ and $B=\{2,3,4\}$. Find $n\big((A\times B)\cap(B\times A)\big)$.`, options: ['$1$', '$2$', '$6$', '$12$'], solution: String.raw`A. A pair belongs to both products only when both coordinates belong to $A\cap B=\{2\}$. The intersection is $\{(2,2)\}$, with one element. [1]` },
  { number: 3, marks: 1, section: 'A', question: String.raw`The domain of $f(x)=\dfrac{\sqrt{x+2}}{x-1}$ is`, options: [String.raw`$[-2,\infty)$`, String.raw`$(-2,1)\cup(1,\infty)$`, String.raw`$[-2,1)\cup(1,\infty)$`, String.raw`$(-\infty,-2]\setminus\{1\}$`], solution: String.raw`C. The square root requires $x\geq-2$ and the denominator requires $x\neq1$. Thus $D_f=[-2,1)\cup(1,\infty)$. [1]` },
  { number: 4, marks: 1, section: 'A', question: String.raw`For $x\in\mathbb R\setminus\mathbb Z$, the value of $\lfloor x\rfloor+\lfloor-x\rfloor$ is`, options: ['$0$', '$1$', '$-1$', String.raw`$2\lfloor x\rfloor$`], solution: String.raw`C. If $n<x<n+1$ for an integer $n$, then $-n-1<-x<-n$. The two floors are $n$ and $-n-1$, whose sum is $-1$. [1]` },
  { number: 5, marks: 1, section: 'A', question: String.raw`Assertion: $f(x)=\dfrac{x^2-4}{x-2}$ and $g(x)=x+2$, each on its largest real domain and with codomain $\mathbb R$, are equal functions.
Reason: Equal functions must have the same domain and the same value at every element of that domain.`, assertion: true, solution: String.raw`D. The assertion is false and the reason is true. $D_f=\mathbb R\setminus\{2\}$, whereas $D_g=\mathbb R$. Cancelling a factor does not restore an excluded input. [1]` },
  { number: 6, marks: 1, section: 'A', question: String.raw`Assertion: For $f:\mathbb R\to\mathbb R$, $f(x)=(x-3)^2+2$, the range is $[2,\infty)$.
Reason: $(x-3)^2$ takes every non-negative real value as $x$ varies over $\mathbb R$.`, assertion: true, solution: String.raw`A. Both statements are true and the reason explains the assertion. Adding $2$ shifts the set of outputs from $[0,\infty)$ to $[2,\infty)$. [1]` },
  { number: 7, marks: 2, section: 'B', question: String.raw`Let $A=\{-2,-1,0,1,2\}$, $B=\{0,1,4,9\}$ and $R=\{(x,y)\in A\times B:y=x^2\}$. Write $R$ in roster form. State its domain, codomain and range, and decide whether it defines a function from $A$ to $B$.`, solution: String.raw`$R=\{(-2,4),(-1,1),(0,0),(1,1),(2,4)\}$. [1]
Domain $=A$, codomain $=B$, range $=\{0,1,4\}$. It is a function because every element of $A$ has exactly one image; different inputs may have the same image. [1]` },
  { number: 8, marks: 2, section: 'B', question: String.raw`Find the largest real domain of $h(x)=\dfrac{1}{\sqrt{9-x^2}}$. Explain whether the endpoints belong to the domain.`, solution: String.raw`The denominator must be real and non-zero, so $9-x^2>0$. [1]
Thus $x^2<9$, giving $-3<x<3$ and $D_h=(-3,3)$. At $x=\pm3$ the denominator is zero, so neither endpoint is included. [1]` },
  { number: 9, marks: 2, section: 'B', question: String.raw`For $p(x)=\log_2(x-1)$, find the domain and the value of $x$ for which $p(x)=3$.
OR
For $q(x)=2^x+1$, find the range and the value of $x$ for which $q(x)=9$.`, solution: String.raw`First option: $x-1>0$, so $D_p=(1,\infty)$. [1] $\log_2(x-1)=3\Rightarrow x-1=8\Rightarrow x=9$. [1]
OR: $2^x$ takes every positive real value, so the range of $q$ is $(1,\infty)$. [1] $2^x+1=9\Rightarrow2^x=8\Rightarrow x=3$. [1]` },
  { number: 10, marks: 3, section: 'C', question: String.raw`Let $A=\{1,2,3\}$ and $B=\{2,4,6\}$. Define $R=\{(x,y)\in A\times B:x<y\}$. List all ordered pairs of $R$, state its domain and range, and explain why $R$ is not a function from $A$ to $B$.`, solution: String.raw`$R=\{(1,2),(1,4),(1,6),(2,4),(2,6),(3,4),(3,6)\}$. [1]
Domain $=\{1,2,3\}$ and range $=\{2,4,6\}$. [1]
It is not a function: the input $1$, for example, has three distinct images $2,4,6$. A function permits exactly one image per input. [1]` },
  { number: 11, marks: 3, section: 'C', question: String.raw`Let $f(x)=\sqrt{x-1}$ and $g(x)=\sqrt{5-x}$, each on its largest real domain. Find the domains of $f+g$, $fg$ and $f/g$. Justify any difference between them.`, solution: String.raw`$D_f=[1,\infty)$ and $D_g=(-\infty,5]$, so $D_{f+g}=D_f\cap D_g=[1,5]$. [1]
The product is also defined on the intersection: $D_{fg}=[1,5]$. [1]
For the quotient, $g(x)\neq0$ additionally requires $x\neq5$. Hence $D_{f/g}=[1,5)$. At $x=1$ the numerator is zero but the denominator is $2$, so this endpoint remains. [1]` },
  { number: 12, marks: 3, section: 'C', question: String.raw`Sketch $y=|x-2|-1$. State its vertex and intercepts, and find its range when the domain is restricted to $[0,5]$.
OR
Sketch $y=\lfloor x\rfloor$ on $[-1,2)$. Clearly indicate open and closed endpoints, and state the range.`, solution: String.raw`First option: The graph consists of $y=1-x$ for $x\leq2$ and $y=x-3$ for $x\geq2$, meeting at $(2,-1)$; draw the V-shaped graph. [1]
The intercepts are $(1,0)$, $(3,0)$ and $(0,1)$. [1]
On $[0,5]$ the minimum is $-1$ at $x=2$ and the maximum is $2$ at $x=5$; every intermediate value occurs. Range $=[-1,2]$. [1]
OR: Draw horizontal segments $y=-1$ on $[-1,0)$, $y=0$ on $[0,1)$ and $y=1$ on $[1,2)$. [1] Each segment has a closed left endpoint and an open right endpoint. [1] Range $=\{-1,0,1\}$. [1]` },
  { number: 13, marks: 5, section: 'D', question: String.raw`Consider $f(x)=\dfrac{2x-3}{x+1}$ on its largest real domain, with codomain $\mathbb R$.
(a) Find its domain. [1]
(b) Write $f(x)$ in the form $a+\dfrac{b}{x+1}$. [1]
(c) Prove that $2$ is not in its range. [1]
(d) For an arbitrary $y\neq2$, find an allowed input $x$ for which $f(x)=y$. Hence state the range. [2]`, solution: String.raw`(a) $x+1\neq0$, so $D_f=\mathbb R\setminus\{-1\}$. [1]
(b) $2x-3=2(x+1)-5$, giving $f(x)=2-\dfrac5{x+1}$. [1]
(c) $f(x)=2$ would give $2x-3=2x+2$, or $-3=2$, a contradiction. [1]
(d) $y(x+1)=2x-3\Rightarrow x=\dfrac{y+3}{2-y}$ for $y\neq2$. [1] This input is allowed because $x+1=\dfrac5{2-y}\neq0$. Thus every $y\neq2$ occurs, and the range is $\mathbb R\setminus\{2\}$. [1]` },
  { number: 14, marks: 4, section: 'E', question: String.raw`A parcel service charges ₹40 for a mass up to and including 1 kg, and ₹15 for every additional kilogram or part of a kilogram. It accepts parcels with real mass $m$ satisfying $0<m\leq4$. Let $C(m)$ be the charge in rupees.
(a) Find $C(1)$ and $C(1.01)$. [1]
(b) Write $C(m)$ as a piecewise function on its complete domain. [2]
(c) State its range. Is $C$ a function even though two different masses can have the same charge? Explain. [1]`, solution: String.raw`(a) $C(1)=40$ and $C(1.01)=55$. [1]
(b) $C(m)=\begin{cases}40&0<m\leq1\\55&1<m\leq2\\70&2<m\leq3\\85&3<m\leq4.\end{cases}$ Award ½ mark per correct value with its interval. [2]
(c) Range $=\{40,55,70,85\}$. [½] Yes: every allowed mass has exactly one charge; equal charges for different masses do not violate the definition of a function. [½]` },
];
