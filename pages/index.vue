<script setup lang="ts">
definePageMeta({
  layout: "home",
  title: "Home",
});

// const activateGemini = async (prompt: string) => {
//   const response = await $fetch("/api/gemini", {
//     method: "POST",
//     body: {
//       prompt: prompt,
//     },
//   });
// };
</script>

<template>
  <HomeHero />
  <HomeAbout />
</template>
