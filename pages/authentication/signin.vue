<template>
  <AuthenticationSignInForm />
</template>

<script setup lang="ts">
useHead({
  title: 'Sign In',
})

definePageMeta({
  layout: 'guest',
})
</script>
