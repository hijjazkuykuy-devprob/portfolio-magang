
// Intro Splash Screen
window.addEventListener('load', () => {
    const splash = document.getElementById('intro-splash');
    if (splash) {
        // Wait for text animations to finish, then fade out
        setTimeout(() => {
            splash.classList.add('fade-out');
            // Remove from DOM after transition
            setTimeout(() => {
                splash.remove();
            }, 850);
        }, 2400);
    }
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
const animateElements = document.querySelectorAll('.section-header, .glass-card:not(.project-card), .skill-category, .contact-item');
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

// Make Project and Cert Images clickable to open modal
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    const title = card.querySelector('h3') ? card.querySelector('h3').innerText : '';
    const desc = card.querySelector('p') ? card.querySelector('p').innerHTML : '';
    const imgUrl = card.querySelector('img') ? card.querySelector('img').src : '';
    
    const techStack = card.querySelector('.tech-stack');
    const techHtml = techStack ? techStack.innerHTML : '';
    
    const projectLinks = card.querySelector('.project-links');
    const linksHtml = projectLinks ? projectLinks.innerHTML : '';

    const imageContainer = card.querySelector('.project-image, .cert-image');
    if (imageContainer) {
        imageContainer.style.cursor = 'pointer';
        imageContainer.onclick = (e) => {
            if (e.target.closest('.cert-view-btn')) return;
            openModal(title, desc, imgUrl, techHtml, linksHtml);
        };
    }

});

// Pagination Logic for Projects (Desktop Only)
document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll('.project-card');
    const paginationControls = document.getElementById('pagination-controls');
    
    if (projects.length === 0 || !paginationControls) return;

    // Only run pagination on desktop (>768px)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    if (isMobile()) {
        // On mobile: clear any inline display styles, let CSS handle visibility
        projects.forEach(card => {
            card.style.display = '';
            card.style.opacity = '';
            card.style.transform = '';
        });
        paginationControls.style.display = 'none';
        return;
    }

    const itemsPerPage = 8;
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    let currentPage = 1;

    function showPage(page) {
        currentPage = page;
        
        projects.forEach((card, index) => {
            card.style.display = 'none'; // Hide all initially
            
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                card.style.display = 'flex'; // Show elements for current page
                
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
    } else {
        showPage(1);
        paginationControls.style.display = 'none';
    }
});

// Mobile "View All Projects" Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
    const viewAllBtn = document.getElementById('mobile-view-all-btn');
    const projectsGrid = document.querySelector('.projects-grid');

    if (!viewAllBtn || !projectsGrid) return;

    let isExpanded = false;

    viewAllBtn.onclick = () => {
        if (!isExpanded) {
            // EXPAND: Show all project cards
            projectsGrid.classList.add('show-all');

            // Animate the newly visible cards
            const hiddenCards = projectsGrid.querySelectorAll('.project-card:nth-child(n+5)');
            hiddenCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });

            // Change button text
            viewAllBtn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
            isExpanded = true;
        } else {
            // COLLAPSE: Hide extra cards
            projectsGrid.classList.remove('show-all');

            // Clear inline styles on hidden cards
            const hiddenCards = projectsGrid.querySelectorAll('.project-card:nth-child(n+5)');
            hiddenCards.forEach(card => {
                card.style.opacity = '';
                card.style.transform = '';
                card.style.transition = '';
            });

            // Scroll to the last visible card (4th) bottom area
            const lastVisibleCard = projectsGrid.querySelectorAll('.project-card')[3];
            if (lastVisibleCard) {
                const cardBottom = lastVisibleCard.getBoundingClientRect().bottom + window.scrollY;
                window.scrollTo({ top: cardBottom - window.innerHeight + 150, behavior: 'instant' });
            }

            // Change button text back
            viewAllBtn.innerHTML = 'View All Projects <i class="fa-solid fa-chevron-down"></i>';
            isExpanded = false;
        }
    };
});
