'use strict';
// ===== Rendering: background, sprites, effects, HUD =====

// ---------- Background: deep space ----------
function makeNebula(w, h, color) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  for (let i = 0; i < 10; i++) {
    const x = rand(w * 0.2, w * 0.8), y = rand(h * 0.25, h * 0.75), r = rand(h * 0.18, h * 0.42);
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, hexA(color, 0.42)); gr.addColorStop(1, hexA(color, 0));
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  }
  return c;
}
function makePlanet(r, c1, c2, ringColor) {
  const S = Math.ceil(r * 2.8), c = document.createElement('canvas'); c.width = S; c.height = S;
  const g = c.getContext('2d'), cx = S / 2, cy = S / 2;
  const ring = (front) => {
    g.save(); g.translate(cx, cy); g.rotate(-0.32); g.scale(1, 0.24);
    g.strokeStyle = ringColor; g.lineWidth = r * 0.5; g.globalAlpha = 0.35;
    g.beginPath(); g.arc(0, 0, r * 1.18, front ? 0 : Math.PI, front ? Math.PI : TAU); g.stroke();
    g.lineWidth = r * 0.08; g.globalAlpha = 0.55;
    g.beginPath(); g.arc(0, 0, r * 1.36, front ? 0 : Math.PI, front ? Math.PI : TAU); g.stroke();
    g.restore();
  };
  ring(false);
  g.save(); g.beginPath(); g.arc(cx, cy, r, 0, TAU); g.clip();
  const body = g.createRadialGradient(cx - r * 0.45, cy - r * 0.45, r * 0.1, cx, cy, r * 1.05);
  body.addColorStop(0, c1); body.addColorStop(1, c2);
  g.fillStyle = body; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 9; i++) {
    g.fillStyle = `rgba(255,255,255,${rand(0.03, 0.09)})`;
    g.fillRect(0, cy - r + rand(0, 2 * r), S, rand(r * 0.04, r * 0.16));
  }
  const shade = g.createRadialGradient(cx - r * 0.5, cy - r * 0.5, r * 0.6, cx - r * 0.2, cy - r * 0.2, r * 1.6);
  shade.addColorStop(0, 'rgba(0,0,0,0)'); shade.addColorStop(1, 'rgba(0,0,0,0.85)');
  g.fillStyle = shade; g.fillRect(0, 0, S, S);
  g.restore();
  g.strokeStyle = 'rgba(180,210,255,0.25)'; g.lineWidth = 2;
  g.beginPath(); g.arc(cx, cy, r, Math.PI * 0.9, Math.PI * 1.75); g.stroke();
  ring(true);
  return c;
}
const BG = { stars: [], nebulae: [], rocks: [], planets: [] };
{
  const layers = [[140, 10, 0.8, 0.55], [70, 28, 1.2, 0.75], [26, 80, 1.7, 0.95]];
  for (const [n, speed, size, alpha] of layers) for (let i = 0; i < n; i++) {
    BG.stars.push({ x: rand(0, W), y: rand(0, H), speed: speed * rand(0.8, 1.2), size: size * rand(0.7, 1.3), alpha,
      tw: rand(0, TAU), color: pick(['#ffffff', '#ffffff', '#cfe0ff', '#ffe6c9', '#bfe9ff']) });
  }
  const neb = ['#5b3cc4', '#1f6fd1', '#c43c8e', '#2aa79b'];
  for (let i = 0; i < 4; i++) {
    BG.nebulae.push({ spr: makeNebula(460, 360, neb[i]), x: rand(-160, W - 300), y: i * 280 - 200, speed: rand(14, 22), alpha: rand(0.35, 0.55) });
  }
  for (let i = 0; i < 9; i++) {
    BG.rocks.push({ shape: makeRockShape(rand(5, 16)), x: rand(0, W), y: rand(-100, H), speed: rand(35, 60), vx: rand(-6, 6),
      angle: rand(0, TAU), spin: rand(-0.6, 0.6) });
  }
  BG.planets.push({ spr: makePlanet(130, '#7fb6ff', '#24305e', '#bcd3ff'), x: W - 60, y: 260, speed: 7 });
  BG.planets.push({ spr: makePlanet(46, '#ffb38a', '#5a2230', '#ffd9b8'), x: 70, y: -900, speed: 11 });
}

