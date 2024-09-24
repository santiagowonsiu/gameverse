import * as THREE from 'https://threejs.org/build/three.module.js';

export function createLighting(scene) {
    // Directional light (simulates sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);  // Light source positioned above and to the side
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Ambient light (provides uniform lighting to all objects)
    const ambientLight = new THREE.AmbientLight(0x404040);  // Soft white ambient light
    scene.add(ambientLight);
}
