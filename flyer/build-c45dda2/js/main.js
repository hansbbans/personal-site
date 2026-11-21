'use strict';
// ===== Main: level timeline, game flow, overlays, loop =====

function buildTimeline() {
  const ev = [], C = W / 2;
  const at = (t, fn) => ev.push({ t, fn });
  const droneCol = (t, x, n = 5, gap = 0.45, wob = 0, speed = 120) => {
    for (let i = 0; i < n; i++) at(t + i * gap, () => spawn('drone', x, -30, mv.straight(speed, wob, 2.2)));
  };
  const droneV = (t, cx, speed = 115) => {
    [0, -1, 1, -2, 2].forEach(k => at(t + Math.abs(k) * 0.22, () => spawn('drone', cx + k * 46, -30, mv.straight(speed))));
  };
  const droneWall = (t, n = 7, speed = 95) => at(t, () => {
    for (let i = 0; i < n; i++) spawn('drone', 60 + i * (W - 120) / (n - 1), -30 - (i % 2) * 30, mv.straight(speed));
  });
  const swoopU = (t, side, n = 5, gap = 0.5) => {
    const x0 = side === 'L' ? 90 : W - 90, P = [[x0, -40], [x0, 600], [W - x0, 600], [W - x0, -80]];
    for (let i = 0; i < n; i++) at(t + i * gap, () => spawn('fighter', x0, -40, mv.path(P, 6.5)));
  };
  const swoopS = (t, side, n = 5, gap = 0.5) => {
    const x0 = side === 'L' ? 70 : W - 70, P = [[x0, -40], [x0, 380], [W - x0, 300], [W - x0, H + 80]];
    for (let i = 0; i < n; i++) at(t + i * gap, () => spawn('fighter', x0, -40, mv.path(P, 7.5)));
  };
  const crossers = (t, side, y, n = 5, gap = 0.55) => {
    const x0 = side === 'L' ? -40 : W + 40, x3 = W - x0;
    const P = [[x0, y], [lerp(x0, x3, 0.33), y + 90], [lerp(x0, x3, 0.66), y + 90], [x3, y + 20]];
    for (let i = 0; i < n; i++) at(t + i * gap, () => spawn('fighter', x0, y, mv.path(P, 6)));
  };
  const gunship = (t, x, ty = 220, hold = 7) => at(t, () => spawn('gunship', x, -50, mv.hover(ty, hold)));
  const bomber = (t, x) => at(t, () => spawn('bomber', x, -60, mv.straight(55, 30, 0.6)));
  const carrier = (t, x, drop) => at(t, () => spawn('carrier', x, -30, mv.straight(90, 50, 1.4), { drop }));
  const banner = (t, title, sub, kind) => at(t, () => addBanner(title, sub, kind));
  const asteroids = (t0, dur, every, sizes = [3, 2, 2, 1]) => {
    for (let t = t0; t < t0 + dur; t += every) at(t, () => spawnAsteroid(rand(40, W - 40), -50, pick(sizes)));
  };

  // 0–90s: opening
  banner(0.8, 'STAGE 1', 'EMBER BELT');
  droneCol(4, 150); droneCol(6, W - 150);
  droneV(10, C);
  carrier(12.5, C, 'S');
  swoopU(15, 'L'); swoopU(19, 'R');
  asteroids(20, 5, 2.5, [3]);
  droneCol(23, 100, 6, 0.4, 40); droneCol(23.3, W - 100, 6, 0.4, 40);
  droneV(27.5, 170); droneV(29, W - 170);
  swoopS(32, 'L', 4); swoopS(33, 'R', 4);
  gunship(36, C);
  carrier(39, 140, 'M');
  crossers(41, 'L', 200); crossers(45, 'R', 280);
  asteroids(42, 8, 1.4);
  gunship(48, 140, 200); gunship(50, W - 140, 240);
  droneV(54, C); swoopU(55, 'L', 6, 0.45);
  carrier(58, W - 140, 'shield');
  bomber(60, C);
  carrier(64, C, 'L');
  droneCol(62, 80); droneCol(62, W - 80);
  swoopU(66, 'L'); swoopU(66.3, 'R');
  gunship(70, 110, 180); gunship(71.2, C, 250); gunship(72.4, W - 110, 180);
  carrier(76, C, 'V');
  crossers(78, 'L', 160, 6); crossers(80, 'R', 320, 6);
  droneWall(84); droneWall(87.5, 6);
  carrier(86, 140, 'B');

  // 90–125s: frigate midboss
  banner(90, 'FRIGATE INBOUND', 'HEAVY CONTACT AHEAD', 'alert');
  at(92, () => spawn('frigate', C, -120, mv.frigate()));
  for (let t = 97; t < 122; t += 6) droneCol(t, t % 12 < 6 ? 70 : W - 70, 3, 0.5);
  asteroids(100, 18, 3.5, [2, 1]);
  carrier(124, C, 'M');
  banner(129, 'ASTEROID BELT', 'SHOOT THE BIG ONES APART', 'alert');
  asteroids(131, 16, 1.0, [3, 3, 2, 2, 1]);

  // 127–170s: escalating mix
  const mix = [
    t => { swoopU(t, 'L', 5, 0.42); swoopU(t + 0.2, 'R', 5, 0.42); },
    t => { gunship(t, 130, 210, 6); gunship(t + 0.8, W - 130, 210, 6); droneV(t + 1.5, C); },
    t => { droneWall(t, 7, 105); droneWall(t + 2.4, 6, 105); },
    t => { bomber(t, 170); bomber(t + 1.5, W - 170); },
    t => { crossers(t, 'L', 180, 6, 0.5); crossers(t + 1.2, 'R', 300, 6, 0.5); },
    t => { swoopS(t, 'L', 5); swoopS(t + 0.5, 'R', 5); droneV(t + 2.5, C); },
  ];
  let i = 0;
  for (let t = 127; t <= 168; t += 5.5) mix[i++ % mix.length](t);
  carrier(141, 120, 'S'); carrier(146, W - 140, 'B'); carrier(152, W - 120, 'heal'); carrier(163, C, 'shield');

  // boss approach
  banner(174, 'WARNING', 'MEGABOSS APPROACHING', 'warning');
  at(174, () => Sfx.warning());
  carrier(176, C, 'heal');

  ev.sort((a, b) => a.t - b.t);
  return ev;
}

