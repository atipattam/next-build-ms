import { client } from "@/lib/serverAppInsight"

export const getSomething =() => {
  console.log('first')
  client.trackEvent({name: `my custom event on ${process.env.NODE_ENV} new build ${new Date()}` , properties: {customProperty: "custom property value"}});
}