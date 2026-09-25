import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { layers, plays, players, gameStats, stories } from "./data.js";
import maxprepsMarkUrl from "../public/assets/maxpreps-mark.svg?url";
import highlightVideoUrl from "../public/assets/mater-dei-centennial.mp4?url";
import "./styles.css";

const asset = (name) => ({
  "maxpreps-mark.svg": maxprepsMarkUrl,
  "mater-dei-centennial.mp4": highlightVideoUrl,
}[name] ?? name);

document.querySelector("#app").innerHTML = `
  <div class="experience is-loading" data-layer="game">
    <canvas id="scene" aria-label="Interactive three-dimensional football arena"></canvas>
    <div class="noise"></div>
    <header class="topbar">
      <div class="brand-lockup">
        <img src="${asset("maxpreps-mark.svg")}" alt="MaxPreps" />
        <span></span>
        <div><b>GAMESPACE</b><small>DEPTH OF COVERAGE</small></div>
      </div>
      <div class="prototype-label"><i></i> LEADERSHIP CONCEPT · 01</div>
      <button class="sound-button" aria-label="Toggle highlight audio"><span>◖</span> SOUND OFF</button>
    </header>

    <aside class="layer-nav" aria-label="Coverage layers">
      <p>COVERAGE LAYERS</p>
      ${layers.map((layer) => `
        <button data-layer-target="${layer.id}" ${layer.id === "game" ? 'class="is-active"' : ""}>
          <span>${layer.index}</span><b>${layer.label}</b><small>${layer.meta}</small><i></i>
        </button>
      `).join("")}
    </aside>

    <main class="hud">
      <section class="scorebug glass">
        <div class="rank">#1</div><div class="team"><strong>MATER DEI</strong><small>MONARCHS · 2–1</small></div>
        <div class="score" id="md-score">36</div>
        <div class="game-state"><span id="game-status">Q3</span><b>SEP 12 · CORONA, CA</b></div>
        <div class="score" id="cen-score">43</div>
        <div class="team align-right"><strong>CENTENNIAL</strong><small>HUSKIES · 3–1</small></div><div class="rank gold">#21</div>
      </section>

      <section class="coverage-panel glass" id="coverage-panel"></section>

      <section class="timeline-panel glass" id="timeline-panel">
        <div class="play-detail">
          <div><span id="play-tag">EXPLOSIVE PLAY</span><h1 id="play-title">A 71-yard lightning strike</h1><p id="play-detail">Hopkins to Dixon-Wyatt · 0:09 drive</p></div>
          <div class="play-clock"><b id="play-quarter">Q3</b><strong id="play-clock">2:41</strong></div>
        </div>
        <div class="timeline">
          <div class="timeline-line"><i id="timeline-progress"></i></div>
          ${plays.map((play) => `<button data-play="${play.id}" aria-label="${play.q} ${play.clock}, ${play.title}"><i></i><span>${play.q}<b>${play.clock}</b></span></button>`).join("")}
        </div>
        <div class="timeline-footer"><span>SELECT A MOMENT</span><span>13 SCORING PLAYS · 7 TURNOVERS · 1 STORY</span><button id="auto-tour">▶ PLAY STORY</button></div>
      </section>
    </main>

    <div class="scene-label label-field"><span>01</span> LIVE GAME LAYER</div>
    <div class="scene-label label-video"><span>03</span> HIGHLIGHT SIGNAL</div>
    <div class="scene-label label-data"><span>04</span> DATA HALO</div>

    <div class="controls-hint"><span>DRAG</span> ORBIT <i></i> <span>SHIFT + DRAG</span> PAN <i></i> <span>SCROLL</span> ZOOM</div>
    <div class="camera-tools glass" aria-label="Camera controls">
      <button data-camera="overview">OVERVIEW</button><button data-camera="field">FIELD</button><button data-camera="screen">SCREEN</button>
      <i></i><button data-zoom="in" aria-label="Zoom in">＋</button><button data-zoom="out" aria-label="Zoom out">−</button><button data-camera="reset" aria-label="Reset camera">↺</button>
    </div>
    <div class="scene-insight glass" id="scene-insight"></div>
    <button class="intro">
      <div class="intro-grid"></div>
      <div class="intro-copy">
        <img src="${asset("maxpreps-mark.svg")}" alt="" />
        <p>ONE GAME.<br />EVERY LAYER.</p>
        <h1>SEE THE<br /><em>WHOLE STORY.</em></h1>
        <span>ENTER THE GAME <i>→</i></span>
      </div>
      <div class="intro-meta">MATER DEI <b>×</b> CENTENNIAL<br />SEPTEMBER 12, 2025</div>
    </button>
    <div class="loader"><img src="${asset("maxpreps-mark.svg")}" alt="" /><span></span><small>ASSEMBLING THE GAME</small></div>
  </div>
`;

