export function animate(scene, camera, renderer, controls, world, mainCharacter) {
    function renderFrame() {
        requestAnimationFrame(renderFrame);

        // Step the physics world
        world.step(1 / 60);

        // Sync Three.js mesh position and rotation with Cannon.js physics body
        mainCharacter.mesh.position.copy(mainCharacter.body.position);
        mainCharacter.mesh.quaternion.copy(mainCharacter.body.quaternion);

        // Update controls or any other logic
        controls.updateCharacter();

        // Render the scene
        renderer.render(scene, camera);
    }

    renderFrame();  // Start the animation loop
}
