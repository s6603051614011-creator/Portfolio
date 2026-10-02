// 01 — About: portrait on a block of the accent colour, copy with a drop cap,
// facts as a ruled table, then a pull quote that inks in as you scroll.
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { about, profile } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import ScrollWords from '../components/ScrollWords.jsx'
import { FadeUp } from '../components/Reveal.jsx'
import Todo from '../components/Todo.jsx'
import './About.css'

// Portrait drifts a little slower than the page while you read past it
function Portrait() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div ref={ref} className="about-figure-wrap" style={reduce ? undefined : { y }}>
      <FadeUp as="figure" className="about-figure">
        <span className="tape tape-corner" aria-hidden="true" />
        <div className="about-photo">
          <img src={profile.photoSide} alt={`Portrait of ${profile.name}`} width="500" height="500" loading="lazy" />
        </div>
        <figcaption className="hand">{about.photoCaption}</figcaption>
      </FadeUp>
    </motion.div>
  )
}

export default function About() {
  const [h1, h2] = about.heading
  return (
    <section id="about" className="section is-loose container">
      <SectionHead
        no="01" label="About" page="03" shift="indent"
        title={[h1, <em key="h2">{h2.replace(/\.$/, '')}<span className="accent">.</span></em>]}
      />

      <div className="about-grid">
        <Portrait />

        <div className="about-body">
          {about.paragraphs.map((p, i) => (
            <FadeUp as="p" key={p} delay={i * 0.1} className={`about-p${i === 0 ? ' dropcap' : ''}`}>
              <Todo>{p}</Todo>
            </FadeUp>
          ))}
          <FadeUp as="dl" delay={0.2} className="about-facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>

      <figure className="pull">
        <ScrollWords as="blockquote" className="pull-quote display" text={about.pullQuote} />
        <figcaption className="mono">— {profile.name}</figcaption>
      </figure>
    </section>
  )
}
