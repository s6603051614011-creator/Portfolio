// The opening of Experience: the path so far, printed as a traceroute. The command types
// itself out when it scrolls into view, then each hop answers in turn (the last one hasn't
// started yet, so it answers "* * *"). Each hop points at its entry below: hovering lights
// the entry up, clicking scrolls to it.
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { profile, route } from '../content.js'
import { EASE } from '../components/Reveal.jsx'
import usePauseOffscreen from '../lib/usePauseOffscreen.js'
import './Route.css'

const TYPE_MS = 45

export default function Route({ lit, onLight, onPick, linked = [] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  usePauseOffscreen(ref)
  const reduce = useReducedMotion()
  const target = profile.name.split(' ')[0].toLowerCase()
  const command = `traceroute ${target}`
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return setTyped(command.length)
    let n = 0
    const t = setInterval(() => {
      n++
      setTyped(n)
      if (n >= command.length) clearInterval(t)
    }, TYPE_MS)
    return () => clearInterval(t)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  const done = typed >= command.length

  return (
    <div ref={ref} className="route panel">
      <div className="panel-bar" aria-hidden="true">
        <span>{target}@portfolio: ~</span>
        <span className="live">tty1</span>
      </div>
      <div className="route-body">
        <p className="route-cmd" aria-hidden="true">
          <span className="route-prompt">~ $</span> {command.slice(0, typed)}
          <span className={`route-caret${done ? ' is-done' : ''}`} />
        </p>
        <motion.p
          className="route-meta"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          traceroute to {target}, {route.length} hops max, oldest first · select a hop for details
        </motion.p>
        <ol className="route-hops" aria-label="The path so far">
          {route.map((h, i) => (
            <motion.li
              key={h.host}
              initial={{ opacity: 0, x: -12 }}
              animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 + i * 0.4 }}
            >
              <button
                type="button"
                className={`route-hop${h.pending ? ' is-pending' : ''}${lit === h.host ? ' is-lit' : ''}`}
                disabled={!linked.includes(h.host)}
                onMouseEnter={() => onLight(h.host)}
                onMouseLeave={() => onLight(null)}
                onFocus={() => onLight(h.host)}
                onBlur={() => onLight(null)}
                onClick={() => onPick(h.host)}
              >
                <span className="route-no">{i + 1}</span>
                <span className="route-host">{h.host}</span>
                <span className="route-what">{h.what}</span>
                <span className="route-when">
                  {h.pending && <span className="route-stars" aria-hidden="true">* * * </span>}
                  {h.when}
                  {h.pending && <span className="sr-only"> (upcoming)</span>}
                </span>
                <span className="route-go" aria-hidden="true">↓</span>
              </button>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  )
}
