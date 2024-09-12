// lib/serverAppInsights.ts
const appInsights = require('applicationinsights')

console.log(appInsights)
if (!appInsights.defaultClient) {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true)
    .start();
}

const client = appInsights.defaultClient || appInsights.getClient()

export { client };