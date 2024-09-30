import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createObstacles(scene, world) {
    const obstacles = [];
    const obstacleMaterial = new CANNON.Material('obstacleMaterial');

    for (let i = 0; i < 5; i++) {
        const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
        const obstacleMesh = new THREE.Mesh(
            obstacleGeometry,
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        
        // Random position for the obstacle
        obstacleMesh.position.set(
            Math.random() * 50 - 25,
            0.5,
            Math.random() * 50 - 25
        );
        
        // Create the obstacle in the Three.js scene
        scene.add(obstacleMesh);

        // Create corresponding physics body
        const obstacleShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)); // Size matches the Three.js box geometry
        const obstacleBody = new CANNON.Body({
            mass: 0,  // Static obstacle (doesn't move)
            position: new CANNON.Vec3(obstacleMesh.position.x, obstacleMesh.position.y, obstacleMesh.position.z),
            shape: obstacleShape,
            material: obstacleMaterial
        });

        // Add physics body to the world
        world.addBody(obstacleBody);

        // Store obstacle mesh and physics body
        obstacles.push({ mesh: obstacleMesh, body: obstacleBody });
    }

    return obstacles;
}
