'use strict';
// ===== World: player, weapons, enemies, pickups, particles, collisions =====

// ---------- Particles & effects ----------
function addP(o) { if (particles.length < 1100) particles.push(o); }
function explode(x, y, size = 1, color = COL.enemy[0]) {
  addP({ type: 'glow', x, y, r: 46 * size, life: 0.35, max: 0.35, color: '#ffcf8a' });
  addP({ type: 'ring', x, y, r: 6 * size, vr: 240 * size, life: 0.45, max: 0.45, color, w: 3 });
  const n = Math.round(10 + 14 * size);
  for (let i = 0; i < n; i++) {
    const a = rand(0, TAU), sp = rand(90, 380) * Math.sqrt(size);
    addP({ type: 'spark', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(0.25, 0.65), max: 0.65,
      color: pick([color, '#ffd27a', '#ffffff', '#ff9a5e']) });
  }
  for (let i = 0; i < 3 + 3 * size; i++) {
    addP({ type: 'smoke', x: x + rand(-10, 10) * size, y: y + rand(-10, 10) * size, vx: rand(-30, 30), vy: rand(-30, 30) + 40,
      r: rand(8, 16) * size, life: rand(0.6, 1.2), max: 1.2 });
  }
  for (let i = 0; i < 2 + 2 * size; i++) {
    const a = rand(0, TAU), sp = rand(60, 220);
    addP({ type: 'debris', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, rot: rand(0, TAU), vr: rand(-10, 10),
      s: rand(2, 5) * Math.sqrt(size), life: rand(0.5, 1), max: 1, color: '#2a3150' });
  }
  shake = Math.max(shake, 3 + 3 * size);
  Sfx.explode(size);
}
function sparkBurst(x, y, color, n = 4, speed = 160) {
  for (let i = 0; i < n; i++) {
    const a = rand(0, TAU), sp = rand(speed * 0.4, speed);
    addP({ type: 'spark', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: rand(0.12, 0.3), max: 0.3, color });
  }
}
function popup(x, y, str, color = '#ffffff', size = 14) { popups.push({ x, y, str, color, size, life: 1.1, max: 1.1 }); }
function addBanner(title, sub = '', kind = 'stage', dur) {
  banners.push({ title, sub, kind, t: 0, dur: dur || (kind === 'warning' ? 4.5 : kind === 'alert' ? 2.4 : 2.8) });
}

// ---------- Player ----------
function updatePlayer(dt) {
  const p = player;
  let ix = 0, iy = 0;
  if (keys.ArrowLeft || keys.KeyA) ix -= 1;
  if (keys.ArrowRight || keys.KeyD) ix += 1;
  if (keys.ArrowUp || keys.KeyW) iy -= 1;
  if (keys.ArrowDown || keys.KeyS) iy += 1;
  const pad = readPad();
  if (pad) {
    const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
    if (Math.abs(ax) > 0.2) ix += ax;
    if (Math.abs(ay) > 0.2) iy += ay;
    if (pad.buttons[14] && pad.buttons[14].pressed) ix -= 1;
    if (pad.buttons[15] && pad.buttons[15].pressed) ix += 1;
    if (pad.buttons[12] && pad.buttons[12].pressed) iy -= 1;
    if (pad.buttons[13] && pad.buttons[13].pressed) iy += 1;
  }
  p.focus = !!(keys.ShiftLeft || keys.ShiftRight || (pad && pad.buttons[7] && pad.buttons[7].pressed));
  const prevX = p.x;
  if (touch.active) {
    const dx = touch.tx - p.x, dy = touch.ty - p.y, d = Math.hypot(dx, dy), max = 950 * dt;
    if (d > max) { p.x += dx / d * max; p.y += dy / d * max; } else { p.x = touch.tx; p.y = touch.ty; }
  } else {
    const len = Math.hypot(ix, iy);
    if (len > 0) {
      const sp = p.focus ? 200 : 360, k = Math.min(1, len) / len;
      p.x += ix * k * sp * dt; p.y += iy * k * sp * dt;
    }
  }
  p.x = clamp(p.x, 22, W - 22);
  p.y = clamp(p.y, 120, H - 40);
  const vx = dt > 0 ? (p.x - prevX) / dt : 0;
  p.bank += (clamp(vx / 360, -1, 1) - p.bank) * Math.min(1, dt * 10);

  p.inv = Math.max(0, p.inv - dt);
  p.muzzle = Math.max(0, p.muzzle - dt);
  if (p.ghost > p.hp) p.ghost = Math.max(p.hp, p.ghost - 40 * dt); else p.ghost = p.hp;

  p.bombCd = Math.max(0, p.bombCd - dt);
  if (p.primary === 'L') updatePlayerLaser(dt);
  else {
    p.fireT -= dt;
    if (p.fireT <= 0) firePrimary();
  }
  if (p.missiles > 0) {
    p.missileT -= dt;
    if (p.missileT <= 0) fireMissiles();
  }
  if (Math.random() < dt * 30) {
    addP({ type: 'spark', x: p.x + rand(-4, 4), y: p.y + 32, vx: rand(-20, 20), vy: rand(180, 320), life: 0.18, max: 0.18, color: '#7df9ff' });
  }
}