const experience = document.querySelector(".experience");
const canvas = document.querySelector("#scene");
const coveragePanel = document.querySelector("#coverage-panel");
const video = document.createElement("video");
video.src = asset("mater-dei-centennial.mp4");
video.loop = true;
video.muted = true;
video.playsInline = true;
video.preload = "metadata";

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x15171b, 0.009);
const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 300);
camera.position.set(47, 40, 62);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.48;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.screenSpacePanning = true;
controls.minDistance = 20;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minPolarAngle = Math.PI * 0.18;
controls.target.set(0, 3, 0);

scene.add(new THREE.HemisphereLight(0xd5dcff, 0x120b10, 2.15));
const keyLight = new THREE.DirectionalLight(0xffffff, 4.4);
keyLight.position.set(-24, 48, 20);
scene.add(keyLight);
const redLight = new THREE.PointLight(0xed1c24, 1550, 75, 2);
redLight.position.set(-26, 10, 5);
scene.add(redLight);
const goldLight = new THREE.PointLight(0xf3cc43, 1250, 70, 2);
goldLight.position.set(29, 12, -4);
scene.add(goldLight);

const arena = new THREE.Group();
scene.add(arena);

const stadiumGround = new THREE.Mesh(
  new THREE.PlaneGeometry(190, 140),
  new THREE.MeshStandardMaterial({ color: 0x111419, roughness: .94, metalness: .02 })
);
stadiumGround.rotation.x = -Math.PI / 2; stadiumGround.position.y = -1.15; arena.add(stadiumGround);

const floodlights = new THREE.Group();
const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x343941, metalness: .78, roughness: .32 });
const lampMaterial = new THREE.MeshBasicMaterial({ color: 0xfff4d6, toneMapped: false });
[[-48,-31],[48,-31],[-48,31],[48,31]].forEach(([x,z],index)=>{
  const tower = new THREE.Group(); tower.position.set(x,0,z);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.18,.34,27,8),poleMaterial); pole.position.y=12.5; tower.add(pole);
  const rack = new THREE.Mesh(new THREE.BoxGeometry(8,.45,.55),poleMaterial); rack.position.y=26; tower.add(rack);
  for(let i=0;i<6;i++){const lamp=new THREE.Mesh(new THREE.BoxGeometry(.85,.7,.22),lampMaterial);lamp.position.set(-3.2+i*1.28,26, z<0?.38:-.38);tower.add(lamp);}
  const wash = new THREE.SpotLight(0xfff0d2,850,95,Math.PI*.23,.72,1.5); wash.position.set(0,26,0); wash.target.position.set(-x,0,-z); tower.add(wash,wash.target);
  floodlights.add(tower);
});
arena.add(floodlights);

function makeFieldTexture() {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 512;
  const x = c.getContext("2d");
  const gradient = x.createLinearGradient(0, 0, c.width, c.height);
  gradient.addColorStop(0, "#2c4835"); gradient.addColorStop(0.5, "#1c3626"); gradient.addColorStop(1, "#29452f");
  x.fillStyle = gradient; x.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 20; i++) { x.fillStyle = i % 2 ? "rgba(255,255,255,.012)" : "rgba(0,0,0,.05)"; x.fillRect(i * 51.2, 0, 51.2, 512); }
  x.strokeStyle = "rgba(255,255,255,.62)"; x.lineWidth = 3; x.strokeRect(18, 18, 988, 476);
  x.beginPath(); x.moveTo(512, 18); x.lineTo(512, 494); x.stroke();
  for (let i = 1; i < 20; i++) { const px = 18 + i * 49.4; x.strokeStyle = i % 2 ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.32)"; x.beginPath(); x.moveTo(px, 18); x.lineTo(px, 494); x.stroke(); }
  x.fillStyle = "rgba(255,255,255,.45)"; x.font = "bold 35px Arial"; x.textAlign = "center"; x.textBaseline = "middle";
  [10,20,30,40,50,40,30,20,10].forEach((n, i) => { const px = 117 + i * 99; x.fillText(n, px, 72); x.save(); x.translate(px,440); x.rotate(Math.PI); x.fillText(n,0,0); x.restore(); });
  x.globalAlpha = .12; x.font = "900 180px Arial"; x.fillText("M", 512, 275); x.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); return texture;
}

