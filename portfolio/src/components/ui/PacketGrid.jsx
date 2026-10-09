// Background: a few packets routed along the page's drafting grid. Each one runs along a
// grid line, and at every intersection carries straight on or turns left/right, trailing
// a short tail behind it — traffic finding its way across the network. They live in page
// space, so they scroll with the grid, and each fades out after a few seconds to make
// way for a new one somewhere on screen. Off for reduced motion; pauses with the tab.
// Kept cheap on purpose: ~30 fps (they move slowly), flat strokes instead of gradients.
import { useEffect, useRef } from 'react'
import './PacketGrid.css'

const CELL = 32 // must match the body grid in styles.css
const TAIL = 150 // trail length in px
const FADE = 0.6 // seconds to fade in / out
const FRAME_MS = 33 // ~30 fps is plenty for something this slow

const rand = (a, b) => a + Math.random() * (b - a)

export default function PacketGrid() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let colour = '27, 58, 156'
    let raf = 0
    let last = 0
    let w = 0
    let h = 0
    const count = () => (window.innerWidth < 700 ? 3 : 6)

    const readColour = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().replace('#', '')
      if (/^[0-9a-f]{6}$/i.test(hex)) colour = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')
    }
    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // A packet starts on a random grid intersection inside the viewport (page coordinates)
    const spawn = () => {
      const c = Math.floor(rand(1, w / CELL - 1))
      const r = Math.floor(rand(1, h / CELL - 1))
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      const [dx, dy] = dirs[(Math.random() * 4) | 0]
      const x = c * CELL + Math.round(window.scrollX / CELL) * CELL
      const y = r * CELL + Math.round(window.scrollY / CELL) * CELL
      return { x, y, dx, dy, run: 0, speed: rand(70, 120), age: 0, life: rand(4, 8), trail: [{ x, y }] }
    }
    let packets = Array.from({ length: count() }, () => {
      const p = spawn()
      p.age = rand(0, p.life * 0.6) // stagger, so they don't all fade at once
      return p
    })

    const step = (p, dt) => {
      let move = p.speed * dt
      while (move > 0) {
        const toNode = CELL - p.run
        const d = Math.min(move, toNode)
        p.x += p.dx * d
        p.y += p.dy * d
        p.run += d
        move -= d
        if (p.run >= CELL) {
          // at an intersection: keep the corner in the trail, then maybe turn
          p.run = 0
          p.trail.push({ x: p.x, y: p.y })
          const roll = Math.random()
          if (roll < 0.22) [p.dx, p.dy] = [-p.dy, p.dx]
          else if (roll < 0.44) [p.dx, p.dy] = [p.dy, -p.dx]
        }
      }
      // drop corners that are now further back than the tail length
      let len = Math.hypot(p.x - p.trail[p.trail.length - 1].x, p.y - p.trail[p.trail.length - 1].y)
      for (let i = p.trail.length - 1; i > 0; i--) {
        len += Math.hypot(p.trail[i].x - p.trail[i - 1].x, p.trail[i].y - p.trail[i - 1].y)
        if (len > TAIL) { p.trail.splice(0, i - 1); break }
      }
    }

    const drawPacket = (p, sx, sy) => {
      const a = Math.min(1, p.age / FADE, (p.life - p.age) / FADE)
      if (a <= 0) return
      // trail: from the head back along the corners, fading towards the tail end
      const pts = [{ x: p.x, y: p.y }, ...p.trail.slice().reverse()]
      let walked = 0
      for (let i = 0; i < pts.length - 1; i++) {
        const seg = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y)
        if (!seg) continue
        // each straight run gets one flat alpha, fading run by run towards the tail end
        const mid = walked + seg / 2
        walked += seg
        ctx.strokeStyle = `rgba(${colour}, ${0.45 * a * Math.max(0, 1 - mid / TAIL)})`
        ctx.beginPath()
        ctx.moveTo(pts[i].x - sx, pts[i].y - sy)
        ctx.lineTo(pts[i + 1].x - sx, pts[i + 1].y - sy)
        ctx.stroke()
        if (walked > TAIL) break
      }
      // head
      ctx.fillStyle = `rgba(${colour}, ${0.85 * a})`
      ctx.fillRect(p.x - sx - 2.5, p.y - sy - 2.5, 5, 5)
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (last && now - last < FRAME_MS) return
      const dt = Math.min(0.08, (now - (last || now)) / 1000)
      last = now
      const sx = window.scrollX
      const sy = window.scrollY
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1.5
      packets = packets.map((p) => {
        p.age += dt
        step(p, dt)
        const off = p.x < sx - TAIL || p.x > sx + w + TAIL || p.y < sy - TAIL || p.y > sy + h + TAIL
        return p.age >= p.life || off ? spawn() : p
      })
      while (packets.length < count()) packets.push(spawn())
      packets.length = count()
      packets.forEach((p) => drawPacket(p, sx, sy))
    }

    const themeObs = new MutationObserver(readColour)
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    scheme.addEventListener('change', readColour)
    readColour()
    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      themeObs.disconnect()
      scheme.removeEventListener('change', readColour)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="packet-grid" aria-hidden="true" />
}
