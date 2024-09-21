<template>
  <main class="w-full flex justify-center items-center">
    <NuxtLayout name="guest">
      <HomeHero />

      <HomeAbout />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Home',
})

definePageMeta({
  layout: false,
})
</script>
