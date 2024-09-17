export default function myImageLoader({ src, width, quality }) {
  return `${process.env.NEXT_APP_FRONTDOOR}${src}?w=${width}&q=${quality || 75}`
}