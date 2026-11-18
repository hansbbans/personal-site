// The fun bits beside and across the road: the foam-brick wall cars burst
// through, and the pit box with its crew who change the wheels in the 3-lap race.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ROAD_HALF, WALL_T } from './course.js';
import { makeCanvas, mulberry32, clamp, smoothstep, TAU } from './util.js';
import { Track } from './track.js';

const FONT = '"Arial Rounded MT Bold", "Avenir Next", "Helvetica Neue", Arial, sans-serif';
const GRAV = 24;

function signTexture(text, bg, fg, edge, w = 1024, h = 256) {
  const c = makeCanvas(w, h), g = c.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.strokeStyle = edge;
  g.lineWidth = h * 0.09;
  g.strokeRect(h * 0.06, h * 0.06, w - h * 0.12, h - h * 0.12);
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  let size = h * 0.66;
  g.font = `900 ${size}px ${FONT}`;
  while (g.measureText(text).width > w * 0.86) g.font = `900 ${(size -= 4)}px ${FONT}`;
  g.lineJoin = 'round';
  g.lineWidth = size * 0.12;
  g.strokeStyle = edge;
  g.strokeText(text, w / 2, h * 0.54);
  g.fillStyle = fg;
  g.fillText(text, w / 2, h * 0.54);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

// A frame (pos, side = left, up, tan = forward) at lap distance s, as a matrix.
function frameMatrix(track, s, lat = 0) {
  const f = track.sample(s, Track.frame());
  const m = new THREE.Matrix4().makeBasis(f.side, new THREE.Vector3(0, 1, 0), f.tan.clone().setY(0).normalize());
  m.setPosition(f.pos.clone().addScaledVector(f.side, lat));
  return m;
}

// ------------------------------------------------------------------ foam wall
// Big soft bricks right across the road. A car bursts the ones in front of it
// (they tumble away and bounce), and they pop back up a couple of seconds later.
const COLS = 8, ROWS = 4, BRICK_H = 0.82;
const BRICK_COLORS = ['#ff5a4f', '#ffd21f', '#2f8cff', '#39c24f', '#ff7a1a', '#c86bff'];

export class FoamWall {
  constructor(track, wall) {
    this.group = new THREE.Group();
    this.basis = frameMatrix(track, wall.s);
    const span = (ROAD_HALF + 0.5) * 2;
    const bw = span / COLS;
    const geo = new RoundedBoxGeometry(bw * 0.97, BRICK_H * 0.95, WALL_T, 2, 0.12);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
    this.mesh = new THREE.InstancedMesh(geo, mat, COLS * ROWS + ROWS);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    this.bricks = [];
    const rnd = mulberry32(7);
    const c = new THREE.Color();
    // running bond: every other row is shifted half a brick; the row ends get
    // a half-width brick squeezed in (scaled), so the edges stay straight
    for (let r = 0; r < ROWS; r++) {
      const shift = r % 2 ? bw / 2 : 0;
      const n = r % 2 ? COLS + 1 : COLS;
      for (let k = 0; k < n; k++) {
        let lat = -span / 2 + bw / 2 + k * bw - shift;
        let sx = 1;
        if (r % 2 && (k === 0 || k === n - 1)) {
          sx = 0.5;
          lat = k === 0 ? -span / 2 + bw / 4 : span / 2 - bw / 4;
        }
        const b = {
          rest: new THREE.Vector3(lat, BRICK_H * (r + 0.5), 0),
          pos: new THREE.Vector3(lat, BRICK_H * (r + 0.5), 0),
          vel: new THREE.Vector3(),
          rot: new THREE.Euler(),
          spin: new THREE.Vector3(),
          sx, state: 'rest', t: 0,
        };
        this.mesh.setColorAt(this.bricks.length, c.set(BRICK_COLORS[(r * 3 + k + Math.floor(rnd() * 2)) % BRICK_COLORS.length]));
        this.bricks.push(b);
      }
    }
    this.mesh.count = this.bricks.length;
    this.group.add(this.mesh);

    // striped posts at each side and a sign over the top
    const postMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, map: stripeTexture() });
    const H = BRICK_H * ROWS;
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, H + 2.6, 16), postMat);
      post.position.set(sx * (span / 2 + 0.55), (H + 2.6) / 2, 0);
      post.castShadow = true;
      post.applyMatrix4(this.basis);
      this.group.add(post);
    }
    const tex = signTexture('CRASH WALL!', '#ffd21f', '#e2362b', '#1a1220');
    const signMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.2 });
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x1a1220, roughness: 0.6 });
    const sign = new THREE.Mesh(new THREE.BoxGeometry(span + 1.6, 1.5, 0.3), [edgeMat, edgeMat, edgeMat, edgeMat, signMat, signMat]);
    sign.position.set(0, H + 2.0, 0);
    sign.castShadow = true;
    sign.applyMatrix4(this.basis);
    this.group.add(sign);

    this.active = 0;
    this._m = new THREE.Matrix4();
    this._q = new THREE.Quaternion();
    this._s = new THREE.Vector3();
    this._p = new THREE.Vector3();
    this.update(0, true);
  }

  // A car going at v m/s bursts through at lateral offset lat. Returns how
  // many bricks it knocked flying.
  hit(lat, v) {
    let n = 0;
    for (const b of this.bricks) {
      if (b.state === 'fly' || Math.abs(b.rest.x - lat) > 1.75) continue;
      const away = Math.sign(b.rest.x - lat) || (Math.random() < 0.5 ? -1 : 1);
      b.state = 'fly';
      b.t = 0;
      b.pos.copy(b.rest);
      // about the car's own speed, so they tumble along beside it for a moment
      b.vel.set(away * (3 + Math.random() * 6), 4 + Math.random() * 5 + b.rest.y * 0.8, v * (0.8 + Math.random() * 0.35));
      b.spin.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 12);
      n++;
    }
    this.active += n;
    return n;
  }

  update(dt, force = false) {
    if (!this.active && !force) return;
    let busy = 0;
    this.bricks.forEach((b, i) => {
      if (b.state === 'fly') {
        b.t += dt;
        b.vel.y -= GRAV * dt;
        b.pos.addScaledVector(b.vel, dt);
        b.rot.x += b.spin.x * dt; b.rot.y += b.spin.y * dt; b.rot.z += b.spin.z * dt;
        const floor = BRICK_H * 0.47;
        if (b.pos.y < floor) {
          b.pos.y = floor;
          b.vel.y = Math.abs(b.vel.y) * 0.35;
          b.vel.x *= 0.55; b.vel.z *= 0.55;
          b.spin.multiplyScalar(0.5);
          if (b.vel.y < 1) { b.vel.y = 0; b.rot.x = Math.round(b.rot.x / (Math.PI / 2)) * (Math.PI / 2); b.rot.z = Math.round(b.rot.z / (Math.PI / 2)) * (Math.PI / 2); }
        }
        if (b.t > 2.4) { b.state = 'grow'; b.t = 0; b.pos.copy(b.rest); b.rot.set(0, 0, 0); }
      } else if (b.state === 'grow') {
        b.t += dt;
        if (b.t > 0.4) b.state = 'rest';
      }
      if (b.state !== 'rest') busy++;
      // fallen bricks shrink away, then pop back up in the wall with a little overshoot
      let k = 1;
      if (b.state === 'fly') k = 1 - smoothstep(2.0, 2.4, b.t);
      else if (b.state === 'grow') {
        const x = Math.min(1, b.t / 0.4) - 1;
        k = 1 + 2.7 * x * x * x + 1.7 * x * x;
      }
      k = Math.max(0.001, k);
      this._p.copy(b.pos);
      this._s.set(b.sx * k, k, k);
      this._q.setFromEuler(b.rot);
      this._m.compose(this._p, this._q, this._s).premultiply(this.basis);
      this.mesh.setMatrixAt(i, this._m);
    });
    this.active = busy;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

function stripeTexture() {
  const c = makeCanvas(64, 256), g = c.getContext('2d');
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, 64, 256);
  g.fillStyle = '#e2362b';
  for (let i = 0; i < 8; i += 2) g.fillRect(0, i * 32, 64, 32);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ------------------------------------------------------------------ golden ring
// Hangs over the flight path past the jump. Fly through it and it bursts
// (the race rules bank a boost); it comes back for the next lap.
const SPARKLE_N = 12;

export class GoldRing {
  constructor(track, ring) {
    this.ring = ring;
    this.group = new THREE.Group();
    frameMatrix(track, ring.s, ring.lat).decompose(this.group.position, this.group.quaternion, this.group.scale);
    const tube = 0.34;
    this.mat = new THREE.MeshStandardMaterial({
      color: 0xffd447, metalness: 1, roughness: 0.18, emissive: 0xffb300, emissiveIntensity: 0.4, transparent: true,
    });
    this.hoop = new THREE.Group();
    this.hoop.position.y = ring.y;
    const torus = new THREE.Mesh(new THREE.TorusGeometry(ring.r + tube, tube, 20, 72), this.mat);
    torus.castShadow = true;
    this.hoop.add(torus);
    // twinkling studs round the rim, so you can see it spin
    this.sparkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2b0, emissiveIntensity: 2.2, transparent: true });
    const studGeo = new THREE.OctahedronGeometry(0.34, 0);
    this.studs = [];
    for (let i = 0; i < SPARKLE_N; i++) {
      const a = (i / SPARKLE_N) * TAU;
      const m = new THREE.Mesh(studGeo, this.sparkMat);
      m.position.set(Math.cos(a) * (ring.r + tube), Math.sin(a) * (ring.r + tube), 0);
      this.hoop.add(m);
      this.studs.push(m);
    }
    this.group.add(this.hoop);
    this.state = 'on'; // 'on' | 'pop' (bursting) | 'off' | 'in' (coming back)
    this.t = 0;
  }

  // world position of the hoop's centre
  centre(out) {
    return this.hoop.getWorldPosition(out);
  }

  collect() {
    if (this.state === 'on' || this.state === 'in') { this.state = 'pop'; this.t = 0; }
  }

  reset(animate = true) {
    if (this.state === 'on') return;
    this.state = animate ? 'in' : 'on';
    this.t = 0;
    if (!animate) this._look(1, 1);
  }

  _look(scale, opacity) {
    this.hoop.scale.setScalar(Math.max(0.001, scale));
    this.mat.opacity = this.sparkMat.opacity = opacity;
    this.group.visible = opacity > 0.01;
  }

  update(dt, time) {
    this.t += dt;
    this.hoop.rotation.z = time * 0.9;
    this.hoop.position.y = this.ring.y + Math.sin(time * 2.2) * 0.12;
    this.studs.forEach((m, i) => m.scale.setScalar(0.7 + 0.5 * Math.abs(Math.sin(time * 3 + i * 1.3))));
    if (this.state === 'pop') {
      const k = clamp(this.t / 0.5, 0, 1);
      this._look(1 + k * 0.8, 1 - k);
      if (k >= 1) this.state = 'off';
    } else if (this.state === 'in') {
      const k = clamp(this.t / 0.6, 0, 1);
      this._look(smoothstep(0, 1, k) * (1 + Math.sin(k * Math.PI) * 0.25), 1);
      if (k >= 1) this.state = 'on';
    } else if (this.state === 'on') this._look(1, 1);
  }
}

