<script setup lang="ts">
useHead({
  titleTemplate: `Brainiac | ${useRoute().meta.title}`,
});
</script>

<template>
  <UContainer
    as="main"
    class="min-w-xs font-sans bg-#131314 min-h-screen w-full flex flex-col items-center"
  >
    <NuxtLayout>
      <LazyNuxtPage />
    </NuxtLayout>
  </UContainer>
</template>
