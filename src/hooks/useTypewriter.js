import { useEffect, useState } from 'react'

/**
 * useTypewriter
 * ------------------------------------------------------------
 * Cycles through an array of role strings, typing each one out
 * character-by-character, pausing, then deleting and moving to
 * the next. Returns the current substring to render.
 *
 * All timing is self-contained — no external animation library.
 * ------------------------------------------------------------
 */
export function useTypewriter(roles, { typeSpeed = 80, deleteSpeed = 50, pauseTime = 1800, startDelay = 600 } = {}) {
  const [text, setText] = useState('')

  useEffect(() => {
    let roleIndex = 0
    let charIndex = 0
    let deleting = false
    let timeoutId

    function tick() {
      const current = roles[roleIndex]

      if (deleting) {
        charIndex--
        setText(current.slice(0, charIndex))
        if (charIndex === 0) {
          deleting = false
          roleIndex = (roleIndex + 1) % roles.length
          timeoutId = setTimeout(tick, 400)
          return
        }
        timeoutId = setTimeout(tick, deleteSpeed)
      } else {
        charIndex++
        setText(current.slice(0, charIndex))
        if (charIndex === current.length) {
          deleting = true
          timeoutId = setTimeout(tick, pauseTime)
          return
        }
        timeoutId = setTimeout(tick, typeSpeed)
      }
    }

    timeoutId = setTimeout(tick, startDelay)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}
