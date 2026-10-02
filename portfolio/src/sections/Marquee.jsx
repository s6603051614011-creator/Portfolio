// A running band of everything in the toolkit, between the cover and the first article.
// Pure CSS animation; the second copy of the list exists only to make the loop seamless.
import { skills } from '../content.js'
import './Marquee.css'

const items = skills.flatMap((s) => s.items)

function Run({ hidden = false }) {
  return (
    <ul className="marquee-run" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <span className="marquee-sep" aria-hidden="true">✱</span>
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" role="region" aria-label="Skills">
      <div className="marquee-track">
        <Run />
        <Run hidden />
      </div>
    </div>
  )
}
