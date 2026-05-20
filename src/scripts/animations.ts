// Fade-up animation on scroll using Intersection Observer — bidirectional
export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -10px 0px' }
  );
  elements.forEach((el) => observer.observe(el));
}

// Staggered children animation
export function initStaggerAnimations() {
  const containers = document.querySelectorAll('[data-stagger]');
  containers.forEach((container) => {
    const children = container.querySelectorAll('[data-stagger-item]');
    children.forEach((child, i) => {
      (child as HTMLElement).style.transitionDelay = `${i * 100}ms`;
    });
  });
}

// Hero immediate animations — fire on load without IntersectionObserver
export function initHeroAnimations() {
  const immediateEls = document.querySelectorAll('[data-animate-immediate]');
  immediateEls.forEach((el) => {
    const delay = parseFloat((el as HTMLElement).dataset.delay || '0');
    setTimeout(() => {
      el.classList.add('animate-in');
    }, delay * 1000);
  });
}

// Subtle wave drift for decorative blob SVGs — gentle floating motion
export function initBlobDrift() {
  const blobs = document.querySelectorAll('[data-blob-drift]');
  blobs.forEach((blob) => {
    const el = blob as HTMLElement;
    // Pick a random duration between 8-14s and a small Y offset
    const duration = 8 + Math.random() * 6;
    const yOffset = 6 + Math.random() * 10;
    el.style.animation = `blob-drift ${duration}s ease-in-out infinite alternate`;
    el.style.setProperty('--blob-drift-y', `${yOffset}px`);
  });
}

// Subtle wiggle on hover — applied to elements with [data-wiggle]
export function initWiggleHover() {
  const wiggleEls = document.querySelectorAll('[data-wiggle]');
  wiggleEls.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      el.classList.add('wiggle-active');
    });
    el.addEventListener('animationend', () => {
      el.classList.remove('wiggle-active');
    });
  });
}
