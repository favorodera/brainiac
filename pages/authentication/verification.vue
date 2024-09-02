<script setup lang="ts">
// Set the page title for the head section
useHead({
  title: 'Verification',
})

// Define page metadata, specifying the layout to use
definePageMeta({
  layout: 'guest',
})

// Clear any existing toasts before the component mounts
onBeforeMount(() => {
  useToast().clear()
})
</script>

<template>
  <AuthenticationVerification />
</template>
