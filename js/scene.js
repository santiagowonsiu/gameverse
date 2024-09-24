import * as THREE from 'https://threejs.org/build/three.module.js';


export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);  // Sky blue background

    // Optional: Add a ground plane to the scene
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;  // Rotate the plane to be horizontal
    plane.position.y = 0;  // Align it with the ground level
    scene.add(plane);

    return scene;
}
