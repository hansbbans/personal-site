// All sound is synthesised with Web Audio: no audio files to load.
import { clamp } from './util.js';

function distortionCurve(amount) {
  const n = 1024, curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
  }
  return curve;
}

class Engine {
  constructor(sys, character = 1) {
    const ctx = (this.ctx = sys.ctx);
    this.character = character;
    const osc = (type) => { const o = ctx.createOscillator(); o.type = type; return o; };
    const gain = (v) => { const g = ctx.createGain(); g.gain.value = v; return g; };
    this.o1 = osc('sawtooth');
    this.o2 = osc('square');
    this.o3 = osc('sawtooth');
    const shaper = ctx.createWaveShaper();
    shaper.curve = distortionCurve(3.5);
    this.lp = ctx.createBiquadFilter();
    this.lp.type = 'lowpass';
    this.lp.Q.value = 1.4;
    // burble: the amplitude wobbles at a fraction of the firing rate
    this.am = gain(0.78);
    this.lfo = osc('sine');
    const lfoDepth = gain(0.22);
    this.lfo.connect(lfoDepth).connect(this.am.gain);
    this.out = gain(0);
    this.o1.connect(gain(0.5)).connect(shaper);
    this.o2.connect(gain(0.3)).connect(shaper);
    this.o3.connect(gain(0.22)).connect(shaper);
    shaper.connect(this.lp).connect(this.am).connect(this.out);
    // exhaust roar
    this.noise = sys.noiseSource();
    this.nbp = ctx.createBiquadFilter();
    this.nbp.type = 'bandpass';
    this.nbp.Q.value = 0.8;
    this.ng = gain(0);
    this.noise.connect(this.nbp).connect(this.ng).connect(this.out);
    if (ctx.createStereoPanner) {
      this.pan = ctx.createStereoPanner();
      this.out.connect(this.pan).connect(sys.master);
    } else this.out.connect(sys.master);
    for (const n of [this.o1, this.o2, this.o3, this.lfo, this.noise]) n.start();
  }
  // rpm 0..1, throttle 0..1, vol 0..1, pan -1..1
  set(rpm, throttle, vol, pan = 0, pitch = 1) {
    const t = this.ctx.currentTime;
    const f = (46 + rpm * 150) * pitch * this.character;
    this.o1.frequency.setTargetAtTime(f, t, 0.035);
    this.o2.frequency.setTargetAtTime(f * 0.5, t, 0.035);
    this.o3.frequency.setTargetAtTime(f * 1.503, t, 0.035);
    this.lfo.frequency.setTargetAtTime(Math.max(4, f * 0.25), t, 0.05);
    this.lp.frequency.setTargetAtTime(320 + rpm * 2400 * (0.45 + 0.55 * throttle), t, 0.05);
    this.nbp.frequency.setTargetAtTime(260 + rpm * 1100, t, 0.05);
    this.ng.gain.setTargetAtTime(0.04 + 0.3 * throttle * rpm, t, 0.05);
    this.out.gain.setTargetAtTime(vol, t, 0.06);
    if (this.pan) this.pan.pan.setTargetAtTime(clamp(pan, -1, 1), t, 0.08);
  }
}

export class AudioSys {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.engines = [];
  }
  get ready() {
    return !!this.ctx;
  }
  // Must be called from a tap or key press: browsers block sound until then.
  ensure(engineCount = 6) {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.85;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16;
    comp.ratio.value = 5;
    comp.attack.value = 0.005;
    comp.release.value = 0.2;
    this.master.connect(comp).connect(ctx.destination);
    const len = ctx.sampleRate * 2;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    for (let i = 0; i < engineCount; i++) this.engines.push(new Engine(this, 0.86 + i * 0.065));
    // crowd bed: a murmur that swells near the grandstands
    const n = this.noiseSource();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 950;
    bp.Q.value = 0.5;
    this.crowdGain = ctx.createGain();
    this.crowdGain.gain.value = 0;
    n.connect(bp).connect(this.crowdGain).connect(this.master);
    n.start();
    if (ctx.state === 'suspended') ctx.resume();
  }
  noiseSource() {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    s.loop = true;
    s.loopStart = Math.random();
    return s;
  }
  setMuted(m) {
    this.muted = m;
    if (this.ctx) this.master.gain.setTargetAtTime(m ? 0 : 0.85, this.ctx.currentTime, 0.03);
  }
  setCrowd(level) {
    if (this.ctx) this.crowdGain.gain.setTargetAtTime(level, this.ctx.currentTime, 0.25);
  }
  tone(freq, dur = 0.25, vol = 0.4, type = 'square', when = 0) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }
  noiseBurst({ dur = 0.5, vol = 0.3, f0 = 500, f1 = 2500, f2 = 600, q = 1.2, attack = 0.08 }) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const s = this.noiseSource();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = q;
    bp.frequency.setValueAtTime(f0, t);
    bp.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.45);
    bp.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    s.connect(bp).connect(g).connect(this.master);
    s.start(t);
    s.stop(t + dur + 0.1);
  }
  whoosh() {
    this.noiseBurst({ dur: 0.55, vol: 0.32, f0: 350, f1: 2600, f2: 500, q: 1.6 });
  }
  cheer(dur = 3, vol = 0.4) {
    this.noiseBurst({ dur, vol, f0: 700, f1: 1500, f2: 900, q: 0.45, attack: 0.35 });
    this.noiseBurst({ dur: dur * 0.8, vol: vol * 0.6, f0: 1800, f1: 2800, f2: 2000, q: 0.8, attack: 0.5 });
  }
  countBeep(go) {
    if (go) {
      this.tone(880, 0.7, 0.4, 'square');
      this.tone(1320, 0.7, 0.2, 'triangle');
    } else this.tone(440, 0.28, 0.38, 'square');
  }
  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      this.tone(f, 0.22, 0.3, 'square', i * 0.14);
      this.tone(f * 2, 0.22, 0.12, 'triangle', i * 0.14);
    });
    for (const f of [523.25, 659.25, 783.99, 1046.5]) this.tone(f, 1.1, 0.16, 'triangle', 0.62);
    this.tone(1046.5, 1.1, 0.2, 'square', 0.62);
  }
  blip() {
    this.tone(660, 0.09, 0.22, 'triangle');
    this.tone(990, 0.12, 0.18, 'triangle', 0.07);
  }
}
