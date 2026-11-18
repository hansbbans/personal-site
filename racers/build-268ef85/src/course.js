// Things laid on the circuit: boost pads, the jump ramp, the foam wall, mud
// pits and the pit box. Pure data and maths (no rendering), shared by the race
// rules and the scenery.

export const LANE_W = 2.3;
export const ROAD_HALF = 7.3;
// Lane 0 is the leftmost lane. Positive lateral offset = left of the centre line.
export const laneOffset = (i) => (2.5 - i) * LANE_W;

// How far the player can steer from the centre line. Keeps all four wheels on
// the asphalt, inside the curbs.
export const LAT_MAX = ROAD_HALF - 1.25;

export const PAD_LEN = 6;
export const PAD_HALF_W = 1.05;

// Covers the middle two lanes (lat within halfW of the centre line): steer
// onto it to jump, or drive round it. The car takes off at s + len.
// edge: how far past halfW the wedge itself reaches. A car counts as on the
// ramp while its centre is within halfW + catch (its inner wheels are on it).
const RAMP_SHAPE = { len: 11, h: 1.5, lat: 0, halfW: LANE_W, edge: 0.15, catch: 0.65 };
export const rampAt = (s) => ({ s, ...RAMP_SHAPE });

// The golden ring hangs over the flight path, `ahead` metres past the ramp's
// lip. y is its centre above the road, r its inner radius: a car flying off
// the ramp at anything from 32 m/s to a full boost goes through it, and a car
// that drove round the ramp passes underneath.
const RING_SHAPE = { ahead: 15, y: 4.2, r: 3.2 };
export const ringFor = (ramp) => ({ s: ramp.s + ramp.len + RING_SHAPE.ahead, lat: ramp.lat ?? 0, y: RING_SHAPE.y, r: RING_SHAPE.r });

// Mud pits are just for fun: splashes and a muddy car, no change in speed.
// Each covers three lanes on one side, or the middle four.
export const MUD_LEN = 24;
const MUD_SPAN = { left: [laneOffset(1), LANE_W * 1.5], middle: [0, LANE_W * 2], right: [laneOffset(4), LANE_W * 1.5] };
export const mudAt = (s, where) => ({ s, len: MUD_LEN, lat: MUD_SPAN[where][0], halfW: MUD_SPAN[where][1] });

// The foam-brick wall right across the road. Also just for fun: cars burst
// through it without slowing down.
export const WALL_T = 0.7; // thickness along the road

// The pit box sits beside the main straight, on the right. In the 3-lap race
// the player stops there on lap 2 for new wheels; the race waits for them.
export const PIT_S = 135;

// [distance along the lap in metres, lane] -> pad
export const padsFrom = (list) => list.map(([s, lane]) => ({ s, lat: laneOffset(lane) }));

export function makeCourse({ pads = [], ramp = null, walls = [], mud = [], pit = null } = {}) {
  return { pads, ramp, ring: ramp ? ringFor(ramp) : null, walls, mud, pit, latMax: LAT_MAX };
}

// Vroom Valley, the original desert circuit. Lanes alternate sides so reaching
// the pads takes steering; the pair before the ramp makes a long jump longer.
export const RAMP = rampAt(1040);
export const BOOST_PADS = padsFrom([
  [150, 1], [300, 4], [430, 0], [570, 5], [700, 2], [840, 4],
  [1000, 2], [1000, 3], [1180, 0], [1320, 5], [1480, 1], [1610, 4],
]);
export const COURSE = makeCourse({
  pads: BOOST_PADS,
  ramp: RAMP,
  walls: [{ s: 1250 }],
  mud: [mudAt(370, 'right'), mudAt(760, 'left'), mudAt(1395, 'middle')],
  pit: { s: PIT_S },
});

// Height of the ramp surface above the road at lap distance s and lateral
// offset lat (omit lat to ask about the middle of the ramp).
export function rampHeight(ramp, s, lat = ramp ? ramp.lat ?? 0 : 0) {
  if (!ramp || s < ramp.s || s > ramp.s + ramp.len) return 0;
  if (ramp.halfW !== undefined && Math.abs(lat - (ramp.lat ?? 0)) > ramp.halfW + (ramp.catch ?? 0)) return 0;
  return (ramp.h * (s - ramp.s)) / ramp.len;
}

// Is a car at lateral offset lat inside mud pit m (lap distance sl)?
export function inMud(m, sl, lat) {
  return sl >= m.s && sl <= m.s + m.len && Math.abs(lat - m.lat) < m.halfW - 0.2;
}
