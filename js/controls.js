import * as THREE from 'three';

export function addControls(camera, character) {
    const movementSpeed = 0.1;
    const jumpVelocity = 0.2;
    let isJumping = false;
    let velocityY = 0;
    const gravity = 0.01;

    const sphereRadius = 0.5;  // Radius of the sphere (character)
    const groundLevel = sphereRadius;  // Ground level (where the sphere should rest)

    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;

    // Keydown event listener
    document.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowUp') moveForward = true;
        if (event.code === 'ArrowDown') moveBackward = true;
        if (event.code === 'ArrowLeft') moveLeft = true;
        if (event.code === 'ArrowRight') moveRight = true;

        // Jump logic for spacebar
        if (event.code === 'Space' && !isJumping && character.position.y === groundLevel) {
            velocityY = jumpVelocity;
            isJumping = true;
        }
    });

    // Keyup event listener
    document.addEventListener('keyup', (event) => {
        if (event.code === 'ArrowUp') moveForward = false;
        if (event.code === 'ArrowDown') moveBackward = false;
        if (event.code === 'ArrowLeft') moveLeft = false;
        if (event.code === 'ArrowRight') moveRight = false;
    });

    // Update function for character movement and camera tracking
    function updateCharacter() {
        // Movement logic
        if (moveForward) character.position.z -= movementSpeed;
        if (moveBackward) character.position.z += movementSpeed;
        if (moveLeft) character.position.x -= movementSpeed;
        if (moveRight) character.position.x += movementSpeed;

        // Handle jumping and gravity
        if (isJumping) {
            character.position.y += velocityY;
            velocityY -= gravity;
            if (character.position.y <= groundLevel) {
                character.position.y = groundLevel;
                isJumping = false;
                velocityY = 0;
            }
        }

        // Camera tracking logic
        const cameraOffset = new THREE.Vector3(0, 5, 15);  // Camera follows from behind and above
        const newCameraPosition = character.position.clone().add(cameraOffset);
        camera.position.copy(newCameraPosition);
        camera.lookAt(character.position);  // Ensure the camera looks at the character
    }

    return { updateCharacter };
}
