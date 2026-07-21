
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
let isScrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (!isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        }
    } else {
        if (isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    }
}, { passive: true });

// Hamburger menu logic
const hamburger = document.getElementById('hamburger');
const navPill = document.querySelector('.nav-pill');
if (hamburger && navPill) {
    hamburger.addEventListener('click', () => {
        navPill.classList.toggle('active');
    });
}

// Biodata Modal Logic
const biodataModal = document.getElementById('biodata-modal');
const closeBiodata = document.getElementById('close-biodata');
const logoPill = document.querySelector('.logo-pill');

if (biodataModal && closeBiodata && logoPill) {
    logoPill.style.cursor = 'pointer';
    logoPill.onclick = () => {
        biodataModal.style.display = 'flex';
        setTimeout(() => { biodataModal.classList.add('active'); }, 10);
    };

    closeBiodata.onclick = () => {
        biodataModal.classList.remove('active');
        setTimeout(() => { biodataModal.style.display = 'none'; }, 300);
    };
}

// Modal Logic for Projects
const modal = document.getElementById('project-modal');
const closeModal = modal ? modal.querySelector('.close-modal') : null;

if (modal && closeModal) {
    closeModal.onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
}

// Global click event to close modals when clicking outside
window.addEventListener('click', (e) => {
    if (modal && e.target == modal) {
        closeModal.onclick();
    }
    if (biodataModal && e.target == biodataModal) {
        closeBiodata.onclick();
    }
});

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

// Make Project Image clickable to open modal
document.querySelectorAll('.project-card').forEach(card => {
    const title = card.querySelector('h3').innerText;
    const desc = card.querySelector('p').innerHTML;
    const imgUrl = card.querySelector('img').src;
    const techHtml = card.querySelector('.tech-stack').innerHTML;
    const linksHtml = card.querySelector('.project-links').innerHTML;

    const projectImage = card.querySelector('.project-image');
    projectImage.style.cursor = 'pointer';
    projectImage.onclick = () => {
        openModal(title, desc, imgUrl, techHtml, linksHtml);
    };
});

// Pagination Logic for Projects
document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll('.project-card');
    const paginationControls = document.getElementById('pagination-controls');
    
    if (projects.length === 0 || !paginationControls) return;

    const itemsPerPage = 6;
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        currentPage = page;
        
        projects.forEach((card, index) => {
            card.style.display = 'none'; // Hide all initially
            // Remove 'show' class to reset animation if needed, but it's handled by IntersectionObserver
            
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                card.style.display = 'flex'; // Show elements for current page
                
                // Re-trigger observer if it's already hidden, or just let CSS show it
                setTimeout(() => {
                    card.classList.add('show');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }
        });

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        paginationControls.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.innerText = i;
            btn.onclick = () => {
                showPage(i);
                // Scroll to top of projects section smoothly
                const projectSection = document.getElementById('projects');
                if (projectSection) {
                    projectSection.scrollIntoView({ behavior: 'smooth' });
                }
            };
            paginationControls.appendChild(btn);
        }
    }

    // Initialize first page
    if (totalPages > 1) {
        showPage(1);
    }
});
