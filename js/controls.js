export function addControls(THREE, camera, mainCharacter, world) {
    const movementSpeed = 10;    // Speed while on the ground
    const jumpVelocity = 6;      // Initial jump velocity
    const gravity = 0.1 ;       // Gravity pulling down
    const sphereRadius = 1;      // The radius of the character sphere

    let isJumping = false;       // Jumping state
    let velocityY = 0;           // Initial vertical velocity
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let onSurface = false;       // Boolean flag to track whether the character is on a surface

    // Keydown event listener
    document.addEventListener('keydown', (event) => {
        if (onSurface) {  // Only allow movement keys if character is on a surface
            if (event.code === 'ArrowUp') moveForward = true;
            if (event.code === 'ArrowDown') moveBackward = true;
            if (event.code === 'ArrowLeft') moveLeft = true;
            if (event.code === 'ArrowRight') moveRight = true;
        }

        // Jump logic for spacebar
        if (event.code === 'Space' && onSurface) {
            velocityY = jumpVelocity;  // Apply jump velocity
            isJumping = true;          // Set jumping state
            onSurface = false;         // Character is now off the surface
            console.log("Jump initiated: velocityY =", velocityY);
        }
    });

    // Keyup event listener to stop movement
    document.addEventListener('keyup', (event) => {
        if (event.code === 'ArrowUp') moveForward = false;
        if (event.code === 'ArrowDown') moveBackward = false;
        if (event.code === 'ArrowLeft') moveLeft = false;
        if (event.code === 'ArrowRight') moveRight = false;
    });

    // Detect landing using collision events
    mainCharacter.body.addEventListener('collide', (event) => {
        // When the character collides with any surface, allow movement and jumping
        if (isJumping) {
            isJumping = false;       // Reset jumping state
            velocityY = 0;           // Reset vertical velocity
        }
        onSurface = true;            // Character is now on a surface
        console.log("Character landed on a surface:", event.body);
    });

    // Update function for character movement and camera tracking
    function updateCharacter() {
        if (onSurface && !isJumping) {
            let directionX = 0;
            let directionZ = 0;

            if (moveForward) directionZ -= 1;
            if (moveBackward) directionZ += 1;
            if (moveLeft) directionX -= 1;
            if (moveRight) directionX += 1;

            // Normalize the direction vector to prevent diagonal speed increase
            const length = Math.sqrt(directionX * directionX + directionZ * directionZ);
            if (length > 0) {
                directionX /= length;
                directionZ /= length;
            }

            // Apply the normalized movement speed to the velocities
            mainCharacter.body.velocity.x = directionX * movementSpeed;
            mainCharacter.body.velocity.z = directionZ * movementSpeed;

            // Stop movement if no direction is pressed
            if (length === 0) {
                mainCharacter.body.velocity.x = 0;
                mainCharacter.body.velocity.z = 0;
            }
        }

        // Apply gravity when the character is in the air
        if (!onSurface || isJumping) {
            velocityY -= gravity;
            mainCharacter.body.velocity.y = velocityY;
        }

        // Camera tracking logic
        const cameraOffset = new THREE.Vector3(0, 5, 15);
        const newCameraPosition = mainCharacter.mesh.position.clone().add(cameraOffset);
        camera.position.copy(newCameraPosition);
        camera.lookAt(mainCharacter.mesh.position);
    }

    return { updateCharacter };
}
