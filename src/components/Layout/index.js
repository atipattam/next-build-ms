/* eslint-disable object-curly-newline */

'use client'

import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Container,
  Flex,
  Group,
  List,
  ListItem,
  Text,
} from '@mantine/core'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDisclosure, useViewportSize, useWindowScroll } from '@mantine/hooks'
import propTypes from 'prop-types'
import _includes from 'lodash/includes'
import Image from 'next/image'
import classes from '../../styles/layout.module.css'
import { FOOTER_MENU, MENU, PRIVACY_PAGE_ROUTE } from '../../constants/layout/constant'

export function Layout({ children }) {
  const pathname = usePathname()
  const { width } = useViewportSize()
  const isForm = pathname.slice(-5, -1) === 'form'
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false)
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const [headerBgColor, setHeaderBgColor] = useState('transparent')
  const [scroll, scrollTo] = useWindowScroll()

  const checkActivePath = (check, url = '/') => {
    if (url === pathname) {
      return true
    }
    return check.some((c) => _includes(pathname, c))
  }

  const headerBackgroundColor = () => {
    if (scroll.y > 30 || mobileOpened
    || _includes(PRIVACY_PAGE_ROUTE, pathname)) {
      setHeaderBgColor('darkBlue.1')
    } else {
      setHeaderBgColor('transparent')
    }
  }

  useEffect(() => {
    headerBackgroundColor()
  }, [scroll, mobileOpened, pathname])

  return (
    <AppShell
      withBorder={false}
      header={{ height: 80 }}
      transitionDuration={300}
      transitionTimingFunction="ease-in-out"
      navbar={{
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header
        p="0 20px"
        bg={isForm && width < 768 ? 'darkBlue.1' : headerBgColor}
      >
        <Container
          size="md"
          className={classes.headerInner}
        >
          <Box className={classes.inner}>
            <Anchor href="/" style={{ display: 'flex' }}>
              <Image
                className="logo"
                src="/assets/img/logo/arise-logo.png"
                alt="Arise"
                width={100}
                height={45}
              />
            </Anchor>

            <Group gap={30} visibleFrom="lg" className={classes.desktopMenuDv}>
              {
                MENU.map((item) => (
                  <Anchor
                    key={item.label}
                    href={item.url}
                    fz="18px"
                    c={checkActivePath(item.checkHighlight, item.url) ? 'white' : 'lightBlue.0'}
                    className={classes.link}
                  >
                    {item.label}
                  </Anchor>
                ))
              }
            </Group>
            {/* <ActionIcon>
              <Image class="icon" alt="Hamburger" src={hamburger} width={100} height={100}/>
            </ActionIcon> */}
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              size="lg"
              hiddenFrom="lg"
              color="white"
            />
          </Box>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar
        className={classes.mobileMenu}
        style={{
          opacity: mobileOpened ? 1 : 0,
          zIndex: mobileOpened ? 999 : -1,
        }}
      >
        <AppShell.Section>
          <List className={classes['list-menu']}>
            {MENU.map((item) => (
              <ListItem key={`nav_${item.label}`} lh="4.5rem">
                <Anchor href={item.url} c={checkActivePath(item.checkHighlight, item.url) ? 'white' : 'lightBlue.0'} className={classes.listMenuItem}>
                  {item.label}
                </Anchor>
              </ListItem>
            ))}
          </List>
          <Box display="flex" align="center" justify="center" style={{ flexDirection: 'column' }}>
            <Anchor c="lightBlue.0" className={classes['mobile-link']} underline="never" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}>Contact</Anchor>
            <Anchor className={classes['call-link']} href="tel:+66917573779" underline="never">+669 1757 3779</Anchor>
            <div display="flex" align="center" justify="center">
              <Anchor target="_blank" href="https://www.linkedin.com/company/arise-by-infinitas/">
                <Image
                  className={classes['social-icon']}
                  src="/assets/img/icon/linkedin.png"
                  alt="LinkedIn"
                  height={20}
                  width={20}
                />
              </Anchor>
            </div>
          </Box>
        </AppShell.Section>
      </AppShell.Navbar>
      <main>
        {children}
      </main>
      <footer
        style={{
          padding: '50px 20px',
          background: 'var(--mantine-color-darkBlue-1)',
          color: 'white',
        }}
      >
        <Container
          // style={{ color: 'white', display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center', alignContent: 'center' }}
          className={classes['footer-inner']}
        >
          <Box className={classes['footer-head']}>
            <List className={classes['footer-list']}>
              {FOOTER_MENU.map((item) => (
                <ListItem key={`footer_${item.label}`} lh="3.5rem">
                  <Anchor
                    href={item.url}
                    c={checkActivePath(item.checkHighlight, item.url) ? 'white' : 'lightBlue.0'}
                    fz={20}
                    fw={400}
                    className={classes.link}
                  >
                    {item.label}
                  </Anchor>
                </ListItem>
              ))}
            </List>
            <Flex direction="column" justify="center" align="center">
              <Anchor href="/">
                <Image
                  className={classes['ft-logo']}
                  src="/assets/img/logo/arise-logo.png"
                  alt="Arise"
                  width={110}
                  height={50}
                />
              </Anchor>
              <Box
                py="1rem"
                style={{ textAlign: 'center' }}
                className={classes['logo-phone']}
              >
                <Anchor
                  className={classes['ft-telLink']}
                  href="tel:+6624839755"
                >
                  +662 483 9755
                </Anchor>
              </Box>
            </Flex>
            <Flex
              justify="center"
              align="top"
              mb="1rem"
              className={classes['js-end-ip-pro']}
            >
              <Anchor
                target="_blank"
                href="https://www.linkedin.com/company/arise-by-infinitas/"
              >
                <Image
                  className={classes['social-icon']}
                  src="/assets/img/icon/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                />
              </Anchor>
            </Flex>
          </Box>
          <Box style={{ textAlign: 'center' }}>
            <Text className={classes['ft-location']}>
              Arise by INFINITAS Co.,Ltd
              {' '}
              <br />
              เลขประจำตัวผู้เสียภาษีอากร 0-1055-64165-34-8
              <br />
              <br />
              88, The PARQ, 5th, 9th - 10th Floors,
              {' '}
              <br className={classes['ip-pro-hide']} />
              Ratchadaphisek Road,
              {' '}
              <br className={classes['ip-pro-show']} />
              Klong Toey Subdistrict,
              <br className={classes['ip-pro-hide']} />
              Klong Toey District, Bangkok, 10110
            </Text>
          </Box>
          <div className={classes.copyright}>
            <p>&copy; Copyright 2024 Arise by INFINITAS</p>
          </div>
        </Container>
      </footer>
    </AppShell>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}
