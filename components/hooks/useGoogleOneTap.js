import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

const useOneTapSignin = () => {
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'
  const [isLoading, setIsLoading] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      const { google } = window
      if (google) {
        google.accounts.id.initialize({
          client_id: '500948447442-08ch3qpdgb50uibuhgr01rci18tfjrcj.apps.googleusercontent.com',
          callback: async (response) => {
            setIsLoading(true)

            // Here we call our Provider with the token provided by google
            await signIn('googleonetap', {
              credential: response.credential,
              callbackUrl: '/'
            })
            setIsLoading(false)
          },
          prompt_parent_id: 'googleonetap',
          cancel_on_tap_outside: false
        })

        // Here we just console.log some error situations and reason why the google one tap
        // is not displayed. You may want to handle it depending on yuor application
        google.accounts.id.prompt((notification) => {
          console.log('notification is: ', notification.getMomentType())
          if (notification.isDisplayMoment()) {
            console.log('IS DISPLAY MOMENT')
          }

          if (notification.isNotDisplayed()) {
            console.warn(
              'one-tap did not show because:',
              notification.getNotDisplayedReason()
            )
            setShowFallback(true)
          }
          if (notification.isSkippedMoment()) {
            console.warn(
              'one-tap skipped because:',
              notification.getSkippedReason()
            )
            setShowFallback(true)
          }
          if (notification.isDismissedMoment()) {
            console.warn(
              'one-tap dismissed because:',
              notification.getDismissedReason()
            )
            if (notification.getDismissedReason() !== 'credential_returned') {
              setShowFallback(true)
            }
          }
        })
      }
    }
  }, [isLoading, isSignedIn])

  return { isLoading, showFallback, setShowFallback }
}

export default useOneTapSignin
