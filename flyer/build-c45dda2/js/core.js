'use strict';
// ===== Core: constants, utils, canvas, drawing helpers, input, shared state =====

const W = 540, H = 960, LEVEL_TIME = 180;
const TAU = Math.PI * 2;
const FONT = '"Inter","SF Pro Display",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
const PARAMS = new URLSearchParams(location.search);

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const dist2 = (ax, ay, bx, by) => (ax - bx) * (ax - bx) + (ay - by) * (ay - by);
const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
const fmt = n => Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function compact(arr) {
  let j = 0;
  for (let i = 0; i < arr.length; i++) if (!arr[i].dead) arr[j++] = arr[i];
  arr.length = j;
}

const COL = {
  V: '#5ee7ff', S: '#ff9f4a', M: '#ffd85e', L: '#b6ff5c', B: '#b48cff', shield: '#6aa8ff', heal: '#4dffa0',
  ebullet: '#ff4f9a', ebullet2: '#ffb547', ebullet3: '#c78bff',
  rock: ['#8d838c', '#2a2633'],
  enemy: ['#ff8197', '#d13a5a'], enemyAlt: ['#ffc56b', '#d9802a'], carrier: ['#7dffd6', '#18a07e'],
  steel: ['#4a557f', '#1d2342'], danger: '#ff4f6a',
};

// ---------- Canvas & scaling ----------
const stage = document.getElementById('stage');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let view = 1, dpr = 1;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  view = Math.min(window.innerWidth / W, window.innerHeight / H);
  const cw = Math.round(W * view), ch = Math.round(H * view);
  stage.style.width = cw + 'px'; stage.style.height = ch + 'px';
  stage.style.setProperty('--s', view.toFixed(4));
  canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
  canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
}
window.addEventListener('resize', resize);
resize();

