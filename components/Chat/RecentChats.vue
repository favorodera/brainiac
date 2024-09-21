<template>
  <div class="flex items-center justify-between gap-4">
        <p class="font-700 text-#FFFFFFFF text-lg">
          Chats
        </p>
        <UPopover
          :ui="{
            wrapper: 'm-t-auto',
            width: 'w-70',
            background: 'dark:bg-#1e1f20',
            ring: 'dark:ring-gray',
          }"
        >
          <UButton
            icon="i-heroicons-trash-solid"
            color="white"
            variant="ghost"
            square
            block
            label="Clear History"
            truncate
            :ui="{
              rounded: 'rounded-xl',
              font: 'font-700',
              base: 'h-10 m-t-auto items-center justify-center',
              color: {
                white: {
                  ghost:
                    'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-transparent dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-red ',
                },
              },
            }"
          />

          <template #panel="{ close }">
            <div class="p-4 flex flex-col gap-4">
              <p class="text-md font-700 text-center w-full">
                Are you sure you want to clear chat history?
              </p>
              <div class="flex items-center justify-between gap-6 w-full">
                <UButton
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
                  @click="() => clearChatHistory()"
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
  <div
    v-if="status === 'success'"
    v-auto-animate
    class="flex flex-col-reverse justify-end gap-1 flex-1 overflow-y-scroll">
    <div v-for="(value, key) in chats" :key="key">
      <div class="flex items-center justify-between" v-if="!value.deleted" >
        <ULink
        @click="useSlideover().close()"
          :to="`/chat/${key}`"
          class="text-md font-700 truncate w-full property-all delay-10 duration-1000 dark:hover:text-#4859f3"
          active-class="text-#FFFFFF"
          inactive-class="text-gray"
          >{{ value.summary }}</ULink
        >

        <UPopover
          :ui="{
            width: 'w-70',
            background: 'dark:bg-#1e1f20',
            ring: 'dark:ring-gray',
          }">
          <UButton
            icon="i-heroicons-trash-20-solid"
            color="white"
            variant="solid"
            square
            truncate
            class="max-w-120"
            :ui="{
              rounded: 'rounded-xl',
              font: 'font-700',
              base: ' w-max h-10 justify-self-center items-center justify-center',

              color: {
                white: {
                  solid:
                    'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-#4859f3 ',
                },
              },
            }" />

          <template #panel="{ close }">
            <div class="p-4 flex flex-col gap-4">
              <p class="text-md font-700 text-center w-full">
                Are you sure you want to delete this chat?
              </p>
              <div class="flex items-center justify-between w-full gap-6">
                <UButton
                  icon="i-heroicons-trash-20-solid"
                  color="white"
                  variant="solid"
                  square
                  label="Delete"
                  truncate
                  @click="deleteChat(String(key))"
                  class="max-w-120"
                  :ui="{
                    rounded: 'rounded-xl',
                    font: 'font-700',
                    base: 'flex-1 w-max h-10 justify-self-center items-center justify-center',

                    color: {
                      white: {
                        solid:
                          'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-green ',
                      },
                    },
                  }" />

                <UButton
                  icon="i-heroicons-x-mark-20-solid"
                  color="white"
                  variant="solid"
                  @click="close"
                  square
                  label="Cancel"
                  truncate
                  class="max-w-120"
                  :ui="{
                    rounded: 'rounded-xl',
                    font: 'font-700',
                    base: 'flex-1 w-max h-10 justify-self-center items-center justify-center',

                    color: {
                      white: {
                        solid:
                          'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent property-all delay-10 duration-1000 dark:hover:text-red ',
                      },
                    },
                  }" />
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col gap-2">
    <USkeleton
      v-for="n in 5"
      :key="n"
      class="w-full h-8"
      :ui="{ rounded: 'rounded-xl', background: 'dark:bg-dark-300' }" />
  </div>
</template>

<script setup lang="ts">
const { data: chats, status } = await useLazyAsyncData(
  'recentChats',
  () => $fetch('/api/getchat', { method: 'GET' }),
  {dedupe:"cancel"}
)

const deleteChat = async (chatId :string) => {
  await $fetch(`/api/deletechat?chatID=${chatId}`, { method: "DELETE" });
  chats.value[chatId].deleted = true;
  useSlideover().close();
  await navigateTo("/chat");
}

const clearChatHistory = async () => {
  await $fetch(`/api/deletechat`, { method: "DELETE" });
  chats.value = {};
  useSlideover().close();
  await navigateTo("/chat");
}
</script>
