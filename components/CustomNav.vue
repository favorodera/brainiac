<template>
  <nav
    class="flex max-w-90rem w-full items-center p-block-0.75rem justify-between h-2.75rem"
  >
    <NuxtLink
      to="/"
      class="flex w-screen text-size-xl text-#FFFFFFDB font-400 items-center gap-0.38rem"
    >
      <UIcon
        name="i-hugeicons-ai-brain-02"
        class="text-#217BFE w-5 h-5"
      />

      <h1
        class="bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d bg-clip-text text-transparent"
      >
        Brainiac
      </h1>
    </NuxtLink>

    <slot name="menu-button" />
  </nav>
</template>