const fieldGroup = new THREE.Group();
const field = new THREE.Mesh(new THREE.BoxGeometry(82, 0.7, 40), new THREE.MeshStandardMaterial({ map: makeFieldTexture(), roughness: .7, metalness: .04, emissive: 0x0a2013, emissiveIntensity: .68 }));
fieldGroup.add(field);
const edge = new THREE.LineSegments(new THREE.EdgesGeometry(field.geometry), new THREE.LineBasicMaterial({ color: 0x90999b, transparent: true, opacity: .35 }));
edge.position.y = .38; fieldGroup.add(edge);
arena.add(fieldGroup);

const stands = new THREE.Group();
const standMat = new THREE.MeshStandardMaterial({ color: 0x111318, roughness: .62, metalness: .75 });
const railMat = new THREE.MeshBasicMaterial({ color: 0x8a9098, transparent: true, opacity: .22 });
for (const side of [-1, 1]) {
  for (let tier = 0; tier < 5; tier++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(90 - tier * 2.4, 1.4, 3.5), standMat);
    s.position.set(0, tier * 1.25 + .2, side * (24 + tier * 2.35)); s.rotation.x = side * -.055; stands.add(s);
  }
  const rail = new THREE.Mesh(new THREE.BoxGeometry(92, .06, .06), railMat); rail.position.set(0, 6.6, side * 33); stands.add(rail);
}
for (const side of [-1, 1]) {
  for (let tier = 0; tier < 4; tier++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.4, 45 - tier * 1.8), standMat);
    s.position.set(side * (45 + tier * 2.2), tier * 1.25 + .2, 0); stands.add(s);
  }
}
arena.add(stands);

const crowdGeometry = new THREE.BufferGeometry();
const crowdPositions = []; const crowdColors = [];
for (let i = 0; i < 3200; i++) {
  const longSide = Math.random() > .28;
  let x, z;
  if (longSide) { x = (Math.random() - .5) * 88; z = (Math.random() > .5 ? 1 : -1) * (25 + Math.random() * 8); }
  else { x = (Math.random() > .5 ? 1 : -1) * (45 + Math.random() * 8); z = (Math.random() - .5) * 44; }
  const y = 2 + Math.random() * 6; crowdPositions.push(x, y, z);
  const red = Math.random() > .72; crowdColors.push(red ? .9 : .45, red ? .04 : .48, red ? .07 : .52);
}
crowdGeometry.setAttribute("position", new THREE.Float32BufferAttribute(crowdPositions, 3));
crowdGeometry.setAttribute("color", new THREE.Float32BufferAttribute(crowdColors, 3));
const crowd = new THREE.Points(crowdGeometry, new THREE.PointsMaterial({ size: .18, vertexColors: true, transparent: true, opacity: .74 }));
arena.add(crowd);

