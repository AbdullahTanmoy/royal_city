// ============================================================
// PURBACHAL ROYAL CITY | Main Scripts
// ============================================================

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1200);
    }
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
});

// ===== STICKY NAVBAR =====
const navbar = document.getElementById('navbar');
if (navbar) {
    const navHeight = navbar.offsetHeight;
    window.addEventListener('scroll', () => {
        if (window.scrollY > navHeight) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenu) {
    mobileMenu.querySelector('.mobile-menu-overlay').addEventListener('click', closeMobileMenu);
}

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ===== BENEFIT CARDS HOVER =====
document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.benefit-card').forEach(c => {
            c.classList.remove('bg-gold');
            c.classList.remove('text-white');
            c.classList.add('bg-white');
            c.classList.remove('border-gold');
            c.classList.add('border-[#E5E5E5]');
        });
        card.classList.add('bg-gold');
        card.classList.remove('bg-white');
        card.classList.add('border-gold');
        card.classList.remove('border-[#E5E5E5]');
    });
});
