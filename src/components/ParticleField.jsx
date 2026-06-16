import { useParticleField } from '../hooks/useParticleField'

/**
 * ParticleField
 * ------------------------------------------------------------
 * Thin presentational wrapper around useParticleField. Renders a
 * full-viewport fixed canvas sitting behind all page content.
 * Styling (position, z-index, opacity) lives in layout.css under
 * #particles-canvas since it's a layout concern shared with the
 * gradient blobs in App.jsx.
 * ------------------------------------------------------------
 */
export default function ParticleField() {
  const canvasRef = useParticleField()
  return <canvas id="particles-canvas" ref={canvasRef} aria-hidden="true" />
}
