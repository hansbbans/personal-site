'use strict';
// ===== Megaboss: DREADNOUGHT =====
// Phase 0: two wing turrets alive, core shielded.  Phase 1: core exposed (rings + aimed fans).
// Phase 2 (<66%): triple spiral + fighter escorts.  Phase 3 (<33%): tracking beam + rings.

const BOSS_HULL = { rx: 232, ry: 80, oy: -10 };

function spawnBoss() {
  bossSpawned = true;
  if (!bossRetry) bossSnapshot = { primary: player.primary, level: player.level, missiles: player.missiles, bombs: player.bombs, score, stats: { ...stats }, gameTime };
  boss = {
    x: W / 2, y: -260, ty: 210, t: 0, state: 'enter', phase: 0,
    patT: 2.5, pat2T: 3.5, spawnT: 6, spiralA: 0, spiralT: 0, laser: null, laserT: 1.5, dyingT: 0, boomT: 0, smokeT: 0,
    parts: [
      { id: 'L', ox: -150, oy: 26, r: 30, hp: 260, max: 260, alive: true, hitT: 0, fireT: 1.6, aim: Math.PI / 2 },
      { id: 'R', ox: 150, oy: 26, r: 30, hp: 260, max: 260, alive: true, hitT: 0, fireT: 2.6, aim: Math.PI / 2 },
      { id: 'core', ox: 0, oy: 50, r: 40, hp: 1600, max: 1600, alive: true, hitT: 0 },
    ],
  };
  addBanner('DREADNOUGHT', 'DESTROY THE WING TURRETS', 'boss', 3.2);
  Music.set('boss');
}

function partDamageable(p) {
  return boss && boss.state === 'fight' && p.alive && (p.id !== 'core' || boss.phase >= 1);
}

function bossBulletCheck(b) {
  const B = boss;
  if (B.state === 'dying') return;
  for (const p of B.parts) {
    if (!p.alive) continue;
    const px = B.x + p.ox, py = B.y + p.oy;
    if (dist2(b.x, b.y, px, py) < (b.r + p.r) ** 2) {
      b.dead = true;
      if (partDamageable(p)) {
        stats.hit++;
        hitPart(p, b.dmg);
        sparkBurst(b.x, b.y, b.kind === 'm' ? COL.M : '#ffffff', b.kind === 'm' ? 8 : 3);
        Sfx.hit();
      } else {
        sparkBurst(b.x, b.y, COL.V, 3, 120);
        Sfx.tink();
      }
      return;
    }
  }
  const ex = (b.x - B.x) / BOSS_HULL.rx, ey = (b.y - (B.y + BOSS_HULL.oy)) / BOSS_HULL.ry;
  if (ex * ex + ey * ey < 1) {
    b.dead = true;
    sparkBurst(b.x, b.y, '#8fa3d8', 2, 100);
  }
}

function hitPart(p, dmg) {
  p.hp -= dmg; p.hitT = 0.06;
  if (p.hp > 0) return;
  p.hp = 0; p.alive = false;
  const x = boss.x + p.ox, y = boss.y + p.oy;
  if (p.id === 'core') { bossDie(); return; }
  explode(x, y, 2.2, COL.ebullet2);
  score += 5000;
  popup(x, y - 30, '+5,000', '#ffffff', 18);
  spawnPickup(p.id === 'L' ? 'heal' : randomPickupType(), x, y);
}

function setPhase(n) {
  const b = boss;
  b.phase = n;
  clearEnemyBullets();
  b.patT = 1.2; b.pat2T = 2.2; b.laser = null; b.laserT = 1.5; b.spiralT = 0; b.spawnT = 4;
  flash = 0.35; flashColor = '#ffffff';
  shake = Math.max(shake, 10);
  Sfx.phase();
  if (n === 1) addBanner('CORE EXPOSED', 'HIT THE REACTOR', 'alert');
  if (n === 2) addBanner('OVERDRIVE', 'REACTOR AT 66%', 'alert');
  if (n === 3) addBanner('FINAL PHASE', 'WATCH THE BEAM', 'alert');
}

function bossDie() {
  const b = boss;
  b.state = 'dying'; b.dyingT = 0; b.laser = null;
  clearEnemyBullets();
  for (const e of enemies) if (!e.dead) killEnemy(e);
  score += 50000;
  popup(b.x, b.y + 60, '+50,000', '#ffd85e', 24);
  Music.set('off');
}

