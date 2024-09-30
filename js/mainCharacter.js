import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createMainCharacter(scene, world) {
    const sphereRadius = 1;

    // Three.js sphere for visual representation
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    // Cannon.js body for physics
    const sphereShape = new CANNON.Sphere(sphereRadius);
    const sphereBody = new CANNON.Body({
        mass: 1,  // Set mass for the character
        position: new CANNON.Vec3(0, 10, 0),  // Initial position
        shape: sphereShape,
    });

    // Increase linear damping for stronger air resistance
    sphereBody.linearDamping = 0.6;  // Increase damping by 3x

    // Optional: you can also adjust angularDamping for rotational drag
    sphereBody.angularDamping = 0.2;

    // Add the body to the physics world
    world.addBody(sphereBody);

    return {
        mesh: sphereMesh,
        body: sphereBody,
    };
}
