import _get from 'lodash/get'
import { appInsightsLogError, appInsightsLogSuccess } from '@/common/appInsightLog'
import axios from '../../axios'

export const getCareerRoleName = async (title) => {
  let allData = {}
  let err = null
  try {
    const response = await axios.get(`/arise-career-api/v1/career-name/${title}`)
    if (response.status === 200) {
      appInsightsLogSuccess(response, `get career role name ${title}`)
      allData = _get(response, 'data.data')
    }
  } catch (error) {
    appInsightsLogError(error, `get career role name ${title}`)
    err = {
      message: error?.message,
      status: error?.status,
      name: 'get career role name',
      code: error?.code,
    }
  }
  return { allData, err }
}
