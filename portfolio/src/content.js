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
  location: 'Bangkok, Thailand',
  timezone: 'UTC+7',
  // Map pin on the contact page: the campus, a public place — never put your home address on a public site
  mapTitle: 'KMUTNB, Bang Sue',
  mapLabel: 'Campus',
  coordinates: '13.8188° N, 100.5142° E',
  lat: 13.818811,
  lng: 100.514206,
  photoSide: '/profile-cutout.webp', // About section (transparent background)
  tagline: 'Keeping networks, code and AI hard to break.',
  taglineEmphasis: 'hard to break', // gets a hand-drawn underline
  markCaption: 'R, set in Fraunces. Move across it to change the weight.', // under the cover initial, after "Fig. 1 —"
  markNote: 'R, for Ratklao', // little pen note with an arrow, next to the cover initial
  intro:
    'Final-year Electronics Engineering (Computer) student at KMUTNB. I work where networks, code and applied AI meet — and I care about keeping them secure.',
  email: 's6603051614011@email.kmutnb.ac.th',
  github: 'https://github.com/s6603051614011-creator',
  // Leave empty to hide. When you have it: '/cv.pdf' (file in public/)
  cv: '',
}

export const terminal = [
  { cmd: 'cat role.txt', out: 'Final-year student @ KMUTNB' }, // shown as "Now:" on the cover and in the footer
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
    { label: 'Thesis', value: 'Thai tax invoice OCR' },
    { label: 'Based in', value: 'Bangkok, Thailand' },
    { label: 'Languages', value: 'Thai, English (basic)' },
  ],
}

// Featured projects, each run as a full spread in Work. `plate` picks the animated
// illustration shown until there's a real `image`.
export const featured = [
  {
    plate: 'invoice',
    kicker: 'Senior thesis · In progress',
    title: 'Automated Thai Tax Invoice OCR',
    description:
      'An end-to-end pipeline that reads Thai tax invoices and extracts structured fields. Fine-tuned a Vision-Language Model (Typhoon OCR 1.5 2B) in Python with QLoRA — including data preprocessing, augmentation and accuracy evaluation — served through a FastAPI + React web app.',
    tags: ['Python', 'QLoRA', 'Typhoon OCR 1.5 2B', 'FastAPI', 'React', 'SQLite'],
    // Optional — add when you have them, e.g. { value: '4.2%', label: 'CER' }
    metrics: [],
    // NB: this repo must be public, or visitors get a GitHub 404
    links: [{ label: 'Source code ↗', href: 'https://github.com/s6603051614011-creator/Thai-Tax-Invoice-OCR-System' }],
    image: null, // e.g. '/ocr-screenshot.png' (put the file in public/)
  },
  {
    plate: 'netscan',
    kicker: 'Security tool · Mar 2026',
    title: 'AI-Powered Network Monitor',
    description:
      'A Python scanner that sweeps a network for live hosts, checks their common ports and grabs service banners, then hands the results to a local LLM (Ollama + llama3) for a plain-language risk assessment. Nothing leaves the machine. Results show in a Rich terminal dashboard and export as HTML and JSON reports. Tested on my own home network only.',
    tags: ['Python', 'socket', 'ThreadPoolExecutor', 'Ollama', 'llama3', 'Rich'],
    // From a real scan of my home Wi-Fi (reports/scan_20260328_190212.json)
    metrics: [
      { value: '8', label: 'Hosts found' },
      { value: '9', label: 'Open ports' },
      { value: '47s', label: 'Full /24 scan' },
    ],
    links: [], // e.g. { label: 'Source code', href: 'https://github.com/...' }
    image: null,
  },
]

export const projects = [
  {
    kicker: 'Web · 2026',
    title: 'This portfolio, secure by default',
    description:
      'Vite + React on Vercel. Strict security headers, no secrets committed to the repo, and a spam-resistant contact form.',
    link: { label: 'Source code', href: 'https://github.com/s6603051614011-creator/Portfolio' },
    image: null, // optional: shows as a floating preview on hover
  },
  {
    kicker: 'Full-stack · Team project · Apr 2026',
    title: 'Sports Facility Booking System',
    description:
      'A booking platform for small sports centres, built with Next.js and Firebase. Developed with Agile/Scrum, using the Singleton, State and Observer design patterns.',
    link: { label: 'Source code', href: 'https://github.com/Aiyarat-am/Sports-Facility-Booking-System-for-Small-Centers' }, // team repo
    image: null,
  },
]

// Work and internships, newest first
export const experience = [
  {
    host: 'gpo',
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
    host: 'kmutnb',
    period: '2023 – Present',
    role: 'B.Eng. Electronics Engineering (Computer)',
    org: 'King Mongkut’s University of Technology North Bangkok · EnET-C',
    note: 'Coursework spanning embedded systems, computer networks, software development and machine learning. Senior thesis: Automated Thai Tax Invoice OCR.',
  },
  {
    host: 'rmutp',
    period: '2021 – 2023',
    role: 'Vocational Certificate, Computer Technician',
    org: 'Rajamangala University of Technology Phra Nakhon · GPAX 3.65',
    note: 'Coursework in computer hardware, operating systems and basic networking.',
  },
]

// The path so far, printed as a traceroute at the top of Experience. Oldest hop first;
// `host` links a hop to the entry above with the same host. `pending: true` shows the
// "* * *" of a hop that hasn't answered yet.
export const route = [
  { host: 'rmutp', what: 'Vocational Certificate, Computer Technician', when: '2021–2023' },
  { host: 'gpo', what: 'IT Support Intern, Ratchathewi Branch', when: 'Oct–Dec 2023' },
  { host: 'kmutnb', what: 'B.Eng. Electronics Engineering (Computer)', when: '2023–now' },
]

export const skills = [
  { group: 'Security', items: ['CIA Triad', 'OSI model', 'OWASP Top 10', 'NGFW concepts', 'Incident response', 'PDPA'] },
  { group: 'Build', items: ['Python', 'JavaScript', 'HTML / CSS', 'React', 'Next.js', 'FastAPI', 'Firebase', 'Machine learning'] },
  { group: 'IT & Infrastructure', items: ['LAN cabling', 'Windows setup', 'Data backup', 'Hardware', 'Microsoft Office'] },
]

