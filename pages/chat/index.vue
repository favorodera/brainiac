<script setup lang="ts">
definePageMeta({
  layout: "guest",
  title: "Chat",
});

onMounted(() => {
  useToast().clear();
  useToast().add({
    id: "sign-in-success",
    title: "Sign-in Successful",
    icon: "i-heroicons-identification-solid",
    timeout: 5000,
    closeButton: {
      icon: "i-heroicons-archive-box-x-mark",
      color: "green",
      variant: "outline",
    },
    ui: {
      ring: "dark:ring-transparent",
      background: "dark:bg-#1e1f20",
      title: "text-5 font-bold  dark:text-green",
      icon: {
        color: "dark:text-green",
      },
      progress: {
        background: "dark:bg-green-400",
      },
    },
  });
});
</script>

<template>
  <UContainer
    as="main"
    class="p-0 gap-8 w-full grid justify-center items-center"
  >
  </UContainer>
</template>
