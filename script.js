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

// ===== Lightbox galerie (clic = plein écran, navigation flèches / swipe) =====
const galleryImgs = [...document.querySelectorAll('.gallery img')];
if (galleryImgs.length) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lightbox__close" aria-label="Fermer">&times;</button>' +
    '<span class="lightbox__counter"></span>' +
    '<button class="lightbox__nav lightbox__prev" aria-label="Précédent">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lightbox__nav lightbox__next" aria-label="Suivant">&#8250;</button>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const counter = lb.querySelector('.lightbox__counter');
  let idx = 0;

  const show = (i) => {
    idx = (i + galleryImgs.length) % galleryImgs.length;
    const src = galleryImgs[idx];
    lbImg.src = src.currentSrc || src.src;
    lbImg.alt = src.alt || '';
    counter.textContent = (idx + 1) + ' / ' + galleryImgs.length;
  };
  const open = (i) => { show(i); lb.classList.add('is-open'); };
  const close = () => lb.classList.remove('is-open');

  galleryImgs.forEach((img, i) => img.addEventListener('click', () => open(i)));
  lb.querySelector('.lightbox__close').addEventListener('click', (e) => { e.stopPropagation(); close(); });
  lb.querySelector('.lightbox__prev').addEventListener('click', (e) => { e.stopPropagation(); show(idx - 1); });
  lb.querySelector('.lightbox__next').addEventListener('click', (e) => { e.stopPropagation(); show(idx + 1); });
  lbImg.addEventListener('click', (e) => e.stopPropagation());
  lb.addEventListener('click', close); // clic sur le fond = fermer

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });

  // swipe tactile
  let sx = null;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    sx = null;
  });
}
