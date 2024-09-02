<script setup lang="ts">
import markdownIt from 'markdown-it'; // For rendering Markdown
import hljs from 'highlight.js'; // For syntax highlighting of code blocks
import DOMPurify from 'dompurify'; // For sanitizing HTML to prevent XSS attacks
import type { History } from '~/store/chatSchema'; // Import the History type from the Gemini store

// Create a Markdown-it instance with desired options
const markdown = markdownIt('commonmark', {
  breaks: true, // Convert line breaks to <br> tags
  linkify: true, // Auto-convert URLs to links
  html: true, // Enable HTML rendering (use with caution and proper sanitization)
  langPrefix: 'language-', // Prefix for code block language classes
  highlight: (str, lang): string => {
    // Custom code highlighting function
    if (lang && hljs.getLanguage(lang)) {
      // Check if language is supported by highlight.js
      try {
        // Highlight the code using highlight.js
        const highlightedCode = hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true,
        }).value;
        // Sanitize highlighted code before rendering to prevent XSS
        const sanitizedCode = DOMPurify.sanitize(highlightedCode, {
          ALLOWED_TAGS: ['pre', 'code'],
          ALLOWED_ATTR: ['class'],
        });
        return sanitizedCode;
      } catch (error) {
        return error as string; // Catch any errors during highlighting
      }
    }

    // If language is not supported, return code wrapped in <pre> and <code> tags
    return (
      '<pre><code class="hljs">'
      + markdown.utils.escapeHtml(str) // Escape HTML entities in code
      + '</code></pre>'
    );
  },
});

const chatHistory = ref<History>(); // Store the chat history

const brainiac = await useBrainiac(); // Call the useBrainiac composable

// Watch for changes in the Gemini composable and update the response variable
watch(
  () => brainiac.value, // Watch the Gemini compsable return value
  (chatFragment) => {
    chatHistory.value = chatFragment; // Update the response variable with the new history
  },
  { immediate: true }, // Execute the watcher immediately on component mount
);
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
