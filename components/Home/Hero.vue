<template>
  <section class="w-full">
    <h1
      class="flex flex-col gap-0rem text-center items-center justify-center w-full"
    >
      <span
        class="bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d bg-clip-text text-size-6xl text-transparent font-700 tracking-0.2rem"
      >Brainiac</span>
      <span class="text-size-1rem font-700 text-#FFFFFFA3">Your AI Companion for Creativity and Productivity.</span>
      <NuxtLink
        to="/authentication/signin"
        class="border-1 pos-relative p-2 rounded-xl hover:b-y-#a24ae7 hover:b-s-#f66a4b hover:b-e-#4859f3 hover:p-r-2.5rem group mt-5 transition-property-all transition-delay-50 transition-ease transition-duration-1000"
      >
        <span
          class="transition-property-all text-white bg-white delay-50 ease-linear duration-1000 group-hover:bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d bg-clip-text group-hover-text-transparent font-600"
        >Chat with Brainiac</span>
        <UIcon
          name="i-hugeicons-ai-brain-02"
          class="w-5 h-5 op-0 pos-absolute top-50% right-2.5 transform-translate-y--50% text-#217bfe text-xl group-hover:op-100 transition-opacity transition-delay-30 transition-ease-in-out transition-duration-500 transition-property-all"
        />
      </NuxtLink>
    </h1>
  </section>
</template>
