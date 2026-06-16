import { useReveal } from '../hooks/useReveal'
import { profile, aboutInfo } from '../data/siteData'
import './About.css'

/**
 * About
 * ------------------------------------------------------------
 * Two-column section: a "terminal card" identity widget on the
 * left, bio copy + quick-facts grid on the right. Both halves
 * fade in independently via useReveal for a staggered effect.
 * ------------------------------------------------------------
 */
export default function About() {
  const [leftRef, leftVisible] = useReveal()
  const [rightRef, rightVisible] = useReveal()

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-label">About Me</div>
        <div className="grid-about">

          <div ref={leftRef} className={`reveal ${leftVisible ? 'visible' : ''}`}>
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                <span className="avatar-initials">{profile.initials}</span>
                <div className="about-avatar-dot" title="Available for opportunities"></div>
              </div>

              <div className="about-terminal" aria-label="Terminal snippet about Prakhar">
                <div className="terminal-bar">
                  <div className="t-dot t-red"></div>
                  <div className="t-dot t-yellow"></div>
                  <div className="t-dot t-green"></div>
                  <span className="terminal-bar-label">prakhar@dev:~</span>
                </div>
                <div className="terminal-body">
                  <div><span className="t-prompt">$ </span><span className="t-cmd">whoami</span></div>
                  <div className="t-out">prakhar.singh</div>
                  <div><span className="t-prompt">$ </span><span className="t-cmd">Current Status</span></div>
                  <div className="t-out">{profile.status}</div>
                  <div><span className="t-prompt">$ </span><span className="t-cmd">Current Location</span></div>
                  <div className="t-out">{profile.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={rightRef} className={`reveal reveal-delay-1 ${rightVisible ? 'visible' : ''}`}>
            <h2 className="section-title">
              Building at the<br />
              <span className="accent">edge of technology</span>
            </h2>

            <div className="about-desc">
              <p>
                I'm {profile.name}, an MCA student fascinated by the full stack — from crafting pixel-perfect UIs to
                designing resilient cloud architectures. I believe great software lives at the intersection of
                elegant code and thoughtful engineering.
              </p>
              <p>
                Currently deep-diving into AI/ML, cloud-native development with AWS, and Infrastructure as Code
                using Terraform. I enjoy turning complex problems into clean, scalable solutions.
              </p>
              <p>
                When I'm not coding, I'm exploring emerging tech, contributing to open source, and leveling up my
                computer science fundamentals.
              </p>
            </div>

            <div className="info-grid">
              {aboutInfo.map((item) => (
                <div className="info-item" key={item.label}>
                  <strong>{item.label}</strong>
                  {item.value}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