const VULCAN_XS = [null, [-7, 7], [-12, 0, 12], [-17, -6, 6, 17]]; // gun offsets per level
function firePrimary() {
  const p = player, L = p.level;
  if (p.primary === 'V') {
    const xs = VULCAN_XS[L];
    for (const ox of xs) pBullets.push({ kind: 'b', x: p.x + ox, y: p.y - 24 + Math.abs(ox) * 0.5, vx: 0, vy: -980, dmg: 1, r: 6, color: COL.V });
    p.fireT += 0.1;
    stats.fired += xs.length;
  } else {
    const n = L === 1 ? 3 : L === 2 ? 5 : 7;
    const spread = (L === 1 ? 22 : L === 2 ? 40 : 58) * Math.PI / 180;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 - spread / 2 + spread * i / (n - 1);
      pBullets.push({ kind: 'b', x: p.x, y: p.y - 24, vx: Math.cos(a) * 880, vy: Math.sin(a) * 880, dmg: 1, r: 6, color: COL.S, ang: a });
    }
    p.fireT += 0.13;
    stats.fired += n;
  }
  if (p.fireT < 0) p.fireT = 0;
  p.muzzle = 0.05;
  Sfx.shot();
}

function fireMissiles() {
  const p = player, n = p.missiles + 1;
  for (let i = 0; i < n; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const a = -Math.PI / 2 + side * (0.55 + (i >> 1) * 0.35);
    pBullets.push({ kind: 'm', x: p.x + side * 14, y: p.y + 4, ang: a, speed: 160, vx: 0, vy: 0, dmg: 3, r: 7, target: null, life: 4, trail: 0 });
  }
  stats.fired += n;
  p.missileT = 0.85;
  Sfx.missile();
}

// Laser: continuous beam that stops at the first thing it touches. Weaker than Vulcan/Spread.
const LASER = { dps: [13, 19, 27], hw: [6, 9, 13] };
function updatePlayerLaser(dt) {
  const p = player, L = p.level - 1, hw = LASER.hw[L], x = p.x, y0 = p.y - 30;
  let best = null, bestY = -20, kind = null;
  for (const e of enemies) {
    if (e.dead || e.y < -10 || e.y > y0) continue;
    if (Math.abs(e.x - x) < e.r * 0.8 + hw) {
      const ey = e.y + e.r * 0.5;
      if (ey > bestY) { bestY = ey; best = e; kind = 'e'; }
    }
  }
  if (boss && boss.state !== 'dying') {
    for (const part of boss.parts) {
      if (!part.alive) continue;
      const px = boss.x + part.ox, py = boss.y + part.oy, hy = py + part.r * 0.95;
      if (hy < y0 && Math.abs(px - x) < part.r + hw && hy > bestY) { bestY = hy; best = part; kind = 'p'; }
    }
    const ex = (x - boss.x) / BOSS_HULL.rx;
    if (Math.abs(ex) < 1) {
      const hy = boss.y + BOSS_HULL.oy + BOSS_HULL.ry * Math.sqrt(1 - ex * ex);
      if (hy < y0 && hy > bestY) { bestY = hy; best = null; kind = 'hull'; }
    }
  }
  p.laserY = bestY; p.laserHit = kind;
  const dmg = LASER.dps[L] * dt;
  let color = COL.L;
  if (kind === 'e') damageEnemy(best, dmg);
  else if (kind === 'p') {
    if (partDamageable(best)) hitPart(best, dmg);
    else { color = COL.V; Sfx.tink(); }
  }
  if (kind && Math.random() < dt * 30) sparkBurst(x + rand(-hw, hw), bestY, color, 2, 180);
}

