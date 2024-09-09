<template>
  <AuthenticationVerification />
</template>

<script setup lang="ts">
useHead({
  title: 'Verification',
})

definePageMeta({
  layout: 'guest',
})

onBeforeMount(() => {
  useToast().clear()
})
</script>
