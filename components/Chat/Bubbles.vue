<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-for="(chatFragment, index) in chatHistory"
    :key="index"
    :class="{
      'items-start justify-right': index % 2 === 0,
      'items-start justify-left': index % 2 !== 0,
    }"
    class="flex flex-row-reverse gap-2 max-w-4xl w-full break-all"
  >
    <UAvatar
      v-if="index % 2 === 0"
      :src="claims?.picture"
      :alt="claims?.name || claims?.email.toUpperCase()"
      size="xs"
    />
    <div>
      <span
        v-for="part in chatFragment.parts"
        :key="part.text"
      >
        <div
          v-if="index % 2 === 0"
          class="bg-#1e1f20 rounded-2xl p-4"
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

    <UIcon
      v-if="index % 2 !== 0"
      name="i-hugeicons-ai-brain-02"
      class="w-6 h-6 text-#217BFE flex-shrink-0"
    />
  </div>
</template>

<script setup lang="ts">
import markdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

const markdown = new markdownIt().use(
  await Shiki({
    theme: 'aurora-x',
  }),
  { breaks: true, linkify: true, html: true, langPrefix: 'language-' },
)

const chatID = useRoute().path.split('/')[2]

const chatHistory = ref < ChatHistory > ([])

const brainiac = await useBrainiac()

await useFetch(`/api/getchat?chatID=${chatID}`, { method: 'GET' }).then(
  (oldChats) => {
    if (oldChats.data.value) {
      brainiac.value = oldChats.data.value
    }
  },
)

const { data: claims } = await useFetch('/api/claims', { method: 'GET' })

watch(
  () => brainiac.value,
  (chatFragment) => {
    chatHistory.value = chatFragment
  },
  { immediate: true },
)
</script>
