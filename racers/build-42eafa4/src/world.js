import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ROAD_HALF, sandTexture, checkerTexture } from './track.js';
import { mulberry32, makeNoise2D, fbm, smoothstep, lerp, makeCanvas, TAU } from './util.js';

const Y = new THREE.Vector3(0, 1, 0);
const FONT = '"Arial Rounded MT Bold", "Avenir Next", "Helvetica Neue", Arial, sans-serif';

export function buildWorld(scene, renderer, track) {
  const rnd = mulberry32(20261110);
  const noise = makeNoise2D(77);
  const centre = { x: 170, z: 70 };
  const F = track.constructor.frame();
  const world = { updaters: [] };

  // ------------------------------------------------------------ sky and light
  const el = THREE.MathUtils.degToRad(24);
  const az = THREE.MathUtils.degToRad(64);
  const sunDir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
  world.sunDir = sunDir;

  const makeSky = () => {
    const sky = new Sky();
    sky.scale.setScalar(9000);
    const u = sky.material.uniforms;
    u.turbidity.value = 4.2;
    u.rayleigh.value = 1.9;
    u.mieCoefficient.value = 0.004;
    u.mieDirectionalG.value = 0.84;
    u.sunPosition.value.copy(sunDir);
    return sky;
  };
  scene.add(makeSky());
  // Reflections come from a simple painted sky rather than the physical one:
  // the real sun is thousands of times brighter than the sky and would turn
  // every glossy car into a white blob.
  {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    const geo = new THREE.SphereGeometry(50, 48, 24);
    const p = geo.attributes.position;
    const col = new Float32Array(p.count * 3);
    const zenith = new THREE.Color(0.22, 0.42, 0.95), horizon = new THREE.Color(1.5, 1.05, 0.72), ground = new THREE.Color(0.5, 0.33, 0.2);
    const c = new THREE.Color(), d = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      d.fromBufferAttribute(p, i).normalize();
      if (d.y >= 0) c.copy(horizon).lerp(zenith, Math.pow(d.y, 0.55));
      else c.copy(horizon).lerp(ground, smoothstep(0, 0.12, -d.y));
      // warm glow around the sun
      const glow = Math.pow(Math.max(0, d.dot(sunDir)), 6);
      c.r += glow * 1.6; c.g += glow * 1.1; c.b += glow * 0.6;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    envScene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
    const sunBall = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(26, 20, 13) }));
    sunBall.position.copy(sunDir).multiplyScalar(45);
    envScene.add(sunBall);
    scene.environment = pmrem.fromScene(envScene, 0, 0.1, 100).texture;
    scene.environmentIntensity = 0.55;
    pmrem.dispose();
  }

  scene.fog = new THREE.Fog(0xf0c8a0, 260, 2600);

  const sun = new THREE.DirectionalLight(0xffdcae, 3.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -60; sc.right = 60; sc.top = 60; sc.bottom = -60; sc.near = 20; sc.far = 420;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.06;
  sun.shadow.radius = 3;
  scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight(0xcfe2ff, 0xc28a5c, 0.75));
  world.sun = sun;

  // ------------------------------------------------------------ ground maths
  const n = track.n;
  const coarseStep = 4;
  const near = { d: 0, y: 0, i: 0 };
  function nearest(x, z) {
    let best = 1e12, bi = 0;
    for (let i = 0; i < n; i += coarseStep) {
      const p = track.pts[i];
      const dx = p.x - x, dz = p.z - z;
      const d = dx * dx + dz * dz;
      if (d < best) { best = d; bi = i; }
    }
    let fb = best, fi = bi;
    for (let k = -coarseStep; k <= coarseStep; k++) {
      const i = (bi + k + n) % n;
      const p = track.pts[i];
      const dx = p.x - x, dz = p.z - z;
      const d = dx * dx + dz * dz;
      if (d < fb) { fb = d; fi = i; }
    }
    near.d = Math.sqrt(fb);
    near.y = track.pts[fi].y;
    near.i = fi;
    return near;
  }
  const natural = (x, z) => {
    const r = Math.hypot(x - centre.x, z - centre.z);
    return (
      fbm(noise, x * 0.0035, z * 0.0035, 4) * 16 +
      fbm(noise, x * 0.021 + 40, z * 0.021, 2) * 1.3 +
      smoothstep(560, 1250, r) * 120 - 3
    );
  };
  const BANK_END = ROAD_HALF + 9;
  const terrainY = (x, z) => {
    const q = nearest(x, z);
    return lerp(q.y - 1.5, natural(x, z), smoothstep(BANK_END, 130, q.d));
  };
  // Height of whatever you would stand on at (x, z): shoulder, bank or terrain.
  const surfaceY = (x, z) => {
    const q = nearest(x, z);
    const d = q.d, y = q.y;
    if (d <= ROAD_HALF + 5.5) return y - 0.04;
    const bank = y - 0.04 - (1.76 * (d - ROAD_HALF - 5.5)) / 7;
    const ter = lerp(y - 1.5, natural(x, z), smoothstep(BANK_END, 130, d));
    return d <= ROAD_HALF + 12.5 ? Math.max(bank, ter) : ter;
  };
  world.surfaceY = surfaceY;

  // ------------------------------------------------------------ terrain
  {
    const SIZE = 3000, SEG = 250;
    const g = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    g.rotateX(-Math.PI / 2);
    g.translate(centre.x, 0, centre.z);
    const p = g.attributes.position;
    const col = new Float32Array(p.count * 3);
    const cA = new THREE.Color('#e3b077'), cB = new THREE.Color('#c98a52'), cC = new THREE.Color('#b56a3c');
    const c = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const y = terrainY(x, z);
      p.setY(i, y);
      const k = fbm(noise, x * 0.006 + 9, z * 0.006 - 4, 3) * 0.5 + 0.5;
      c.copy(cA).lerp(cB, k).lerp(cC, smoothstep(18, 90, y));
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.computeVertexNormals();
    const tex = sandTexture();
    tex.repeat.set(380, 380);
    tex.anisotropy = 4;
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, vertexColors: true, roughness: 1 }));
    m.receiveShadow = true;
    scene.add(m);
  }

  // ------------------------------------------------------------ mesas
  {
    const palette = ['#c9673b', '#dc8c50', '#b8552f', '#e3a465', '#cf7443'].map((h) => new THREE.Color(h));
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true });
    const variants = [];
    for (let v = 0; v < 5; v++) {
      const g = new THREE.CylinderGeometry(0.7, 1, 1, 18, 8);
      const p = g.attributes.position;
      const col = new Float32Array(p.count * 3);
      const seed = v * 13.7;
      for (let i = 0; i < p.count; i++) {
        let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const r = Math.hypot(x, z);
        const ang = Math.atan2(z, x);
        if (r > 0.01) {
          const ledge = 1 + 0.07 * Math.sin(y * 19 + seed);
          const k = (1 + 0.24 * noise(Math.cos(ang) * 1.6 + seed, Math.sin(ang) * 1.6 + y * 1.2) + 0.07 * noise(ang * 5 + seed, y * 9)) * ledge;
          x *= k; z *= k;
          p.setX(i, x); p.setZ(i, z);
        }
        const band = Math.floor((y + 0.5) * 9 + noise(ang * 2 + seed, y * 3) * 0.9);
        const c = palette[((band % palette.length) + palette.length) % palette.length];
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.translate(0, 0.5, 0);
      g.computeVertexNormals();
      variants.push(g);
    }
    let placed = 0, tries = 0;
    const spots = [[150, 60, 34, 46], [205, 140, 22, 30]];
    while (placed < 34 && tries++ < 600) {
      const a = rnd() * TAU, r = 300 + rnd() * 900;
      const R = 30 + rnd() * 75, H = 45 + rnd() * 110;
      const x = centre.x + Math.cos(a) * r, z = centre.z + Math.sin(a) * r;
      if (nearest(x, z).d < R + 80) continue;
      spots.push([x, z, R, H]);
      placed++;
    }
    for (const [x, z, R, H] of spots) {
      const m = new THREE.Mesh(variants[Math.floor(rnd() * variants.length)], mat);
      m.position.set(x, terrainY(x, z) - 3, z);
      m.scale.set(R, H, R * (0.8 + rnd() * 0.4));
      m.rotation.y = rnd() * TAU;
      scene.add(m);
    }
  }

  // ------------------------------------------------------------ scatter helpers
  const dummy = new THREE.Object3D();
  function scatter(geo, mat, count, place, { shadow = false, colors = null } = {}) {
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const c = new THREE.Color();
    let k = 0;
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      if (place(dummy, i) === false) continue;
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
      if (colors) mesh.setColorAt(k, c.set(colors[Math.floor(rnd() * colors.length)]));
      k++;
    }
    mesh.count = k;
    mesh.castShadow = shadow;
    mesh.receiveShadow = false;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.frustumCulled = false;
    scene.add(mesh);
    return mesh;
  }
  // Random spot beside the track, between dMin and dMax metres from the centre line.
  function beside(obj, dMin, dMax, sink = 0.15) {
    const s = rnd() * track.length;
    const side = rnd() < 0.5 ? -1 : 1;
    const d = dMin + Math.pow(rnd(), 1.6) * (dMax - dMin);
    track.sample(s, F);
    const x = F.pos.x + F.side.x * side * d, z = F.pos.z + F.side.z * side * d;
    if (nearest(x, z).d < dMin - 0.5) return false; // would land on another piece of track
    obj.position.set(x, surfaceY(x, z) - sink, z);
    obj.rotation.y = rnd() * TAU;
    return true;
  }

  // cacti
  {
    const cap = (r, len) => new THREE.CapsuleGeometry(r, len, 4, 10);
    const trunk = cap(0.34, 2.8).translate(0, 1.7, 0);
    const a1 = cap(0.22, 0.6).rotateZ(Math.PI / 2).translate(0.6, 1.5, 0);
    const a2 = cap(0.22, 0.9).translate(1.0, 2.05, 0);
    const b1 = cap(0.2, 0.5).rotateZ(Math.PI / 2).translate(-0.55, 2.1, 0);
    const b2 = cap(0.2, 0.7).translate(-0.9, 2.55, 0);
    const geo = mergeGeometries([trunk, a1, a2, b1, b2]);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.75 });
    scatter(geo, mat, 240, (o) => {
      if (!beside(o, ROAD_HALF + 7, ROAD_HALF + 85)) return false;
      const k = 0.7 + rnd() * 0.9;
      o.scale.set(k, k * (0.85 + rnd() * 0.4), k);
    }, { shadow: true, colors: ['#3f9a55', '#4aa862', '#358a4a', '#5ab06a'] });
  }
  // rocks
  {
    const geo = new THREE.DodecahedronGeometry(1, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
    scatter(geo, mat, 320, (o) => {
      if (!beside(o, ROAD_HALF + 6.5, ROAD_HALF + 150, 0.3)) return false;
      const k = 0.4 + Math.pow(rnd(), 3) * 3.2;
      o.scale.set(k * (0.8 + rnd() * 0.6), k * (0.5 + rnd() * 0.5), k * (0.8 + rnd() * 0.6));
      o.rotation.set(rnd() * 0.4, rnd() * TAU, rnd() * 0.4);
    }, { shadow: true, colors: ['#b8683f', '#c57a4c', '#a55a36', '#d08a58'] });
  }
  // dry bushes
  {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
    scatter(geo, mat, 300, (o) => {
      if (!beside(o, ROAD_HALF + 6, ROAD_HALF + 110, 0.1)) return false;
      const k = 0.35 + rnd() * 0.8;
      o.scale.set(k * 1.3, k * 0.8, k * 1.3);
    }, { colors: ['#9aa24a', '#b7a94e', '#7f9443', '#c2b25e'] });
  }
  // marker posts: a steady rhythm past the window makes speed readable
  {
    const geo = new THREE.BoxGeometry(0.16, 0.9, 0.16).translate(0, 0.45, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const count = Math.floor(track.length / 22) * 2;
    scatter(geo, mat, count, (o, i) => {
      const s = Math.floor(i / 2) * 22 + 11;
      const side = i % 2 ? -1 : 1;
      track.sample(s, F);
      o.position.copy(F.pos).addScaledVector(F.side, side * (ROAD_HALF + 2.2));
      o.rotation.y = Math.atan2(F.tan.x, F.tan.z);
    }, { colors: ['#ffffff', '#ffd23c'] });
  }
  // tyre barriers on the outside of the corners
  {
    const geo = new THREE.CylinderGeometry(0.48, 0.48, 1.1, 12).translate(0, 0.5, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const spots = [];
    for (let s = 0; s < track.length; s += 1.05) {
      const c = track.curvatureAt(s);
      if (Math.abs(c) > 0.0058) spots.push([s, c > 0 ? -1 : 1]);
    }
    const mesh = scatter(geo, mat, spots.length, (o, i) => {
      const [s, side] = spots[i];
      track.sample(s, F);
      o.position.copy(F.pos).addScaledVector(F.side, side * (ROAD_HALF + 3.4));
      o.position.y -= 0.05;
    });
    const c = new THREE.Color();
    for (let i = 0; i < mesh.count; i++) mesh.setColorAt(i, c.set(Math.floor(i / 3) % 2 ? '#f4f1ea' : '#e2362b'));
    mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
  }

  // ------------------------------------------------------------ grandstands
  const crowd = { base: [], phase: [], amp: [] };
  {
    const concrete = new THREE.MeshStandardMaterial({ color: 0xd9d2c6, roughness: 0.9 });
    const roofs = ['#e2362b', '#2f7fe6', '#f5b81f'].map((h) => new THREE.MeshStandardMaterial({ color: h, roughness: 0.55 }));
    const steel = new THREE.MeshStandardMaterial({ color: 0x51565f, roughness: 0.5, metalness: 0.6 });
    const TIERS = 6, WIDTH = 24, RISE = 0.62, RUN = 1.35;
    let idx = 0;
    const local = new THREE.Vector3();
    for (const s of [-34, -6, 34, 62]) {
      for (const sideSign of [1, -1]) {
        track.sample(s, F);
        const zAxis = F.side.clone().multiplyScalar(-sideSign); // faces the road
        const xAxis = new THREE.Vector3().crossVectors(Y, zAxis).normalize();
        const origin = F.pos.clone().addScaledVector(F.side, sideSign * (ROAD_HALF + 12.5));
        origin.y -= 1.9;
        const g = new THREE.Group();
        g.matrix.makeBasis(xAxis, Y, zAxis).setPosition(origin);
        g.matrix.decompose(g.position, g.quaternion, g.scale);
        const base = 2.2; // plinth height: seats start above the bank
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, base, TIERS * RUN + 0.6), concrete);
        plinth.position.set(0, base / 2, -(TIERS * RUN) / 2 + 0.3);
        g.add(plinth);
        for (let t = 0; t < TIERS; t++) {
          const step = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, RISE * (t + 1), RUN), concrete);
          step.position.set(0, base + (RISE * (t + 1)) / 2, -t * RUN);
          step.castShadow = true;
          step.receiveShadow = true;
          g.add(step);
        }
        const roof = new THREE.Mesh(new THREE.BoxGeometry(WIDTH + 1.5, 0.3, TIERS * RUN + 3.5), roofs[idx++ % roofs.length]);
        roof.position.set(0, base + TIERS * RISE + 4.2, -(TIERS * RUN) / 2 + 0.6);
        roof.rotation.x = -0.1;
        roof.castShadow = true;
        g.add(roof);
        for (const px of [-WIDTH / 2 + 0.4, 0, WIDTH / 2 - 0.4]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, TIERS * RISE + 4.6), steel);
          post.position.set(px, base + (TIERS * RISE + 4.6) / 2, -TIERS * RUN + 0.5);
          g.add(post);
        }
        scene.add(g);
        g.updateMatrixWorld(true);
        for (let t = 0; t < TIERS; t++) {
          for (let x = -WIDTH / 2 + 0.7; x < WIDTH / 2 - 0.5; x += 0.82) {
            if (rnd() < 0.08) continue;
            local.set(x + (rnd() - 0.5) * 0.2, base + RISE * (t + 1), -t * RUN + 0.1).applyMatrix4(g.matrixWorld);
            crowd.base.push(local.x, local.y, local.z);
            crowd.phase.push(rnd() * TAU);
            crowd.amp.push(0.5 + rnd());
          }
        }
      }
    }
    const count = crowd.phase.length;
    const bodyGeo = new THREE.CapsuleGeometry(0.24, 0.42, 3, 8).translate(0, 0.45, 0);
    const headGeo = new THREE.SphereGeometry(0.19, 10, 8).translate(0, 1.05, 0);
    const mat = () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 });
    const bodies = new THREE.InstancedMesh(bodyGeo, mat(), count);
    const heads = new THREE.InstancedMesh(headGeo, mat(), count);
    const shirts = ['#ff5a4f', '#2f8cff', '#ffd21f', '#27c9a0', '#ff7a1a', '#8b44e0', '#ffffff', '#ff3d7f', '#39c24f'];
    const skins = ['#f2c9a0', '#d9a273', '#a86d44', '#7a4a2b', '#f7d9bb'];
    const c = new THREE.Color();
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      m.makeTranslation(crowd.base[i * 3], crowd.base[i * 3 + 1], crowd.base[i * 3 + 2]);
      bodies.setMatrixAt(i, m);
      heads.setMatrixAt(i, m);
      bodies.setColorAt(i, c.set(shirts[Math.floor(rnd() * shirts.length)]));
      heads.setColorAt(i, c.set(skins[Math.floor(rnd() * skins.length)]));
    }
    bodies.frustumCulled = heads.frustumCulled = false;
    scene.add(bodies, heads);
    crowd.bodies = bodies;
    crowd.heads = heads;
    crowd.count = count;
    track.sample(14, F);
    world.standPos = F.pos.clone();
  }

  // ------------------------------------------------------------ start gantry
  {
    track.sample(13, F);
    const zAxis = F.tan.clone().multiplyScalar(-1); // faces the waiting cars
    const xAxis = new THREE.Vector3().crossVectors(Y, zAxis).normalize();
    const g = new THREE.Group();
    g.matrix.makeBasis(xAxis, Y, zAxis).setPosition(F.pos);
    g.matrix.decompose(g.position, g.quaternion, g.scale);
    const steel = new THREE.MeshStandardMaterial({ color: 0x2b2e36, roughness: 0.45, metalness: 0.7 });
    const half = ROAD_HALF + 2.6;
    for (const sx of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 10.4, 16), steel);
      post.position.set(sx * half, 5.2, 0);
      post.castShadow = true;
      g.add(post);
    }
    // banner
    const bw = half * 2 + 1.4, bh = 2.3;
    const c = makeCanvas(2048, 256), ctx = c.getContext('2d');
    ctx.fillStyle = '#15151c';
    ctx.fillRect(0, 0, 2048, 256);
    const s = 32;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        ctx.fillStyle = (x + y) % 2 ? '#ffffff' : '#15151c';
        ctx.fillRect(x * s, y * s, s, s);
        ctx.fillRect(2048 - (x + 1) * s, y * s, s, s);
      }
    }
    let bannerSize = 150;
    ctx.font = `900 ${bannerSize}px ${FONT}`;
    while (ctx.measureText('VROOM VALLEY GRAND PRIX').width > 1440) ctx.font = `900 ${(bannerSize -= 4)}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#e2362b';
    ctx.strokeText('VROOM VALLEY GRAND PRIX', 1024, 134);
    ctx.fillStyle = '#ffd21f';
    ctx.fillText('VROOM VALLEY GRAND PRIX', 1024, 134);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.25 });
    const beam = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.9), [steel, steel, steel, steel, face, face]);
    beam.position.set(0, 9.4, 0);
    beam.castShadow = true;
    g.add(beam);
    // start lights
    const lights = [];
    const housing = new THREE.Mesh(new THREE.BoxGeometry(9.4, 1.5, 0.6), steel);
    housing.position.set(0, 7.3, 0.2);
    g.add(housing);
    for (let i = 0; i < 5; i++) {
      const mat = new THREE.MeshStandardMaterial({ color: 0x1a1a1f, roughness: 0.3, emissive: 0x000000 });
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), mat);
      lens.scale.z = 0.45;
      lens.position.set((i - 2) * 1.75, 7.3, 0.52);
      g.add(lens);
      lights.push(mat);
    }
    scene.add(g);
    // 'off' | number of red lights lit (1..5) | 'green'
    world.setLights = (state) => {
      lights.forEach((m, i) => {
        if (state === 'green') { m.emissive.set(0x30ff5a); m.emissiveIntensity = 5; }
        else if (typeof state === 'number' && i < state) { m.emissive.set(0xff2a1a); m.emissiveIntensity = 5; }
        else { m.emissive.set(0x000000); m.emissiveIntensity = 0; }
      });
    };
  }

  // ------------------------------------------------------------ billboards
  {
    const ads = [
      ['VROOM COLA', 'Fizzy fuel for fast friends', '#e2362b', '#ffffff', '#ffd21f'],
      ['WHEELIE GOOD', 'T Y R E S', '#1d2a55', '#ffd21f', '#ffffff'],
      ['BEEP BEEP', 'B U R G E R S', '#ffb81f', '#7a1f12', '#ffffff'],
      ['ZOOM JUICE', 'Go go go!', '#27a36f', '#ffffff', '#fff27a'],
      ['HONK!', 'if you love racing', '#8b44e0', '#ffffff', '#ffd21f'],
      ['SUNNY OIL', 'Slippery since forever', '#2f8cff', '#ffffff', '#ffd21f'],
    ];
    const steel = new THREE.MeshStandardMaterial({ color: 0x4a4038, roughness: 0.8 });
    const spots = [250, 470, 700, 930, 1180, 1420];
    spots.forEach((s, i) => {
      const [big, small, bg, fg, accent] = ads[i % ads.length];
      const c = makeCanvas(1024, 448), ctx = c.getContext('2d');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1024, 448);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 22;
      ctx.strokeRect(22, 22, 980, 404);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = fg;
      let size = 190;
      ctx.font = `900 ${size}px ${FONT}`;
      while (ctx.measureText(big).width > 880) ctx.font = `900 ${(size -= 8)}px ${FONT}`;
      ctx.fillText(big, 512, 190);
      ctx.fillStyle = accent;
      ctx.font = `700 64px ${FONT}`;
      ctx.fillText(small, 512, 350);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 });
      const curv = track.curvatureAt(s);
      const side = curv > 0 ? -1 : 1; // outside of the bend
      track.sample(s, F);
      const pos = F.pos.clone().addScaledVector(F.side, side * (ROAD_HALF + 17));
      const zAxis = F.tan.clone().multiplyScalar(-1).addScaledVector(F.side, -side * 0.55).setY(0).normalize();
      const xAxis = new THREE.Vector3().crossVectors(Y, zAxis).normalize();
      const g = new THREE.Group();
      pos.y = surfaceY(pos.x, pos.z) - 0.5;
      g.matrix.makeBasis(xAxis, Y, zAxis).setPosition(pos);
      g.matrix.decompose(g.position, g.quaternion, g.scale);
      const panel = new THREE.Mesh(new THREE.BoxGeometry(14, 6.1, 0.4), [steel, steel, steel, steel, face, steel]);
      panel.position.y = 8.2;
      panel.castShadow = true;
      g.add(panel);
      for (const px of [-5, 5]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6, 0.5), steel);
        post.position.set(px, 3, -0.2);
        post.castShadow = true;
        g.add(post);
      }
      scene.add(g);
    });
  }

  // ------------------------------------------------------------ hot-air balloons
  const balloons = [];
  {
    const prof = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const y = -1.25 + t * 2.25;
      const r = t < 0.55 ? lerp(0.22, 1, Math.sin((t / 0.55) * Math.PI * 0.5)) : Math.cos(((t - 0.55) / 0.45) * Math.PI * 0.5);
      prof.push(new THREE.Vector2(Math.max(0.001, r), y));
    }
    const pairs = [['#e2362b', '#ffd21f'], ['#2f8cff', '#ffffff'], ['#8b44e0', '#ff9d2e'], ['#27c9a0', '#ffffff'], ['#ff3d7f', '#ffe14a']];
    const basketMat = new THREE.MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.9, fog: false });
    for (let b = 0; b < 7; b++) {
      const geo = new THREE.LatheGeometry(prof, 16).toNonIndexed();
      const p = geo.attributes.position;
      const col = new Float32Array(p.count * 3);
      const [ca, cb] = pairs[b % pairs.length].map((h) => new THREE.Color(h));
      for (let i = 0; i < p.count; i += 3) {
        const cx = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3;
        const cz = (p.getZ(i) + p.getZ(i + 1) + p.getZ(i + 2)) / 3;
        const gore = Math.floor(((Math.atan2(cz, cx) + Math.PI) / TAU) * 8 + 0.001);
        const c = gore % 2 ? ca : cb;
        for (let k = 0; k < 3; k++) { col[(i + k) * 3] = c.r; col[(i + k) * 3 + 1] = c.g; col[(i + k) * 3 + 2] = c.b; }
      }
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      geo.computeVertexNormals();
      const g = new THREE.Group();
      const env = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, fog: false }));
      env.scale.setScalar(14);
      g.add(env);
      const basket = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.8, 3.4), basketMat);
      basket.position.y = -22;
      g.add(basket);
      const a = rnd() * TAU, r = 190 + rnd() * 420;
      g.position.set(centre.x + Math.cos(a) * r, 75 + rnd() * 110, centre.z + Math.sin(a) * r);
      scene.add(g);
      balloons.push({ g, y: g.position.y, ph: rnd() * TAU });
    }
  }

  // ------------------------------------------------------------ clouds
  {
    const geo = new THREE.IcosahedronGeometry(1, 2);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, emissive: 0xffb48a, emissiveIntensity: 0.32, fog: false });
    const puffs = [];
    for (let cI = 0; cI < 22; cI++) {
      const a = rnd() * TAU, r = 900 + rnd() * 2200;
      const cx = centre.x + Math.cos(a) * r, cz = centre.z + Math.sin(a) * r, cy = 330 + rnd() * 320;
      const size = 60 + rnd() * 90;
      const nP = 5 + Math.floor(rnd() * 5);
      for (let k = 0; k < nP; k++) {
        puffs.push([cx + (rnd() - 0.5) * size * 3.4, cy + (rnd() - 0.3) * size * 0.5, cz + (rnd() - 0.5) * size * 1.6, size * (0.55 + rnd() * 0.7)]);
      }
    }
    scatter(geo, mat, puffs.length, (o, i) => {
      const [x, y, z, sz] = puffs[i];
      o.position.set(x, y, z);
      o.scale.set(sz * 1.25, sz * 0.62, sz);
    });
  }

  // ------------------------------------------------------------ per-frame
  let crowdClock = 0;
  world.update = (dt, t, focus, excite) => {
    sun.target.position.copy(focus);
    sun.position.copy(focus).addScaledVector(sunDir, 190);
    for (const b of balloons) {
      b.g.position.y = b.y + Math.sin(t * 0.25 + b.ph) * 5;
      b.g.rotation.y = t * 0.03 + b.ph;
    }
    crowdClock += dt;
    if (crowdClock > 1 / 30) {
      crowdClock = 0;
      const A = crowd.bodies.instanceMatrix.array, B = crowd.heads.instanceMatrix.array;
      const speed = 5 + excite * 7, height = 0.1 + excite * 0.42;
      for (let i = 0; i < crowd.count; i++) {
        const y = crowd.base[i * 3 + 1] + Math.abs(Math.sin(t * speed * (0.7 + crowd.amp[i] * 0.3) + crowd.phase[i])) * height * crowd.amp[i];
        A[i * 16 + 13] = y;
        B[i * 16 + 13] = y;
      }
      crowd.bodies.instanceMatrix.needsUpdate = true;
      crowd.heads.instanceMatrix.needsUpdate = true;
    }
  };

  return world;
}
