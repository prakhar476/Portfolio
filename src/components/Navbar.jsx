import { useEffect, useState } from 'react'
import { navLinks } from '../data/siteData'
import './Navbar.css'

/**
 * Navbar
 * ------------------------------------------------------------
 * Fixed top navigation. Gains a blurred background once the user
 * scrolls past 40px (handled via a scroll listener + class toggle,
 * not re-render-heavy state). On small screens, collapses into a
 * full-screen hamburger menu.
 * ------------------------------------------------------------
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <a className="nav-logo" href="#hero" aria-label="Prakhar Singh home">
          <span className="nav-logo-bracket">&lt;</span>Prakhar Singh<span className="nav-logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} data-n={link.n} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a className="nav-cta" href="#contact">
          Hire Me
        </a>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