// Bombs: a shockwave that sweeps the whole screen, hurting every enemy once and erasing enemy bullets.
const BOMB = { enemyDmg: 40, bossDmg: 120, speed: 1500, cooldown: 1.2 };
function fireBomb() {
  const p = player;
  if (!p.alive || p.bombCd > 0) return false;
  if (p.bombs <= 0) { Sfx.tink(); popup(p.x, p.y - 44, 'NO BOMBS', '#8fa3c8', 12); p.bombCd = 0.4; return false; }
  p.bombs--;
  p.bombCd = BOMB.cooldown;
  p.inv = Math.max(p.inv, 1.6);
  bombs.push({ x: p.x, y: p.y, r: 0, hit: new Set() });
  flash = 0.45; flashColor = '#d9c8ff';
  shake = Math.max(shake, 14);
  Sfx.bomb();
  return true;
}
function updateBombs(dt) {
  for (const w of bombs) {
    w.r += BOMB.speed * dt;
    const r2 = w.r * w.r;
    for (const e of enemies) {
      if (e.dead || w.hit.has(e) || e.y < -20 || e.y > H + 20) continue;
      if (dist2(w.x, w.y, e.x, e.y) < r2) { w.hit.add(e); sparkBurst(e.x, e.y, COL.B, 6, 200); damageEnemy(e, BOMB.enemyDmg); }
    }
    for (const b of eBullets) {
      if (!b.dead && dist2(w.x, w.y, b.x, b.y) < r2) {
        b.dead = true; score += 10;
        addP({ type: 'glow', x: b.x, y: b.y, r: 12, life: 0.3, max: 0.3, color: '#ffffff' });
      }
    }
    if (boss && boss.state === 'fight') {
      for (const part of boss.parts) {
        if (!part.alive || w.hit.has(part)) continue;
        const px = boss.x + part.ox, py = boss.y + part.oy;
        if (dist2(w.x, w.y, px, py) < r2) {
          w.hit.add(part);
          if (partDamageable(part)) { hitPart(part, BOMB.bossDmg); explode(px, py, 1.2, COL.B); }
          else sparkBurst(px, py, COL.V, 10, 200);
          if (!boss || boss.state !== 'fight') break;
        }
      }
    }
    if (w.r > 1300) w.dead = true;
  }
}

function hurtPlayer(dmg, continuous = false) {
  const p = player;
  if (!p.alive || debug.god) return;
  if (!continuous && p.inv > 0) return;
  if (p.shield > 0) {
    const a = Math.min(p.shield, dmg);
    p.shield -= a; dmg -= a;
    Sfx.shieldHit();
    if (!continuous) addP({ type: 'ring', x: p.x, y: p.y, r: 30, vr: 90, life: 0.3, max: 0.3, color: COL.shield, w: 3 });
    if (p.shield <= 0) { popup(p.x, p.y - 40, 'SHIELD DOWN', COL.shield, 13); }
    if (dmg <= 0) { if (!continuous) p.inv = 0.2; return; }
  }
  p.hp -= dmg;
  if (!continuous) {
    p.inv = 0.7;
    stats.hitsTaken++;
    shake = Math.max(shake, 8);
    hurtFlash = 0.45;
    Sfx.hurt();
    sparkBurst(p.x, p.y, '#ff8a8a', 10, 220);
  } else {
    hurtFlash = Math.max(hurtFlash, 0.2);
  }
  if (p.hp <= 0) killPlayer();
}

function killPlayer() {
  const p = player;
  p.alive = false; p.hp = 0;
  explode(p.x, p.y, 2.6, COL.V);
  slowmo = 1.3;
  Sfx.bigBoom();
  Music.set('off');
  after(2.0, gameOver);
}