const players3d = new THREE.Group();
const playerGeo = new THREE.CapsuleGeometry(.48, 1.02, 4, 8);
function makePlayerLabel(name, stat, color) {
  const c=document.createElement("canvas"); c.width=640;c.height=150;const x=c.getContext("2d");
  x.fillStyle="rgba(7,8,10,.92)";x.fillRect(0,0,c.width,c.height);x.fillStyle=color;x.fillRect(0,0,9,c.height);
  x.strokeStyle="rgba(255,255,255,.2)";x.lineWidth=2;x.strokeRect(1,1,c.width-2,c.height-2);
  x.fillStyle="#f6f6f2";x.font="700 38px Arial";x.fillText(name,32,61);x.fillStyle=color;x.font="700 27px Arial";x.fillText(stat,32,108);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false,opacity:.9}));sprite.scale.set(11.5,2.7,1);sprite.position.set(0,3.8,0);return sprite;
}
for (let i = 0; i < 22; i++) {
  const teamA = i < 11;
  const mesh = new THREE.Mesh(playerGeo, new THREE.MeshStandardMaterial({ color: teamA ? 0xed1c24 : 0xe4c449, emissive: teamA ? 0x410006 : 0x3d3100, emissiveIntensity: .8, roughness: .28 }));
  mesh.position.set((i % 11 - 5) * 3 + (teamA ? -7 : 7), 1, (Math.floor(i / 2) % 5 - 2) * 4 + (teamA ? -1 : 1));
  const footprint=new THREE.Mesh(new THREE.RingGeometry(.62,.82,24),new THREE.MeshBasicMaterial({color:teamA?0xed1c24:0xf3cc43,transparent:true,opacity:.75,side:THREE.DoubleSide}));
  footprint.rotation.x=-Math.PI/2;footprint.position.y=-.96;mesh.add(footprint);mesh.userData.footprint=footprint;
  mesh.userData.base = mesh.position.clone(); players3d.add(mesh);
}
const playerLabels=[
  [0,"R. HOPKINS","261 PASS YDS · 2 TD","#ed1c24"],
  [4,"K. DIXON-WYATT","165 REC YDS · 2 TD","#ed1c24"],
  [15,"M. DAVIS","102 RUSH YDS · 3 TD","#f3cc43"],
];
playerLabels.forEach(([index,name,stat,color])=>{const label=makePlayerLabel(name,stat,color);label.position.x=index===0?3.8:-3.8;players3d.children[index].add(label);players3d.children[index].userData.dataLabel=label;});
arena.add(players3d);

const routeGroup = new THREE.Group(); arena.add(routeGroup);
const playContextGroup = new THREE.Group(); arena.add(playContextGroup);
const scrimmageLine = new THREE.Mesh(new THREE.BoxGeometry(.22,.06,39),new THREE.MeshBasicMaterial({color:0x3da8ff,transparent:true,opacity:.92}));
const firstDownLine = new THREE.Mesh(new THREE.BoxGeometry(.22,.055,39),new THREE.MeshBasicMaterial({color:0xf3cc43,transparent:true,opacity:.88}));
scrimmageLine.position.y=.77; firstDownLine.position.y=.75; playContextGroup.add(scrimmageLine,firstDownLine);
const ball = new THREE.Mesh(new THREE.SphereGeometry(.42,16,12),new THREE.MeshStandardMaterial({color:0xfff0d0,emissive:0xff8a32,emissiveIntensity:1.2,roughness:.35}));
ball.scale.set(1.35,.72,.72); ball.position.y=1.05; playContextGroup.add(ball);
let currentRoute = null; let playAnimationStarted = performance.now(); let activeRunner = players3d.children[0];
function setRoute(play) {
  routeGroup.clear();
  const points = play.route.map(([x,z]) => new THREE.Vector3(x, .65, z));
  const curve = new THREE.CatmullRomCurve3(points);
  currentRoute = curve; playAnimationStarted = performance.now();
  const geo = new THREE.TubeGeometry(curve, 64, .15, 8, false);
  const mat = new THREE.MeshBasicMaterial({ color: play.accent, transparent: true, opacity: .92 });
  const tube = new THREE.Mesh(geo, mat); routeGroup.add(tube);
  const end = points.at(-1); const pulse = new THREE.Mesh(new THREE.RingGeometry(.7, 1, 32), new THREE.MeshBasicMaterial({ color: play.accent, side: THREE.DoubleSide, transparent: true, opacity: .9 }));
  pulse.rotation.x = -Math.PI / 2; pulse.position.copy(end); pulse.position.y = .72; pulse.userData.pulse = true; routeGroup.add(pulse);
  const direction = Math.sign(end.x - points[0].x) || 1;
  scrimmageLine.position.x = points[0].x; firstDownLine.position.x = THREE.MathUtils.clamp(points[0].x + direction * 10,-40,40);
  ball.position.copy(points[0]); ball.position.y = 1.1; activeRunner = players3d.children[play.team === "MD" ? 4 : 15];
  players3d.children.forEach((player,index)=>{
    const isPrimary=index===(play.team==="MD"?4:15);const isQuarterback=play.team==="MD"&&index===0;
    player.userData.footprint.material.opacity=isPrimary ? .98 : (isQuarterback ? .78 : .32);player.userData.footprint.scale.setScalar(isPrimary?1.65:(isQuarterback?1.3:1));
    if(player.userData.dataLabel)player.userData.dataLabel.material.opacity=(isPrimary||isQuarterback) ? .98 : .22;
  });
}

