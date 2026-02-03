// DOM Elements
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const warningMessage = document.getElementById('warning-message');
const questionContainer = document.getElementById('question-container');
const celebrationContainer = document.getElementById('celebration-container');
const equationContainer = document.getElementById('equation-container');
const equationDisplay = document.getElementById('equation');
const equationInput = document.getElementById('equation-input');
const btnSubmit = document.getElementById('btn-submit');
const equationError = document.getElementById('equation-error');
const heartsContainer = document.getElementById('hearts-container');

// State
let noClickCount = 0;
let correctAnswer = null;

// Complex equation generator
function generateComplexEquation() {
    // Generate a really complex looking equation
    const a = Math.floor(Math.random() * 10) + 5;
    const b = Math.floor(Math.random() * 10) + 5;
    const c = Math.floor(Math.random() * 10) + 2;
    const d = Math.floor(Math.random() * 5) + 1;

    // Create the equation: (a² + b) × c - d² = ?
    const result = (Math.pow(a, 2) + b) * c - Math.pow(d, 2);
    correctAnswer = result;

    return `(${a}² + ${b}) × ${c} - ${d}² = ?`;
}

// Create floating hearts
function createFloatingHearts() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }, 500);
}

// Create sparkles for celebration
function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// Confetti animation
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#ff6b9d', '#ff8a80', '#ffab91', '#ff4d7d', '#e91e63', '#f48fb1', '#fff', '#ffd700'];

    // Create confetti particles
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 5 + 3,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            shape: Math.random() > 0.5 ? 'circle' : 'rect'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((particle, index) => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.fillStyle = particle.color;

            if (particle.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
            }

            ctx.restore();

            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;

            // Reset if off screen
            if (particle.y > canvas.height + 20) {
                particle.y = -20;
                particle.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Show celebration
function showCelebration() {
    questionContainer.style.display = 'none';
    celebrationContainer.classList.add('show');
    createSparkles();
    createConfetti();

    // Add more floating hearts for celebration
    const celebrationHearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🌹', '✨'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = celebrationHearts[Math.floor(Math.random() * celebrationHearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heartsContainer.appendChild(heart);
        }, i * 100);
    }
}

// Handle "Yes" button click
btnYes.addEventListener('click', () => {
    btnYes.style.transform = 'scale(1.3)';
    setTimeout(() => {
        showCelebration();
    }, 300);
});

// Handle "No" button click
btnNo.addEventListener('click', () => {
    noClickCount++;
    btnNo.classList.add('shake');
    setTimeout(() => {
        btnNo.classList.remove('shake');
    }, 500);

    if (noClickCount === 1) {
        warningMessage.textContent = 'Czy na pewno??? 🥺';
        warningMessage.classList.add('show');
    } else if (noClickCount === 2) {
        warningMessage.textContent = 'Czy ty oszalałaś?! 😱💔';
        warningMessage.classList.add('show');
    } else if (noClickCount >= 3) {
        warningMessage.textContent = 'Dobrze... ale najpierw rozwiąż to! 🧮';
        equationContainer.classList.add('show');
        equationDisplay.textContent = generateComplexEquation();
        btnNo.disabled = true;
        btnNo.style.opacity = '0.5';
    }
});

// Handle equation submit
btnSubmit.addEventListener('click', () => {
    const userAnswer = parseInt(equationInput.value);

    if (isNaN(userAnswer)) {
        equationError.textContent = 'Wpisz poprawną liczbę! 🤔';
        return;
    }

    if (userAnswer === correctAnswer) {
        // Even if correct - there's no such option as "No"!
        equationContainer.innerHTML = `
            <div class="no-option-message">
                <p class="big-message">NIE MA TAKIEJ OPCJI! 😏💕</p>
                <p class="instruction-message">14 Lutego o godzinie 18:00<br>masz być pięknie ubrana i gotowa! 👗✨</p>
            </div>
        `;

        // After 3 seconds, show celebration
        setTimeout(() => {
            showCelebration();
        }, 4000);
    } else {
        equationError.textContent = 'Źle! Może lepiej kliknij TAK? 💕';
        equationInput.value = '';

        // Pulse the Yes button
        btnYes.style.animation = 'pulse 0.5s ease-in-out 3';
    }
});

// Allow enter key for equation input
equationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnSubmit.click();
    }
});

// Initialize floating hearts
createFloatingHearts();

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
`;
document.head.appendChild(style);
