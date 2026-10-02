// 03 — Experience: printed on a slightly darker band, split into two columns —
// work on one side, schooling on the other. Each has a thin line down its edge
// that fills in as you read through the entries.
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { education, experience } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import { EASE, FadeUp } from '../components/Reveal.jsx'
import Scramble from '../components/Scramble.jsx'
import Todo from '../components/Todo.jsx'
import './Experience.css'

function Timeline({ title, entries, delay = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <div className="xp-col">
      <h3 className="xp-head mono">
        <Scramble text={title} delay={delay} />
        <span>{String(entries.length).padStart(2, '0')}</span>
      </h3>
      <div className="xp-wrap" ref={ref}>
        <motion.span className="xp-progress" style={{ scaleY: fill }} aria-hidden="true" />
        <ol className="xp">
          {entries.map((e) => (
            <li key={e.role} className="xp-row">
              <motion.span
                className="xp-rule"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 + delay }}
              />
              <FadeUp as="span" delay={delay} className="xp-period mono"><Todo>{e.period}</Todo></FadeUp>
              <FadeUp delay={0.08 + delay} className="xp-body">
                <h4 className="xp-role display">{e.role}</h4>
                <p className="xp-org">{e.org}</p>
                {e.note && <p className="xp-note"><Todo>{e.note}</Todo></p>}
                {e.points && (
                  <ul className="xp-points">{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                )}
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section band">
      <div className="container">
        <SectionHead
          no="03" label="Experience" page="12"
          title={['Where I’ve', <em key="l">been learning<span className="accent">.</span></em>]}
        />
        <div className="xp-cols">
          <Timeline title="Work & internships" entries={experience} />
          <Timeline title="Education" entries={education} delay={0.15} />
        </div>
      </div>
    </section>
  )
}
