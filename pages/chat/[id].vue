<script setup lang="ts">
useHead({
  title: 'Chat',
})

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth', 'chatid'],
})
</script>

<template>
  <div
    class="w-full max-w-70.875rem flex-1 flex flex-col gap-8 items-center justify-start p-0"
  >
    <ChatBubbles />
  </div>
</template>