// ---------- Pickups ----------
const PICKUPS = {
  V: { color: COL.V, label: 'V', name: 'VULCAN' },
  S: { color: COL.S, label: 'S', name: 'SPREAD' },
  M: { color: COL.M, label: 'M', name: 'MISSILES' },
  L: { color: COL.L, label: 'L', name: 'LASER' },
  B: { color: COL.B, label: 'B', name: 'BOMB' },
  shield: { color: COL.shield, label: '', name: 'SHIELD' },
  heal: { color: COL.heal, label: '+', name: 'REPAIR' },
};
function spawnPickup(type, x, y) {
  pickups.push({ type, x: clamp(x, 30, W - 30), y, t: 0, vy: 65, r: 18 });
}
function randomPickupType() {
  const p = player;
  const w = {
    V: p.primary === 'V' && p.level < 3 ? 2.5 : 1.5,
    S: p.primary === 'S' && p.level < 3 ? 2.5 : 1.5,
    M: p.missiles < 3 ? 2 : 0.5,
    L: p.primary === 'L' && p.level < 3 ? 2.5 : 1.2,
    B: p.bombs < 3 ? 1.3 : 0.4,
    shield: p.shield < 20 ? 1.4 : 0.3,
    heal: p.hp < 70 ? 2.2 : 0.5,
  };
  let total = 0; for (const k in w) total += w[k];
  let r = Math.random() * total;
  for (const k in w) { r -= w[k]; if (r <= 0) return k; }
  return 'V';
}
function applyPickup(type) {
  const p = player, def = PICKUPS[type];
  let msg = def.name;
  if (type === 'V' || type === 'S' || type === 'L') {
    if (p.primary === type) {
      if (p.level < 3) { p.level++; msg = `${def.name} LV${p.level}`; } else { score += 1000; msg = '+1,000'; }
    } else { p.primary = type; msg = `${def.name} LV${p.level}`; }
  } else if (type === 'M') {
    if (p.missiles < 3) { p.missiles++; msg = `MISSILES LV${p.missiles}`; p.missileT = Math.min(p.missileT, 0.2); }
    else { score += 1000; msg = '+1,000'; }
  } else if (type === 'B') {
    if (p.bombs < p.maxBombs) { p.bombs++; msg = `BOMB +1`; } else { score += 1000; msg = '+1,000'; }
  } else if (type === 'shield') {
    p.shield = p.shieldMax; msg = 'SHIELD UP';
  } else if (type === 'heal') {
    p.hp = Math.min(p.maxHp, p.hp + 30); msg = 'HULL +30';
  }
  popup(p.x, p.y - 46, msg, def.color, 15);
  addP({ type: 'ring', x: p.x, y: p.y, r: 14, vr: 220, life: 0.4, max: 0.4, color: def.color, w: 3 });
  Sfx.pickup();
}
function updatePickups(dt) {
  for (const k of pickups) {
    k.t += dt;
    const d2 = dist2(k.x, k.y, player.x, player.y);
    if (player.alive && d2 < 110 * 110) {
      const d = Math.sqrt(d2) || 1;
      k.x += (player.x - k.x) / d * 320 * dt; k.y += (player.y - k.y) / d * 320 * dt;
    } else {
      k.y += k.vy * dt;
      k.x += Math.sin(k.t * 2.2) * 40 * dt;
    }
    if (player.alive && d2 < (k.r + 18) ** 2) { k.dead = true; applyPickup(k.type); }
    if (k.y > H + 40) k.dead = true;
  }
}

// ---------- Enemy bullets ----------
function eShot(x, y, ang, speed, o = {}) {
  eBullets.push({ x, y, vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed, r: o.r || 6, dmg: o.dmg || 6, color: o.color || COL.ebullet });
}
function fan(x, y, base, speed, n, spreadDeg, o) {
  const sp = spreadDeg * Math.PI / 180;
  for (let i = 0; i < n; i++) eShot(x, y, n === 1 ? base : base - sp / 2 + sp * i / (n - 1), speed, o);
}
function aimFan(x, y, speed, n = 1, spreadDeg = 0, o) {
  fan(x, y, Math.atan2(player.y - y, player.x - x), speed, n, spreadDeg, o);
}
function ring(x, y, n, speed, offset = 0, o) {
  for (let i = 0; i < n; i++) eShot(x, y, offset + i * TAU / n, speed, o);
}
function clearEnemyBullets() {
  for (const b of eBullets) {
    addP({ type: 'glow', x: b.x, y: b.y, r: 12, life: 0.3, max: 0.3, color: '#ffffff' });
    score += 10;
  }
  eBullets.length = 0;
}

