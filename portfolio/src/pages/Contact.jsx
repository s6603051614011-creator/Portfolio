import { useEffect } from 'react'
import ContactForm from '../components/ContactForm.jsx'
import AnimatedLetters from '../components/AnimatedLetters.jsx'
import { LocationMap } from '../components/ui/ExpandMap.jsx'
import { profile } from '../content.js'

export default function Contact() {
  useEffect(() => {
    document.title = `Contact — ${profile.name}`
    window.scrollTo(0, 0)
  }, [])

  const rows = [
    { label: 'Email', node: <a href={`mailto:${profile.email}`} className="link-strong">{profile.email}</a> },
    { label: 'LinkedIn', node: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="ink">{profile.linkedin.replace('https://www.', '')}</a> },
    { label: 'GitHub', node: <a href={profile.github} target="_blank" rel="noopener noreferrer" className="ink">{profile.github.replace('https://', '')}</a> },
  ]

  return (
    <div className="container contact-page">
      <div className="contact-info">
        <span className="hero-meta"><span>~/portfolio $ ./contact.sh</span></span>
        <h1 className="h1 h1-contact">
          <AnimatedLetters text="Let’s talk security" />
          <span className="accent">.</span>
        </h1>
        <p className="lead">Open to conversations about security roles, projects and collaborations. Email is the fastest way to reach me.</p>
        <ul className="contact-list">
          {rows.map((r) => (
            <li key={r.label}>
              <span className="contact-label">{r.label}</span>
              {r.node}
            </li>
          ))}
        </ul>
        <LocationMap location={profile.location} coordinates={profile.coordinates} lat={profile.lat} lng={profile.lng} label={`Based in · ${profile.timezone}`} />
      </div>
      <ContactForm />
    </div>
  )
}
