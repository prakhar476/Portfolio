import ParticleField from './components/ParticleField'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * App
 * ------------------------------------------------------------
 * Top-level composition root. Background decoration (gradient
 * blobs + particle canvas) renders first so it sits behind all
 * sections via z-index layering defined in layout.css. Section
 * order here directly maps to the nav anchors in siteData.js —
 * keep both in sync if you reorder sections.
 * ------------------------------------------------------------
 */
export default function App() {
  return (
    <>
      <div className="blob blob-1" aria-hidden="true"></div>
      <div className="blob blob-2" aria-hidden="true"></div>
      <ParticleField />

      <Navbar />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Education />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  )
}
