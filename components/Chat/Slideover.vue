<template>
  <USlideover
    :overlay="false"
    :ui="{
      background: 'bg-#1e1f20 dark:bg-#1e1f20',
      padding: 'p-4',
    }"
  >
    <div
      class="flex flex-col w-full h-full gap-4"
    >
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
          async() => {
            (await useBrainiac()).value.length = 0;
            useSlideover().close();
            navigateTo('/chat');
          }
        "
      />

      <ChatRecentChats />

      <UPopover
        :ui="{
          wrapper: 'm-t-auto',
          width: 'w-70',
          background: 'dark:bg-#1e1f20',
          ring: 'dark:ring-gray',
        }"
      >
        <UButton
          icon="i-majesticons-door-exit"
          color="white"
          variant="solid"
          square
          block
          label="Sign Out"
          truncate
          :ui="{
            rounded: 'rounded-xl',
            font: 'font-700',
            base: 'h-10 m-t-auto items-center justify-center',
            color: {
              white: {
                solid:
                  'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-red ',
              },
            },
          }"
        />

        <template #panel="{ close }">
          <div class="p-4 flex flex-col gap-4">
            <p class="text-md font-700 text-center w-full">
              Are you sure you want to sign out?
            </p>
            <div class="flex items-center justify-between gap-6 w-full">
              <UButton
                :trailing="isAuthRunning.signout"
                loading-icon="i-svg-spinners-270-ring"
                :loading="isAuthRunning.signout"
                icon="i-heroicons-check-solid"
                color="white"
                variant="solid"
                square
                label="Yes"
                truncate
                class="max-w-120"
                :ui="{
                  rounded: 'rounded-xl',
                  font: 'font-700',
                  base: ' w-max flex-1 h-10 justify-self-center items-center justify-center',

                  color: {
                    white: {
                      solid:
                        'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-green ',
                    },
                  },
                }"
                @click="() => signOut()"
              />

              <UButton
                icon="i-heroicons-x-mark-20-solid"
                color="white"
                variant="solid"
                square
                label="Cancel"
                truncate
                class="max-w-120"
                :ui="{
                  rounded: 'rounded-xl',
                  font: 'font-700',
                  base: ' w-max flex-1 h-10 justify-self-center items-center justify-center',

                  color: {
                    white: {
                      solid:
                        'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-red ',
                    },
                  },
                }"
                @click="close"
              />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
  </USlideover>
</template>

<script lang="ts" setup>
const { data: claims } = await useLazyAsyncData(() => $fetch('/api/claims', { method: 'GET' }))
const isAuthRunning = await useIsAuthRunning()
</script>
