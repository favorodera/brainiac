export default defineNuxtRouteMiddleware(async () => {
    if (import.meta.client ) {
      const claims = await $fetch('/api/claims', {
        method: 'GET',
      })
      
      if (!claims) {
        throw createError({
          statusCode: 401,
          message: 'Unauthorized',
        })
      }
    }
  })
  
