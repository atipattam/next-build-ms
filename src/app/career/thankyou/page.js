import MessageCard from '@/components/Card/MessageCard'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function ThankYouPageContent() {
  return (
    <MessageCard
      title="THANK YOU!"
      desc={(
        <>
          {' '}
          We have got your information.
          {' '}
          <br />
          {' '}
          Looking forward to having you in
          our team.
          {' '}
        </>
      )}
      button="Explore Your Benefits"
      url="/"
      goToSection="benefit"
    />
  )
}

export default function ThankYouPage() {
  const headersList = headers()
  const referer = headersList.get('referer') || 'No referer found'
  const haveCacheControl = headersList.get('cache-control') || 'No cache-control'

  if (referer === 'No referer found' || haveCacheControl !== 'No cache-control') {
    redirect('/')
  }

  return (
    <ThankYouPageContent />
  )
}