const videoGroup = new THREE.Group(); videoGroup.position.set(0, 15, -23); arena.add(videoGroup);
const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(25, 14.5, .7), new THREE.MeshStandardMaterial({ color: 0x111216, metalness: .85, roughness: .25 })); videoGroup.add(screenFrame);
const videoTexture = new THREE.VideoTexture(video); videoTexture.colorSpace = THREE.SRGBColorSpace;
const videoScreen = new THREE.Mesh(new THREE.PlaneGeometry(23.4, 13.2), new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false })); videoScreen.position.z = .38; videoGroup.add(videoScreen);
const videoGlow = new THREE.PointLight(0xb8c9ff, 550, 48, 2); videoGlow.position.set(0, 1, 8); videoGroup.add(videoGlow);

const haloGroup = new THREE.Group(); haloGroup.position.y = 17; arena.add(haloGroup);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x65707d, transparent: true, opacity: .28, side: THREE.DoubleSide });
for (let i = 0; i < 4; i++) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(20 + i * 4.4, .035, 4, 128), ringMat.clone());
  ring.rotation.x = Math.PI / 2; ring.rotation.z = i * .18; ring.scale.z = .48; haloGroup.add(ring);
}
const haloDotsGeo = new THREE.BufferGeometry(); const hd = [];
for (let i = 0; i < 480; i++) { const a = Math.random() * Math.PI * 2, r = 20 + Math.random() * 14; hd.push(Math.cos(a) * r, (Math.random() - .5) * 5, Math.sin(a) * r * .48); }
haloDotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(hd,3));
haloGroup.add(new THREE.Points(haloDotsGeo, new THREE.PointsMaterial({ color: 0xb9c1cd, size: .11, transparent: true, opacity: .6 })));

const statsGroup = new THREE.Group();
statsGroup.position.set(0, 1.4, 0); statsGroup.visible = false; arena.add(statsGroup);
[[48,78],[14,19],[31,69],[70,35]].forEach((pair, index) => {
  const x = -25 + index * 16.5;
  pair.forEach((value, team) => {
    const height = Math.max(2.8, value * .13); const color = team === 0 ? 0xed1c24 : 0xf3cc43;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(4.7, 1, 4.7), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .45, metalness: .35, roughness: .28, transparent: true, opacity: .9 }));
    bar.position.set(x + (team ? 2.8 : -2.8), height / 2, 0); bar.scale.y = .03; bar.userData.targetScale = height; statsGroup.add(bar);
  });
  const base = new THREE.Mesh(new THREE.RingGeometry(5.8, 6, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .18, side: THREE.DoubleSide }));
  base.rotation.x = -Math.PI / 2; base.position.set(x, .08, 0); statsGroup.add(base);
});

function makeStoryTexture(eyebrow, lines, number) {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 560; const x = c.getContext("2d");
  x.fillStyle = "rgba(10,10,13,.97)"; x.fillRect(0,0,c.width,c.height); x.strokeStyle = "rgba(255,255,255,.22)"; x.lineWidth = 3; x.strokeRect(2,2,c.width-4,c.height-4);
  x.fillStyle = "#ed1c24"; x.fillRect(56,56,90,6); x.font = "700 25px Arial"; x.fillText(eyebrow,56,110);
  x.font = "900 58px Arial"; x.fillStyle = "#f5f3ef"; lines.forEach((line,i)=>x.fillText(line,56,210+i*70));
  x.font = "700 150px Arial"; x.fillStyle = "rgba(255,255,255,.05)"; x.fillText(number,790,470);
  x.font = "500 22px Arial"; x.fillStyle = "#777b84"; x.fillText("MAXPREPS · FULL COVERAGE",56,490);
  const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}
const storiesGroup = new THREE.Group(); storiesGroup.position.y = 11; storiesGroup.visible = false; arena.add(storiesGroup);
[
  ["GAME OF THE WEEK",["NO. 21 CENTENNIAL", "STUNS NO. 1 MATER DEI"],"01"],
  ["TURNING POINT",["SEVEN TURNOVERS", "CHANGE EVERYTHING"],"02"],
  ["THE COMEBACK",["29 UNANSWERED", "IN ONE QUARTER"],"03"],
].forEach((story,i)=>{
  const card = new THREE.Mesh(new THREE.PlaneGeometry(20,11),new THREE.MeshBasicMaterial({map:makeStoryTexture(...story),transparent:true,opacity:.96,side:THREE.DoubleSide}));
  card.position.set((i-1)*21.5, i===1?3:0, 0); card.rotation.y=(i-1)*-.1; card.scale.setScalar(.04); card.userData.targetScale=1; storiesGroup.add(card);
});

