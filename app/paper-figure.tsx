import type { ReactNode } from 'react';

/** Exam-style figures for the CBSE Class 10 sample papers. Geometry is fixed per kind; the labels come from the paper data. */
import { type PaperFigureSpec } from '@/lib/paper-figure-spec';
export type { PaperFigureSpec } from '@/lib/paper-figure-spec';

const ink = '#1d2b4f', pale = '#f6efe0', accent = '#c0661a', soft = '#9aa6bf';
type P = [number, number];
const rad = (d: number) => d * Math.PI / 180;
const T = (x: number, y: number, s: ReactNode, a: 'start' | 'middle' | 'end' = 'middle', c = ink, size = 13) => s === undefined || s === '' ? null : <text x={x} y={y} textAnchor={a} fill={c} fontSize={size} fontFamily="Georgia, 'Times New Roman', serif" stroke="none">{s}</text>;
const L = (a: P, b: P, dashed = false, c = ink, w = 1.8) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeDasharray={dashed ? '5 4' : undefined} />;
const dot = (p: P) => <circle cx={p[0]} cy={p[1]} r="2.6" fill={ink} />;
const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** A label beside segment ab, pushed away from point away. */
const side = (a: P, b: P, s: string | undefined, away: P, gap = 13) => {
  if (!s) return null;
  const m = mid(a, b), dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len, ny = dx / len;
  if ((m[0] + nx - away[0]) ** 2 + (m[1] + ny - away[1]) ** 2 < (m[0] - away[0]) ** 2 + (m[1] - away[1]) ** 2) { nx = -nx; ny = -ny; }
  return T(m[0] + nx * gap, m[1] + ny * gap + 4, s);
};
/** Angle arc at vertex v between rays to a and b, with a label. */
const angle = (v: P, a: P, b: P, s?: string, r = 22) => {
  if (!s) return null;
  const t1 = Math.atan2(a[1] - v[1], a[0] - v[0]), t2 = Math.atan2(b[1] - v[1], b[0] - v[0]);
  let d = t2 - t1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
  const p1: P = [v[0] + r * Math.cos(t1), v[1] + r * Math.sin(t1)], p2: P = [v[0] + r * Math.cos(t2), v[1] + r * Math.sin(t2)], tm = t1 + d / 2, lr = r + 14;
  return <g><path d={`M${p1[0]} ${p1[1]}A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${p2[0]} ${p2[1]}`} fill="none" stroke={accent} strokeWidth="1.6" />{T(v[0] + lr * Math.cos(tm), v[1] + lr * Math.sin(tm) + 4, s, 'middle', accent)}</g>;
};
const rightMark = (v: P, a: P, b: P, s = 9) => {
  const u = (p: P): P => { const dx = p[0] - v[0], dy = p[1] - v[1], l = Math.hypot(dx, dy) || 1; return [dx / l * s, dy / l * s]; };
  const ua = u(a), ub = u(b);
  return <path d={`M${v[0] + ua[0]} ${v[1] + ua[1]}L${v[0] + ua[0] + ub[0]} ${v[1] + ua[1] + ub[1]}L${v[0] + ub[0]} ${v[1] + ub[1]}`} fill="none" stroke={ink} strokeWidth="1.3" />;
};
const name = (p: P, s: string | undefined, dx: number, dy: number) => T(p[0] + dx, p[1] + dy, s, 'middle', ink, 14);
const poly = (pts: P[], fill = pale) => <polygon points={pts.map(p => p.join(',')).join(' ')} fill={fill} stroke={ink} strokeWidth="1.8" />;
const ground = (x1: number, x2: number, y: number) => <g>{L([x1, y], [x2, y])}{Array.from({ length: Math.floor((x2 - x1) / 14) }, (_, i) => <line key={i} x1={x1 + 6 + i * 14} y1={y} x2={x1 + i * 14} y2={y + 6} stroke={soft} strokeWidth="1" />)}</g>;
const tower = (x: number, top: number, base: number, w = 14) => <rect x={x - w / 2} y={top} width={w} height={base - top} fill={pale} stroke={ink} strokeWidth="1.6" />;
const dim = (a: P, b: P, s: string | undefined, off: number) => {
  if (!s) return null;
  const horizontal = Math.abs(a[1] - b[1]) < 1;
  const A: P = horizontal ? [a[0], a[1] + off] : [a[0] + off, a[1]], B: P = horizontal ? [b[0], b[1] + off] : [b[0] + off, b[1]];
  const m = mid(A, B);
  return <g>{L(A, B, false, soft, 1.2)}{L([A[0] - (horizontal ? 0 : 4), A[1] - (horizontal ? 4 : 0)], [A[0] + (horizontal ? 0 : 4), A[1] + (horizontal ? 4 : 0)], false, soft, 1.2)}{L([B[0] - (horizontal ? 0 : 4), B[1] - (horizontal ? 4 : 0)], [B[0] + (horizontal ? 0 : 4), B[1] + (horizontal ? 4 : 0)], false, soft, 1.2)}{horizontal ? T(m[0], m[1] + (off > 0 ? 15 : -6), s) : T(m[0] + (off > 0 ? 6 : -6), m[1] + 4, s, off > 0 ? 'start' : 'end')}</g>;
};