// ---------- Flow ----------
const $ = id => document.getElementById(id);
function showOverlay(id) {
  for (const o of document.querySelectorAll('.overlay')) o.classList.toggle('show', o.id === id);
  // A focused (now hidden) button would be "clicked" by Space/Enter during play and restart the game.
  if (!id && document.activeElement && document.activeElement.blur) document.activeElement.blur();
}

function resetWorld() {
  pBullets = []; eBullets = []; enemies = []; pickups = []; particles = []; popups = []; banners = []; timers = []; bombs = [];
  boss = null; bossSpawned = false; bossDefeated = false;
  shake = 0; flash = 0; hurtFlash = 0; slowmo = 0;
}
function resetPlayer() {
  Object.assign(player, { x: W / 2, y: H - 150, hp: player.maxHp, ghost: player.maxHp, shield: 0, primary: 'V', level: 1, missiles: 0,
    fireT: 0, missileT: 0.6, inv: 1.5, bank: 0, alive: true, muzzle: 0, focus: false, bombs: 3, bombCd: 0, laserY: -20, laserHit: null });
}
function seekTimeline(t) {
  levelTime = t; tlIdx = 0;
  while (tlIdx < timeline.length && timeline[tlIdx].t < t) tlIdx++;
}

function startGame(fromBoss = false) {
  Sound.init();
  resetWorld(); resetPlayer();
  timeline = buildTimeline();
  bossRetry = fromBoss && !!bossSnapshot;
  if (bossRetry) {
    const s = bossSnapshot;
    Object.assign(player, { primary: s.primary, level: s.level, missiles: s.missiles, bombs: Math.max(3, s.bombs || 0), shield: player.shieldMax });
    score = s.score; Object.assign(stats, s.stats); gameTime = s.gameTime;
    seekTimeline(LEVEL_TIME - 5);
    addBanner('WARNING', 'MEGABOSS APPROACHING', 'warning', 4);
    Sfx.warning();
  } else {
    score = 0; gameTime = 0;
    Object.assign(stats, { fired: 0, hit: 0, kills: 0, hitsTaken: 0 });
    seekTimeline(PARAMS.has('skip') ? +PARAMS.get('skip') || 0 : 0);
  }
  state = 'playing';
  showOverlay(null);
  Music.set('level');
}

