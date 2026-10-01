import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { FloatingPathsBackground } from './components/ui/FloatingPaths.jsx'

export default function App() {
  return (
    <div className="app">
      {/* Site-wide animated background, fixed behind every page */}
      <FloatingPathsBackground position={-1} intensity={0.3} fixed />
      <a className="skip-link" href="#main">Skip to content</a>
      <Sidebar />
      <main id="main" className="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
