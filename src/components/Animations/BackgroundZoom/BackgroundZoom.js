'use client'

import React, { useEffect } from 'react'
import styles from './Backgroundzoom.module.css'

function BackgroundZoom() {
  useEffect(() => {
    const handleScroll = () => {
      const backgroundzoom = document.querySelector(`.${styles.Backgroundzoom}`)
      const scrollPosition = window.scrollY
      const scale = 1 + scrollPosition / 1000 // Adjust the divisor to control zoom speed
      backgroundzoom.style.backgroundSize = `${50 * scale}%`
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <div style={{ height: '200vh' }} className={`${styles.Backgroundzoom}`} /> // Add extra height for scrolling
}

export default BackgroundZoom
