import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/siteData'
import { MailIcon, GithubIcon, LinkedinIcon, SendIcon } from './Icons'
import './Contact.css'

const SUBMIT_STATE = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

/**
 * Contact
 * ------------------------------------------------------------
 * Social links column + a controlled contact form. Form state
 * lives entirely in this component (no external form library
 * needed for three fields). On submit, this currently simulates
 * a network call — wire `handleSubmit` up to your backend, a
 * service like Formspree/EmailJS, or a serverless function when
 * ready to go live.
 * ------------------------------------------------------------
 */
export default function Contact() {
  const [leftRef, leftVisible] = useReveal()
  const [rightRef, rightVisible] = useReveal()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitState, setSubmitState] = useState(SUBMIT_STATE.IDLE)

  const updateField = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitState(SUBMIT_STATE.ERROR)
      return
    }

    setSubmitState(SUBMIT_STATE.SENDING)

    // --- Simulated async send -------------------------------------
    // Replace this block with a real request, e.g.:
    //   await fetch('https://your-api.example.com/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   })
    // -----------------------------------------------------------------
    setTimeout(() => {
      setSubmitState(SUBMIT_STATE.SUCCESS)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitState(SUBMIT_STATE.IDLE), 4000)
    }, 1200)
  }

  const isSending = submitState === SUBMIT_STATE.SENDING
  const isSuccess = submitState === SUBMIT_STATE.SUCCESS

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-label">Contact</div>
        <div className="contact-inner">

          <div ref={leftRef} className={`reveal reveal-delay-1 ${leftVisible ? 'visible' : ''}`}>
            <h2 className="contact-heading">
              Let's build
              <br />
              <span className="accent">something great</span>
            </h2>
            <p className="contact-text">
              I'm actively looking for internship and entry-level opportunities in software development, cloud
              engineering, and AI. If you have a role or project you'd like to collaborate on, let's talk.
            </p>

            <div className="social-links">
              <a className="social-link" href={`mailto:${profile.email}`} aria-label="Email Prakhar">
                <MailIcon size={16} />
                {profile.email}
              </a>
              <a className="social-link" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <GithubIcon size={16} />
                {profile.githubLabel}
              </a>
              <a className="social-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <LinkedinIcon size={16} />
                {profile.linkedinLabel}
              </a>
            </div>
          </div>

          <div ref={rightRef} className={`reveal reveal-delay-2 ${rightVisible ? 'visible' : ''}`}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  className="form-input"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={updateField('name')}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  className="form-input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={updateField('email')}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Tell me about the role or project..."
                  value={formData.message}
                  onChange={updateField('message')}
                />
              </div>

              <button type="submit" className="btn-primary submit-btn" disabled={isSending}>
                {isSuccess ? (
                  <>✓ Sent</>
                ) : isSending ? (
                  <>// Sending...</>
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </button>

              {submitState === SUBMIT_STATE.ERROR && (
                <div className="form-feedback error" role="status" aria-live="polite">
                  // All fields are required.
                </div>
              )}
              {isSuccess && (
                <div className="form-feedback success" role="status" aria-live="polite">
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
