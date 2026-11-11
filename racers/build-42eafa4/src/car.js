// Original "living car" characters: eyes in the windshield, mouth in the bumper.
// Everything is generated in code: a lofted body shell, painted canvas liveries,
// and a face that is redrawn as the car looks around, blinks and reacts.
import * as THREE from 'three';
import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { clamp, lerp, damp, makeCanvas, TAU } from './util.js';

const FONT = '"Arial Rounded MT Bold", "Avenir Next", "Helvetica Neue", Arial, sans-serif';

export const CAR_SPECS = [
  { name: 'Zippy', color: '#ff6a13', accent: '#ffffff', iris: '#2e9bff', number: 7, livery: 'twin', spoiler: 'wing', scale: [1, 1, 1] },
  { name: 'Bluebell', color: '#1f7dff', accent: '#ffe14a', iris: '#8a5a2b', number: 3, livery: 'single', spoiler: 'duck', scale: [1.02, 0.93, 1.06] },
  { name: 'Sunny', color: '#ffc812', accent: '#22232c', iris: '#2faa4a', number: 12, livery: 'twin', spoiler: 'none', scale: [1.0, 1.1, 0.92] },
  { name: 'Minty', color: '#1fc79a', accent: '#ffffff', iris: '#8a4bd6', number: 5, livery: 'single', spoiler: 'fin', scale: [0.98, 1.02, 1.0] },
  { name: 'Plum', color: '#7d3fe0', accent: '#ffd21f', iris: '#19b88c', number: 8, livery: 'twin', spoiler: 'wing', scale: [1.05, 0.97, 1.02] },
  { name: 'Rosie', color: '#ff2f72', accent: '#ffffff', iris: '#2f6bff', number: 21, livery: 'single', spoiler: 'duck', scale: [0.97, 1.06, 0.95] },
];

// ---------------------------------------------------------------- lofting
const KEYS = ['z', 'w', 'y0', 'y1', 'n'];
const cr = (p0, p1, p2, p3, t) =>
  0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
const spow = (v, e) => Math.sign(v) * Math.pow(Math.abs(v), e);

const _st = {};
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3(), _d = new THREE.Vector3();
const _p = new THREE.Vector3(), _n = new THREE.Vector3();