const dustGeo = new THREE.BufferGeometry(); const dustPositions = [];
for (let i = 0; i < 1200; i++) dustPositions.push((Math.random()-.5)*170, Math.random()*70-10, (Math.random()-.5)*150);
dustGeo.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
const atmosphericDust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0x9fa8ba, size: .035, transparent: true, opacity: .055 }));
atmosphericDust.visible = false; scene.add(atmosphericDust);

let activeLayer = "game";
let activePlay = 3;
let tourTimer;
const targetCamera = new THREE.Vector3(47, 40, 62);
const targetLook = new THREE.Vector3(0, 3, 0);
const layerViews = {
  game: { cam: [49, 36, 64], look: [0, 1, 0], field: 0, video: 15, halo: 17 },
  players: { cam: [32, 22, 42], look: [0, 1, 0], field: 0, video: 20, halo: 24 },
  highlights: { cam: [-9, 16, 18], look: [0, 13, -23], field: -7, video: 13, halo: 28 },
  stats: { cam: [37, 34, 43], look: [0, 7, 0], field: -2, video: 22, halo: 22 },
  stories: { cam: [4, 24, 52], look: [0, 12, 0], field: -5, video: 22, halo: 25 },
};

const insights = {
  game: `<span>CONNECTED GAME MODEL</span><b>13 scoring moments. One continuous story.</b>`,
  players: `<span>PLAYER INTELLIGENCE</span><b>Every number resolves back to an athlete.</b>`,
  highlights: `<span>VIDEO + DATA</span><b>The highlight stays connected to the moment.</b>`,
  stats: `<span>COMPARATIVE SIGNAL</span><b>Centennial ran 30 more plays and held the ball 69% of the game.</b>`,
  stories: `<span>EDITORIAL DEPTH</span><b>Recap. Turning point. Comeback. Three ways into one game.</b>`,
};

function panelGame() {
  return `<div class="panel-kicker"><span>LIVE GAME MODEL</span><b>01 / 05</b></div><h2>EVERY PLAY<br><em>IN CONTEXT.</em></h2><p>Explore the score, situation and story of the game from a single connected timeline.</p><div class="metric-grid"><div><b>13</b><span>SCORING PLAYS</span></div><div><b>7</b><span>TURNOVERS</span></div><div><b>79</b><span>TOTAL POINTS</span></div></div><div class="source">SOURCE · MAXPREPS GAME DATA</div>`;
}
function panelPlayers() {
  return `<div class="panel-kicker"><span>PLAYER PERFORMANCE</span><b>02 / 05</b></div><h2>THE PEOPLE<br><em>BEHIND THE PLAY.</em></h2><div class="player-list">${players.map((p,i)=>`<button class="player-card ${i===0?'is-active':''}" data-player="${i}"><i style="--c:${p.color}">${p.number}</i><span><b>${p.name}</b><small>${p.position}</small></span><strong>${p.primary}<small>${p.unit}</small></strong></button>`).join("")}</div><div class="source">SOURCE · MAXPREPS PLAYER STATS</div>`;
}
function panelHighlights() {
  return `<div class="panel-kicker"><span>HIGHLIGHT SIGNAL</span><b>03 / 05</b></div><h2>THE MOMENT.<br><em>FROM EVERY ANGLE.</em></h2><p>Video, game state and athlete data stay synchronized around the moment that matters.</p><button class="primary-action" id="video-toggle">Ⅱ PAUSE HIGHLIGHT</button><div class="video-meta"><span>2:22</span><b>GAME RECAP</b><small>MAXPREPS · NFHS NETWORK</small></div><div class="source">SOURCE · MAXPREPS VIDEO</div>`;
}
function panelStats() {
  return `<div class="panel-kicker"><span>GAME INTELLIGENCE</span><b>04 / 05</b></div><h2>MORE THAN<br><em>A BOX SCORE.</em></h2><div class="stat-compare"><div class="compare-head"><span>MATER DEI</span><span>CENTENNIAL</span></div>${gameStats.map(s=>`<div class="stat-row"><div><b>${s.display?.[0]??s.md}</b><i style="width:${s.md/s.max*100}%"></i></div><span>${s.label}</span><div><b>${s.display?.[1]??s.cen}</b><i style="width:${s.cen/s.max*100}%"></i></div></div>`).join("")}</div><div class="source">SOURCE · MAXPREPS TEAM SUMMARY</div>`;
}
function panelStories() {
  return `<div class="panel-kicker"><span>EDITORIAL LAYER</span><b>05 / 05</b></div><h2>DATA BECOMES<br><em>THE STORY.</em></h2><div class="story-list">${stories.map((s,i)=>`<article class="${i===0?'featured':''}"><span>${s.eyebrow}</span><b>${s.title}</b><small>${s.meta}</small></article>`).join("")}</div><div class="source">SOURCE · MAXPREPS EDITORIAL</div>`;
}
const panels = { game: panelGame, players: panelPlayers, highlights: panelHighlights, stats: panelStats, stories: panelStories };

