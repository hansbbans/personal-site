import * as THREE from 'three';
import { makeCanvas, mulberry32 } from './util.js';

import { LANE_W, ROAD_HALF, laneOffset, rampHeight, PAD_LEN, PAD_HALF_W } from './course.js';

export { LANE_W, ROAD_HALF, laneOffset };
export const LANE_COUNT = 6;

const Y = new THREE.Vector3(0, 1, 0);

// Centre line of the circuit: x, height, z (metres). The first point is the
// start/finish line, in the middle of the main straight.
const POINTS = [
  [0, 0, 0],
  [0, 0, 110],
  [0, 0.5, 220],
  [50, 3, 330],
  [170, 7, 395],
  [290, 5, 345],
  [345, 1, 220],
  [290, -2, 100],
  [335, 0, -30],
  [310, 5, -170],
  [190, 9, -250],
  [70, 6, -215],
  [5, 2, -130],
  [0, 0.3, -60],
];

export class Track {
  constructor() {
    this.curve = new THREE.CatmullRomCurve3(
      POINTS.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      true,
      'centripetal'
    );
    this.curve.arcLengthDivisions = 4000;
    this.length = this.curve.getLength();
    const n = (this.n = Math.round(this.length));
    this.ds = this.length / n;
    this.pts = [];
    this.tans = [];
    this.sides = [];
    this.curv = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const p = this.curve.getPointAt(u);
      const t = this.curve.getTangentAt(u).normalize();
      const side = new THREE.Vector3().crossVectors(Y, t).normalize(); // left
      this.pts.push(p);
      this.tans.push(t);
      this.sides.push(side);
    }
    // Signed curvature (1/m), positive = left turn. Smoothed so cars lean gently.
    const raw = new Float32Array(n);
    const heading = (i) => Math.atan2(this.tans[i].x, this.tans[i].z);
    for (let i = 0; i < n; i++) {
      let d = heading((i + 1) % n) - heading((i - 1 + n) % n);
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      raw[i] = d / (2 * this.ds);
    }
    const R = 8;
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let k = -R; k <= R; k++) sum += raw[(i + k + n) % n];
      this.curv[i] = sum / (2 * R + 1);
    }
    this._f = Track.frame();
  }

  static frame() {
    return {
      pos: new THREE.Vector3(),
      tan: new THREE.Vector3(),
      side: new THREE.Vector3(),
      up: new THREE.Vector3(),
    };
  }

  // Position and orientation of the centre line at distance s (wraps around).
  sample(s, o) {
    const n = this.n;
    let f = (((s % this.length) + this.length) % this.length) / this.ds;
    let i = Math.floor(f);
    const t = f - i;
    i %= n;
    const j = (i + 1) % n;
    o.pos.lerpVectors(this.pts[i], this.pts[j], t);
    o.tan.lerpVectors(this.tans[i], this.tans[j], t).normalize();
    o.side.lerpVectors(this.sides[i], this.sides[j], t).normalize();
    o.up.crossVectors(o.tan, o.side).normalize();
    return o;
  }

  curvatureAt(s) {
    const n = this.n;
    const f = (((s % this.length) + this.length) % this.length) / this.ds;
    const i = Math.floor(f) % n;
    const t = f - Math.floor(f);
    return this.curv[i] * (1 - t) + this.curv[(i + 1) % n] * t;
  }

  // A ribbon following the track between lateral offsets a (left edge) and
  // b (right edge), a > b, with heights ya / yb above the road surface.
  strip(a, b, ya, yb, { s0 = 0, s1 = this.length, step = 2, vScale = 1 / 12 } = {}) {
    const pos = [], uv = [], idx = [];
    const o = this._f;
    const count = Math.max(1, Math.ceil((s1 - s0) / step));
    for (let k = 0; k <= count; k++) {
      const s = s0 + ((s1 - s0) * k) / count;
      this.sample(s, o);
      pos.push(o.pos.x + o.side.x * a, o.pos.y + ya, o.pos.z + o.side.z * a);
      pos.push(o.pos.x + o.side.x * b, o.pos.y + yb, o.pos.z + o.side.z * b);
      const v = (s - s0) * vScale;
      uv.push(0, v, 1, v);
      if (k < count) {
        const i = k * 2;
        idx.push(i, i + 1, i + 3, i, i + 3, i + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }

  buildMeshes(maxAniso = 8) {
    const group = new THREE.Group();
    const L = this.length;
    const tile = (len) => Math.round(L / len) / L; // whole number of repeats per lap

    // --- asphalt
    const roadTex = roadTexture();
    roadTex.anisotropy = maxAniso;
    const road = new THREE.Mesh(
      this.strip(ROAD_HALF, -ROAD_HALF, 0, 0, { step: 1.5, vScale: tile(14) }),
      new THREE.MeshStandardMaterial({ map: roadTex, roughness: 0.72, metalness: 0.0 })
    );
    road.receiveShadow = true;
    group.add(road);

    // --- red and white curbs
    const curbTex = curbTexture();
    curbTex.anisotropy = maxAniso;
    const curbMat = new THREE.MeshStandardMaterial({ map: curbTex, roughness: 0.6 });
    const cw = 1.0;
    for (const [a, b, ya, yb] of [
      [ROAD_HALF + cw, ROAD_HALF, 0.03, 0.07],
      [-ROAD_HALF, -ROAD_HALF - cw, 0.07, 0.03],
    ]) {
      const m = new THREE.Mesh(this.strip(a, b, ya, yb, { step: 1.5, vScale: tile(4) }), curbMat);
      m.receiveShadow = true;
      group.add(m);
    }

    // --- sandy shoulders and banks that hide the terrain seam
    const sandTex = sandTexture();
    sandTex.anisotropy = maxAniso;
    const sandMat = new THREE.MeshStandardMaterial({ map: sandTex, color: 0xe2b27a, roughness: 1 });
    const e0 = ROAD_HALF + cw, e1 = ROAD_HALF + 5.5, e2 = ROAD_HALF + 12.5;
    for (const [a, b, ya, yb] of [
      [e1, e0, -0.04, 0.03],
      [e2, e1, -1.8, -0.04],
      [-e0, -e1, 0.03, -0.04],
      [-e1, -e2, -0.04, -1.8],
    ]) {
      const m = new THREE.Mesh(this.strip(a, b, ya, yb, { step: 3, vScale: tile(7) }), sandMat);
      m.receiveShadow = true;
      group.add(m);
    }

    // --- chequered start / finish line
    const fin = new THREE.Mesh(
      this.strip(ROAD_HALF, -ROAD_HALF, 0.02, 0.02, { s0: -1.6, s1: 1.6, step: 0.4, vScale: 1 / 3.2 }),
      new THREE.MeshStandardMaterial({
        map: checkerTexture(16, 4),
        roughness: 0.6,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      })
    );
    fin.receiveShadow = true;
    group.add(fin);
    return group;
  }
}

// Boost pads and the jump ramp. Returns the group plus a tick(dt) that scrolls
// the glowing chevrons on the pads.
export function buildCourse(track, course, maxAniso = 8) {
  const group = new THREE.Group();
  const o = Track.frame();

  // --- boost pads: glowing chevrons that run forwards
  const padTex = chevronTexture();
  padTex.anisotropy = maxAniso;
  const padMat = new THREE.MeshStandardMaterial({
    map: padTex, emissive: 0xffffff, emissiveMap: padTex, emissiveIntensity: 1.1,
    roughness: 0.4, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  for (const pad of course.pads) {
    const g = track.strip(pad.lat + PAD_HALF_W, pad.lat - PAD_HALF_W, 0.03, 0.03, {
      s0: pad.s, s1: pad.s + PAD_LEN, step: 1, vScale: 2 / PAD_LEN,
    });
    const m = new THREE.Mesh(g, padMat);
    m.receiveShadow = true;
    group.add(m);
  }

  // --- ramp: a wedge over the middle lanes with a sheer lip
  const ramp = course.ramp;
  if (ramp) {
    const c0 = ramp.lat ?? 0;
    const w = ramp.halfW !== undefined ? ramp.halfW + (ramp.edge ?? 0) : ROAD_HALF + 0.3;
    const N = 16;
    const top = [], topUv = [], sides = [];
    const rows = [];
    for (let k = 0; k <= N; k++) {
      const sk = ramp.s + (ramp.len * k) / N;
      track.sample(sk, o);
      const h = rampHeight(ramp, sk);
      const at = (lat, y) => [o.pos.x + o.side.x * lat, o.pos.y + y, o.pos.z + o.side.z * lat];
      rows.push({ L: at(c0 + w, h), R: at(c0 - w, h), L0: at(c0 + w, 0), R0: at(c0 - w, 0) });
      topUv.push([0, (k / N) * 2], [1, (k / N) * 2]);
    }
    const quad = (arr, a, b, c, d) => arr.push(...a, ...b, ...c, ...a, ...c, ...d);
    const uvs = [];
    for (let k = 0; k < N; k++) {
      const r0 = rows[k], r1 = rows[k + 1];
      quad(top, r0.L, r0.R, r1.R, r1.L);
      const [a, b] = [topUv[k * 2], topUv[k * 2 + 1]], [c, d] = [topUv[k * 2 + 3], topUv[k * 2 + 2]];
      uvs.push(...a, ...b, ...c, ...a, ...c, ...d);
      quad(sides, r0.L0, r0.L, r1.L, r1.L0); // left side
      quad(sides, r0.R, r0.R0, r1.R0, r1.R); // right side
    }
    const lip = rows[N];
    quad(sides, lip.L, lip.R, lip.R0, lip.L0); // back face
    const topGeo = new THREE.BufferGeometry();
    topGeo.setAttribute('position', new THREE.Float32BufferAttribute(top, 3));
    topGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    topGeo.computeVertexNormals();
    const rampTex = rampTexture();
    rampTex.anisotropy = maxAniso;
    const topMesh = new THREE.Mesh(topGeo, new THREE.MeshStandardMaterial({ map: rampTex, roughness: 0.55, side: THREE.DoubleSide }));
    topMesh.castShadow = topMesh.receiveShadow = true;
    const sideGeo = new THREE.BufferGeometry();
    sideGeo.setAttribute('position', new THREE.Float32BufferAttribute(sides, 3));
    sideGeo.computeVertexNormals();
    const sideMesh = new THREE.Mesh(sideGeo, new THREE.MeshStandardMaterial({ color: 0x2a6fd6, roughness: 0.5, side: THREE.DoubleSide }));
    sideMesh.castShadow = sideMesh.receiveShadow = true;
    group.add(topMesh, sideMesh);
  }

  return {
    group,
    tick(dt) {
      padTex.offset.y = (padTex.offset.y - dt * 1.6) % 1;
    },
  };
}

function chevronTexture() {
  const W = 128, H = 128;
  const c = makeCanvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#1f6fff';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#7fe8ff';
  g.lineJoin = 'round';
  // one chevron pointing up the canvas (= forwards along the road)
  g.beginPath();
  g.moveTo(W * 0.1, H * 0.78);
  g.lineTo(W * 0.5, H * 0.3);
  g.lineTo(W * 0.9, H * 0.78);
  g.lineTo(W * 0.9, H * 0.98);
  g.lineTo(W * 0.5, H * 0.5);
  g.lineTo(W * 0.1, H * 0.98);
  g.closePath();
  g.fill();
  g.strokeStyle = '#ffffff';
  g.lineWidth = 6;
  g.strokeRect(3, -10, W - 6, H + 20);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

function rampTexture() {
  const W = 256, H = 256;
  const c = makeCanvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#ffc21f';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#e2362b';
  for (let i = -4; i < 8; i++) {
    g.beginPath();
    g.moveTo(i * 48, 0);
    g.lineTo(i * 48 + 24, 0);
    g.lineTo(i * 48 + 24 + H * 0.5, H);
    g.lineTo(i * 48 + H * 0.5, H);
    g.closePath();
    g.fill();
  }
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, 10, H);
  g.fillRect(W - 10, 0, 10, H);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

function roadTexture() {
  const W = 512, H = 512;
  const c = makeCanvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#45434a';
  g.fillRect(0, 0, W, H);
  const rnd = mulberry32(5);
  for (let i = 0; i < 9000; i++) {
    const v = 50 + rnd() * 50;
    g.fillStyle = `rgba(${v},${v},${v + 6},${0.25 + rnd() * 0.3})`;
    g.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 2, 1 + rnd() * 3);
  }
  // darker rubbered-in racing grooves
  const grad = g.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.3, 'rgba(0,0,0,0.16)');
  grad.addColorStop(0.5, 'rgba(0,0,0,0.05)');
  grad.addColorStop(0.7, 'rgba(0,0,0,0.16)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
  // edge lines
  g.fillStyle = '#f4f1e6';
  const edge = (0.28 / (ROAD_HALF * 2)) * W;
  g.fillRect(edge * 0.6, 0, edge, H);
  g.fillRect(W - edge * 1.6, 0, edge, H);
  // lane dashes
  g.fillStyle = 'rgba(244,241,230,0.85)';
  for (let k = 1; k < LANE_COUNT; k++) {
    const x = W / 2 + ((k - LANE_COUNT / 2) * LANE_W * W) / (ROAD_HALF * 2);
    g.fillRect(x - 2, 0, 4, H * 0.36);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

function curbTexture() {
  const c = makeCanvas(32, 128), g = c.getContext('2d');
  g.fillStyle = '#f5f2ea';
  g.fillRect(0, 0, 32, 128);
  g.fillStyle = '#e2362b';
  g.fillRect(0, 0, 32, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function sandTexture() {
  const S = 256;
  const c = makeCanvas(S, S), g = c.getContext('2d');
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, S, S);
  const rnd = mulberry32(11);
  for (let i = 0; i < 5000; i++) {
    const v = 190 + rnd() * 65;
    g.fillStyle = `rgba(${v},${v - 8},${v - 20},${0.5})`;
    g.fillRect(rnd() * S, rnd() * S, 1 + rnd() * 3, 1 + rnd() * 2);
  }
  for (let i = 0; i < 60; i++) {
    g.fillStyle = `rgba(150,120,90,${0.25 + rnd() * 0.3})`;
    g.beginPath();
    g.arc(rnd() * S, rnd() * S, 1 + rnd() * 2.5, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function checkerTexture(cols, rows, a = '#ffffff', b = '#15151a') {
  const s = 32;
  const c = makeCanvas(cols * s, rows * s), g = c.getContext('2d');
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      g.fillStyle = (x + y) % 2 ? a : b;
      g.fillRect(x * s, y * s, s, s);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapT = THREE.RepeatWrapping;
  return t;
}
