// The cover's specimen: one big initial drawn like a type designer's blueprint.
// Its outline draws itself, then fills; construction lines (cap height, baseline, width)
// are measured from the real glyph. Move the pointer across it and the weight follows
// (Fraunces is a variable font), with a CAD-style crosshair reading out coordinates.
// Without a pointer the weight slowly breathes on its own.
import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './LetterSpec.css'

const W = 300
const H = 400
const BASE = 318 // baseline y in the viewBox
const SIZE = 360 // font size in viewBox units
const WGHT = [300, 600] // the weight range loaded from Google Fonts

export default function LetterSpec({ letter = 'R', caption }) {
  const svgRef = useRef(null)
  const glyphRef = useRef(null)
  const [box, setBox] = useState(null) // measured glyph bounds
  const [cross, setCross] = useState(null)
  const reduce = useReducedMotion()

  // Measure the glyph's ink (not its line box) once the font is in, so the guides sit on
  // the real letter. Canvas gives ink bounds relative to the centred anchor.
  useLayoutEffect(() => {
    let alive = true
    const measure = () => {
      if (!alive || !glyphRef.current) return
      try {
        const ctx = document.createElement('canvas').getContext('2d')
        ctx.font = `400 100px ${getComputedStyle(glyphRef.current).fontFamily}`
        ctx.textAlign = 'center'
        const m = ctx.measureText(letter)
        const k = SIZE / 100
        const left = W / 2 - m.actualBoundingBoxLeft * k
        const right = W / 2 + m.actualBoundingBoxRight * k
        setBox({ x: left, w: right - left, cap: BASE - m.actualBoundingBoxAscent * k })
      } catch {
        setBox(null)
      }
    }
    measure()
    document.fonts?.ready.then(measure)
    return () => { alive = false }
  }, [letter])

  const onMove = (e) => {
    const svg = svgRef.current
    const r = svg.getBoundingClientRect()
    const u = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
    const v = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    if (!reduce) svg.style.setProperty('--w', Math.round(WGHT[0] + u * (WGHT[1] - WGHT[0])))
    setCross({ x: u * W, y: v * H })
  }
  const onLeave = () => {
    svgRef.current.style.removeProperty('--w')
    setCross(null)
  }

  const weight = cross && !reduce ? Math.round(WGHT[0] + (cross.x / W) * (WGHT[1] - WGHT[0])) : null

  return (
    <figure className="spec">
      <svg
        ref={svgRef}
        className={`spec-svg${cross ? ' is-tracking' : ''}`}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`The letter ${letter}, drawn as a type specimen`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {/* Construction lines */}
        <g className="spec-guides" aria-hidden="true">
          <line x1="0" x2={W} y1={BASE} y2={BASE} />
          <text x="4" y={BASE + 14}>BASELINE 0</text>
          {box && (
            <>
              <line x1="0" x2={W} y1={box.cap} y2={box.cap} />
              <text x="4" y={box.cap - 6}>CAP {Math.round(BASE - box.cap)}</text>
              <line className="is-dashed" x1="0" x2={W} y1={(box.cap + BASE) / 2} y2={(box.cap + BASE) / 2} />
              <line className="is-dashed" x1={box.x} x2={box.x} y1="20" y2={H - 20} />
              <line className="is-dashed" x1={box.x + box.w} x2={box.x + box.w} y1="20" y2={H - 20} />
              <line className="spec-dim" x1={box.x} x2={box.x + box.w} y1={BASE + 34} y2={BASE + 34} markerStart="url(#spec-arrow)" markerEnd="url(#spec-arrow)" />
              <text x={box.x + box.w / 2} y={BASE + 52} textAnchor="middle">{Math.round(box.w)} u</text>
            </>
          )}
          <circle cx={W / 2} cy="40" r="3" />
        </g>
        <defs>
          <marker id="spec-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" />
          </marker>
        </defs>

        {/* The letter: outline that draws in, then the fill */}
        <text ref={glyphRef} className="spec-fill" x={W / 2} y={BASE} fontSize={SIZE} textAnchor="middle">{letter}</text>
        <text className="spec-outline" x={W / 2} y={BASE} fontSize={SIZE} textAnchor="middle" aria-hidden="true">{letter}</text>

        {/* CAD crosshair */}
        {cross && (
          <g className="spec-cross" aria-hidden="true">
            <line x1="0" x2={W} y1={cross.y} y2={cross.y} />
            <line x1={cross.x} x2={cross.x} y1="0" y2={H} />
            {/* readout pinned to the top-right corner, clear of the letter */}
            <text x={W - 8} y="16" textAnchor="end">
              x {Math.round(cross.x)} · y {Math.round(BASE - cross.y)}{weight ? ` · w ${weight}` : ''}
            </text>
          </g>
        )}
      </svg>
      {caption && <figcaption className="mono">{caption}</figcaption>}
    </figure>
  )
}
