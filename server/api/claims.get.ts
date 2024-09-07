import { auth } from '~/firebase/serverside'
import { Claims } from '~/utils/types'

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, 'session')

  if (cookie) {
    const claims = await auth.verifySessionCookie(cookie)
    return claims as unknown as Claims
  }
})
