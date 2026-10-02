// Text that un-blurs and drops into place, one letter or word at a time,
// the first time it scrolls into view. Styling lives in .blur-text (styles.css).
import { useEffect, useRef, useState } from 'react'

export default function BlurText({ text, as: Tag = 'span', by = 'letters', delay = 50, startDelay = 0, className = '' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setInView(true)
    // Already on screen at load (e.g. the hero): start right away, don't wait on the observer
    if (el.getBoundingClientRect().top < window.innerHeight) {
      const raf = requestAnimationFrame(() => setInView(true))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const parts = by === 'words' ? text.split(' ') : [...text]

  return (
    <Tag ref={ref} className={`blur-text${inView ? ' is-in' : ''} ${className}`} aria-label={text}>
      {parts.map((part, i) => (
        <span aria-hidden="true" key={i} style={{ transitionDelay: `${startDelay + i * delay}ms` }}>
          {part}
          {by === 'words' && i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
