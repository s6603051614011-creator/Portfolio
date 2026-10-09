// Marks an element `data-offscreen` while it's out of view; styles.css pauses every CSS
// animation inside it then. For the loops that would otherwise run forever (scan lines,
// blinking carets) so they cost nothing while you're reading another part of the page.
import { useEffect } from 'react'

export default function usePauseOffscreen(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([e]) => { el.toggleAttribute('data-offscreen', !e.isIntersecting) },
      { rootMargin: '100px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
