// The little track map in the corner: the circuit, the start line, the ramp,
// and a coloured dot for every racer. The player's dot is bigger, ringed in
// white and drawn on top.
import { Track } from './track.js';

export class Minimap {
  constructor(canvas, track, course, specs) {
    this.canvas = canvas;
    this.track = track;
    this.course = course;
    this.specs = specs;
    this.f = Track.frame();
    this.size = 0;
    this.base = document.createElement('canvas');
    // Map the world onto the canvas. Screen-up is the direction the cars set
    // off in (+z), and +x (the cars' left) is screen-left, so the map turns
    // the same way the road does.
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (const p of track.pts) {
      x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x);
      z0 = Math.min(z0, p.z); z1 = Math.max(z1, p.z);
    }
    this.box = { x0, x1, z0, z1 };
    // Measure only when the box changes size (or appears), never per frame.
    this.cssW = this.cssH = 0;
    const measure = () => {
      this.cssW = canvas.clientWidth;
      this.cssH = canvas.clientHeight;
    };
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measure).observe(canvas);
    else window.addEventListener('resize', measure);
    measure();
  }

  // world (x, z) -> canvas pixels
  _xy(x, z) {
    return [this.ox - (x - this.cx) * this.k, this.oy - (z - this.cz) * this.k];
  }

  _layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(Math.max(this.cssW, 1) * dpr), H = Math.round(Math.max(this.cssH, 1) * dpr);
    if (W === this.W && H === this.H) return;
    this.W = W;
    this.H = H;
    this.size = W; // line widths scale with the width
    this.canvas.width = this.base.width = W;
    this.canvas.height = this.base.height = H;
    const { x0, x1, z0, z1 } = this.box;
    const pad = W * 0.16;
    this.k = Math.min((W - pad * 2) / (x1 - x0), (H - pad * 2) / (z1 - z0));
    this.cx = (x0 + x1) / 2;
    this.cz = (z0 + z1) / 2;
    this.ox = W / 2;
    this.oy = H / 2;
    this._drawBase();
  }

  _drawBase() {
    const g = this.base.getContext('2d');
    const u = this.size / 110; // u: one "pixel" at the 110px design width
    const t = this.track;
    g.clearRect(0, 0, this.W, this.H);
    g.beginPath();
    for (let i = 0; i <= t.n; i += 4) {
      const p = t.pts[i % t.n];
      const [x, y] = this._xy(p.x, p.z);
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.closePath();
    g.lineJoin = g.lineCap = 'round';
    g.strokeStyle = '#1a1220';
    g.lineWidth = 9 * u;
    g.stroke();
    g.strokeStyle = '#5b5763';
    g.lineWidth = 5.5 * u;
    g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.35)';
    g.lineWidth = 0.9 * u;
    g.setLineDash([3 * u, 3 * u]);
    g.stroke();
    g.setLineDash([]);

    // start / finish: a short chequered bar across the road
    const f = this.f;
    const across = (s0, half, width, color) => {
      t.sample(s0, f);
      const [ax, ay] = this._xy(f.pos.x + f.side.x * half, f.pos.z + f.side.z * half);
      const [bx, by] = this._xy(f.pos.x - f.side.x * half, f.pos.z - f.side.z * half);
      g.beginPath();
      g.moveTo(ax, ay);
      g.lineTo(bx, by);
      g.strokeStyle = color;
      g.lineWidth = width;
      g.stroke();
    };
    across(0, 60, 3.2 * u, '#1a1220');
    across(0, 52, 1.8 * u, '#ffffff');

    // the ramp: an orange dot where it sits (it's only two lanes wide)
    const ramp = this.course.ramp;
    if (ramp) {
      t.sample(ramp.s + ramp.len / 2, f);
      const lat = ramp.lat ?? 0;
      const [x, y] = this._xy(f.pos.x + f.side.x * lat, f.pos.z + f.side.z * lat);
      g.beginPath();
      g.arc(x, y, 3.4 * u, 0, Math.PI * 2);
      g.fillStyle = '#ff8a1f';
      g.fill();
      g.lineWidth = 1.2 * u;
      g.strokeStyle = '#1a1220';
      g.stroke();
    }
  }

  draw(race, playerIndex) {
    this._layout();
    const g = this.canvas.getContext('2d');
    const u = this.size / 110;
    g.clearRect(0, 0, this.W, this.H);
    g.drawImage(this.base, 0, 0);
    if (!race) return;
    const f = this.f;
    const dot = (c, r, ring) => {
      this.track.sample(c.s, f);
      const [x, y] = this._xy(f.pos.x, f.pos.z);
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fillStyle = this.specs[c.index].color;
      g.fill();
      g.lineWidth = ring;
      g.strokeStyle = c.index === playerIndex ? '#ffffff' : '#1a1220';
      g.stroke();
    };
    for (const c of race.cars) if (c.index !== playerIndex) dot(c, 3.8 * u, 1.4 * u);
    const p = race.cars[playerIndex];
    // a soft halo so your own car is easy to find
    this.track.sample(p.s, f);
    const [px, py] = this._xy(f.pos.x, f.pos.z);
    g.beginPath();
    g.arc(px, py, 8.5 * u, 0, Math.PI * 2);
    g.fillStyle = 'rgba(255,255,255,0.28)';
    g.fill();
    dot(p, 5.4 * u, 2 * u);
  }
}
