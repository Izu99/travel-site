let currentSlide = 0;
const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.card-review');
const totalSlides = cards.length;
const visibleCards = 3; // Number of cards to show at once

// Clone first and last few cards to create an infinite loop effect
for (let i = 0; i < visibleCards; i++) {
    // Clone first few cards and append them to the end
    slider.appendChild(cards[i].cloneNode(true));
    // Clone last few cards and prepend them to the start
    slider.insertBefore(cards[totalSlides - 1 - i].cloneNode(true), slider.firstChild);
}

// Update totalSlides count to include clones
const totalSlidesWithClones = document.querySelectorAll('.card-review').length;

function changeSlide(direction) {
    currentSlide += direction;

    // Calculate offset based on current slide
    const offset = -currentSlide * (100 / visibleCards);
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(${offset}%)`;

    // Reset to the original cards (no transition) for seamless looping
    setTimeout(() => {
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${-(currentSlide * 100) / visibleCards}%)`;
        } else if (currentSlide < 0) {
            currentSlide = totalSlides - visibleCards;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${-(currentSlide * 100) / visibleCards}%)`;
        }
    }, 500); // Match the transition duration
}

// Auto-slide every 5 seconds
setInterval(() => changeSlide(1), 5000);
