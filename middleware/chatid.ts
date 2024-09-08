export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const claims = await $fetch("/api/claims", {
      method: "GET",
    });

    if (to.params.id.slice(0, -6) !== claims?.sub) {
      if (to.path !== "/chat") {
        return navigateTo("/chat");
      }
    }
  }
});
