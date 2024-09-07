import { auth, database } from '~/firebase/serverside'

export default defineEventHandler(async (event) => {
  const { idToken }:{idToken: string} = await readBody(event)

  try {
    await auth.verifyIdToken(idToken)

    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    })

    setCookie(event, 'session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    const decodedClaims = await auth.verifySessionCookie(sessionCookie)

    const userdata = await database
      .collection('userdata')
      .doc(decodedClaims.email!)
      .get()

    if (!userdata.exists) {
      await database
        .collection('userdata')
        .doc(decodedClaims.email!)
        .create({
          personalinfo: {
            name: null,
            email: decodedClaims.email,
            photo: null,
            uid: decodedClaims.sub,
            verified: decodedClaims.email_verified,
          },
          chats: {},
        })
    }

    return { message: 'Authentication Successful' }
  }
  catch (error) {
    return error
  }
})
