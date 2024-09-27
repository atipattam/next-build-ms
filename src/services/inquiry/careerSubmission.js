import _get from 'lodash/get'
import axios from '../../../axios'

export const careerSubmission = async (formData) => {
  let data = []
  let err = null
  let success = false

  const body = {
    ...formData,
  }

  try {
    const response = await axios.post('/arise-career-api/v1/career-submission', body)
    data = _get(response, 'data')
    success = true
  } catch (error) {
    // appInsightsLogError(err, 'submit-career-submission')
    success = false
    err = {
      message: error?.message,
      status: error?.status,
      name: 'career submission',
      code: error?.code,
    }
  }
  return { data, err, success }
}