function updateBackground(dt) {
  bgTime += dt;
  for (const s of BG.stars) { s.y += s.speed * dt; if (s.y > H + 4) { s.y = -4; s.x = rand(0, W); } }
  for (const n of BG.nebulae) {
    n.y += n.speed * dt;
    if (n.y > H + 40) { n.y = -n.spr.height - rand(0, 300); n.x = rand(-160, W - 300); }
  }
  for (const r of BG.rocks) {
    r.y += r.speed * dt; r.x += r.vx * dt; r.angle += r.spin * dt;
    if (r.y > H + 30) { r.y = rand(-200, -30); r.x = rand(0, W); }
  }
  for (const p of BG.planets) {
    p.y += p.speed * dt;
    if (p.y - p.spr.height / 2 > H) { p.y = -p.spr.height / 2 - rand(600, 1400); p.x = rand(0, 1) < 0.5 ? rand(40, 120) : rand(W - 120, W - 40); }
  }
}

function drawBackground() {
  const p = state === 'title' ? 0 : clamp(levelTime / LEVEL_TIME, 0, 1);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, mixHex('#03040b', '#0b0310', p));
  g.addColorStop(1, mixHex('#08102a', '#1e0719', p));
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  ctx.globalCompositeOperation = 'lighter';
  for (const n of BG.nebulae) { ctx.globalAlpha = n.alpha; ctx.drawImage(n.spr, n.x, n.y); }
  // a red giant's glow creeps in as the boss approaches
  if (p > 0.5) drawGlow('#ff3d5e', W / 2, -120, 520, (p - 0.5) * 0.7);
  ctx.globalAlpha = 1;
  for (const s of BG.stars) {
    const a = s.alpha * (0.65 + 0.35 * Math.sin(bgTime * 2 + s.tw));
    ctx.globalAlpha = a; ctx.fillStyle = s.color;
    if (s.speed > 60) ctx.fillRect(s.x - s.size / 2, s.y - s.size * 3, s.size, s.size * 4);
    else ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';

  for (const pl of BG.planets) ctx.drawImage(pl.spr, pl.x - pl.spr.width / 2, pl.y - pl.spr.height / 2);
  ctx.globalAlpha = 0.8;
  for (const r of BG.rocks) drawRock(r.shape, r.x, r.y, r.angle, { dim: true });
  ctx.globalAlpha = 1;
}

