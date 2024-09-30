import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);  // Sky blue background

    // Load the OBJ and MTL files
    const mtlLoader = new MTLLoader();
    // mtlLoader.load('assets/materials/gray_rocks_4k.blend/ImageToStl.com_gray_rocks_4k/gray_rocks_4k.mtl', function (materials) {
    //     materials.preload();  // Preload the materials

    //     const objLoader = new OBJLoader();
    //     objLoader.setMaterials(materials);
    //     objLoader.load('assets/materials/gray_rocks_4k.blend/ImageToStl.com_gray_rocks_4k/ImageToStl.com_gray_rocks_4k.obj', function (object) {
    //         console.log("OBJ model loaded");
    //         object.position.set(0, 0, 0);  // Adjust position if necessary
    //         scene.add(object);
    //     }, undefined, function (error) {
    //         console.error("Error loading OBJ file:", error);
    //     });
    // }, undefined, function (error) {
    //     console.error("Error loading MTL file:", error);
    // });

    // Optional: Keep the plane with diffuse texture
    const textureLoader = new THREE.TextureLoader();
    const diffuseTexture = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_diff_4k.jpg');
    const normalMap = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_nor_gl_4k.exr');
    const roughnessMap = textureLoader.load('assets/materials/gray_rocks_4k.blend/textures/gray_rocks_nor_gl_4k.exr');

    // Ensure the diffuse texture repeats across the plane
    diffuseTexture.wrapS = THREE.RepeatWrapping;
    diffuseTexture.wrapT = THREE.RepeatWrapping;
    diffuseTexture.repeat.set(5, 5);  // Adjust the texture tiling as needed

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
    plane.position.y = -0.1;  // Place it slightly below the model
    scene.add(plane);

    return scene;
}
