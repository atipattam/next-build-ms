'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import propTypes from 'prop-types'
import { useHover } from '@mantine/hooks'
import _isNumber from 'lodash/isNumber'

import {
  Box,
  Title,
  Text,
  Image,
  Grid,
  GridCol,
} from '@mantine/core'

function PositionCard(props) {
  const {
    title = '',
    location = '',
    url = '',
    mb = '0',
    titleFontSize = { base: '22px' },
    height = 'auto',
    page = null,
  } = props
  const { hovered, ref } = useHover()
  const router = useRouter()

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      if (_isNumber(page)) {
        sessionStorage.setItem('page', page)
      }
    }
  }

  return (
    <Box
      p="20px 30px"
      pb={hovered ? '40px' : '20px'}
      mb={mb}
      bg="white"
      h={height}
      style={{
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'padding 0.3s ease-in-out',
      }}
      ref={ref}
      onClick={handleClick}
    >
      <Grid>
        <GridCol span={9} ta="start">
          <Title
            order={3}
            mb="8px"
            fz={titleFontSize}
            c="lightBlue.2"
          >
            {title}
          </Title>
          <Text c="darkBlue.0">
            <Image src="/assets/img/icon/location-icon.png" alt="Location" w="14px" mr="5px" mt="-2px" display="inline-block" />
            {location}
          </Text>
        </GridCol>
        <GridCol span={3}>
          <Image src="/assets/img/icon/plus-circle.png" alt="Open Modal" w="40px" mr="0" ml="auto" />
        </GridCol>
      </Grid>
    </Box>
  )
}

PositionCard.propTypes = {
  title: propTypes.string,
  location: propTypes.string,
  url: propTypes.string,
  mb: propTypes.string,
  height: propTypes.string,
  page: propTypes.number,
  titleFontSize: propTypes.objectOf(propTypes.string),
}

export default PositionCard
