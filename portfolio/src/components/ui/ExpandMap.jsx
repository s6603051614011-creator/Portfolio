// Location card that expands into a real, interactive map.
// Ported from the shadcn "expand-map" component to this project's stack (JSX + CSS tokens).
import { lazy, Suspense, useRef, useState } from 'react'
import {
  motion, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion,
} from 'framer-motion'

const RealMap = lazy(() => import('./RealMap.jsx'))

const MapIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
  </svg>
)
const CollapseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
  </svg>
)

export function LocationMap({
  location = 'Bangkok, Thailand',
  coordinates = '13.7563° N, 100.5018° E',
  lat = 13.7563,
  lng = 100.5018,
  zoom = 12,
  label = 'Based in',
  className = '',
}) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 300, damping: 30 })

  // Tilt only while collapsed — a tilting card would fight map dragging.
  const onMove = (e) => {
    if (reduce || expanded || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(e.clientX - (r.left + r.width / 2))
    my.set(e.clientY - (r.top + r.height / 2))
  }
  const resetTilt = () => { mx.set(0); my.set(0) }
  const t = (x) => (reduce ? { duration: 0 } : x)
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

  const open = () => { resetTilt(); setExpanded(true) }

  return (
    <div
      ref={ref}
      className={`lmap ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { resetTilt(); setHovered(false) }}
    >
      <motion.div
        className={`lmap-card${expanded ? ' is-expanded' : ''}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ width: expanded ? 440 : 240, height: expanded ? 300 : 140 }}
        transition={t({ type: 'spring', stiffness: 400, damping: 35 })}
      >
        {expanded ? (
          <Suspense fallback={<div className="lmap-loading">Loading map…</div>}>
            <RealMap lat={lat} lng={lng} zoom={zoom} label={location} />
          </Suspense>
        ) : (
          <div className="lmap-grid" aria-hidden="true" />
        )}

        {/* Collapsed: the whole card is one button */}
        {!expanded && (
          <button
            type="button"
            className="lmap-hit"
            aria-expanded="false"
            aria-label={`${label} ${location}. Open interactive map`}
            onClick={open}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          />
        )}

        {/* Overlay: clicks pass through to the map except on its own controls */}
        <div className="lmap-content">
          <div className="lmap-top">
            {!expanded && <MapIcon className="lmap-icon" />}
            {!expanded ? (
              <motion.span className="lmap-badge" animate={{ scale: hovered ? 1.05 : 1 }} transition={t({ duration: 0.2 })}>
                <span className="lmap-dot" />{label}
              </motion.span>
            ) : (
              <button type="button" className="lmap-close" aria-expanded="true"
                aria-label="Collapse map" onClick={() => setExpanded(false)}>
                <CollapseIcon />
              </button>
            )}
          </div>

          <div className="lmap-bottom">
            <motion.span className="lmap-title" animate={{ x: hovered && !expanded ? 4 : 0 }}
              transition={t({ type: 'spring', stiffness: 400, damping: 25 })}>
              {location}
            </motion.span>
            <AnimatePresence>
              {expanded && (
                <motion.span className="lmap-coords"
                  initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }} transition={t({ duration: 0.25 })}>
                  {coordinates} ·{' '}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                </motion.span>
              )}
            </AnimatePresence>
            <motion.span className="lmap-line" initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered || expanded ? 1 : 0.3 }} transition={t({ duration: 0.4, ease: 'easeOut' })} />
          </div>
        </div>
      </motion.div>

      <motion.span className="lmap-hint" aria-hidden="true" style={{ x: '-50%' }} initial={{ opacity: 0 }}
        animate={{ opacity: hovered && !expanded ? 1 : 0, y: hovered ? 0 : 4 }} transition={t({ duration: 0.2 })}>
        Click to open map
      </motion.span>
    </div>
  )
}

export default LocationMap