// ---------- Enemies ----------
const TYPES = {
  drone: { shape: 'drone', r: 16, hp: 3, score: 100, col: COL.enemy, h: 20, engines: [[0, -12]], eye: [0, 3, 3, 5],
    rate: 4.2, fireChance: 0.35, drop: 0.05, fire: e => aimFan(e.x, e.y + 10, 150) },
  carrier: { shape: 'drone', r: 18, hp: 8, score: 300, col: COL.carrier, h: 20, engines: [[0, -12]], eye: [0, 3, 3, 5], scale: 1.25 },
  fighter: { shape: 'fighter', r: 20, hp: 6, score: 200, col: COL.enemy, h: 26, engines: [[0, -22]], eye: [0, 5, 3, 7],
    rate: 2.8, drop: 0.07, fire: e => aimFan(e.x, e.y + 14, 165) },
  gunship: { shape: 'gunship', r: 34, hp: 36, score: 800, col: COL.enemyAlt, h: 36, engines: [[-8, -32], [8, -32]], eye: [0, 8, 5, 10],
    rate: 3.1, drop: 0.35, fire: e => aimFan(e.x, e.y + 26, 160, 3, 26, { color: COL.ebullet2 }) },
  bomber: { shape: 'bomber', r: 40, hp: 70, score: 1500, col: COL.enemyAlt, h: 42, engines: [[-30, -6], [30, -6], [-7, -38], [7, -38]],
    eye: [0, 12, 6, 12], rate: 3.6, drop: 1, fire: e => ring(e.x, e.y, 10, 105, e.t, { color: COL.ebullet2 }) },
  asteroid: { rock: true, r: 36, hp: 16, score: 150, col: COL.rock, drop: 0.04 },
  frigate: { shape: 'frigate', r: 62, hp: 340, score: 8000, col: COL.steel, h: 72, engines: [[-22, -66], [22, -66], [-70, -14], [70, -14]],
    eye: [0, 30, 10, 16], rate: 2.3, bar: 'FRIGATE', fire: e => {
      e.shots = (e.shots || 0) + 1;
      if (e.shots % 2) fan(e.x, e.y + 60, Math.PI / 2, 140, 5, 70, { color: COL.ebullet2 });
      else { aimFan(e.x - 40, e.y + 20, 170, 3, 16); aimFan(e.x + 40, e.y + 20, 170, 3, 16); }
    } },
};

const mv = {
  straight: (vy, amp = 0, freq = 2) => (e, dt) => {
    if (e.x0 == null) e.x0 = e.x;
    e.y += vy * dt;
    e.x = e.x0 + Math.sin(e.t * freq) * amp;
  },
  path: (P, dur) => (e, dt) => {
    if (dt <= 0) return;
    const k = e.t / dur;
    if (k < 1) {
      const u = 1 - k, b = (a0, a1, a2, a3) => u * u * u * a0 + 3 * u * u * k * a1 + 3 * u * k * k * a2 + k * k * k * a3;
      const nx = b(P[0][0], P[1][0], P[2][0], P[3][0]), ny = b(P[0][1], P[1][1], P[2][1], P[3][1]);
      e.vx = (nx - e.x) / dt; e.vy = (ny - e.y) / dt;
      e.x = nx; e.y = ny;
    } else { e.x += e.vx * dt; e.y += e.vy * dt; }
    if (e.vx || e.vy) e.angle += angleDiff(Math.atan2(e.vy, e.vx) - Math.PI / 2, e.angle) * Math.min(1, dt * 8);
  },
  hover: (ty, hold) => (e, dt) => {
    if (!e.ms) e.ms = 1;
    if (e.ms === 1) {
      e.y += (ty - e.y) * Math.min(1, dt * 1.4);
      if (ty - e.y < 3) { e.ms = 2; e.ht = 0; }
    } else if (e.ms === 2) {
      e.ht += dt;
      if (e.ht > hold) e.ms = 3;
    } else {
      e.vy = Math.min(160, (e.vy || 0) + 120 * dt);
      e.y += e.vy * dt;
    }
    e.x += Math.sin(e.t * 0.8) * 28 * dt;
  },
  drift: (vx, vy, spin) => (e, dt) => { e.x += vx * dt; e.y += vy * dt; e.angle += spin * dt; },
  frigate: () => (e, dt) => {
    if (e.t < 32) {
      const ty = 210 + Math.sin(e.t * 0.8) * 12, tx = W / 2 + Math.sin(e.t * 0.45) * 150;
      e.y += (ty - e.y) * Math.min(1, dt * 1.2);
      e.x += (tx - e.x) * Math.min(1, dt * 1.2);
    } else { e.leaving = true; e.y -= 90 * dt; }
  },
};

