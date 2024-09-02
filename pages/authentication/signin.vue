<script setup lang="ts">
// Set the page title for the head section
useHead({
  title: 'Sign In',
})

// Define page metadata, specifying the layout to use
definePageMeta({
  layout: 'guest',
})
</script>

<template>
  <AuthenticationSignInForm />
</template>
