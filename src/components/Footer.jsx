import './Footer.css'

/**
 * Footer
 * ------------------------------------------------------------
 * Simple closing strip. The year is computed at render time so
 * it never needs a manual update.
 * ------------------------------------------------------------
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-logo mono">&lt;PS /&gt; &nbsp;·&nbsp; Prakhar Singh</div>
      <div className="footer-copy">Designed &amp; Built by Prakhar Singh · {year} · MCA Student → Software Engineer</div>
      <div className="footer-copy faded">HTML · CSS · JavaScript · React · Open to Opportunities</div>
    </footer>
  )
}
