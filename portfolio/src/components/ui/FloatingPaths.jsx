// Ported from the shadcn "floating-paths" component to this project's stack.
// Same look (lines that grow and drift), but animated with CSS instead of JS:
// the original animated 36 paths' opacity every frame, which dropped rendering
// to a few FPS in testing. CSS dash animation keeps it smooth.
import { useEffect, useMemo, useRef, useState } from 'react'

export function FloatingPathsBackground({
  position = -1,
  intensity = 0.5, // 0–1: how visible the lines are behind content
  fixed = false, // true = pinned full-screen behind the whole site
  className = '',
  children,
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(true)

  // Pause when scrolled off screen (saves CPU/battery)
  useEffect(() => {
    const el = ref.current
    if (fixed || !el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [fixed])

  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const o = i * 5 * position
        return {
          id: i,
          d: `M-${380 - o} -${189 + i * 6}C-${380 - o} -${189 + i * 6} -${312 - o} ${216 - i * 6} ${152 - o} ${
            343 - i * 6
          }C${616 - o} ${470 - i * 6} ${684 - o} ${875 - i * 6} ${684 - o} ${875 - i * 6}`,
          width: 0.5 + i * 0.03,
          opacity: Math.min(1, 0.1 + i * 0.03) * intensity,
          // Stable pseudo-random 20–30s duration and start offset per line
          duration: 20 + ((i * 37) % 100) / 10,
          delay: -((i * 53) % 100) / 5,
        }
      }),
    [position, intensity]
  )

  return (
    <div ref={ref} className={`fpaths${fixed ? ' fpaths-fixed' : ''}${inView ? '' : ' is-paused'} ${className}`}>
      <div className="fpaths-layer" aria-hidden="true">
        <svg className="fpaths-svg" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
          {paths.map((p) => (
            <path
              key={p.id}
              d={p.d}
              pathLength="1"
              stroke="currentColor"
              strokeWidth={p.width}
              strokeOpacity={p.opacity}
              style={{ '--fp-dur': `${p.duration}s`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
            />
          ))}
        </svg>
      </div>
      {children && <div className="fpaths-content">{children}</div>}
    </div>
  )
}

export default FloatingPathsBackground
