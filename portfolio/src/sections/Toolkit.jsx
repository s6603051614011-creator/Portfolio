// 04 — Toolkit: set like the index at the back of a book, with a note in the margin
// (circled in pen) for what's being learned right now.
import { learning, skills } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import { FadeUp } from '../components/Reveal.jsx'
import Scribble from '../components/Scribble.jsx'
import './Toolkit.css'

export default function Toolkit() {
  return (
    <section id="skills" className="section container">
      <SectionHead
        no="04" label="Toolkit" page="15"
        title={['What I', <em key="w">work with<span className="accent">.</span></em>]}
      />
      <div className="kit">
        {skills.map((s, i) => (
          <FadeUp key={s.group} delay={i * 0.1} className="kit-col">
            <h3 className="kit-group mono">
              {s.group} <span>({String(s.items.length).padStart(2, '0')})</span>
            </h3>
            <ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </FadeUp>
        ))}

        <FadeUp as="aside" delay={0.3} className="kit-note" aria-label="Currently learning">
          <p className="kit-note-label">
            <span className="scribble-wrap">currently learning<Scribble shape="circle" delay={0.5} /></span>
          </p>
          <ul>{learning.map((l) => <li key={l}>{l}</li>)}</ul>
        </FadeUp>
      </div>
    </section>
  )
}
