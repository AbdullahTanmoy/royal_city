// ===== HERO BACKGROUND SLIDER =====
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    if (slides.length === 0) return;

    let current = 0;
    let interval = null;
    const AUTO_DURATION = 6000;

    function goTo(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides[current].classList.remove('hero-slide-active');
        dots[current].classList.remove('hero-dot-active');
        dots[current].style.width = '';
        dots[current].style.height = '';

        current = index;

        slides[current].classList.add('hero-slide-active');
        dots[current].classList.add('hero-dot-active');
        dots[current].style.width = '1.5rem';
        dots[current].style.height = '1.25rem';
    }

    function next() {
        goTo(current + 1);
    }

    function startAuto() {
        stopAuto();
        interval = setInterval(next, AUTO_DURATION);
    }

    function stopAuto() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.slide, 10));
            startAuto();
        });
    });

    slides.forEach((slide, i) => {
        slide.addEventListener('mouseenter', stopAuto);
        slide.addEventListener('mouseleave', startAuto);
    });

    startAuto();
})();
