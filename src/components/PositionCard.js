import React from 'react'
import { Image } from '@mantine/core'

export default function PositionCard({
  title, content, icon, openPosition,
}) {
  return (
    <div className="PositionCard">
      <h3>{title}</h3>
      <div className="icon">
        <Image src={icon} alt="locationIcon" />
      </div>
      <p>{content}</p>
      <div className="openPositionModal">
        <Image src={openPosition} alt="locationIcon" />
      </div>
    </div>
  )
}
