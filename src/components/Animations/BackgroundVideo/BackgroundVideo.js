'use client'

import React, { useEffect, useRef } from 'react'

function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollFraction = scrollPosition / maxScroll

      if (videoRef.current) {
        const videoDuration = videoRef.current.duration || 1 // Avoid division by zero
        videoRef.current.currentTime = videoDuration * scrollFraction
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="background-video-container">
      <video
        ref={videoRef}
        className="background-video"
        src="/assets/vdo/test.mp4" // Replace with your video path
        type="video/mp4"
        muted
        loop
        playsInline
      />
    </div>
  )
}

export default BackgroundVideo
