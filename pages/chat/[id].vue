<template>
  <main class="w-full flex items-center justify-center">
    <NuxtLayout name="authenticated">
      <ChatBubbles />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Chat',
})

definePageMeta({
  layout: false,
  middleware: ['auth', 'chatid'],
})
</script>
