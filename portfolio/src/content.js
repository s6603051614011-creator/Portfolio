// ✏️ Edit your portfolio content here. Anything in [brackets] still needs your real info
// (the site underlines it in red until you replace it).

// The whole site is laid out like one issue of a magazine
export const issue = {
  title: 'Field Notes',
  no: '01',
  date: 'October 2026',
}

export const profile = {
  name: 'Ratklao Pholpikul',
  monogram: 'K',
  location: 'Bangkok, Thailand',
  timezone: 'UTC+7',
  // City centre only — never put your home address on a public site
  coordinates: '13.7563° N, 100.5018° E',
  lat: 13.7563,
  lng: 100.5018,
  photo: '/profile.jpg',
  photoSide: '/profile-cutout.webp', // About section (transparent background)
  tagline: 'Keeping networks, code and AI hard to break.',
  taglineEmphasis: 'hard to break', // gets a hand-drawn underline
  photoCaption: 'Fig. 1 — The author, Bangkok, 2026.',
  stamp: 'Open to work ✱ Security ✱ Bangkok ✱ ', // text running round the circle on the cover
  intro:
    'Final-year Computer Engineering student at KMUTNB and incoming Security Engineer Intern at DCS. I work where networks, code and applied AI meet — and I care about keeping them secure.',
  email: '[you@example.com]',
  github: 'https://github.com/[your-handle]',
  linkedin: 'https://www.linkedin.com/in/[your-handle]',
  cv: '/cv.pdf', // put your CV at public/cv.pdf
}

export const terminal = [
  { cmd: 'cat role.txt', out: 'Security Engineer Intern @ DCS' },
  { cmd: 'cat focus.txt', out: 'network security · appsec · applied AI' },
]

export const about = {
  heading: ['Hardware roots,', 'security focus.'],
  pullQuote: 'I’m drawn to the places where hardware and software meet — and to making them hard to break.',
  photoCaption: 'Fig. 2 — Portrait, 2026.',
  paragraphs: [
    'I’m a final-year Electronics Engineering (Computer) student at King Mongkut’s University of Technology North Bangkok. I’m drawn to the places where hardware and software meet — networks, embedded and IoT systems — and to making them hard to break.',
    '[One or two sentences in your own words: what got you into security, and what you want to work on next.]',
  ],
  facts: [
    { label: 'Education', value: 'B.Eng. EnET-C, KMUTNB' },
    { label: 'Next', value: 'Security Intern, DCS' },
    { label: 'Based in', value: 'Bangkok, Thailand' },
    { label: 'Languages', value: 'Thai, English' },
  ],
}

export const featured = {
  kicker: 'Senior thesis · 2026–27',
  title: 'Automated Thai Tax Invoice OCR',
  description:
    'An end-to-end pipeline that reads Thai tax invoices and extracts structured fields. Fine-tuned Typhoon OCR 7B with QLoRA on real invoices expanded through augmentation, served through a FastAPI + React web app.',
  tags: ['Python', 'QLoRA', 'Typhoon OCR 7B', 'FastAPI', 'React', 'SQLite'],
  metrics: [
    { value: '[x.x%]', label: 'CER' },
    { value: '[x.x%]', label: 'WER' },
    { value: '[xx%]', label: 'Field accuracy' },
  ],
  links: [
    { label: 'Read case study', href: '#' },
    { label: 'Source code', href: 'https://github.com/[your-handle]' },
  ],
  image: null, // e.g. '/ocr-screenshot.png' (put the file in public/)
}

export const projects = [
  {
    kicker: 'Web · 2026',
    title: 'This portfolio, secure by default',
    description:
      'Vite + React on Vercel. Strict security headers, no secrets committed to the repo, and a spam-resistant contact form.',
    link: { label: 'Source code', href: 'https://github.com/[your-handle]/portfolio' },
    image: null, // optional: shows as a floating preview on hover
  },
  {
    kicker: 'Security lab · [year]',
    title: '[Lab or CTF write-up title]',
    description: '[What you tested, what you found, and how you’d fix it — two sentences.]',
    link: { label: 'Read write-up', href: '#' },
    image: null,
  },
]

export const experience = [
  {
    period: 'Dec 2026 – Apr 2027',
    role: 'Security Engineer Intern',
    org: 'Datapro Computer Systems (DCS) · Professional Service Operations',
    note: '[Key responsibilities — add once the internship starts]',
  },
  {
    period: '[Start] – [Graduation]',
    role: 'B.Eng. Electronics Engineering (Computer)',
    org: 'King Mongkut’s University of Technology North Bangkok',
    note: 'Senior thesis: Automated Thai Tax Invoice OCR',
  },
]

export const skills = [
  { group: 'Security', items: ['CIA Triad', 'OSI model', 'OWASP Top 10', 'NGFW concepts', 'Incident response', 'PDPA'] },
  { group: 'Build', items: ['Python', 'FastAPI', 'React', 'SQLite', 'Git', 'Linux basics'] },
  { group: 'Applied AI', items: ['QLoRA fine-tuning', 'OCR pipelines', 'CER / WER evaluation'] },
]

export const learning = ['Subnetting & routing', 'NGFW / Deep Packet Inspection', 'TryHackMe Pre-Security']