function saveHi() {
  if (score > hiScore) { hiScore = score; store.set('skybreak.hi', String(hiScore)); return true; }
  return false;
}
function statRows(rows) {
  return rows.map(([k, v, cls]) => `<dt>${k}</dt><dd class="${cls || ''}">${v}</dd>`).join('');
}
function timeStr(s) { const m = Math.floor(s / 60), r = Math.floor(s % 60); return `${m}:${r.toString().padStart(2, '0')}`; }
function accuracy() { return stats.fired ? Math.round(100 * stats.hit / stats.fired) + '%' : '—'; }

function gameOver() {
  state = 'over';
  Music.set('off');
  const isHi = saveHi();
  $('over-stats').innerHTML = statRows([
    ['Score', fmt(score), 'total'], ['Reached', bossSpawned ? 'Megaboss' : timeStr(levelTime) + ' / 3:00'],
    ['Kills', stats.kills], ['Accuracy', accuracy()],
  ]);
  $('over-hi').textContent = isHi ? 'NEW HIGH SCORE' : '';
  $('btn-retry-boss').classList.toggle('hidden', !bossSpawned);
  showOverlay('ov-over');
}

function stageClear() {
  state = 'clear';
  const bonus = Math.round(Math.max(0, player.hp)) * 100;
  score += bonus;
  const isHi = saveHi();
  Sfx.fanfare();
  $('clear-stats').innerHTML = statRows([
    ['Hull bonus', '+' + fmt(bonus)], ['Kills', stats.kills], ['Accuracy', accuracy()],
    ['Hits taken', stats.hitsTaken], ['Time', timeStr(gameTime)], ['Final score', fmt(score), 'total'],
  ]);
  $('clear-hi').textContent = isHi ? 'NEW HIGH SCORE' : '';
  showOverlay('ov-clear');
}

function pause() { if (state === 'playing') { state = 'paused'; showOverlay('ov-pause'); } }
function resume() { if (state === 'paused') { state = 'playing'; showOverlay(null); Sound.init(); } }
function toTitle() { state = 'title'; resetWorld(); levelTime = 0; Music.set('off'); showOverlay('ov-title'); }

// ---------- Update ----------
function update(dt) {
  if (slowmo > 0) { slowmo -= dt; dt *= 0.35; }
  gameTime += dt;
  if (!bossSpawned) levelTime = Math.min(LEVEL_TIME, levelTime + dt);
  while (tlIdx < timeline.length && timeline[tlIdx].t <= levelTime) timeline[tlIdx++].fn();
  if (!bossSpawned && levelTime >= LEVEL_TIME) spawnBoss();

  if (player.alive) updatePlayer(dt);
  updatePBullets(dt);
  updateEnemies(dt);
  if (boss) updateBoss(dt);
  updateEBullets(dt);
  updateBombs(dt);
  updatePickups(dt);
  updateParticles(dt);

  for (const t of timers) { t.t -= dt; if (t.t <= 0 && !t.dead) { t.dead = true; t.fn(); } }
  compact(timers); compact(pBullets); compact(eBullets); compact(enemies); compact(pickups);
  compact(particles); compact(popups); compact(banners); compact(bombs);

  shake = Math.max(0, shake - dt * 30);
  flash = Math.max(0, flash - dt * 2.2);
  hurtFlash = Math.max(0, hurtFlash - dt * 1.6);
}

