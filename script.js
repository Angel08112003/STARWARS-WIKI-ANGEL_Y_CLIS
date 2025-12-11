// script.js

/**
 * 1. Animación y Garantía de Carga Completa del DOM
 * Asegura que todas las funciones se ejecuten solo después de que 
 * el HTML esté completamente cargado.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('¡La HoloRed ha cargado completamente! Que la Fuerza te acompañe.');

    initializeNewsArticles();
    initializeCharacterCards();
    initializeScrollToTop();    
    initializeThemeToggle();    
    initializeFormValidation(); 
    initializeExternalLinks(); // ⭐️ ¡AÑADE ESTA LÍNEA AQUÍ!
});

// ----------------------------------------------------
// 2. Funcionalidad de Noticias (Simulación de "Leer más")
// ----------------------------------------------------
function initializeNewsArticles() {
    // Selecciona SOLO los enlaces dentro de .news-article que tienen un href igual a "#"
    const readMoreLinks = document.querySelectorAll('.news-article a[href="#"]'); 

    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const newsTitle = link.closest('.news-article').querySelector('h3').textContent;
            alert(`Accediendo a la noticia: "${newsTitle}". ¡Sigue explorando la galaxia!`);
            
            // Opcional: Podrías añadir una clase para cambiar el estilo del enlace después del clic
            link.textContent = 'Leído (Volver arriba)';
            
            // ⭐️ ESTA LÍNEA DEBE EXISTIR: Agrega la clase 'read-link' después de la alerta
            link.classList.add('read-link'); 
        });
    });
}

// ----------------------------------------------------
// 3. Toggle de Clase de Interacción en Tarjetas de Personaje
// ----------------------------------------------------
function initializeCharacterCards() {
    // Selecciona todas las tarjetas de personaje
    const characterCards = document.querySelectorAll('.character-card');

    characterCards.forEach(card => {
        // Añade un listener al hacer clic en la tarjeta
        card.addEventListener('click', () => {
            // Define la clase de 'glow' que simulará un efecto de selección
            const glowClass = 'is-selected'; 
            
            // 1. Elimina la clase 'glow' de *todas* las tarjetas primero
            characterCards.forEach(c => {
                // Solo elimina si es otra tarjeta diferente a la que se acaba de hacer clic
                if (c !== card) {
                    c.classList.remove(glowClass);
                }
            });

            // 2. Hace toggle (activa/desactiva) la clase 'glow' en la tarjeta actual
            card.classList.toggle(glowClass);
            
            // Lógica para consola si es necesario
            if (card.classList.contains(glowClass)) {
                console.log(`¡${card.querySelector('p').textContent} ha sido seleccionado!`);
            } else {
                 console.log(`La selección de ${card.querySelector('p').textContent} ha sido eliminada.`);
            }
        });
    });
}

// ----------------------------------------------------
// 4. Botón de Desplazamiento (Scroll to Top) - NUEVO
// ----------------------------------------------------
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');

    if (!scrollBtn) return; // Sale si el botón no está en el HTML

    // Muestra/Oculta el botón basado en la posición de desplazamiento
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Aparece después de 300px
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Desplazamiento suave al hacer clic
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });
}


// ----------------------------------------------------
// 5. Alternador de Modo Oscuro/Claro (Lado Oscuro/Luminoso) - NUEVO
// ----------------------------------------------------
function initializeThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    
    if (!themeBtn) return; // Sale si el botón no está en el HTML

    // 1. Cargar y aplicar el tema guardado al cargar
    // Usamos 'dark' como valor por defecto si no hay nada guardado
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        body.classList.add('light-side');
        themeBtn.textContent = 'Volver al Lado Oscuro';
    } else {
        themeBtn.textContent = 'Ir al Lado Luminoso';
    }

    // 2. Listener para el botón de cambio
    themeBtn.addEventListener('click', () => {
        if (body.classList.toggle('light-side')) {
            // Se activó el Lado Luminoso
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = 'Volver al Lado Oscuro';
        } else {
            // Se activó el Lado Oscuro
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = 'Ir al Lado Luminoso';
        }
    });
}


// ----------------------------------------------------
// 6. Validación Simple de Registro (Footer) - NUEVO
// ----------------------------------------------------
function initializeFormValidation() {
    const regBtn = document.getElementById('footerRegBtn');
    const usernameInput = document.getElementById('reg-username');

    if (!regBtn || !usernameInput) return; // Sale si los elementos no están en el HTML

    regBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Detiene la navegación

        const username = usernameInput.value.trim();

        if (username.length < 4) {
            alert('¡ERROR DE REGISTRO! Tu nombre galáctico debe tener al menos 4 caracteres. ¡Inténtalo de nuevo, Padawan!');
            usernameInput.style.border = '2px solid red';
            usernameInput.focus();
        } else {
            alert(`¡BIENVENIDO, ${username.toUpperCase()}! Te has unido a la HoloRed. Revisa tu buzón de mensajes.`);
            usernameInput.style.border = '1px solid var(--color-star-yellow)';
            usernameInput.value = ''; // Limpia el campo
        }
    });
}


// ----------------------------------------------------
// 7. Funcionalidad de Enlaces Visitados (Tráilers y URLs reales)
// ----------------------------------------------------
function initializeExternalLinks() {
    // Selecciona todos los enlaces dentro de los contenedores de películas que NO tienen href="#"
    const realMovieLinks = document.querySelectorAll('.container a:not([href="#"])'); 

    realMovieLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Agrega la clase 'read-link' justo antes de que el navegador abra el enlace
            link.classList.add('read-link');
            // Nota: Aquí no usamos e.preventDefault(), permitiendo la redirección.
        });
    });
}