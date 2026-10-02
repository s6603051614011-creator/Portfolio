// About, laid out like the "minimalist hero": copy on the left, photo in an accent
// circle in the middle, big heading on the right, facts along the bottom.
// Pieces fade/rise in once the section scrolls into view (.about-hero.is-in).
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { about, profile } from '../content.js'

export default function AboutSection() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setInView(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className={`section about-hero${inView ? ' is-in' : ''}`}>
      <span className="section-label">01 — About</span>

      <div className="about-grid">
        <div className="about-copy reveal" style={{ '--d': '.8s' }}>
          {about.paragraphs.map((p) => <p className="body" key={p}>{p}</p>)}
          <Link to="/" state={{ scrollTo: 'work' }} className="link-strong">See my work →</Link>
        </div>

        <div className="about-visual">
          <span className="about-circle" aria-hidden="true" />
          {/* Clip: straight sides above the circle's middle, the circle's curve below,
              so the head pops out of the circle while the shoulders sit inside it */}
          <div className="about-cutout">
            <img
              className="about-photo"
              src={profile.photoSide}
              alt={`Portrait of ${profile.name}`}
              width="500" height="500" loading="lazy"
            />
          </div>
        </div>

        <h2 className="about-title reveal" style={{ '--d': '1s' }}>
          {about.heading[0]}<br />{about.heading[1].replace(/\.$/, '')}<span className="accent">.</span>
        </h2>
      </div>

      <dl className="about-facts reveal" style={{ '--d': '1.15s' }}>
        {about.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