function bindPanelActions() {
  document.querySelectorAll("[data-player]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-player]").forEach(b=>b.classList.remove("is-active")); btn.classList.add("is-active");
    const idx = Number(btn.dataset.player); players3d.children.forEach((p,i)=> p.scale.setScalar(i === idx * 3 ? 1.65 : .72));
  }));
  document.querySelector("#video-toggle")?.addEventListener("click", toggleVideo);
}

function setLayer(id) {
  activeLayer = id; experience.dataset.layer = id;
  document.querySelectorAll("[data-layer-target]").forEach(b=>b.classList.toggle("is-active", b.dataset.layerTarget===id));
  coveragePanel.innerHTML = panels[id](); bindPanelActions();
  document.querySelector("#scene-insight").innerHTML = insights[id];
  const v = layerViews[id]; targetCamera.set(...v.cam); targetLook.set(...v.look);
  fieldGroup.userData.targetY = v.field; stands.userData.targetY = v.field; players3d.userData.targetY = v.field; routeGroup.userData.targetY = v.field; playContextGroup.userData.targetY = v.field;
  videoGroup.userData.targetY = v.video; haloGroup.userData.targetY = v.halo;
  videoGroup.userData.targetScale = id === "highlights" ? 1.32 : 1;
  statsGroup.visible = id === "stats"; storiesGroup.visible = id === "stories";
  haloGroup.visible = id === "stats";
  playContextGroup.visible = id === "game"; routeGroup.visible = id === "game" || id === "players";
  if (id === "stats") statsGroup.children.forEach(c=>{if(c.userData.targetScale)c.scale.y=.03;});
  if (id === "stories") storiesGroup.children.forEach(c=>c.scale.setScalar(.04));
  if (id === "highlights") video.play().catch(()=>{}); else if (!video.paused) video.pause();
}

function setPlay(index) {
  activePlay = index; const play = plays[index]; setRoute(play);
  document.querySelectorAll("[data-play]").forEach((b,i)=>b.classList.toggle("is-active", i===index));
  document.querySelector("#play-tag").textContent = play.tag;
  document.querySelector("#play-title").textContent = play.title;
  document.querySelector("#play-detail").textContent = play.detail;
  document.querySelector("#play-quarter").textContent = play.q;
  document.querySelector("#play-clock").textContent = play.clock;
  document.querySelector("#game-status").textContent = play.q;
  document.querySelector("#md-score").textContent = play.score[0];
  document.querySelector("#cen-score").textContent = play.score[1];
  document.querySelector("#timeline-progress").style.width = `${(index/(plays.length-1))*100}%`;
  if (activeLayer === "game") document.querySelector("#scene-insight").innerHTML = `<span>${play.q} · ${play.clock} · ${play.tag}</span><b>${play.detail}</b>`;
  const materDeiMoment = play.team === "MD";
  document.documentElement.style.setProperty("--moment", materDeiMoment ? "#ed1c24" : "#f3cc43");
  redLight.intensity = materDeiMoment ? 2350 : 780;
  goldLight.intensity = materDeiMoment ? 650 : 2150;
  routeGroup.scale.set(.01,.01,.01);
}

function toggleVideo() {
  const button = document.querySelector("#video-toggle");
  if (video.paused) { video.play().catch(()=>{}); if(button) button.textContent="Ⅱ PAUSE HIGHLIGHT"; }
  else { video.pause(); if(button) button.textContent="▶ PLAY HIGHLIGHT"; }
}

