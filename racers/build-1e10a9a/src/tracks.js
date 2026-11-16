// The four circuits: the shape of the road (control points), the scenery
// theme, and what's laid on it. Pure data, so the race rules and tests can use it.
//
// Points are x, height, z in metres. The first point is the start/finish line,
// in the middle of a straight that runs at least 120 m either way (grid,
// grandstands, gantry and the pit box all sit on it). The road is a smooth
// closed curve through the points.
import { COURSE, makeCourse, padsFrom, rampAt, mudAt, PIT_S } from './course.js';

const arc = (cx, cz, r, a0, a1, steps, y = () => 0) => {
  const out = [];
  for (let k = 1; k < steps; k++) {
    const a = a0 + ((a1 - a0) * k) / steps;
    out.push([cx + r * Math.cos(a), y(k / steps), cz + r * Math.sin(a)]);
  }
  return out;
};

// Half a heart, from the bottom of the right-hand side round to the dip at the top.
const HS = 0.9;
const HEART = [[95, -235], [300, 50], [335, 160], [300, 260], [215, 315], [115, 305], [70, 280]].map(([x, z]) => [x * HS, z * HS]);
function heartPoints() {
  const [ax, az] = HEART[0], [bx, bz] = HEART[1];
  const st = [ax + (bx - ax) * 0.36, az + (bz - az) * 0.36]; // start line a third of the way up
  const right = HEART.slice(1).map(([x, z], i) => [x, [1, 5, 9, 11, 8, 5][i], z]);
  const left = HEART.slice(1).reverse().map(([x, z], i) => [-x, [5, 8, 11, 9, 5, 1][i], z]);
  const pts = [
    [st[0], 0, st[1]], ...right, [0, 3, 240 * HS], ...left,
    [-ax, 0, az], [-50 * HS, 0, -297 * HS], [0, 0, -326 * HS], [50 * HS, 0, -297 * HS], [ax, 0, az],
  ];
  return pts.map(([x, y, z]) => [x - st[0], y, z - st[1]]);
}

// Scenery looks: ground colours, the big rocks (mesas or mountains), plants.
export const THEMES = {
  desert: {
    ground: ['#e3b077', '#c98a52', '#b56a3c'],
    shoulder: 0xe2b27a,
    mesa: ['#c9673b', '#dc8c50', '#b8552f', '#e3a465', '#cf7443'],
    plant: 'cactus', plantColors: ['#3f9a55', '#4aa862', '#358a4a', '#5ab06a'],
    rocks: ['#b8683f', '#c57a4c', '#a55a36', '#d08a58'],
    bushes: ['#9aa24a', '#b7a94e', '#7f9443', '#c2b25e'],
    fog: 0xf0c8a0, hemiGround: 0xc28a5c,
  },
  meadow: {
    ground: ['#8fc45a', '#6fae48', '#4f8f3c'],
    shoulder: 0xd8c08a,
    mesa: ['#5f9a46', '#78ad52', '#4f8a3e', '#8fbf62', '#6a9f4a'],
    plant: 'tree', plantColors: ['#3f9a45', '#56b04e', '#ff8fbf', '#2f8a3f', '#ffb3d1'],
    rocks: ['#9a9a92', '#a8a49a', '#8a8a84', '#b8b2a6'],
    bushes: ['#ff6fa8', '#ffd23c', '#ffffff', '#c86bff'],
    fog: 0xd9e6e6, hemiGround: 0x6f9a4a,
  },
  snow: {
    ground: ['#f4f7fb', '#dfe7f1', '#c9d5e4'],
    shoulder: 0xeef2f7,
    mesa: ['#f2f5fa', '#c8d3e2', '#e4eaf3', '#aebbd0', '#ffffff'],
    plant: 'pine', plantColors: ['#2f6b4a', '#3b7d55', '#285e40', '#477f5c'],
    rocks: ['#8e98a8', '#a3abb8', '#7c8696', '#b5bdc9'],
    bushes: ['#ffffff', '#e8eef6', '#cfe0d4'],
    fog: 0xe6ecf4, hemiGround: 0xb9c4d4,
  },
};

export const TRACKS = [
  {
    id: 'valley',
    name: 'Vroom Valley',
    theme: 'desert',
    points: [
      [0, 0, 0], [0, 0, 110], [0, 0.5, 220], [50, 3, 330], [170, 7, 395], [290, 5, 345], [345, 1, 220],
      [290, -2, 100], [335, 0, -30], [310, 5, -170], [190, 9, -250], [70, 6, -215], [5, 2, -130], [0, 0.3, -60],
    ],
    course: COURSE,
  },
  {
    id: 'oval',
    name: 'Snowball Oval',
    theme: 'snow',
    points: [
      [0, 0, 0], [0, 0, 77], [0, 0, 153], [0, 0, 230],
      ...arc(125, 230, 125, Math.PI, 0, 6, (k) => 2 * Math.sin(k * Math.PI)),
      [250, 1, 230], [250, 3, 158], [250, 6, 86], [250, 7, 15], [250, 6, -57], [250, 3, -129], [250, 1, -200],
      ...arc(125, -200, 125, 0, -Math.PI, 6, (k) => 2 * Math.sin(k * Math.PI)),
      [0, 0, -200], [0, 0, -133], [0, 0, -67],
    ],
    course: makeCourse({
      pads: padsFrom([
        [170, 1], [260, 4], [400, 0], [520, 5], [640, 2], [750, 2], [750, 3],
        [880, 4], [1050, 0], [1250, 5], [1350, 1], [1540, 4],
      ]),
      ramp: rampAt(790),
      walls: [{ s: 930 }],
      mud: [mudAt(300, 'left'), mudAt(1150, 'middle'), mudAt(1450, 'right')],
      pit: { s: PIT_S },
    }),
  },
  {
    id: 'heart',
    name: 'Sweetheart Meadow',
    theme: 'meadow',
    points: heartPoints(),
    course: makeCourse({
      pads: padsFrom([
        [170, 1], [300, 4], [420, 0], [560, 5], [700, 2], [820, 4],
        [1000, 0], [1100, 3], [1290, 2], [1290, 3], [1560, 1], [1720, 4],
      ]),
      ramp: rampAt(1330),
      walls: [{ s: 1470 }],
      mud: [mudAt(480, 'left'), mudAt(900, 'middle'), mudAt(1150, 'right')],
      pit: { s: PIT_S },
    }),
  },
  {
    id: 'snake',
    name: 'Wiggle Canyon',
    theme: 'desert',
    points: [
      [0, 0, 0], [0, 0, 120], [0, 1, 230], [30, 3, 320], [110, 5, 365], [200, 6, 345],
      [245, 8, 270], [310, 4, 160], [250, 10, 30], [190, 4, -90], [250, 9, -210], [300, 3, -300],
      [230, 1, -380], [120, 0, -380], [40, 0, -310], [0, 0, -200], [0, 0, -100],
    ],
    course: makeCourse({
      pads: padsFrom([
        [170, 1], [260, 4], [400, 0], [520, 5], [700, 4], [780, 2], [780, 3],
        [950, 0], [1200, 1], [1350, 4], [1600, 0], [1750, 5],
      ]),
      ramp: rampAt(820),
      walls: [{ s: 1090 }],
      mud: [mudAt(300, 'right'), mudAt(640, 'left'), mudAt(1500, 'middle')],
      pit: { s: PIT_S },
    }),
  },
];

export const trackById = (id) => TRACKS.find((t) => t.id === id) || TRACKS[0];
