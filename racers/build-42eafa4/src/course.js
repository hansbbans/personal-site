// Things laid on the circuit: boost pads and the jump ramp. Pure data and
// maths (no rendering), shared by the race rules and the scenery.

export const LANE_W = 2.3;
export const ROAD_HALF = 7.3;
// Lane 0 is the leftmost lane. Positive lateral offset = left of the centre line.
export const laneOffset = (i) => (2.5 - i) * LANE_W;

// How far the player can steer from the centre line. Keeps all four wheels on
// the asphalt, inside the curbs.
export const LAT_MAX = ROAD_HALF - 1.25;

export const PAD_LEN = 6;
export const PAD_HALF_W = 1.05;

// [distance along the lap in metres, lane]. Lanes alternate sides so reaching
// them takes steering; the pair before the ramp makes a long jump longer.
const PADS = [
  [150, 1], [300, 4], [430, 0], [570, 5], [700, 2], [840, 4],
  [1000, 2], [1000, 3], [1180, 0], [1320, 5], [1480, 1], [1610, 4],
];
export const BOOST_PADS = PADS.map(([s, lane]) => ({ s, lat: laneOffset(lane) }));

// Covers the middle two lanes (lat within halfW of the centre line): steer
// onto it to jump, or drive round it. The car takes off at s + len.
// edge: how far past halfW the wedge itself reaches. A car counts as on the
// ramp while its centre is within halfW + catch (its inner wheels are on it).
export const RAMP = { s: 1040, len: 11, h: 1.5, lat: 0, halfW: LANE_W, edge: 0.15, catch: 0.65 };

export const COURSE = { pads: BOOST_PADS, ramp: RAMP, latMax: LAT_MAX };

// Height of the ramp surface above the road at lap distance s and lateral
// offset lat (omit lat to ask about the middle of the ramp).
export function rampHeight(ramp, s, lat = ramp ? ramp.lat ?? 0 : 0) {
  if (!ramp || s < ramp.s || s > ramp.s + ramp.len) return 0;
  if (ramp.halfW !== undefined && Math.abs(lat - (ramp.lat ?? 0)) > ramp.halfW + (ramp.catch ?? 0)) return 0;
  return (ramp.h * (s - ramp.s)) / ramp.len;
}