function spawn(type, x, y, move, extra = {}) {
  const T = TYPES[type];
  const e = {
    type, x, y, r: T.r, hp: T.hp, maxHp: T.hp, score: T.score, t: 0, hitT: 0, angle: 0, vx: 0, vy: 0,
    fireT: T.rate ? T.rate * rand(0.45, 1.0) : 0, canFire: !!T.fire && (T.fireChance == null || Math.random() < T.fireChance),
    move, dead: false, drop: extra.drop || null,
  };
  enemies.push(e);
  return e;
}

// Asteroids: size 3 (big) -> two size 2 -> two size 1 each.
const ROCK = { r: [0, 12, 22, 36], hp: [0, 2, 6, 16], score: [0, 40, 80, 150] };
function spawnAsteroid(x, y, size = 3, vx = rand(-25, 25), vy = rand(70, 120)) {
  const e = spawn('asteroid', x, y, mv.drift(vx, vy, rand(-1.2, 1.2)));
  e.size = size; e.r = ROCK.r[size]; e.hp = e.maxHp = ROCK.hp[size]; e.score = ROCK.score[size];
  e.rock = makeRockShape(e.r);
  e.angle = rand(0, TAU);
  return e;
}

function killEnemy(e) {
  if (e.dead) return;
  e.dead = true;
  const T = TYPES[e.type];
  score += e.score;
  stats.kills++;
  const size = e.r / 22;
  if (e.type === 'asteroid') {
    explode(e.x, e.y, size * 0.7, '#d8c6b4');
    for (let i = 0; i < 4 + e.size * 3; i++) {
      const a = rand(0, TAU), sp = rand(40, 160);
      addP({ type: 'debris', x: e.x, y: e.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, rot: rand(0, TAU), vr: rand(-8, 8),
        s: rand(1.5, 4) * Math.sqrt(e.size), life: rand(0.6, 1.2), max: 1.2, color: '#6d6370' });
    }
    if (e.size > 1) for (const k of [-1, 1]) spawnAsteroid(e.x + k * e.r * 0.4, e.y, e.size - 1, k * rand(40, 90), rand(60, 130));
  } else explode(e.x, e.y, size, T.col[0]);
  if (e.score >= 800) popup(e.x, e.y - 20, '+' + fmt(e.score), '#ffffff', 13 + Math.min(6, size * 2));
  if (e.drop) spawnPickup(e.drop, e.x, e.y);
  else if (e.type === 'frigate') { spawnPickup(pick(['V', 'S', 'M']), e.x - 30, e.y); spawnPickup('heal', e.x + 30, e.y); }
  else if (T.drop && Math.random() < T.drop) spawnPickup(randomPickupType(), e.x, e.y);
}

function damageEnemy(e, dmg) {
  e.hp -= dmg; e.hitT = 0.06;
  if (e.hp <= 0) killEnemy(e);
}

function updateEnemies(dt) {
  for (const e of enemies) {
    if (e.dead) continue;
    e.t += dt;
    e.hitT -= dt;
    e.move(e, dt);
    const T = TYPES[e.type];
    if (e.canFire && !e.leaving && player.alive) {
      e.fireT -= dt;
      if (e.fireT <= 0 && e.t > 0.8 && e.y > 40 && e.y < H * 0.72) {
        T.fire(e);
        e.fireT = T.rate * rand(0.85, 1.15);
      }
    }
    if (e.t > 2 && (e.y > H + 100 || e.y < -200 || e.x < -160 || e.x > W + 160)) { e.dead = true; continue; }
    // Contact: at most one ram per enemy every 0.7 s (otherwise ramming deals damage every frame).
    e.ramT = Math.max(0, (e.ramT || 0) - dt);
    if (player.alive && e.ramT <= 0 && dist2(e.x, e.y, player.x, player.y) < (e.r * 0.75 + player.r + 4) ** 2) {
      e.ramT = 0.7;
      hurtPlayer(14);
      damageEnemy(e, 8);
    }
  }
}