// ------------------------------------------------------------------ pit box
// A garage beside the main straight (on the right). In the 3-lap race the
// player's car pulls in on lap 2, gets jacked up, and the crew swap all four
// wheels while the race waits.
export const PIT_LAT = -(ROAD_HALF + 5.4); // where the car stops, left of centre = +
const CREW_COLORS = ['#ff7a1a', '#2f8cff', '#ffd21f', '#39c24f'];

export class PitBox {
  constructor(track, pit) {
    this.track = track;
    this.pit = pit;
    this.group = new THREE.Group();
    const basis = frameMatrix(track, pit.s);
    this.basis = basis;
    const concrete = new THREE.MeshStandardMaterial({ color: 0xc9c4bb, roughness: 0.9 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.8 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x2a2730, roughness: 0.9 });
    const red = new THREE.MeshStandardMaterial({ color: 0xe2362b, roughness: 0.5 });
    const add = (geo, mat, x, y, z, shadow = true) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = shadow;
      m.receiveShadow = true;
      m.applyMatrix4(basis);
      this.group.add(m);
      return m;
    };
    // the slab the car stops on, from the curb out to the garage door
    const x0 = -(ROAD_HALF + 1.0), x1 = -(ROAD_HALF + 12.5);
    add(new THREE.BoxGeometry(x0 - x1, 3, 30), concrete, (x0 + x1) / 2, -1.45, 0, false);
    // painted box where the car stops
    const lines = new THREE.MeshStandardMaterial({ color: 0xffd21f, roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    for (const [w, d, x, z] of [[3.4, 0.2, 0, 3.2], [3.4, 0.2, 0, -3.2], [0.2, 6.6, 1.6, 0], [0.2, 6.6, -1.6, 0]]) {
      add(new THREE.BoxGeometry(w, 0.02, d), lines, PIT_LAT + x, 0.06, z, false);
    }
    // garage: back, sides, roof, open front with a dark inside
    const gx = x1 - 4; // centre, metres left of the road centre (negative = right)
    add(new THREE.BoxGeometry(0.4, 6.5, 22), wallMat, gx - 4, 1.25, 0);
    add(new THREE.BoxGeometry(8.4, 6.5, 0.4), wallMat, gx, 1.25, 11);
    add(new THREE.BoxGeometry(8.4, 6.5, 0.4), wallMat, gx, 1.25, -11);
    add(new THREE.BoxGeometry(8.4, 4, 21.6), dark, gx - 0.4, -0.5, 0, false); // floor / inside
    add(new THREE.BoxGeometry(9.6, 0.4, 23.4), red, gx + 0.3, 4.7, 0);
    // stripes over the door and a big sign on the roof
    const tex = signTexture('PIT STOP', '#e2362b', '#ffffff', '#1a1220');
    const signMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.2 });
    const sign = add(new THREE.BoxGeometry(0.3, 2.4, 12), [signMat, dark, dark, dark, dark, dark], gx + 4.2, 6.2, 0);
    sign.castShadow = true;
    // stacks of tyres inside the door
    const tyreGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 18);
    const tyreMat = new THREE.MeshStandardMaterial({ color: 0x17171b, roughness: 0.8 });
    for (const z of [-7.5, -5.8, 5.8, 7.5]) {
      for (let k = 0; k < 4; k++) add(tyreGeo, tyreMat, gx + 2.6, 0.17 + k * 0.31, z);
    }
    this.pile = new THREE.Vector3(gx + 2.6, 1.4, 7.5).applyMatrix4(basis); // old wheels get tossed here

    // the crew: four little helpers in overalls and helmets
    this.crew = CREW_COLORS.map((col, i) => {
      const g = new THREE.Group();
      const suit = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 });
      const skin = new THREE.MeshStandardMaterial({ color: ['#f2c9a0', '#a86d44', '#d9a273', '#7a4a2b'][i], roughness: 0.7 });
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.55, 4, 12), suit);
      body.position.y = 0.62;
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12), skin);
      head.position.y = 1.3;
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.29, 16, 10, 0, TAU, 0, Math.PI * 0.55), suit);
      helmet.position.y = 1.33;
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x15151a });
      for (const ex of [-0.09, 0.09]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), eyeMat);
        eye.position.set(ex, 1.32, 0.23);
        g.add(eye);
      }
      const arms = [-1, 1].map((sx) => {
        const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.42, 3, 8), suit);
        arm.geometry.translate(0, -0.24, 0);
        arm.position.set(sx * 0.36, 0.98, 0);
        g.add(arm);
        return arm;
      });
      for (const m of [body, head, helmet]) { m.castShadow = true; g.add(m); }
      g.visible = false;
      this.group.add(g);
      return { g, arms, home: new THREE.Vector3(gx + 3.2, 0, -3 + i * 2) };
    });
    this.show = null;
  }

  // --- the show. Times in seconds from the start.
  static get LENGTH() { return 5.6; }

  // car: the player's Car. Puts it in the box and starts the crew.
  start(car, audio) {
    const order = [0, 2, 1, 3]; // front-left, rear-left, front-right, rear-right
    this.show = { car, audio, t: 0, done: false, wheels: car.wheels.map(() => ({ stage: 0, old: null })), order };
    this.crew.forEach((c) => { c.g.visible = true; });
    this._f = Track.frame();
    return this.show;
  }

  // Where crew member i works: just outside wheel i.
  _wheelSpot(car, i, out, extra = 1.25) {
    const w = car.wheels[i];
    const side = Math.sign(w.home.x);
    return car.worldPoint(w.home.x + side * extra, 0, w.home.z, out);
  }

  // Returns true once the show is over. Places the car itself.
  update(dt, t) {
    const sh = this.show;
    if (!sh) return true;
    sh.t += dt;
    const T = sh.t, car = sh.car;
    // roll in over the first second, from a few metres back
    const roll = 1 - smoothstep(0, 1.1, T);
    const s = this.pit.s - roll * roll * 14;
    this.track.sample(s, this._f);
    const yaw = roll * 0.25;
    car.place(this._f, PIT_LAT + roll * 4.5, 0, yaw, 0, 0);
    // jack up, then down again with a bounce
    const up = smoothstep(1.15, 1.5, T) * (1 - smoothstep(3.9, 4.15, T));
    car.root.position.y += up * 0.3;
    if (T > 4.15 && !sh.dropped) { sh.dropped = true; car.land(); }
    sh.speed = roll > 0 ? 13 * roll : 0;

    // the crew run out, work, then cheer and run back
    const spot = new THREE.Vector3(), home = new THREE.Vector3(), look = new THREE.Vector3();
    this.crew.forEach((c, k) => {
      this._wheelSpot(car, sh.order[k], spot);
      home.copy(c.home).applyMatrix4(this.basis);
      const go = smoothstep(0.2 + k * 0.08, 1.2 + k * 0.08, T);
      const back = smoothstep(4.6 + k * 0.06, 5.5, T);
      const runningOut = go > 0 && go < 1, runningBack = back > 0 && back < 1;
      const cheer = T > 4.2 && !runningBack;
      const p = c.g.position.copy(home).lerp(spot, go * (1 - back));
      p.y = spot.y + (runningOut || runningBack ? Math.abs(Math.sin(t * 14 + k)) * 0.25 : 0)
        + (cheer ? Math.abs(Math.sin(t * 9 + k * 1.3)) * 0.45 : 0);
      look.copy(runningBack ? home : car.root.position).setY(p.y);
      c.g.lookAt(look);
      const busy = go >= 1 && !cheer && !runningBack;
      c.arms.forEach((a, j) => {
        a.rotation.x = cheer ? -2.8 + Math.sin(t * 9 + j) * 0.3
          : busy ? -1.3 + Math.sin(t * 30 + j * 2) * 0.12
          : Math.sin(t * 14 + j * Math.PI) * 0.8;
      });
    });

    // the wheels: rattle, pull off and toss to the pile, new one pops on
    sh.order.forEach((i, k) => {
      const w = car.wheels[i], st = sh.wheels[i];
      const t0 = 1.6 + k * 0.42;
      const side = Math.sign(w.home.x);
      const lt = T - t0;
      let out = 0;
      if (lt >= 0 && st.stage === 0) { st.stage = 1; sh.audio && sh.audio.wrench(); }
      if (lt > 0.4 && lt < 0.8) out = smoothstep(0.4, 0.8, lt) * 0.7;
      if (lt >= 0.8 && st.stage === 1) {
        st.stage = 2;
        // the old wheel flies off to the pile
        st.old = w.pivot.clone();
        st.oldFrom = car.worldPoint(w.home.x + side * 0.7, w.home.y + 0.3, w.home.z, new THREE.Vector3());
        st.old.quaternion.copy(car.root.quaternion);
        this.group.add(st.old);
        w.pivot.visible = false;
      }
      // the toss runs on its own clock: the new wheel is on before the old one lands
      if (st.old && st.old.parent) {
        const ft = clamp((lt - 0.8) / 0.75, 0, 1);
        st.old.position.lerpVectors(st.oldFrom, this.pile, ft);
        st.old.position.y += Math.sin(ft * Math.PI) * 2.6;
        st.old.rotateX(dt * 12);
        st.old.scale.setScalar(1 - smoothstep(0.75, 1, ft));
        if (ft >= 1) this.group.remove(st.old);
      }
      if (lt >= 0.95 && st.stage === 2) {
        st.stage = 3;
        w.pivot.visible = true;
        sh.audio && sh.audio.wrench();
      }
      if (st.stage >= 3) {
        const it = clamp((lt - 0.95) / 0.35, 0, 1);
        out = (1 - smoothstep(0, 1, it)) * 0.9;
        const pop = Math.min(1, it * 3);
        w.pivot.scale.setScalar(0.2 + 0.8 * pop + Math.sin(pop * Math.PI) * 0.15);
        if (it >= 1 && st.stage === 3) { st.stage = 4; w.pivot.scale.setScalar(1); sh.audio && sh.audio.ding(); sh.sparkle = { i, at: T }; }
      }
      w.pivot.position.x = w.home.x + side * out;
      // the wheel gun rattles the wheel
      if (st.stage === 1 && lt < 0.4) w.pivot.rotation.z = Math.sin(t * 90) * 0.04;
      else w.pivot.rotation.z = 0;
    });

    if (T >= PitBox.LENGTH) sh.done = true;
    return sh.done;
  }

  // Put everything back as it was: wheels on, crew home and hidden.
  stop() {
    const sh = this.show;
    if (!sh) return;
    for (const w of sh.car.wheels) {
      w.pivot.visible = true;
      w.pivot.scale.setScalar(1);
      w.pivot.position.x = w.home.x;
      w.pivot.rotation.z = 0;
    }
    for (const st of sh.wheels) if (st.old && st.old.parent) st.old.parent.remove(st.old);
    this.crew.forEach((c) => { c.g.visible = false; });
    this.show = null;
  }

  // Camera for the show: in front of the car on the road side, looking back
  // at it with the garage behind.
  cameraPose(out, t) {
    const car = this.show.car;
    const a = 0.5 + Math.sin(t * 0.3) * 0.12;
    car.worldPoint(Math.sin(a) * 8, 4.4, Math.cos(a) * 8, out.pos);
    car.worldPoint(-0.3, 0.4, -0.3, out.look);
    out.fov = 46;
  }
}

