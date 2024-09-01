// Select all timeline dots
const dots = document.querySelectorAll('.dot');

// Create and append the moving dot element
const movingDot = document.createElement('div');
movingDot.id = 'moving-dot';
document.querySelector('.timeline-dots').appendChild(movingDot);

// Select the content wrapper for sliding effects
const contentWrapper = document.querySelector('.timeline-content-wrapper');

// Initialize the active index to track the current active dot
let activeIndex = 0;

// Function to update the position of the moving dot
function updateMovingDotPosition() {
    // Get the currently active dot
    const dot = dots[activeIndex];
    // Calculate the position of the moving dot relative to the timeline container
    const dotPosition = dot.getBoundingClientRect().left + (dot.offsetWidth / 2) - document.querySelector('.timeline-dots').getBoundingClientRect().left;
    // Update the left position of the moving dot
    movingDot.style.left = `${dotPosition}px`;
}

// Initialize moving dot position
updateMovingDotPosition();

// Recalculate the moving dot's position when the window is resized
window.addEventListener('resize', updateMovingDotPosition);

// Add click event listeners to all timeline dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Only proceed if the clicked dot is different from the current active dot
        if (activeIndex !== index) {
            // Update the active index to the clicked dot
            activeIndex = index;
            
            // Update the position of the moving dot
            updateMovingDotPosition();

            // Smoothly slide the content to the corresponding slide
            contentWrapper.style.transform = `translateX(-${index * 100}%)`;

            // Update the active dot style
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');

            // Update the content displayed based on the clicked dot
            const date = dot.getAttribute('data-date');
            const description = dot.getAttribute('data-description');
            const image = dot.getAttribute('data-image');

            document.getElementById('timeline-date').textContent = date;
            document.getElementById('timeline-description').textContent = description;

            const imageElement = document.getElementById('timeline-image');
            // Remove image transition to prevent flickering
            imageElement.style.transition = 'none';
            imageElement.src = image;

            // Ensure smooth opacity transition after image load
            setTimeout(() => {
                imageElement.style.transition = 'opacity 0.3s ease-in-out'; // Reapply transition
                imageElement.style.opacity = 1;
            }, 0);
        }
    });
});
