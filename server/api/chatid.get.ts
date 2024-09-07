import { auth } from '~/firebase/serverside'

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, 'session')

  if (cookie) {
    const claims = await auth.verifySessionCookie(cookie)

    if (claims) {
      const randomBytes = new Uint8Array(Math.ceil(6 / 2))

      crypto.getRandomValues(randomBytes)

      const chatId = Array.from(randomBytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 6)

      return claims?.sub + chatId
    }
  }
})
