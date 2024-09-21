<template>
  <div
    class="w-full max-w-3xl flex items-center rounded-1 justify-center gap-1 dark:bg-#1e1f20"
  >
    <UTextarea
      id="textarea"
      v-model="useBrainiacStore().prompt"
      autofocus
      padded
      size="md"
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
      padded
      :disabled="isBrainiacRunning"
      class="group self-end"
      :ui="{
        color: {
          white: {
            ghost:
              'dark:focus:outline-0  dark:active:outline-0 dark:bg-transparent property-all delay-50 duration-1000 dark:hover:bg-transparent',
          },
        },
      }"
      @click.prevent="brainiac(useBrainiacStore().prompt)"
    >
      <template #trailing>
        <div>
          <UIcon
            :name="isBrainiacRunning ? 'i-heroicons-stop' : 'i-heroicons-play'"
            class="text-#217BFE w-2rem h-2rem dark:group-disabled:text-gray dark:group-hover:text-#a24ae7 transition-all transition-delay-50 transition-duration-500"
          />
        </div>
      </template>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import useBrainiacStore from '~/store/brainiacStore'

const isBrainiacRunning = await useIsBrainiacRunning()

onMounted(() => useBrainiacStore().prompt = '')
</script>
