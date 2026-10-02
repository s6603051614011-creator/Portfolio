// A quote that "inks in" word by word as you scroll past it.
// Scroll-linked styles ignore MotionConfig, so reduced motion is checked here.
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <><motion.span style={{ opacity }}>{children}</motion.span>{' '}</>
}

export default function ScrollWords({ text, as: Tag = 'p', className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {reduce
        ? text
        : words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
        ))}
    </Tag>
  )
}
