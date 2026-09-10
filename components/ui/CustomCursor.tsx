'use client'

import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true)
      return
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', updateCursor)
    return () => window.removeEventListener('mousemove', updateCursor)
  }, [])

  if (isTouchDevice) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300"
      style={{ opacity: position.x < 0 ? 0 : 1 }}
    >
      <div
        className={`pointer-events-none fixed top-0 left-0 rounded-full border border-indigo-400/40 bg-indigo-500/20 backdrop-blur-[1px] transition-transform duration-100 cubic-bezier(0.1, 0.7, 0.1, 1)`}
        style={{
          width: isHovered ? 48 : 20,
          height: isHovered ? 48 : 20,
          transform: `translate3d(${position.x - (isHovered ? 24 : 10)}px, ${position.y - (isHovered ? 24 : 10)}px, 0)`,
        }}
      />
      <div
        className="pointer-events-none fixed top-0 left-0 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
        }}
      />
    </div>
  )
}
