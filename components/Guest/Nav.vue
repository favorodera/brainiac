<template>
  <nav
    class="flex max-w-90rem w-full items-center p-block-0.75rem justify-between h-2.75rem"
  >
    <NuxtLink
      to="/"
      class="flex w-screen text-size-xl text-#FFFFFFDB font-400 items-center gap-0.38rem"
    >
      <UIcon name="i-fa-xing" class="text-#217BFE w-5 h-5" />
      <h1>Brainiac</h1>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
h1 {
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
