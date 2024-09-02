import { database, auth } from '~/firebase/serverside' // Import Firebase Admin SDK modules for database and authentication

// Define an asynchronous event handler function for POST requests to the '/api/googleauth' endpoint
export default defineEventHandler(async (event) => {
  // Extract the 'idToken' and 'name' from the request body
  const {
    idToken,
    name,
  }: {
    idToken: string
    name: string
  } = await readBody(event)

  try {
    // Verify the provided ID token using Firebase Admin SDK
    await auth.verifyIdToken(idToken)

    // Set the expiration time for the session cookie (5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days

    // Create a new session cookie using the verified ID token
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    })

    // Set the session cookie in the response
    setCookie(event, 'session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    // Decode the session cookie to access user claims
    const decodedClaims = await auth.verifySessionCookie(sessionCookie)

    // Check if user data already exists in the database
    const userdata = await database
      .collection('userdata')
      .doc(decodedClaims.email!)
      .get()

    // If user data doesn't exist, create a new document for the user
    if (!userdata.exists) {
      await database
        .collection('userdata')
        .doc(decodedClaims.email!)
        .create({
          personalinfo: {
            name: name, // Set the user's name
            email: decodedClaims.email, // Extract email from decoded claims
            photo: decodedClaims.picture, // Extract profile picture URL from decoded claims
            uid: decodedClaims.sub, // Extract user ID from decoded claims
            verified: decodedClaims.email_verified, // Extract email verification status
          },
          chats: {}, // Initialize an empty 'chats' object
        })
    }
    else {
      // If user data already exists, update the name and photo if they are missing
      // A case where the user must have created an account with the email and password provider
      if (
        !userdata.data()?.personalinfo.name
        || !userdata.data()?.personalinfo.photo
      ) {
        await userdata.ref.update({
          'personalinfo.name': name || userdata.data()?.personalinfo.name,
          'personalinfo.photo':
            userdata.data()?.personalinfo.photo || decodedClaims.picture,
        })
      }
    }

    // Return a success message
    return { message: 'Authentication Successful' }
  }
  catch (error) {
    // Return any errors encountered during the process
    return error
  }
})