function updateBoss(dt) {
  const b = boss, P = b.parts, core = P[2];
  b.t += dt;
  for (const p of P) p.hitT -= dt;

  if (b.state === 'enter') {
    b.y += (b.ty - b.y) * Math.min(1, dt * 0.9);
    if (b.ty - b.y < 4) b.state = 'fight';
    return;
  }

  if (b.state === 'dying') {
    b.dyingT += dt; b.boomT -= dt;
    b.y += 12 * dt;
    shake = Math.max(shake, 5);
    if (b.boomT <= 0) {
      b.boomT = 0.085;
      explode(b.x + rand(-210, 210), b.y + rand(-70, 70), rand(0.8, 1.7), pick([COL.ebullet2, COL.ebullet, '#ffffff']));
    }
    if (b.dyingT > 3.2) {
      for (let i = 0; i < 6; i++) explode(b.x + rand(-140, 140), b.y + rand(-50, 50), 3, COL.ebullet2);
      explode(b.x, b.y, 4.5, '#ffffff');
      flash = 1; flashColor = '#ffffff'; shake = 22;
      Sfx.bigBoom();
      boss = null; bossDefeated = true;
      after(2.6, stageClear);
    }
    return;
  }

  // --- movement ---
  const amp = b.phase >= 3 ? 130 : b.phase === 2 ? 110 : 80;
  let tx = W / 2 + Math.sin(b.t * 0.32) * amp, vmax = 70;
  if (b.laser) { tx = player.x; vmax = 42; }
  tx = clamp(tx, W / 2 - 130, W / 2 + 130);
  b.x += clamp(tx - b.x, -vmax * dt, vmax * dt);
  b.y += (b.ty + Math.sin(b.t * 0.7) * 12 - b.y) * Math.min(1, dt * 2);

  // --- body contact ---
  if (player.alive) {
    const ex = (player.x - b.x) / BOSS_HULL.rx, ey = (player.y - (b.y + BOSS_HULL.oy)) / BOSS_HULL.ry;
    if (ex * ex + ey * ey < 1) {
      hurtPlayer(12);
      player.y = b.y + BOSS_HULL.oy + BOSS_HULL.ry * Math.sqrt(Math.max(0, 1 - ex * ex)) + player.r + 2;
    }
  }

  // --- turrets ---
  for (const p of P) {
    if (p.id === 'core') continue;
    const px = b.x + p.ox, py = b.y + p.oy;
    if (!p.alive) {
      if (Math.random() < dt * 8) addP({ type: 'smoke', x: px + rand(-8, 8), y: py, vx: rand(-10, 10), vy: -50, r: rand(6, 10), life: 1, max: 1 });
      continue;
    }
    p.aim += clamp(angleDiff(Math.atan2(player.y - py, player.x - px), p.aim), -2 * dt, 2 * dt);
    p.fireT -= dt;
    if (p.fireT <= 0 && player.alive) {
      p.fireT = 2.0;
      fan(px + Math.cos(p.aim) * 32, py + Math.sin(p.aim) * 32, p.aim, 165, 3, 18, { color: COL.ebullet2 });
    }
  }

  // --- phase transitions ---
  if (b.phase === 0 && !P[0].alive && !P[1].alive) setPhase(1);
  if (b.phase >= 1) {
    const f = core.hp / core.max;
    const np = f > 0.66 ? 1 : f > 0.33 ? 2 : 3;
    if (np > b.phase) setPhase(np);
  }
  if (!player.alive) return;

  // --- core patterns ---
  const cx = b.x, cy = b.y + core.oy;
  b.patT -= dt; b.pat2T -= dt;
  if (b.phase === 0) {
    if (b.patT <= 0) { b.patT = 2.6; fan(cx, cy + 30, Math.PI / 2, 135, 7, 70); }
  } else if (b.phase === 1) {
    if (b.patT <= 0) { b.patT = 2.5; ring(cx, cy, 20, 120, b.t); }
    if (b.pat2T <= 0) { b.pat2T = 3.2; aimFan(cx, cy + 30, 160, 5, 30, { color: COL.ebullet3 }); }
  } else if (b.phase === 2) {
    b.spiralT = (b.spiralT + dt) % 4.6;
    b.spiralA += dt * 1.5;
    if (b.spiralT < 3 && b.patT <= 0) {
      b.patT = 0.13;
      for (let k = 0; k < 3; k++) eShot(cx, cy, b.spiralA + k * TAU / 3, 130, { color: COL.ebullet3 });
    }
    if (b.pat2T <= 0) { b.pat2T = 3.4; aimFan(cx, cy + 30, 165, 3, 18); }
    b.spawnT -= dt;
    if (b.spawnT <= 0) {
      b.spawnT = 10;
      for (const side of ['L', 'R']) {
        const x0 = side === 'L' ? 70 : W - 70;
        const P4 = [[x0, -40], [x0, 640], [W - x0, 640], [W - x0, -80]];
        spawn('fighter', x0, -40, mv.path(P4, 6.5));
      }
    }
  } else {
    if (b.patT <= 0) { b.patT = 3.0; ring(cx, cy, 14, 112, b.t, { color: COL.ebullet3 }); }
    if (!b.laser) {
      b.laserT -= dt;
      if (b.laserT <= 0) { b.laser = { st: 'warn', t: 0 }; Sfx.charge(); }
    }
  }

  // --- laser ---
  const L = b.laser;
  if (L) {
    L.t += dt;
    if (L.st === 'warn' && L.t > 1.1) { L.st = 'fire'; L.t = 0; Sfx.laser(); shake = Math.max(shake, 7); }
    else if (L.st === 'fire') {
      if (Math.abs(player.x - cx) < 18 + player.r && player.y > cy) hurtPlayer(55 * dt, true);
      if (Math.random() < dt * 40) sparkBurst(cx + rand(-14, 14), H - rand(0, 30), '#ffb0d0', 2, 200);
      if (L.t > 1.7) { b.laser = null; b.laserT = 2.6; }
    }
  }
}

