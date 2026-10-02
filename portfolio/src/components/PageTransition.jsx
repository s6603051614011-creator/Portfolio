// Page change: an ink curtain rises from the bottom to cover the old page,
// then lifts off the top to show the new one. Used inside <AnimatePresence mode="wait">.
import { motion } from 'framer-motion'
import { EASE } from './Reveal.jsx'
import { issue } from '../content.js'

const SWEEP = [0.76, 0, 0.24, 1]

export default function PageTransition({ children }) {
  return (
    <>
      {children}
      {/* Covers the old page on the way out */}
      <motion.div
        className="curtain"
        aria-hidden="true"
        style={{ originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: SWEEP }}
      />
      {/* Lifts off the new page on the way in */}
      <motion.div
        className="curtain"
        aria-hidden="true"
        style={{ originY: 0 }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: SWEEP, delay: 0.15 }}
      >
        <motion.span
          className="curtain-label"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {issue.title} — No. {issue.no}
        </motion.span>
      </motion.div>
    </>
  )
}
