// Footer, written as a colophon — the bit at the back of a magazine about how it was made.
import { issue, profile } from '../content.js'
import './Colophon.css'

export default function Colophon() {
  const toTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <footer className="colophon container">
      <div className="colo-grid">
        <p className="colo-name display">{profile.name}<span className="accent">.</span></p>
        <div className="colo-text">
          <span className="mono">Colophon</span>
          <p>Set in Fraunces, Instrument Sans and JetBrains Mono. Built with React and Vite, deployed on Vercel. Printed nowhere.</p>
        </div>
        <ul className="colo-links">
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          <li><a href={profile.cv} download>CV ↓</a></li>
        </ul>
      </div>
      <div className="colo-base mono">
        <span>© {new Date().getFullYear()} · {issue.title} No. {issue.no}</span>
        <button type="button" onClick={toTop}>Back to the cover ↑</button>
      </div>
    </footer>
  )
}
