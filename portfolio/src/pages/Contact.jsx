import { useEffect } from 'react'
import ContactForm from '../components/ContactForm.jsx'
import { FadeUp, RevealLines } from '../components/Reveal.jsx'
import Todo from '../components/Todo.jsx'
import Scramble from '../components/Scramble.jsx'
import { LocationMap } from '../components/ui/ExpandMap.jsx'
import { issue, profile } from '../content.js'
import './Contact.css'

export default function Contact() {
  useEffect(() => {
    document.title = `Contact — ${profile.name}`
    window.scrollTo(0, 0)
  }, [])

  const rows = [
    { label: 'Email', href: `mailto:${profile.email}`, text: profile.email },
    { label: 'GitHub', href: profile.github, text: profile.github.replace('https://', ''), external: true },
  ].filter((r) => r.href)

  return (
    <div className="container contact-page">
      <div className="contact-strip mono">
        <Scramble text="Letters to the editor" delay={0.3} />
        <Scramble text={`${issue.title} — No. ${issue.no}`} delay={0.45} />
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <RevealLines
            as="h1" immediate delay={0.5}
            className="contact-title display"
            lines={['Let’s talk', <em key="s">security<span className="accent">.</span></em>]}
          />
          <FadeUp as="p" delay={0.3} className="contact-lead">
            Open to conversations about security roles, projects and collaborations. Email is the fastest way to reach me.
          </FadeUp>
          <FadeUp as="ul" delay={0.4} className="contact-list">
            {rows.map((r) => (
              <li key={r.label}>
                <span className="mono">{r.label}</span>
                <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Todo>{r.text}</Todo>
                </a>
              </li>
            ))}
          </FadeUp>
          <LocationMap
            location={profile.mapTitle} coordinates={profile.coordinates} zoom={15}
            lat={profile.lat} lng={profile.lng} label={`${profile.mapLabel} · ${profile.timezone}`}
          />
        </div>

        <FadeUp delay={0.45} className="contact-form-wrap">
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  )
}
