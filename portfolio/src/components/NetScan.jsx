// Plate for the network monitor: a terminal replaying a real scan of my home Wi-Fi
// (reports/scan_20260328_190212.json, hostname removed). Lines print in turn once the plate
// is on screen — ping sweep, port scan with SMB flagged, then the local LLM's verdict —
// and the run repeats after a pause. Reduced motion shows the finished run.
import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import usePauseOffscreen from '../lib/usePauseOffscreen.js'
import './NetScan.css'

const HOSTS = [
  { ip: '192.168.1.1', ports: '53 DNS · 80 HTTP · 443 HTTPS' },
  { ip: '192.168.1.150', ports: '22 SSH' },
  { ip: '192.168.1.167', ports: '—' },
  { ip: '192.168.1.171', ports: '—' },
  { ip: '192.168.1.174', ports: '80 HTTP' },
  { ip: '192.168.1.175', ports: '80 HTTP' },
  { ip: '192.168.1.177', ports: '—' },
  { ip: '192.168.1.185', ports: '135 RPC · 139 NetBIOS · 445 SMB', flag: 'SMB exposed' },
]

// [kind, text, pause before the next line (ms)]
const LINES = [
  ['cmd', 'python main.py 192.168.1.0/24', 500],
  ['info', '[*] ping sweep 192.168.1.0/24 · 254 addresses', 450],
  ['info', `[*] ${HOSTS.length} hosts online — scanning 17 common ports`, 350],
  ...HOSTS.map((h) => [h.flag ? 'hit' : 'host', h, 160]),
  ['info', '[*] sending results to ollama · llama3 (local)', 900],
  ['risk', 'RISK LEVEL: MEDIUM', 300],
  ['ai', '445/SMB on one laptop is the main exposure.', 220],
  ['ai', 'Restrict it at the firewall; keep SMB patched.', 400],
  ['done', '[✓] done in 47 s · report saved (HTML + JSON)', 0],
]

const REPLAY_MS = 7000

export default function NetScan() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.4 })
  usePauseOffscreen(ref)
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? LINES.length : 0)

  useEffect(() => {
    if (reduce) { setShown(LINES.length); return }
    if (!inView) return
    let timer
    const step = (n) => {
      setShown(n)
      if (n < LINES.length) timer = setTimeout(() => step(n + 1), n === 0 ? 300 : LINES[n - 1][2])
      else timer = setTimeout(() => step(0), REPLAY_MS)
    }
    step(shown >= LINES.length ? 0 : shown)
    return () => clearTimeout(timer)
  }, [inView, reduce]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className="ns"
      role="img"
      aria-label={`Terminal replay of a home network scan: ${HOSTS.length} hosts and 9 open ports found in 47 seconds; SMB on port 445 flagged; the local AI rated the risk as medium.`}
    >
      <div className="ns-bar" aria-hidden="true">
        <span className="ns-dots"><i /><i /><i /></span>
        <span>network_ai_monitor — zsh</span>
        <span className="ns-live">llama3 · local</span>
      </div>
      <div className="ns-body" aria-hidden="true">
        {LINES.slice(0, shown).map(([kind, v], i) => {
          if (kind === 'host' || kind === 'hit') {
            return (
              <p key={i} className={`ns-line ns-${kind}`}>
                <span className="ns-mark">{kind === 'hit' ? '[!]' : '[+]'}</span>
                <span className="ns-ip">{v.ip}</span>
                <span className="ns-ports">{v.ports}</span>
                {v.flag && <span className="ns-flag">{v.flag}</span>}
              </p>
            )
          }
          return (
            <p key={i} className={`ns-line ns-${kind}`}>
              {kind === 'cmd' && <span className="ns-prompt">~/network_ai_monitor $ </span>}
              {v}
            </p>
          )
        })}
        <span className="ns-caret" />
      </div>
    </div>
  )
}
