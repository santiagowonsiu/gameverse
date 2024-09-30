import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createMainCharacter(scene, world) {
    // Create Three.js sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);  // Sphere with radius 1
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });  // Blue color for the sphere
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(0, 5, 0);  // Initial position
    scene.add(sphereMesh);

    // Create Cannon.js sphere (physics body)
    const sphereShape = new CANNON.Sphere(1);  // Match radius with Three.js sphere
    const sphereBody = new CANNON.Body({
        mass: 1,  // Dynamic body (affected by gravity and forces)
        position: new CANNON.Vec3(0, 5, 0),  // Initial position
        shape: sphereShape
    });
    world.addBody(sphereBody);

    // Return both the Three.js mesh and Cannon.js body
    return { mesh: sphereMesh, body: sphereBody };
}