// ---------- Player ----------
function drawPlayer() {
  const p = player;
  if (!p.alive) return;
  const blink = p.inv > 0 && Math.floor(p.inv * 20) % 2 === 0;
  const sx = 1 - Math.abs(p.bank) * 0.22;

  ctx.save(); ctx.translate(p.x, p.y);
  if (blink) ctx.globalAlpha = 0.45;
  // engine flame
  ctx.globalCompositeOperation = 'lighter';
  const fl = rand(0.85, 1.15);
  drawGlow(COL.V, 0, 34, 22 * fl, 0.9);
  drawGlow('#ffffff', 0, 32, 8 * fl, 1);
  ctx.fillStyle = 'rgba(126,249,255,0.55)';
  ctx.beginPath(); ctx.moveTo(-4, 31); ctx.lineTo(4, 31); ctx.lineTo(0, 31 + 26 * fl); ctx.closePath(); ctx.fill();
  if (p.muzzle > 0 && p.primary !== 'L') {
    const xs = p.primary === 'V' ? VULCAN_XS[p.level] : [0];
    for (const ox of xs) drawGlow(p.primary === 'V' ? COL.V : COL.S, ox, -28, 12, 0.9);
  }
  ctx.globalCompositeOperation = 'source-over';
  if (blink) ctx.globalAlpha = 0.45;

  ctx.save(); ctx.scale(sx, 1);
  mirrorPath(SHAPES.player);
  ctx.fillStyle = vGrad('player', 34, '#ffffff', '#93a4c8'); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1; ctx.stroke();
  ctx.strokeStyle = COL.V; ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(14, -2); ctx.lineTo(29, 9); ctx.moveTo(-14, -2); ctx.lineTo(-29, 9);
  ctx.moveTo(0, 6); ctx.lineTo(0, 24);
  ctx.stroke();
  ctx.fillStyle = '#0d1a2e';
  ctx.beginPath(); ctx.ellipse(0, -14, 3.8, 9, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = hexA(COL.V, 0.8);
  ctx.beginPath(); ctx.ellipse(-1, -17, 1.4, 4, 0, 0, TAU); ctx.fill();
  ctx.restore();
  ctx.globalAlpha = 1;

  if (p.shield > 0) {
    ctx.globalCompositeOperation = 'lighter';
    const a = 0.25 + 0.6 * (p.shield / p.shieldMax);
    drawGlow(COL.shield, 0, 0, 46, a * 0.45);
    ctx.strokeStyle = hexA(COL.shield, a * (0.7 + 0.3 * Math.sin(bgTime * 8)));
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, 32, 0, TAU); ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }
  if (p.focus) {
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = COL.danger; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, p.r, 0, TAU); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

function drawPlayerLaser() {
  const p = player;
  if (!p.alive || p.primary !== 'L' || state !== 'playing') return;
  const hw = LASER.hw[p.level - 1], y0 = p.y - 28, y1 = Math.min(y0, p.laserY), fl = rand(0.85, 1.15);
  ctx.globalCompositeOperation = 'lighter';
  const g = ctx.createLinearGradient(p.x - hw * 2.4, 0, p.x + hw * 2.4, 0);
  g.addColorStop(0, hexA(COL.L, 0)); g.addColorStop(0.3, hexA(COL.L, 0.35));
  g.addColorStop(0.5, hexA(COL.L, 0.85)); g.addColorStop(0.7, hexA(COL.L, 0.35)); g.addColorStop(1, hexA(COL.L, 0));
  ctx.fillStyle = g; ctx.fillRect(p.x - hw * 2.4, y1, hw * 4.8, y0 - y1);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillRect(p.x - hw * 0.35 * fl, y1, hw * 0.7 * fl, y0 - y1);
  drawGlow(COL.L, p.x, y0, 18 + hw, 0.9);
  if (p.laserHit) drawGlow(COL.L, p.x, y1, 22 + hw * 1.5 * fl, 0.9);
  ctx.globalCompositeOperation = 'source-over';
}
function drawBombs() {
  if (!bombs.length) return;
  ctx.globalCompositeOperation = 'lighter';
  for (const w of bombs) {
    const k = clamp(w.r / 1300, 0, 1), a = 1 - k;
    ctx.strokeStyle = hexA(COL.B, 0.8 * a); ctx.lineWidth = 34 * a + 4;
    ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, TAU); ctx.stroke();
    ctx.strokeStyle = `rgba(255,255,255,${0.9 * a})`; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(w.x, w.y, w.r * 0.97, 0, TAU); ctx.stroke();
    ctx.fillStyle = hexA(COL.B, 0.08 * a);
    ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, TAU); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
}

// ---------- Enemies ----------
function drawEnemy(e) {
  const T = TYPES[e.type];
  if (T.rock) { drawRock(e.rock, e.x, e.y, e.angle, { flash: e.hitT > 0 ? 0.35 : 0 }); return; }
  const shape = SHAPES[T.shape], sc = T.scale || 1;
  ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.angle); ctx.scale(sc, sc);
  ctx.globalCompositeOperation = 'lighter';
  for (const [ex, ey] of T.engines) drawGlow('#ff9a5e', ex, ey - 4, 13 * rand(0.85, 1.15), 0.9);
  if (e.type === 'carrier') drawGlow(COL.carrier[0], 0, 0, 40, 0.35 + 0.25 * Math.sin(e.t * 6));
  ctx.globalCompositeOperation = 'source-over';

  mirrorPath(shape);
  ctx.fillStyle = vGrad('e_' + e.type, T.h, T.col[0], T.col[1]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.28)'; ctx.lineWidth = 1; ctx.stroke();
  {
    ctx.fillStyle = '#1b1029';
    ctx.beginPath(); ctx.ellipse(T.eye[0], T.eye[1], T.eye[2], T.eye[3], 0, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'lighter';
    drawGlow(e.type === 'carrier' ? COL.carrier[0] : COL.danger, T.eye[0], T.eye[1] + 1, T.eye[2] * 2.4, 0.8);
    ctx.globalCompositeOperation = 'source-over';
    if (e.type === 'frigate') {
      ctx.strokeStyle = 'rgba(255,107,129,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-84, -8); ctx.lineTo(-36, -2); ctx.moveTo(84, -8); ctx.lineTo(36, -2); ctx.stroke();
      for (const s of [-1, 1]) {
        ctx.fillStyle = '#20263f'; ctx.beginPath(); ctx.arc(s * 40, 20, 11, 0, TAU); ctx.fill();
        ctx.strokeStyle = COL.ebullet2; ctx.lineWidth = 2; ctx.stroke();
      }
    } else if (e.type === 'bomber' || e.type === 'gunship') {
      ctx.strokeStyle = 'rgba(40,20,10,0.35)'; ctx.lineWidth = 2;
      const wx = e.type === 'bomber' ? 48 : 34;
      ctx.beginPath(); ctx.moveTo(-wx, -6); ctx.lineTo(-14, -2); ctx.moveTo(wx, -6); ctx.lineTo(14, -2); ctx.stroke();
    }
  }
  if (e.hitT > 0) { mirrorPath(shape); ctx.fillStyle = `rgba(255,255,255,${e.r > 30 ? 0.3 : 0.65})`; ctx.fill(); }
  ctx.restore();
}

