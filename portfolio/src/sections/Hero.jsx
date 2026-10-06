// The cover: oversized name, the portrait set off to the right as a framed print with
// crop marks and a pen note, and the tagline as the cover line.
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { RevealLines, EASE } from '../components/Reveal.jsx'
import Scribble from '../components/Scribble.jsx'
import Scramble from '../components/Scramble.jsx'
import { scrollToTarget } from '../lib/smoothScroll.js'
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

// Pen note with a loose arrow curling towards the photo
function PhotoNote({ text }) {
  return (
    <motion.div
      className="photo-note hand"
      aria-hidden="true"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.7 }}
    >
      <span>{text}</span>
      <svg viewBox="0 0 90 60" fill="none">
        <motion.path
          d="M6 10 C 28 4, 54 12, 66 30 C 72 39, 74 46, 76 52 M64 45 L 77 54 L 82 39"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 1.9 }}
        />
      </svg>
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

  const scrollToWork = () => scrollToTarget(document.getElementById('work'))

  return (
    <section id="top" ref={ref} className="hero container">
      <div className="hero-strip mono">
        <Scramble text={`Vol. 1 — No. ${issue.no}`} delay={0.2} />
        {now && <Scramble className="hero-now" text={`Now: ${now}`} delay={0.4} />}
        <Scramble text={`${profile.location.split(',')[0]} · ${profile.timezone}`} delay={0.6} />
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          >
            <div className="hero-frame frame">
              <span className="crop crop-tl" aria-hidden="true" />
              <span className="crop crop-tr" aria-hidden="true" />
              <span className="crop crop-bl" aria-hidden="true" />
              {/* no bottom-right mark: that's where the offset frame sits */}
              <motion.div
                className="hero-photo"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
              >
                <motion.img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width="640" height="852"
                  fetchPriority="high"
                  style={reduce ? undefined : { y: imgY, scale: 1.15 }}
                />
              </motion.div>
            </div>
            <figcaption className="mono">Fig. 1 — {profile.photoCaption}</figcaption>
          </motion.figure>
          {profile.photoNote && <PhotoNote text={profile.photoNote} />}
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
            {profile.cv && <a href={profile.cv} className="link-line" download>Download CV</a>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