// A smooth shell made of rounded-rectangle (superellipse) cross-sections that
// change along the length of the car. u runs rear (0) to front (1); phi runs
// around the section starting underneath: 0 = bottom, PI/2 = left side,
// PI = top, 3PI/2 = right side.
class Loft {
  constructor(stations) {
    this.st = stations;
    this.n = stations.length - 1;
    const N = (this.arcN = 256);
    this.arc = new Float32Array(N + 1);
    const p = new THREE.Vector3(), q = new THREE.Vector3();
    this.point(0.5, 0, q);
    let acc = 0;
    for (let i = 1; i <= N; i++) {
      this.point(0.5, (i / N) * TAU, p);
      acc += p.distanceTo(q);
      this.arc[i] = acc;
      q.copy(p);
    }
    for (let i = 0; i <= N; i++) this.arc[i] /= acc;
  }
  station(u, out) {
    const st = this.st, n = this.n;
    const f = clamp(u, 0, 1) * n;
    const i = Math.min(n - 1, Math.floor(f));
    const t = f - i;
    const p0 = st[Math.max(0, i - 1)], p1 = st[i], p2 = st[i + 1], p3 = st[Math.min(n, i + 2)];
    for (const k of KEYS) out[k] = cr(p0[k], p1[k], p2[k], p3[k], t);
    out.n = Math.max(2, out.n);
    out.w = Math.max(0.01, out.w);
    return out;
  }
  uAtZ(z) {
    let lo = 0, hi = 1;
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (this.station(mid, _st).z < z) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }
  // Fraction of the way around the section by surface distance (even paint).
  arcFrac(phi) {
    const f = clamp(phi / TAU, 0, 1) * this.arcN;
    const i = Math.min(this.arcN - 1, Math.floor(f));
    return lerp(this.arc[i], this.arc[i + 1], f - i);
  }
  point(u, phi, out, offset = 0) {
    const s = this.station(u, _st);
    const th = phi - Math.PI / 2;
    const e = 2 / s.n;
    const yc = (s.y0 + s.y1) / 2, h = Math.max(0.005, (s.y1 - s.y0) / 2);
    out.set(s.w * spow(Math.cos(th), e), yc + h * spow(Math.sin(th), e), s.z);
    if (offset) {
      this.normal(u, phi, _n);
      out.addScaledVector(_n, offset);
    }
    return out;
  }
  normal(u, phi, out) {
    const eu = 0.004, ep = 0.014;
    this.point(Math.min(1, u + eu), phi, _a);
    this.point(Math.max(0, u - eu), phi, _b);
    _a.sub(_b);
    this.point(u, phi + ep, _c);
    this.point(u, phi - ep, _d);
    _c.sub(_d);
    out.crossVectors(_c, _a);
    if (out.lengthSq() < 1e-12) out.set(0, 1, 0);
    return out.normalize();
  }
  geometry(nu = 60, np = 72) {
    const pos = [], nor = [], uv = [], idx = [];
    const row = np + 1;
    for (let iu = 0; iu <= nu; iu++) {
      const u = iu / nu;
      for (let ip = 0; ip <= np; ip++) {
        const phi = (ip / np) * TAU;
        this.point(u, phi, _p);
        pos.push(_p.x, _p.y, _p.z);
        this.normal(u, phi, _n);
        nor.push(_n.x, _n.y, _n.z);
        uv.push(u, ip === np ? 1 : this.arcFrac(phi));
      }
    }
    for (let iu = 0; iu < nu; iu++) {
      for (let ip = 0; ip < np; ip++) {
        const a = iu * row + ip, b = a + 1, c = a + row, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    // end caps
    for (const end of [0, 1]) {
      const base = end ? nu * row : 0;
      let cx = 0, cy = 0, cz = 0;
      for (let ip = 0; ip < np; ip++) {
        cx += pos[(base + ip) * 3]; cy += pos[(base + ip) * 3 + 1]; cz += pos[(base + ip) * 3 + 2];
      }
      const ci = pos.length / 3;
      pos.push(cx / np, cy / np, cz / np);
      nor.push(0, 0, end ? 1 : -1);
      uv.push(end, 0.5);
      for (let ip = 0; ip < np; ip++) {
        if (end) idx.push(ci, base + ip, base + ip + 1);
        else idx.push(ci, base + ip + 1, base + ip);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  }
  // A piece of the same surface, lifted slightly, with its own 0..1 UVs.
  // uvMap(uFrac, phiFrac) -> [x, y] decides which way up the picture goes.
  patch(u0, u1, p0, p1, uvMap, { nu = 14, np = 18, offset = 0.012 } = {}) {
    const pos = [], nor = [], uv = [], idx = [];
    const row = np + 1;
    for (let iu = 0; iu <= nu; iu++) {
      for (let ip = 0; ip <= np; ip++) {
        const uf = iu / nu, pf = ip / np;
        const u = lerp(u0, u1, uf), phi = lerp(p0, p1, pf);
        this.point(u, phi, _p, offset);
        pos.push(_p.x, _p.y, _p.z);
        this.normal(u, phi, _n);
        nor.push(_n.x, _n.y, _n.z);
        const m = uvMap(uf, pf);
        uv.push(m[0], m[1]);
      }
    }
    for (let iu = 0; iu < nu; iu++) {
      for (let ip = 0; ip < np; ip++) {
        const a = iu * row + ip, b = a + 1, c = a + row, d = c + 1;
        idx.push(a, b, c, b, d, c);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  }
}

const BODY = new Loft([
  { z: -1.99, w: 0.12, y0: 0.6, y1: 0.68, n: 2.2 },
  { z: -1.975, w: 0.44, y0: 0.48, y1: 0.82, n: 2.4 },
  { z: -1.92, w: 0.72, y0: 0.38, y1: 0.93, n: 2.8 },
  { z: -1.76, w: 0.85, y0: 0.31, y1: 1.0, n: 3.2 },
  { z: -1.3, w: 0.92, y0: 0.28, y1: 1.01, n: 3.6 },
  { z: -0.5, w: 0.93, y0: 0.26, y1: 0.98, n: 3.8 },
  { z: 0.3, w: 0.93, y0: 0.26, y1: 0.94, n: 3.8 },
  { z: 0.95, w: 0.91, y0: 0.26, y1: 0.9, n: 3.5 },
  { z: 1.45, w: 0.88, y0: 0.26, y1: 0.86, n: 3.3 },
  { z: 1.8, w: 0.84, y0: 0.27, y1: 0.82, n: 3.2 },
  { z: 1.93, w: 0.78, y0: 0.29, y1: 0.79, n: 3.2 },
  { z: 1.985, w: 0.62, y0: 0.35, y1: 0.73, n: 3.0 },
  { z: 2.0, w: 0.3, y0: 0.45, y1: 0.63, n: 2.6 },
]);

const CABIN = new Loft([
  { z: -1.52, w: 0.36, y0: 0.9, y1: 0.99, n: 2.6 },
  { z: -1.22, w: 0.66, y0: 0.88, y1: 1.2, n: 3.0 },
  { z: -0.62, w: 0.75, y0: 0.86, y1: 1.44, n: 3.2 },
  { z: -0.05, w: 0.77, y0: 0.86, y1: 1.48, n: 3.2 },
  { z: 0.36, w: 0.76, y0: 0.86, y1: 1.4, n: 3.0 },
  { z: 0.78, w: 0.74, y0: 0.82, y1: 1.08, n: 2.8 },
  { z: 1.04, w: 0.66, y0: 0.8, y1: 0.9, n: 2.6 },
]);

// Shared geometry: every car uses the same shell and stretches it a little.
let SHARED = null;
function shared() {
  if (SHARED) return SHARED;
  const PI = Math.PI;
  const body = BODY.geometry(64, 72);
  const cabin = CABIN.geometry(40, 56);
  const cu = (z) => CABIN.uAtZ(z), bu = (z) => BODY.uAtZ(z);
  // windshield, seen from the front: flip both ways so the picture is upright
  const windshield = CABIN.patch(cu(0.37), cu(1.0), PI - 1.0, PI + 1.0, (uf, pf) => [1 - pf, 1 - uf], { nu: 16, np: 28, offset: 0.014 });
  const sideL = CABIN.patch(cu(-1.0), cu(0.28), 1.3, 2.12, (uf, pf) => [uf, pf], { offset: 0.012 });
  const sideR = CABIN.patch(cu(-1.0), cu(0.28), TAU - 2.12, TAU - 1.3, (uf, pf) => [uf, pf], { offset: 0.012 });
  const rear = CABIN.patch(cu(-1.36), cu(-0.72), PI - 0.82, PI + 0.82, (uf, pf) => [pf, uf], { offset: 0.012 });
  const roof = CABIN.patch(cu(-0.58), cu(0.2), PI - 0.6, PI + 0.6, (uf, pf) => [pf, uf], { offset: 0.012 });
  const doorL = BODY.patch(bu(-0.72), bu(0.18), PI / 2 - 0.62, PI / 2 + 0.66, (uf, pf) => [1 - uf, pf], { offset: 0.01 });
  const doorR = BODY.patch(bu(-0.72), bu(0.18), (3 * PI) / 2 - 0.66, (3 * PI) / 2 + 0.62, (uf, pf) => [uf, 1 - pf], { offset: 0.01 });

  // wheel: chunky tyre with rounded shoulders, turned so the axle is X
  const R = 0.41, HW = 0.17;
  const prof = [
    [0.25, -HW * 0.95], [0.33, -HW], [R - 0.035, -HW], [R - 0.008, -HW * 0.72], [R, -HW * 0.35],
    [R, HW * 0.35], [R - 0.008, HW * 0.72], [R - 0.035, HW], [0.33, HW], [0.25, HW * 0.95],
  ].map((p) => new THREE.Vector2(p[0], p[1]));
  const tyre = new THREE.LatheGeometry(prof, 32).rotateZ(-PI / 2);
  const rim = new THREE.CylinderGeometry(0.27, 0.27, HW * 1.7, 24).rotateZ(-PI / 2);
  const hub = new THREE.CylinderGeometry(0.2, 0.25, 0.06, 24).rotateZ(-PI / 2).translate(HW * 0.9, 0, 0);
  const spoke = new THREE.BoxGeometry(0.03, 0.2, 0.06).translate(HW * 0.95, 0.12, 0);
  const cap = new THREE.SphereGeometry(0.075, 14, 10).scale(0.5, 1, 1).translate(HW * 0.98, 0, 0);

  const blob = (() => {
    const c = makeCanvas(128, 128), g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 8, 64, 64, 64);
    gr.addColorStop(0, 'rgba(0,0,0,0.85)');
    gr.addColorStop(0.55, 'rgba(0,0,0,0.5)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();

  SHARED = {
    body, cabin, windshield, sideL, sideR, rear, roof, doorL, doorR, tyre, rim, hub, spoke, cap, blob, R, HW,
    tyreMat: new THREE.MeshStandardMaterial({ color: 0x17171b, roughness: 0.82 }),
    chromeMat: new THREE.MeshStandardMaterial({ color: 0xdfe3ea, roughness: 0.18, metalness: 1 }),
    glassMat: new THREE.MeshPhysicalMaterial({ color: 0x0b0f1a, roughness: 0.06, metalness: 0.4, clearcoat: 1, clearcoatRoughness: 0.03, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
    darkMat: new THREE.MeshStandardMaterial({ color: 0x1b1c22, roughness: 0.55, metalness: 0.3 }),
    headMat: new THREE.MeshStandardMaterial({ color: 0xfff3cf, emissive: 0xffe2a0, emissiveIntensity: 0.75, roughness: 0.15 }),
  };
  return SHARED;
}

// ---------------------------------------------------------------- paint
function shade(hex, k) {
  const c = new THREE.Color(hex);
  if (k < 0) c.multiplyScalar(1 + k);
  else c.lerp(new THREE.Color('#ffffff'), k);
  return '#' + c.getHexString();
}

function liveryTexture(spec) {
  const W = 1024, H = 1024;
  const c = makeCanvas(W, H), g = c.getContext('2d');
  const yOf = (phi) => (1 - BODY.arcFrac(phi)) * H;
  const band = (pA, pB, color) => {
    const ya = yOf(pA), yb = yOf(pB);
    g.fillStyle = color;
    g.fillRect(0, Math.min(ya, yb), W, Math.abs(ya - yb));
  };
  g.fillStyle = spec.color;
  g.fillRect(0, 0, W, H);
  // soft two-tone: slightly deeper colour low on the sides
  for (const [pa, pb] of [[0.6, 1.25], [TAU - 1.25, TAU - 0.6]]) band(pa, pb, shade(spec.color, -0.14));
  // underside
  band(0, 0.6, '#17171c');
  band(TAU - 0.6, TAU, '#17171c');
  // sill stripe
  band(0.74, 0.86, spec.accent);
  band(TAU - 0.86, TAU - 0.74, spec.accent);
  // racing stripes over the top: each edge follows a line of constant x along
  // the body, so the stripes stay the same width from tail to nose
  const st = {};
  const vAt = (u, x) => {
    BODY.station(u, st);
    const f = Math.abs(x) / st.w;
    if (f >= 0.98) return null;
    const th = Math.acos(Math.pow(f, st.n / 2));
    return BODY.arcFrac(x >= 0 ? th + Math.PI / 2 : (3 * Math.PI) / 2 - th);
  };
  const stripe = (xa, xb, color) => {
    const top = [], bot = [];
    for (let i = 0; i <= 96; i++) {
      const u = 0.012 + (i / 96) * 0.976;
      const va = vAt(u, xa), vb = vAt(u, xb);
      if (va === null || vb === null) continue;
      top.push([u * W, (1 - va) * H]);
      bot.push([u * W, (1 - vb) * H]);
    }
    if (top.length < 2) return;
    g.fillStyle = color;
    g.beginPath();
    top.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    bot.reverse().forEach(([x, y]) => g.lineTo(x, y));
    g.closePath();
    g.fill();
  };
  if (spec.livery === 'twin') {
    stripe(0.3, 0.08, spec.accent);
    stripe(-0.08, -0.3, spec.accent);
  } else {
    stripe(0.3, -0.3, shade(spec.color, -0.32));
    stripe(0.25, -0.25, spec.accent);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function roundelTexture(spec, w = 256, h = 160) {
  const c = makeCanvas(w, h), g = c.getContext('2d');
  const r = h * 0.44;
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.arc(w / 2, h / 2, r, 0, TAU);
  g.fill();
  g.lineWidth = h * 0.06;
  g.strokeStyle = '#1b1c22';
  g.stroke();
  g.fillStyle = '#1b1c22';
  g.font = `900 italic ${h * (String(spec.number).length > 1 ? 0.5 : 0.62)}px ${FONT}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(String(spec.number), w / 2 - h * 0.02, h / 2 + h * 0.04);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// ---------------------------------------------------------------- face
const MOODS = {
  calm: { brow: 0, lid: 0.1, wide: 0, happy: 0, mouth: 'smile' },
  grin: { brow: 0.1, lid: 0.06, wide: 0.4, happy: 0, mouth: 'grin' },
  rev: { brow: 0.75, lid: 0.24, wide: 0, happy: 0, mouth: 'grin' },
  race: { brow: 0.5, lid: 0.18, wide: 0, happy: 0, mouth: 'smile' },
  fast: { brow: 0.85, lid: 0.26, wide: 0, happy: 0, mouth: 'open' },
  brake: { brow: -0.6, lid: 0, wide: 1, happy: 0, mouth: 'ooh' },
  happy: { brow: -0.2, lid: 0, wide: 0, happy: 1, mouth: 'open' },
};

function drawEyes(canvas, spec, s) {
  const g = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const bg = g.createRadialGradient(W / 2, H * 0.6, H * 0.15, W / 2, H * 0.55, W * 0.62);
  bg.addColorStop(0, '#ffffff');
  bg.addColorStop(0.7, '#f1f4f9');
  bg.addColorStop(1, '#c3cedf');
  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);
  const lidCol = spec.color, lidEdge = shade(spec.color, -0.45);
  for (const side of [-1, 1]) {
    const ex = W / 2 + side * W * 0.215;
    const cx = ex + s.gx * W * 0.07, cy = H * 0.57 - s.gy * H * 0.12;
    const r = H * 0.31 * (1 + 0.1 * s.wide);
    const ig = g.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
    ig.addColorStop(0, shade(spec.iris, 0.35));
    ig.addColorStop(0.75, spec.iris);
    ig.addColorStop(1, shade(spec.iris, -0.55));
    g.fillStyle = ig;
    g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.fill();
    g.fillStyle = '#0c0c12';
    g.beginPath(); g.arc(cx, cy, r * (0.5 - 0.08 * s.wide), 0, TAU); g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath(); g.arc(cx - r * 0.32, cy - r * 0.36, r * 0.21, 0, TAU); g.fill();
    g.beginPath(); g.arc(cx + r * 0.3, cy + r * 0.3, r * 0.09, 0, TAU); g.fill();

    // lower lid: rises into a smiling arc when happy
    if (s.happy > 0.02) {
      g.fillStyle = lidCol;
      g.strokeStyle = lidEdge;
      g.lineWidth = H * 0.03;
      const top = lerp(H * 1.1, H * 0.5, s.happy);
      g.beginPath();
      g.moveTo(ex - W * 0.26, H + 4);
      g.lineTo(ex - W * 0.26, top + H * 0.2);
      g.quadraticCurveTo(ex, top - H * 0.24, ex + W * 0.26, top + H * 0.2);
      g.lineTo(ex + W * 0.26, H + 4);
      g.closePath();
      g.fill();
      g.stroke();
    }
    // upper lid, body-coloured like a brow coming down from the roof
    const lid = clamp(s.lid, 0, 1);
    const yBase = lerp(H * 0.12, H * 1.02, lid);
    const tilt = s.brow * H * 0.2 * (1 - lid);
    const xIn = ex - side * W * 0.255, xOut = ex + side * W * 0.3;
    const yIn = yBase + tilt, yOut = yBase - tilt * 0.6;
    g.fillStyle = lidCol;
    g.strokeStyle = lidEdge;
    g.lineWidth = H * 0.035;
    g.beginPath();
    g.moveTo(xIn, -4);
    g.lineTo(xIn, yIn);
    g.quadraticCurveTo(ex, (yIn + yOut) / 2 + H * 0.1 * (1 - lid), xOut, yOut);
    g.lineTo(xOut, -4);
    g.closePath();
    g.fill();
    g.beginPath();
    g.moveTo(xIn, yIn);
    g.quadraticCurveTo(ex, (yIn + yOut) / 2 + H * 0.1 * (1 - lid), xOut, yOut);
    g.stroke();
  }
}

function drawMouth(canvas, kind) {
  const g = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  g.clearRect(0, 0, W, H);
  const dark = '#2a0d14';
  g.lineCap = 'round';
  g.lineJoin = 'round';
  if (kind === 'smile') {
    g.strokeStyle = dark;
    g.lineWidth = H * 0.1;
    g.beginPath();
    g.moveTo(W * 0.24, H * 0.34);
    g.quadraticCurveTo(W * 0.5, H * 0.98, W * 0.76, H * 0.34);
    g.stroke();
    return;
  }
  if (kind === 'ooh') {
    g.fillStyle = dark;
    g.beginPath();
    g.ellipse(W / 2, H * 0.54, W * 0.11, H * 0.34, 0, 0, TAU);
    g.fill();
    g.fillStyle = '#ff6f8f';
    g.beginPath();
    g.ellipse(W / 2, H * 0.74, W * 0.07, H * 0.12, 0, 0, TAU);
    g.fill();
    return;
  }
  const open = kind === 'open';
  const top = H * 0.2, depth = open ? H * 1.25 : H * 1.0;
  const x0 = W * (open ? 0.2 : 0.23), x1 = W - x0;
  const path = () => {
    g.beginPath();
    g.moveTo(x0, top);
    g.quadraticCurveTo(W / 2, top + H * 0.1, x1, top);
    g.quadraticCurveTo(W / 2, top + depth, x0, top);
    g.closePath();
  };
  path();
  g.fillStyle = dark;
  g.fill();
  g.save();
  path();
  g.clip();
  g.fillStyle = '#ffffff'; // teeth
  g.fillRect(0, 0, W, top + H * (open ? 0.24 : 0.3));
  g.fillStyle = '#ff6f8f'; // tongue
  g.beginPath();
  g.ellipse(W / 2, H * (open ? 0.92 : 0.86), W * 0.2, H * 0.22, 0, 0, TAU);
  g.fill();
  g.restore();
  path();
  g.strokeStyle = dark;
  g.lineWidth = H * 0.06;
  g.stroke();
}

// ---------------------------------------------------------------- the car
const _m = new THREE.Matrix4();
const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();

export class Car {
  constructor(spec, index = 0) {
    const S = shared();
    this.spec = spec;
    this.index = index;
    const [sx, sy, sz] = spec.scale;
    this.root = new THREE.Group();
    this.chassis = new THREE.Group();
    this.shell = new THREE.Group();
    this.shell.scale.set(sx, sy, sz);
    this.root.add(this.chassis);
    this.chassis.add(this.shell);

    const paint = (opts) =>
      new THREE.MeshPhysicalMaterial({
        roughness: 0.42, metalness: 0.08, clearcoat: 1, clearcoatRoughness: 0.06, ...opts,
      });
    this.paintMat = paint({ map: liveryTexture(spec) });
    this.plainMat = paint({ color: spec.color });
    const add = (geo, mat, parent = this.shell, shadow = true) => {
      const m = new THREE.Mesh(geo, mat);
      m.castShadow = shadow;
      parent.add(m);
      return m;
    };
    const bodyMesh = add(S.body, this.paintMat);
    add(S.cabin, this.plainMat);

    // --- face
    this.eyeCanvas = makeCanvas(512, 288);
    this.eyeTex = new THREE.CanvasTexture(this.eyeCanvas);
    this.eyeTex.colorSpace = THREE.SRGBColorSpace;
    this.eyeTex.anisotropy = 8;
    add(S.windshield, new THREE.MeshPhysicalMaterial({
      map: this.eyeTex, emissive: 0xffffff, emissiveMap: this.eyeTex, emissiveIntensity: 0.14,
      roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.03,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    }), this.shell, false);
    this.mouthCanvas = makeCanvas(256, 112);
    this.mouthTex = new THREE.CanvasTexture(this.mouthCanvas);
    this.mouthTex.colorSpace = THREE.SRGBColorSpace;
    bodyMesh.updateMatrixWorld(true);
    const mouthGeo = new DecalGeometry(bodyMesh, new THREE.Vector3(0, 0.535, 1.9), new THREE.Euler(0, 0, 0), new THREE.Vector3(1.24, 0.42, 0.5));
    add(mouthGeo, new THREE.MeshStandardMaterial({
      map: this.mouthTex, transparent: true, roughness: 0.5, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
    }), this.shell, false);

    // --- glass, numbers
    add(S.sideL, S.glassMat, this.shell, false);
    add(S.sideR, S.glassMat, this.shell, false);
    add(S.rear, S.glassMat, this.shell, false);
    const roundel = roundelTexture(spec);
    const decalMat = new THREE.MeshStandardMaterial({
      map: roundel, transparent: true, roughness: 0.4, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
    });
    add(S.doorL, decalMat, this.shell, false);
    add(S.doorR, decalMat, this.shell, false);
    add(S.roof, decalMat, this.shell, false);

    // --- lights
    const PI = Math.PI;
    const onSurface = (loft, z, phi, geo, mat) => {
      const u = loft.uAtZ(z);
      const m = new THREE.Mesh(geo, mat);
      loft.point(u, phi, m.position);
      loft.normal(u, phi, _v);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), _v);
      this.shell.add(m);
      return m;
    };
    const lamp = new THREE.SphereGeometry(0.13, 18, 12).scale(1.2, 0.85, 0.3);
    onSurface(BODY, 1.95, PI / 2 + 0.74, lamp, S.headMat);
    onSurface(BODY, 1.95, (3 * PI) / 2 - 0.74, lamp, S.headMat);
    this.tailMat = new THREE.MeshStandardMaterial({ color: 0x8a0d0d, emissive: 0xff1a10, emissiveIntensity: 0.7, roughness: 0.3 });
    const tail = new THREE.SphereGeometry(0.13, 16, 10).scale(1.6, 0.7, 0.3);
    onSurface(BODY, -1.93, PI / 2 + 0.95, tail, this.tailMat);
    onSurface(BODY, -1.93, (3 * PI) / 2 - 0.95, tail, this.tailMat);

    // --- spoiler / fin
    if (spec.spoiler === 'wing') {
      const wing = add(new RoundedBoxGeometry(1.74, 0.07, 0.44, 3, 0.03), this.plainMat);
      wing.position.set(0, 1.32, -1.74);
      wing.rotation.x = -0.14;
      for (const x of [-0.86, 0.86]) {
        const plate = add(new RoundedBoxGeometry(0.05, 0.3, 0.5, 2, 0.02), S.darkMat);
        plate.position.set(x, 1.3, -1.74);
      }
      for (const x of [-0.5, 0.5]) {
        const strut = add(new THREE.BoxGeometry(0.07, 0.36, 0.14), S.darkMat);
        strut.position.set(x, 1.13, -1.7);
      }
    } else if (spec.spoiler === 'duck') {
      const lip = add(new RoundedBoxGeometry(1.5, 0.1, 0.34, 3, 0.045), this.plainMat);
      lip.position.set(0, 1.04, -1.78);
      lip.rotation.x = -0.5;
    } else if (spec.spoiler === 'fin') {
      const sh = new THREE.Shape();
      sh.moveTo(-0.55, 0);
      sh.quadraticCurveTo(-0.45, 0.42, -0.62, 0.5);
      sh.quadraticCurveTo(0.0, 0.42, 0.5, 0);
      sh.closePath();
      const fin = add(new THREE.ExtrudeGeometry(sh, { depth: 0.05, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 }), this.plainMat);
      fin.rotation.y = -PI / 2;
      fin.position.set(0.025, 1.4, -0.75);
    }
    // exhausts
    for (const x of [-0.42, 0.42]) {
      const pipe = add(new THREE.CylinderGeometry(0.075, 0.085, 0.3, 14).rotateX(PI / 2), S.chromeMat);
      pipe.position.set(x, 0.36, -1.93);
    }

    // --- wheels and arches
    this.rimMat = new THREE.MeshStandardMaterial({ color: spec.accent === '#22232c' ? 0xdfe3ea : spec.accent, roughness: 0.25, metalness: 0.75 });
    this.wheels = [];
    const arch = new THREE.TorusGeometry(S.R + 0.06, 0.055, 10, 26, PI).rotateY(PI / 2).scale(1.5, 1, 1);
    const wx = 0.86 * sx, wzF = 1.2 * sz, wzR = -1.14 * sz;
    for (const [x, z, front] of [[wx, wzF, true], [-wx, wzF, true], [wx, wzR, false], [-wx, wzR, false]]) {
      const pivot = new THREE.Group();
      pivot.position.set(x, S.R, z);
      const spin = new THREE.Group();
      const flip = new THREE.Group();
      if (x < 0) flip.rotation.y = PI;
      pivot.add(spin);
      spin.add(flip);
      add(S.tyre, S.tyreMat, flip);
      add(S.rim, S.darkMat, flip, false);
      add(S.hub, this.rimMat, flip, false);
      for (let k = 0; k < 5; k++) {
        const sp = add(S.spoke, S.darkMat, flip, false);
        sp.rotation.x = (k / 5) * TAU;
      }
      add(S.cap, S.chromeMat, flip, false);
      this.root.add(pivot);
      this.wheels.push({ pivot, spin, front });
      const a = add(arch, this.plainMat, this.chassis);
      a.position.set(Math.sign(x) * 0.9 * sx, S.R - 0.02, z);
    }

    // --- soft contact shadow
    const blob = new THREE.Mesh(
      new THREE.PlaneGeometry(2.9 * sx, 5.0 * sz).rotateX(-PI / 2),
      new THREE.MeshBasicMaterial({ map: S.blob, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -6 })
    );
    blob.position.y = 0.035;
    blob.renderOrder = 1;
    this.root.add(blob);
    this.blob = blob;

    // --- animation state
    this.spinAngle = 0;
    this.pitch = 0;
    this.roll = 0;
    this.stretch = 0;
    this.hopT = -1;
    this.phase = index * 1.618;
    this.mood = 'calm';
    this.face = { gx: 0, gy: 0, lid: 0.1, brow: 0, wide: 0, happy: 0 };
    this.blinkAt = 1 + Math.random() * 3;
    this.blink = 0;
    this.glanceAt = 0;
    this.glance = { x: 0, y: 0 };
    this.lastEyeKey = '';
    this.lastMouth = '';
    this.eyeClock = 0;
    this._drawFace(true);
  }

  // Sit the car on the track frame, `lateral` metres left of the centre line.
  // y lifts it (ramp, jump), yaw turns the nose left, pitch lifts the nose.
  // ground is the height of the surface under it (the ramp), for the shadow.
  place(f, lateral, y = 0, yaw = 0, pitch = 0, ground = 0) {
    _m.makeBasis(f.side, f.up, f.tan);
    this.root.quaternion.setFromRotationMatrix(_m);
    if (yaw || pitch) this.root.quaternion.multiply(_q.setFromEuler(_e.set(-pitch, yaw, 0, 'YXZ')));
    this.root.position.copy(f.pos).addScaledVector(f.side, lateral);
    this.root.position.y += y;
    // the shadow stays on the ground and fades as the car flies higher
    const lift = Math.max(0, y - ground);
    this.blob.position.y = 0.035 - lift;
    this.blob.material.opacity = 0.55 / (1 + lift * 0.8);
  }

  // squash on landing
  land() {
    this.hopT = 0.5;
  }

  hop() {
    this.hopT = 0;
  }

  setMood(m) {
    this.mood = MOODS[m] ? m : 'calm';
  }

  // d: { v, a, latAcc, curv, rev, braking, camPos, lookAt (optional world point) }
  update(dt, t, d) {
    const S = shared();
    // wheels
    this.spinAngle += (d.v * dt) / S.R;
    const steer = clamp(d.curv * 10 + (d.steer || 0), -0.42, 0.42);
    for (const w of this.wheels) {
      w.spin.rotation.x = this.spinAngle;
      if (w.front) w.pivot.rotation.y = steer;
    }
    // body: squat under power, dive on the brakes, lean in the bends
    const sf = clamp(d.v / 62, 0, 1);
    this.pitch = damp(this.pitch, clamp(-d.a * 0.0042, -0.06, 0.075), 7, dt);
    this.roll = damp(this.roll, clamp(d.latAcc * 0.0034, -0.085, 0.085), 6, dt);
    this.stretch = damp(this.stretch, clamp(d.a / 16, -1, 1) * 0.035, 8, dt);
    const ph = this.phase;
    let heave = Math.sin(t * 11 + ph) * 0.01 * sf + Math.sin(t * 17.3 + ph * 2) * 0.007 * sf;
    let pitch = this.pitch, roll = this.roll;
    const rev = d.rev || 0;
    if (rev > 0.01) {
      heave += Math.sin(t * 54 + ph) * 0.012 * rev + rev * 0.015;
      roll += Math.sin(t * 37 + ph * 3) * 0.016 * rev;
      pitch += -0.035 * rev + Math.sin(t * 29 + ph) * 0.006 * rev;
    }
    let hopY = 0, squash = 0;
    if (this.hopT >= 0) {
      this.hopT += dt;
      const k = this.hopT / 0.5;
      if (k < 1) {
        hopY = Math.sin(k * Math.PI) * 0.55;
        pitch -= Math.sin(k * Math.PI) * 0.12;
      } else if (k < 1.5) {
        squash = Math.sin((k - 1) * 2 * Math.PI) * 0.09;
      } else this.hopT = -1;
    }
    this.chassis.position.y = heave + hopY;
    this.chassis.rotation.set(pitch, 0, roll);
    this.chassis.scale.set(1 + squash * 0.5, 1 - this.stretch * 0.6 - squash, 1 + this.stretch);
    this.root.position.y += 0; // wheels stay planted; only the chassis moves
    for (const w of this.wheels) w.pivot.position.y = S.R + hopY;

    this.tailMat.emissiveIntensity = damp(this.tailMat.emissiveIntensity, d.braking ? 7 : 0.7, 14, dt);

    this._updateFace(dt, t, d);
  }

  _updateFace(dt, t, d) {
    const mood = MOODS[this.mood];
    const f = this.face;
    // where is the camera, in the car's own frame?
    let gx = 0, gy = 0, facingCam = false;
    if (d.camPos) {
      _q.copy(this.root.quaternion).invert();
      _v.copy(d.camPos).sub(this.root.position).applyQuaternion(_q);
      const dist = Math.max(1, _v.length());
      facingCam = _v.z > 0.5 && dist < 60;
      if (facingCam) {
        gx = clamp((_v.x / dist) * 1.7, -1, 1);
        gy = clamp(((_v.y - 1.2) / dist) * 1.7, -0.8, 0.8);
      }
    }
    // idle glances and following the road
    if (t > this.glanceAt) {
      this.glanceAt = t + 0.7 + Math.random() * 2.2;
      const far = Math.random() < 0.35;
      this.glance.x = far ? (Math.random() - 0.5) * 1.6 : (Math.random() - 0.5) * 0.3;
      this.glance.y = far ? (Math.random() - 0.5) * 0.5 : 0;
    }
    if (!facingCam) {
      gx = clamp(d.curv * 90, -0.8, 0.8) + this.glance.x * 0.5;
      gy = 0.1 + this.glance.y * 0.5;
    } else {
      gx = clamp(gx + this.glance.x * 0.25, -1, 1);
      gy += this.glance.y * 0.3;
    }
    f.gx = damp(f.gx, gx, 12, dt);
    f.gy = damp(f.gy, gy, 12, dt);
    f.brow = damp(f.brow, mood.brow, 9, dt);
    f.wide = damp(f.wide, mood.wide, 9, dt);
    f.happy = damp(f.happy, mood.happy, 9, dt);
    // blinking
    if (t > this.blinkAt) {
      this.blinkAt = t + 1.6 + Math.random() * 3.6;
      this.blink = 0.16;
    }
    let lid = mood.lid;
    if (this.blink > 0) {
      this.blink -= dt;
      lid = lerp(lid, 1, Math.sin(clamp(1 - this.blink / 0.16, 0, 1) * Math.PI));
    }
    f.lid = lid;
    this.eyeClock += dt;
    // Faces are only redrawn when someone could see them change.
    if (facingCam || this.eyeClock > 0.5) this._drawFace(false);
  }

  _drawFace(force) {
    const f = this.face;
    const q = (v, n) => Math.round(v * n);
    const key = [q(f.gx, 24), q(f.gy, 20), q(f.lid, 14), q(f.brow, 10), q(f.wide, 6), q(f.happy, 8)].join(',');
    if (force || (key !== this.lastEyeKey && this.eyeClock > 1 / 30)) {
      this.lastEyeKey = key;
      this.eyeClock = 0;
      drawEyes(this.eyeCanvas, this.spec, f);
      this.eyeTex.needsUpdate = true;
    }
    const mouth = MOODS[this.mood].mouth;
    if (force || mouth !== this.lastMouth) {
      this.lastMouth = mouth;
      drawMouth(this.mouthCanvas, mouth);
      this.mouthTex.needsUpdate = true;
    }
  }

  // World position of a point given in the car's own coordinates.
  worldPoint(x, y, z, out) {
    return out.set(x, y, z).applyQuaternion(this.root.quaternion).add(this.root.position);
  }
}
