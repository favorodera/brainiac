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
    class="w-full max-w-full flex-1 flex flex-col gap-8 justify-start items-center"
  >
    <ChatBubbles />
  </div>
</template>
