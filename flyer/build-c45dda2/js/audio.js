'use strict';
// ===== Audio: synthesized SFX + step-sequenced music (Web Audio, no assets) =====

const Sound = {
  ac: null, master: null, sfx: null, music: null, bassBus: null, noiseBuf: null,
  muted: store.get('skybreak.muted') === '1',

  init() {
    if (this.ac) { if (this.ac.state === 'suspended') this.ac.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ac = this.ac = new AC();
    const comp = ac.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 4;
    comp.connect(ac.destination);
    this.master = ac.createGain(); this.master.gain.value = this.muted ? 0 : 0.7; this.master.connect(comp);
    this.sfx = ac.createGain(); this.sfx.gain.value = 0.8; this.sfx.connect(this.master);
    this.music = ac.createGain(); this.music.gain.value = 0.38; this.music.connect(this.master);
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 650; lp.Q.value = 6;
    lp.connect(this.music); this.bassBus = lp;
    const len = ac.sampleRate;
    this.noiseBuf = ac.createBuffer(1, len, ac.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  },

  toggleMute() {
    this.muted = !this.muted;
    store.set('skybreak.muted', this.muted ? '1' : '0');
    if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : 0.7, this.ac.currentTime, 0.02);
  },

  tone({ f, f2, dur = 0.1, type = 'sine', vol = 0.1, at, bus, attack = 0.004 }) {
    const ac = this.ac; if (!ac) return;
    const t = at != null ? at : ac.currentTime;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || this.sfx);
    o.start(t); o.stop(t + dur + 0.03);
  },

  noise({ dur = 0.2, vol = 0.1, type = 'lowpass', freq = 1000, freq2, q = 1, at, bus }) {
    const ac = this.ac; if (!ac) return;
    const t = at != null ? at : ac.currentTime;
    const src = ac.createBufferSource(); src.buffer = this.noiseBuf;
    const fl = ac.createBiquadFilter(); fl.type = type; fl.Q.value = q;
    fl.frequency.setValueAtTime(freq, t);
    if (freq2) fl.frequency.exponentialRampToValueAtTime(freq2, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(fl); fl.connect(g); g.connect(bus || this.sfx);
    src.start(t, Math.random() * 0.5); src.stop(t + dur + 0.03);
  },
};

const Sfx = {
  last: {},
  gate(name, gap) {
    const ac = Sound.ac; if (!ac) return false;
    const now = ac.currentTime;
    if (now - (this.last[name] || 0) < gap) return false;
    this.last[name] = now; return true;
  },
  shot() { if (this.gate('shot', 0.085)) Sound.noise({ dur: 0.045, vol: 0.05, type: 'highpass', freq: 3200 }); },
  missile() { if (this.gate('missile', 0.2)) Sound.noise({ dur: 0.25, vol: 0.06, type: 'bandpass', freq: 1400, freq2: 300, q: 2 }); },
  hit() { if (this.gate('hit', 0.05)) Sound.tone({ f: 340, f2: 200, dur: 0.05, type: 'square', vol: 0.025 }); },
  tink() { if (this.gate('tink', 0.07)) Sound.tone({ f: 2400, f2: 1800, dur: 0.04, type: 'triangle', vol: 0.03 }); },
  explode(size = 1) {
    if (!this.gate('explode', 0.06)) return;
    Sound.noise({ dur: 0.3 + 0.2 * size, vol: Math.min(0.3, 0.12 + 0.05 * size), type: 'lowpass', freq: 2200, freq2: 90 });
    Sound.tone({ f: 130, f2: 35, dur: 0.25 + 0.15 * size, type: 'sine', vol: Math.min(0.35, 0.14 + 0.06 * size) });
  },
  bigBoom() {
    Sound.noise({ dur: 1.8, vol: 0.4, type: 'lowpass', freq: 3000, freq2: 60 });
    Sound.tone({ f: 90, f2: 25, dur: 1.6, type: 'sine', vol: 0.45 });
  },
  hurt() {
    Sound.tone({ f: 220, f2: 60, dur: 0.28, type: 'sawtooth', vol: 0.09 });
    Sound.noise({ dur: 0.2, vol: 0.12, type: 'lowpass', freq: 900 });
  },
  shieldHit() { if (this.gate('shield', 0.08)) Sound.tone({ f: 800, f2: 1600, dur: 0.14, type: 'triangle', vol: 0.07 }); },
  pickup() {
    const ac = Sound.ac; if (!ac) return;
    [660, 880, 1320].forEach((f, i) => Sound.tone({ f, dur: 0.14, type: 'triangle', vol: 0.09, at: ac.currentTime + i * 0.06 }));
  },
  warning() {
    const ac = Sound.ac; if (!ac) return;
    for (let i = 0; i < 3; i++) Sound.tone({ f: 440, f2: 700, dur: 0.5, type: 'sawtooth', vol: 0.05, at: ac.currentTime + i * 0.7, attack: 0.05 });
  },
  charge() { Sound.tone({ f: 180, f2: 1100, dur: 1.05, type: 'sawtooth', vol: 0.035, attack: 0.1 }); },
  laser() {
    Sound.noise({ dur: 1.7, vol: 0.09, type: 'bandpass', freq: 500, q: 0.8 });
    Sound.tone({ f: 80, f2: 70, dur: 1.7, type: 'sawtooth', vol: 0.06, attack: 0.03 });
  },
  phase() {
    const ac = Sound.ac; if (!ac) return;
    [220, 330, 440].forEach((f, i) => Sound.tone({ f, f2: f * 0.5, dur: 0.4, type: 'square', vol: 0.04, at: ac.currentTime + i * 0.09 }));
  },
  bomb() {
    Sound.noise({ dur: 1.4, vol: 0.35, type: 'lowpass', freq: 4000, freq2: 80 });
    Sound.tone({ f: 70, f2: 28, dur: 1.2, type: 'sine', vol: 0.45 });
    Sound.tone({ f: 300, f2: 1800, dur: 0.35, type: 'sawtooth', vol: 0.05, attack: 0.02 });
  },
  // Continuous hum while the laser is firing. Idempotent: call every frame with the desired state.
  beamOn: false, beamNodes: null,
  beam(on) {
    const ac = Sound.ac;
    if (!ac || on === this.beamOn) return;
    this.beamOn = on;
    const t = ac.currentTime;
    if (on) {
      const o = ac.createOscillator(), o2 = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain();
      o.type = 'sawtooth'; o.frequency.value = 110;
      o2.type = 'square'; o2.frequency.value = 221.3;
      f.type = 'bandpass'; f.frequency.value = 1100; f.Q.value = 1.5;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.03, t + 0.06);
      o.connect(f); o2.connect(f); f.connect(g); g.connect(Sound.sfx);
      o.start(t); o2.start(t);
      this.beamNodes = { o, o2, g };
    } else if (this.beamNodes) {
      const { o, o2, g } = this.beamNodes;
      g.gain.setTargetAtTime(0.0001, t, 0.03);
      o.stop(t + 0.25); o2.stop(t + 0.25);
      this.beamNodes = null;
    }
  },
  fanfare() {
    const ac = Sound.ac; if (!ac) return;
    [523, 659, 784, 1047, 784, 1047].forEach((f, i) =>
      Sound.tone({ f, dur: i === 5 ? 0.9 : 0.18, type: 'triangle', vol: 0.12, at: ac.currentTime + i * 0.14 }));
  },
};

