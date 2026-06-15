// ===== Header : fond au scroll =====
const header = document.getElementById('header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== Comparateur avant / après (drag + survol) =====
document.querySelectorAll('.ba').forEach((ba) => {
  const setPos = (clientX) => {
    const r = ba.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    ba.style.setProperty('--pos', p + '%');
  };
  ba.addEventListener('pointermove', (e) => setPos(e.clientX));
  ba.addEventListener('pointerdown', (e) => setPos(e.clientX));
});

// ===== Lightbox galerie (clic = image en grand) =====
const galleryImgs = document.querySelectorAll('.gallery img');
if (galleryImgs.length) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lightbox__close" aria-label="Fermer">&times;</button><img alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const close = () => lb.classList.remove('is-open');

  galleryImgs.forEach((img) => {
    img.addEventListener('click', () => {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      lb.classList.add('is-open');
    });
  });
  lb.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
