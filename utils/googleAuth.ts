import AuthenticationModal from '~/components/Authentication/Modal.vue' 

import {
  auth, 
  getIdToken, 
  inMemoryPersistence, 
  provider, 
  setPersistence, 
  signInWithPopup, 
} from '~/firebase/clientside'

export default async function () {
  useModal().open(AuthenticationModal)

  try {
    await setPersistence(auth, inMemoryPersistence)
    const credentials = await signInWithPopup(auth, provider)
    const idToken = await getIdToken(credentials.user)

    await $fetch('/api/googleauth', {
      method: 'POST',
      body: {
        idToken: idToken,
        name: credentials.user.displayName,
      },
    })

    useModal().close()

    useToast().add({
      id: 'account-creation-success',
      title: 'Login Successful',
      description: 'Initializing Brainiac...',
      icon: 'i-streamline-user-identifier-card-solid',
      timeout: 3000,
      callback: async () => {
        await navigateTo('/chat')
      },
      closeButton: {
        icon: undefined,
      },
      color: 'emerald',
      ui: {
        ring: 'ring-0',
        title: 'text-sm font-600',
        background: 'dark:bg-#1e1f20',
      },
    })
  }
  catch (error) {
    return error
  }
  finally {
    useModal().close()
  }
}
