import * as THREE from 'https://threejs.org/build/three.module.js';

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);  // Sky blue background

    // Load the diffuse (color) texture
    const textureLoader = new THREE.TextureLoader();
    const diffuseTexture = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_diff_4k.jpg');

    // Load the normal and roughness maps
    const normalMap = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_nor_gl_4k.exr');
    const roughnessMap = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_nor_gl_4k.exr');

    // Ensure the diffuse texture repeats across the plane
    diffuseTexture.wrapS = THREE.RepeatWrapping;
    diffuseTexture.wrapT = THREE.RepeatWrapping;
    diffuseTexture.repeat.set(5, 5);  // Adjust the texture tiling as needed

    // Create the plane with diffuse, normal, and roughness maps
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({
        map: diffuseTexture,          // Diffuse map (color)
        normalMap: normalMap,         // Normal map for bump details
        roughnessMap: roughnessMap,   // Roughness map for surface reflections
        roughness: 1,                 // Adjust for how shiny or matte the surface is (0 = shiny, 1 = matte)
        metalness: 0.0,               // Adjust metalness if needed
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;  // Rotate the plane to be horizontal
    plane.position.y = 0;  // Align it with the ground level
    scene.add(plane);

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040);  // Soft ambient light
    scene.add(ambientLight);

    return scene;
}
