<template>
  <main class="w-full flex justify-center items-center">
    <NuxtLayout name="guest">
      <AuthenticationVerification />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Verification',
})

definePageMeta({
  layout: false,
  middleware: ['verification'],
})

onBeforeMount(() => {
  useToast().clear()
})
</script>
