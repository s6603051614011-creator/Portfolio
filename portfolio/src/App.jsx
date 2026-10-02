import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Masthead from './components/Masthead.jsx'
import Colophon from './components/Colophon.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    // "user": follow the visitor's reduced-motion setting for every motion component
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a className="skip-link" href="#main">Skip to content</a>
        <Masthead />
        <main id="main" className="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Colophon />
      </div>
    </MotionConfig>
  )
}
