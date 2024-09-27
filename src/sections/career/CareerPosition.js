'use client'

import React, { useEffect, useRef, useState } from 'react'
// import propTypes from 'prop-types'
import _map from 'lodash/map'
import {
  Box, Grid, GridCol, Text, Title,
} from '@mantine/core'
// import { CAREER_POSITION } from '@/constants/career/constant'
// import { CAREER_POSITION } from '@/constants/career/constant'
import { Carousel } from '@/components/Carousel'
import { CarouselSlide } from '@mantine/carousel'
import { useViewportSize } from '@mantine/hooks'
import Link from 'next/link'
import _toNumber from 'lodash/toNumber'
import Image from 'next/image'
// import { getCareerCookie } from '@/app/actions'
import { useScrollSection } from '@/common/useScrollSection'
import { PositionCard } from '../../components/Card/index'
import styles from '../../styles/pages/career.module.css'
import AriseImgCareer from '../../../public/assets/img/career/banner/aris-img-career.jpg'

function CareerPosition(props) {
  const { careerList } = props
  const { width } = useViewportSize()
  const [page, setPage] = useState(0)
  const ref = useRef(null)

  useScrollSection(ref, 'career')

  const [initialPage, setInitialPage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('page')) {
        return _toNumber(sessionStorage.getItem('page'))
      }
    }
    return 0
  })

  useEffect(() => {
    if (sessionStorage.getItem('page')) {
      sessionStorage.removeItem('page')
    }
  }, [])

  const slideChange = (e) => {
    setPage(e)
  }

  // useEffect(() => {
  //   async function focusElement() {
  //     // const value = await getCareerCookie()
  //     // if (value === 'TRUE') {
  //     const element = document.getElementById('career')
  //     if (element) {
  //       // Get the element's position relative to the viewport
  //       const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

  //       // Scroll to 100px above the element
  //       window.scrollTo({
  //         top: elementPosition - 80, // 100px from the top
  //         // behavior: "smooth", // Smooth scroll
  //       })

  //       // Optionally, focus the element (if it's focusable like input)
  //       element.focus()
  //     }
  //     // }
  //   }

  //   focusElement()
  // }, [])

  // useEffect(() => {
  //   if (window.location.href.includes('#career')) {
  //     const element = document.getElementById('career')
  //     if (element) {
  //       // Get the element's position relative to the viewport
  //       const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

  //       // Scroll to 100px above the element
  //       window.scrollTo({
  //         top: elementPosition - 80, // 100px from the top
  //         // behavior: "smooth", // Smooth scroll
  //       })

  //       // Optionally, focus the element (if it's focusable like input)
  //       element.focus()
  //     }
  //   }
  // }, [])

  return (
    <section ref={ref}>
      <div className={styles['position-container']}>
        <Box className={styles['position-inner']}>
          <Box
            // w={{ md: '50%' }}
            // p={{ md: '100px 0px' }}
            mx={{ md: '40px' }}
            ta={{ base: 'center', md: 'left' }}
          >
            <Text fz="20" c="lightBlue.2">
              BE PART OF OUR TEAM
            </Text>
            <Title order={2} fz="40px" fw={700}>
              To make the World better
            </Title>
            <Carousel
              mt="40px"
              slideGap="xl"
              withControls
              draggable={false}
              initialSlide={initialPage}
              withIndicators={false}
              buttonRight={width >= 768}
              onSlideChange={slideChange}
            >
              {_map(careerList, (slide, index) => (
                <CarouselSlide key={`slide_${index}`}>
                  <Grid
                    // maw={{ md: '350px' }}
                    p="10px"
                    // mx="20px"
                  >
                    {slide.map((item) => (
                      <GridCol span={{ base: 12, sm: 6 }} key={item.title}>
                        <Link
                          href={{
                            pathname: item.url,
                            query: { from: 'career' },
                          }}
                          scroll={false}
                          passHref
                        >
                          <PositionCard
                            title={item.title}
                            titleFontSize={{ base: '22px', md: '20px' }}
                            height="136px"
                            location={item.location}
                            url={item.url}
                            page={page}
                          />
                        </Link>
                      </GridCol>
                    ))}
                  </Grid>
                </CarouselSlide>
              ))}
            </Carousel>
          </Box>
        </Box>
        <Box
          w={{ md: '30%' }}
          // display={{ base: 'none', md: 'block' }}
        >
          <Image
            src={AriseImgCareer}
            alt="position"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </div>
    </section>
  )
}

CareerPosition.propTypes = {}

export default CareerPosition

// export const getStaticProps = async () => {
//   // const postData = await getCareerList();
//   const { data: careerList } = await getCareerList()
//     // try {
//     //   console.log(careerList)
//     // } catch (e) {
//     //   console.log(e)
//     // }

//   return {
//     props: {
//       careerList,
//     },
//     revalidate: 10, // Regenerate the page every 60 seconds
//   }
// }
