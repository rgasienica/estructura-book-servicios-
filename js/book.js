/* =============================================
   BOOK.JS — Navegación, escala, fullscreen, swipe
   Habitat & Decor · Book Profesional 2026
   ============================================= */

(function () {
  'use strict';

  const TOTAL = 19;
  let current = 1;
  let isAnimating = false;
  let touchStartX = 0;
  let touchStartY = 0;

  // ── Elementos DOM ──────────────────────────

  const stage      = document.querySelector('.slide-stage');
  const prevBtn    = document.getElementById('btn-prev');
  const nextBtn    = document.getElementById('btn-next');
  const counterEl  = document.getElementById('slide-current');
  const progressEl = document.getElementById('progress-fill');
  const fsBtn      = document.getElementById('btn-fullscreen');

  // ── Escalado del stage al viewport ──────────

  function scaleStage() {
    if (!stage) return;
    const scaleX = window.innerWidth  / 1920;
    const scaleY = window.innerHeight / 1080;
    const scale  = Math.min(scaleX, scaleY);

    const scaledW = Math.round(1920 * scale);
    const scaledH = Math.round(1080 * scale);
    const offsetX = Math.round((window.innerWidth  - scaledW) / 2);
    const offsetY = Math.round((window.innerHeight - scaledH) / 2);

    stage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  window.addEventListener('resize', scaleStage);
  scaleStage();

  // ── Navegación ────────────────────────────

  function goTo(target, direction) {
    if (isAnimating) return;
    if (target < 1 || target > TOTAL) return;

    const fromSlide = document.querySelector('.slide--active');
    const toSlide   = document.querySelector(`.slide-${target}`);

    if (!fromSlide || !toSlide || fromSlide === toSlide) return;

    isAnimating = true;

    // Dirección de la animación
    const exitClass  = direction === 'next' ? 'slide--exit-left' : 'slide--exit-right';
    const enterFrom  = direction === 'next' ? 80 : -80;

    toSlide.style.transform = `translateX(${enterFrom}px)`;
    toSlide.style.opacity   = '0';
    toSlide.style.pointerEvents = 'none';

    requestAnimationFrame(() => {
      fromSlide.classList.remove('slide--active');
      fromSlide.classList.add(exitClass);

      toSlide.style.transition = 'opacity 0.45s cubic-bezier(0,0,.2,1), transform 0.45s cubic-bezier(0,0,.2,1)';
      toSlide.style.transform  = 'translateX(0)';
      toSlide.style.opacity    = '1';
      toSlide.style.pointerEvents = 'auto';
      toSlide.classList.add('slide--active');

      current = target;
      updateUI();

      setTimeout(() => {
        fromSlide.classList.remove(exitClass);
        fromSlide.style.transform = '';
        fromSlide.style.opacity   = '';
        toSlide.style.transition  = '';
        isAnimating = false;
      }, 480);
    });
  }

  function next() { goTo(current + 1, 'next'); }
  function prev() { goTo(current - 1, 'prev'); }

  // Expuesto globalmente para los onclick del slide de menú
  window.goTo = goTo;

  // ── Actualizar UI ─────────────────────────

  function updateUI() {
    if (counterEl)  counterEl.textContent = current;
    if (progressEl) progressEl.style.width = ((current / TOTAL) * 100) + '%';
    if (prevBtn)    prevBtn.disabled = current === 1;
    if (nextBtn)    nextBtn.disabled = current === TOTAL;
  }

  // ── Eventos de navegación ─────────────────

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  // Keyboard
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'Escape':
        // Handled by browser for fullscreen
        break;
      case 'Home':
        e.preventDefault();
        goTo(1, 'prev');
        break;
      case 'End':
        e.preventDefault();
        goTo(TOTAL, 'next');
        break;
    }
  });

  // Touch / Swipe
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

  // Click en zonas laterales del stage
  if (stage) {
    stage.addEventListener('click', (e) => {
      // Ignorar si el click es sobre los controles
      if (e.target.closest('.slide-controls') || e.target.closest('.fullscreen-btn')) return;

      const rect = stage.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const third = rect.width / 3;

      if (relX < third) {
        prev();
      } else if (relX > third * 2) {
        next();
      }
    });
  }

  // ── Pantalla completa ─────────────────────

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', () => {
    if (fsBtn) {
      fsBtn.textContent = document.fullscreenElement ? '✕' : '⛶';
      fsBtn.title = document.fullscreenElement
        ? 'Salir de pantalla completa (Esc)'
        : 'Pantalla completa (F)';
    }
    // Re-escalar tras cambio de fullscreen
    setTimeout(scaleStage, 100);
  });

  // ── Inicialización ────────────────────────

  // Mostrar primer slide y corregir índices
  const allSlides = document.querySelectorAll('.slide-stage .slide');
  allSlides.forEach((s, i) => {
    s.classList.remove('slide--active', 'slide--exit-left', 'slide--exit-right');
    s.style.transform = '';
    s.style.opacity   = '';
    s.style.transition = '';
    s.style.pointerEvents = i === 0 ? 'auto' : 'none';
    if (i === 0) s.classList.add('slide--active');
  });

  updateUI();

})();
