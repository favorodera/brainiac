export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    try {
      const claims = await $fetch("/api/claims", {
        method: "GET",
      });

      if (!claims) {
        if (to.path !== "/chat") {
          return navigateTo("/authentication/signin");
        }
      }
    } catch (error) {
      return navigateTo("/authentication/signin");
    }
  }
});