// ---------- Player bullets & missiles ----------
function validTarget(t) {
  if (!t) return false;
  if (t.id) return !!boss && t.alive && partDamageable(t);
  return !t.dead && t.y > -10 && t.y < H - 20;
}
function targetPos(t) { return t.id ? { x: boss.x + t.ox, y: boss.y + t.oy } : t; }
function findTarget(x, y) {
  let best = null, bd = Infinity;
  for (const e of enemies) {
    if (e.dead || e.y < 0 || e.y > H - 40) continue;
    const d = dist2(x, y, e.x, e.y);
    if (d < bd) { bd = d; best = e; }
  }
  if (boss) for (const p of boss.parts) {
    if (!p.alive || !partDamageable(p)) continue;
    const d = dist2(x, y, boss.x + p.ox, boss.y + p.oy);
    if (d < bd) { bd = d; best = p; }
  }
  return best;
}

function updatePBullets(dt) {
  for (const b of pBullets) {
    if (b.kind === 'm') {
      b.life -= dt;
      if (b.life <= 0) { b.dead = true; continue; }
      if (!validTarget(b.target)) b.target = findTarget(b.x, b.y);
      let want = -Math.PI / 2, turn = 2;
      if (b.target) { const tp = targetPos(b.target); want = Math.atan2(tp.y - b.y, tp.x - b.x); turn = 6.5; }
      b.ang += clamp(angleDiff(want, b.ang), -turn * dt, turn * dt);
      b.speed = Math.min(640, b.speed + 900 * dt);
      b.vx = Math.cos(b.ang) * b.speed; b.vy = Math.sin(b.ang) * b.speed;
      b.trail -= dt;
      if (b.trail <= 0) {
        b.trail = 0.025;
        addP({ type: 'smoke', x: b.x - b.vx * 0.02, y: b.y - b.vy * 0.02, vx: 0, vy: 30, r: 3.5, life: 0.4, max: 0.4, light: true });
      }
    }
    b.x += b.vx * dt; b.y += b.vy * dt;
    if (b.y < -40 || b.y > H + 40 || b.x < -40 || b.x > W + 40) { b.dead = true; continue; }

    // vs enemies
    for (const e of enemies) {
      if (e.dead || e.y < -10) continue;
      if (dist2(b.x, b.y, e.x, e.y) < (b.r + e.r) ** 2) {
        b.dead = true; stats.hit++;
        sparkBurst(b.x, b.y, b.kind === 'm' ? COL.M : '#ffffff', b.kind === 'm' ? 8 : 3);
        if (b.kind === 'm') addP({ type: 'glow', x: b.x, y: b.y, r: 26, life: 0.2, max: 0.2, color: COL.M });
        damageEnemy(e, b.dmg);
        Sfx.hit();
        break;
      }
    }
    if (b.dead || !boss) continue;
    bossBulletCheck(b);
  }
}

function updateEBullets(dt) {
  const p = player;
  const shieldR = p.shield > 0 ? 30 : 0;
  for (const b of eBullets) {
    b.x += b.vx * dt; b.y += b.vy * dt;
    if (b.y < -30 || b.y > H + 30 || b.x < -30 || b.x > W + 30) { b.dead = true; continue; }
    if (!p.alive) continue;
    const hitR = shieldR ? shieldR + b.r : b.r + p.r;
    if (dist2(b.x, b.y, p.x, p.y) < hitR * hitR) {
      b.dead = true;
      hurtPlayer(b.dmg);
      sparkBurst(b.x, b.y, shieldR ? COL.shield : b.color, 5);
    }
  }
}

function updateParticles(dt) {
  for (const q of particles) {
    q.life -= dt;
    if (q.life <= 0) { q.dead = true; continue; }
    if (q.vx != null) { q.x += q.vx * dt; q.y += q.vy * dt; }
    if (q.type === 'spark') { q.vx *= 1 - 2.5 * dt; q.vy *= 1 - 2.5 * dt; }
    else if (q.type === 'smoke') { q.r += 18 * dt; q.vx *= 1 - dt; q.vy *= 1 - dt; }
    else if (q.type === 'ring') q.r += q.vr * dt;
    else if (q.type === 'debris') q.rot += q.vr * dt;
  }
  for (const q of popups) { q.life -= dt; q.y -= 40 * dt; if (q.life <= 0) q.dead = true; }
  for (const q of banners) { q.t += dt; if (q.t > q.dur) q.dead = true; }
}
