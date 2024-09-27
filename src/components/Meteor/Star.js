'use client'

import React, { useEffect } from 'react'
import styles from './meteor.module.css'

function Star() {
  useEffect(() => {
    const stars = document.querySelectorAll(`.${styles.star}`)
    stars.forEach((star) => {
      const randomLeft = Math.random() * window.innerWidth
      const randomTop = Math.random() * window.innerHeight
      const randomDelay = Math.random() * 2 // Random delay between 0 and 2 seconds
      star.style.left = `${randomLeft}px`
      star.style.top = `${randomTop}px`
      star.style.animationDelay = `${randomDelay}s` // Apply random delay
    })
  }, [])

  const numberOfstars = 50 // Set the number of stars you want
  const starElements = Array.from({ length: numberOfstars }, (_, index) => (
    <div key={index} className={`${styles.star} ${styles.staranimate}`} />
  ))

  return <>{starElements}</>
}

export default Star
