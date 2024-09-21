<template>
  <main class="w-full flex justify-center items-center">
    <NuxtLayout name="guest">
      <AuthenticationPasswordReset />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Password Reset',
})

definePageMeta({
  layout: false,
})
</script>
