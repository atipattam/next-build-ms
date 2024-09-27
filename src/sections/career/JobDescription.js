'use client'

import styles from '@/styles/pages/career.module.css'
// import Image from 'next/image'
// import _map from 'lodash/map'
import Link from 'next/link'
import { Image } from '@mantine/core'
import { CAREER } from '@/constants/path/constant'
import { useSearchParams } from 'next/navigation'
// import { setCareerCookie } from '@/app/actions'
import { Suspense } from 'react'

// Component to render HTML content
function MyComponent({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

function JobDescription(props) {
  const { jobData, slug } = props
  const param = useSearchParams()
  const from = param.get('from')
  const backUrl = () => {
    if (from === 'career') {
      return '/pages/career.html'
    }
    return '/'
  }

  const handleSetFrom = () => {
    if (from) {
      sessionStorage.setItem('from', from)
    }
  }

  return (
    <section className={styles.positionBg}>
      <div className={styles.positionCard}>
        <div className={styles.positionFlex}>
          <div className="position-content">
            <h3 className={styles.positionTitle}>{jobData?.careerName}</h3>
            <div className={styles.flexSub}>
              <Image
                w={14}
                h={16}
                className={styles.locationIcon}
                src="/assets/img/icon/location-icon.png"
                alt="location-icon"
              />
              <p className={styles.positionAddress}>Klong Toei · BKK</p>
            </div>
          </div>
          <div className={styles.positionSubContent}>
            <Link href={backUrl()} scroll={false}>
              <Image
                w={40}
                h={40}
                className={styles.positionMinus}
                src="/assets/img/icon/minus-circle.png"
                alt="minus-circle"
                onClick={() => handleSetFrom()}
              />
            </Link>
          </div>
        </div>

        <div className={styles.jobCard}>
          <h4 className={styles.jobTitle}>JOB SUMMARY</h4>
          <MyComponent content={jobData?.jobSummary} />
          {jobData?.responsibility && (
            <>
              <h4 className={styles.responsibility}>RESPONSIBILITIES</h4>
              <MyComponent content={jobData?.responsibility} />
            </>
          )}
          <h4 className={styles.qualifications} style={{ marginTop: jobData.responsibility ? '0' : '1rem' }}>QUALIFICATIONS</h4>
          <MyComponent content={jobData?.qualification} />
        </div>

        <div className={styles.join}>

          <Link className={styles.joinLink} href={`/${CAREER}/${slug}-form`}>
            Join our team
          </Link>
        </div>
      </div>
    </section>
  )
}

function SuspenseJobDescription(props) {
  return (
    <Suspense fallback={<div />}>
      <JobDescription {...props} />
    </Suspense>
  )
}

export default SuspenseJobDescription
