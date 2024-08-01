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
  <UContainer
    as="main"
    class="p-0 gap-8 w-full grid justify-center items-center"
  >
    <HomeHero />
    <HomeAbout />
  </UContainer>
</template>
