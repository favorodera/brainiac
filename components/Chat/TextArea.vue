<script setup lang="ts">
// Import the useBrainiacStore from the Pinia store to manage the prompt
import useBrainiacStore from '~/store/brainiacStore'
</script>

<template>
  <div class="w-full max-w-45rem flex p-r items-center rounded-1 justify-center gap-1 dark:bg-#1e1f20">
    <UTextarea
      id="textarea"
      v-model="useBrainiacStore().prompt"
      autofocus
      padded
      size="lg"
      :ui="{
        wrapper: 'flex-1',
        base: 'py-3',
        placeholder: 'dark:placeholder-text-4 placeholder-font-700',
        variant: {
          none: 'bg-#1e1f20 font-700 text-4',
        },
      }"
      placeholder="Enter Prompt..."
      color="white"
      :rows="2"
      autoresize
      :maxrows="8"
      required
      variant="none"
      @keyup.enter.exact="brainiac(useBrainiacStore().prompt)"
    />

    <UButton
      color="white"
      variant="ghost"
      :padded="false"
      class="group self-end"
      :ui="{
        color: {
          white: {
            ghost:
              'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-all transition-delay-50 transition-duration-1000 dark:hover:bg-transparent',
          },
        },
      }"
      @click.prevent="brainiac(useBrainiacStore().prompt)"
    >
      <template #trailing>
        <div>
          <UIcon
            name="i-heroicons-paper-airplane-20-solid"
            class="text-#217BFE w-1.5rem h-1.5rem dark:group-hover:text-#a24ae7 transition-all transition-delay-50 transition-duration-1000"
          />
        </div>
      </template>
    </UButton>
  </div>
</template>
