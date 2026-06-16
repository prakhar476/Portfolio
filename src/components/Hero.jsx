import { useTypewriter } from '../hooks/useTypewriter'
import { profile } from '../data/siteData'
import { ExternalLinkIcon, MailIcon } from './Icons'
import Sphere3D from './Sphere3D'
import './Hero.css'

/**
 * Hero
 * ------------------------------------------------------------
 * The above-the-fold introduction: name, animated role text,
 * short tagline, CTA buttons, and the 3D sphere visual.
 * ------------------------------------------------------------
 */
export default function Hero() {
  const roleText = useTypewriter(profile.roles)

  return (
    <section id="hero" className="container hero-grid">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line"></span>
          <span>Hello, World!</span>
        </div>

        <h1 className="hero-name">
          <span className="first">
            {profile.firstName}
            <br />
          </span>
          <span className="last">{profile.lastName}</span>
        </h1>

        <p className="hero-role mono">
          <span>{roleText}</span>
          <span className="cursor" aria-hidden="true"></span>
        </p>

        <p className="hero-desc">{profile.tagline}</p>

        <div className="hero-btns">
          <a href="#projects" className="btn-primary">
            <ExternalLinkIcon />
            View Projects
          </a>
          <a href="#contact" className="btn-ghost">
            <MailIcon />
            Get In Touch
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <Sphere3D />
      </div>
    </section>
  )
}
