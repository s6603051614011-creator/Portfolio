// The cover: oversized name, a big initial drawn as a type specimen on the right
// (with a pen note), and the tagline as the cover line.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RevealLines, EASE } from '../components/Reveal.jsx'
import Scribble from '../components/Scribble.jsx'
import Scramble from '../components/Scramble.jsx'
import LetterSpec from '../components/LetterSpec.jsx'
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

// Pen note with a loose arrow curling towards the initial
function MarkNote({ text }) {
  return (
    <motion.div
      className="mark-note hand"
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
  const [first, ...rest] = profile.name.split(' ')
  const now = terminal[0]?.out

  const scrollToWork = () => scrollToTarget(document.getElementById('work'))

  return (
    <section id="top" className="hero container">
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            <LetterSpec letter={profile.name[0]} caption={`Fig. 1 — ${profile.markCaption}`} />
          </motion.div>
          {profile.markNote && <MarkNote text={profile.markNote} />}
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
