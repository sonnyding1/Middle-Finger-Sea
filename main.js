import * as THREE from "three";
import * as lil from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * base
 */
// debug
const gui = new lil.GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

/**
 * textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load(
  "/textures/particles/middle_finger.png"
);

/**
 * objects
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "#ff0000" })
// );
// scene.add(cube);
const positionArray = new Float32Array(5000 * 3);
for (let i = 0; i < 5000 * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 5;
}
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute("position", positionAttribute);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
});
particlesMaterial.map = particleTexture;
particlesMaterial.transparent = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // update renderer
});

/**
 * camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

/**
 * animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
