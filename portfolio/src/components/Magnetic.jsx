// Leans its child a little towards the cursor, then springs back when the cursor leaves.
import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'framer-motion'

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 }

export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)

  const onMove = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.span ref={ref} className="magnetic" style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.span>
  )
}
