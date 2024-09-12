import { client } from '../../lib/serverAppInsight';
export default async function Page2() {
  if(process.env.NODE_ENV === 'production'){
    client.trackEvent({name: `my custom event on ${process.env.NODE_ENV}` , properties: {customProperty: "custom property value"}});
  }

  return (
    <div/>
  )
}
