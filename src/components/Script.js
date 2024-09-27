/* eslint-disable no-param-reassign */

'use client'

import Script from 'next/script'
import React, { useEffect } from 'react'

function ScriptCookie() {
  useEffect(() => {
    const fixThirdPartyLinks = () => {
      // Fix empty href attributes
      document.querySelectorAll('a.cc-btn').forEach((link) => {
        link.setAttribute('href', '#') // Set to a valid URL
        if (!link.getAttribute('aria-label') || link.getAttribute('aria-label') !== link.textContent) {
          link.setAttribute('aria-label', link.textContent.trim())
        }
      })

      document.querySelectorAll('a[href=""]').forEach((link) => {
        link.setAttribute('href', '/cookie-policy') // Set to a valid URL
      })

      document.querySelectorAll('a.cc-link').forEach((link) => {
        if ((!link.getAttribute('aria-label') || link.getAttribute('aria-label') !== link.textContent) && link.textContent !== '') {
          link.setAttribute('aria-label', link.textContent.trim())
        } else if (link.textContent === '') {
          link.style.display = 'none'
        }
      })

      // Ensure links with onclick also have href attributes
      // document.querySelectorAll('a[onclick]').forEach((link) => {
      //   if (!link.getAttribute('href')) {
      //     link.setAttribute('href', '#') // Set to a valid URL or #
      //   }
      // })

      // Make sure hidden elements that should be crawlable are correctly displayed or handled
      // document.querySelectorAll('a[style="display: none;"]').forEach((link) => {
      //   // eslint-disable-next-line no-param-reassign
      //   link.style.display = 'block' // Adjust display for bots or visibility
      // })
    }

    // Run this after the third-party script modifies the DOM
    const observer = new MutationObserver(fixThirdPartyLinks)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect() // Clean up the observer when the component unmounts
    }
  }, [])

  return (
    <Script id="cookie-script" strategy="lazyOnload">
      {`
        fetch("https://krungthai-new.pdpanetka.com/api/cookie/cookiesetting?key=dTlYIaLAgSY9U2bfLUot1w%3d%3d")
          .then((res) => res.text())
          .then((html) => {
            var documentFragment = document.createRange().createContextualFragment(html);
            document.body.appendChild(documentFragment);
          })
          .catch((err) => console.warn('API went wrong.', err));
      `}
    </Script>
  )
}

export default ScriptCookie