// ---------- Drawing ----------
function drawBoss() {
  const b = boss, P = b.parts;
  const jx = b.state === 'dying' ? rand(-3, 3) : 0;
  const x = b.x + jx, y = b.y;

  ctx.save(); ctx.translate(x, y);
  // engines (rear = top)
  ctx.globalCompositeOperation = 'lighter';
  for (const ex of [-96, -40, 40, 96]) {
    const fl = rand(0.85, 1.15);
    drawGlow('#ff8a5e', ex, -84, 26 * fl, 0.9);
    drawGlow('#ffe0b0', ex, -80, 10 * fl, 1);
  }
  ctx.globalCompositeOperation = 'source-over';

  // wings
  mirrorPath(SHAPES.boss);
  ctx.fillStyle = vGrad('bossWing', 96, '#3b4570', '#161b33'); ctx.fill();
  ctx.strokeStyle = 'rgba(160,180,255,0.25)'; ctx.lineWidth = 1.5; ctx.stroke();
  // wing panel lines
  ctx.strokeStyle = 'rgba(255,107,129,0.55)'; ctx.lineWidth = 2;
  ctx.beginPath();
  for (const s of [-1, 1]) { ctx.moveTo(s * 70, -40); ctx.lineTo(s * 220, -6); ctx.moveTo(s * 80, 40); ctx.lineTo(s * 190, 26); }
  ctx.stroke();
  // hull
  mirrorPath(SHAPES.bossHull);
  ctx.fillStyle = vGrad('bossHull', 92, '#56628f', '#262d4f'); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1.2; ctx.stroke();
  ctx.fillStyle = 'rgba(10,14,30,0.6)';
  rr(-10, -78, 20, 60, 6); ctx.fill();
  // blinking lights
  const blink = Math.sin(b.t * 6) > 0;
  ctx.globalCompositeOperation = 'lighter';
  for (const s of [-1, 1]) {
    drawGlow(blink ? COL.danger : '#ff9db0', s * 238, -6, 10, blink ? 1 : 0.4);
    drawGlow(COL.danger, s * 120, 34, 7, blink ? 0.4 : 1);
  }
  ctx.globalCompositeOperation = 'source-over';

  // turrets
  for (const p of P) {
    if (p.id === 'core') continue;
    ctx.save(); ctx.translate(p.ox, p.oy);
    if (p.alive) {
      ctx.fillStyle = p.hitT > 0 ? '#5a6390' : '#20263f';
      ctx.beginPath(); ctx.arc(0, 0, p.r, 0, TAU); ctx.fill();
      ctx.strokeStyle = COL.ebullet2; ctx.lineWidth = 3; ctx.stroke();
      ctx.save(); ctx.rotate(p.aim - Math.PI / 2);
      ctx.fillStyle = '#9aa6d6';
      rr(-11, 8, 8, 30, 3); ctx.fill(); rr(3, 8, 8, 30, 3); ctx.fill();
      ctx.restore();
      ctx.fillStyle = '#2f3760'; ctx.beginPath(); ctx.arc(0, 0, p.r * 0.55, 0, TAU); ctx.fill();
      ctx.globalCompositeOperation = 'lighter';
      drawGlow(COL.ebullet2, 0, 0, 14, 0.5 + 0.3 * Math.sin(b.t * 5));
      ctx.globalCompositeOperation = 'source-over';
      // mini hp ring
      ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, p.r + 6, -Math.PI / 2, -Math.PI / 2 + TAU * p.hp / p.max); ctx.stroke();
    } else {
      ctx.fillStyle = '#0d1020'; ctx.beginPath(); ctx.arc(0, 0, p.r * 0.8, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(255,140,80,0.5)'; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.restore();
  }

  // core
  const core = P[2];
  ctx.save(); ctx.translate(core.ox, core.oy);
  ctx.fillStyle = '#1a1f38'; ctx.beginPath(); ctx.arc(0, 0, core.r + 8, 0, TAU); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();
  const pulse = 0.75 + 0.25 * Math.sin(b.t * (3 + b.phase * 2));
  const g = ctx.createRadialGradient(0, 0, 2, 0, 0, core.r);
  g.addColorStop(0, '#ffffff'); g.addColorStop(0.3, core.hitT > 0 ? '#ffd0e2' : '#ff9ac0');
  g.addColorStop(0.75, '#ff2f6d'); g.addColorStop(1, '#5a0a2a');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, core.r * (0.86 + 0.08 * pulse), 0, TAU); ctx.fill();
  ctx.globalCompositeOperation = 'lighter';
  drawGlow('#ff4f9a', 0, 0, 70, 0.35 * pulse + (b.laser ? 0.4 : 0));
  ctx.globalCompositeOperation = 'source-over';
  if (b.phase === 0 && b.state !== 'dying') {
    ctx.save(); ctx.rotate(b.t * 0.8);
    ctx.strokeStyle = hexA(COL.V, 0.75); ctx.lineWidth = 3;
    ctx.setLineDash([14, 8]);
    ctx.beginPath(); ctx.arc(0, 0, core.r + 14, 0, TAU); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    ctx.globalCompositeOperation = 'lighter';
    drawGlow(COL.V, 0, 0, 62, 0.18);
    ctx.globalCompositeOperation = 'source-over';
  }
  ctx.restore();
  ctx.restore();
}

