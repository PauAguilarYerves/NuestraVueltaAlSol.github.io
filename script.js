document.addEventListener("DOMContentLoaded", () => {
    // Efecto Parallax
    const parallax = document.getElementById("parallax-bg");
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
    });

    // Carrusel de imágenes
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    let isAutoPlaying = true;
    let slideInterval;

    function showSlide(n) {
        // Ajustar el índice si se sale de los límites
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Ocultar todas las diapositivas
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Mostrar la diapositiva actual
        slides[currentSlide].style.display = 'block';
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, 6000); 
            isAutoPlaying = true;
        }
    }

    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
            isAutoPlaying = false;
        }
    }

    // Event Listeners
    document.querySelector('.next').addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
    });

    document.querySelector('.prev').addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
    });

    // Inicializar carrusel
    showSlide(currentSlide);
    startAutoPlay();

    // Modal para ampliar la imagen
    window.openModal = function(imageSrc, captionText) {
        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("modal-image");
        const caption = document.getElementById("modal-caption");

        modal.style.display = "flex";
        modalImg.src = imageSrc;
        caption.textContent = captionText;
    };

    window.closeModal = function() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    };

    // Lista de deseos - Guardar en Local Storage
    function loadWishlist() {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
        document.querySelectorAll(".wishlist-item").forEach(item => {
            item.checked = !!savedWishlist[item.dataset.id];
        });
    }

    function saveWishlist() {
        const wishlist = {};
        document.querySelectorAll(".wishlist-item").forEach(item => {
            wishlist[item.dataset.id] = item.checked;
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    loadWishlist();

    document.querySelectorAll(".wishlist-item").forEach(item => {
        item.addEventListener("change", saveWishlist);
    });

    // Funcionalidad de expansión y contracción para las categorías de la lista de deseos
    const categoryTitles = document.querySelectorAll("#bucket-list h3");

    categoryTitles.forEach(title => {
        title.addEventListener("click", () => {
            const list = title.nextElementSibling;

            if (list.style.display === "none" || list.style.display === "") {
                list.style.display = "block";
            } else {
                list.style.display = "none";
            }
        });
    });

    // Mostrar todas las preguntas al inicio
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.classList.remove('hidden');
    });

    // Respuestas correctas para cada pregunta
    const correctAnswers = {
        'question1': 'artes y ciencias',
        'question2': 'moraira',
        'question3': ['ezequiel', 'apolo', 'camila']
    };

    let correctAnswersCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Función para verificar la respuesta
    function checkAnswer(questionId) {
        const input = document.getElementById(questionId);
        const answer = input.value.trim().toLowerCase();
        
        let isCorrect = false;
        if (questionId === 'question3') {
            isCorrect = correctAnswers[questionId].includes(answer);
        } else {
            isCorrect = answer === correctAnswers[questionId];
        }
        
        if (isCorrect) {
            input.style.backgroundColor = '#e8f5e9';
            input.disabled = true;
            correctAnswersCount++;
            
            // Si todas las preguntas están correctas
            if (correctAnswersCount === totalQuestions) {
                setTimeout(() => {
                    // Ocultar la sección de preguntas
                    const quizSection = document.getElementById('quiz');
                    quizSection.style.transition = 'opacity 0.5s ease';
                    quizSection.style.opacity = '0';
                    
                    setTimeout(() => {
                        quizSection.style.display = 'none';
                        unlockLetter();
                    }, 500);
                }, 500);
            }
        } else {
            input.style.backgroundColor = '#ffebee';
            setTimeout(() => {
                input.style.backgroundColor = '';
            }, 1000);
        }
    }

    // Función para desbloquear la carta
    function unlockLetter() {
        const letter = document.getElementById('letter');
        letter.style.display = 'block';
        
        // Reiniciar las animaciones de cada parte
        const parts = document.querySelectorAll('.letter-part');
        parts.forEach(part => {
            part.style.animation = 'none';
            part.offsetHeight; // Forzar un reflow
            part.style.animation = null;
        });
    }

    // Inicializar los eventos de los botones
    const buttons = document.querySelectorAll('.submit-answer');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const questionId = button.getAttribute('data-question');
            checkAnswer(questionId);
        });
    });

    // Permitir enviar respuesta con Enter
    const inputs = document.querySelectorAll('.answer-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const questionId = input.id;
                checkAnswer(questionId);
            }
        });
    });
});
