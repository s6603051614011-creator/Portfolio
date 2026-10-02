// Smooth, slightly weighted scrolling (Lenis). It still moves the real page scroll,
// so framer-motion's useScroll / whileInView keep working untouched.
// Skipped entirely for visitors who ask for reduced motion; touch devices keep native scrolling.
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let lenis = null

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function startSmoothScroll() {
  if (lenis || reduced()) return () => {}
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
  let raf = requestAnimationFrame(function loop(t) {
    lenis?.raf(t)
    raf = requestAnimationFrame(loop)
  })
  return () => {
    cancelAnimationFrame(raf)
    lenis?.destroy()
    lenis = null
  }
}

// Scroll to an element or a y position, smoothly when allowed
export function scrollToTarget(target, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : -72, duration: 1.4 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate || reduced() ? 'auto' : 'smooth' })
  else target?.scrollIntoView({ behavior: immediate || reduced() ? 'auto' : 'smooth', block: 'start' })
}

// Freeze scrolling while an overlay (mobile menu) is open
export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.body.style.overflow = locked ? 'hidden' : ''
}
