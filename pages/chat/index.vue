<script setup lang="ts">
useHead({
  title: 'Chat',
})

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
})
</script>

<template>
  <div class="w-full flex flex-col gap-8 items-center justify-between p-0">
    <ChatIntro />

    <ChatPromptCards />
  </div>
</template>
