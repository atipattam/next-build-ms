export default function myImageLoader({ src, width, quality }) {
  console.log(src)
  return `${process.env.NEXT_APP_FRONTDOOR}${src}?myassets=arise&w=${width}&q=${quality || 75}`
}