# Ratklao Pholpikul — Portfolio

Personal portfolio built with React and Vite: a "Field Notes" magazine layout on a
blueprint theme (whiteprint in light mode, navy blueprint in dark mode).

## Run locally
```bash
npm install
npm run dev            # http://localhost:5173
npm run dev -- --host  # also reachable from a phone on the same Wi-Fi
npm run build          # production build → dist/
npm run build:single   # one self-contained HTML file → dist-single/ (for offline viewing)
```

## Edit content
All text lives in `src/content.js`: profile, about, projects, experience, education,
the traceroute in Experience (`route`) and skills. Anything still written as a
`[bracket]` placeholder is underlined in red on the page until you replace it.

- Thesis screenshot: put the image in `public/` and set `featured.image`
  (until then Plate 1 shows the animated invoice illustration).
- CV download: put the file at `public/cv.pdf` and set `profile.cv: '/cv.pdf'`.
- Experience entries link to traceroute hops through a shared `host` name.

## Project layout
```
src/
  content.js         all copy and data
  styles.css         theme tokens (light/dark), base type, shared pieces
  sections/          Hero, About, Work, Experience (+ Route), Toolkit, ContactCta
  components/        Masthead, Colophon (footer), LetterSpec, InvoiceScan, Reveal, …
  components/ui/     map card (ExpandMap, RealMap)
  pages/             Home, Contact, NotFound
  lib/smoothScroll.js
```
Each section keeps its CSS next to its component. Colours come only from the tokens
in `styles.css`, so the light/dark switch reaches everything.

## Contact form (EmailJS)
1. Create a free account at emailjs.com → add an Email Service + Email Template
   (template variables: `{{from_name}}`, `{{reply_to}}`, `{{topic}}`, `{{message}}`).
2. Fill the 3 IDs into `.env.local` (git-ignored; see `.env.example`), then restart `npm run dev`.
3. In EmailJS → Account → Security, allow only the site's domain.

## Deploy to Vercel
1. vercel.com → Add New → Project → import the GitHub repo, root directory `portfolio`
   (Vite is detected automatically).
2. Settings → Environment Variables → add the 3 `VITE_EMAILJS_*` keys → Redeploy.

`vercel.json` adds SPA routing (so `/contact` works on refresh) and security headers
(CSP, X-Frame-Options, …). The CSP allows Google Fonts, OpenStreetMap tiles and EmailJS only.
