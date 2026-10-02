// 03 — Experience: dates sit in the margin, each entry ruled off as it scrolls in.
import { motion } from 'framer-motion'
import { experience } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import { EASE, FadeUp } from '../components/Reveal.jsx'
import Todo from '../components/Todo.jsx'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section container">
      <SectionHead
        no="03" label="Experience" page="12"
        title={['Where I’m', <em key="l">learning<span className="accent">.</span></em>]}
      />
      <ol className="xp">
        {experience.map((e, i) => (
          <li key={e.role} className="xp-row">
            <motion.span
              className="xp-rule"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
            />
            <FadeUp as="span" className="xp-period mono"><Todo>{e.period}</Todo></FadeUp>
            <FadeUp delay={0.08} className="xp-body">
              <h3 className="xp-role display">{e.role}</h3>
              <p className="xp-org">{e.org}</p>
              <p className="xp-note"><Todo>{e.note}</Todo></p>
            </FadeUp>
          </li>
        ))}
      </ol>
    </section>
  )
}
