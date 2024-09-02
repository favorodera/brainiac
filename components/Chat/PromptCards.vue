<script lang="ts" setup>
// Import the useGeminiStore from Pinia to manage the prompt
import useGeminiStore from '~/store/brainiacStore';

// Define an array of colors to be used for styling
const colors = ref(['#ac87eb', '#a24ae7', '#f66a4b', '#4859f3']);

// Fetch randomized prompt cards from the '/api/promptcards' endpoint
// The 'data' property of the response is destructured and assigned to 'randomizedPromptCards'
const { data: randomizedPromptCards } = await useFetch('/api/promptcards', {
  method: 'GET',
});

// Assign the fetched prompt cards to the 'items' variable
const items = randomizedPromptCards.value;

// Define a function to transfer the selected prompt card text to the text area
const promptCardToTextarea = (promptcard: string) => {
  // Update the 'prompt' value in the Gemini store with the selected prompt card text
  useGeminiStore().prompt = promptcard;
  // Focus the text area
  document.getElementById('textarea')?.focus();
};
</script>


<template>
  <UCarousel
    v-slot="{ item, index }"
    :items="items"
    :ui="{
      wrapper: 'w-full max-w-70.875rem min-h-12.375rem',
      container: 'gap-1.12rem',
    }"
  >
    <div
      class="group hover:b-y-#a24ae7 hover:b-s-#f66a4b hover:b-e-#4859f3 flex flex-col gap-3 py-0.81rem px-3 min-h-12.375rem max-h-12.375rem max-w-16.875rem min-w-16.875rem b-1 b-transparent rounded-xl bg-#1e1f20 cursor-pointer transition-all transition-delay-50 transition-ease transition-duration-1000"
      :draggable="false"
      @click="promptCardToTextarea(item.prompt as string)"
    >
      <div
        class="group-hover:b-y-#a24ae7 group-hover:b-s-#f66a4b group-hover:b-e-#4859f3 p-0.38rem rounded-0.5625rem bg-#FFFFFF0F flex items-center justify-center w-min b-1 b-transparent transition-all transition-delay-50 transition-ease transition-duration-1000"
      >
        <UIcon
          :name="item.icon"
          class="transition-all transition-delay-50 transition-ease transition-duration-1000 w-1.375rem h-1.375rem"
          :class="`group-hover:text-${colors[index % colors.length]}`"
        />
      </div>

      <p
        class="text-4 font-700 text-#FFFFFFDB transition-all transition-delay-50 transition-ease transition-duration-1000 h-full"
        :class="`group-hover:text-${colors[index % colors.length]}`"
      >
        {{ item.prompt }}
      </p>
    </div>
  </UCarousel>
</template>
