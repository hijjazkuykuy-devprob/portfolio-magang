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
    let delay = 0;
    const intersecting = entries.filter(entry => entry.isIntersecting);
    
    intersecting.forEach(entry => {
        // Tambahkan efek delay bertahap (stagger) untuk elemen yang muncul bersamaan
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('show');
        delay += 150; // Jeda 150ms per elemen
        
        observer.unobserve(entry.target); // Animasi hanya berjalan sekali
    });
}, observerOptions);

// Tambahkan elemen-elemen yang ingin dianimasikan
const animateElements = document.querySelectorAll('.section-header, .glass-card, .skill-category, .contact-item');
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

// Modal Logic for Projects
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

if (modal && closeModal) {
    closeModal.onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            closeModal.onclick();
        }
    }
}

function openModal(title, desc, imgUrl, techHtml, linksHtml) {
    if (!modal) return;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerHTML = desc;
    document.getElementById('modal-img').src = imgUrl;
    document.getElementById('modal-tech').innerHTML = techHtml;
    
    // Copy links but remove the detail button itself to avoid confusion
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = linksHtml;
    const detailBtn = tempDiv.querySelector('.btn-detail');
    if (detailBtn) detailBtn.remove();
    document.getElementById('modal-links').innerHTML = tempDiv.innerHTML;
    
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

// Add Detail button to all project cards dynamically
document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('h3').innerText;
    const desc = card.querySelector('p').innerHTML;
    const imgUrl = card.querySelector('img').src;
    const techHtml = card.querySelector('.tech-stack').innerHTML;
    const linksHtml = card.querySelector('.project-links').innerHTML;

    const detailBtn = document.createElement('button');
    detailBtn.className = 'btn btn-sm btn-outline btn-detail';
    detailBtn.style.marginRight = '10px';
    detailBtn.style.marginBottom = '10px';
    detailBtn.innerHTML = '<i class="fa-solid fa-circle-info"></i> Detail';
    
    detailBtn.onclick = (e) => {
        e.preventDefault();
        openModal(title, desc, imgUrl, techHtml, linksHtml);
    };
    
    card.querySelector('.project-links').prepend(detailBtn);
});
