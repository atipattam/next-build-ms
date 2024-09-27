/* eslint-disable jsx-a11y/iframe-has-title */
// import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
// import '@mantine/core/styles/global.layer.css'
import '@mantine/core/styles/Anchor.css'
import '@mantine/core/styles/AppShell.css'
import '@mantine/core/styles/Combobox.css'
import '@mantine/core/styles/UnstyledButton.css'
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/Burger.css'
import '@mantine/core/styles/Container.css'
import '@mantine/core/styles/List.css'
import '@mantine/core/styles/Grid.css'
import '@mantine/core/styles/Flex.css'
import '@mantine/core/styles/Group.css'
import '@mantine/core/styles/Stack.css'
import '@mantine/core/styles/Text.css'
import '@mantine/core/styles/Card.css'
import '@mantine/core/styles/Paper.css'
import '@mantine/core/styles/Center.css'
import '@mantine/core/styles/Image.css'
import '@mantine/core/styles/Checkbox.css'
import '@mantine/core/styles/Alert.css'
import '@mantine/carousel/styles.css'
// import '@mantine/core/styles/TypographyStylesProvider.css'
import React from 'react'
import Head from 'next/head'
import {
  MantineProvider,
  // TypographyStylesProvider
} from '@mantine/core'
// import { theme } from '../theme/theme'
import './globals.css'

export const viewport = {
  themeColor: '#ffffff',
}

export const metadata = {
  title: {
    template: '%s - Arise by INFINITAS',
    default: 'Arise by INFINITAS',
  },
  keywords: ['Arise, Infinitas'],
  description: 'Be part of our team to make the world better',
  openGraph: {
    title: 'Arise by INFINITAS',
    description: 'Be part of our team to make the world better',
    url: 'https://www.arise.tech',
    images: [
      {
        url: 'https://www.arise.tech/assets/img/arise-og.jpg', // Must be an absolute URL
      },
    ],
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/assets/img/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/assets/img/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: { url: '/assets/img/favicon/apple-touch-icon.png', sizes: '76x76' },
  },
  manifest: '/assets/img/favicon/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
 
   
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body>
      
        <MantineProvider>
     {children}
        </MantineProvider>
      </body>
    </html>
  )
}
