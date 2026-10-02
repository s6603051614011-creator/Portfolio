// 01 — About: portrait on a block of the accent colour, copy with a drop cap,
// facts as a ruled table, then a pull quote that inks in as you scroll.
import { about, profile } from '../content.js'
import SectionHead from '../components/SectionHead.jsx'
import ScrollWords from '../components/ScrollWords.jsx'
import { FadeUp } from '../components/Reveal.jsx'
import Todo from '../components/Todo.jsx'
import './About.css'

export default function About() {
  const [h1, h2] = about.heading
  return (
    <section id="about" className="section container">
      <SectionHead
        no="01" label="About" page="03"
        title={[h1, <em key="h2">{h2.replace(/\.$/, '')}<span className="accent">.</span></em>]}
      />

      <div className="about-grid">
        <FadeUp as="figure" className="about-figure">
          <div className="about-photo">
            <img src={profile.photoSide} alt={`Portrait of ${profile.name}`} width="500" height="500" loading="lazy" />
          </div>
          <figcaption className="mono">{about.photoCaption}</figcaption>
        </FadeUp>

        <div className="about-body">
          {about.paragraphs.map((p, i) => (
            <FadeUp as="p" key={p} delay={i * 0.1} className={`about-p${i === 0 ? ' dropcap' : ''}`}>
              <Todo>{p}</Todo>
            </FadeUp>
          ))}
          <FadeUp as="dl" delay={0.2} className="about-facts">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>

      <figure className="pull">
        <ScrollWords as="blockquote" className="pull-quote display" text={about.pullQuote} />
        <figcaption className="mono">— {profile.name}</figcaption>
      </figure>
    </section>
  )
}
