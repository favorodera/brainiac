<script setup lang="ts">
useHead({
  titleTemplate: `Brainiac | ${useRoute().meta.title}`,
});
</script>

<template>
  <!-- <UNotification id="alert"/> -->
  <UContainer
    as="main"
    class="min-w-xs font-sans bg-#131314 min-h-screen w-full flex flex-col items-center"
  >
    <NuxtLayout>
      <LazyNuxtPage />
    </NuxtLayout>
  </UContainer>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.5s ease-in-out;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
