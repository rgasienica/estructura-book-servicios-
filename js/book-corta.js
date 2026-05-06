/* ════════════════════════════════════════════════════════════
   BOOK-CORTA.JS — Navigation, Transitions, Keyboard, Fullscreen
   Habitat & Decor Book Profesional 2026 — Versión Corta
   ════════════════════════════════════════════════════════════ */

// ════ CONFIGURACIÓN GLOBAL ════
const TOTAL = 11;
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

// ════ ESCALA DEL STAGE ════
function scaleStage() {
  const stageRect = stage.getBoundingClientRect();
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY);
  
  stage.style.transform = `scale(${scale})`;
  stage.style.transformOrigin = 'top left';
}

// ════ PANTALLA COMPLETA ════
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      setTimeout(scaleStage, 100);
    });
  } else {
    document.exitFullscreen().then(() => {
      setTimeout(scaleStage, 100);
    });
  }
}

// ════ EVENTOS ════
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  scaleStage();
  
  // Navegación por teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goTo(current - 1, 'prev');
    } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      goTo(current + 1, 'next');
    } else if (e.key === 'Home') {
      goTo(1, 'prev');
    } else if (e.key === 'End') {
      goTo(TOTAL, 'next');
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });
  
  // Botones
  btnPrev.addEventListener('click', () => goTo(current - 1, 'prev'));
  btnNext.addEventListener('click', () => goTo(current + 1, 'next'));
  btnFullscreen.addEventListener('click', toggleFullscreen);
  
  // Resize
  window.addEventListener('resize', scaleStage);
  
  // Fullscreen change
  document.addEventListener('fullscreenchange', scaleStage);
  
  // Swipe en móviles
  let startX = 0;
  let startY = 0;
  
  stage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  stage.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goTo(current + 1, 'next');
      } else {
        goTo(current - 1, 'prev');
      }
    }
    
    startX = 0;
    startY = 0;
  });
});

// ════ EXPOSICIÓN GLOBAL ════
window.goTo = goTo;