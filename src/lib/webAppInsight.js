// lib/appInsights.js
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

let reactPlugin = null;
let appInsights = null;

export const initAppInsights = () => {
  if (!appInsights) {
    reactPlugin = new ReactPlugin();
    appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: process.env.NEXT_PUBLIC_APP_INSIGHTS_KEY, // Set in your .env file
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: null },
        },
        disableFetchTracking: false,
        enableAutoRouteTracking: true,
      },
    });

    appInsights.loadAppInsights();
  }

  return { reactPlugin, appInsights };
};
