import { terminal } from '../content.js'

export default function Terminal() {
  return (
    <div className="terminal" role="img" aria-label="Terminal showing current role and focus">
      <div className="terminal-dots" aria-hidden="true"><span /><span /><span /></div>
      {terminal.map((line) => (
        <div key={line.cmd}>
          <div><span className="prompt">$</span> {line.cmd}</div>
          <div className="terminal-out">{line.out}</div>
        </div>
      ))}
      <div><span className="prompt">$</span> status<span className="cursor" aria-hidden="true" /></div>
    </div>
  )
}
