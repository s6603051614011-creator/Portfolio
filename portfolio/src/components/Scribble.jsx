// Pen marks with deliberately uneven curves (an underline, a loose circle) that
// draw themselves in when scrolled to. Put inside a .scribble-wrap around the words.
import { motion } from 'framer-motion'

const SHAPES = {
  underline: {
    viewBox: '0 0 300 24',
    d: 'M4 15 C 52 9, 101 6, 152 8 C 199 10, 238 13, 296 7',
    width: 2.4,
  },
  circle: {
    viewBox: '0 0 240 100',
    d: 'M138 9 C 82 3, 17 14, 9 47 C 2 80, 72 94, 137 91 C 197 88, 236 69, 231 41 C 226 15, 172 3, 102 13',
    width: 1.8,
  },
}

export default function Scribble({ shape = 'underline', delay = 0.2, immediate = false }) {
  const s = SHAPES[shape]
  const play = immediate
    ? { animate: { pathLength: 1 } }
    : { whileInView: { pathLength: 1 }, viewport: { once: true, amount: 1 } }

  return (
    <svg className={`scribble scribble-${shape}`} viewBox={s.viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true">
      <motion.path
        d={s.d}
        stroke="currentColor"
        strokeWidth={s.width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        {...play}
        transition={{ duration: 0.9, ease: 'easeInOut', delay }}
      />
    </svg>
  )
}
