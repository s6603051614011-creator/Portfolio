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
  // Map pin on the contact page: the campus, a public place — never put your home address on a public site
  mapTitle: 'KMUTNB, Bang Sue',
  mapLabel: 'Campus',
  coordinates: '13.8188° N, 100.5142° E',
  lat: 13.818811,
  lng: 100.514206,
  photo: '/profile.jpg',
  photoSide: '/profile-cutout.webp', // About section (transparent background)
  tagline: 'Keeping networks, code and AI hard to break.',
  taglineEmphasis: 'hard to break', // gets a hand-drawn underline
  photoCaption: 'Bangkok, 2026', // handwritten under the cover photo
  photoNote: 'that’s me', // little pencilled note with an arrow, next to the cover photo
  stamp: 'Open to work ✱ Security ✱ Bangkok ✱ ', // text running round the circle on the cover
  intro:
    'Final-year Computer Engineering student at KMUTNB and incoming Security Engineer Intern at DCS. I work where networks, code and applied AI meet — and I care about keeping them secure.',
  email: 's6603051614011@email.kmutnb.ac.th',
  github: 'https://github.com/[your-handle]',
  // Leave empty to hide. When you have them: 'https://www.linkedin.com/in/...' and '/cv.pdf' (file in public/)
  linkedin: '',
  cv: '',
}

export const terminal = [
  { cmd: 'cat role.txt', out: 'Security Engineer Intern @ DCS' },
  { cmd: 'cat focus.txt', out: 'network security · appsec · applied AI' },
]

export const about = {
  heading: ['Hardware roots,', 'security focus.'],
  pullQuote: 'I’m drawn to the places where hardware and software meet — and to making them hard to break.',
  photoCaption: 'Portrait, 2026',
  paragraphs: [
    'I’m a final-year Electronics Engineering (Computer) student at King Mongkut’s University of Technology North Bangkok. I’m drawn to the places where hardware and software meet — networks, embedded and IoT systems — and to making them hard to break.',
    'Before engineering I trained as a computer technician, and an IT support internship at the Government Pharmaceutical Organization put that to work — installing Windows, setting up data backups and running LAN cable for the office. I’m now focused on cybersecurity and ready to apply those skills in a security-focused role.',
  ],
  facts: [
    { label: 'Education', value: 'B.Eng. EnET-C, KMUTNB' },
    { label: 'Next', value: 'Security Intern, DCS' },
    { label: 'Based in', value: 'Bangkok, Thailand' },
    { label: 'Languages', value: 'Thai, English (basic)' },
  ],
}

export const featured = {
  kicker: 'Senior thesis · In progress',
  title: 'Automated Thai Tax Invoice OCR',
  description:
    'An end-to-end pipeline that reads Thai tax invoices and extracts structured fields. Fine-tuned a Vision-Language Model (Typhoon OCR 7B) in Python with QLoRA — including data preprocessing, augmentation and accuracy evaluation — served through a FastAPI + React web app.',
  tags: ['Python', 'QLoRA', 'Typhoon OCR 7B', 'FastAPI', 'React', 'SQLite'],
  // Optional — add when you have them, e.g. { value: '4.2%', label: 'CER' } / { label: 'Source code', href: '...' }
  metrics: [],
  links: [],
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
    kicker: 'Full-stack · Apr 2026',
    title: 'Sports Facility Booking System',
    description:
      'A booking platform for small sports centres, built with Next.js and Firebase. Developed with Agile/Scrum, using the Singleton, State and Observer design patterns.',
    link: null, // e.g. { label: 'Source code', href: 'https://github.com/...' }
    image: null,
  },
]

// Work and internships, newest first
export const experience = [
  {
    period: 'Dec 2026 – Apr 2027',
    role: 'Security Engineer Intern',
    org: 'Datapro Computer Systems (DCS) · Professional Service Operations',
    note: '[Key responsibilities — add once the internship starts]',
  },
  {
    period: 'Oct 2023 – Dec 2023',
    role: 'IT Support Intern',
    org: 'Government Pharmaceutical Organization · Ratchathewi Branch',
    points: [
      'Installed and configured data backup software to protect organizational data.',
      'Installed and set up Windows on office computers.',
      'Set up and connected LAN cabling for office network connectivity.',
    ],
  },
]

// Schooling, newest first
export const education = [
  {
    period: '2023 – Present',
    role: 'B.Eng. Electronics Engineering (Computer)',
    org: 'King Mongkut’s University of Technology North Bangkok · EnET-C',
    note: 'Coursework spanning embedded systems, computer networks, software development and machine learning. Senior thesis: Automated Thai Tax Invoice OCR.',
  },
  {
    period: '2021 – 2023',
    role: 'Vocational Certificate, Computer Technician',
    org: 'Rajamangala University of Technology Phra Nakhon · GPAX 3.65',
    note: 'Coursework in computer hardware, operating systems and basic networking.',
  },
]

export const skills = [
  { group: 'Security', items: ['CIA Triad', 'OSI model', 'OWASP Top 10', 'NGFW concepts', 'Incident response', 'PDPA'] },
  { group: 'Build', items: ['Python', 'JavaScript', 'HTML / CSS', 'React', 'Next.js', 'FastAPI', 'Firebase', 'Machine learning'] },
  { group: 'IT & Infrastructure', items: ['LAN cabling', 'Windows setup', 'Data backup', 'Hardware', 'Microsoft Office'] },
]

export const learning = ['Subnetting & routing', 'NGFW / Deep Packet Inspection', 'TryHackMe Pre-Security']
