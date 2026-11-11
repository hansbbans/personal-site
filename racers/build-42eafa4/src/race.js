// Pure race rules: no rendering, so it can be tested from Node.
import { clamp, smoothstep, mulberry32, shuffle, TAU } from './util.js';
import { laneOffset, rampHeight, LAT_MAX, PAD_LEN, PAD_HALF_W } from './course.js';

export const PLAYER_VMAX = 62; // m/s
export const LAUNCH_ACCEL = 16; // m/s^2 from a standstill; everyone gets the same
export const START_S = -4.3; // car centres sit just behind the start line (s = 0)
export const COAST_V = 20; // speed the car settles at with no pedal held
export const COAST_DECEL = 2.5; // gentle: letting go for a moment costs little

export const BOOST_V = 76; // m/s while a boost pad is pushing you
export const BOOST_TIME = 1.7; // seconds
const BOOST_ACCEL = 38;
const OVERSPEED_DECEL = 7; // how quickly the extra speed from a boost wears off
export const STEER_SPEED = 7; // m/s sideways at full lock
const STEER_RESPONSE = 9;
export const MAX_YAW = 0.2; // rad (~11 degrees): the nose never swings round further
export const GRAVITY = 24; // a little heavier than real, so jumps feel snappy
export const CAR_L = 4.3; // nose-to-tail spacing when two cars touch
export const CAR_W = 1.95; // side-to-side spacing when two cars touch
const DODGE_LOOK = 20; // a rival this close behind a slower player moves over...
const DODGE_LEAD = 1.6; // ...plus this many seconds of closing speed
const DODGE_SPEED = 4.5; // m/s sideways for a dodging rival

// Rival top speeds. The best are just above the player's, so holding "fast"
// with no boosts finishes about 3rd, one boost about 2nd, two boosts wins.
const RIVAL_SPEEDS = [57, 59, 60.5, 62, 63];

export const DEFAULT_TUNING = {
  rivalSpeeds: RIVAL_SPEEDS,
  aheadSlow: 0.35, // how much a rival far ahead eases off
  aheadNear: 40,
  aheadFar: 130,
  behindBoost: 0.05, // how much a rival far behind pushes
  behindNear: 30,
  behindFar: 150,
};

export class Race {
  // course: { pads: [{s, lat}], ramp: {s, len, h} | null, latMax }. Defaults to
  // a bare road so the core race rules can be tested on their own.
  constructor({ trackLength, laps = 2, playerIndex = 2, count = 6, seed = 1, tuning = {}, course = {} }) {
    this.tune = { ...DEFAULT_TUNING, ...tuning };
    this.course = { pads: [], ramp: null, latMax: LAT_MAX, ...course };
    this.events = []; // { type: 'boost' | 'jump' | 'land' | 'bump', car, ... } for sound and effects
    this.L = trackLength;
    this.laps = laps;
    this.total = laps * trackLength;
    this.time = 0;
    this.started = false;
    this.finishedCount = 0;
    this.rivalsDoneAt = -1;
    const rnd = mulberry32(seed);
    const speeds = shuffle(this.tune.rivalSpeeds.slice(), rnd);
    this.cars = [];
    let k = 0;
    for (let i = 0; i < count; i++) {
      const isPlayer = i === playerIndex;
      this.cars.push({
        index: i,
        isPlayer,
        s: START_S,
        v: 0,
        a: 0,
        vTop: isPlayer ? PLAYER_VMAX : speeds[k++ % speeds.length],
        delay: isPlayer ? 0 : rnd() * 0.12, // tiny stagger off the line, not a head start
        phase: rnd() * TAU,
        throttle: 0,
        braking: false,
        home: laneOffset(i), // the lane this car starts in
        lat: laneOffset(i), // metres left of the centre line
        latV: 0,
        yaw: 0, // nose angle relative to the road, from steering
        y: 0, // height above the road (ramp and jump)
        ground: 0, // height of the surface under the car (ramp)
        vy: 0,
        air: false,
        pitch: 0,
        boostT: 0,
        finished: false,
        finishTime: 0,
        place: 0,
      });
    }
    this.player = this.cars[playerIndex];
  }

  start() {
    this.started = true;
  }

