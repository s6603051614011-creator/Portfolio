// Light/dark switch. Follows the system until clicked, then remembers the choice.
// Sets <html data-theme>, which the tokens in styles.css already key off.
import { useEffect, useState } from 'react'

const systemDark = () => window.matchMedia?.('(prefers-color-scheme: dark)').matches
const current = () => {
  const forced = document.documentElement.dataset.theme
  return forced === 'dark' || forced === 'light' ? forced : systemDark() ? 'dark' : 'light'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(current)

  // Track system changes while the visitor hasn't picked a theme
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    const onChange = () => setTheme(current())
    mq?.addEventListener('change', onChange)
    return () => mq?.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
    setTheme(next)
  }

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className={`theme-toggle${dark ? ' is-dark' : ''} ${className}`}
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
    >
      <span className="theme-toggle-knob" />
    </button>
  )
}
