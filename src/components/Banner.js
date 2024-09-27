import React from 'react'
import styles from '@/styles/pages/about.module.css'
// import { Image } from '@mantine/core'
import Image from 'next/image'

export default function Banner({
  title, desc, srcDesktop, srcMobile,
}) {
  return (
    <section className={`${styles.bannerContainer}`}>
      <Image placeholder="blur" src={srcDesktop} alt="Desktop Banner" className={styles.image} />
      <Image
        src={srcMobile}
        alt="Mobile Banner"
        className={styles.mobileImage}
        style={{ objectFit: 'contain' }}
        placeholder="blur"
      />
      <div className={`${styles.bannerOverlay}`}>
        <h1 className={`${styles.topicTitle}`}>{title}</h1>

        <h1 className={`${styles.textSizeHome}`}>{desc}</h1>
      </div>
    </section>
  )
}
