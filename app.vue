<template>
  <NuxtLoadingIndicator color="#ac87eb" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications
    :ui="{
      wrapper: 'h-min flex flex-col items-start justify-start',
      container: 'w-full',
      position: 'top-0 right-0',
      width: 'min-w-xs w-full max-w-xl',
    }"
  />

  <USlideovers />
</template>

<script setup lang="ts">
useHead({
  titleTemplate(title) {
    return title ? `Brainiac | ${title}` : 'Brainiac'
  },
})
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.5s ease-in-out;
}

.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
