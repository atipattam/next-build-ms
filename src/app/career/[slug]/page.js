import _forEach from 'lodash/forEach'
import _isEmpty from 'lodash/isEmpty'
import _last from 'lodash/last'
import _get from 'lodash/get'
import { getCareerRoleName } from '../../../services/inquiry/careerRoleName'

// import PageNotFound from '@/app/not-found'
import { getCareerList } from '../../../services/inquiry/careerList'
import { JobDescription, JobForm } from '@/sections/career'
import { redirect } from 'next/navigation'

export const dynamicParams = true

// ISR configuration
// Revalidate the page every 1 hours //
export const revalidate = 3600

async function getCareerRoleNameWithISR(title) {
  const { allData: jobData, err } = await getCareerRoleName(title)
  // console.log(jobData)
  if (!jobData) {
    console.log('Failed to fetch job data')
  }
  return { jobData, err }
}

async function fetchPostData() {
  const res = await getCareerList()
  return { data: res.data, err: res.err }
}

export async function generateMetadata({ params }) {
  const { slug } = params
  let roleName = slug
  const splitSlug = slug.split('-')
  const isForm = _last(splitSlug) === 'form'
  if (isForm) {
    roleName = slug.slice(0, -5)
  }
  const { jobData, err } = await getCareerRoleNameWithISR(roleName)

  return {
    title: `${jobData?.careerName}`,
    description: 'Job description',
  }
}

export async function generateStaticParams() {
  try {
    const myParam = []
    const { data, err } = await fetchPostData()
    if (err) {
      throw err
    }
    _forEach(data, (d) => {
      myParam.push({ slug: d.param })
      myParam.push({ slug: `${d.param}-form` })
    })
    return myParam
  } catch (error) {
    throw new Error('Generate static param from api list failed')
  }
  // This function will be used to pre-render these pages at build time.
}

export default async function CareerPage({ params }) {
  const { slug } = params
  let job = slug
  const splitSlug = slug.split('-')
  const isForm = _last(splitSlug) === 'form'
  if (isForm) {
    job = slug.slice(0, -5)
  }
  // Fetch job data using ISR
  const { jobData, err } = await getCareerRoleNameWithISR(job)

  if (_isEmpty(jobData) || err) {
    redirect('/not-found')
  }

  return (
    isForm ? <JobForm slug={slug} title={_get(jobData, 'careerName')} id={_get(jobData, 'careerId')} portfolioRequired={_get(jobData, 'portfolioRequired')} />
      : <JobDescription jobData={jobData} slug={slug} />
  )
}
