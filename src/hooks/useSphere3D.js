import { useEffect, useRef } from 'react'

/**
 * useSphere3D
 * ------------------------------------------------------------
 * Renders a lightweight, dependency-free 3D node-network sphere
 * onto a <canvas>. Built with a fibonacci point lattice + manual
 * 3D rotation/projection — no Three.js needed, so it's fast and
 * has zero bundle-size cost.
 *
 * Features:
 *  - Auto-rotation (paused while the user drags)
 *  - Mouse + touch drag-to-rotate
 *  - Skill labels rendered on front-facing nodes
 *  - Resizes responsively via ResizeObserver
 *
 * Returns a ref to attach to the target <canvas> element.
 * ------------------------------------------------------------
 */
export function useSphere3D(labels) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, cx, cy, R
    let rotX = 0,
      rotY = 0
    let dragging = false,
      lastX = 0,
      lastY = 0
    const dRotX = 0.002,
      dRotY = 0.004
    const POINT_COUNT = 60
    let rafId

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset before re-scaling
      ctx.scale(devicePixelRatio, devicePixelRatio)
      cx = W / 2
      cy = H / 2
      R = Math.min(W, H) * 0.38
    }

    // Generate evenly-distributed points on a unit sphere
    function fibSphere(n) {
      const pts = []
      const phi = Math.PI * (3 - Math.sqrt(5))
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = phi * i
        pts.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius])
      }
      return pts
    }

    const basePts = fibSphere(POINT_COUNT)

    function rot3D([x, y, z], rx, ry) {
      // Rotate around Y axis
      const cosY = Math.cos(ry)
      const sinY = Math.sin(ry)
      const x1 = x * cosY + z * sinY
      const z1 = -x * sinY + z * cosY
      const y1 = y
      // Rotate around X axis
      const cosX = Math.cos(rx)
      const sinX = Math.sin(rx)
      const y2 = y1 * cosX - z1 * sinX
      const z2 = y1 * sinX + z1 * cosX
      return [x1, y2, z2]
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      if (!dragging) {
        rotY += dRotY
        rotX += dRotX * 0.3
      }

      const projected = basePts.map((p, i) => {
        const [x, y, z] = rot3D(p, rotX, rotY)
        const scale = (z + 1.5) / 2.5 // simple perspective
        return { px: cx + x * R, py: cy - y * R, z, scale, i }
      })

      // Sort back-to-front for correct overlap
      projected.sort((a, b) => a.z - b.z)

      // Edges between nearby front-ish nodes
      for (let a = 0; a < projected.length; a++) {
        for (let b = a + 1; b < projected.length; b++) {
          const pa = projected[a]
          const pb = projected[b]
          const dx = pa.px - pb.px
          const dy = pa.py - pb.py
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < R * 0.45) {
            const avgZ = (pa.z + pb.z) / 2
            const alpha = (0.06 + 0.1 * ((avgZ + 1) / 2)) * (1 - dist / (R * 0.45))
            ctx.beginPath()
            ctx.moveTo(pa.px, pa.py)
            ctx.lineTo(pb.px, pb.py)
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Nodes + front-facing labels
      for (const { px, py, z, scale, i } of projected) {
        const alpha = 0.3 + 0.7 * ((z + 1) / 2)
        const r = 2.5 * scale
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${alpha})`
        ctx.fill()

        if (z > 0.2 && i < labels.length) {
          const labelAlpha = Math.min(1, (z - 0.2) * 2.5) * scale
          const fontSize = Math.round(9 * scale * 0.9 + 4)
          ctx.font = `500 ${fontSize}px 'JetBrains Mono', monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(100,255,218,${labelAlpha * 0.85})`
          ctx.fillText(labels[i % labels.length], px, py - r - 6 * scale)
        }
      }

      // Subtle violet core glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.3)
      grad.addColorStop(0, 'rgba(124,58,237,.07)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)

    // Responsive resize via ResizeObserver (covers layout reflow + window resize)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Drag-to-rotate (mouse)
    const onMouseDown = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onMouseUp = () => {
      dragging = false
    }
    const onMouseMove = (e) => {
      if (!dragging) return
      rotY += (e.clientX - lastX) * 0.008
      rotX += (e.clientY - lastY) * 0.008
      lastX = e.clientX
      lastY = e.clientY
    }

    // Drag-to-rotate (touch)
    const onTouchStart = (e) => {
      dragging = true
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
      e.preventDefault()
    }
    const onTouchEnd = () => {
      dragging = false
    }
    const onTouchMove = (e) => {
      if (!dragging) return
      rotY += (e.touches[0].clientX - lastX) * 0.008
      rotX += (e.touches[0].clientY - lastY) * 0.008
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return canvasRef
}
