// Select all the dots in the timeline
const dots = document.querySelectorAll('.dot');

// Create a new div element for the moving dot
const movingDot = document.createElement('div');
movingDot.id = 'moving-dot';

// Append the moving dot to the timeline-dots container
document.querySelector('.timeline-dots').appendChild(movingDot);

// Select the container that wraps all timeline content
const contentWrapper = document.querySelector('.timeline-content-wrapper');

// Initialize the index of the active dot
let activeIndex = 0;

// Set the initial position of the moving dot to the position of the first active dot
const initialDotPosition = dots[activeIndex].offsetLeft + (dots[activeIndex].offsetWidth / 2);
movingDot.style.left = `${initialDotPosition}px`;

// Add event listeners to each dot
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Check if the clicked dot is different from the currently active dot
        if (activeIndex !== index) {
            // Move the moving dot smoothly to the position of the clicked dot
            const dotPosition = dot.offsetLeft + (dot.offsetWidth / 2);
            movingDot.style.left = `${dotPosition}px`;

            // Smoothly slide the content to the position of the clicked dot
            contentWrapper.style.transform = `translateX(-${index * 100}%)`;

            // Update the appearance of the active dot
            dots[activeIndex].classList.remove('active'); // Remove 'active' class from the previous dot
            dot.classList.add('active'); // Add 'active' class to the clicked dot
            activeIndex = index; // Update the activeIndex to the clicked dot's index

            // Update the content text and image based on the clicked dot's data attributes
            const date = dot.getAttribute('data-date');
            const description = dot.getAttribute('data-description');
            const image = dot.getAttribute('data-image');

            document.getElementById('timeline-date').textContent = date; // Update date text
            document.getElementById('timeline-description').textContent = description; // Update description text

            // Update the image without causing flicker
            const imageElement = document.getElementById('timeline-image');
            imageElement.style.transition = 'none'; // Remove transition to prevent flicker
            imageElement.src = image; // Update image source

            // Reapply the transition and opacity after a short delay to ensure smooth appearance
            setTimeout(() => {
                imageElement.style.transition = 'opacity 0.3s ease-in-out'; // Reapply transition
                imageElement.style.opacity = 1; // Make sure the image is visible
            }, 0);
        }
    });
});
