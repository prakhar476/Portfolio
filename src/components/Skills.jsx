import { useReveal } from '../hooks/useReveal'
import { skillCategories } from '../data/siteData'
import './Skills.css'

/**
 * SkillBar
 * ------------------------------------------------------------
 * A single labeled progress bar. The fill width animates from 0
 * to its target percentage only once it's visible on screen,
 * via the parent card's reveal state (passed down as `animate`).
 * ------------------------------------------------------------
 */
function SkillBar({ name, value, animate }) {
  return (
    <div className="skill-bar-wrap">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span>{value}%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: animate ? `${value}%` : '0%' }} />
      </div>
    </div>
  )
}

/**
 * SkillCard
 * ------------------------------------------------------------
 * One category card (e.g. "Frontend Development") containing a
 * title, a stack of SkillBars, and a row of tech-stack pills.
 * Has its own reveal observer so cards stagger in as the user
 * scrolls, and the same visibility flag drives its bars' fill.
 * ------------------------------------------------------------
 */
function SkillCard({ category, delayClass }) {
  const [ref, visible] = useReveal(0.3)

  return (
    <div ref={ref} className={`card reveal ${delayClass} ${visible ? 'visible' : ''}`}>
      <div className="skill-category-title">{category.title}</div>
      {category.skills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} value={skill.value} animate={visible} />
      ))}
      <div className="tech-pills">
        {category.pills.map((pill) => (
          <span key={pill} className={`tag ${category.pillVariant === 'violet' ? 'violet' : ''}`}>
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''}`}>
          <div className="section-label">Skills & Technologies</div>
        </div>
        <h2 className={`section-title reveal reveal-delay-1 ${headerVisible ? 'visible' : ''}`}>
          My Technical <span className="accent">Arsenal</span>
        </h2>

        <div className="skills-grid">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.title} category={category} delayClass={`reveal-delay-${(i % 2) + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
