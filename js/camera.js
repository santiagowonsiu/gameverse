import * as THREE from 'three';

// Create and configure the camera
export function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Initial camera position (this will be updated dynamically in controls.js)
    camera.position.set(0, 5, 15);

    return camera;
}