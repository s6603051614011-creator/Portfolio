// 05 — Contact: the closing line of the issue, set as large as the cover.
import { Link } from 'react-router-dom'
import { profile } from '../content.js'
import { FadeUp, RevealLines } from '../components/Reveal.jsx'
import Magnetic from '../components/Magnetic.jsx'
import Todo from '../components/Todo.jsx'
import Scramble from '../components/Scramble.jsx'
import './ContactCta.css'

export default function ContactCta() {
  return (
    <section id="contact" className="section is-loose container cta">
      <div className="mono cta-meta">
        <Scramble text="05 — Contact" />
        <Scramble text="p. 18" delay={0.15} />
      </div>
      <RevealLines
        className="cta-title display"
        lines={['Let’s talk', <em key="s">security<span className="accent">.</span></em>]}
      />
      <FadeUp className="cta-row">
        <p className="cta-lead">
          Open to conversations about security roles, projects and collaborations. Email is the fastest way to reach me.
        </p>
        <div className="cta-actions">
          <Magnetic>
            <Link to="/contact" className="cta-circle">Write to me <span aria-hidden="true">→</span></Link>
          </Magnetic>
          <a href={`mailto:${profile.email}`} className="link-line cta-mail"><Todo>{profile.email}</Todo></a>
        </div>
      </FadeUp>
    </section>
  )
}