// ---------- Bullets ----------
function drawPBullets() {
  ctx.globalCompositeOperation = 'lighter';
  for (const b of pBullets) {
    if (b.kind === 'm') {
      drawGlow(COL.M, b.x - Math.cos(b.ang) * 10, b.y - Math.sin(b.ang) * 10, 14, 0.9);
    } else {
      drawGlow(b.color, b.x, b.y, 14, 0.55);
    }
  }
  ctx.globalCompositeOperation = 'source-over';
  for (const b of pBullets) {
    ctx.save(); ctx.translate(b.x, b.y);
    if (b.kind === 'm') {
      ctx.rotate(b.ang + Math.PI / 2);
      ctx.fillStyle = '#fff6d6'; rr(-2.5, -8, 5, 14, 2.5); ctx.fill();
      ctx.fillStyle = COL.M; ctx.fillRect(-2.5, 2, 5, 4);
    } else {
      if (b.ang != null) ctx.rotate(b.ang + Math.PI / 2);
      ctx.fillStyle = '#ffffff'; rr(-2, -9, 4, 18, 2); ctx.fill();
    }
    ctx.restore();
  }
}
function drawEBullets() {
  ctx.globalCompositeOperation = 'lighter';
  for (const b of eBullets) drawGlow(b.color, b.x, b.y, b.r * 2.6, 0.75);
  ctx.globalCompositeOperation = 'source-over';
  for (const b of eBullets) {
    ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 0.5, 0, TAU); ctx.fill();
  }
}

// ---------- Pickups ----------
function hexPath(r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + Math.PI / 6; ctx[i ? 'lineTo' : 'moveTo'](Math.cos(a) * r, Math.sin(a) * r); }
  ctx.closePath();
}
function drawPickups() {
  for (const k of pickups) {
    const d = PICKUPS[k.type], pulse = 1 + Math.sin(k.t * 6) * 0.06;
    ctx.save(); ctx.translate(k.x, k.y);
    ctx.globalCompositeOperation = 'lighter';
    drawGlow(d.color, 0, 0, 34, 0.55);
    ctx.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.rotate(k.t * 0.8); ctx.scale(pulse, pulse);
    hexPath(17); ctx.fillStyle = hexA(d.color, 0.2); ctx.fill();
    ctx.strokeStyle = d.color; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.restore();
    if (k.type === 'shield') {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(7, -5); ctx.lineTo(6, 3); ctx.lineTo(0, 9); ctx.lineTo(-6, 3); ctx.lineTo(-7, -5); ctx.closePath(); ctx.fill();
    } else if (k.type === 'heal') {
      ctx.fillStyle = '#ffffff'; rr(-2.5, -8, 5, 16, 1.5); ctx.fill(); rr(-8, -2.5, 16, 5, 1.5); ctx.fill();
    } else {
      text(d.label, 0, 1, { size: 16, weight: 900, align: 'center', baseline: 'middle' });
    }
    ctx.restore();
  }
}

