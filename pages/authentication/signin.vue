<template>
  <main class="w-full flex justify-center items-center">
    <NuxtLayout name="guest">
      <AuthenticationSignInForm />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Sign In',
})

definePageMeta({
  layout: false,
})
</script>
