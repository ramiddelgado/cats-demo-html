document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const navItems = document.querySelectorAll('.slider-nav-item');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Funciones para el arrastre del mouse
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
        }
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX; // La cantidad de desplazamiento
        slider.scrollLeft = scrollLeft - walk;
    });

    // Función para actualizar los puntos de navegación
    function updateNavItems() {
        const scrollPosition = slider.scrollLeft;
        const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
        const activeIndex = Math.round(scrollPosition / (cardWidth + 2)); // 32 es el gap entre tarjetas

        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
        });
    }

    // Evento de scroll para actualizar los puntos de navegación
    slider.addEventListener('scroll', updateNavItems);

    // Navegación con los puntos
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            slider.scrollTo({
                left: index * (cardWidth + 32), // 32 es el gap entre tarjetas
                behavior: 'smooth'
            });
        });
    });
});



// Navigation
function toggleMenu() {
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');
}

// Cerrar menú al tocar fuera
document.addEventListener('click', function(e) {
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    if (navigation.classList.contains('active') && !navigation.contains(e.target) && e.target !== toggleMenu) {
        toggleMenu.classList.remove('active');
        navigation.classList.remove('active');
    }
});

// Prevenir que los clics dentro del menú lo cierren
document.querySelector('.navigation').addEventListener('click', function(e) {
    e.stopPropagation();
});

// Cerrar menú al cambiar tamaño de ventana
window.addEventListener('resize', function() {
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    if (window.innerWidth > 1150) {
        toggleMenu.classList.remove('active');
        navigation.classList.remove('active');
    }
});
// End Navigation




// !PAGE SERVICIOS.HTML

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            }, 100);
        }
    });
}

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);