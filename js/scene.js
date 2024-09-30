import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { createObstacles } from './obstacles.js';
import { createMainCharacter } from './mainCharacter.js';

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);  // Sky blue background

    // Create physics world
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);  // Gravity in the y-axis

    // Load textures for the plane
    const textureLoader = new THREE.TextureLoader();
    const diffuseTexture = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_diff_4k.jpg');
    const normalMap = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_nor_gl_4k.exr');
    const roughnessMap = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_nor_gl_4k.exr');

    // Configure the plane geometry and material
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: diffuseTexture, 
        normalMap: normalMap, 
        roughnessMap: roughnessMap, 
        roughness: 1,
        metalness: 0.0,
    });

    // Create and position the plane
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = -0.1;
    scene.add(planeMesh);

    // Create the physics body for the plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });  // Static plane (mass = 0)
    groundBody.addShape(groundShape);
    groundBody.position.set(0, -0.1, 0);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // Add obstacles to the scene and world
    createObstacles(scene, world);

    // Add the main character (sphere) to the scene and world
    const mainCharacter = createMainCharacter(scene, world);

    return { scene, world, mainCharacter };  // Return the main character along with the scene and world
}