const m2f = m => 440 * Math.pow(2, (m - 69) / 12);
const Music = {
  mode: 'off', step: 0, next: 0,
  PROG: {
    level: [[45, 3], [41, 4], [48, 4], [43, 4]], // Am F C G
    boss: [[40, 3], [40, 3], [36, 4], [38, 4]],  // Em Em C D
  },
  set(mode) {
    if (this.mode === mode) return;
    this.mode = mode; this.step = 0;
    if (Sound.ac) this.next = Sound.ac.currentTime + 0.08;
  },
  update() {
    const ac = Sound.ac;
    if (!ac || this.mode === 'off' || ac.state !== 'running') return;
    const bpm = this.mode === 'boss' ? 144 : 122;
    const spb = 60 / bpm / 4;
    if (this.next < ac.currentTime) this.next = ac.currentTime + 0.03;
    while (this.next < ac.currentTime + 0.15) {
      this.play(this.step, this.next, spb);
      this.step = (this.step + 1) % 64;
      this.next += spb;
    }
  },
  play(s, t, spb) {
    const boss = this.mode === 'boss';
    const [root, third] = this.PROG[boss ? 'boss' : 'level'][s >> 4];
    const st = s & 15, bus = Sound.music;
    if (st % 4 === 0) Sound.tone({ f: 150, f2: 42, dur: 0.22, type: 'sine', vol: 0.5, at: t, bus });
    if (st === 4 || st === 12) Sound.noise({ dur: 0.14, vol: 0.14, type: 'bandpass', freq: 1900, q: 0.7, at: t, bus });
    if (boss || st % 2 === 1) Sound.noise({ dur: 0.03, vol: 0.05, type: 'highpass', freq: 8000, at: t, bus });
    if (st % 2 === 0) {
      const n = root + (st % 8 === 6 ? 12 : 0);
      Sound.tone({ f: m2f(n), dur: spb * 1.8, type: 'sawtooth', vol: 0.16, at: t, bus: Sound.bassBus });
    }
    const arp = boss ? [0, 7, 12, third + 12] : [0, third, 7, 12];
    const shift = (s >> 2) % 4 === 3 ? 12 : 0;
    Sound.tone({ f: m2f(root + 24 + arp[st % 4] + shift), dur: spb * 0.9, type: 'triangle', vol: 0.035, at: t, bus });
  },
};
