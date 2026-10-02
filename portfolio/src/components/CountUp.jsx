// Counts a figure like "4.2%" or "93%" up from zero when it scrolls into view.
// Anything that isn't a number yet (a [placeholder]) is shown as-is.
import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import Todo from './Todo.jsx'

const NUMBER = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/

export default function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const match = NUMBER.exec(value)
  const target = match ? Number(match[2]) : 0
  const decimals = match?.[2].split('.')[1]?.length ?? 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match || !inView) return
    if (reduce) return setN(target)
    const controls = animate(0, target, { duration: 1.6, ease: [0.2, 0.7, 0.1, 1], onUpdate: setN })
    return () => controls.stop()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <span className={className}><Todo>{value}</Todo></span>
  return (
    <span ref={ref} className={className}>
      {match[1]}{n.toFixed(decimals)}{match[3]}
    </span>
  )
}
