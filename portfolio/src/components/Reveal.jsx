// Lines that slide up from behind a mask, one after another — the type equivalent
// of a page being turned. Plays on mount (`immediate`) or the first time it scrolls into view.
// Styling: .rl-mask / .rl-line in styles.css.
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const EASE = [0.2, 0.7, 0.1, 1]

export function RevealLines({ lines, as: Tag = 'h2', className = '', delay = 0, stagger = 0.09, immediate = false }) {
  // Watch the heading, not the lines: a line parked below its mask is clipped
  // to nothing, so it would never count as "in view" by itself.
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const shown = immediate || inView

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="rl-mask" key={i}>
          <motion.span
            className="rl-line"
            initial={{ y: '108%' }}
            animate={{ y: shown ? 0 : '108%' }}
            transition={{ duration: 0.95, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Plain fade-and-rise for blocks of copy
export function FadeUp({ as = 'div', children, className = '', delay = 0, y = 24, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
