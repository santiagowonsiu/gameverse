import * as THREE from 'https://threejs.org/build/three.module.js';

// Create and configure the camera
export function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Set the camera behind and slightly above the sphere
    camera.position.set(0, 5, 15);  // Move camera back along the z-axis and slightly up on the y-axis

    // Ensure the camera is looking at the origin where the sphere is
    camera.lookAt(0, 0, 0);  // Point the camera at the sphere (assumed to be at (0, 0, 0))

    // Log camera position for debugging purposes
    console.log('Camera Position:', camera.position);
    console.log('Camera LookAt:', camera.getWorldDirection(new THREE.Vector3()));

    return camera;
}