// ---------- Particles ----------
function drawParticles() {
  for (const q of particles) {
    if (q.type !== 'smoke' && q.type !== 'debris') continue;
    const a = q.life / q.max;
    if (q.type === 'smoke') {
      ctx.fillStyle = q.light ? `rgba(255,236,190,${0.35 * a})` : `rgba(40,44,70,${0.5 * a})`;
      ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, TAU); ctx.fill();
    } else {
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.globalAlpha = a;
      ctx.fillStyle = q.color; ctx.fillRect(-q.s, -q.s, q.s * 2, q.s * 2);
      ctx.restore(); ctx.globalAlpha = 1;
    }
  }
  ctx.globalCompositeOperation = 'lighter';
  for (const q of particles) {
    const a = q.life / q.max;
    if (q.type === 'spark') {
      ctx.strokeStyle = q.color; ctx.globalAlpha = a; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(q.x - q.vx * 0.04, q.y - q.vy * 0.04); ctx.stroke();
    } else if (q.type === 'glow') {
      drawGlow(q.color, q.x, q.y, q.r * (0.6 + 0.4 * a), a);
    } else if (q.type === 'ring') {
      ctx.strokeStyle = q.color; ctx.globalAlpha = a; ctx.lineWidth = q.w * a + 0.5;
      ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, TAU); ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}
function drawPopups() {
  for (const q of popups) {
    const a = Math.min(1, q.life / q.max * 2.5);
    text(q.str, q.x, q.y, { size: q.size, weight: 900, align: 'center', color: q.color, alpha: a, spacing: 1 });
  }
}

