// 04 — Toolkit: set like the index at the back of a book, with a note in the margin
// (circled in pen) for what's being learned right now.
import { motion } from 'framer-motion'
import { learning, skills } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import { EASE, FadeUp } from '../components/Reveal.jsx'
import Scribble from '../components/Scribble.jsx'
import Scramble from '../components/Scramble.jsx'
import './Toolkit.css'

const list = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function Toolkit() {
  return (
    <section id="skills" className="section is-tight container">
      <SectionHead
        no="04" label="Toolkit" page="15" shift="right"
        title={['What I', <em key="w">work with<span className="accent">.</span></em>]}
      />
      <div className="kit">
        {skills.map((s) => (
          <div key={s.group} className="kit-col">
            <h3 className="kit-group mono">
              <Scramble text={s.group} /> <span>({String(s.items.length).padStart(2, '0')})</span>
            </h3>
            <motion.ul variants={list} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.4 }}>
              {s.items.map((i) => <motion.li key={i} variants={item}>{i}</motion.li>)}
            </motion.ul>
          </div>
        ))}

        <FadeUp as="aside" delay={0.3} className="kit-note" aria-label="Currently learning">
          <p className="kit-note-label hand">
            <span className="scribble-wrap">currently learning<Scribble shape="circle" delay={0.5} /></span>
          </p>
          <ul>{learning.map((l) => <li key={l}>{l}</li>)}</ul>
        </FadeUp>
      </div>
    </section>
  )
}
