<script setup lang="ts">
definePageMeta({
  layout: "guest",
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
