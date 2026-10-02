const base = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}

export const HomeIcon = (p) => (<svg {...base} {...p}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>)
export const UserIcon = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>)
export const FolderIcon = (p) => (<svg {...base} {...p}><path d="M3 7h6l2 2h10v10H3z" /></svg>)
export const BriefcaseIcon = (p) => (<svg {...base} {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V4h6v3" /></svg>)
export const MailIcon = (p) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>)
export const GitHubIcon = (p) => (<svg {...base} width={20} height={20} {...p}><path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>)
export const LinkedInIcon = (p) => (<svg {...base} width={20} height={20} {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>)
export const MenuIcon = (p) => (<svg {...base} width={24} height={24} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>)
export const CloseIcon = (p) => (<svg {...base} width={24} height={24} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const AlertIcon = (p) => (<svg {...base} width={18} height={18} strokeWidth={2} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.01" /></svg>)
export const CheckIcon = (p) => (<svg {...base} width={26} height={26} strokeWidth={2.2} {...p}><path d="M5 12l5 5 9-10" /></svg>)
export const ChevronDownIcon = (p) => (<svg {...base} width={28} height={28} {...p}><path d="M6 9l6 6 6-6" /></svg>)
export const ShareIcon = (p) => (<svg {...base} width={24} height={24} {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>)
