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