// ---------- HUD ----------
function drawHUD() {
  // stage progress
  const prog = clamp(levelTime / LEVEL_TIME, 0, 1), px0 = 20, px1 = W - 44, py = 14;
  ctx.fillStyle = 'rgba(255,255,255,0.1)'; rr(px0, py - 1.5, px1 - px0, 3, 1.5); ctx.fill();
  const pg = ctx.createLinearGradient(px0, 0, px1, 0);
  pg.addColorStop(0, COL.V); pg.addColorStop(1, COL.ebullet);
  ctx.fillStyle = pg; rr(px0, py - 1.5, (px1 - px0) * prog, 3, 1.5); ctx.fill();
  const mx = px0 + (px1 - px0) * (92 / LEVEL_TIME);
  ctx.fillStyle = 'rgba(255,181,71,0.8)'; ctx.fillRect(mx - 1, py - 4, 2, 8);
  ctx.fillStyle = '#ffffff';
  const kx = px0 + (px1 - px0) * prog;
  ctx.beginPath(); ctx.moveTo(kx, py - 6); ctx.lineTo(kx + 4, py + 4); ctx.lineTo(kx - 4, py + 4); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.translate(W - 28, py); ctx.rotate(Math.PI / 4);
  const bp = bossSpawned ? 1 : 0.6 + 0.4 * Math.sin(bgTime * 4);
  ctx.fillStyle = hexA(COL.danger, bp); ctx.fillRect(-5, -5, 10, 10);
  ctx.restore();

  // hull
  const p = player, bx = 20, by = 42, bw = 210, bh = 12;
  text('HULL', bx, 35, { size: 10, weight: 800, color: '#8fb3d9', spacing: 2.5 });
  text(Math.ceil(Math.max(0, p.hp)).toString(), bx + bw, 35, { size: 11, weight: 800, color: '#ffffff', align: 'right' });
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; rr(bx, by, bw, bh, 6); ctx.fill();
  const f = Math.max(0, p.hp) / p.maxHp, gf = Math.max(0, p.ghost) / p.maxHp;
  ctx.fillStyle = 'rgba(255,255,255,0.55)'; rr(bx, by, bw * gf, bh, 6); ctx.fill();
  const hc = f > 0.5 ? COL.heal : f > 0.25 ? COL.M : COL.danger;
  const hg = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  hg.addColorStop(0, hexA(hc, 0.75)); hg.addColorStop(1, hc);
  ctx.fillStyle = hg; rr(bx, by, bw * f, bh, 6); ctx.fill();
  ctx.fillStyle = 'rgba(7,12,26,0.55)';
  for (let i = 1; i < 10; i++) ctx.fillRect(bx + bw * i / 10 - 0.75, by, 1.5, bh);
  if (f <= 0.25 && p.alive && Math.sin(bgTime * 10) > 0) {
    ctx.strokeStyle = hexA(COL.danger, 0.9); ctx.lineWidth = 1.5; rr(bx - 1, by - 1, bw + 2, bh + 2, 7); ctx.stroke();
  }
  if (p.shield > 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; rr(bx, by + bh + 4, bw, 5, 2.5); ctx.fill();
    ctx.fillStyle = COL.shield; rr(bx, by + bh + 4, bw * p.shield / p.shieldMax, 5, 2.5); ctx.fill();
  }

  // score
  text('SCORE', W - 20, 35, { size: 10, weight: 800, color: '#8fb3d9', spacing: 2.5, align: 'right' });
  text(fmt(score), W - 20, 60, { size: 24, weight: 900, align: 'right', spacing: 0.5 });
  text('HI ' + fmt(Math.max(hiScore, score)), W - 20, 77, { size: 10, weight: 700, color: '#6f87a8', spacing: 1.5, align: 'right' });

  // weapons
  const chips = [{ name: PICKUPS[p.primary].name, lv: p.level, color: COL[p.primary] }];
  if (p.missiles > 0) chips.push({ name: 'MISSILE', lv: p.missiles, color: COL.M });
  let cx = 20;
  for (const c of chips) {
    const w = 126;
    ctx.fillStyle = 'rgba(8,14,30,0.6)'; rr(cx, H - 46, w, 28, 14); ctx.fill();
    ctx.strokeStyle = hexA(c.color, 0.55); ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = c.color; ctx.beginPath(); ctx.arc(cx + 14, H - 32, 4, 0, TAU); ctx.fill();
    text(c.name, cx + 24, H - 28, { size: 10, weight: 800, spacing: 1.5 });
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < c.lv ? c.color : 'rgba(255,255,255,0.15)';
      rr(cx + w - 34 + i * 8, H - 38, 5, 12, 2); ctx.fill();
    }
    cx += w + 8;
  }
  // bombs (bottom right)
  {
    const w = 132, x = W - 20 - w;
    ctx.fillStyle = 'rgba(8,14,30,0.6)'; rr(x, H - 46, w, 28, 14); ctx.fill();
    ctx.strokeStyle = hexA(COL.B, 0.55); ctx.lineWidth = 1.2; ctx.stroke();
    text('BOMB', x + 14, H - 28, { size: 10, weight: 800, spacing: 1.5, color: p.bombs ? '#ffffff' : '#6f7a96' });
    for (let i = 0; i < p.maxBombs; i++) {
      const bx2 = x + 64 + i * 12, by2 = H - 32;
      ctx.fillStyle = i < p.bombs ? COL.B : 'rgba(255,255,255,0.14)';
      ctx.beginPath(); ctx.arc(bx2, by2, 4, 0, TAU); ctx.fill();
    }
    if (p.bombs > 0 && state === 'playing' && levelTime < 25) text('SPACE', x + w / 2, H - 54, { size: 9, weight: 800, color: '#8f7fd0', spacing: 2, align: 'center' });
  }

  // boss / midboss bar
  let barName = null, barFrac = 0, barNote = '';
  if (boss && boss.state !== 'dying') {
    let hp = 0, max = 0;
    for (const q of boss.parts) { hp += q.hp; max += q.max; }
    barName = 'DREADNOUGHT'; barFrac = hp / max;
    barNote = boss.phase === 0 ? 'CORE SHIELDED' : 'PHASE ' + boss.phase;
  } else {
    const fr = enemies.find(e => !e.dead && TYPES[e.type].bar && !e.leaving);
    if (fr) { barName = TYPES[fr.type].bar; barFrac = fr.hp / fr.maxHp; }
  }
  if (barName) {
    const x0 = 60, x1 = W - 60, y = 104;
    text(barName, x0, y - 7, { size: 11, weight: 900, color: '#ffd0dc', spacing: 3 });
    if (barNote) text(barNote, x1, y - 7, { size: 9, weight: 800, color: '#8fb3d9', spacing: 2, align: 'right' });
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; rr(x0, y, x1 - x0, 7, 3.5); ctx.fill();
    const bg = ctx.createLinearGradient(x0, 0, x1, 0);
    bg.addColorStop(0, '#ff4f9a'); bg.addColorStop(1, '#ffb547');
    ctx.fillStyle = bg; rr(x0, y, (x1 - x0) * clamp(barFrac, 0, 1), 7, 3.5); ctx.fill();
  }
}

