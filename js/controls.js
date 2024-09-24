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
            console.log('Spacebar pressed, starting jump');  // Debugging statement
            velocityY = jumpVelocity;  // Apply upward velocity
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

    // Update function for movement and jumping
    function updateCharacter() {
        // Log the sphere's position to the console
        console.log('Sphere Position:', character.position);  // Log sphere position every frame
        
        // Movement logic: positive `x` is to the right, positive `z` is forward
        if (moveForward) character.position.z -= movementSpeed;  // Move forward along the z-axis (negative z direction)
        if (moveBackward) character.position.z += movementSpeed;  // Move backward along the z-axis (positive z direction)
        if (moveLeft) character.position.x -= movementSpeed;  // Move left along the x-axis (negative x direction)
        if (moveRight) character.position.x += movementSpeed;  // Move right along the x-axis (positive x direction)

        // Handle jumping and gravity
        if (isJumping) {
            console.log('Jumping... Position Y:', character.position.y, 'Velocity Y:', velocityY);  // Debugging statement
            character.position.y += velocityY;  // Move character upwards
            velocityY -= gravity;  // Gravity decreases the upward velocity

            // Stop at the ground level (sphere's bottom shouldn't pass the plane)
            if (character.position.y <= groundLevel) {
                console.log('Landed on the ground');  // Debugging statement
                character.position.y = groundLevel;  // Place at ground level
                isJumping = false;  // Stop jumping
                velocityY = 0;  // Reset the velocity for the next jump
            }
        }
    }

    return { updateCharacter };
}
