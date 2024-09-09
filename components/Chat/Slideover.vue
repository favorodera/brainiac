<template>
  <USlideover
    :overlay="false"
    :ui="{
      background: 'bg-#1e1f20 dark:bg-#1e1f20',
      padding: 'p-4',
    }"
  >
    <div class="flex flex-col w-full gap-4">
      <div class="flex items-center gap-4 justify-between">
        <div class="flex gap-4 items-center w-20 flex-1">
          <UAvatar
            :src="claims?.picture"
            :alt="claims?.name || claims?.email.toUpperCase()"
            size="lg"
          />

          <div
            class="flex flex-col items-start justify-between truncate w-full"
          >
            <p class="text-lg font-700 text-#FFFFFFA3 truncate w-full">
              {{ claims?.name || claims?.email.split("@")[0] }}
            </p>
            <p class="text-lg font-700 text-#FFFFFFA3 truncate w-full">
              {{ claims?.email }}
            </p>
          </div>
        </div>

        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          square
          padded
          icon="i-heroicons-x-mark-20-solid"
          @click="useSlideover().close()"
        />
      </div>

      <UDivider
        size="2xs"
        :ui="{
          border: {
            base: 'dark:border-white/10',
          },
        }"
      />

      <UButton
        icon="i-heroicons-plus"
        color="white"
        variant="solid"
        label="New Chat"
        :ui="{
          rounded: 'rounded-xl',
          font: 'font-700',
          base: ' w-max h-10 justify-self-center items-center justify-center',

          color: {
            white: {
              solid:
                'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 ',
            },
          },
        }"
        @click="
          () => {
            useSlideover().close();
            navigateTo('/chat');
          }
        "
      />

      <div>
        <p class="font-700 text-#FFFFFFA3">
          Chats
        </p>
      </div>
      <ChatRecentChats />
    </div>
  </USlideover>
</template>

<script lang="ts" setup>
const { data: claims } = await useFetch('/api/claims', {
  method: 'GET',
})
</script>
