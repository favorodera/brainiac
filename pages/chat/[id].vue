<script setup lang="ts">
definePageMeta({
  layout: false,
  title: "Chat",
});

const id = useRoute().params.id;
</script>

<template>
  <p>{{ id }}</p>
</template>
