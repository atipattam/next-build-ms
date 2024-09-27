/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */

'use client'

import React, { useEffect } from 'react'
import styles from './Meteor.module.css'

function Meteor() {
  useEffect(() => {
    const meteoranimate = document.querySelectorAll(`.${styles.meteoranimate}`)
    meteoranimate.forEach((meteoranimate) => {
      setInterval(() => {
        const long = Math.random() * window.innerWidth
        meteoranimate.animate(
          [
            {
              transform: 'translate(0, 0) rotate(-45deg)', opacity: 1, top: '0%', left: `${long}px`,
            },
            {
              transform: 'translate(0px, 0px) rotate(-45deg)', opacity: 0, top: '100%', left: `${(long - 900)}px`,
            },
          ],
          {
            duration: 3000,
            iterations: Infinity,
          },
        )
      }, 3000)
    })
  }, [])

  const numberOfMeteors = 1 // Set the number of meteors you want
  const meteorElements = Array.from({ length: numberOfMeteors }, (_, index) => (
    <div key={index} className={`${styles.meteor} ${styles.meteoranimate}`} />
  ))

  return <>{meteorElements}</>
}

export default Meteor
