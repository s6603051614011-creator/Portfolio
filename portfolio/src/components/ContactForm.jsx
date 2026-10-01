import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import { profile } from '../content.js'
import { AlertIcon, CheckIcon } from './Icons.jsx'

const TOPICS = ['A job or internship', 'A project', 'Something else']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const COOLDOWN_MS = 60_000
const LIMITS = { name: 80, email: 120, message: 2000 }

const env = import.meta.env
const DEMO = env.VITE_DEMO_FORM === '1'
const KEYS = {
  service: env.VITE_EMAILJS_SERVICE_ID,
  template: env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
}

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email so I can reply.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a full email address, like name@company.com'
  if (v.message.trim().length < 10) e.message = 'Write at least a short sentence (10+ characters).'
  return e
}

function lastSent() {
  try { return Number(sessionStorage.getItem('contact:lastSent') || 0) } catch { return 0 }
}
function markSent() {
  try { sessionStorage.setItem('contact:lastSent', String(Date.now())) } catch { /* ignore */ }
}

export default function ContactForm() {
  const [values, setValues] = useState({ topic: TOPICS[0], name: '', email: '', message: '', company: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const fieldRefs = { name: useRef(), email: useRef(), message: useRef() }

  const update = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }
  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return

    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, message: true })
    const first = Object.keys(errs)[0]
    if (first) { fieldRefs[first].current?.focus(); return }

    // Honeypot: real people never see or fill this field.
    if (values.company) { setStatus('sent'); return }

    const wait = COOLDOWN_MS - (Date.now() - lastSent())
    if (wait > 0) {
      setErrorMsg(`You just sent a message. Try again in ${Math.ceil(wait / 1000)} seconds.`)
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      if (DEMO) {
        await new Promise((r) => setTimeout(r, 1200))
      } else {
        if (!KEYS.service || !KEYS.template || !KEYS.publicKey) {
          throw new Error('not-configured')
        }
        await emailjs.send(
          KEYS.service,
          KEYS.template,
          {
            topic: values.topic,
            from_name: values.name.trim().slice(0, LIMITS.name),
            reply_to: values.email.trim().slice(0, LIMITS.email),
            message: values.message.trim().slice(0, LIMITS.message),
          },
          { publicKey: KEYS.publicKey, limitRate: { id: 'contact', throttle: COOLDOWN_MS } }
        )
      }
      markSent()
      setStatus('sent')
    } catch (err) {
      setErrorMsg(
        err?.message === 'not-configured'
          ? 'The contact form isn’t set up yet.'
          : 'Couldn’t send your message.'
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-card form-success" role="status">
        <div className="success-icon"><CheckIcon /></div>
        <h2 className="h4">Message sent. Thank you!</h2>
        <p className="body">I’ll reply to your email as soon as I can.</p>
        <Link to="/" state={{ scrollTo: 'work' }} className="link-strong">Back to projects</Link>
      </div>
    )
  }

  const fieldProps = (key) => ({
    id: `f-${key}`,
    ref: fieldRefs[key],
    value: values[key],
    onChange: update(key),
    onBlur: blur(key),
    maxLength: LIMITS[key],
    'aria-invalid': touched[key] && errors[key] ? true : undefined,
    'aria-describedby': touched[key] && errors[key] ? `f-${key}-err` : undefined,
  })
  const fieldError = (key) =>
    touched[key] && errors[key] ? (
      <span id={`f-${key}-err`} className="field-error"><AlertIcon />{errors[key]}</span>
    ) : null

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      <div className="form-head">
        <h2 id="form-title" className="h4">Send a message</h2>
        <span className="muted">All fields are required.</span>
      </div>

      {status === 'error' && (
        <div className="form-alert" role="alert">
          <AlertIcon />
          <div>
            <strong>{errorMsg}</strong>
            <span>Your text is still here — try again, or email me directly at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.</span>
          </div>
        </div>
      )}

      <fieldset className="topics">
        <legend>I’m reaching out about</legend>
        <div className="topic-row">
          {TOPICS.map((t) => (
            <label key={t} className="topic">
              <input type="radio" name="topic" value={t} checked={values.topic === t} onChange={update('topic')} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
          {fieldError('name')}
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps('email')} />
          {fieldError('email')}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea rows={6} placeholder="Hi, I’d like to talk about…" {...fieldProps('message')} />
        {fieldError('message')}
      </div>

      {/* Honeypot — hidden from people and screen readers */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === 'sending'} aria-busy={status === 'sending'}>
        {status === 'sending' ? (<><span className="spinner" aria-hidden="true" />Sending…</>) : 'Send message'}
      </button>
      <p className="fineprint">
        Your details are only used to reply to you. Protected against spam with a hidden check and rate limiting.
        {DEMO && ' (Preview mode: messages aren’t actually sent.)'}
      </p>
    </form>
  )
}
