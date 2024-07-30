<script setup lang="ts">
definePageMeta({
  layout: "guest",
  title: "Home",
});
</script>

<template>
  <UContainer
    as="main"
    class="p-0 gap-8 w-full grid justify-center items-center"
  >
    <HomeHero />
    <HomeAbout />
  </UContainer>
</template>
