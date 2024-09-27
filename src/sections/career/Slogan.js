'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '@/styles/pages/about.module.css'
import sloganBackgroundDesktop from '../../../public/assets/img/bg/slogan-bg-4.png'
import sloganBackgroundMobile from '../../../public/assets/img/bg/slogan-bg-3.png'

export default function Slogan() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on initial render
    handleResize()

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className={`${styles.bannerContainer}`}>
      <Image
        src={sloganBackgroundDesktop}
        alt="Desktop Banner"
        className={styles.careerImage}
      />
      <Image
        src={sloganBackgroundMobile}
        alt="Mobile Banner"
        className={styles.careerMobileImage}
      />
      <div className={`${styles.bannerOverlay}`}>
        {isMobile ? (
          <h1 className={`${styles.textSlogan}`}>
            Making
            {' '}
            <br />
            {' '}
            digital life
            {' '}
            <br />
            {' '}
            possible for All
          </h1>
        ) : (
          <h1 className={`${styles.textSlogan}`}>
            Making digital life possible for All
          </h1>
        )}
      </div>
    </section>
  )
}
