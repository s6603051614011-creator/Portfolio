# Security Portfolio — Vite + React

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Edit content
Everything lives in `src/content.js`. Replace every `[bracket]` placeholder.
Put your CV at `public/cv.pdf` and screenshots in `public/`.

## Contact form (EmailJS)
1. Create a free account at emailjs.com → add an Email Service + Email Template
   (template variables: `{{from_name}}`, `{{reply_to}}`, `{{topic}}`, `{{message}}`).
2. Copy `.env.example` → `.env.local` and fill in the 3 IDs.
3. In EmailJS → Account → Security: allow only your Vercel domain.

## Deploy to Vercel
1. Push this folder to a new GitHub repo.
2. vercel.com → Add New → Project → import the repo (Vite is auto-detected).
3. Settings → Environment Variables → add the 3 `VITE_EMAILJS_*` keys → Redeploy.

`vercel.json` adds SPA routing (so `/contact` works on refresh) and security headers (CSP, X-Frame-Options, etc.).
