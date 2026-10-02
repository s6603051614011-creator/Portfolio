import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../content.js'
import {
  HomeIcon, UserIcon, FolderIcon, BriefcaseIcon, MailIcon,
  MenuIcon, CloseIcon,
} from './Icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const NAV = [
  { id: 'top', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: UserIcon },
  { id: 'work', label: 'Projects', Icon: FolderIcon },
  { id: 'experience', label: 'Experience', Icon: BriefcaseIcon },
  { id: 'contact', label: 'Contact', Icon: MailIcon, route: '/contact' },
]

function useActiveSection(enabled) {
  const [active, setActive] = useState('top')
  useEffect(() => {
    if (!enabled) return
    const ids = ['top', 'about', 'work', 'experience']
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return active
}

function NavLinks({ onNavigate, showLabels }) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const active = useActiveSection(onHome)

  return NAV.map(({ id, label, Icon, route }) => {
    const isActive = route ? pathname === route : onHome && active === id
    const to = route ?? '/'
    const state = route ? undefined : { scrollTo: id }
    return (
      <Link
        key={id}
        to={to}
        state={state}
        className={`nav-link${isActive ? ' is-active' : ''}`}
        aria-label={showLabels ? undefined : label}
        aria-current={isActive ? 'page' : undefined}
        title={showLabels ? undefined : label}
        onClick={onNavigate}
      >
        <Icon />
        {showLabels && <span>{label}</span>}
      </Link>
    )
  })
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const logo = (
    <Link to="/" state={{ scrollTo: 'top' }} className="logo" aria-label={`${profile.name}, home`}>
      <span className="logo-mark">{profile.monogram}<span className="accent">.</span></span>
      <span className="logo-sub">sec.eng</span>
    </Link>
  )

  return (
    <>
      {/* Desktop rail */}
      <nav className="rail" aria-label="Main">
        {logo}
        <div className="rail-links">
          <NavLinks />
        </div>
        <div className="rail-social">
          <ThemeToggle className="theme-toggle-rail" />
        </div>
      </nav>

      {/* Mobile top bar */}
      <header className="topbar">
        {logo}
        <div className="topbar-actions">
        <ThemeToggle />
        <button
          type="button"
          className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        </div>
      </header>
      <div id="mobile-menu" className={`drawer${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile" className="drawer-links">
          <NavLinks showLabels onNavigate={() => setOpen(false)} />
        </nav>
        <div className="drawer-social">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </>
  )
}
