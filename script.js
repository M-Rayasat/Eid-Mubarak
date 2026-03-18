// Opening Letter Animation
function createLetterParticles() {
    const particlesContainer = document.getElementById('letterParticles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'letter-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        particlesContainer.appendChild(particle);
    }
}

function initLetterAnimation() {
    const letterOverlay = document.getElementById('letterOverlay');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContent = document.getElementById('letterContent');

    envelopeContainer.addEventListener('click', () => {
        envelopeContainer.classList.add('opening');

        // Show letter after envelope opens
        setTimeout(() => {
            envelopeContainer.style.opacity = '0';
            letterContent.classList.add('show');

            // Trigger confetti when letter appears
            triggerConfetti();
        }, 1000);

        // Hide overlay and show main website
        setTimeout(() => {
            letterOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';

            // Auto-start video after envelope opens
            const video = document.querySelector('video');
            if (video) {
                video.play().catch(err => console.log('Video autoplay blocked:', err));
            }
        }, 3500);
    });
}

// Stars Animation
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Video Mute/Unmute Toggle
const musicToggle = document.getElementById('musicToggle');
let isVideoMuted = false;

musicToggle.addEventListener('click', () => {
    const video = document.querySelector('video');
    if (video) {
        if (isVideoMuted) {
            video.muted = false;
            musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
        } else {
            video.muted = true;
            musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
        }
        isVideoMuted = !isVideoMuted;
    }
});

// CTA Button - Scroll to Media Section
const ctaButton = document.getElementById('ctaButton');
ctaButton.addEventListener('click', () => {
    document.getElementById('mediaSection').scrollIntoView({ behavior: 'smooth' });
});

// Questions Flow
const nextButton1 = document.getElementById('nextButton1');
const nextButton2 = document.getElementById('nextButton2');
const nextButton3 = document.getElementById('nextButton3');
const nextButton4 = document.getElementById('nextButton4');
const submitButton = document.getElementById('submitButton');
const duaInput = document.getElementById('duaInput');
const joyInput = document.getElementById('joyInput');
const personInput = document.getElementById('personInput');
const memoryInput = document.getElementById('memoryInput');
const eidiInput = document.getElementById('eidiInput');

let currentQuestion = 1;
let userData = {
    dua: '',
    joy: '',
    person: '',
    memory: '',
    eidi: ''
};

nextButton1.addEventListener('click', () => {
    const duaValue = duaInput.value.trim();

    if (!duaValue) {
        alert('Please enter your name');
        return;
    }

    userData.dua = duaValue;
    transitionToQuestion(1, 2);
});

nextButton2.addEventListener('click', () => {
    const joyValue = joyInput.value.trim();

    if (!joyValue) {
        alert('Come on, be honest!');
        return;
    }

    userData.joy = joyValue;
    transitionToQuestion(2, 3);
});

nextButton3.addEventListener('click', () => {
    const personValue = personInput.value.trim();

    if (!personValue) {
        alert('Please share the person\'s name');
        return;
    }

    userData.person = personValue;
    transitionToQuestion(3, 4);
});

nextButton4.addEventListener('click', () => {
    const memoryValue = memoryInput.value.trim();

    if (!memoryValue) {
        alert('Please share your favorite memory');
        return;
    }

    userData.memory = memoryValue;
    transitionToQuestion(4, 5);
});

function transitionToQuestion(current, next) {
    const currentCard = document.querySelector(`.question-card[data-question="${current}"]`);
    const nextCard = document.querySelector(`.question-card[data-question="${next}"]`);

    currentCard.classList.add('exit');
    setTimeout(() => {
        currentCard.classList.remove('active', 'exit');
        nextCard.classList.add('active');
    }, 500);
}

submitButton.addEventListener('click', () => {
    const eidiValue = eidiInput.value.trim();

    if (!eidiValue) {
        alert('Please share your message');
        return;
    }

    userData.eidi = eidiValue;

    // Save user data to file
    saveUserData(userData);

    // Show result card
    showResults();

    // Trigger confetti
    triggerConfetti();
});

// Save user data to localStorage
function saveUserData(data) {
    const timestamp = new Date().toISOString();
    const userEntry = {
        timestamp: timestamp,
        answers: data
    };

    // Get existing responses
    let allResponses = JSON.parse(localStorage.getItem('eidResponses') || '[]');

    // Add new response
    allResponses.push(userEntry);

    // Save back to localStorage
    localStorage.setItem('eidResponses', JSON.stringify(allResponses));

    console.log('Data saved successfully to localStorage');
}

function showResults() {
    const currentCard = document.querySelector('.question-card[data-question="5"]');
    const resultCard = document.getElementById('resultCard');

    // Generate personalized messages
    const resultMessage = document.getElementById('resultMessage');
    const resultDua = document.getElementById('resultDua');
    const resultHumor = document.getElementById('resultHumor');

    resultMessage.textContent = `Your heartfelt dua has been received with love and prayers.`;
    resultDua.textContent = `May Allah fill your life with happiness, accept all your prayers, and bring you closer to the ones you love. May every moment of your life be blessed with peace, prosperity, and endless joy. Ameen.`;
    resultHumor.textContent = `Waise Eidi ka intezar rahe ga 😄`;

    // Transition
    currentCard.classList.add('exit');
    setTimeout(() => {
        currentCard.classList.remove('active', 'exit');
        resultCard.classList.add('active');
    }, 500);
}

// Confetti Animation
function triggerConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#ffd700', '#ffb800', '#0d4d3d', '#1a7a5e', '#ffffff'];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(confetti => {
            confetti.update();
            confetti.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Stop confetti after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}

// Lightbox for Media
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');

function initMediaGallery() {
    const mediaItems = document.querySelectorAll('.media-item');

    mediaItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('click', () => {
                lightboxImage.src = img.src;
                lightbox.classList.add('active');
            });
        }
    });
}

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe wish paragraphs
document.querySelectorAll('.wish-paragraph').forEach(paragraph => {
    observer.observe(paragraph);
});

// Load saved data on page load
window.addEventListener('DOMContentLoaded', () => {
    // Initialize letter animation
    createLetterParticles();
    initLetterAnimation();

    // Prevent scrolling until letter is opened
    document.body.style.overflow = 'hidden';

    createStars();
    initMediaGallery();
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Prevent form submission on Enter key (except in textarea)
document.querySelectorAll('.question-input').forEach(input => {
    if (input.tagName !== 'TEXTAREA') {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (input.id === 'duaInput') {
                    nextButton1.click();
                } else if (input.id === 'eidiInput') {
                    submitButton.click();
                }
            }
        });
    }
});
