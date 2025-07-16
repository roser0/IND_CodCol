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
});
