// The magazine's masthead: name, issue line, section links and a reading-progress rule.
// Slides away while you scroll down, comes back as soon as you scroll up.
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { issue, profile } from '../content.js'
import { EASE } from './Reveal.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import Scramble from './Scramble.jsx'
import { lockScroll } from '../lib/smoothScroll.js'
import './Masthead.css'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact', route: '/contact' },
]

const shortName = (() => {
  const [first, ...rest] = profile.name.split(' ')
  return `${first[0]}. ${rest.join(' ')}`
})()

function useActiveSection(enabled) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!enabled) return
    const els = NAV.filter((n) => !n.route).map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return active
}

function NavLinks({ onNavigate, big = false }) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useActiveSection(onHome)

  return NAV.map(({ id, label, route }, i) => {
    const isActive = route ? pathname === route : onHome && active === id
    const link = (
      <Link
        to={route ?? '/'}
        state={route ? undefined : { scrollTo: id }}
        className={`mh-link${isActive ? ' is-active' : ''}`}
        aria-current={isActive ? 'page' : undefined}
        onClick={onNavigate}
      >
        <span className="mh-num">0{i + 1}</span>
        {label}
      </Link>
    )
    if (!big) return <span key={id}>{link}</span>
    return (
      <motion.span
        key={id}
        className="menu-item"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.06 }}
      >
        {link}
      </motion.span>
    )
  })
}

export default function Masthead() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 200)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    lockScroll(true)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  return (
    <>
      <motion.header
        className="masthead"
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onFocus={() => setHidden(false)}
      >
        <div className="container mh-row">
          <Link to="/" state={{ scrollTo: 'top' }} className="mh-brand" aria-label={`${profile.name}, home`}>
            {shortName}<span className="accent">.</span>
          </Link>
          <span className="mh-issue mono"><Scramble text={`${issue.title} — No. ${issue.no} · ${issue.date}`} delay={1.6} /></span>
          <nav className="mh-nav" aria-label="Main">
            <NavLinks />
          </nav>
          <div className="mh-actions">
            <ThemeToggle />
            <button
              type="button"
              className="mh-menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        <motion.span className="mh-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <nav aria-label="Mobile" className="menu-links">
              <NavLinks big onNavigate={() => setOpen(false)} />
            </nav>
            <div className="menu-foot mono">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
