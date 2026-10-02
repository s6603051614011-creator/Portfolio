// The cover: oversized name, the portrait set off to the right with a caption,
// a stamp that slowly turns, and the tagline as the cover line.
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { RevealLines, EASE } from '../components/Reveal.jsx'
import Scribble from '../components/Scribble.jsx'
import { issue, profile, terminal } from '../content.js'
import './Hero.css'

function CoverLine() {
  const { tagline, taglineEmphasis: em } = profile
  const at = em ? tagline.indexOf(em) : -1
  if (at < 0) return tagline
  return (
    <>
      {tagline.slice(0, at)}
      <span className="scribble-wrap">{em}<Scribble immediate delay={1.5} /></span>
      {tagline.slice(at + em.length)}
    </>
  )
}

function Stamp() {
  return (
    <motion.div
      className="stamp"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 1.1 }}
    >
      <svg viewBox="0 0 120 120" className="stamp-ring">
        <defs>
          <path id="stamp-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <text><textPath href="#stamp-path" textLength="286" lengthAdjust="spacing">{profile.stamp.toUpperCase()}</textPath></text>
      </svg>
      <span className="stamp-mark">✱</span>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Image is scaled up 15%, so it can drift ±6% without showing an edge
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const [first, ...rest] = profile.name.split(' ')
  const now = terminal[0]?.out

  const scrollToWork = () =>
    document.getElementById('work')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <section id="top" ref={ref} className="hero container">
      <div className="hero-strip mono">
        <span>Vol. 1 — No. {issue.no}</span>
        {now && <span className="hero-now">Now: {now}</span>}
        <span>{profile.location.split(',')[0]} · {profile.timezone}</span>
        <motion.span
          className="hero-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>

      <div className="hero-grid">
        <RevealLines
          as="h1"
          immediate
          delay={0.15}
          stagger={0.12}
          className="hero-name display"
          lines={[first, <em key="l">{rest.join(' ')}<span className="accent">.</span></em>]}
        />

        <div className="hero-visual">
          <motion.figure
            className="hero-figure"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          >
            <div className="hero-photo">
              <motion.img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width="640" height="852"
                fetchPriority="high"
                style={reduce ? undefined : { y: imgY, scale: 1.15 }}
              />
            </div>
            <figcaption className="mono">{profile.photoCaption}</figcaption>
          </motion.figure>
          <Stamp />
        </div>

        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
        >
          <p className="hero-cover"><CoverLine /></p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Get in touch <span className="arrow">→</span></Link>
            <button type="button" className="btn" onClick={scrollToWork}>See the work</button>
            <a href={profile.cv} className="link-line" download>Download CV</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
