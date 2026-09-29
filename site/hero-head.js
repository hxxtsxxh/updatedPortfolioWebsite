// Holographic point-cloud head for the hero. It turns to look at the cursor.
// Mounted into #hero-head (rendered by the hero) and only loaded on wide screens.

const MEDIA = window.matchMedia("(min-width: 1100px)");
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function whenMounted(cb) {
  const el = document.getElementById("hero-head");
  if (el) return cb(el);
  const mo = new MutationObserver(() => {
    const found = document.getElementById("hero-head");
    if (found) {
      mo.disconnect();
      cb(found);
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

let started = false;
function start() {
  if (started || !MEDIA.matches) return;
  started = true;
  whenMounted(async (host) => {
    const THREE = await import("./vendor/three.module.min.js");
    init(THREE, host);
  });
}
MEDIA.addEventListener("change", start);
start();

// ---- Head shape -----------------------------------------------------------

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Gaussian falloff by angular distance between unit vector d and direction c.
function blob(d, cx, cy, cz, w) {
  const l = Math.hypot(cx, cy, cz);
  const dot = (d[0] * cx + d[1] * cy + d[2] * cz) / l;
  return Math.exp((-(1 - dot) * 2) / (w * w));
}

// Maps a unit direction to a point on the head surface (face points toward +z).
function headSurface(d) {
  const [x, y, z] = d;
  const front = Math.max(z, 0);
  const low = smooth(-0.05, -0.95, y);

  let px = x * 0.72;
  let py = y * 1.0;
  let pz = z * 0.86;

  // Jaw and chin: narrow the lower half, push the chin forward.
  const jaw = smooth(-0.2, -0.95, y);
  px *= 1 - 0.24 * jaw;
  pz *= 1 - 0.16 * jaw;
  pz += 0.08 * jaw * front * front;
  py += 0.06 * smooth(-0.7, -1, y);
  px *= 1 + 0.06 * smooth(0.1, 0.7, y);
  py -= 0.06 * low * front;
  const jawAngle = blob(d, -0.72, -0.55, 0.3, 0.3) + blob(d, 0.72, -0.55, 0.3, 0.3);
  px += 0.05 * Math.sign(x) * jawAngle;

  // Taller, rounder cranium at the back.
  pz -= 0.1 * blob(d, 0, 0.35, -1, 0.7);
  py += 0.04 * blob(d, 0, 1, -0.3, 0.6);

  // Flatten the face plane a little.
  pz -= 0.05 * Math.pow(front, 3);

  // Brow ridge.
  pz += 0.09 * Math.exp(-(((y - 0.22) / 0.08) ** 2)) * Math.exp(-((x / 0.42) ** 2)) * front ** 4;

  // Eye sockets.
  const eyes = blob(d, -0.31, 0.08, 0.95, 0.13) + blob(d, 0.31, 0.08, 0.95, 0.13);
  pz -= 0.1 * eyes;

  // Nose: bridge plus tip.
  const bridge = Math.exp(-((x / 0.09) ** 2)) * smooth(0.18, -0.02, y) * smooth(-0.26, -0.08, y) * front ** 6;
  pz += 0.16 * bridge;
  pz += 0.24 * blob(d, 0, -0.18, 1, 0.13);
  px += 0.03 * Math.sign(x) * blob(d, 0, -0.2, 1, 0.14);

  // Cheekbones.
  const cheeks = blob(d, -0.55, -0.02, 0.8, 0.22) + blob(d, 0.55, -0.02, 0.8, 0.22);
  px += 0.035 * Math.sign(x) * cheeks;

  // Lips, with a small groove between them.
  const mouth = Math.exp(-((x / 0.2) ** 2)) * front ** 6;
  pz += 0.05 * mouth * Math.exp(-(((y + 0.42) / 0.06) ** 2));
  pz += 0.045 * mouth * Math.exp(-(((y + 0.54) / 0.05) ** 2));
  pz -= 0.025 * mouth * Math.exp(-(((y + 0.48) / 0.015) ** 2));

  // Ears.
  const ear = blob(d, -1, 0.02, -0.1, 0.17) + blob(d, 1, 0.02, -0.1, 0.17);
  px += 0.1 * Math.sign(x) * ear;

  return [px, py, pz];
}

function fibonacciSphere(n) {
  const out = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out.push([Math.cos(g * i) * r, y, Math.sin(g * i) * r]);
  }
  return out;
}

function normalize(v) {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

// Surface normal by finite differences of headSurface.
function headNormal(d) {
  const t1 = normalize(Math.abs(d[1]) < 0.9 ? [d[2], 0, -d[0]] : [1, 0, 0]);
  const t2 = [
    d[1] * t1[2] - d[2] * t1[1],
    d[2] * t1[0] - d[0] * t1[2],
    d[0] * t1[1] - d[1] * t1[0],
  ];
  const e = 0.01;
  const p = headSurface(d);
  const a = headSurface(normalize([d[0] + t1[0] * e, d[1] + t1[1] * e, d[2] + t1[2] * e]));
  const b = headSurface(normalize([d[0] + t2[0] * e, d[1] + t2[1] * e, d[2] + t2[2] * e]));
  const u = [a[0] - p[0], a[1] - p[1], a[2] - p[2]];
  const v = [b[0] - p[0], b[1] - p[1], b[2] - p[2]];
  let n = normalize([u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]);
  if (n[0] * d[0] + n[1] * d[1] + n[2] * d[2] < 0) n = [-n[0], -n[1], -n[2]];
  return n;
}

// ---- Scene ----------------------------------------------------------------

function init(THREE, host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0.05, 6.2);

  const rig = new THREE.Group(); // bob + neck
  const head = new THREE.Group(); // rotates to follow the cursor
  scene.add(rig);
  rig.add(head);
  head.position.y = 0.35;

  const uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uScan: { value: 0 },
  };

  const pointMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: /* glsl */ `
      attribute vec3 aNormal;
      attribute float aKind;   // 0 skin, 1 eye, 2 neck
      attribute float aSeed;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform float uScan;
      varying float vLight;
      varying float vRim;
      varying float vScan;
      varying float vKind;
      varying float vTwinkle;
      varying float vFade;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * aNormal);
        vec3 v = normalize(-mv.xyz);
        vLight = 0.25 + 0.75 * max(dot(n, normalize(vec3(-0.35, 0.4, 0.85))), 0.0);
        vRim = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.5);
        vScan = exp(-pow((position.y - uScan) * 9.0, 2.0));
        vKind = aKind;
        vTwinkle = 0.8 + 0.2 * sin(uTime * 2.0 + aSeed * 40.0);
        vFade = aKind > 1.5 ? smoothstep(-1.35, -0.55, position.y) : 1.0;
        float size = aKind > 0.5 && aKind < 1.5 ? 2.4 : 1.8;
        gl_PointSize = size * uPixelRatio * (6.2 / -mv.z) * (1.0 + vScan * 0.5);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vLight;
      varying float vRim;
      varying float vScan;
      varying float vKind;
      varying float vTwinkle;
      varying float vFade;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float r = length(c);
        if (r > 0.5) discard;
        float soft = smoothstep(0.5, 0.15, r);
        vec3 emerald = vec3(0.2, 0.83, 0.6);
        vec3 col = vec3(0.93) * (0.2 + 0.9 * vLight);
        col = mix(col, emerald, clamp(vRim * 0.8 + vScan * 0.7, 0.0, 1.0));
        float a = (0.08 + 0.95 * vLight + 0.45 * vRim) * vTwinkle + vScan * 0.45;
        if (vKind > 0.5 && vKind < 1.5) { col = emerald * 1.2; a = 0.95; }
        gl_FragColor = vec4(col, a * soft * vFade);
      }
    `,
  });

  // Skin points.
  const dirs = fibonacciSphere(REDUCED ? 9000 : 15000);
  const pos = [];
  const nor = [];
  const kind = [];
  const seed = [];
  for (const d of dirs) {
    const p = headSurface(d);
    const n = headNormal(d);
    pos.push(p[0] * 1.004, p[1] * 1.004, p[2] * 1.004);
    nor.push(n[0], n[1], n[2]);
    kind.push(0);
    seed.push(Math.random());
  }
  const skin = new THREE.BufferGeometry();
  skin.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  skin.setAttribute("aNormal", new THREE.Float32BufferAttribute(nor, 3));
  skin.setAttribute("aKind", new THREE.Float32BufferAttribute(kind, 1));
  skin.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
  const skinPoints = new THREE.Points(skin, pointMaterial);
  skinPoints.renderOrder = 2;
  head.add(skinPoints);

  // Depth-only shell so points on the far side of the head are hidden.
  const shellGeo = new THREE.IcosahedronGeometry(1, 48);
  const sp = shellGeo.attributes.position;
  for (let i = 0; i < sp.count; i++) {
    const p = headSurface(normalize([sp.getX(i), sp.getY(i), sp.getZ(i)]));
    sp.setXYZ(i, p[0] * 0.985, p[1] * 0.985, p[2] * 0.985);
  }
  const shell = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ colorWrite: false }));
  shell.renderOrder = 1;
  head.add(shell);

  // Glowing irises that shift slightly toward the cursor inside the sockets.
  const eyes = [];
  for (const side of [-1, 1]) {
    const g = new THREE.BufferGeometry();
    const ep = [];
    const en = [];
    const ek = [];
    const es = [];
    for (let ring = 0; ring <= 2; ring++) {
      const count = ring === 0 ? 1 : ring * 8;
      for (let k = 0; k < count; k++) {
        const a = (k / count) * Math.PI * 2;
        const r = ring * 0.011;
        ep.push(Math.cos(a) * r, Math.sin(a) * r, 0);
        en.push(0, 0, 1);
        ek.push(1);
        es.push(Math.random());
      }
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(ep, 3));
    g.setAttribute("aNormal", new THREE.Float32BufferAttribute(en, 3));
    g.setAttribute("aKind", new THREE.Float32BufferAttribute(ek, 1));
    g.setAttribute("aSeed", new THREE.Float32BufferAttribute(es, 1));
    const eye = new THREE.Points(g, pointMaterial);
    const socket = headSurface(normalize([side * 0.31, 0.08, 0.95]));
    eye.userData.base = new THREE.Vector3(socket[0], socket[1], socket[2] + 0.02);
    eye.position.copy(eye.userData.base);
    eye.renderOrder = 3;
    head.add(eye);
    eyes.push(eye);
  }

  // Neck: stays mostly still while the head turns.
  const neckPos = [];
  const neckNor = [];
  const neckKind = [];
  const neckSeed = [];
  const NECK = 1100;
  for (let i = 0; i < NECK; i++) {
    const t = i / (NECK - 1);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    const y = -0.45 - t * 0.85;
    const flare = 1 + Math.pow(t, 2.5) * 0.45;
    neckPos.push(Math.cos(a) * 0.35 * flare, y, Math.sin(a) * 0.32 * flare - 0.1);
    neckNor.push(Math.cos(a), 0, Math.sin(a));
    neckKind.push(2);
    neckSeed.push(Math.random());
  }
  const neckGeo = new THREE.BufferGeometry();
  neckGeo.setAttribute("position", new THREE.Float32BufferAttribute(neckPos, 3));
  neckGeo.setAttribute("aNormal", new THREE.Float32BufferAttribute(neckNor, 3));
  neckGeo.setAttribute("aKind", new THREE.Float32BufferAttribute(neckKind, 1));
  neckGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(neckSeed, 1));
  const neck = new THREE.Points(neckGeo, pointMaterial);
  rig.add(neck);

  // Blueprint rings around the base and orbiting the head.
  const lineMat = new THREE.LineBasicMaterial({ color: 0x9a9a9a, transparent: true, opacity: 0.12 });
  const accentMat = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.45 });
  const ring = (r, mat, arc = Math.PI * 2) => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * arc;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
  };
  const base = ring(1.05, lineMat);
  base.position.y = -1.25;
  rig.add(base);
  const orbit = new THREE.Group();
  orbit.position.y = 0.3;
  orbit.rotation.x = 0.22;
  orbit.add(ring(1.5, lineMat));
  const arc = ring(1.5, accentMat, Math.PI * 0.3);
  orbit.add(arc);
  rig.add(orbit);

  // ---- Interaction --------------------------------------------------------

  const target = { yaw: 0, pitch: 0 };
  const current = { yaw: 0, pitch: 0 };
  let lastMove = -Infinity;

  window.addEventListener(
    "pointermove",
    (e) => {
      const rect = host.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.42;
      const nx = (e.clientX - cx) / (window.innerWidth * 0.5);
      const ny = (e.clientY - cy) / (window.innerHeight * 0.5);
      target.yaw = Math.max(-1, Math.min(1, nx)) * 0.75;
      target.pitch = Math.max(-1, Math.min(1, ny)) * 0.42;
      lastMove = performance.now();
    },
    { passive: true },
  );

  function resize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the head framed whether the box is tall or wide.
    camera.position.z = 6.2 * Math.max(1, 0.75 / camera.aspect);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true;
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(host);

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = clock.getElapsedTime();
    uniforms.uTime.value = t;

    // Drift gently when the cursor has been idle.
    const idle = performance.now() - lastMove > 3500;
    const ty = idle ? Math.sin(t * 0.35) * 0.35 : target.yaw;
    const tp = idle ? Math.sin(t * 0.5) * 0.08 : target.pitch;
    const ease = REDUCED ? 0.2 : 0.07;
    current.yaw += (ty - current.yaw) * ease;
    current.pitch += (tp - current.pitch) * ease;

    head.rotation.set(current.pitch, current.yaw, -current.yaw * 0.08, "YXZ");
    neck.rotation.y = current.yaw * 0.25;
    for (const eye of eyes) {
      eye.position.x = eye.userData.base.x + current.yaw * 0.025;
      eye.position.y = eye.userData.base.y - current.pitch * 0.025;
    }

    if (!REDUCED) {
      rig.position.y = Math.sin(t * 0.9) * 0.03;
      orbit.rotation.y = t * 0.25;
      uniforms.uScan.value = 1.6 - ((t * 0.35) % 1) * 3.4;
    } else {
      uniforms.uScan.value = -10;
    }
    renderer.render(scene, camera);
  }
  frame();
}
