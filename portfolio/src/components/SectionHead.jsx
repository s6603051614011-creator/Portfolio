// Opening of each "article": a running head (number, name, page) over a rule that
// draws across, then the title rising in line by line.
import { motion } from 'framer-motion'
import { RevealLines, EASE } from './Reveal.jsx'
import './SectionHead.css'

export default function SectionHead({ no, label, page, title, aside = null }) {
  return (
    <header className="sh">
      <div className="sh-meta mono">
        <span>{no} — {label}</span>
        <span>p. {page}</span>
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
