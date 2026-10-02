import { Link } from 'react-router-dom'
import { RevealLines } from '../components/Reveal.jsx'
import './Contact.css'

export default function NotFound() {
  return (
    <div className="container notfound">
      <span className="mono">Erratum</span>
      <RevealLines as="h1" immediate className="notfound-no display" lines={[<>4<em>0</em>4</>]} />
      <p>This page didn’t make it into the issue.</p>
      <Link to="/" className="btn btn-primary">Back to the cover <span className="arrow">→</span></Link>
    </div>
  )
}
