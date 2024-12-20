// Función para formatear el tiempo restante
function formatTimeRemaining(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

// Función para actualizar el contador
function updateCountdown() {
    const targetDate = new Date('2024-12-20T13:00:00');
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        // Si ya es la hora, mostrar el contenido
        unlockScreen();
    } else {
        // Actualizar el contador
        document.getElementById('lock-countdown').textContent = formatTimeRemaining(timeRemaining);
    }
}

function unlockScreen() {
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const questions = document.getElementById('questions');
    
    lockScreen.style.transform = 'translateY(-100%)';
    mainContent.classList.remove('hidden');
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        if (questions) {
            questions.style.display = 'none';
        }
    }, 1000);
}

// Iniciar el contador cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
