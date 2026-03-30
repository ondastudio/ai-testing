export function useScrollReveal() {
  const observe = (el: HTMLElement | { $el?: HTMLElement } | null, delay = 0) => {
    // Template refs on Vue components give the instance, not the DOM element — unwrap if needed
    const domEl: HTMLElement | null = el && '$el' in el ? (el.$el ?? null) : (el as HTMLElement | null)
    if (!domEl) return

    domEl.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(domEl)
  }

  // Split an element's text into per-word spans and stagger their reveal
  const observeWords = (el: HTMLElement | null, baseDelay = 0, stagger = 55) => {
    if (!el) return

    const words = (el.textContent || '').trim().split(/\s+/)
    el.innerHTML = words
      .map(w => `<span class="rv-word"><span class="rv-word-inner">${w}</span></span>`)
      .join(' ')

    el.querySelectorAll<HTMLElement>('.rv-word-inner').forEach((span, i) => {
      observe(span, baseDelay + i * stagger)
    })
  }

  return { observe, observeWords }
}
