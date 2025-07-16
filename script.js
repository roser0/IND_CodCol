document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para navegación
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animación de entrada para secciones principales
    const animatedSections = document.querySelectorAll('.layout-hero, .layout-main, .layout-testimonials, .layout-second-cta, .layout-contact-data');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    animatedSections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(40px)';
        observer.observe(section);
    });

    // Validación y animación de formulario de contacto
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            form.querySelector('button').textContent = 'Enviando...';
            setTimeout(() => {
                form.querySelector('button').textContent = '¡Enviado!';
                form.reset();
                setTimeout(() => {
                    form.querySelector('button').textContent = 'Enviar';
                }, 2000);
            }, 1500);
        });
        
    }

    // Slider de servicios: navegación por deslizamiento (touch y mouse)
    const slider = document.getElementById('servicesSlider');
    let startX = 0;
    let isDown = false;
    let moved = false;
    let currentServiceSlide = 0;
    const serviceSlides = slider ? slider.querySelectorAll('.slide') : [];

    function showServiceSlide(n) {
        serviceSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'slide-in-left', 'slide-in-right');
        });
        serviceSlides[n].classList.add('active');
    }

    function moveServiceSlide(step) {
        currentServiceSlide += step;
        if (currentServiceSlide < 0) currentServiceSlide = serviceSlides.length - 1;
        if (currentServiceSlide >= serviceSlides.length) currentServiceSlide = 0;
        showServiceSlide(currentServiceSlide);
    }

    if (slider) {
        showServiceSlide(currentServiceSlide);
        // Touch events
        slider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDown = true;
            moved = false;
        });
        slider.addEventListener('touchmove', function(e) {
            if (!isDown) return;
            let diff = e.touches[0].clientX - startX;
            if (Math.abs(diff) > 40) {
                moved = true;
                if (diff < 0) moveServiceSlide(1);
                else moveServiceSlide(-1);
                isDown = false;
            }
        });
        slider.addEventListener('touchend', function() {
            isDown = false;
        });
        // Mouse events
        slider.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            isDown = true;
            moved = false;
        });
        slider.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            let diff = e.clientX - startX;
            if (Math.abs(diff) > 40) {
                moved = true;
                if (diff < 0) moveServiceSlide(1);
                else moveServiceSlide(-1);
                isDown = false;
            }
        });
        slider.addEventListener('mouseup', function() {
            isDown = false;
        });
        slider.addEventListener('mouseleave', function() {
            isDown = false;
        });
    }
});