document.querySelectorAll("[data-layer-target]").forEach(btn=>btn.addEventListener("click",()=>setLayer(btn.dataset.layerTarget)));
document.querySelectorAll("[data-play]").forEach(btn=>btn.addEventListener("click",()=>setPlay(Number(btn.dataset.play))));
document.querySelector(".sound-button").addEventListener("click", (e)=>{ video.muted=!video.muted; e.currentTarget.innerHTML=`<span>◖</span> SOUND ${video.muted?'OFF':'ON'}`; });
document.querySelector("#auto-tour").addEventListener("click", (e)=>{
  clearInterval(tourTimer); let i=activePlay; e.currentTarget.textContent="Ⅱ PLAYING STORY";
  tourTimer=setInterval(()=>{ i=(i+1)%plays.length; setPlay(i); if(i===plays.length-1){clearInterval(tourTimer); e.currentTarget.textContent="▶ PLAY STORY";} },1800);
});
document.querySelectorAll("[data-camera]").forEach(button=>button.addEventListener("click",()=>{
  const view=button.dataset.camera;
  const presets={overview:[[47,40,62],[0,3,0]],field:[[24,14,31],[0,1,0]],screen:[[-9,16,18],[0,13,-23]],reset:[layerViews[activeLayer].cam,layerViews[activeLayer].look]};
  const [position,look]=presets[view]; targetCamera.set(...position); targetLook.set(...look);
}));
document.querySelectorAll("[data-zoom]").forEach(button=>button.addEventListener("click",()=>{
  const direction=targetCamera.clone().sub(targetLook).normalize(); const distance=targetCamera.distanceTo(targetLook);
  const next=THREE.MathUtils.clamp(distance+(button.dataset.zoom==="in"?-10:10),20,100); targetCamera.copy(targetLook).add(direction.multiplyScalar(next));
}));
document.querySelector(".intro").addEventListener("click", async (e)=>{ e.currentTarget.classList.add("is-leaving"); try{await video.play();video.pause();}catch{} setTimeout(()=>e.currentTarget.remove(),1000); });

setLayer("game"); setPlay(3);

const clock = new THREE.Clock();
function animate() {
  const t = clock.getElapsedTime();
  camera.position.lerp(targetCamera, .025); controls.target.lerp(targetLook, .035); controls.update();
  [fieldGroup, stands, players3d, routeGroup, playContextGroup, videoGroup, haloGroup].forEach(g=>{ if(g.userData.targetY!==undefined) g.position.y += (g.userData.targetY-g.position.y)*.035; });
  const screenScale = videoGroup.userData.targetScale ?? 1; videoGroup.scale.lerp(new THREE.Vector3(screenScale,screenScale,screenScale),.04);
  haloGroup.rotation.y = t * .035;
  crowd.rotation.y = Math.sin(t*.15)*.002;
  routeGroup.scale.lerp(new THREE.Vector3(1,1,1), .065);
  routeGroup.children.forEach(c=>{if(c.userData.pulse){const s=1+Math.sin(t*3)*.22;c.scale.setScalar(s);c.material.opacity=.55+Math.sin(t*3)*.3;}});
  players3d.children.forEach((p,i)=>{p.position.y=1+Math.sin(t*1.6+i)*.045;});
  if(currentRoute && activeLayer === "game"){
    const progress=((performance.now()-playAnimationStarted)/4200)%1; const point=currentRoute.getPoint(progress); const next=currentRoute.getPoint(Math.min(1,progress+.015));
    ball.position.set(point.x,1.1,point.z); ball.rotation.y=Math.atan2(next.z-point.z,next.x-point.x);
    activeRunner.position.x += (point.x-activeRunner.position.x)*.12; activeRunner.position.z += (point.z-activeRunner.position.z)*.12; activeRunner.position.y=1.05;
  }
  if(statsGroup.visible) statsGroup.children.forEach(c=>{if(c.userData.targetScale)c.scale.y+=(c.userData.targetScale-c.scale.y)*.045;});
  if(storiesGroup.visible) storiesGroup.children.forEach(c=>{const s=c.userData.targetScale??1;c.scale.lerp(new THREE.Vector3(s,s,s),.045);});
  renderer.render(scene,camera); requestAnimationFrame(animate);
}
animate();

addEventListener("resize",()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
setTimeout(()=>experience.classList.remove("is-loading"),900);
