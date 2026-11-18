// People in the grandstands. They bounce in the vertex shader (no per-frame
// matrix uploads), and are split into chunks so the ones off screen get culled.
import * as THREE from 'three';

const SHIRTS = ['#ff5a4f', '#2f8cff', '#ffd21f', '#27c9a0', '#ff7a1a', '#8b44e0', '#ffffff', '#ff3d7f', '#39c24f'];
const SKINS = ['#f2c9a0', '#d9a273', '#a86d44', '#7a4a2b', '#f7d9bb'];
const CHUNK = 1200;

// spots: flat [x, y, z, ...] seat positions, in order along the stands so each
// chunk is one stretch of seats. Returns { update(dt, excite) }.
export function buildCrowd(scene, spots, rnd) {
  // uClock runs faster when the crowd is excited (kept on the CPU so a change
  // of pace never makes anyone jump mid-bounce)
  const uniforms = { uClock: { value: 0 }, uExcite: { value: 0.2 } };
  const bounce = (mat) => {
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uClock = uniforms.uClock;
      sh.uniforms.uExcite = uniforms.uExcite;
      sh.vertexShader = 'attribute float aPhase;\nattribute float aAmp;\nuniform float uClock;\nuniform float uExcite;\n' +
        sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
          transformed.y += abs(sin(uClock * (0.7 + aAmp * 0.3) + aPhase)) * (0.1 + uExcite * 0.42) * aAmp;`);
    };
    mat.customProgramCacheKey = () => 'crowd';
    return mat;
  };
  const bodyMat = bounce(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 }));
  const headMat = bounce(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 }));
  const bodyGeo = new THREE.CapsuleGeometry(0.24, 0.42, 2, 7).translate(0, 0.45, 0);
  const headGeo = new THREE.IcosahedronGeometry(0.19, 1).translate(0, 1.05, 0);
  const count = spots.length / 3;
  const c = new THREE.Color(), m = new THREE.Matrix4();
  for (let i0 = 0; i0 < count; i0 += CHUNK) {
    const n = Math.min(CHUNK, count - i0);
    const phase = new Float32Array(n), amp = new Float32Array(n);
    const aPhase = new THREE.InstancedBufferAttribute(phase, 1), aAmp = new THREE.InstancedBufferAttribute(amp, 1);
    const bg = bodyGeo.clone(), hg = headGeo.clone();
    for (const g of [bg, hg]) { g.setAttribute('aPhase', aPhase); g.setAttribute('aAmp', aAmp); }
    const bodies = new THREE.InstancedMesh(bg, bodyMat, n);
    const heads = new THREE.InstancedMesh(hg, headMat, n);
    for (let k = 0; k < n; k++) {
      const i = (i0 + k) * 3;
      m.makeTranslation(spots[i], spots[i + 1], spots[i + 2]);
      bodies.setMatrixAt(k, m);
      heads.setMatrixAt(k, m);
      bodies.setColorAt(k, c.set(SHIRTS[Math.floor(rnd() * SHIRTS.length)]));
      heads.setColorAt(k, c.set(SKINS[Math.floor(rnd() * SKINS.length)]));
      phase[k] = rnd() * Math.PI * 2;
      amp[k] = 0.5 + rnd();
    }
    for (const mesh of [bodies, heads]) {
      mesh.computeBoundingSphere();
      mesh.boundingSphere.radius += 2; // room for the bounce
    }
    scene.add(bodies, heads);
  }
  bodyGeo.dispose();
  headGeo.dispose();
  return {
    count,
    update(dt, excite) {
      const e = (uniforms.uExcite.value += (excite - uniforms.uExcite.value) * Math.min(1, dt * 2));
      uniforms.uClock.value += dt * (5 + e * 7);
    },
  };
}