// ---------- Color helpers ----------
function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function hexA(h, a) { const [r, g, b] = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; }
function mixHex(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${Math.round(lerp(A[0], B[0], t))},${Math.round(lerp(A[1], B[1], t))},${Math.round(lerp(A[2], B[2], t))})`;
}

// ---------- Glow sprites (one pre-rendered radial gradient per color, scaled at draw time) ----------
const glowCache = new Map();
const GLOW_R = 64;
function glowSprite(color) {
  const r = GLOW_R;
  let c = glowCache.get(color);
  if (!c) {
    c = document.createElement('canvas');
    c.width = c.height = r * 2;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(r, r, 0, r, r, r);
    gr.addColorStop(0, hexA(color, 0.95));
    gr.addColorStop(0.3, hexA(color, 0.4));
    gr.addColorStop(1, hexA(color, 0));
    g.fillStyle = gr; g.fillRect(0, 0, r * 2, r * 2);
    glowCache.set(color, c);
  }
  return c;
}
function drawGlow(color, x, y, r, alpha = 1) {
  if (r <= 0 || alpha <= 0) return;
  ctx.globalAlpha = alpha;
  ctx.drawImage(glowSprite(color), x - r, y - r, r * 2, r * 2);
  ctx.globalAlpha = 1;
}

// ---------- Shapes ----------
// Right half of each silhouette; mirrored across x=0. Enemies face +y (down), player faces -y (up).
const SHAPES = {
  player: [[0, -34], [5, -24], [7, -10], [13, -4], [30, 8], [31, 16], [9, 13], [8, 21], [16, 28], [16, 32], [5, 30], [0, 33]],
  drone: [[0, 20], [6, 8], [18, -4], [18, -10], [6, -6], [0, -14]],
  fighter: [[0, 26], [5, 14], [7, 4], [24, -4], [26, -12], [8, -8], [7, -16], [13, -22], [12, -25], [0, -22]],
  gunship: [[0, 36], [12, 26], [15, 10], [42, 2], [44, -10], [17, -14], [15, -28], [6, -34], [0, -34]],
  bomber: [[0, 42], [10, 32], [13, 12], [56, 0], [58, -12], [15, -18], [13, -34], [5, -40], [0, -40]],
  frigate: [[0, 72], [26, 58], [36, 22], [90, 6], [98, -16], [44, -28], [34, -58], [12, -70], [0, -70]],
  boss: [[0, 96], [40, 86], [78, 62], [118, 36], [200, 24], [248, 4], [242, -18], [150, -40], [96, -70], [56, -92], [0, -96]],
  bossHull: [[0, 92], [30, 82], [56, 40], [62, -10], [48, -70], [22, -88], [0, -90]],
};
function mirrorPath(pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  for (let i = pts.length - 1; i >= 0; i--) ctx.lineTo(-pts[i][0], pts[i][1]);
  ctx.closePath();
}
const gradCache = {};
function vGrad(key, h, c1, c2) {
  if (!gradCache[key]) {
    const g = ctx.createLinearGradient(0, -h, 0, h);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    gradCache[key] = g;
  }
  return gradCache[key];
}

// ---------- Text / rounded rect ----------
const hasLS = 'letterSpacing' in ctx;
function text(str, x, y, o = {}) {
  ctx.font = `${o.weight || 700} ${o.size || 14}px ${FONT}`;
  ctx.textAlign = o.align || 'left';
  ctx.textBaseline = o.baseline || 'alphabetic';
  ctx.fillStyle = o.color || '#fff';
  if (hasLS) ctx.letterSpacing = (o.spacing || 0) + 'px';
  if (o.alpha != null) ctx.globalAlpha = o.alpha;
  ctx.fillText(str, x, y);
  ctx.globalAlpha = 1;
  if (hasLS) ctx.letterSpacing = '0px';
}
function rr(x, y, w, h, r) {
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------- Input ----------
const keys = Object.create(null);
const touch = { active: false, id: null, ox: 0, oy: 0, tx: 0, ty: 0 };
function toGame(e) {
  const r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
}
function readPad() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const p of pads) if (p && p.connected) return p;
  return null;
}

// ---------- Shared game state ----------
let state = 'title'; // title | playing | paused | over | clear
let pBullets = [], eBullets = [], enemies = [], pickups = [], particles = [], popups = [], banners = [], timers = [], bombs = [];
let boss = null, bossSpawned = false, bossDefeated = false, bossSnapshot = null, bossRetry = false;
let levelTime = 0, gameTime = 0, bgTime = 0, timeline = [], tlIdx = 0;
// Storage can be blocked (privacy settings, sandboxed iframes): never let that break the game.
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (_) { /* storage unavailable */ } },
};
let score = 0, hiScore = +(store.get('skybreak.hi') || 0);
let shake = 0, flash = 0, flashColor = '#ffffff', hurtFlash = 0, slowmo = 0;
const stats = { fired: 0, hit: 0, kills: 0, hitsTaken: 0 };
const debug = { god: PARAMS.has('god') };

const player = {
  x: W / 2, y: H - 150, r: 6, hp: 100, maxHp: 100, ghost: 100, shield: 0, shieldMax: 60,
  primary: 'V', level: 1, missiles: 0, fireT: 0, missileT: 0, inv: 0, bank: 0, alive: true, muzzle: 0, focus: false,
  bombs: 3, maxBombs: 5, bombCd: 0, laserY: -20, laserHit: null,
};

function after(sec, fn) { timers.push({ t: sec, fn }); }

// ---------- Asteroid shapes (shared by gameplay rocks and background rocks) ----------
function makeRockShape(r) {
  const n = 9 + Math.floor(Math.random() * 4), pts = [], craters = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU + rand(-0.18, 0.18), d = r * rand(0.78, 1.08);
    pts.push([Math.cos(a) * d, Math.sin(a) * d]);
  }
  const nc = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < nc; i++) {
    const a = rand(0, TAU), d = rand(0, r * 0.5);
    craters.push([Math.cos(a) * d, Math.sin(a) * d, r * rand(0.12, 0.24)]);
  }
  return { r, pts, craters };
}
// Lighting stays fixed (top-left) while the rock spins, so points are rotated by hand.
function drawRock(shape, x, y, angle, o = {}) {
  const c = Math.cos(angle), s = Math.sin(angle), r = shape.r;
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath();
  shape.pts.forEach(([px, py], i) => ctx[i ? 'lineTo' : 'moveTo'](px * c - py * s, px * s + py * c));
  ctx.closePath();
  const g = ctx.createRadialGradient(-r * 0.4, -r * 0.45, r * 0.1, 0, 0, r * 1.25);
  g.addColorStop(0, o.dim ? '#3d3846' : '#a3979c'); g.addColorStop(0.55, o.dim ? '#24212c' : '#4d4652'); g.addColorStop(1, o.dim ? '#14121a' : '#1d1a24');
  ctx.fillStyle = g; ctx.fill();
  if (!o.dim) { ctx.strokeStyle = 'rgba(255,226,200,0.18)'; ctx.lineWidth = 1.2; ctx.stroke(); }
  if (o.flash) { ctx.fillStyle = `rgba(255,255,255,${o.flash})`; ctx.fill(); }
  for (const [cx, cy, cr] of shape.craters) {
    const rx = cx * c - cy * s, ry = cx * s + cy * c;
    ctx.fillStyle = o.dim ? 'rgba(0,0,0,0.25)' : 'rgba(10,8,16,0.35)';
    ctx.beginPath(); ctx.arc(rx, ry, cr, 0, TAU); ctx.fill();
    if (!o.dim) { ctx.strokeStyle = 'rgba(255,230,210,0.12)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(rx, ry, cr, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke(); }
  }
  ctx.restore();
}
