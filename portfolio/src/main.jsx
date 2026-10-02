import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

// Vercel uses BrowserRouter (clean URLs). The single-file preview uses HashRouter.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter

const render = () =>
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>
  )

// Preloader (markup + styles in index.html): stays up until the page and fonts have
// loaded and at least MIN_MS has passed, then the site renders and the loader fades out.
// The app mounts as the loader fades so the hero's intro animation plays in view.
const MIN_MS = 1200
const loader = document.getElementById('preloader')

if (!loader) {
  render()
} else {
  const loaded = new Promise((r) =>
    document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })
  )
  const minTime = new Promise((r) => setTimeout(r, Math.max(0, MIN_MS - performance.now())))
  const fonts = document.fonts?.ready ?? Promise.resolve()
  // Never trap visitors behind the loader if something hangs
  const timeout = new Promise((r) => setTimeout(r, 5000))

  Promise.race([Promise.all([loaded, minTime, fonts]), timeout]).then(() => {
    render()
    loader.classList.add('is-done')
    setTimeout(() => loader.remove(), 600)
  })
}
