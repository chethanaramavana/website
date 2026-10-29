import type { MarkingStep } from './assessment';

// Award one alternative only where a question offers an OR choice.
export const relationsMarking: Record<number, MarkingStep[]> = {
  17: [
    { criterion: 'All five ordered pairs of $R$ are correct.', marks: 1 },
    { criterion: String.raw`Domain $=A$, codomain $=B$, range $=\{0,1,4\}$; a function because each input has exactly one image.`, marks: 1 },
  ],
  18: [
    { criterion: 'Requires $9-x^2>0$ because the square root is in the denominator.', marks: 1 },
    { criterion: String.raw`Obtains $D_h=(-3,3)$ and excludes $x=\pm3$ because the denominator is zero.`, marks: 1 },
  ],
  19: [
    { criterion: String.raw`First option: domain $(1,\infty)$. OR: range $(1,\infty)$, with justification.`, marks: 1 },
    { criterion: 'First option: $x-1=8$, hence $x=9$. OR: $2^x=8$, hence $x=3$. Mark only the chosen option.', marks: 1 },
  ],
  20: [
    { criterion: 'Lists all seven ordered pairs correctly.', marks: 1 },
    { criterion: String.raw`Domain $=\{1,2,3\}$ and range $=\{2,4,6\}$.`, marks: 1 },
    { criterion: 'Explains that one input has multiple images, so the relation is not a function.', marks: 1 },
  ],
  21: [
    { criterion: String.raw`Finds $D_f=[1,\infty)$, $D_g=(-\infty,5]$ and $D_{f+g}=[1,5]$.`, marks: 1 },
    { criterion: 'Finds $D_{fg}=[1,5]$.', marks: 1 },
    { criterion: String.raw`Finds $D_{f/g}=[1,5)$, excluding $5$ since $g(5)=0$.`, marks: 1 },
  ],
  22: [
    { criterion: 'First option: correct V-shaped graph with vertex $(2,-1)$. OR: three horizontal segments at $-1,0,1$.', marks: 1 },
    { criterion: 'First option: intercepts $(1,0)$, $(3,0)$ and $(0,1)$. OR: closed left and open right endpoints.', marks: 1 },
    { criterion: String.raw`First option: range $[-1,2]$ on $[0,5]$. OR: range $\{-1,0,1\}$. Mark only the chosen option.`, marks: 1 },
  ],
  23: [
    { criterion: String.raw`(a) Domain $\mathbb R\setminus\{-1\}$.`, marks: 1 },
    { criterion: String.raw`(b) Rewrites $f(x)=2-\dfrac5{x+1}$.`, marks: 1 },
    { criterion: '(c) Shows $f(x)=2$ leads to $-3=2$, a contradiction.', marks: 1 },
    { criterion: String.raw`(d) Solves $f(x)=y$ to obtain $x=\dfrac{y+3}{2-y}$.`, marks: 1 },
    { criterion: String.raw`Checks $x+1=\dfrac5{2-y}\neq0$ and concludes range $\mathbb R\setminus\{2\}$.`, marks: 1 },
  ],
  24: [
    { criterion: '(a) $C(1)=40$ and $C(1.01)=55$.', marks: 1 },
    { criterion: '(b) Correct piecewise rule: award ½ mark for each correct charge together with its interval.', marks: 2 },
    { criterion: String.raw`(c) Range $\{40,55,70,85\}$.`, marks: 0.5 },
    { criterion: 'Explains that each allowed mass has exactly one charge, so this is a function.', marks: 0.5 },
  ],
};
