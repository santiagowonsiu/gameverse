import * as THREE from 'three';

import { createScene } from './scene.js';
import { createCamera } from './camera.js';
import { createLighting } from './lighting.js';
import { addControls } from './controls.js';
import { animate } from './animation.js';

// Create scene, world, and main character
const { scene, world, mainCharacter } = createScene();  // Destructure to get the scene, world, and main character
const camera = createCamera();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
createLighting(scene);

// Add controls, passing in the camera and main character
const controls = addControls(THREE, camera, mainCharacter);

// Start the animation loop, passing in the scene, camera, renderer, controls, and main character
animate(scene, camera, renderer, controls, world, mainCharacter);
