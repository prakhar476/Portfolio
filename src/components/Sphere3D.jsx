import { useSphere3D } from '../hooks/useSphere3D'
import { sphereLabels } from '../data/siteData'
import './Sphere3D.css'

/**
 * Sphere3D
 * ------------------------------------------------------------
 * Thin presentational wrapper around useSphere3D. The hook owns
 * all canvas drawing/animation logic; this component just hands
 * it a ref and the labels to display, and applies sizing CSS.
 * ------------------------------------------------------------
 */
export default function Sphere3D() {
  const canvasRef = useSphere3D(sphereLabels)
  return <canvas id="sphere-canvas" ref={canvasRef} aria-label="Animated 3D tech sphere" role="img" />
}
