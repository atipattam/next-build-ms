import _get from 'lodash/get'
import { appInsightsLogSuccess, appInsightsLogError } from '@/common/appInsightLog'
import axios from '../../axios'

const transformDataPaginate = (allData) => {
  const arrData = []
  const jobPerSlide = 6
  for (let i = 0; i < allData.length; i += jobPerSlide) {
    const slide = allData.slice(i, i + jobPerSlide).map((data) => ({
      title: _get(data, 'careerName'),
      location: 'Klong Toei · BKK',
      url: `/career/${_get(data, 'pathMapping')}`,
      param: _get(data, 'pathMapping'),
    }))
    arrData.push(slide)
  }

  return arrData
}

const transformData = (allData) => {
  const arrData = allData.map((data) => ({
    title: _get(data, 'careerName'),
    location: 'Klong Toei · BKK',
    url: `/career/${_get(data, 'pathMapping')}`,
    param: _get(data, 'pathMapping'),
  }))

  return arrData
}
// {
//   title: 'Business Analyst',
//   location: 'Klong Toei · BKK',
//   url: '/career/business-analyst',
// }

export const getCareerList = async (isTransform = false) => {
  let data = []
  let err = null
  const body = {
    pagination: {
      page: 1,
      perpage: 999,
    },
    filter: {
      careerId: null,
      careerName: null,
      sortBy: null,
      orderBy: null,
    },
  }

  try {
    const response = await axios.post('/arise-career-api/v1/careers', body)
    if (response.status === 200) {
      appInsightsLogSuccess(response, 'get career list')
      const allData = _get(response, 'data.data.result')
      if (isTransform) {
        data = allData ? transformDataPaginate(allData) : []
      } else {
        data = allData ? transformData(allData) : []
      }
    }
  } catch (error) {
    appInsightsLogError(error, 'get career list')
    err = {
      message: error?.message,
      status: error?.status,
      code: error?.code,

    }
  }
  return { data, err }
}
