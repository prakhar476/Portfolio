import { useReveal } from '../hooks/useReveal'
import { educationTimeline, certifications, interests } from '../data/siteData'
import './Education.css'

/**
 * TimelineItem
 * ------------------------------------------------------------
 * One entry in the vertical education timeline: a colored dot,
 * date range, title, subtitle, and description.
 * ------------------------------------------------------------
 */
function TimelineItem({ entry }) {
  return (
    <div className="timeline-item">
      <div className={`timeline-dot dot-${entry.dotColor}`}></div>
      <div className="timeline-date">{entry.date}</div>
      <div className="timeline-title">{entry.title}</div>
      <div className="timeline-sub">{entry.subtitle}</div>
      <div className="timeline-desc">{entry.description}</div>
    </div>
  )
}

/**
 * CertificationRow
 * ------------------------------------------------------------
 * One row in the certifications card: emoji icon, title, status.
 * ------------------------------------------------------------
 */
function CertificationRow({ cert }) {
  return (
    <div className="cert-row">
      <span className="cert-icon">{cert.icon}</span>
      <div>
        <div className="cert-title">{cert.title}</div>
        <div className="cert-status">{cert.status}</div>
      </div>
    </div>
  )
}

export default function Education() {
  const [headerRef, headerVisible] = useReveal()
  const [leftRef, leftVisible] = useReveal()
  const [rightRef, rightVisible] = useReveal()

  return (
    <section id="education" className="section">
      <div className="container">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''}`}>
          <div className="section-label">Background</div>
        </div>
        <h2 className={`section-title reveal reveal-delay-1 ${headerVisible ? 'visible' : ''}`}>
          Education & <span className="accent">Journey</span>
        </h2>

        <div className="education-grid">
          <div ref={leftRef} className={`reveal reveal-delay-1 ${leftVisible ? 'visible' : ''}`}>
            <div className="timeline">
              {educationTimeline.map((entry) => (
                <TimelineItem key={entry.title} entry={entry} />
              ))}
            </div>
          </div>

          <div ref={rightRef} className={`reveal reveal-delay-2 ${rightVisible ? 'visible' : ''}`}>
            {/* <div className="card cert-card">
              <div className="skill-category-title">Certifications & Learning</div>
              <div className="cert-list">
                {certifications.map((cert) => (
                  <CertificationRow key={cert.title} cert={cert} />
                ))}
              </div>
            </div> */}

            <div className="card">
              <div className="skill-category-title">Interests & Goals</div>
              <div className="tech-pills interests-pills">
                {interests.map((interest, i) => (
                  <span key={interest} className={`tag ${i % 2 === 1 ? 'violet' : ''}`}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
