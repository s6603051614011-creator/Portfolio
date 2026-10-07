// Footer: closes every page on a faint blue blueprint grid — name, where to go, how to reach
// me, and a colophon (the note at the back of a magazine about how it was made).
// Uses the theme's own tokens, so it follows the light/dark switch like everything else.
import { Link } from 'react-router-dom'
import { issue, profile, terminal } from '../content.js'
import { scrollToTarget } from '../lib/smoothScroll.js'
import './Colophon.css'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Toolkit' },
]

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function Colophon() {
  return (
    <footer className="colophon">
      <div className="container">
        <div className="colo-grid">
          <div className="colo-brand">
            <p className="colo-name display">{profile.name}<span className="accent">.</span></p>
            {terminal[0] && <p className="colo-now">Now: {terminal[0].out}</p>}
          </div>

          <nav className="colo-col" aria-label="Footer">
            <span className="mono">Sections</span>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}><Link to="/" state={{ scrollTo: s.id }}>{s.label}</Link></li>
              ))}
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="colo-col">
            <span className="mono">Reach me</span>
            <ul>
              <li><a href={`mailto:${profile.email}`}>Email</a></li>
              <li><a href={profile.github} {...external}>GitHub ↗</a></li>
              {profile.cv && <li><a href={profile.cv} download>CV ↓</a></li>}
            </ul>
          </div>

          <div className="colo-col colo-colophon">
            <span className="mono">Colophon</span>
            <p>Set in Fraunces, Instrument Sans, IBM Plex Sans Thai and JetBrains Mono. Built with React and Vite.</p>
          </div>
        </div>

        <div className="colo-base mono">
          <span>© {new Date().getFullYear()} {profile.name} · {issue.title} No. {issue.no}</span>
          <button type="button" onClick={() => scrollToTarget(0)}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  )
}
