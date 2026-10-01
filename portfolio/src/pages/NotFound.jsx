import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container notfound">
      <p className="hero-meta"><span>~/portfolio $ cd ???</span></p>
      <h1 className="h2">404 — this page doesn’t exist.</h1>
      <Link to="/" className="btn btn-primary">Go to home</Link>
    </div>
  )
}
