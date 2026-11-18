import * as THREE from 'three';

// Soft round sprites for dust, tyre smoke and exhaust sparks.
export class Particles {
  constructor(max, additive = false) {
    this.max = max;
    this.next = 0;
    this.pos = new Float32Array(max * 3);
    this.vel = new Float32Array(max * 3);
    this.col = new Float32Array(max * 4);
    this.size = new Float32Array(max);
    this.life = new Float32Array(max);
    this.maxLife = new Float32Array(max);
    this.s0 = new Float32Array(max);
    this.s1 = new Float32Array(max);
    this.alpha = new Float32Array(max);
    this.lift = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aColor', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aSize', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.material = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 600 } },
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute vec4 aColor;
        varying vec4 vColor;
        uniform float uScale;
        void main() {
          vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = min(512.0, aSize * uScale / max(0.2, -mv.z));
        }`,
      fragmentShader: /* glsl */ `
        varying vec4 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = smoothstep(1.0, 0.15, d);
          gl_FragColor = vec4(vColor.rgb, vColor.a * a);
        }`,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.mesh = new THREE.Points(g, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
  }
  spawn(x, y, z, vx, vy, vz, life, s0, s1, r, g, b, a, lift = 0) {
    const i = this.next;
    this.next = (i + 1) % this.max;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.col[i * 4] = r; this.col[i * 4 + 1] = g; this.col[i * 4 + 2] = b; this.col[i * 4 + 3] = a;
    this.life[i] = this.maxLife[i] = life;
    this.s0[i] = s0; this.s1[i] = s1; this.alpha[i] = a; this.lift[i] = lift;
    this.size[i] = s0;
  }
  update(dt, pxPerUnit) {
    this.material.uniforms.uScale.value = pxPerUnit;
    const drag = Math.exp(-1.8 * dt);
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.size[i] = 0;
        this.col[i * 4 + 3] = 0;
        continue;
      }
      const k = 1 - this.life[i] / this.maxLife[i];
      this.vel[i * 3] *= drag; this.vel[i * 3 + 2] *= drag;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * drag + this.lift[i] * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.size[i] = this.s0[i] + (this.s1[i] - this.s0[i]) * k;
      this.col[i * 4 + 3] = this.alpha[i] * (1 - k) * Math.min(1, k * 8);
    }
    const a = this.mesh.geometry.attributes;
    a.position.needsUpdate = a.aColor.needsUpdate = a.aSize.needsUpdate = true;
  }
}

const COLORS = ['#ff3d5a', '#ffd21f', '#2f8cff', '#27c9a0', '#ff7a1a', '#b45cff', '#ffffff', '#ff5fb0'];

export class Confetti {
  constructor(max = 420) {
    this.max = max;
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 0.28), mat, max);
    this.mesh.frustumCulled = false;
    this.p = [];
    const c = new THREE.Color();
    const zero = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < max; i++) {
      this.p.push({ pos: new THREE.Vector3(), vel: new THREE.Vector3(), rot: new THREE.Euler(), spin: new THREE.Vector3(), life: 0, ph: Math.random() * 6.28 });
      this.mesh.setMatrixAt(i, zero);
      this.mesh.setColorAt(i, c.set(COLORS[i % COLORS.length]));
    }
    this.mesh.instanceColor.needsUpdate = true;
    this.next = 0;
    this.active = 0;
    this._o = new THREE.Object3D();
  }
  burst(centre, count = 140, spread = 5) {
    for (let k = 0; k < count; k++) {
      const q = this.p[this.next];
      this.next = (this.next + 1) % this.max;
      q.pos.set(centre.x + (Math.random() - 0.5) * spread * 2, centre.y + 3 + Math.random() * 4, centre.z + (Math.random() - 0.5) * spread * 2);
      q.vel.set((Math.random() - 0.5) * 6, 2 + Math.random() * 7, (Math.random() - 0.5) * 6);
      q.rot.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      q.spin.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
      q.life = 3.5 + Math.random() * 2.5;
    }
    this.active = this.max;
  }
  update(dt, t, drift) {
    if (!this.active) return;
    const o = this._o;
    let alive = 0;
    for (let i = 0; i < this.max; i++) {
      const q = this.p[i];
      if (q.life <= 0) continue;
      q.life -= dt;
      if (q.life <= 0) {
        o.scale.set(0, 0, 0);
        o.updateMatrix();
        this.mesh.setMatrixAt(i, o.matrix);
        continue;
      }
      alive++;
      q.vel.y = Math.max(-2.2, q.vel.y - 9 * dt);
      q.vel.x = q.vel.x * (1 - 1.5 * dt) + Math.sin(t * 3 + q.ph) * 2 * dt;
      q.vel.z = q.vel.z * (1 - 1.5 * dt) + Math.cos(t * 2.6 + q.ph) * 2 * dt;
      q.pos.addScaledVector(q.vel, dt);
      if (drift) q.pos.addScaledVector(drift, dt); // keep pace with the car it celebrates
      q.rot.x += q.spin.x * dt; q.rot.y += q.spin.y * dt; q.rot.z += q.spin.z * dt;
      o.position.copy(q.pos);
      o.rotation.copy(q.rot);
      const s = Math.min(1, q.life * 2);
      o.scale.set(s, s, s);
      o.updateMatrix();
      this.mesh.setMatrixAt(i, o.matrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    this.active = alive;
  }
}
