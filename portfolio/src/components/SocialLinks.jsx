// Social links: on desktop, tabs that slide out from behind the rail on hover;
// on mobile, a floating share button that fans the links out.
import { useEffect, useState } from 'react'
import { profile } from '../content.js'
import { GitHubIcon, LinkedInIcon, MailIcon, ShareIcon, CloseIcon } from './Icons.jsx'

const LINKS = [
  { id: 'github', label: 'GitHub', href: profile.github, Icon: GitHubIcon },
  { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon },
  { id: 'mail', label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
]

const external = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default function SocialLinks() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Desktop: slide-out tabs */}
      <ul className="social-tabs" aria-label="Social links">
        {LINKS.map(({ id, label, href, Icon }) => (
          <li key={id}>
            <a href={href} className={`social-tab social-${id}`} {...external(href)}>
              <span className="social-tab-label">{label}</span>
              <Icon width={22} height={22} />
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile: floating dock */}
      <div className={`social-dock${open ? ' is-open' : ''}`}>
        {open && <div className="social-dock-backdrop" onClick={() => setOpen(false)} />}
        <ul className="social-dock-items" id="social-dock" aria-label="Social links" inert={!open}>
          {LINKS.map(({ id, label, href, Icon }, i) => (
            <li key={id} style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}>
              <a href={href} className={`social-dock-link social-${id}`} aria-label={label} {...external(href)}>
                <Icon width={22} height={22} />
                <span className="social-dock-tip" aria-hidden="true">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="social-dock-btn"
          aria-label={open ? 'Close social links' : 'Open social links'}
          aria-expanded={open}
          aria-controls="social-dock"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <ShareIcon />}
        </button>
      </div>
    </>
  )
}
