import * as THREE from 'https://threejs.org/build/three.module.js';

export function animate(scene, camera, renderer, controls, character) {
    function renderFrame() {
        requestAnimationFrame(renderFrame);  // Request the next frame

        // Update character movement (from controls.js)
        controls.updateCharacter(character);

        // Render the scene from the camera's perspective
        renderer.render(scene, camera);
    }
    
    renderFrame();  // Start the animation loop
}
