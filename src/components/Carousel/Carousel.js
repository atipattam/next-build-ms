'use client'

/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'
// import Image from 'next/image'
import { Carousel, Embla } from '@mantine/carousel'
import {
  Box, Button, Group,
} from '@mantine/core'
import Image from 'next/image'
import styles from '../../styles/components/carousel.module.css'

function CarouselComponent(props) {
  const {
    // slides,
    children,
    slideSize = '100%',
    slideGap = '0',
    align = 'start',
    draggable = true,
    overflowVisible = false,
    withControls = false,
    withIndicators = false,
    buttonRight = false,
    ...other
  } = props

  const [embla, setEmbla] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleNext = () => embla?.scrollNext()
  const handlePrev = () => embla?.scrollPrev()
  const handleScroll = useCallback(() => {
    if (!embla) return
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [embla, setScrollProgress])

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll)
      handleScroll()
    }
  }, [embla])

  return (
    <Box>
      <Carousel
        mx="auto"
        height="100%"
        draggable={draggable}
        slideGap={slideGap}
        slideSize={slideSize}
        align={align}
        withControls={false}
        withIndicators={withIndicators}
        getEmblaApi={setEmbla}
        containScroll="trimSnaps"
        className={overflowVisible ? 'overflow-visible' : ''}
        breakpoints={[
          { maxWidth: '1024px', slideSize: '50%' },
          { maxWidth: '768px', slideSize: '100%', slideGap: 0 },
        ]}
        styles={{
          indicator: {
            width: 12,
            height: 12,
            border: '2px solid white',
            backgroundColor: 'transparent',
          },
        }}
        {...other}
      >
        {children}
      </Carousel>
      {withControls && (
        <Group
          // pos="absolute"
          // bottom={0}
          // left="50%"
          display="flex"
          justify={buttonRight ? 'flex-end' : 'center'}
          m="20px"
          gap="xl"
        >
          <Button
            p="0"
            w="50px"
            h="50px"
            // pos='absolute'
            bg="transparent"
            bottom={0}
            className={styles.button}
            style={{
              borderRadius: '50%', border: '2px solid var(--mantine-color-lightBlue-2)', zIndex: 10, transition: 'transform 0.2s ease-in-out',
            }}
            onClick={handlePrev}
            disabled={scrollProgress <= 0.1}
          >
            {/* <Box
              w="30px"
              h="30px"
              bg="url(/assets/img/icon/prev-blue.png) no-repeat center center / 100%;"
              style={{ transition: 'transform 0.2s ease-in-out' }}
            /> */}
            <Image
              width={30}
              height={30}
              src="/assets/img/icon/prev-blue.png"
              alt="prev-button"
              className={(scrollProgress > 0.1) && styles['prev-icon']}
              style={{ transition: 'transform 0.2s ease-in-out' }}
            />
          </Button>
          <Button
            p="0"
            w="50px"
            h="50px"
            // pos='absolute'
            bg="transparent"
            bottom={0}
            className={styles.button}
            style={{
              borderRadius: '50%', border: '2px solid var(--mantine-color-lightBlue-2)', zIndex: 10, transition: 'transform 0.2s ease-in-out',
            }}
            onClick={handleNext}
            disabled={scrollProgress >= 99}
          >
            {/* <Box
              w="30px"
              h="30px"
              bg="url(/assets/img/icon/next-blue.png) no-repeat center center / 100%;"
              style={{ transition: 'transform 0.2s ease-in-out' }}
            /> */}
            <Image
              width={30}
              height={30}
              src="/assets/img/icon/next-blue.png"
              alt="next-button"
              className={(scrollProgress < 99) && styles['next-icon']}
              style={{
                transition: 'transform 0.2s ease-in-out',
              }}
            />
          </Button>
        </Group>
      )}
    </Box>
  )
}

export default CarouselComponent

CarouselComponent.propTypes = {
  // slides: propTypes.arrayOf(propTypes.object).isRequired,
  children: propTypes.node.isRequired,
  draggable: propTypes.bool,
  slideSize: propTypes.string,
  slideGap: propTypes.string,
  align: propTypes.string,
  overflowVisible: propTypes.bool,
  withControls: propTypes.bool,
  withIndicators: propTypes.bool,
  buttonRight: propTypes.bool,
}

// CarouselComponent.defaultProps = {
//   slideSize: "100%",
//   slideGap: "0",
//   align: "start",
// };
