<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-auto-animate
    class="flex-1 flex flex-col gap-8 justify-start items-center w-full max-h-150 overflow-auto py-4 chat-bubbles"
  >
    <div
      v-for="(chatFragment, index) in chatHistory"
      :key="index"
      :class="{
        'items-end': index % 2 === 0,
        'items-start flex-col-reverse': index % 2 !== 0,
      }"
      class="flex flex-col gap-2 max-w-3xl w-full break-all"
    >
      <div
        v-if="index % 2 === 0"
        class="flex gap-1 flex-row-reverse self-end"
      >
        <UAvatar
          :src="claims?.picture"
          :alt="claims?.name || claims?.email.toUpperCase()"
          size="xs"
        />
        <p class="font-600">
          YOU
        </p>
      </div>

      <div>
        <span
          v-for="part in chatFragment.parts"
          :key="part.text"
        >
          <div
            v-if="index % 2 === 0"
            class="bg-#1e1f20 rounded-2xl p-4 max-h-40 overflow-x-auto"
          >
            <span>{{ part.text }}</span>
          </div>

          <span
            v-else
            class="flex flex-col gap-2 bg-#1e1f20 rounded-2xl p-4"
            v-html="markdown.render(part.text)"
          />
        </span>
      </div>

      <div
        v-if="index % 2 !== 0"
        class="flex gap-1 self-start"
      >
        <UIcon
          name="i-hugeicons-ai-brain-02"
          class="w-6 h-6 text-#217BFE flex-shrink-0"
        />
        <p class="font-600">
          BRAINIAC
        </p>
      </div>
    </div>

    <div
      v-if="skeleton"
      class="w-full flex flex-col max-w-3xl justify-start items-start gap-2 property-all duration-1000 delay-100"
    >
      <div class="flex gap-1">
        <UIcon
          name="i-hugeicons-ai-brain-02"
          class="w-6 h-6 text-#217BFE flex-shrink-0"
        />
        <p class="font-600">
          BRAINIAC
        </p>
      </div>

      <div class="space-y-2 w-full">
        <USkeleton
          v-for="n in 3"
          :key="n"
          class="h-6 w-full"
          :ui="{ rounded: 'rounded-2', background: 'dark:bg-#1e1f20' }"
        />
      </div>
    </div>
  </div>

  <UButton
    v-if="oldChatFetchStatus !== 'idle'"
    class="pointer-events-none"
    trailing
    loading-icon="i-svg-spinners-270-ring"
    :loading="oldChatFetchStatus === 'Checking'"
    :icon="oldChatFetchStatus === 'Error'
      ? 'i-heroicons-exclamation-circle-20-solid'
      : ''
    "
    color="white"
    variant="ghost"
    :label="
      oldChatFetchStatus === 'Checking'
        ? 'Checking for old chats'
        : oldChatFetchStatus === 'Error'
          ? 'An Error Occurred Please Refresh'
          : ''
    "
    :ui="{
      rounded: 'rounded-xl',
      font: 'font-700',
      base: ' h-10 justify-self-center items-center justify-center',
      icon: { size: { md: 'w-8 h-8' } },
      color: {
        white: {
          ghost:
            'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 ring-0',
        },
      },
    }"
  />
</template>

<script setup lang="ts">
import markdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

let chatHistory = await useBrainiac()
const { data: claims } = await useFetch('/api/claims', { method: 'GET' })
const route = useRoute()
const skeleton = await useIsBrainiacRunning()
const chatBubbles = document?.querySelector('.chat-bubbles')
const isNewChat = useIsNewChat()
const oldChatFetchStatus = ref('idle')
const markdown = new markdownIt().use(await Shiki({ theme: 'aurora-x' }))

if (!isNewChat.value) {
  oldChatFetchStatus.value = 'Checking'
  await useLazyAsyncData(
    route.path.split('/')[2],
    async () => {
      try {
        const oldChats = await $fetch(`/api/getchat?chatId=${route.path.split('/')[2]}`)
        if (oldChats !== 'Error Fetching Chats') {
          chatHistory.value = oldChats
          setTimeout(() => {
            chatBubbles?.scrollTo({ top: chatBubbles.scrollHeight, behavior: 'smooth' })
            oldChatFetchStatus.value = 'idle'
          }, 1000)
        }
        else {
          await navigateTo('/chat')
        }
      }
      catch {
        oldChatFetchStatus.value = 'Error'
      }
      finally {
        oldChatFetchStatus.value = 'idle'
      }
    },
    { immediate: true, watch: [() => route.path.split('/')[2]] },
  )
}
</script>
