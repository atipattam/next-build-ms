const appInsights = require('applicationinsights')

const isProduction = process.env.NODE_ENV === 'production'

// eslint-disable-next-line no-underscore-dangle
if (!global.__appInsightsClient__) {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true)
    .setInternalLogging(
      !isProduction,
      !isProduction,
    ) // Enable verbose internal logging in production
    .start()
  // eslint-disable-next-line no-underscore-dangle
  global.__appInsightsClient__ = appInsights.defaultClient
}
// Safely assign the client with fallback to getClient()
// eslint-disable-next-line no-underscore-dangle
const client = global.__appInsightsClient__ || appInsights.getClient()

export const appInsightsLogError = (err, serviceName = '') => {
  if (isProduction) {
    const obj = {}

    if (err.config.method === 'post') {
      obj.body = err.config.data
    }

    client.trackException({
      exception: err,
      properties: {
        name: serviceName,
        messsage: err.response.data.message || '-',
        code: err.response.data.code || '-',
        method: err.config.method || '-',
        baseUrl: err.config.baseUrl || '-',
        url: err.config.url || '-',
        ...obj,
      },
    })
  } else {
    console.log(err, serviceName)
  }
}

export const appInsightsLogSuccess = (response, serviceName) => {
  const obj = {}

  if (response.config.method === 'post') {
    obj.body = response.config.data
  }

  if (process.env.NODE_ENV === 'production') {
    client.trackEvent({
      name: `${serviceName} success`,
      properties: {
        method: response.config.method,
        baseUrl: response.config.baseURL,
        url: response.config.url,
        ...obj,
      },
    })
  } else {
    console.log(serviceName)
  }
}
