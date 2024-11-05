document.addEventListener('DOMContentLoaded', function() {

    
    if (document.querySelector('.testimonial-slider')) {
        initTestimonials();
    }
    if (document.getElementById('gallery')) {
        initGallery();
    }

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
        e.preventDefault();
    }
});

    

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


// !FAQ DYNAMICS
function toggleAnswer(element) {
    const answer = element.nextElementSibling; // Obtiene la respuesta correspondiente
    const question = element; // Guarda la referencia a la pregunta

    // Alternar la visibilidad de la respuesta
    if (answer.classList.contains('show')) {
        answer.classList.remove('show'); // Oculta la respuesta
        question.classList.remove('no-border'); // Elimina la clase para restaurar el borde
    } else {
        answer.classList.add('show'); // Muestra la respuesta
        question.classList.add('no-border'); // Agrega la clase para eliminar el borde
    }
}


const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => toggleAnswer(question));
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

//! FUNCION TESTIMONIALS

function initTestimonials(){
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
        item.addEventListener('click', function(event) {
            event.stopPropagation();
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            slider.scrollTo({
                left: index * (cardWidth + 32), // 32 es el gap entre tarjetas
                behavior: 'smooth'
            });
        });
    });
}
//! FIN FUNCION TESTIMONIALS

// !INICIO DE GALERIA.HTML

    function initGallery(){
        const gallery = document.getElementById('gallery');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const closeLightbox = document.getElementById('closeLightbox');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        let currentIndex = 0;
        const images = Array.from(gallery.getElementsByTagName('img'));
        
        function openLightbox(index) {
            currentIndex = index;
            lightboxImage.src = images[currentIndex].src;
            lightboxImage.alt = images[currentIndex].alt;
            lightbox.style.display = 'flex';
        
            // Permitir que el DOM se actualice antes de añadir la clase active
            requestAnimationFrame(() => {
                lightbox.classList.add('active');
            });
        
            updateNavButtons();
        }
        
        function closeLightboxFunc() {
            lightbox.classList.remove('active');
        
            // Esperar a que termine la transición antes de ocultar el lightbox
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300); // 300ms = duración de la transición
        }
        
        
        function navigateImage(direction) {
            currentIndex += direction;
            if (currentIndex < 0) currentIndex = images.length - 1;
            if (currentIndex >= images.length) currentIndex = 0;
            lightboxImage.src = images[currentIndex].src;
            lightboxImage.alt = images[currentIndex].alt;
            updateNavButtons();
        }
        
        function updateNavButtons() {
            prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
            nextButton.style.display = currentIndex < images.length - 1 ? 'block' : 'none';
        }
        
        gallery.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                e.stopPropagation();
                const index = images.indexOf(e.target);
                openLightbox(index);
            }
        });
        
        closeLightbox.addEventListener('click', closeLightboxFunc);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxFunc();
        });
        
        prevButton.addEventListener('click', () => navigateImage(-1));
        nextButton.addEventListener('click', () => navigateImage(1));
        
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowLeft') navigateImage(-1);
                if (e.key === 'ArrowRight') navigateImage(1);
                if (e.key === 'Escape') closeLightboxFunc();
            }
        });
        
    }
    
    // !FIN DE GALERIA.HTML

    // Start of OpenWidget (www.openwidget.com) code
    window.__ow = window.__ow || {};
    window.__ow.organizationId = "7eeaa7d8-62ab-473d-b90a-c06037687389";
    window.__ow.integration_name = "manual_settings";
    window.__ow.product_name = "openwidget";   
    (function(n,t,c){
        function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
        var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};
        !n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e
    }(window,document,[].slice));
    // End of OpenWidget code