  update(dt, input) {
    if (!this.started || dt <= 0) return;
    this.time += dt;
    const p = this.player;
    for (const c of this.cars) {
      const prevV = c.v;
      if (c.isPlayer && !c.finished) {
        if (input.down) {
          c.v = Math.max(0, c.v - 34 * dt);
          c.throttle = 0;
          c.boostT = 0;
        } else if (c.boostT > 0) {
          c.boostT -= dt;
          c.v = Math.min(Math.max(c.v, BOOST_V), c.v + BOOST_ACCEL * dt);
          c.throttle = 1;
        } else if (c.v > PLAYER_VMAX) {
          c.v = Math.max(PLAYER_VMAX, c.v - OVERSPEED_DECEL * dt);
          c.throttle = input.up ? 1 : 0.2;
        } else if (input.up) {
          c.v += LAUNCH_ACCEL * (1 - c.v / PLAYER_VMAX) * dt;
          c.throttle = 1;
        } else if (c.v > COAST_V) {
          c.v = Math.max(COAST_V, c.v - COAST_DECEL * dt);
          c.throttle = 0.2;
        } else {
          c.v = Math.min(COAST_V, c.v + 4 * dt);
          c.throttle = 0.3;
        }
        c.braking = !!input.down && prevV > 0.5;
        this._steer(c, dt, input);
      } else {
        let target;
        if (c.finished) {
          target = c.isPlayer ? 24 : 30; // cool-down cruise after the flag
        } else if (this.time < c.delay) {
          target = 0;
        } else {
          let band = 1;
          if (!p.finished && this.time > 3) {
            const gap = c.s - p.s;
            // Rivals far ahead ease off; rivals far behind push harder.
            const k = this.tune;
            if (gap > 0) band -= k.aheadSlow * smoothstep(k.aheadNear, k.aheadFar, gap);
            else band += k.behindBoost * smoothstep(k.behindNear, k.behindFar, -gap);
          }
          target = c.vTop * band * (1 + 0.015 * Math.sin(this.time * 0.7 + c.phase));
          // Stuck behind a slower player with nowhere to go yet: ease off
          // instead of ramming, so nobody stops dead.
          const gap = p.s - c.s;
          if (!c.isPlayer && !p.finished && gap > 0 && Math.abs(p.lat - c.lat) < CAR_W + 0.1) {
            target = Math.min(target, p.v + Math.max(0, gap - CAR_L - 1) * 1.5);
          }
        }
        // Rivals pick up speed on the player's curve, scaled to their own top
        // speed, so nobody gets a jump at the start.
        const pull = LAUNCH_ACCEL * Math.max(0, 1 - c.v / c.vTop);
        const a = clamp((target - c.v) / 2.0, -14, pull);
        c.v = Math.max(0, c.v + a * dt);
        c.throttle = clamp(0.45 + a / 14, 0, 1);
        c.braking = a < -5;
        if (c.isPlayer) this._steer(c, dt, {}); // after the flag: drift straight
        else this._dodge(c, dt);
      }
      c.a = (c.v - prevV) / dt;
      const prevS = c.s;
      c.s += c.v * dt;
      this._jump(c, dt);
      if (c.isPlayer && !c.finished) this._pads(c, prevS);
      if (!c.finished && c.s >= this.total) this._finish(c);
    }
    this._collide();
    // If every rival is home and the player is dawdling, don't make a small
    // child wait: call the race a few seconds later.
    if (!p.finished && this.finishedCount >= this.cars.length - 1) {
      if (this.rivalsDoneAt < 0) this.rivalsDoneAt = this.time;
      if (this.time - this.rivalsDoneAt > 5) this._finish(p);
    }
  }

  lapS(s) {
    return ((s % this.L) + this.L) % this.L;
  }

  // Left / right slide the player across the road. Sideways speed eases in and
  // out, fades as the car slows, and the road edge is a soft limit you can't pass.
  _steer(c, dt, input) {
    const steer = (input.left ? 1 : 0) - (input.right ? 1 : 0);
    const grip = clamp(c.v / 12, 0, 1);
    c.latV += (steer * STEER_SPEED * grip - c.latV) * Math.min(1, STEER_RESPONSE * dt);
    this._moveLat(c, dt);
  }

  _moveLat(c, dt) {
    const max = this.course.latMax;
    // Ease into the edge instead of hitting a wall.
    const room = max - Math.abs(c.lat);
    const outward = Math.sign(c.latV) === Math.sign(c.lat);
    if (outward) {
      const allowed = STEER_SPEED * clamp(room / 0.9, 0, 1);
      c.latV = Math.sign(c.latV) * Math.min(Math.abs(c.latV), allowed);
    }
    c.lat = clamp(c.lat + c.latV * dt, -max, max);
    c.yaw = clamp(Math.atan2(c.latV, Math.max(c.v, 8)), -MAX_YAW, MAX_YAW);
  }

  // Rivals keep their lane, but move over rather than ram a slower player
  // sitting in it, then drift home once the way is clear.
  _dodge(c, dt) {
    const p = this.player;
    const max = this.course.latMax;
    let target = c.home;
    const gap = p.s - c.s;
    const blocking = (lat) => Math.abs(p.lat - lat) < CAR_W + 0.3;
    // another rival already in (or moving through) that bit of road
    const taken = (lat) => this.cars.some((o) => o !== c && o !== p && !o.finished &&
      Math.abs(o.s - c.s) < CAR_L + 6 && Math.abs(o.lat - lat) < CAR_W + 0.05);
    const look = DODGE_LOOK + Math.max(0, c.v - p.v) * DODGE_LEAD;
    if (!c.finished && gap > -CAR_L && gap < look && p.v < c.v + 2 && blocking(c.lat)) {
      // pass on the nearer free side; if both are taken, stay put and ease off
      const sides = [p.lat + CAR_W + 0.4, p.lat - CAR_W - 0.4]
        .filter((l) => Math.abs(l) <= max && !taken(l))
        .sort((x, y) => Math.abs(x - c.lat) - Math.abs(y - c.lat));
      if (sides.length) target = sides[0];
      else target = c.lat;
    } else if (Math.abs(gap) < CAR_L + 3 && blocking(c.home) && !blocking(c.lat)) {
      target = c.lat; // alongside the player: wait before moving back
    }
    const step = DODGE_SPEED * dt;
    const prev = c.lat;
    c.lat += clamp(target - c.lat, -step, step);
    c.latV = (c.lat - prev) / dt;
    c.yaw = clamp(Math.atan2(c.latV, Math.max(c.v, 8)), -MAX_YAW, MAX_YAW) * 0.6;
  }

