// 02 — Work: the thesis runs as a full feature spread; everything else is listed
// like a contents page. On mouse devices a small label (or the project image) trails the cursor.
import { useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { featured, profile, projects } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import CountUp from '../components/CountUp.jsx'
import { FadeUp, RevealLines } from '../components/Reveal.jsx'
import Todo from '../components/Todo.jsx'
import Scramble from '../components/Scramble.jsx'
import InvoiceScan from '../components/InvoiceScan.jsx'
import './Work.css'

const external = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

// The plate leans towards the cursor like a card being picked up
function TiltPlate({ children }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 160, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 160, damping: 18 })

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { px.set(0); py.set(0) }

  return (
    <FadeUp className="feature-plate-wrap">
      <motion.div className="feature-plate" style={{ rotateX, rotateY }} onMouseMove={onMove} onMouseLeave={reset}>
        {children}
      </motion.div>
    </FadeUp>
  )
}

function Feature() {
  return (
    <article className="feature">
      <TiltPlate>
        {featured.image
          ? <img src={featured.image} alt={`${featured.title} screenshot`} loading="lazy" />
          : <InvoiceScan />}
      </TiltPlate>

      <div className="feature-body">
        <span className="mono accent">{featured.kicker}</span>
        <RevealLines as="h3" className="feature-title display" lines={[featured.title]} />
        <FadeUp as="p" className="feature-desc">{featured.description}</FadeUp>
        <p className="feature-tags mono">{featured.tags.join(' / ')}</p>
        {featured.metrics?.length > 0 && (
          <dl className="feature-metrics">
            {featured.metrics.map((m) => (
              <div key={m.label}>
                <dd><CountUp value={m.value} /></dd>
                <dt className="mono">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}
        {featured.links?.length > 0 && (
          <div className="feature-links">
            {featured.links.map((l) => (
              <a key={l.label} href={l.href} className="link-line" {...external(l.href)}>{l.label}</a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function ProjectIndex() {
  const ref = useRef(null)
  const [hover, setHover] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.5 })
  const y = useSpring(my, { stiffness: 350, damping: 32, mass: 0.5 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  const hovered = hover === null ? null : projects[hover]
  const current = hovered && (hovered.image || hovered.link) ? hovered : null

  return (
    <div className="index" ref={ref} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <div className="index-head mono">
        <Scramble text="Also in this issue" />
        <Scramble text={`${String(projects.length).padStart(2, '0')} entries`} delay={0.15} />
      </div>
      <ol className="index-list">
        {projects.map((p, i) => {
          // Projects without a link yet still get a row, just not a clickable one
          const Row = p.link ? 'a' : 'div'
          const linkProps = p.link ? { href: p.link.href, ...external(p.link.href) } : {}
          return (
            <FadeUp as="li" key={p.title} delay={i * 0.08}>
              <Row className="index-row" onMouseEnter={() => setHover(i)} {...linkProps}>
                <span className="index-no mono">{String(i + 2).padStart(2, '0')}</span>
                <span className="index-main">
                  <span className="index-title display"><Todo>{p.title}</Todo></span>
                  <span className="index-desc"><Todo>{p.description}</Todo></span>
                  {p.link && <span className="index-cta">{p.link.label} →</span>}
                </span>
                <span className="index-kicker mono"><Todo>{p.kicker}</Todo></span>
              </Row>
            </FadeUp>
          )
        })}
      </ol>
      <motion.div
        className={`index-cursor${current?.image ? ' has-image' : ''}`}
        aria-hidden="true"
        style={{ x, y }}
        animate={{ scale: current ? 1 : 0, opacity: current ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {current && (current.image ? <img src={current.image} alt="" /> : current.link.label)}
      </motion.div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="section container">
      <SectionHead
        no="02" label="Selected work" page="07" shift="right"
        title={['Things I’ve', <em key="b">built<span className="accent">.</span></em>]}
        aside={<a href={profile.github} className="link-line" {...external(profile.github)}>All repositories ↗</a>}
      />
      <Feature />
      <ProjectIndex />
    </section>
  )
}
