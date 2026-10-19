/**
 * Scroll-reveal action: hides the element until it enters the viewport, then
 * fades/slides it in (see `.reveal` in src/app.css).
 *
 * The hidden state is only ever applied from JS, so prerendered content stays
 * fully visible without JavaScript — and visitors who prefer reduced motion
 * never get anything hidden in the first place.
 *
 * @type {import('svelte/action').Action<HTMLElement, number | undefined>}
 * @param {HTMLElement} node
 * @param {number} [delay] transition delay in ms (for staggering siblings)
 */
export function reveal(node, delay = 0) {
  if (typeof window === 'undefined') return {};
  if (!('IntersectionObserver' in window)) return {};
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return {};

  if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);
  node.classList.add('reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    },
    // Start animating just before the element reaches the bottom edge.
    { rootMargin: '0px 0px -40px 0px' }
  );
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}