  // Up the ramp, off the lip, fly, land.
  _jump(c, dt) {
    const ramp = this.course.ramp;
    if (!ramp) return;
    const sl = this.lapS(c.s);
    const g = rampHeight(ramp, sl, c.lat);
    c.ground = g;
    const slope = ramp.h / ramp.len;
    const pastLip = sl >= ramp.s + ramp.len && sl < ramp.s + ramp.len + 30;
    if (c.air) {
      c.vy -= GRAVITY * dt;
      c.y += c.vy * dt;
      if (c.y <= g) {
        this.events.push({ type: 'land', car: c, impact: -c.vy });
        c.y = g;
        c.vy = 0;
        c.air = false;
      }
      c.pitch = clamp(Math.atan2(c.vy, Math.max(c.v, 6)) * 0.55, -0.22, 0.2);
    } else if (g > 0) {
      c.y = g;
      c.vy = c.v * slope;
      c.pitch = Math.atan(slope);
    } else if (c.y > 0.05 && pastLip) {
      c.air = true; // just went over the lip; vy carries over from the ramp
      this.events.push({ type: 'jump', car: c });
    } else if (c.y > 0.05 && sl > ramp.s) {
      c.air = true; // steered off the side of the ramp: drop down
      c.vy = Math.min(c.vy, 0);
    } else {
      // on flat road (or pushed back off the foot of the ramp)
      c.y = 0;
      c.pitch = 0;
      this._rampWall(c, sl);
    }
  }

  // Beside the ramp its sides are solid: you can't drive into the wedge
  // sideways, only up its front.
  _rampWall(c, sl) {
    const ramp = this.course.ramp;
    if (ramp.halfW === undefined || sl < ramp.s || sl > ramp.s + ramp.len) return;
    const rl = ramp.lat ?? 0;
    const wall = ramp.halfW + (ramp.edge ?? 0) + CAR_W / 2;
    const d = c.lat - rl;
    if (Math.abs(d) >= wall) return;
    const side = d >= 0 ? 1 : -1;
    c.lat = rl + side * wall;
    if (c.latV * side < 0) c.latV = 0;
    c.yaw = 0;
  }

  // Drive over a pad (pad centre crossed this step, wheels on it) to boost.
  _pads(c, prevS) {
    if (c.air) return;
    const a = this.lapS(prevS), b = this.lapS(c.s);
    for (const pad of this.course.pads) {
      const mid = pad.s + PAD_LEN / 2;
      const crossed = a <= b ? mid > a && mid <= b : mid > a || mid <= b;
      if (crossed && Math.abs(c.lat - pad.lat) < PAD_HALF_W + 0.7) {
        c.boostT = BOOST_TIME;
        this.events.push({ type: 'boost', car: c });
        return; // side-by-side pads count once
      }
    }
  }

  // The player can't drive through rivals: rear-end one and you're stuck
  // behind it until you steer round; touch one side-on and you slide off.
  _collide() {
    const p = this.player;
    if (p.finished) return;
    for (const r of this.cars) {
      if (r === p || r.finished) continue;
      const dS = r.s - p.s, dL = r.lat - p.lat;
      if (Math.abs(dS) >= CAR_L || Math.abs(dL) >= CAR_W) continue;
      if (Math.abs(r.y - p.y) > 1.1) continue; // one of them is flying over
      const penS = CAR_L - Math.abs(dS), penL = CAR_W - Math.abs(dL);
      if (penL < penS) {
        const lat = r.lat - (dL > 0 ? 1 : -1) * CAR_W;
        if (Math.abs(lat) <= this.course.latMax) {
          p.lat = lat;
          p.latV = 0;
          continue;
        }
      }
      if (dS > 0) {
        p.s = r.s - CAR_L;
        if (p.v > r.v) {
          if (p.v - r.v > 3) this.events.push({ type: 'bump', car: p, rival: r });
          p.v = r.v * 0.92;
          p.boostT = 0;
        }
      } else {
        r.s = p.s - CAR_L;
        r.v = Math.min(r.v, p.v);
      }
    }
  }

  _finish(c) {
    c.finished = true;
    c.finishTime = this.time;
    c.place = ++this.finishedCount;
  }

  placeOf(car) {
    if (car.finished) return car.place;
    let n = this.finishedCount + 1;
    for (const o of this.cars) {
      if (o !== car && !o.finished && o.s > car.s) n++;
    }
    return n;
  }

  lapOf(car) {
    return clamp(Math.floor(Math.max(0, car.s) / this.L) + 1, 1, this.laps);
  }
}
