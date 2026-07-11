// Custom Cursor
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay/smoothness to the outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Interactive hover effect for links and buttons
const interactables = document.querySelectorAll('a, .btn, .project-card, .skill-category');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = '#d946ef'; // Change color on hover
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'var(--secondary)';
    });
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Add 'hidden' class to elements we want to animate, then observe them
const animateElements = document.querySelectorAll('.section-header, .glass-card, .skill-category');
animateElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Smooth scroll for nav links (Fallback if CSS scroll-behavior is not supported)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 5%';
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.padding = '30px 5%';
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
});

// Hamburger menu logic
const hamburger = document.getElementById('hamburger');
const navPill = document.querySelector('.nav-pill');
if (hamburger && navPill) {
    hamburger.addEventListener('click', () => {
        navPill.classList.toggle('active');
    });
}
