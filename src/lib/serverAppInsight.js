
const appInsights = require('applicationinsights')

let instance = null;

export function getAppInsightsInstance() {
  if (!instance) {
    appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .start();

    instance = appInsights.defaultClient;
  }
  return instance;
}
