export default async function () {
  const isAuthRunning = await useIsAuthRunning();
  try {
    isAuthRunning.signout = true;
    await Promise.all([
      $fetch("/api/signout", { method: "DELETE" }),
      useSlideover().close(),
      navigateTo("/"),
    ]);
    isAuthRunning.signout = false;
    
    useToast().add({
      id: "sign-out",
      title: "Sign Out Successful",
      icon: "i-majesticons-door-exit",
      timeout: 3000,
      closeButton: {
        icon: undefined,
      },
      color: "emerald",
      ui: {
        ring: "ring-0",
        title: "text-sm dark:text-emerald-400 font-600",
        background: "dark:bg-#1e1f20 bg-#1e1f20",
      },
    });
  } catch (error) {
    isAuthRunning.signout = false;
  } finally {
    isAuthRunning.signout = false;
  }
}
