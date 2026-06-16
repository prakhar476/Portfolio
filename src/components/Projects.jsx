import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/siteData'
import { GithubIcon, ExternalLinkIcon } from './Icons'
import './Projects.css'

/**
 * ProjectCard
 * ------------------------------------------------------------
 * A single project tile: large faded number, title, description,
 * tag pills, and GitHub/Live Demo links. Each card observes its
 * own visibility for a staggered scroll-in effect.
 * ------------------------------------------------------------
 */
function ProjectCard({ project, delayClass }) {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`card project-card reveal ${delayClass} ${visible ? 'visible' : ''}`}>
      <div className="project-no">{project.no}</div>
      <div className="project-title">{project.title}</div>
      <div className="project-desc">{project.description}</div>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag.label} className={`tag ${tag.variant === 'violet' ? 'violet' : ''}`}>
            {tag.label}
          </span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.githubUrl} className="project-link">
          <GithubIcon size={12} />
          GitHub
        </a>
        <a href={project.liveUrl} className="project-link">
          <ExternalLinkIcon size={12} />
          Live Demo
        </a>
      </div>
    </div>
  )
}

/**
 * ComingSoonCard
 * ------------------------------------------------------------
 * A dashed-border placeholder tile signaling more projects are
 * on the way. Kept separate from ProjectCard since it has no
 * links and intentionally muted styling.
 * ------------------------------------------------------------
 */
function ComingSoonCard() {
  const [ref, visible] = useReveal()

  return (
    <div ref={ref} className={`card project-card coming-soon reveal reveal-delay-1 ${visible ? 'visible' : ''}`}>
      <div className="project-no faded">04</div>
      <div className="project-title muted-title">More Coming Soon</div>
      <div className="project-desc">
        I'm actively working on new projects exploring LLMs, serverless architectures, and DevOps pipelines. Stay
        tuned for updates!
      </div>
      <div className="project-tags">
        <span className="tag">LLMs</span>
        <span className="tag violet">Serverless</span>
        <span className="tag">DevOps</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''}`}>
          <div className="section-label">Portfolio</div>
        </div>
        <h2 className={`section-title reveal reveal-delay-1 ${headerVisible ? 'visible' : ''}`}>
          Featured <span className="accent">Projects</span>
        </h2>
        <p className={`projects-intro reveal reveal-delay-2 ${headerVisible ? 'visible' : ''}`}>
          A selection of projects that showcase my growth as a developer — from interactive frontends to
          cloud-deployed applications.
        </p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.no} project={project} delayClass={`reveal-delay-${(i % 3) + 1}`} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  )
}
