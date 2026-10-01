// The template's signature effect, kept but quieter:
// letters rise in once on load, and each one lifts slightly on hover.
export default function AnimatedLetters({ text, startDelay = 0 }) {
  return (
    <span className="letters" aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span className="word" aria-hidden="true" key={w}>
          {[...word].map((ch, i) => (
            <span
              className="letter"
              key={i}
              style={{ animationDelay: `${startDelay + (w * 6 + i) * 28}ms` }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
