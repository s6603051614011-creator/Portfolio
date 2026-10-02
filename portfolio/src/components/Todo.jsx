// Renders text from content.js. If it still has a [bracket] placeholder in it,
// it gets a wavy red underline so it's easy to spot before you hand the site in.
export const isTodo = (text) => typeof text === 'string' && /\[[^\]]+\]/.test(text)

export default function Todo({ children }) {
  if (!isTodo(children)) return children
  return <span className="todo" title="Placeholder — edit src/content.js">{children}</span>
}
