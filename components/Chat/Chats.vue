<script setup lang="ts">
const { data: chats } = await useFetch('/api/chatdata', {
  method: 'GET',
})
</script>

<template>
  <div
    v-if="chats"
  >
    <div
      v-for="(value, key) in chats"
      :key="key"
    >
      <p>
        <strong>{{ value.summary }}</strong>
      </p>
    </div>
  </div>
</template>
