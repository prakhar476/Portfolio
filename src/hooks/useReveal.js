import { useEffect, useRef, useState } from 'react'

/**
 * useReveal
 * ------------------------------------------------------------
 * Returns [ref, isVisible]. Attach `ref` to any element; once it
 * scrolls into view, `isVisible` flips to true (and stays true —
 * the observer disconnects after firing once, so elements don't
 * re-animate every time the user scrolls past them).
 *
 * Falls back to "always visible" in browsers without
 * IntersectionObserver support.
 * ------------------------------------------------------------
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
