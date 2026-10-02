// 03 — Experience: printed on a slightly darker band, dates in the margin,
// and a thin line down the side that fills in as you read through the entries.
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import { EASE, FadeUp } from '../components/Reveal.jsx'
import Todo from '../components/Todo.jsx'
import './Experience.css'

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section id="experience" className="section band">
      <div className="container">
        <SectionHead
          no="03" label="Experience" page="12"
          title={['Where I’ve', <em key="l">been learning<span className="accent">.</span></em>]}
        />
        <div className="xp-wrap" ref={listRef}>
          <motion.span className="xp-progress" style={{ scaleY: fill }} aria-hidden="true" />
          <ol className="xp">
            {experience.map((e, i) => (
              <li key={e.role} className="xp-row">
                <motion.span
                  className="xp-rule"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                />
                <FadeUp as="span" className="xp-period mono"><Todo>{e.period}</Todo></FadeUp>
                <FadeUp delay={0.08} className="xp-body" style={{ marginLeft: i % 2 ? '4%' : 0 }}>
                  <h3 className="xp-role display">{e.role}</h3>
                  <p className="xp-org">{e.org}</p>
                  <p className="xp-note"><Todo>{e.note}</Todo></p>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