// ---------- Input wiring ----------
const GAME_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space']);
const BOMB_KEYS = new Set(['Space', 'KeyX', 'KeyB']);
// Audio may have been created outside a user gesture (gamepad Start, ?autostart): resume on the next one.
const wakeAudio = () => { if (Sound.ac && Sound.ac.state === 'suspended') Sound.ac.resume(); };
window.addEventListener('pointerdown', wakeAudio, true);
window.addEventListener('keydown', e => {
  wakeAudio();
  keys[e.code] = true;
  if (GAME_KEYS.has(e.code) && state === 'playing') e.preventDefault();
  if (e.repeat) return;
  if (e.code === 'KeyM') { Sound.init(); Sound.toggleMute(); }
  if (e.code === 'KeyP' || e.code === 'Escape') { if (state === 'playing') pause(); else if (state === 'paused') resume(); }
  if (state === 'playing' && BOMB_KEYS.has(e.code)) { fireBomb(); return; }
  if (e.code === 'Enter' || (e.code === 'Space' && state === 'title')) {
    if (state === 'title' || state === 'clear' || state === 'over') startGame(false);
    else if (state === 'paused') resume();
  }
  if (e.code === 'KeyR' && state === 'over' && bossSpawned) startGame(true);
});
window.addEventListener('keyup', e => { keys[e.code] = false; });
window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; touch.active = false; pause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

canvas.addEventListener('pointerdown', e => {
  if (state !== 'playing') return;
  if (touch.active && e.pointerId !== touch.id) { fireBomb(); return; }
  const g = toGame(e);
  touch.active = true; touch.id = e.pointerId;
  touch.ox = player.x - g.x; touch.oy = player.y - g.y;
  touch.tx = player.x; touch.ty = player.y;
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', e => {
  if (!touch.active || e.pointerId !== touch.id) return;
  const g = toGame(e);
  touch.tx = g.x + touch.ox; touch.ty = g.y + touch.oy;
});
const endTouch = e => { if (e.pointerId === touch.id) touch.active = false; };
canvas.addEventListener('pointerup', endTouch);
canvas.addEventListener('pointercancel', endTouch);

$('btn-start').onclick = () => startGame(false);
$('btn-resume').onclick = resume;
$('btn-quit').onclick = toTitle;
$('btn-retry').onclick = () => startGame(false);
$('btn-retry-boss').onclick = () => startGame(true);
$('btn-over-title').onclick = toTitle;
$('btn-again').onclick = () => startGame(false);
$('btn-clear-title').onclick = toTitle;

// ---------- Loop ----------
let last = performance.now(), padStartPrev = false, padBombPrev = false;
function frame(now) {
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
  last = now;
  const pad = readPad();
  const startBtn = !!(pad && pad.buttons[9] && pad.buttons[9].pressed);
  if (startBtn && !padStartPrev) {
    if (state === 'playing') pause();
    else if (state === 'paused') resume();
    else startGame(false);
  }
  padStartPrev = startBtn;
  const bombBtn = !!(pad && ((pad.buttons[0] && pad.buttons[0].pressed) || (pad.buttons[1] && pad.buttons[1].pressed)));
  if (bombBtn && !padBombPrev && state === 'playing') fireBomb();
  padBombPrev = bombBtn;

  if (state === 'playing') { update(dt); Music.update(); }
  Sfx.beam(state === 'playing' && player.alive && player.primary === 'L');
  if (state !== 'paused') updateBackground(state === 'playing' && slowmo > 0 ? dt * 0.35 : dt);
  render();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// ---------- Debug / test hooks ----------
window.__game = {
  get state() { return state; }, get levelTime() { return levelTime; }, get score() { return score; },
  get player() { return player; }, get boss() { return boss; }, get stats() { return stats; },
  get counts() { return { enemies: enemies.length, eBullets: eBullets.length, pBullets: pBullets.length, particles: particles.length, pickups: pickups.length }; },
  start: () => startGame(false), retryBoss: () => startGame(true), pause, resume,
  skipTo: t => { resetWorld(); seekTimeline(t); },
  god: (v = true) => { debug.god = v; },
  give: type => applyPickup(type),
  bomb: () => fireBomb(),
  step(sec, h = 1 / 60) { for (let i = 0; i < Math.round(sec / h) && state === 'playing'; i++) update(h); render(); },
};
if (PARAMS.has('autostart')) startGame(false);
