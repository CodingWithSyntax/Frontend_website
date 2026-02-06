// DOM Elements
const loginButton = document.getElementById('loginButton');
const closeButton = document.getElementById('closeButton');
const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const startJourneyBtn = document.getElementById('startJourneyBtn');

// Background Slider Elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

// Background Slider Functions
function startSlider() {
slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function nextSlide() {
goToSlide((currentSlide + 1) % slides.length);
}

function goToSlide(n) {
slides[currentSlide].classList.remove('active');
dots[currentSlide].classList.remove('active');
currentSlide = (n + slides.length) % slides.length;
slides[currentSlide].classList.add('active');
dots[currentSlide].classList.add('active');
}

// Initialize slider
startSlider();

// Add click events to slider dots
dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
    clearInterval(slideInterval); // Stop auto-sliding when user interacts
    goToSlide(index);
    startSlider(); // Restart auto-sliding
});
});

// Pause slider on hover
const bgSlider = document.getElementById('bgSlider');
bgSlider.addEventListener('mouseenter', () => {
clearInterval(slideInterval);
});

bgSlider.addEventListener('mouseleave', () => {
startSlider();
});

// Show login card
loginButton.addEventListener('click', () => {
loginOverlay.classList.add('active');
document.body.style.overflow = 'hidden';
clearInterval(slideInterval); // Pause slider when login is open
});

// Hide login card
closeButton.addEventListener('click', () => {
loginOverlay.classList.remove('active');
document.body.style.overflow = 'auto';
startSlider(); // Restart slider when login is closed
});

// Hide login card when clicking outside
loginOverlay.addEventListener('click', (e) => {
if (e.target === loginOverlay) {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    startSlider(); // Restart slider
}
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
e.preventDefault();

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

if (!email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    showMessage('Please enter a valid email address', 'error');
    return;
}

showMessage('Login successful! Welcome to Coding With Syntax.', 'success');

setTimeout(() => {
    loginOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    loginForm.reset();
    startSlider(); // Restart slider
}, 1500);
});

// Start Journey Button
startJourneyBtn.addEventListener('click', () => {
// Create a floating animation effect
const button = startJourneyBtn;
button.style.transform = 'scale(0.95)';

setTimeout(() => {
    button.style.transform = '';
}, 200);

// Show a message
showMessage('Get ready for your nature adventure!', 'info');

// Change to a specific slide (sunset mountain for adventure feel)
goToSlide(1); // Go to sunset mountain slide
});

// Function to show messages
function showMessage(text, type) {
const existingMessage = document.querySelector('.custom-message');
if (existingMessage) {
    existingMessage.remove();
}

let bgColor;
if (type === 'success') {
    bgColor = 'rgba(76, 175, 80, 0.9)';
} else if (type === 'error') {
    bgColor = 'rgba(244, 67, 54, 0.9)';
} else {
    bgColor = 'rgba(255, 193, 7, 0.9)';
}

const message = document.createElement('div');
message.className = 'custom-message';
message.innerHTML = `
    <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    ">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${text}
    </div>
`;

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

document.body.appendChild(message);

setTimeout(() => {
    message.remove();
    style.remove();
}, 3000);
}
