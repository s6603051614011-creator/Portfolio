import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AnimatedLetters from '../components/AnimatedLetters.jsx'
import Terminal from '../components/Terminal.jsx'
import {
  profile, about, featured, projects, experience, skills, learning,
} from '../content.js'

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function useScrollToSection() {
  const location = useLocation()
  useEffect(() => {
    const id = location.state?.scrollTo
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }, [location.key, location.state])
}

function SectionHead({ index, label, title }) {
  return (
    <div className="section-head">
      <span className="section-label">{index} — {label}</span>
      <h2 className="h2">{title}</h2>
    </div>
  )
}

export default function Home() {
  useScrollToSection()
  useEffect(() => { document.title = `${profile.name} — Security Portfolio` }, [])

  return (
    <>
      <div className="container">
          {/* HERO */}
          <section id="top" className="hero">
            <div className="hero-meta">
              <span>~/portfolio $ whoami</span>
              <span>{profile.location.split(',')[0]}, TH · {profile.timezone}</span>
            </div>
            <h1 className="h1">
              <AnimatedLetters text={`Hi, I’m ${profile.name}`} />
              <span className="accent">.</span>
            </h1>
            <div className="hero-bottom">
              <div className="hero-copy">
                <p className="lead">{profile.intro}</p>
                <div className="hero-actions">
                  <Link to="/" state={{ scrollTo: 'work' }} className="btn btn-primary">View projects</Link>
                  <Link to="/contact" className="btn btn-outline">Contact me</Link>
                  <a href={profile.cv} className="btn-text" download>Download CV</a>
                </div>
              </div>
              <Terminal />
            </div>
          </section>
      </div>

      <div className="container">
      {/* ABOUT */}
      <section id="about" className="section grid-2">
        <div className="section-head">
          <span className="section-label">01 — About</span>
          <h2 className="h2">{about.heading[0]}<br />{about.heading[1]}</h2>
        </div>
        <div className="stack-28">
          {about.paragraphs.map((p) => <p className="body-lg" key={p}>{p}</p>)}
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section">
        <div className="section-row">
          <SectionHead index="02" label="Selected work" title="Things I’ve built." />
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-strong">All repositories</a>
        </div>

        <article className="featured">
          <div className="featured-body">
            <span className="kicker">{featured.kicker}</span>
            <h3 className="h3">{featured.title}</h3>
            <p className="body">{featured.description}</p>
            <ul className="tags" aria-label="Technologies">
              {featured.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <dl className="metrics">
              {featured.metrics.map((m) => (
                <div key={m.label}>
                  <dd>{m.value}</dd>
                  <dt>{m.label}</dt>
                </div>
              ))}
            </dl>
            <div className="link-row">
              {featured.links.map((l, i) => (
                <a key={l.label} href={l.href} className={i === 0 ? 'link-strong' : 'link-strong ink'}
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="featured-media">
            {featured.image
              ? <img src={featured.image} alt={`${featured.title} screenshot`} loading="lazy" />
              : <div className="placeholder">[Screenshot: invoice → extracted fields]</div>}
          </div>
        </article>

        <div className="cards-2">
          {projects.map((p) => (
            <article className="card" key={p.title}>
              <span className="kicker">{p.kicker}</span>
              <h3 className="h4">{p.title}</h3>
              <p className="body">{p.description}</p>
              <a href={p.link.href} className="link-strong"
                {...(p.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {p.link.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section grid-side">
        <SectionHead index="03" label="Experience" title="Where I’m learning." />
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.role}>
              <span className="timeline-period">{e.period}</span>
              <div>
                <div className="timeline-role">{e.role}</div>
                <div className="timeline-org">{e.org}</div>
                <div className="timeline-note">{e.note}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <SectionHead index="04" label="Toolkit" title="What I work with." />
        <div className="skills">
          {skills.map((s) => (
            <div key={s.group} className="skill-col">
              <h3 className="skill-title">{s.group}</h3>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="learning">
          <span className="learning-label">currently learning</span>
          <ul>{learning.map((l) => <li key={l}>{l}</li>)}</ul>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section cta">
        <div className="section-head">
          <span className="section-label">05 — Contact</span>
          <h2 className="h2">Let’s talk security<span className="accent">.</span></h2>
        </div>
        <div className="stack-28">
          <p className="body-lg">Open to conversations about security roles, projects and collaborations. Email is the fastest way to reach me.</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Send a message</Link>
            <a href={`mailto:${profile.email}`} className="btn-text">{profile.email}</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React + Vite · Deployed on Vercel</span>
      </footer>
      </div>
    </>
  )
}
