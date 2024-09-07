<script setup lang="ts">
import markdownIt from 'markdown-it'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

const markdown = markdownIt('commonmark', {
  breaks: true,
  linkify: true,
  html: true,
  langPrefix: 'language-',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      const highlightedCode = hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true,
      }).value
      const sanitizedCode = DOMPurify.sanitize(highlightedCode, {
        ALLOWED_TAGS: ['pre', 'code'],
        ALLOWED_ATTR: ['class'],
      })
      return sanitizedCode
    }
    return ''
  },

})

const chatHistory = ref < ChatHistory > ([])

const brainiac = await useBrainiac()

watch(
  () => brainiac.value,
  (chatFragment) => {
    chatHistory.value = chatFragment
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-for="(chatFragment, index) in chatHistory"
    :key="index"
    :class="{
      '': index % 2 === 0,
      'self-start flex-col-reverse': index % 2 !== 0,
    }"
    class="rounded-2xl p-4 flex flex-col gap-4 max-w-2xl w-full bg-#1e1f20"
  >
    <UIcon
      v-if="index % 2 === 0"
      name="i-heroicons-user-circle"
      class="w-6 h-6 text-gray-400 flex-shrink-0 self-end"
    />

    <div>
      <span
        v-for="part in chatFragment.parts"
        :key="part.text"
      >
        <template v-if="index % 2 === 0">
          <span>{{ part.text }}</span>
        </template>
        <span
          v-else
          class="flex flex-col gap-4"
          v-html="markdown.render(part.text)"
        />
      </span>
    </div>

    <UIcon
      v-if="index % 2 !== 0"
      name="i-hugeicons-ai-brain-02"
      class="w-6 h-6 text-gray-400 flex-shrink-0"
    />
  </div>
</template>
