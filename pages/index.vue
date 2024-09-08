<script setup lang="ts">
useHead({
  title: 'Home',
})

definePageMeta({
  layout: 'guest',
})
</script>

<template>
  <div class="p-0 gap-8 w-full flex flex-col justify-center items-center">
    <HomeHero />

    <HomeAbout />
  </div>
</template>
