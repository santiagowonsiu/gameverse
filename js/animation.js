import * as THREE from 'three';

export function animate(scene, camera, renderer, controls) {
    function renderFrame() {
        requestAnimationFrame(renderFrame);  // Request the next frame

        // Update character movement and camera following the character
        controls.updateCharacter();

        // Render the scene from the camera's perspective
        renderer.render(scene, camera);
    }

    renderFrame();  // Start the animation loop
}

