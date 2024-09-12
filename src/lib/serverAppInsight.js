// lib/serverAppInsights.ts
const appInsights = require('applicationinsights')

console.log(appInsights)
if (!appInsights.defaultClient) {
  appInsights.setup(process.env.APP_INSIGHTS_INSTRUMENTATION_KEY)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true)
    .start();
}

const client = appInsights.defaultClient || appInsights.getClient()

console.log(client)
export { client };