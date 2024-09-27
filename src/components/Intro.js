'use client'

import React, { useState, useEffect } from 'react'
import styles from '@/styles/pages/about.module.css'
import Image from 'next/image'

export default function Intro({
  title,
  descMobile,
  descDesktop,
  introContainer,
  imageSrc,
  altImage,
}) {
  // const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined'
  //   ? window.innerWidth < 1200 : false))

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 1200)
  //   }

  //   // Check on initial render
  //   handleResize()

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize)

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  return (
    <section className={`${introContainer}`}>
      <Image
        src={imageSrc}
        placeholder="blur"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
        alt={altImage}
      />
      <div
        style={{
          padding: '60px 20px',
          width: '100%',
        }}
      >
        <div className={`${styles.introInner}`}>
          <div>
            <h2 className={`${styles.introTitle}`}>{title}</h2>
          </div>
          <div>
            {/* {isMobile ? ( */}
            <p className={`${styles.introDesc} ${styles.descMobile}`}>{descMobile}</p>
            {/* ) : ( */}
            <p className={`${styles.introDesc} ${styles.descDesktop}`}>{descDesktop}</p>
            {/* )} */}
          </div>
        </div>
      </div>
    </section>
  )
}
