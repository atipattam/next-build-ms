'use client'

import { useEffect } from 'react'
import { useIsFirstRender } from '@mantine/hooks'
// import { useFromSection } from './useFromSectionContext'

export const useScrollSection = (ref, section) => {
  const firstRender = useIsFirstRender()

  useEffect(() => {
    const from = sessionStorage.getItem('from')
    if (ref && ref.current && section === from && !firstRender) {
      const height = ref.current.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: height - 80,
      })
      sessionStorage.removeItem('from')
    }
  }, [ref, section, firstRender])
}