function draw(spec: PaperFigureSpec): ReactNode {
  const m = spec.marks ?? {}, v = spec.values ?? [], n = (i: number, d: string) => spec.names?.[i] ?? d;
  switch (spec.kind) {
    case 'tangents': {
      const O: P = [110, 112], r = 62, Pp: P = [310, 112], d = Pp[0] - O[0], th = Math.acos(r / d);
      const A: P = [O[0] + r * Math.cos(th), O[1] - r * Math.sin(th)], B: P = [O[0] + r * Math.cos(th), O[1] + r * Math.sin(th)];
      const one = m.one === 'yes';
      return <g><circle cx={O[0]} cy={O[1]} r={r} fill={pale} stroke={ink} strokeWidth="1.8" />{L(Pp, A)}{!one && L(Pp, B)}{L(O, A)}{!one && L(O, B)}{L(O, Pp, true, soft)}{m.chord === 'yes' && L(A, B, false, ink, 1.4)}{rightMark(A, O, Pp)}{!one && rightMark(B, O, Pp)}{dot(O)}{dot(Pp)}{dot(A)}{!one && dot(B)}
        {name(O, n(0, 'O'), -14, 4)}{name(Pp, n(1, 'P'), 13, 5)}{name(A, n(2, 'A'), -2, -10)}{!one && name(B, n(3, 'B'), -2, 22)}
        {angle(Pp, A, B, m.P, 30)}{angle(O, A, B, m.O, 20)}{side(O, A, m.r, Pp)}{side(A, Pp, m.PA, O)}{m.OP && T((O[0] + Pp[0]) / 2 + 20, O[1] + 16, m.OP)}</g>;
    }
    case 'concentric': {
      const O: P = [180, 100], R = 88, r = 50, h = Math.sqrt(R * R - r * r), M: P = [O[0], O[1] + r], A: P = [O[0] - h, M[1]], B: P = [O[0] + h, M[1]];
      return <g><circle cx={O[0]} cy={O[1]} r={R} fill={pale} stroke={ink} strokeWidth="1.8" /><circle cx={O[0]} cy={O[1]} r={r} fill="white" stroke={ink} strokeWidth="1.8" />{L(A, B, false, accent, 2.2)}{L(O, M)}{L(O, B)}{rightMark(M, O, B)}{dot(O)}{dot(A)}{dot(B)}{dot(M)}
        {name(O, n(0, 'O'), 0, -9)}{name(A, n(1, 'A'), -10, 14)}{name(B, n(2, 'B'), 10, 14)}{name(M, n(3, 'M'), 0, 17)}{side(O, M, m.r, A, 12)}{side(O, B, m.R, A, 12)}</g>;
    }
    case 'bpt': {
      const A: P = [175, 22], B: P = [40, 192], C: P = [325, 192], t = 0.42, D = lerp(A, B, t), E = lerp(A, C, t), G: P = [180, 130];
      return <g>{poly([A, B, C])}{L(D, E, false, accent, 2.2)}{[A, B, C, D, E].map((p, i) => <g key={i}>{dot(p)}</g>)}
        {name(A, n(0, 'A'), 0, -7)}{name(B, n(1, 'B'), -8, 15)}{name(C, n(2, 'C'), 8, 15)}{name(D, n(3, 'D'), -13, 0)}{name(E, n(4, 'E'), 13, 0)}
        {side(A, D, m.AD, G)}{side(D, B, m.DB, G)}{side(A, E, m.AE, G)}{side(E, C, m.EC, G)}{m.DE && T((D[0] + E[0]) / 2, D[1] + 17, m.DE)}{m.BC && T(180, 211, m.BC)}</g>;
    }
    case 'sector':
    case 'annulus-sector':
    case 'segment': {
      const th = Math.min(300, Math.max(15, v[0] ?? 60)), O: P = [180, spec.kind === 'segment' ? 110 : 115], R = spec.kind === 'segment' ? 90 : 98, a1 = 90 - th / 2, a2 = 90 + th / 2;
      const at = (a: number, rr = R): P => [O[0] + rr * Math.cos(rad(a)), O[1] - rr * Math.sin(rad(a))];
      const big = th > 180 ? 1 : 0, P1 = at(a1), P2 = at(a2);
      const ratio = Math.min(0.85, Math.max(0.2, v[1] ?? 0.5)), q1 = at(a1, R * ratio), q2 = at(a2, R * ratio);
      const sectorPath = `M${O[0]} ${O[1]}L${P1[0]} ${P1[1]}A${R} ${R} 0 ${big} 0 ${P2[0]} ${P2[1]}Z`;
      return <g><circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={soft} strokeWidth="1.3" strokeDasharray={spec.kind === 'segment' ? undefined : '5 4'} />
        {spec.kind === 'sector' && <path d={sectorPath} fill={pale} stroke={ink} strokeWidth="1.8" />}
        {spec.kind === 'annulus-sector' && <g><circle cx={O[0]} cy={O[1]} r={R * ratio} fill="none" stroke={soft} strokeWidth="1.3" strokeDasharray="5 4" /><path d={`M${q1[0]} ${q1[1]}L${P1[0]} ${P1[1]}A${R} ${R} 0 ${big} 0 ${P2[0]} ${P2[1]}L${q2[0]} ${q2[1]}A${R * ratio} ${R * ratio} 0 ${big} 1 ${q1[0]} ${q1[1]}Z`} fill={pale} stroke={ink} strokeWidth="1.8" />{L(O, q1, false, ink, 1.4)}{L(O, q2, false, ink, 1.4)}{side(O, q2, m.r, P1, 12)}</g>}
        {spec.kind === 'segment' && <g><circle cx={O[0]} cy={O[1]} r={R} fill="white" stroke={ink} strokeWidth="1.8" /><path d={`M${P1[0]} ${P1[1]}A${R} ${R} 0 ${big} 0 ${P2[0]} ${P2[1]}Z`} fill={pale} stroke={ink} strokeWidth="1.8" />{L(O, P1)}{L(O, P2)}{th === 90 && rightMark(O, P1, P2)}{name(P1, n(1, 'B'), 10, -4)}{name(P2, n(2, 'A'), -10, -4)}</g>}
        {dot(O)}{name(O, n(0, 'O'), 0, 18)}{angle(O, P2, P1, th === 90 && spec.kind === 'segment' ? undefined : m.angle, 20)}{side(O, P1, m.R, P2, 12)}</g>;
    }
    case 'elevation': {
      const a = Math.min(75, Math.max(15, v[0] ?? 45)), H = 150, base = Math.min(255, H / Math.tan(rad(a))), X = 300, Y = 192, top: P = [X, Y - Math.min(H, 255 * Math.tan(rad(a)))], foot: P = [X, Y], obs: P = [X - base, Y];
      const ht = Y - top[1];
      return <g>{ground(20, 340, Y)}{m.object === 'line' ? L(top, foot, false, ink, 2.6) : tower(X, top[1], Y, 12)}{L(obs, top, m.sight !== 'solid', m.sight === 'solid' ? ink : accent, m.sight === 'solid' ? 2.4 : 1.6)}{rightMark(foot, top, obs)}{dot(obs)}{dot(top)}
        {name(top, n(0, 'A'), 14, 2)}{name(foot, n(1, 'B'), 13, 16)}{name(obs, n(2, 'C'), -2, 17)}{angle(obs, foot, top, m.angle, 28)}{dim([X, top[1]], [X, Y], m.height, 18)}{T((obs[0] + X) / 2, Y + 18, m.base)}{side(obs, top, m.hyp, foot, 14)}{ht < 0 && null}</g>;
    }
    case 'observers-same': {
      const a1 = v[0] ?? 30, a2 = v[1] ?? 60, H = 130, d1 = H / Math.tan(rad(a1)), d2 = H / Math.tan(rad(a2)), s = Math.min(1, 260 / d1), X = 300, Y = 168, h = H * s;
      const top: P = [X, Y - h], far: P = [X - d1 * s, Y], near: P = [X - d2 * s, Y];
      return <g>{ground(20, 350, Y)}{tower(X, top[1], Y)}{L(far, top, true, accent, 1.5)}{L(near, top, true, accent, 1.5)}{dot(far)}{dot(near)}{name(top, n(0, 'A'), 14, 2)}{name([X, Y], n(1, 'B'), 13, 16)}{name(far, n(2, 'D'), 0, 17)}{name(near, n(3, 'C'), 0, 17)}
        {angle(far, [X, Y], top, m.a1, 30)}{angle(near, [X, Y], top, m.a2, 22)}{dim([X, top[1]], [X, Y], m.height, 18)}{dim(near, [X, Y], m.d2, 16)}{dim(far, [X, Y], m.d1, 34)}</g>;
    }
    case 'observers-opposite': {
      const a1 = v[0] ?? 30, a2 = v[1] ?? 60, H = 100, d1 = H / Math.tan(rad(a1)), d2 = H / Math.tan(rad(a2)), s = Math.min(1.4, 300 / (d1 + d2)), Y = 190, h = H * s, X = 30 + d1 * s;
      const top: P = [X, Y - h], L1: P = [X - d1 * s, Y], R1: P = [X + d2 * s, Y];
      return <g>{ground(15, 345, Y)}{tower(X, top[1], Y)}{L(L1, top, true, accent, 1.5)}{L(R1, top, true, accent, 1.5)}{dot(L1)}{dot(R1)}{name(top, n(0, 'A'), 0, -8)}{name([X, Y], n(1, 'B'), 0, 17)}{name(L1, n(2, 'P'), 0, 17)}{name(R1, n(3, 'Q'), 0, 17)}
        {angle(L1, [X, Y], top, m.a1, 30)}{angle(R1, [X, Y], top, m.a2, 24)}{dim([X, top[1]], [X, Y], m.height, 16)}</g>;
    }
    case 'poles-road': {
      const a1 = v[0] ?? 60, a2 = v[1] ?? 30, d1 = 1 / Math.tan(rad(a1)), d2 = 1 / Math.tan(rad(a2)), W = 300, s = W / (d1 + d2), h = Math.min(150, s), xL = 30, xR = xL + W, Y = 185, Pp: P = [xL + d1 * W / (d1 + d2), Y];
      const tL: P = [xL, Y - h], tR: P = [xR, Y - h];
      return <g>{ground(15, 345, Y)}{tower(xL, tL[1], Y, 10)}{tower(xR, tR[1], Y, 10)}{L(Pp, tL, true, accent, 1.5)}{L(Pp, tR, true, accent, 1.5)}{dot(Pp)}{name(tL, n(0, 'A'), 0, -8)}{name(tR, n(1, 'D'), 0, -8)}{name([xL, Y], n(2, 'B'), -12, 4)}{name([xR, Y], n(3, 'C'), 12, 4)}{name(Pp, n(4, 'P'), 0, 17)}
        {angle(Pp, [xL, Y], tL, m.a1, 28)}{angle(Pp, [xR, Y], tR, m.a2, 34)}{dim([xL, Y], [xR, Y], m.width, 26)}{dim([xL, tL[1]], [xL, Y], m.height, 14)}</g>;
    }
    case 'building-tower': {
      const a1 = v[0] ?? 45, a2 = v[1] ?? 60, X = 270, Y = 192, bh = 80, d = bh / Math.tan(rad(a1)), s = Math.min(1, 230 / d), total = d * Math.tan(rad(a2));
      const B1: P = [X, Y - bh * s], T1: P = [X, Y - Math.min(180, total * s)], obs: P = [X - d * s, Y];
      return <g>{ground(15, 350, Y)}<rect x={X - 22} y={B1[1]} width="44" height={Y - B1[1]} fill={pale} stroke={ink} strokeWidth="1.6" />{L(B1, T1, false, ink, 3)}{L(obs, B1, true, accent, 1.4)}{L(obs, T1, true, accent, 1.4)}{dot(obs)}{dot(B1)}{dot(T1)}
        {name(T1, n(0, 'D'), 12, 4)}{name(B1, n(1, 'C'), -30, 4)}{name([X, Y], n(2, 'B'), 30, 16)}{name(obs, n(3, 'P'), 0, 17)}{angle(obs, [X, Y], B1, m.a1, 40)}{angle(obs, B1, T1, m.a2, 64)}{dim([X + 22, B1[1]], [X + 22, Y], m.building, 14)}{dim([X, T1[1]], [X, B1[1]], m.tower, 36)}</g>;
    }
    case 'depression-two': {
      const a1 = v[0] ?? 30, a2 = v[1] ?? 45, X = 80, Y = 192, H = 130, d1 = H / Math.tan(rad(a1)), s = Math.min(1, 255 / d1), h = H * s, top: P = [X, Y - h], far: P = [X + d1 * s, Y], near: P = [X + h / Math.tan(rad(a2)), Y], hz: P = [345, top[1]];
      return <g>{ground(15, 350, Y)}{tower(X, top[1], Y, 18)}{L(top, hz, true, soft, 1.3)}{L(top, far, false, accent, 1.5)}{L(top, near, false, accent, 1.5)}{dot(far)}{dot(near)}{name(top, n(0, 'A'), -2, -8)}{name([X, Y], n(1, 'B'), -16, 4)}{name(near, n(2, 'C'), 0, 17)}{name(far, n(3, 'D'), 0, 17)}
        {angle(top, hz, far, m.a1, 62)}{angle(top, hz, near, m.a2, 34)}{dim([X, top[1]], [X, Y], m.height, -24)}{T((near[0] + far[0]) / 2, Y + 34, m.gap)}</g>;
    }
    case 'building-and-tower': {
      const a1 = v[0] ?? 60, a2 = v[1] ?? 45, xb = 80, xt = 300, Y = 192, d = xt - xb, bh = Math.min(120, d * Math.tan(rad(a2))), up = d * Math.tan(rad(a1)), s = Math.min(1, 170 / (bh + up));
      const E: P = [xb, Y - bh * s], top: P = [xt, Y - (bh + up) * s], foot: P = [xt, Y], F: P = [xt, E[1]], dx = (xt - xb) * 1;
      const Es: P = [xb, Y - bh * s];
      return <g>{ground(15, 350, Y)}<rect x={xb - 20} y={Es[1]} width="40" height={Y - Es[1]} fill={pale} stroke={ink} strokeWidth="1.6" />{tower(xt, top[1], Y, 14)}{L(Es, F, true, soft, 1.3)}{L(Es, top, false, accent, 1.5)}{L(Es, foot, false, accent, 1.5)}{dot(Es)}{dot(top)}{dot(F)}
        {name(Es, n(0, 'A'), -2, -9)}{name([xb, Y], n(1, 'B'), -27, 4)}{name(top, n(2, 'C'), 14, 4)}{name(foot, n(3, 'D'), 15, 4)}{name(F, n(4, 'E'), 15, 4)}{angle(Es, F, top, m.a1, 40)}{angle(Es, F, foot, m.a2, 52)}{dim([xb, Es[1]], [xb, Y], m.building, -30)}{dim([xt, top[1]], [xt, Y], m.tower, 24)}{dx < 0 && null}</g>;
    }
    case 'circum-quad': {
      const O: P = [180, 108], r = 64, tp = [110, 205, 290, 15], vtx: P[] = tp.map((a, i) => { const b = tp[(i + 1) % 4] + (i === 3 ? 360 : 0), mid2 = (a + b) / 2, dist = r / Math.cos(rad((b - a) / 2)); return [O[0] + dist * Math.cos(rad(mid2)), O[1] - dist * Math.sin(rad(mid2))]; });
      const [D, A, B, C] = vtx; const tpts = tp.map(a => [O[0] + r * Math.cos(rad(a)), O[1] - r * Math.sin(rad(a))] as P);
      return <g>{poly([A, B, C, D])}<circle cx={O[0]} cy={O[1]} r={r} fill="white" stroke={ink} strokeWidth="1.6" />{tpts.map((p, i) => <g key={i}>{dot(p)}</g>)}{dot(O)}{name(O, 'O', 0, -7)}
        {name(A, n(0, 'A'), -12, 8)}{name(B, n(1, 'B'), 4, 16)}{name(C, n(2, 'C'), 13, 4)}{name(D, n(3, 'D'), 0, -8)}{side(A, B, m.AB, O, 14)}{side(B, C, m.BC, O, 14)}{side(C, D, m.CD, O, 14)}{side(D, A, m.DA, O, 14)}</g>;
    }
    case 'points': {
      const pts: P[] = []; for (let i = 0; i + 1 < v.length; i += 2) pts.push([v[i], v[i + 1]]);
      const xs = [0, ...pts.map(p => p[0])], ys = [0, ...pts.map(p => p[1])];
      const x0 = Math.floor(Math.min(...xs)) - 1, x1 = Math.ceil(Math.max(...xs)) + 1, y0 = Math.floor(Math.min(...ys)) - 1, y1 = Math.ceil(Math.max(...ys)) + 1;
      const s = Math.min(320 / (x1 - x0), 190 / (y1 - y0)), ox = 20 + (320 - s * (x1 - x0)) / 2, oy = 205 - (190 - s * (y1 - y0)) / 2;
      const X = (x: number) => ox + (x - x0) * s, Y = (y: number) => oy - (y - y0) * s, step = x1 - x0 > 14 ? 2 : 1;
      return <g>{Array.from({ length: x1 - x0 + 1 }, (_, i) => <line key={'x' + i} x1={X(x0 + i)} y1={Y(y0)} x2={X(x0 + i)} y2={Y(y1)} stroke="#e3e7ef" strokeWidth="1" />)}{Array.from({ length: y1 - y0 + 1 }, (_, i) => <line key={'y' + i} x1={X(x0)} y1={Y(y0 + i)} x2={X(x1)} y2={Y(y0 + i)} stroke="#e3e7ef" strokeWidth="1" />)}
        {L([X(x0), Y(0)], [X(x1), Y(0)], false, ink, 1.4)}{L([X(0), Y(y0)], [X(0), Y(y1)], false, ink, 1.4)}{T(X(x1) - 4, Y(0) - 6, 'x', 'end', ink, 13)}{T(X(0) + 8, Y(y1) + 12, 'y', 'start', ink, 13)}{T(X(0) - 6, Y(0) + 14, 'O', 'end', ink, 12)}
        {Array.from({ length: x1 - x0 + 1 }, (_, i) => x0 + i).filter(x => x !== 0 && x % step === 0).map(x => <g key={'tx' + x}>{T(X(x), Y(0) + 14, String(x).replace('-', '−'), 'middle', soft, 10)}</g>)}
        {Array.from({ length: y1 - y0 + 1 }, (_, i) => y0 + i).filter(y => y !== 0 && y % step === 0).map(y => <g key={'ty' + y}>{T(X(0) - 5, Y(y) + 4, String(y).replace('-', '−'), 'end', soft, 10)}</g>)}
        {m.join === 'yes' && <polygon points={pts.map(p => `${X(p[0])},${Y(p[1])}`).join(' ')} fill="rgba(246,239,224,0.7)" stroke={accent} strokeWidth="1.5" />}
        {pts.map((p, i) => <g key={i}><circle cx={X(p[0])} cy={Y(p[1])} r="4" fill={accent} />{T(X(p[0]) + 7, Y(p[1]) - 7, n(i, String.fromCharCode(65 + i)), 'start', ink, 13)}</g>)}</g>;
    }
    case 'toy': {
      const cx = 180, by = 120, r = 58, ch = 82;
      return <g><path d={`M${cx - r} ${by}A${r} ${r} 0 0 0 ${cx + r} ${by}Z`} fill={pale} stroke={ink} strokeWidth="1.8" /><polygon points={`${cx - r},${by} ${cx + r},${by} ${cx},${by - ch}`} fill={pale} stroke={ink} strokeWidth="1.8" /><ellipse cx={cx} cy={by} rx={r} ry="10" fill="none" stroke={ink} strokeWidth="1.2" strokeDasharray="4 3" />
        {L([cx, by - ch], [cx, by], true, soft, 1.2)}{L([cx, by], [cx + r, by], false, accent, 1.6)}{T(cx + r / 2, by + 26, m.r, 'middle', accent)}{dim([cx - r, by - ch], [cx - r, by], m.h, -18)}{dim([cx + r, by - ch], [cx + r, by + r], m.total, 22)}{side([cx, by - ch], [cx + r, by], m.l, [cx, by], 16)}</g>;
    }
    case 'capsule': {
      const y = 110, r = 44, x1 = 85, x2 = 235;
      return <g><path d={`M${x1} ${y - r}H${x2}A${r} ${r} 0 0 1 ${x2} ${y + r}H${x1}A${r} ${r} 0 0 1 ${x1} ${y - r}Z`} fill={pale} stroke={ink} strokeWidth="1.8" />{L([x1, y - r], [x1, y + r], true, soft, 1.2)}{L([x2, y - r], [x2, y + r], true, soft, 1.2)}
        {dim([x1 - r, y + r], [x2 + r, y + r], m.length, 26)}{dim([x2 + r, y - r], [x2 + r, y + r], m.d, 18)}{dim([x1, y - r], [x2, y - r], m.mid, -16)}</g>;
    }
    case 'tent': {
      const cx = 180, r = 80, yb = 195, yc = 120, apex = 40;
      return <g><path d={`M${cx - r} ${yc}V${yb}A${r} 12 0 0 0 ${cx + r} ${yb}V${yc}`} fill={pale} stroke={ink} strokeWidth="1.8" /><polygon points={`${cx - r},${yc} ${cx + r},${yc} ${cx},${apex}`} fill={pale} stroke={ink} strokeWidth="1.8" /><ellipse cx={cx} cy={yc} rx={r} ry="12" fill="none" stroke={ink} strokeWidth="1.2" strokeDasharray="4 3" />
        {dim([cx + r, yc], [cx + r, yb], m.h, 18)}{side([cx, apex], [cx + r, yc], m.l, [cx, yc], 16)}{dim([cx - r, yb + 14], [cx + r, yb + 14], m.d, 6)}</g>;
    }
    case 'vessel': {
      const cx = 180, r = 60, yt = 42, yj = 110;
      return <g><path d={`M${cx - r} ${yt}V${yj}A${r} ${r} 0 0 0 ${cx + r} ${yj}V${yt}`} fill={pale} stroke={ink} strokeWidth="1.8" /><ellipse cx={cx} cy={yt} rx={r} ry="10" fill="white" stroke={ink} strokeWidth="1.6" /><ellipse cx={cx} cy={yj} rx={r} ry="10" fill="none" stroke={ink} strokeWidth="1.1" strokeDasharray="4 3" />
        {dim([cx + r, yt], [cx + r, yj + r], m.h, 22)}{dim([cx - r, yt - 14], [cx + r, yt - 14], m.d, -4)}{dim([cx - r, yj], [cx - r, yj + r], m.r, -18)}</g>;
    }
    case 'cone-cavity': {
      const cx = 180, r = 64, yt = 40, yb = 180;
      return <g><path d={`M${cx - r} ${yt}V${yb}A${r} 12 0 0 0 ${cx + r} ${yb}V${yt}`} fill={pale} stroke={ink} strokeWidth="1.8" /><ellipse cx={cx} cy={yt} rx={r} ry="12" fill={pale} stroke={ink} strokeWidth="1.6" /><ellipse cx={cx} cy={yb} rx={r} ry="12" fill="white" stroke={ink} strokeWidth="1.4" /><polygon points={`${cx - r},${yb} ${cx + r},${yb} ${cx},${yt}`} fill="white" fillOpacity="0.6" stroke={accent} strokeWidth="1.5" strokeDasharray="5 3" />
        {dim([cx + r, yt], [cx + r, yb], m.h, 20)}{dim([cx - r, yb + 18], [cx + r, yb + 18], m.d, 6)}</g>;
    }
    case 'playground': {
      const x1 = 110, x2 = 250, y1 = 55, y2 = 155, r = 50;
      return <g><path d={`M${x1} ${y1}H${x2}A${r} ${r} 0 0 1 ${x2} ${y2}H${x1}A${r} ${r} 0 0 1 ${x1} ${y1}Z`} fill={pale} stroke={ink} strokeWidth="1.8" /><rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill="none" stroke={ink} strokeWidth="1.2" strokeDasharray="5 4" />{dim([x1, y1], [x2, y1], m.length, -16)}{dim([x2, y1], [x2, y2], m.width, -14)}</g>;
    }
    case 'altitude': {
      const B: P = [60, 190], A: P = [60, 35], C: P = [320, 190], t = ((B[0] - A[0]) * (C[0] - A[0]) + (B[1] - A[1]) * (C[1] - A[1])) / ((C[0] - A[0]) ** 2 + (C[1] - A[1]) ** 2), D = lerp(A, C, t), G: P = [120, 160];
      return <g>{poly([A, B, C])}{L(B, D, false, accent, 1.8)}{rightMark(B, A, C)}{rightMark(D, B, C)}{[A, B, C, D].map((p, i) => <g key={i}>{dot(p)}</g>)}{name(A, n(0, 'A'), -10, -2)}{name(B, n(1, 'B'), -10, 14)}{name(C, n(2, 'C'), 10, 14)}{name(D, n(3, 'D'), 8, -8)}{side(A, D, m.AD, G)}{side(D, C, m.DC, G)}</g>;
    }
    case 'trapezium': {
      const A: P = [40, 180], B: P = [320, 180], C: P = [245, 50], D: P = [115, 50];
      const den = (A[0] - C[0]) * (B[1] - D[1]) - (A[1] - C[1]) * (B[0] - D[0]), tt = ((A[0] - B[0]) * (B[1] - D[1]) - (A[1] - B[1]) * (B[0] - D[0])) / den, O = lerp(A, C, tt);
      return <g>{poly([A, B, C, D])}{L(A, C)}{L(B, D)}{[A, B, C, D, O].map((p, i) => <g key={i}>{dot(p)}</g>)}{name(A, n(0, 'A'), -10, 12)}{name(B, n(1, 'B'), 10, 12)}{name(C, n(2, 'C'), 10, -6)}{name(D, n(3, 'D'), -10, -6)}{name(O, n(4, 'O'), 0, 20)}{T(180, 205, m.AB)}{T(180, 40, m.DC)}</g>;
    }
  }
  return null;
}

export default function PaperFigure({ spec, label }: { spec: PaperFigureSpec; label?: string }) {
  return <figure className="paper-figure" style={{ margin: '14px 0 6px', textAlign: 'center' }}>
    <svg viewBox="0 0 360 225" role="img" aria-label={spec.caption ?? label ?? 'Figure for this question'} style={{ width: '100%', maxWidth: 400, height: 'auto', background: '#fffdf8', border: '1px solid #ece4d3', borderRadius: 10 }}>{draw(spec)}</svg>
    {spec.caption && <figcaption style={{ fontSize: 13, color: '#5b6478', marginTop: 4 }}>{spec.caption}</figcaption>}
  </figure>;
}
