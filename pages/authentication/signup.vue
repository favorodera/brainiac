<template>
  <main class="w-full flex justify-center items-center">
    <NuxtLayout name="guest">
      <AuthenticationSignUpForm />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Sign Up',
})

definePageMeta({
  layout: false,
})
</script>