function drawLaser() {
  if (!boss || !boss.laser) return;
  const L = boss.laser, cx = boss.x, cy = boss.y + boss.parts[2].oy;
  if (L.st === 'warn') {
    const on = Math.floor(L.t * 14) % 2 === 0;
    ctx.fillStyle = hexA(COL.danger, 0.07 + L.t * 0.05);
    ctx.fillRect(cx - 18, cy, 36, H - cy);
    ctx.strokeStyle = hexA(COL.danger, on ? 0.9 : 0.35); ctx.lineWidth = 2;
    ctx.setLineDash([10, 8]);
    ctx.beginPath(); ctx.moveTo(cx, cy + 40); ctx.lineTo(cx, H); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalCompositeOperation = 'lighter';
    drawGlow('#ff6fa8', cx, cy + 20, 20 + L.t * 30, 0.8);
    ctx.globalCompositeOperation = 'source-over';
  } else {
    const grow = Math.min(1, L.t / 0.12) * (L.t > 1.5 ? Math.max(0, (1.7 - L.t) / 0.2) : 1);
    const w = 46 * grow, wob = Math.sin(L.t * 60) * 2;
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(cx - w, 0, cx + w, 0);
    g.addColorStop(0, 'rgba(255,79,154,0)'); g.addColorStop(0.35, 'rgba(255,79,154,0.55)');
    g.addColorStop(0.5, 'rgba(255,220,240,0.95)'); g.addColorStop(0.65, 'rgba(255,79,154,0.55)'); g.addColorStop(1, 'rgba(255,79,154,0)');
    ctx.fillStyle = g; ctx.fillRect(cx - w, cy, w * 2, H - cy);
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(cx - (6 + wob) * grow, cy, (12 + wob * 2) * grow, H - cy);
    drawGlow('#ff4f9a', cx, cy + 10, 60, 0.9);
    ctx.globalCompositeOperation = 'source-over';
  }
}
