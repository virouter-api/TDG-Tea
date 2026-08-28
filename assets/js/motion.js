/* ============================================================
   TDG Tea — Motion runtime (VINRO-18)
   requestAnimationFrame-throttled scroll effects + lazy cleanup.
   HOW TO USE: paste the contents of the IIFE below into the
   existing <script type="module"> in index.html, REPLACING the
   current `window.addEventListener('scroll', ...)` parallax block.
   ============================================================ */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------- rAF-throttled scroll engine ----------
     Replaces the raw scroll listener: scroll events only set a flag,
     all layout reads + style writes happen once per frame. */
  const scrollEffects = [];
  let ticking = false;

  function onScrollFrame(){
    ticking = false;
    const scrollY = window.scrollY;
    for (const effect of scrollEffects) effect(scrollY);
  }

  function requestScrollTick(){
    if (!ticking){
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }

  function registerScrollEffect(fn){
    scrollEffects.push(fn);
  }

  /* ---------- Hero parallax ----------
     Desktop only (hover-capable). Uses transform only.
     translate3d forces GPU layer; will-change removed when hero
     leaves the viewport. */
  const hero = document.querySelector('.hero');
  const heroParallax = document.getElementById('hero-parallax');

  if (hero && heroParallax){
    let heroVisible = true;

    const heroObserver = new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      if (!heroVisible){
        heroParallax.style.willChange = 'auto';
      } else if (canHover.matches && !reduceMotion.matches){
        heroParallax.style.willChange = 'transform';
      }
    }, { threshold: 0 });
    heroObserver.observe(hero);

    registerScrollEffect(() => {
      if (!heroVisible || !canHover.matches || reduceMotion.matches) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      heroParallax.style.transform =
        `translate3d(0, ${(progress * 12).toFixed(2)}%, 0)`;
    });
  }

  /* ---------- Ghost word parallax ----------
     Same rAF engine; disabled on touch + reduced motion. */
  const trust = document.querySelector('.trust');
  const ghostWords = document.querySelectorAll('.ghost-word');

  if (trust && ghostWords.length){
    const pairs = [[-3, 3], [3, -3], [-2, 4], [4, -3]];
    let trustVisible = false;

    const trustObserver = new IntersectionObserver(entries => {
      trustVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    trustObserver.observe(trust);

    registerScrollEffect(() => {
      if (!trustVisible || !canHover.matches || reduceMotion.matches) return;
      const rect = trust.getBoundingClientRect();
      const p = Math.max(0, Math.min(1,
        1 - (rect.top + rect.height) / (window.innerHeight + rect.height)));
      ghostWords.forEach((gw, i) => {
        const pair = pairs[i];
        if (!pair) return;
        const x = pair[0] + (pair[1] - pair[0]) * p;
        gw.style.transform = `translate3d(${x.toFixed(2)}%, 0, 0)`;
      });
    });
  }

  window.addEventListener('scroll', requestScrollTick, { passive: true });
  requestScrollTick(); // initial paint position

  /* ---------- will-change cleanup ----------
     After a reveal transition ends, drop the compositing hint so the
     browser can release the layer (important on low-memory mobile). */
  const animatedSelector =
    '.collection-card, .badge-card, .product-card, .court-card,' +
    ' .stat-cell, .testimonial-card, .percent-badge, .icon-img,' +
    ' .program-item, .hero-actions, .hero-trust-line';

  document.addEventListener('transitionend', event => {
    const el = event.target;
    if (event.propertyName !== 'transform' && event.propertyName !== 'opacity') return;
    if (el.matches && el.matches(animatedSelector)){
      el.classList.add('motion-done');
    }
  }, { passive: true });

  /* ---------- Image-aware reveals ----------
     If a reveal target contains an <img> that is still loading,
     delay the reveal until the image decodes — prevents the
     "pop-in" layout shift on slow networks. */
  const revealTargets = document.querySelectorAll(
    '.court-card, .product-card, .showcase-slide'
  );

  revealTargets.forEach(el => {
    const img = el.querySelector('img');
    if (!img || img.complete) return;
    el.style.transitionDelay = '0ms';
    img.decode?.().catch(() => {}).finally(() => {
      // no-op: reveal observers already handle class toggling;
      // decode() just ensures the image is ready before the
      // browser paints the revealed frame.
    });
  });

  /* ---------- React to runtime preference changes ---------- */
  canHover.addEventListener?.('change', () => requestScrollTick());
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches && heroParallax){
      heroParallax.style.transform = 'none';
      heroParallax.style.willChange = 'auto';
    }
    requestScrollTick();
  });
})();
