import { useEffect, useRef } from 'react'

/**
 * useParticleField
 * ------------------------------------------------------------
 * Renders a subtle, fixed-position animated particle network
 * behind all page content. Particles drift slowly and draw
 * faint connecting lines when close to one another.
 *
 * Performance notes:
 *  - Particle count scales with viewport area (capped at 80)
 *    so it stays smooth on small laptops as well as large monitors.
 *  - Uses requestAnimationFrame (synced to refresh rate, no flicker).
 *  - Lines only drawn within a 120px radius to keep the O(n^2)
 *    pair check cheap at this particle count.
 *
 * Returns a ref to attach to the target <canvas> element.
 * ------------------------------------------------------------
 */
export function useParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, particles = []
    let rafId

    function makeParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.5 + 0.1,
      }
    }

    function init() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      particles = []
      const count = Math.min(80, Math.floor((W * H) / 14000))
      for (let i = 0; i < count; i++) particles.push(makeParticle())
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.o})`
        ctx.fill()
      }

      // Connect nearby particles only — keeps this cheap
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(draw)
    }

    init()
    rafId = requestAnimationFrame(draw)

    const onResize = () => init()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return canvasRef
}
