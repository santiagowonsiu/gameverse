export function addControls(THREE, camera, mainCharacter) {
    const movementSpeed = 10;    // Speed while on the ground
    const jumpVelocity = 4;      // Initial jump velocity
    const gravity = 0.008;       // Gravity pulling down
    const sphereRadius = 1;      // The radius of the character sphere

    let isJumping = false;       // Jumping state
    let velocityY = 0;           // Initial vertical velocity
    let moveForward = false;
    let moveBackward = false;
    let moveLeft = false;
    let moveRight = false;
    let canMove = true;          // Boolean flag to determine if movement is allowed

    // Throttled logging flags
    let jumpLogged = false;
    let landLogged = false;

    // Keydown event listener
    document.addEventListener('keydown', (event) => {
        if (canMove) {  // Only allow movement keys if movement is enabled
            if (event.code === 'ArrowUp') moveForward = true;
            if (event.code === 'ArrowDown') moveBackward = true;
            if (event.code === 'ArrowLeft') moveLeft = true;
            if (event.code === 'ArrowRight') moveRight = true;
        }

        // Jump logic for spacebar
        if (event.code === 'Space' && !isJumping && mainCharacter.body.position.y <= sphereRadius + 0.01) {
            velocityY = jumpVelocity;  // Apply jump velocity
            isJumping = true;          // Set jumping state
            canMove = false;           // Disable movement while jumping
            console.log("Jump initiated: velocityY =", velocityY);
            jumpLogged = true;
            landLogged = false;
        }
    });

    // Keyup event listener to stop movement
    document.addEventListener('keyup', (event) => {
        if (event.code === 'ArrowUp') moveForward = false;
        if (event.code === 'ArrowDown') moveBackward = false;
        if (event.code === 'ArrowLeft') moveLeft = false;
        if (event.code === 'ArrowRight') moveRight = false;
    });

    // Update function for character movement and camera tracking
    function updateCharacter() {
        if (!isJumping) {
            // Movement logic ONLY when on the ground
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
        } else {
            if (jumpLogged && !landLogged) {
                console.log("In the air - applying gravity and inertia");
                jumpLogged = false;  // Ensure jump is logged once
            }

            // Apply gravity to vertical velocity
            velocityY -= gravity;
            mainCharacter.body.velocity.y = velocityY;

            // Maintain horizontal inertia while in the air
            mainCharacter.body.velocity.x = mainCharacter.body.velocity.x;
            mainCharacter.body.velocity.z = mainCharacter.body.velocity.z;

            // Check if the character has landed
            if (mainCharacter.body.position.y <= sphereRadius) {
                mainCharacter.body.position.y = sphereRadius;  // Place the character at ground level
                isJumping = false;                            // Reset jumping state
                canMove = true;                               // Re-enable movement after landing
                velocityY = 0;                                // Reset vertical velocity after landing
                if (!landLogged) {
                    console.log("Character landed");
                    landLogged = true;  // Log landing only once
                }
            }
        }

        // Camera tracking logic
        const cameraOffset = new THREE.Vector3(0, 5, 15);
        const newCameraPosition = mainCharacter.mesh.position.clone().add(cameraOffset);
        camera.position.copy(newCameraPosition);
        camera.lookAt(mainCharacter.mesh.position);
    }

    return { updateCharacter };
}
