// Define a Nuxt route middleware function named 'auth'
export default defineNuxtRouteMiddleware(async () => {
    // Check if the code is running on the client-side (browser)
    if (import.meta.client ) {
      // Fetch user claims from the '/api/claims' endpoint using a GET request
      const claims = await $fetch('/api/claims', {
        method: 'GET',
      })
      
      // If no claims are returned (user is not authenticated):
      if (!claims) {
        // Throw an error with a 401 Unauthorized status code and a message
        throw createError({
          statusCode: 401,
          message: 'Unauthorized',
        })
      }
    }
  })
  