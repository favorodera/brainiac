// Define an asynchronous event handler function for DELETE requests to the '/api/signout' endpoint
export default defineEventHandler(async (event) => {
  // Delete the 'session' cookie from the client's browser
  deleteCookie(event, 'session', {
    path: '/', // Delete the cookie for the entire domain
    httpOnly: true, // Ensure the cookie is only accessible by the server
    secure: true, // Only transmit the cookie over HTTPS
    sameSite: 'none', // Allow the cookie to be deleted in cross-site requests
  })
  // Return a success message indicating that the user has been signed out
  return { message: 'Signed Out Successfully' }
})
