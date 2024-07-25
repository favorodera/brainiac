<template>
  <footer class="flex w-full items-center p-block-0.75rem justify-between">
    <a
      href="https://www.github.com/favorodera"
      target="_blank"
      rel="noopener noreferrer"
      class="text-size-sm text-#FFFFFF7A font-400 transition-all hover:text-white"
      >favorodera &copy; {{ new Date().getFullYear() }}</a
    >

    <div class="flex gap-1 items-center justify-center">
      <UIcon name="i-fa-flash" class="text-#217BFE w-4 h-4" />
      <span
        class="text-size-sm text-#FFFFFF7A font-400 transition-all gemini-text"
        >Gemini</span
      >
    </div>
  </footer>
</template>

<style scoped lang="scss">
.gemini-text {
  background: linear-gradient(
    90deg,
    #217bfe 0%,
    #078efb 33.53%,
    #ac87eb 67.74%,
    #ee4d5d 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
