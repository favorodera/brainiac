<script setup lang="ts">
// Set the page title for the head section
useHead({
  title: 'Chat',
})

// Define page metadata, specifying the layout and middleware to use
definePageMeta({
  layout: 'authenticated', // Use the 'authenticated' layout for this page
  middleware: ['auth'], // Apply the 'auth' middleware to protect the route
})
</script>

<template>
  <div
    class="w-full max-w-70.875rem flex-1 flex flex-col gap-8 items-center justify-start p-0"
  >
    <ChatBubbles />
  </div>
</template>
