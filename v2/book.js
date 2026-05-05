/* ════════════════════════════════════════════════════════════
   BOOK.JS — Navigation, Transitions, Keyboard, Fullscreen
   Habitat & Decor Book Profesional 2026
   ════════════════════════════════════════════════════════════ */

// ════ CONFIGURACIÓN GLOBAL ════
const TOTAL = 19;
let current = 1;
let isAnimating = false;

// ════ ELEMENTOS DOM ════
const slides = document.querySelectorAll('.slide');
const progressFill = document.getElementById('progress-fill');
const slideCurrent = document.getElementById('slide-current');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnFullscreen = document.getElementById('btn-fullscreen');
const stage = document.querySelector('.slide-stage');

// ════ NAVEGACIÓN ════
function goTo(target, direction = 'next') {
  if (isAnimating || target < 1 || target > TOTAL || target === current) return;
  
  isAnimating = true;
  
  const exitClass = direction === 'next' ? 'slide--exit-left' : 'slide--exit-right';
  const currentSlide = slides[current - 1];
  const nextSlide = slides[target - 1];
  
  // Salida
  currentSlide.classList.add(exitClass);
  
  setTimeout(() => {
    currentSlide.classList.remove('slide--active', exitClass);
    nextSlide.classList.add('slide--active');
    
    current = target;
    updateUI();
    
    setTimeout(() => {
      isAnimating = false;
    }, 450);
  }, 450);
}

function updateUI() {
  const progress = (current / TOTAL) * 100;
  progressFill.style.width = `${progress}%`;
  slideCurrent.textContent = current;
  
  btnPrev.disabled = current === 1;
  btnNext.disabled = current === TOTAL;
}

function next() {
  if (current < TOTAL) goTo(current + 1, 'next');
}

function prev() {
  if (current > 1) goTo(current - 1, 'prev');
}

// ════ ESCALA DE VIEWPORT ════
function scaleStage() {
  const wrapper = document.querySelector('.slide-wrapper');
  const wrapperWidth = wrapper.clientWidth;
  const wrapperHeight = wrapper.clientHeight;
  
  const scaleX = wrapperWidth / 1920;
  const scaleY = wrapperHeight / 1358; /* A4 landscape */
  const scale = Math.min(scaleX, scaleY);
  
  stage.style.transform = `scale(${scale})`;
}

// ════ PANTALLA COMPLETA ════
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error('Error al entrar en pantalla completa:', err);
    });
  } else {
    document.exitFullscreen();
  }
}

// ════ TECLADO ════
document.addEventListener('keydown', (e) => {
  if (isAnimating) return;
  
  switch(e.key) {
    case 'ArrowRight':
    case ' ':
    case 'PageDown':
      e.preventDefault();
      next();
      break;
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault();
      prev();
      break;
    case 'Home':
      e.preventDefault();
      goTo(1, 'prev');
      break;
    case 'End':
      e.preventDefault();
      goTo(TOTAL, 'next');
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      toggleFullscreen();
      break;
  }
});

// ════ EVENTOS DE BOTONES ════
btnNext.addEventListener('click', next);
btnPrev.addEventListener('click', prev);
btnFullscreen.addEventListener('click', toggleFullscreen);

// ════ SWIPE (MÓVIL) ════
let touchStartX = 0;
let touchEndX = 0;

stage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

stage.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) < swipeThreshold) return;
  
  if (diff > 0) {
    next(); // Swipe izquierda = siguiente
  } else {
    prev(); // Swipe derecha = anterior
  }
}

// ════ RESIZE ════
window.addEventListener('resize', scaleStage);
window.addEventListener('fullscreenchange', scaleStage);

// ════ INIT ════
scaleStage();
updateUI();

// Inicializar primer slide como activo
slides[0].classList.add('slide--active');
slides[0].style.opacity = '1';
slides[0].style.pointerEvents = 'auto';

// ════ EXPORTAR goTo PARA ONCLICK ════
window.goTo = goTo;
