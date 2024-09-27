import React from 'react'
import propTypes from 'prop-types'
import { Card } from '@mantine/core'

function CardComponent(props) {
  const { children } = props
  return (
    <Card
      shadow="sm"
      padding="0"
      // radius="xl"
      h="100%"
      withBorder
      style={{
        borderRadius: '10px',
      }}
    >
      {children}
    </Card>
  )
}

export default CardComponent

CardComponent.propTypes = {
  children: propTypes.node.isRequired,
}
