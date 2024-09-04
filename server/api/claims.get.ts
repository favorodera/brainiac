import { auth } from '~/firebase/serverside' // Import the Firebase Admin SDK authentication module
import { Claims } from '~/utils/types'

// Define an asynchronous event handler function for GET requests to the '/api/claims' endpoint
export default defineEventHandler(async (event) => {
  // Get the value of the 'session' cookie from the incoming request
  const cookie = getCookie(event, 'session')

  // If the 'session' cookie exists:
  if (cookie) {
    // Verify the session cookie using the Firebase Admin SDK
    // This will decode the cookie and return the user's claims if the cookie is valid
    const claims = await auth.verifySessionCookie(cookie)
    // Return an object containing the verified user claims
    return { claims } as unknown as { claims: Claims }
  }
  // If the 'session' cookie does not exist, the function will implicitly return undefined
})
