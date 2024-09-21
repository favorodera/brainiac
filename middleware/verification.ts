export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.server) {
      try {
        const claims = await $fetch("/api/claims", {
          method: "GET",
        });
  
        if (claims?.email_verified !== true) {
          if (to.path !== "/chat") {
            return navigateTo("/authentication/signin");
          }
        }
      } catch (error) {
        return navigateTo("/authentication/signin");
      }
    }
  });
