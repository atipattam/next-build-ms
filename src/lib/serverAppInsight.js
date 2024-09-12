// lib/serverAppInsights.ts
const appInsights = require('applicationinsights');

// Log to check if applicationinsights is properly imported
console.log("Application Insights Module:", appInsights);

// Log to check if the connection string is available in production
console.log("Connection String:", process.env.APPLICATIONINSIGHTS_CONNECTION_STRING);

if (!appInsights.defaultClient) {
  appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true)
    .setInternalLogging(true, true) // Enable verbose internal logging in production
    .start();

  // Log to check if setup was successful
  console.log("Application Insights setup completed.");
} else {
  // Log if defaultClient is already initialized
  console.log("Application Insights defaultClient already exists.");
}

// Safely assign the client with fallback to getClient()
const client = appInsights.defaultClient || appInsights.getClient();

// Log to check if the client was initialized
if (client) {
  console.log("Application Insights client initialized successfully.");
} else {
  console.error("Failed to initialize Application Insights client.");
}

export { client };
