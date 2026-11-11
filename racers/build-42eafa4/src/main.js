import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Track, laneOffset, buildCourse } from './track.js';
import { COURSE } from './course.js';
import { Minimap } from './minimap.js';
import { buildWorld } from './world.js';
import { Car, CAR_SPECS } from './car.js';
import { Race, PLAYER_VMAX, BOOST_V, START_S } from './race.js';
import { AudioSys } from './audio.js';
import { Particles, Confetti } from './effects.js';
import { clamp, lerp, damp, smoothstep, ordinalSuffix } from './util.js';

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const LAPS = 2;
const N = CAR_SPECS.length;

// ------------------------------------------------------------------ renderer
const canvas = $('game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping; // keeps the candy paint colours rich
renderer.toneMappingExposure = 0.9;

const isTouch = matchMedia('(pointer: coarse)').matches;
let dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.4, 14000);

const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4 }));
composer.addPass(new RenderPass(scene, camera));
// The sun in the sky is thousands of times brighter than anything else; cap it
// so the glow stays a glow instead of whiting out the screen.
composer.addPass(new ShaderPass({
  uniforms: { tDiffuse: { value: null } },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `uniform sampler2D tDiffuse; varying vec2 vUv; void main(){ gl_FragColor = vec4(min(texture2D(tDiffuse, vUv).rgb, vec3(2.4)), 1.0); }`,
}));
const bloom = new UnrealBloomPass(new THREE.Vector2(4, 4), 0.17, 0.65, 1.45);
composer.addPass(bloom);
// vignette plus a touch of radial blur at the screen edges when going fast
const grade = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, uSpeed: { value: 0 }, uVignette: { value: 1 } },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uSpeed; uniform float uVignette; varying vec2 vUv;
    void main() {
      vec2 p = vUv - 0.5;
      float r = length(p);
      vec2 dir = p * uSpeed * 0.038 * smoothstep(0.14, 0.6, r);
      vec3 acc = vec3(0.0);
      for (int i = 0; i < 6; i++) acc += texture2D(tDiffuse, vUv - dir * (float(i) / 5.0)).rgb;
      vec3 c = acc / 6.0;
      c *= mix(1.0, 0.5, smoothstep(0.3, 0.95, r * 1.25) * uVignette);
      gl_FragColor = vec4(c, 1.0);
    }`,
});
composer.addPass(grade);
composer.addPass(new OutputPass());

function resize() {
  const w = Math.max(2, window.innerWidth), h = Math.max(2, window.innerHeight);
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(dpr);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// ------------------------------------------------------------------ world
const track = new Track();
scene.add(track.buildMeshes(renderer.capabilities.getMaxAnisotropy()));
const world = buildWorld(scene, renderer, track);
const course = buildCourse(track, COURSE, renderer.capabilities.getMaxAnisotropy());
scene.add(course.group);
const minimap = new Minimap($('minimap'), track, COURSE, CAR_SPECS);
const cars = CAR_SPECS.map((s, i) => new Car(s, i));
cars.forEach((c) => scene.add(c.root));
const dust = new Particles(900);
const sparks = new Particles(260, true);
const confetti = new Confetti();
scene.add(dust.mesh, sparks.mesh, confetti.mesh);
const audio = new AudioSys();

// ------------------------------------------------------------------ state
const G = {
  state: 'loading',
  t: 0, // seconds in the current state
  time: 0,
  sel: clamp(parseInt(params.get('car') ?? '2', 10) || 0, 0, N - 1),
  race: null,
  input: { up: false, down: false, left: false, right: false },
  pitch: new Float32Array(N),
  camLat: 0,
  camY: 0,
  shake: 0,
  steered: false,
  rev: new Float32Array(N),
  revKick: new Float32Array(N),
  dustAcc: new Float32Array(N),
  countStep: -1,
  placeShown: 0,
  lapShown: 0,
  idle: 0,
  orbit: 0,
  finishPanel: false,
  confettiAt: 0,
  autopilot: params.has('auto'),
  selLat: 0,
};
G.selLat = laneOffset(G.sel);

const F = Track.frame(), FA = Track.frame(), FB = Track.frame();
const V = new THREE.Vector3(), V2 = new THREE.Vector3(), FWD = new THREE.Vector3();

// ------------------------------------------------------------------ camera
const cam = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 40 };
const want = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 40 };
const from = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 40 };
let blendT = 1, blendDur = 1, blendArc = 0;
function camBlend(dur, arc = 0) {
  from.pos.copy(cam.pos);
  from.look.copy(cam.look);
  from.fov = cam.fov;
  blendT = 0;
  blendDur = dur;
  blendArc = arc;
}
const portraitWiden = () => clamp(1.25 / camera.aspect, 1, 2.2) || 1;

function chasePose(out, s, lat, v, y = 0) {
  track.sample(s - 7.3, FA);
  out.pos.copy(FA.pos).addScaledVector(FA.side, lat * 0.86);
  out.pos.y += 2.75 + y * 0.4; // follow the jump only part way, so you see the car fly
  track.sample(s + 9, FB);
  out.look.copy(FB.pos).addScaledVector(FB.side, lat * 0.78);
  out.look.y += 1.0 + y * 0.55;
  const boost = clamp((v - PLAYER_VMAX) / (BOOST_V - PLAYER_VMAX), 0, 1);
  out.fov = (lerp(54, 72, Math.pow(clamp(v / PLAYER_VMAX, 0, 1), 1.6)) + boost * 10) * Math.min(1.25, portraitWiden());
}

function updateCamera(dt) {
  const p = G.race ? G.race.player : null;
  const playerCar = cars[G.sel];
  const lat = laneOffset(G.sel);
  if (G.freeCam) {
    camera.updateProjectionMatrix();
    return;
  }
  if (G.state === 'select' || G.state === 'loading') {
    G.selLat = damp(G.selLat, lat, 6, dt);
    const dist = 10.2 * portraitWiden();
    track.sample(START_S + dist, FA);
    want.pos.copy(FA.pos).addScaledVector(FA.side, G.selLat + 2.3 + Math.sin(G.time * 0.4) * 0.4);
    want.pos.y += 1.9;
    track.sample(START_S + 0.6, FB);
    want.look.copy(FB.pos).addScaledVector(FB.side, G.selLat);
    want.look.y += 0.1;
    want.fov = 33;
  } else if (G.state === 'grid') {
    if (G.t < T_DOLLY) {
      // slide along the row of faces
      const k = smoothstep(0, 1, G.t / T_DOLLY);
      const x = lerp(7.4, -7.4, k);
      track.sample(START_S + 7.2 * portraitWiden(), FA);
      want.pos.copy(FA.pos).addScaledVector(FA.side, x);
      want.pos.y += 0.95;
      track.sample(START_S, FB);
      want.look.copy(FB.pos).addScaledVector(FB.side, x * 0.82);
      want.look.y += 0.72;
      want.fov = 44;
    } else {
      chasePose(want, START_S, lat, 0);
    }
  } else if (G.state === 'race') {
    // the camera follows the player's steering and jumps, a touch behind
    G.camLat = damp(G.camLat, p.lat, 5, dt);
    G.camY = damp(G.camY, p.y, 9, dt);
    chasePose(want, p.s, G.camLat, p.v, G.camY);
  } else if (G.state === 'finish') {
    G.orbit += dt * 0.42;
    const a = G.orbit, r = 7.4 * portraitWiden();
    playerCar.worldPoint(Math.sin(a) * r, 2.1 + Math.sin(a * 0.5) * 0.7, -Math.cos(a) * r, want.pos);
    playerCar.worldPoint(0, 0.8, 0.2, want.look);
    want.fov = 46;
  }
  if (blendT < 1) {
    blendT = Math.min(1, blendT + dt / blendDur);
    const k = smoothstep(0, 1, blendT);
    cam.pos.lerpVectors(from.pos, want.pos, k);
    cam.pos.y += Math.sin(k * Math.PI) * blendArc;
    cam.look.lerpVectors(from.look, want.look, k);
    cam.fov = lerp(from.fov, want.fov, k);
  } else {
    cam.pos.copy(want.pos);
    cam.look.copy(want.look);
    cam.fov = want.fov;
  }
  camera.position.copy(cam.pos);
  if (G.state === 'race' && p) {
    G.shake = Math.max(0, G.shake - dt * 2.5);
    const sh = Math.pow(clamp(p.v / PLAYER_VMAX, 0, 1.3), 3) * 0.035 + G.shake * 0.25;
    camera.position.x += (Math.random() - 0.5) * sh;
    camera.position.y += (Math.random() - 0.5) * sh;
  }
  camera.lookAt(cam.look);
  if (Math.abs(camera.fov - cam.fov) > 0.01) {
    camera.fov = cam.fov;
    camera.updateProjectionMatrix();
  }
}

// ------------------------------------------------------------------ flow
const T_DOLLY = 3.2; // camera slides along the grid
const T_SWOOP = 1.7; // camera flies round behind the player
const T_COUNT = 0.95; // seconds per countdown number
const ui = {
  select: $('select'), hud: $('hud'), count: $('count'), touch: $('touch'), finish: $('finish'),
  carName: $('carName'), placeNum: $('placeNum'), placeSuf: $('placeSuf'), place: $('place'),
  lapNum: $('lapNum'), speedFill: $('speedFill'), speedNum: $('speedNum'), hint: $('hint'), banner: $('banner'),
  finPlace: $('finPlace'), finMedal: $('finMedal'), fade: $('fade'), speedo: $('speedo'),
};
const show = (el, on) => el.classList.toggle('hidden', !on);
$('lapTotal').textContent = LAPS;

function setName() {
  const spec = CAR_SPECS[G.sel];
  ui.carName.textContent = spec.name;
  ui.carName.style.color = spec.color;
  ui.carName.classList.remove('pop');
  void ui.carName.offsetWidth;
  ui.carName.classList.add('pop');
}

function pick(i, fromUser = true) {
  G.sel = (i + N) % N;
  setName();
  if (fromUser) {
    cars[G.sel].hop();
    G.revKick[G.sel] = 1;
    audio.blip();
  }
}

function showSelect() {
  G.state = 'select';
  G.t = 0;
  G.race = null;
  G.selLat = laneOffset(G.sel);
  document.body.classList.remove('racing');
  show(ui.select, true); show(ui.hud, false); show(ui.count, false); show(ui.touch, false); show(ui.finish, false);
  world.setLights('off');
  setName();
  blendT = 1;
}

function startGrid() {
  const prevState = G.state;
  audio.ensure(N);
  G.race = new Race({ trackLength: track.length, laps: LAPS, playerIndex: G.sel, count: N, seed: (Math.random() * 1e9) | 0, course: COURSE });
  G.state = 'grid';
  G.t = 0;
  G.countStep = -1;
  G.placeShown = 0;
  G.lapShown = 1;
  G.idle = 0;
  G.finishPanel = false;
  G.camLat = laneOffset(G.sel);
  G.camY = 0;
  G.shake = 0;
  G.steered = false;
  G.pitch.fill(0);
  document.body.classList.add('racing');
  show(ui.select, false); show(ui.hud, false); show(ui.finish, false); show(ui.touch, false); show(ui.count, false);
  ui.hint.classList.remove('on');
  ui.banner.classList.remove('show');
  world.setLights('off');
  // From the pick screen the camera glides over; after a race it is somewhere
  // far round the track, so cut straight to the grid instead.
  if (prevState === 'select') camBlend(0.7);
  else blendT = 1;
  G.swooped = false;
}

function go() {
  G.race.start();
  G.state = 'race';
  G.t = 0;
  show(ui.hud, true);
  ui.lapNum.textContent = '1';
  audio.cheer(2.6, 0.3);
}

function finishRace() {
  const place = G.race.player.place;
  G.state = 'finish';
  G.t = 0;
  G.orbit = 0;
  G.confettiAt = 0;
  G.input.up = G.input.down = G.input.left = G.input.right = false;
  syncPedals();
  show(ui.hud, false);
  show(ui.touch, false);
  ui.hint.classList.remove('on');
  ui.finPlace.textContent = `${place}${ordinalSuffix(place)}!`;
  ui.finMedal.textContent = ['🏆', '🥈', '🥉'][place - 1] || '⭐';
  audio.fanfare();
  audio.cheer(4.5, place <= 3 ? 0.5 : 0.35);
  camBlend(1.4);
}

function fadeThen(fn) {
  ui.fade.classList.add('on');
  setTimeout(() => {
    fn();
    requestAnimationFrame(() => ui.fade.classList.remove('on'));
  }, 380);
}

// ------------------------------------------------------------------ input
function press(what) {
  if (G.state === 'select') {
    // The camera faces the cars, so screen-right is the cars' left (lower lane numbers).
    if (what === 'left') pick(G.sel + 1);
    else if (what === 'right') pick(G.sel - 1);
    else if (what === 'ok' || what === 'up') startGrid();
  } else if (G.state === 'finish' && G.finishPanel && G.t > 3) {
    if (what === 'ok' || what === 'up') fadeThen(startGrid);
  }
}
function syncPedals() {
  $('btnUp').classList.toggle('on', G.input.up);
  $('btnDown').classList.toggle('on', G.input.down);
  $('btnLeft').classList.toggle('on', G.input.left);
  $('btnRight').classList.toggle('on', G.input.right);
}
window.addEventListener('keydown', (e) => {
  const k = e.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(k)) e.preventDefault();
  if (e.repeat) return;
  audio.ensure(N);
  if (k === 'ArrowUp' || k === 'w' || k === 'W') { G.input.up = true; press('up'); }
  else if (k === 'ArrowDown' || k === 's' || k === 'S') G.input.down = true;
  else if (k === 'ArrowLeft' || k === 'a' || k === 'A') { G.input.left = true; press('left'); }
  else if (k === 'ArrowRight' || k === 'd' || k === 'D') { G.input.right = true; press('right'); }
  else if (k === 'Enter' || k === ' ') press('ok');
  else if (k === 'm' || k === 'M') toggleMute();
  syncPedals();
});
window.addEventListener('keyup', (e) => {
  const k = e.key;
  if (k === 'ArrowUp' || k === 'w' || k === 'W') G.input.up = false;
  else if (k === 'ArrowDown' || k === 's' || k === 'S') G.input.down = false;
  else if (k === 'ArrowLeft' || k === 'a' || k === 'A') G.input.left = false;
  else if (k === 'ArrowRight' || k === 'd' || k === 'D') G.input.right = false;
  syncPedals();
});
window.addEventListener('blur', () => { G.input.up = G.input.down = G.input.left = G.input.right = false; syncPedals(); });
for (const [id, key] of [['btnUp', 'up'], ['btnDown', 'down'], ['btnLeft', 'left'], ['btnRight', 'right']]) {
  const el = $(id);
  const set = (on) => (e) => {
    e.preventDefault();
    audio.ensure(N);
    if (on && el.setPointerCapture) { try { el.setPointerCapture(e.pointerId); } catch {} }
    G.input[key] = on;
    syncPedals();
  };
  el.addEventListener('pointerdown', set(true));
  el.addEventListener('pointerup', set(false));
  el.addEventListener('pointercancel', set(false));
  el.addEventListener('lostpointercapture', set(false));
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}
const tap = (id, fn) => $(id).addEventListener('click', (e) => { e.preventDefault(); audio.ensure(N); fn(); e.currentTarget.blur(); });
tap('prev', () => press('left'));
tap('next', () => press('right'));
tap('go', () => press('ok'));
tap('again', () => fadeThen(startGrid));
tap('pick', () => fadeThen(showSelect));
function toggleMute() {
  audio.setMuted(!audio.muted);
  $('mute').textContent = audio.muted ? '🔇' : '🔊';
}
tap('mute', toggleMute);
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

// tap a car to choose it
const ray = new THREE.Raycaster();
const sphere = new THREE.Sphere();
canvas.addEventListener('pointerdown', (e) => {
  audio.ensure(N);
  if (G.state !== 'select') return;
  const r = canvas.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
  let best = -1, bestD = Infinity;
  for (let i = 0; i < N; i++) {
    sphere.center.copy(cars[i].root.position);
    sphere.center.y += 0.7;
    sphere.radius = 1.25;
    if (ray.ray.intersectSphere(sphere, V)) {
      const d = V.distanceTo(camera.position);
      if (d < bestD) { bestD = d; best = i; }
    }
  }
  if (best >= 0 && best !== G.sel) pick(best);
  else if (best === G.sel) cars[best].hop();
});

function banner(text) {
  ui.banner.textContent = text;
  ui.banner.classList.remove('show');
  void ui.banner.offsetWidth;
  ui.banner.classList.add('show');
}

// Boosts, jumps, landings and bumps reported by the race rules.
function handleEvents() {
  const race = G.race;
  for (const e of race.events) {
    const i = e.car.index, car = cars[i];
    const isP = e.car.isPlayer;
    const near = car.root.position.distanceToSquared(camera.position) < 120 * 120;
    if (e.type === 'boost' && isP) {
      audio.whoosh();
      audio.blip();
      G.shake = Math.max(G.shake, 0.5);
      if (G.state === 'race') banner('BOOST!');
    } else if (e.type === 'jump' && isP) {
      audio.cheer(1.8, 0.35);
      if (G.state === 'race') banner('WHEEE!');
    } else if (e.type === 'land' && near) {
      if (e.impact < 3) continue; // a little drop off the ramp's edge
      car.land();
      if (isP) {
        G.shake = Math.max(G.shake, clamp(e.impact / 10, 0.3, 1));
        audio.noiseBurst({ dur: 0.35, vol: 0.35, f0: 120, f1: 380, f2: 90, q: 0.8, attack: 0.005 });
      }
      FWD.set(0, 0, 1).applyQuaternion(car.root.quaternion);
      for (let k = 0; k < 40; k++) {
        const side = Math.random() < 0.5 ? -1 : 1;
        car.worldPoint(side * (0.6 + Math.random() * 0.5), 0.1, (Math.random() - 0.5) * 3.2, V);
        dust.spawn(
          V.x, V.y, V.z,
          side * FWD.z * (2 + Math.random() * 4), 0.6 + Math.random() * 2, -side * FWD.x * (2 + Math.random() * 4),
          0.7 + Math.random() * 0.6, 0.6, 3.2, 0.9, 0.74, 0.55, 0.32, 1
        );
      }
    } else if (e.type === 'bump' && isP) {
      G.shake = Math.max(G.shake, 0.6);
      cars[e.rival.index].hop();
      audio.noiseBurst({ dur: 0.18, vol: 0.3, f0: 220, f1: 700, f2: 160, q: 1, attack: 0.003 });
    }
  }
  race.events.length = 0;
}

// ------------------------------------------------------------------ per-frame
function rpmFor(v) {
  const f = clamp(v / PLAYER_VMAX, 0, 1.05);
  const gears = [0, 0.2, 0.38, 0.57, 0.78, 1.08];
  for (let g = 0; g < gears.length - 1; g++) {
    if (f < gears[g + 1]) {
      const k = (f - gears[g]) / (gears[g + 1] - gears[g]);
      return g === 0 ? lerp(0.2, 1, k) : lerp(0.56, 1, k);
    }
  }
  return 1;
}

function updateGrid() {
  const t = G.t;
  if (!G.swooped && t >= T_DOLLY) {
    G.swooped = true;
    camBlend(T_SWOOP, 3.2);
    show(ui.touch, true);
  }
  const t0 = T_DOLLY + T_SWOOP;
  const step = Math.floor((t - t0) / T_COUNT);
  if (step >= 0 && step !== G.countStep) {
    G.countStep = step;
    if (step < 3) {
      ui.count.innerHTML = `<span>${3 - step}</span>`;
      show(ui.count, true);
      world.setLights([1, 3, 5][step]);
      audio.countBeep(false);
    } else if (step === 3) {
      ui.count.innerHTML = '<span class="go">GO!</span>';
      world.setLights('green');
      audio.countBeep(true);
      go();
      setTimeout(() => show(ui.count, false), 1200);
      setTimeout(() => { if (G.state === 'race') world.setLights('off'); }, 3500);
    }
  }
}

function updateCars(dt) {
  const race = G.race;
  const pre = G.state === 'grid';
  for (let i = 0; i < N; i++) {
    const car = cars[i];
    const rc = race ? race.cars[i] : null;
    const s = rc ? rc.s : START_S;
    const v = rc ? rc.v : 0;
    track.sample(s, F);
    const curv = track.curvatureAt(s);
    const wander = rc && rc.isPlayer ? 0 : Math.sin(G.time * 0.55 + i * 1.7) * 0.13 * clamp(v / 25, 0, 1);
    G.pitch[i] = damp(G.pitch[i], rc ? rc.pitch : 0, 14, dt);
    car.place(F, (rc ? rc.lat : laneOffset(i)) + wander, rc ? rc.y : 0, rc ? rc.yaw : 0, G.pitch[i], rc ? rc.ground : 0);

    // engine revving on the grid
    let revT = 0;
    if (pre) {
      const isP = i === G.sel;
      const blip = Math.pow(Math.max(0, Math.sin(G.time * (2.3 + i * 0.37) + i * 2.1)), 4);
      const last = G.countStep >= 2 ? 0.55 : 0;
      revT = isP ? (G.input.up || G.autopilot ? 1 : 0.1 + blip * 0.45) : Math.max(last, blip * 0.9);
    } else if (G.state === 'select') {
      G.revKick[i] = Math.max(0, G.revKick[i] - dt * 1.6);
      revT = G.revKick[i];
    }
    G.rev[i] = damp(G.rev[i], revT, revT > G.rev[i] ? 14 : 5, dt);

    let mood = 'calm';
    if (G.state === 'select') mood = i === G.sel ? 'grin' : 'calm';
    else if (pre) mood = 'rev';
    else if (rc) {
      if (rc.finished) mood = 'happy';
      else if (rc.braking) mood = 'brake';
      else mood = v > PLAYER_VMAX * 0.86 || rc.air ? 'fast' : 'race';
    }
    car.setMood(mood);
    car.update(dt, G.time, {
      v,
      a: rc ? rc.a : 0,
      latAcc: v * v * curv + (rc ? rc.latV * v * 0.025 : 0),
      curv,
      steer: rc ? rc.yaw * 1.6 : 0,
      rev: G.rev[i],
      braking: rc ? rc.braking : false,
      camPos: camera.position,
    });
  }
}

function updateFx(dt) {
  const race = G.race;
  if (race && (G.state === 'race' || G.state === 'finish')) {
    for (let i = 0; i < N; i++) {
      const rc = race.cars[i], car = cars[i];
      if (car.root.position.distanceToSquared(camera.position) > 170 * 170) continue;
      const v = rc.v;
      if (rc.air) continue;
      const launch = race.time < 1.9 && v > 0.5;
      const smoke = launch || (rc.braking && v > 8);
      let rate = v > 6 ? 8 + v * 0.34 : 0;
      if (launch) rate += 95;
      else if (smoke) rate += 70;
      G.dustAcc[i] += rate * dt;
      FWD.set(0, 0, 1).applyQuaternion(car.root.quaternion);
      while (G.dustAcc[i] >= 1) {
        G.dustAcc[i] -= 1;
        const side = Math.random() < 0.5 ? -1 : 1;
        car.worldPoint(side * 0.86, 0.14, -1.4, V);
        const back = -(1 + Math.random() * 2);
        const c = smoke ? [0.95, 0.95, 0.97] : [0.86, 0.68, 0.48];
        dust.spawn(
          V.x, V.y, V.z,
          FWD.x * back + (Math.random() - 0.5) * 1.6, 0.5 + Math.random() * 1.2, FWD.z * back + (Math.random() - 0.5) * 1.6,
          0.6 + Math.random() * 0.7, 0.45, smoke ? 3.4 : 2.3,
          c[0], c[1], c[2], smoke ? 0.3 : 0.15, 1.2
        );
      }
      // exhaust flames at full chat
      const boosting = rc.boostT > 0;
      if (!rc.finished && (launch || boosting || (v > PLAYER_VMAX * 0.9 && rc.throttle > 0.8)) && Math.random() < dt * (boosting ? 120 : 40)) {
        const side = Math.random() < 0.5 ? -0.42 : 0.42;
        car.worldPoint(side, 0.36, -2.08, V);
        const k = v - 5 - Math.random() * 4;
        sparks.spawn(V.x, V.y, V.z, FWD.x * k, 0.15, FWD.z * k, 0.07 + Math.random() * 0.07, 0.3, 0.05, 3.0, 1.1 + Math.random() * 0.8, 0.25, 0.85, 0);
      }
    }
  }
  const px = (window.innerHeight * dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  dust.update(dt, px);
  sparks.update(dt, px);

  if (G.state === 'finish') {
    G.confettiAt -= dt;
    if (G.confettiAt <= 0 && G.t < 9) {
      G.confettiAt = 0.55;
      confetti.burst(cars[G.sel].root.position, 70, 5);
    }
  }
  if (G.race && G.state === 'finish') {
    FWD.set(0, 0, 1).applyQuaternion(cars[G.sel].root.quaternion).multiplyScalar(G.race.player.v);
    confetti.update(dt, G.time, FWD);
  } else confetti.update(dt, G.time, null);
}

function updateAudio() {
  if (!audio.ready) return;
  const race = G.race;
  const pIdx = G.sel;
  const p = race ? race.player : null;
  for (let i = 0; i < N; i++) {
    const e = audio.engines[i];
    const rc = race ? race.cars[i] : null;
    const isP = i === pIdx;
    V.copy(cars[i].root.position).applyMatrix4(camera.matrixWorldInverse);
    const dist = V.length();
    const pan = clamp(V.x / 10, -1, 1) * (isP && G.state !== 'select' && G.state !== 'grid' ? 0.15 : 1);
    let rpm, throttle, vol, pitch = 1;
    if (G.freeCam) {
    camera.updateProjectionMatrix();
    return;
  }
  if (G.state === 'select' || G.state === 'loading') {
      rpm = 0.16 + G.rev[i] * 0.6;
      throttle = G.rev[i];
      vol = (isP ? 0.2 : 0.07) + G.rev[i] * 0.25;
    } else if (G.state === 'grid') {
      rpm = 0.18 + G.rev[i] * 0.78;
      throttle = G.rev[i];
      vol = isP ? 0.3 + G.rev[i] * 0.3 : (0.16 + G.rev[i] * 0.22) / (1 + (dist / 14) ** 2) + 0.05;
    } else {
      rpm = rpmFor(rc.v);
      throttle = rc.throttle;
      if (isP) vol = G.state === 'finish' ? 0.22 : 0.42 + 0.14 * throttle;
      else {
        vol = 0.55 / (1 + (dist / 11) ** 2);
        // exaggerated Doppler as cars close and pull away
        const closing = (p.v - rc.v) * Math.sign(rc.s - p.s);
        pitch = 1 + clamp(closing / 110, -0.2, 0.2);
      }
    }
    e.set(rpm, throttle, vol, pan, pitch);
  }
  const dStand = camera.position.distanceTo(world.standPos);
  const nearStand = 1 / (1 + (dStand / 90) ** 2);
  audio.setCrowd((G.state === 'finish' ? 0.2 : G.state === 'grid' ? 0.14 : 0.03) + nearStand * 0.16);
}

function updateHud(dt) {
  const race = G.race;
  if (G.state !== 'race' || !race) return;
  const p = race.player;
  const place = race.placeOf(p);
  if (place !== G.placeShown) {
    if (G.placeShown && race.time > 2.5) audio.whoosh();
    G.placeShown = place;
    ui.placeNum.textContent = place;
    ui.placeSuf.textContent = ordinalSuffix(place);
    ui.place.classList.remove('pop');
    void ui.place.offsetWidth;
    ui.place.classList.add('pop');
  }
  const lap = race.lapOf(p);
  if (lap !== G.lapShown) {
    G.lapShown = lap;
    ui.lapNum.textContent = lap;
    if (lap === LAPS) {
      banner('FINAL LAP!');
      audio.blip();
      audio.cheer(2.2, 0.3);
    }
  }
  minimap.draw(race, G.sel);
  ui.speedFill.style.width = `${clamp(p.v / PLAYER_VMAX, 0, 1) * 100}%`;
  ui.speedNum.textContent = Math.round(p.v * 2.23694);
  ui.speedo.classList.toggle('boost', p.boostT > 0);
  // nudge a child who has let go of everything; early on, show how to steer
  if (G.input.left || G.input.right) G.steered = true;
  G.idle = !G.input.up && p.v < 32 ? G.idle + dt : 0;
  const steerTip = !G.steered && race.time > 2.5 && race.time < 9;
  const tip = G.idle > 2.2 ? 'fast' : steerTip ? 'steer' : '';
  if (tip && tip !== G.tip) {
    ui.hint.innerHTML = tip === 'fast' ? 'Hold <kbd>▲</kbd> to go fast!' : '<kbd>◀</kbd> <kbd>▶</kbd> to steer!';
  }
  G.tip = tip || G.tip;
  ui.hint.classList.toggle('on', !!tip);
}

function update(dt) {
  G.time += dt;
  G.t += dt;
  if (G.autopilot) {
    if (G.state === 'select' && G.t > 0.5) startGrid();
    G.input.up = G.state === 'race' || G.state === 'grid';
  }
  if (G.state === 'grid') updateGrid();
  if (G.race && (G.state === 'race' || G.state === 'finish')) {
    // fixed small steps keep the race identical at any frame rate
    let left = dt;
    while (left > 1e-6) {
      const h = Math.min(left, 1 / 90);
      G.race.update(h, G.input);
      left -= h;
    }
    handleEvents();
    if (G.state === 'race' && G.race.player.finished) finishRace();
  }
  course.tick(dt);
  if (G.state === 'finish' && !G.finishPanel && G.t > 1.4) {
    G.finishPanel = true;
    show(ui.finish, true);
  }
  updateCars(dt);
  updateCamera(dt);
  camera.updateMatrixWorld();
  updateFx(dt);
  updateAudio();
  updateHud(dt);
  const focus = cars[G.sel].root.position;
  const excite = G.state === 'grid' || G.state === 'finish' ? 1 : G.state === 'race' ? 0.55 : 0.2;
  world.update(dt, G.time, focus, excite);
  const sp = G.state === 'race' ? Math.pow(clamp(G.race.player.v / PLAYER_VMAX, 0, 1), 2.2) : 0;
  grade.uniforms.uSpeed.value = damp(grade.uniforms.uSpeed.value, sp, 6, dt);
}

// keep it smooth on slower machines by trading resolution
let fpsAvg = 60, slowFor = 0;
function adapt(dt) {
  fpsAvg = lerp(fpsAvg, 1 / Math.max(dt, 1e-3), 0.05);
  slowFor = fpsAvg < 45 ? slowFor + dt : 0;
  if (slowFor > 2.5 && dpr > 1) {
    dpr = Math.max(1, dpr - 0.25);
    slowFor = 0;
    resize();
  }
}

let last = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const raw = (now - last) / 1000;
  last = now;
  const dt = clamp(raw, 0, 0.1);
  if (dt <= 0) return;
  update(dt);
  composer.render(dt);
  if (raw < 0.5) adapt(raw);
}

// ------------------------------------------------------------------ boot
showSelect();
update(1 / 60);
cam.pos.copy(want.pos); cam.look.copy(want.look); cam.fov = want.fov;
composer.render(0.016); // compile shaders before the curtain lifts
requestAnimationFrame((t) => {
  last = t;
  frame(t);
  const loading = $('loading');
  if (loading) {
    loading.classList.add('gone');
    setTimeout(() => loading.remove(), 700);
  }
});

// handy for testing from the console
window.__game = {
  G, cars, track, world, camera, renderer, scene, audio, bloom, grade, composer, startGrid, showSelect, pick, press,
  // advance the game by hand (the browser pauses animation in hidden tabs)
  // look at car i from a given angle (degrees) and distance, for checking the models
  view(i, az = 30, el = 12, dist = 7, fov = 35) {
    G.freeCam = true;
    const a = THREE.MathUtils.degToRad(az), e = THREE.MathUtils.degToRad(el);
    cars[i].worldPoint(Math.sin(a) * Math.cos(e) * dist, 0.7 + Math.sin(e) * dist, Math.cos(a) * Math.cos(e) * dist, camera.position);
    camera.fov = fov;
    camera.lookAt(cars[i].worldPoint(0, 0.7, 0, new THREE.Vector3()));
    update(1 / 60);
    composer.render(1 / 60);
  },
  step(n = 1, dt = 1 / 60) {
    for (let i = 0; i < n; i++) update(dt);
    composer.render(dt);
  },
};
