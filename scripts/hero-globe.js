/* ==========================================================
   HERO GLOBE
   WebGL globe (three.js + three-globe), the vanilla equivalent of
   the Aceternity "GlobeDemo". Colours come from the --globe-* CSS
   tokens, so it follows the site theme and re-colours on change.
   Classic script (works from file:// too); three.js and three-globe are
   pulled in with dynamic import() via the importmap in index.html.
   ========================================================== */
(function () {
let THREE, ThreeGlobe;

const stage = document.querySelector('.globe-stage');
const orb = stage && stage.querySelector('.globe-orb');
const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

/* ---------- Route data ---------- */
const C = {
  mississauga: [43.589, -79.6441], vancouver: [49.2827, -123.1207], montreal: [45.5017, -73.5673],
  calgary: [51.0447, -114.0719], newYork: [40.7128, -74.006], london: [51.5072, -0.1276],
  dublin: [53.3498, -6.2603], madrid: [40.4168, -3.7038], rome: [41.9028, 12.4964],
  berlin: [52.52, 13.405], stockholm: [59.3293, 18.0686], helsinki: [60.1699, 24.9384],
  vilnius: [54.6872, 25.2797], sydney: [-33.8688, 151.2093], auckland: [-36.8485, 174.7633],
  lahore: [31.5204, 74.3587], karachi: [24.8607, 67.0011], islamabad: [33.6844, 73.0479],
  dubai: [25.2048, 55.2708], delhi: [28.6139, 77.209], dhaka: [23.8103, 90.4125],
  manila: [14.5995, 120.9842], lagos: [6.5244, 3.3792], nairobi: [-1.2921, 36.8219],
  riyadh: [24.7136, 46.6753]
};
const ROUTES = [
  ['lahore', 'mississauga'], ['karachi', 'vancouver'], ['dubai', 'london'],
  ['islamabad', 'calgary'], ['manila', 'sydney'], ['lagos', 'mississauga'],
  ['lahore', 'london'], ['delhi', 'montreal'], ['nairobi', 'dublin'],
  ['karachi', 'mississauga'], ['dhaka', 'berlin'], ['riyadh', 'newYork'],
  ['lahore', 'sydney'], ['dubai', 'mississauga'], ['islamabad', 'stockholm'],
  ['manila', 'vancouver'], ['lagos', 'madrid'], ['karachi', 'auckland'],
  ['lahore', 'helsinki'], ['nairobi', 'rome'], ['delhi', 'vilnius'],
  ['dhaka', 'mississauga'], ['riyadh', 'montreal'], ['lahore', 'calgary']
];
const OFFICES = [C.mississauga, C.lahore];

function angularDistance(a, b) {
  const r = Math.PI / 180;
  const s = Math.sin((b[0] - a[0]) * r / 2) ** 2 +
    Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin((b[1] - a[1]) * r / 2) ** 2;
  return 2 * Math.asin(Math.sqrt(s));
}

const arcs = ROUTES.map(([from, to], i) => {
  const a = C[from], b = C[to];
  return {
    order: Math.floor(i / 3) + 1,
    startLat: a[0], startLng: a[1], endLat: b[0], endLng: b[1],
    arcAlt: Math.min(0.32, Math.max(0.08, angularDistance(a, b) * 0.14)),
    tone: i % 3
  };
});

const points = [];
arcs.forEach(d => {
  points.push({ lat: d.startLat, lng: d.startLng, hub: false });
  points.push({ lat: d.endLat, lng: d.endLng, hub: false });
});
OFFICES.forEach(([lat, lng]) => points.push({ lat, lng, hub: true }));
const uniquePoints = points.filter((p, i, all) =>
  all.findIndex(q => q.lat === p.lat && q.lng === p.lng) === i);

/* ---------- Theme ---------- */
function token(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
function readTheme() {
  return {
    base: token('--globe-base', '#132445'),
    emissive: token('--globe-emissive', '#0d1a33'),
    dots: token('--globe-dots', 'rgba(233,200,119,.72)'),
    atmos: token('--globe-atmos', '#e9c877'),
    ambient: token('--globe-ambient', '#e9d7ad'),
    arcs: [token('--globe-arc-1', '#e9c877'), token('--globe-arc-2', '#cda34d'), token('--globe-arc-3', '#fff3d6')],
    point: token('--globe-point', '#e9c877'),
    ring: token('--globe-ring', '233,200,119')
  };
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

/* ---------- Pin the horizon just above the second headline line ---------- */
const hero = stage && stage.closest('.hero');
const anchor = hero && hero.querySelector('h1 .ln + .ln');
function placeGlobe() {
  if (!hero || !anchor) return;
  const r = anchor.getBoundingClientRect();
  hero.style.setProperty('--globe-top', Math.round(r.top - hero.getBoundingClientRect().top + r.height * 0.2) + 'px');
}
placeGlobe();
if (hero) {
  window.addEventListener('resize', placeGlobe);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeGlobe);
}

async function init() {
  if (!stage || !orb || !hasWebGL()) return;

  if (!window.VGM_COUNTRIES) return;
  THREE = await import('three');
  ThreeGlobe = (await import('three-globe')).default;
  const countries = window.VGM_COUNTRIES.features;

  let theme = readTheme();

  /* ---------- Scene ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  orb.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 1, 1800);
  camera.position.set(0, 0, 275);

  const ambient = new THREE.AmbientLight(theme.ambient, 0.6);
  const dirLeft = new THREE.DirectionalLight(0xffffff, 1);
  dirLeft.position.set(-400, 100, 400);
  const dirTop = new THREE.DirectionalLight(0xffffff, 1);
  dirTop.position.set(-200, 500, 200);
  const point = new THREE.PointLight(0xffffff, 0.8);
  point.position.set(-200, 500, 200);
  scene.add(ambient, dirLeft, dirTop, point);

  const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: !reduced })
    .hexPolygonsData(countries)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereAltitude(0.14);

  // Lean the north pole slightly towards the viewer so latitudes 30-55 (Canada, Europe, Pakistan) fill the visible cap.
  const tilt = new THREE.Group();
  tilt.add(globe);
  scene.add(tilt);
  globe.rotation.y = 30 * Math.PI / 180;  // open on the Atlantic: Canada left, Europe right
  const baseTiltX = 0.14;
  tilt.rotation.x = baseTiltX;

  const material = globe.globeMaterial();
  material.shininess = 0.9;
  material.emissiveIntensity = 0.12;

  function applyTheme() {
    theme = readTheme();
    material.color = new THREE.Color(theme.base);
    material.emissive = new THREE.Color(theme.emissive);
    ambient.color = new THREE.Color(theme.ambient);
    globe
      .atmosphereColor(theme.atmos)
      .hexPolygonColor(() => theme.dots)
      .arcColor(d => theme.arcs[d.tone])
      .pointColor(d => d.hub ? theme.arcs[2] : theme.point)
      .ringColor(() => t => `rgba(${theme.ring},${Math.max(0, 1 - t)})`);
  }

  globe
    .arcsData(arcs)
    .arcStartLat(d => d.startLat).arcStartLng(d => d.startLng)
    .arcEndLat(d => d.endLat).arcEndLng(d => d.endLng)
    .arcAltitude(d => d.arcAlt)
    .arcStroke(d => [0.32, 0.28, 0.3][d.tone]);
  if (reduced) {
    globe.arcDashLength(1).arcDashGap(0).arcDashAnimateTime(0);
  } else {
    globe.arcDashLength(0.9).arcDashGap(arcs[arcs.length - 1].order).arcDashInitialGap(d => d.order).arcDashAnimateTime(1000);
  }

  globe
    .pointsData(uniquePoints)
    .pointAltitude(0)
    .pointRadius(d => d.hub ? 0.75 : 0.45)
    .pointsMerge(true)
    .ringMaxRadius(3)
    .ringPropagationSpeed(3)
    .ringRepeatPeriod(900);

  applyTheme();

  /* ---------- Rings: offices always pulse, plus a rotating set of route ends ---------- */
  const officeRings = OFFICES.map(([lat, lng]) => ({ lat, lng }));
  function cycleRings() {
    const picks = [];
    while (picks.length < 4) {
      const d = arcs[Math.floor(Math.random() * arcs.length)];
      const r = { lat: d.endLat, lng: d.endLng };
      if (!picks.some(p => p.lat === r.lat && p.lng === r.lng)) picks.push(r);
    }
    globe.ringsData(officeRings.concat(picks));
  }
  cycleRings();
  if (!reduced) setInterval(() => { if (running) cycleRings(); }, 2000);

  /* ---------- Size ---------- */
  function resize() {
    const size = orb.clientWidth || 600;
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    if (reduced) render();
  }
  new ResizeObserver(resize).observe(orb);
  resize();

  /* ---------- Motion: auto-rotate, pointer tilt, scroll parallax ---------- */
  let tx = 0, ty = 0, cx = 0, cy = 0;
  if (finePointer && !reduced) {
    window.addEventListener('pointermove', e => {
      tx = (e.clientY / window.innerHeight - 0.5) * 0.12;
      ty = (e.clientX / window.innerWidth - 0.5) * 0.22;
    }, { passive: true });
  }
  if (!reduced) {
    const onScroll = () => {
      const y = Math.min(window.scrollY, window.innerHeight * 1.5);
      stage.style.setProperty('--globe-shift', (y * -0.14).toFixed(1) + 'px');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function render() { renderer.render(scene, camera); }

  let running = false, last = performance.now(), spin = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(now - last, 50); last = now;
    spin += dt * 0.000085;
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;
    globe.rotation.y = 30 * Math.PI / 180 + spin + cy;
    tilt.rotation.x = baseTiltX + cx;
    render();
    requestAnimationFrame(frame);
  }
  function setRunning(on) {
    if (reduced || on === running) return;
    running = on;
    if (on) { last = performance.now(); requestAnimationFrame(frame); }
  }

  let inView = true;
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    setRunning(inView && !document.hidden);
  }).observe(stage);
  document.addEventListener('visibilitychange', () => setRunning(inView && !document.hidden));

  new MutationObserver(() => { applyTheme(); if (reduced) render(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  globe.onGlobeReady(() => {
    stage.classList.add('is-ready');
    if (hero) hero.classList.add('globe-on');
    if (reduced) setTimeout(render, 60);
  });

  if (reduced) render(); else setRunning(true);
}

init().catch(err => console.warn('[hero-globe]', err));
})();
