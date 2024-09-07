<script setup lang="ts">
import ChatSlideover from '~/components/Chat/Slideover.vue'
</script>

<template>
  <main
    class="w-full p-5 flex flex-col min-h-screen gap-10 justify-between items-center"
  >
    <CustomNav>
      <template #menu-button>
        <UButton
          icon="i-heroicons-solid-bars-3"
          size="sm"
          :padded="false"
          color="white"
          :ui="{
            font: 'font-600',
            color: {
              white: {
                ghost:
                  'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 dark:hover:bg-transparent',
              },
            },
          }"
          variant="ghost"
          @click="useSlideover().open(ChatSlideover)"
        />
      </template>
    </CustomNav>

    <slot />

    <div class="w-full flex flex-col items-center gap-12">
      <ChatTextArea />
      <CustomFooter />
    </div>
  </main>
</template>