function drawBanners() {
  for (const b of banners) {
    const a = Math.min(1, b.t / 0.3, (b.dur - b.t) / 0.5);
    if (a <= 0) continue;
    const cy = H * 0.4;
    ctx.globalAlpha = a;
    if (b.kind === 'warning') {
      ctx.fillStyle = 'rgba(255,40,80,0.14)'; ctx.fillRect(0, cy - 62, W, 124);
      ctx.save(); ctx.beginPath(); ctx.rect(0, cy - 62, W, 10); ctx.rect(0, cy + 52, W, 10); ctx.clip();
      ctx.fillStyle = 'rgba(255,79,106,0.7)';
      const off = (b.t * 60) % 28;
      for (let x = -40 + off; x < W + 40; x += 28) {
        ctx.beginPath(); ctx.moveTo(x, cy - 62); ctx.lineTo(x + 14, cy - 62); ctx.lineTo(x - 6, cy + 62); ctx.lineTo(x - 20, cy + 62); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = a * (0.65 + 0.35 * Math.sin(b.t * 10));
      text(b.title, W / 2, cy + 14, { size: 52, weight: 900, color: '#ff5d7d', align: 'center', spacing: 10 });
      ctx.globalAlpha = a;
      text(b.sub, W / 2, cy + 40, { size: 12, weight: 800, color: '#ffd0dc', align: 'center', spacing: 5 });
    } else if (b.kind === 'alert') {
      text(b.title, W / 2, cy, { size: 30, weight: 900, color: '#ffc56b', align: 'center', spacing: 6 });
      if (b.sub) text(b.sub, W / 2, cy + 24, { size: 11, weight: 800, color: '#ffe4bd', align: 'center', spacing: 4 });
    } else {
      const color = b.kind === 'boss' ? '#ff8fb0' : '#ffffff';
      ctx.fillStyle = hexA(COL.V, 0.5);
      ctx.fillRect(W / 2 - 120 * a, cy - 46, 240 * a, 1.5);
      ctx.fillRect(W / 2 - 120 * a, cy + 32, 240 * a, 1.5);
      text(b.title, W / 2, cy, { size: 44, weight: 900, color, align: 'center', spacing: 8 });
      text(b.sub, W / 2, cy + 22, { size: 12, weight: 800, color: '#8fb3d9', align: 'center', spacing: 6 });
    }
    ctx.globalAlpha = 1;
  }
}

// ---------- Frame ----------
function render() {
  ctx.setTransform(view * dpr, 0, 0, view * dpr, 0, 0);
  const sx = shake > 0 ? rand(-1, 1) * shake : 0, sy = shake > 0 ? rand(-1, 1) * shake : 0;
  ctx.save(); ctx.translate(sx, sy);
  drawBackground();
  if (state !== 'title') {
    if (boss) drawBoss();
    for (const e of enemies) if (!e.dead) drawEnemy(e);
    drawPickups();
    drawParticles();
    drawPBullets();
    drawPlayerLaser();
    drawPlayer();
    drawLaser();
    drawEBullets();
    drawBombs();
    drawPopups();
  } else {
    player.x = W / 2 + Math.sin(bgTime * 0.8) * 30; player.y = H - 170 + Math.sin(bgTime * 1.3) * 8;
    player.bank = Math.cos(bgTime * 0.8) * 0.3; player.alive = true; player.inv = 0; player.shield = 0; player.focus = false;
    drawPlayer();
  }
  ctx.restore();

  if (flash > 0) { ctx.fillStyle = flashColor; ctx.globalAlpha = Math.min(1, flash); ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  if (hurtFlash > 0) {
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    g.addColorStop(0, 'rgba(255,40,70,0)'); g.addColorStop(1, `rgba(255,40,70,${hurtFlash * 0.9})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  if (state !== 'title') { drawHUD(); drawBanners(); }
}
