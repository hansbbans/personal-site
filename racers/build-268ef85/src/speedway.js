// A big oval speedway: grandstands packed with people all the way round the
// outside, a white catch wall with a fence, flags along the top and light
// towers behind. Used by tracks whose theme has `speedway: true`.
import * as THREE from 'three';
import { ROAD_HALF } from './course.js';
import { makeCanvas } from './util.js';

const STAND_D = ROAD_HALF + 12.5; // front of the stands, from the centre line
const TIERS = 9, RISE = 0.62, RUN = 1.3, BASE = 2.2;
const DEPTH = TIERS * RUN;
const TOP = BASE + TIERS * RISE;
const WALL_D = ROAD_HALF + 4.6;
const UP = new THREE.Vector3(0, 1, 0);
const SEATS = ['#2f6fd6', '#e2362b', '#f5b81f', '#27a36f'];

// Sweep a 2D profile [[d, h], ...] (d metres outwards from `from`, h metres
// above the road) along the lap from s0 to s1. Each profile segment gets its
// own colour from colorOf(segment, s). Flat-shaded, with u along the lap and
// v along the profile for textures.
function sweep(track, out, from, profile, s0, s1, colorOf, { step = 2, caps = false } = {}) {
  const F = track.constructor.frame();
  const count = Math.max(1, Math.ceil((s1 - s0) / step));
  const rings = [];
  for (let k = 0; k <= count; k++) {
    const s = s0 + ((s1 - s0) * k) / count;
    const o = out(s);
    track.sample(s, F);
    const ring = profile.map(([d, h]) => new THREE.Vector3(
      F.pos.x + F.side.x * o * (from + d), F.pos.y + h, F.pos.z + F.side.z * o * (from + d)));
    rings.push({ s, ring });
  }
  const pos = [], col = [], uv = [];
  const c = new THREE.Color();
  const vAt = [0];
  for (let j = 1; j < profile.length; j++) vAt.push(vAt[j - 1] + Math.hypot(profile[j][0] - profile[j - 1][0], profile[j][1] - profile[j - 1][1]));
  const push = (v, u, vv) => { pos.push(v.x, v.y, v.z); col.push(c.r, c.g, c.b); uv.push(u, vv); };
  for (let k = 0; k < count; k++) {
    const A = rings[k], B = rings[k + 1];
    for (let j = 0; j < profile.length - 1; j++) {
      c.set(colorOf(j, A.s));
      const uA = A.s, uB = B.s;
      push(A.ring[j], uA, vAt[j]); push(B.ring[j], uB, vAt[j]); push(B.ring[j + 1], uB, vAt[j + 1]);
      push(A.ring[j], uA, vAt[j]); push(B.ring[j + 1], uB, vAt[j + 1]); push(A.ring[j + 1], uA, vAt[j + 1]);
    }
  }
  if (caps) {
    // close the ends so you can't see inside
    const tris = THREE.ShapeUtils.triangulateShape(profile.map(([d, h]) => new THREE.Vector2(d, h)), []);
    c.set(colorOf(0, s0));
    for (const end of [rings[0], rings[count]]) {
      for (const t of tris) for (const i of t) push(end.ring[i], 0, 0);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

function fenceTexture() {
  const c = makeCanvas(64, 64), g = c.getContext('2d');
  g.strokeStyle = '#ffffff';
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(0, 0); g.lineTo(64, 64);
  g.moveTo(64, 0); g.lineTo(0, 64);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// outside(s): +1 if the outside of the oval is left of the road at s, else -1.
// gaps: [[s0, s1], ...] stretches with no stands or wall (the pit lane); they
// must not cross the start line.
// Returns { spots } — seat positions for the crowd, in order along the stands.
export function buildSpeedway(scene, track, { outside, gaps = [], rnd }) {
  const L = track.length;
  const F = track.constructor.frame();
  // the lap minus the gaps, as [s0, s1] runs (s1 may pass L: it wraps)
  const runs = [];
  const g = gaps.map(([a, b]) => [((a % L) + L) % L, ((b % L) + L) % L]).sort((x, y) => x[0] - y[0]);
  if (!g.length) runs.push([0, L]);
  for (let i = 0; i < g.length; i++) runs.push([g[i][1], i + 1 < g.length ? g[i + 1][0] : g[0][0] + L]);

  // ------------------------------------------------------------ grandstands
  const prof = [[0, -4], [0, BASE]];
  for (let t = 0; t < TIERS; t++) prof.push([t * RUN, BASE + (t + 1) * RISE], [(t + 1) * RUN, BASE + (t + 1) * RISE]);
  prof.push([DEPTH, TOP + 1.3], [DEPTH + 0.35, TOP + 1.3], [DEPTH + 0.35, -4]);
  const nP = prof.length;
  // segment j runs from prof[j] to prof[j + 1]; seats change colour every 30 m
  const seat = (s) => SEATS[Math.floor(s / 30) % SEATS.length];
  const standColor = (j, s) => {
    if (j === 0) return '#ece6da'; // front wall
    if (j === nP - 2) return '#c9c2b6'; // back
    if (j === nP - 3) return seat(s); // top of the back rail
    if (j === nP - 4) return '#d9d2c6'; // back rail, seat side
    return j % 2 ? '#cfc8bb' : seat(s); // risers, seats
  };
  const standMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, flatShading: true, side: THREE.DoubleSide });
  for (const [s0, s1] of runs) {
    const m = new THREE.Mesh(sweep(track, outside, STAND_D, prof, s0, s1, standColor, { caps: true }), standMat);
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
  }

  // ------------------------------------------------------------ catch wall and fence
  {
    const wallProf = [[0, -0.6], [0, 1.15], [0.45, 1.15], [0.45, -0.6]];
    const wallColor = (j, s) => (j === 1 ? '#2f6fd6' : (Math.floor(s / 6) % 2 ? '#ffffff' : '#f4f1ea'));
    const wallMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, flatShading: true, side: THREE.DoubleSide });
    const ftex = fenceTexture();
    ftex.repeat.set(1 / 1.2, 1 / 1.2);
    const fenceMat = new THREE.MeshStandardMaterial({
      color: 0xb8bec8, alphaMap: ftex, alphaTest: 0.35, transparent: false, metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide,
    });
    const postGeo = new THREE.CylinderGeometry(0.07, 0.07, 3.2, 6).translate(0, 1.6 + 1.15, 0);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x8a909a, metalness: 0.6, roughness: 0.4 });
    const posts = [];
    for (const [s0, s1] of runs) {
      const a = s0 + 1, b = s1 - 1;
      const wall = new THREE.Mesh(sweep(track, outside, WALL_D, wallProf, a, b, wallColor, { caps: true }), wallMat);
      wall.castShadow = wall.receiveShadow = true;
      scene.add(wall);
      scene.add(new THREE.Mesh(sweep(track, outside, WALL_D + 0.2, [[0, 1.15], [0, 4.3]], a, b, () => '#ffffff', { step: 3 }), fenceMat));
      for (let s = a; s <= b; s += 6) posts.push(s);
    }
    const pm = new THREE.InstancedMesh(postGeo, postMat, posts.length);
    const m = new THREE.Matrix4();
    posts.forEach((s, i) => {
      track.sample(s, F);
      m.makeTranslation(F.pos.x + F.side.x * outside(s) * (WALL_D + 0.2), F.pos.y, F.pos.z + F.side.z * outside(s) * (WALL_D + 0.2));
      pm.setMatrixAt(i, m);
    });
    scene.add(pm);
  }

  // ------------------------------------------------------------ flags along the top
  const flagMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, side: THREE.DoubleSide });
  const flagUniforms = { uClock: { value: 0 } };
  flagMat.onBeforeCompile = (sh) => {
    sh.uniforms.uClock = flagUniforms.uClock;
    sh.vertexShader = 'uniform float uClock;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      // flap: further from the pole, more wave
      float w = max(0.0, position.x);
      transformed.z += sin(uClock * 7.0 - w * 2.2 + instanceMatrix[3][0] * 0.3) * 0.28 * w;`);
  };
  flagMat.customProgramCacheKey = () => 'flag';
  {
    const flagGeo = new THREE.BufferGeometry();
    flagGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 2.2, -0.55, 0, 0, -1.1, 0, 0, 0, 0, 0, -1.1, 0, 2.2, -0.55, 0], 3));
    flagGeo.computeVertexNormals();
    flagGeo.translate(0, TOP + 5.6, 0);
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 4.6, 6).translate(0, TOP + 1.3 + 2.3, 0);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xdedede, metalness: 0.5, roughness: 0.4 });
    const spots = [];
    for (const [s0, s1] of runs) for (let s = s0 + 6; s < s1 - 4; s += 16) spots.push(s);
    const flags = new THREE.InstancedMesh(flagGeo, flagMat, spots.length);
    const poles = new THREE.InstancedMesh(poleGeo, poleMat, spots.length);
    const colors = ['#e2362b', '#ffd21f', '#2f8cff', '#39c24f', '#ff7a1a', '#ffffff', '#8b44e0'];
    const m = new THREE.Matrix4(), c = new THREE.Color(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
    const P = new THREE.Vector3();
    spots.forEach((s, i) => {
      track.sample(s, F);
      const d = STAND_D + DEPTH + 0.18;
      P.set(F.pos.x + F.side.x * outside(s) * d, F.pos.y, F.pos.z + F.side.z * outside(s) * d);
      // flags stream backwards along the stands: turn +x onto -tan
      q.setFromAxisAngle(UP, Math.atan2(F.tan.z, -F.tan.x));
      m.compose(P, q, one);
      flags.setMatrixAt(i, m);
      flags.setColorAt(i, c.set(colors[i % colors.length]));
      m.makeTranslation(P.x, P.y, P.z);
      poles.setMatrixAt(i, m);
    });
    scene.add(flags, poles);
  }

  // ------------------------------------------------------------ light towers
  {
    const steel = new THREE.MeshStandardMaterial({ color: 0x5a606a, metalness: 0.6, roughness: 0.45 });
    const lamp = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff4d6, emissiveIntensity: 1.6 });
    const H = 34;
    const towers = 8;
    const bulbGeo = new THREE.BoxGeometry(1.3, 1.1, 0.2);
    for (let k = 0; k < towers; k++) {
      let s = ((k + 0.5) / towers) * L;
      for (const [a, b] of gaps) if (s > a - 20 && s < b + 20) s = b + 20; // behind the stands, not in the pit gap
      const o = outside(s);
      track.sample(s, F);
      const d = STAND_D + DEPTH + 6;
      const g = new THREE.Group();
      g.position.set(F.pos.x + F.side.x * o * d, F.pos.y - 2, F.pos.z + F.side.z * o * d);
      g.lookAt(F.pos.x, g.position.y, F.pos.z);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.6, H, 10).translate(0, H / 2, 0), steel);
      pole.castShadow = true;
      const frame = new THREE.Mesh(new THREE.BoxGeometry(7, 3.4, 0.5).translate(0, H + 1, 0), steel);
      g.add(pole, frame);
      for (let r = 0; r < 2; r++) {
        for (let cI = 0; cI < 4; cI++) {
          const bulb = new THREE.Mesh(bulbGeo, lamp);
          bulb.position.set((cI - 1.5) * 1.6, H + 0.35 + r * 1.35, 0.32);
          g.add(bulb);
        }
      }
      scene.add(g);
    }
  }

  // ------------------------------------------------------------ seats for the crowd
  // walk each tier at an even 0.85 m, so the curves don't spread people out
  const spots = [];
  const P = new THREE.Vector3();
  for (const [s0, s1] of runs) {
    const along = new Float32Array(TIERS).fill(0.85); // a seat right at the start of the run
    for (let s = s0 + 0.6; s < s1 - 0.6; s += 0.25) {
      const o = outside(s), bend = track.curvatureAt(s) * o;
      track.sample(s, F);
      for (let t = 0; t < TIERS; t++) {
        const d = STAND_D + t * RUN + 0.45;
        // distance travelled along this tier: longer than the road's on the
        // outside of a bend
        along[t] += 0.25 * Math.max(0.2, 1 - bend * d);
        if (along[t] >= 0.85) {
          P.set(F.pos.x + F.side.x * o * d, F.pos.y + BASE + (t + 1) * RISE, F.pos.z + F.side.z * o * d);
          along[t] -= 0.85;
          if (rnd() < 0.07) continue; // the odd empty seat
          spots.push(P.x + (rnd() - 0.5) * 0.2, P.y, P.z + (rnd() - 0.5) * 0.2);
        }
      }
    }
  }
  return {
    spots,
    update(dt) { flagUniforms.uClock.value += dt; },
  };
}

export const SPEEDWAY_BAND = STAND_D + DEPTH + 30; // keep scenery out of this far on the outside
