// Opening of each "article": a running head (number, name, page) over a rule that
// draws across, then the title rising in line by line.
import { motion } from 'framer-motion'
import { RevealLines, EASE } from './Reveal.jsx'
import Scramble from './Scramble.jsx'
import './SectionHead.css'

// `shift` nudges the title off the left edge ("indent" or "right") so section openings don't all line up
export default function SectionHead({ no, label, page, title, aside = null, shift = '' }) {
  return (
    <header className={`sh${shift ? ` sh-${shift}` : ''}`}>
      <div className="sh-meta mono">
        <Scramble text={`${no} — ${label}`} />
        <Scramble text={`p. ${page}`} delay={0.15} />
        <motion.span
          className="sh-rule"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>
      <div className="sh-row">
        <RevealLines className="sh-title display" lines={title} />
        {aside}
      </div>
    </header>
  )
}
