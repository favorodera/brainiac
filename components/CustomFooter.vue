<template>
  <footer
    class="flex w-full items-center p-block-0.75rem justify-between h-2.75rem"
  >
    <NuxtLink
      to="https://www.github.com/favorodera"
      target="_blank"
      rel="noopener noreferrer"
      class=" text-#217BFE  hover:text-#ac87eb text-size-sm font-400 property-all delay-50 duration-1000"
    >favorodera &copy; {{ new Date().getFullYear() }}</NuxtLink>

    <div class="flex gap-1 items-center justify-center">
      <UIcon
        name="i-fa-flash"
        class="text-#217BFE w-4 h-4"
      />
      <span
        class="bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d text-size-sm font-400 bg-clip-text text-transparent"
      >Gemini</span>
    </div>
  </footer>
</template>
