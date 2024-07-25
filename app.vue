<script setup lang="ts">
import "@unocss/reset/tailwind.css";
useHead({
  title: `Brainiac | ${useRoute().meta.title}`,
});
</script>

<template>
  <main min-h-screen max-w-90rem flex="flex col" m="0 a" items-center>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
