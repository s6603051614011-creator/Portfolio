// Small label text that "decrypts" itself: letters cycle through random glyphs,
// then lock in left to right. Plays once when it scrolls into view, and again on hover.
// Screen readers only ever get the real text.
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*+=?'
const STEP_MS = 32

export default function Scramble({ text, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reduce = useReducedMotion()
  const [out, setOut] = useState(text)
  const timer = useRef(null)

  const run = () => {
    if (reduce) return
    clearInterval(timer.current)
    let frame = 0
    const total = text.length * 1.6 + 6
    timer.current = setInterval(() => {
      frame++
      const locked = Math.floor((frame / total) * text.length * 1.15)
      setOut(
        [...text].map((ch, i) => {
          if (ch === ' ' || i < locked) return ch
          return GLYPHS[(Math.random() * GLYPHS.length) | 0]
        }).join('')
      )
      if (locked >= text.length) { clearInterval(timer.current); setOut(text) }
    }, STEP_MS)
  }

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(run, delay * 1000)
    return () => clearTimeout(t)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => clearInterval(timer.current), [])

  return (
    <span ref={ref} className={`scramble ${className}`} onMouseEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  )
}
