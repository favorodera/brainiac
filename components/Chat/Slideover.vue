<template>
  <USlideover
    :overlay="false"
    :ui="{
      background: 'bg-#1e1f20 dark:bg-#1e1f20',
    }"
  >
    <UContainer as="div">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex absolute end-5 top-5 z-10"
        @click="useSlideover().close()"
      />
    </UContainer>
  </USlideover>
</template>
