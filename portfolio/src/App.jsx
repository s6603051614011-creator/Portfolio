import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Masthead from './components/Masthead.jsx'
import Colophon from './components/Colophon.jsx'
import PageTransition from './components/PageTransition.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { scrollToTarget, startSmoothScroll } from './lib/smoothScroll.js'

export default function App() {
  const location = useLocation()
  useEffect(() => startSmoothScroll(), [])

  return (
    // "user": follow the visitor's reduced-motion setting for every motion component
    <MotionConfig reducedMotion="user">
      <div className="app">
        <a className="skip-link" href="#main">Skip to content</a>
        <Masthead />
        {/* initial={false}: no curtain on first load — the preloader already covers that */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => scrollToTarget(0, { immediate: true })}>
          <motion.main key={location.pathname} id="main" className="main" tabIndex={-1}>
            <PageTransition>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </motion.main>
        </AnimatePresence>
        <Colophon />
      </div>
    </MotionConfig>
  )
}
