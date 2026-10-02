import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero.jsx'
import Marquee from '../sections/Marquee.jsx'
import About from '../sections/About.jsx'
import Work from '../sections/Work.jsx'
import Experience from '../sections/Experience.jsx'
import Toolkit from '../sections/Toolkit.jsx'
import ContactCta from '../sections/ContactCta.jsx'
import { profile } from '../content.js'
import { scrollToTarget } from '../lib/smoothScroll.js'

// Masthead links navigate to "/" with { scrollTo: id }, so they work from any page.
// The short wait lets a page transition finish resetting the scroll first.
function useScrollToSection() {
  const location = useLocation()
  useEffect(() => {
    const id = location.state?.scrollTo
    if (!id) return
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) scrollToTarget(id === 'top' ? 0 : el)
    }, 60)
    return () => clearTimeout(t)
  }, [location.key, location.state])
}

export default function Home() {
  useScrollToSection()
  useEffect(() => { document.title = `${profile.name} — Field Notes` }, [])

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Experience />
      <Toolkit />
      <ContactCta />
    </>
  )
}
