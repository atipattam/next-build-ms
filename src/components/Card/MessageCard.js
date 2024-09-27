'use client'

import React from 'react'
import styles from '@/styles/pages/career.module.css'
import Link from 'next/link'
import _isEmpty from 'lodash/isEmpty'

function MessageCard({
  title, desc, button, url, goToSection = '',
}) {
  const handleClick = () => {
    if (!_isEmpty(goToSection)) {
      sessionStorage.setItem('from', goToSection)
    }
  }

  return (
    <section className={styles.thankyou}>
      <div className={styles.thankyouContainer}>
        <div className={styles.popupInner}>
          <div className={styles.popupHead}>
            <h2 className={styles.thankyouTitle}>{title}</h2>
            <p className={styles.thankyouSubtitle}>{desc}</p>
            <div className={styles.thankyouButton}>
              {' '}
              <Link href={url} passHref>
                <div
                  className={styles.benefitLink}
                  role="presentation"
                  onClick={() => handleClick()}
                >
                  {button}
                </div>
              </Link>
              {' '}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageCard
