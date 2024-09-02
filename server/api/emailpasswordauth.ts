import { auth, database } from '~/firebase/serverside' // Import Firebase Admin SDK modules for authentication and database

// Define an asynchronous event handler function for POST requests to the '/api/emailpasswordauth' endpoint
export default defineEventHandler(async (event) => {
  // Extract the 'idToken' from the request body
  const { idToken } = await readBody(event)

  try {
    // Verify the provided ID token using Firebase Admin SDK
    await auth.verifyIdToken(idToken)

    // Set the expiration time for the session cookie (5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000

    // Create a new session cookie using the verified ID token
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    })

    // Set the session cookie in the response
    setCookie(event, 'session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true, // Make the cookie accessible only by the server
      secure: true, // Transmit the cookie only over HTTPS
      sameSite: 'none', // Allow the cookie to be sent in cross-site requests
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
            name: null, // Set name to null initially
            email: decodedClaims.email, // Extract email from decoded claims
            photo: null, // Set photo to null initially
            uid: decodedClaims.sub, // Extract user ID from decoded claims
            verified: decodedClaims.email_verified, // Extract email verification status
          },
          chats: {}, // Initialize an empty 'chats' object
        })
    }

    // Return a success message
    return { message: 'Authentication Successful' }
  }
  catch (error) {
    // Return any errors encountered during the process
    return error
  }
})
