import * as THREE from 'https://threejs.org/build/three.module.js';
import { createScene } from './scene.js';
import { createCamera } from './camera.js';
import { createLighting } from './lighting.js';
import { addControls } from './controls.js';
import { animate } from './animation.js';

// Create scene, camera, and renderer
const scene = createScene();
const camera = createCamera();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
createLighting(scene);

// Create a simple sphere (as the character)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);  // Sphere with radius 0.5
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(sphereGeometry, sphereMaterial);
character.position.y = 0.5;  // Set the initial position of the sphere above the plane
scene.add(character);

// Pass both the camera and character to controls.js
const controls = addControls(camera, character);

// Start the animation loop
animate(scene, camera, renderer, controls, character);