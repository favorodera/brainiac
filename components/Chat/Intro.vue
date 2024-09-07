<script lang="ts" setup>
const { data: claims } = await useFetch('/api/claims', {
  method: 'GET',
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 w-full max-w-41.875rem"
  >
    <h1 class="text-10 font-700 text-center">
      <span
        class="bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d bg-clip-text text-transparent case-capital"
      >Hello,{{
        claims?.name?.split(" ")[0] || claims?.email?.split("@")[0]
      }}</span>
      <br>
      How can I help you today?
    </h1>
    <span class="text-#FFFFFFA3 text-4 font-700 text-center">Chat with
      <span
        class="bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d bg-clip-text text-transparent"
      >Brainiac</span>
      to get answers to your questions.</span>
  </div>
</template>
