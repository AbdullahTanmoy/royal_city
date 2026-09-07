// ===== INTERACTIONS =====

// Custom Cursor
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .plot-card, .feature-card, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '60px';
            ring.style.height = '60px';
            ring.style.borderColor = '#E8D58A';
            ring.style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
            ring.style.borderWidth = '2px';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '40px';
            ring.style.height = '40px';
            ring.style.borderColor = '#C9A84C';
            ring.style.backgroundColor = 'transparent';
            ring.style.borderWidth = '2px';
        });
    });
}

// ===== LIGHTBOX =====
function openLightbox(element) {
    const img = element.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== NAVBAR ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== WHATSAPP TOOLTIP =====
const whatsapp = document.querySelector('.whatsapp-float');
if (whatsapp) {
    const tooltip = whatsapp.querySelector('.whatsapp-tooltip');
    whatsapp.addEventListener('mouseenter', () => {
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(0)';
        }
    });
    whatsapp.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(10px)';
        }
    });
}