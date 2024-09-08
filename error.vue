<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: null,
  },
})

useHead({
  title: 'Brainiac | Error',
})
</script>

<template>
  <div
    class="w-full p-5 flex flex-col min-h-screen justify-between items-center"
  >
    <CustomNav />

    <div class="flex flex-col items-center justify-center gap-5">
      <header class="flex flex-col items-center justify-center gap-1">
        <UIcon
          name="i-heroicons-solid-exclamation-circle"
          class="text-slate w-20 h-20"
        />
      </header>

      <div class="flex flex-col items-center justify-center gap-5">
        <p
          class="bg-gradient-to-r from-#217BFE via-#ac87eb to-#ee4d5d bg-clip-text text-size-6xl text-transparent font-700 tracking-0.2rem"
        >
          {{ error?.statusCode }}
        </p>

        <p class="font-700">
          {{ error?.message.split(":")[0] }} !
        </p>

        <div class="flex items-center justify-center gap-5">
          <UButton
            type="button"
            color="white"
            variant="solid"
            label="Home"
            :ui="{
              font: 'font-700',
              base: 'min-w-max w-25 h-10 justify-self-center items-center justify-center',
              icon: { size: { md: 'w-8 h-8' } },
              color: {
                white: {
                  solid:
                    'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F',
                },
              },
            }"
            @click="navigateTo('/')"
          />

          <UButton
            type="button"
            color="white"
            variant="solid"
            :label="
              error?.message.split(':')[0] === 'Unauthorized'
                ? 'Sign In'
                : 'Back'
            "
            :ui="{
              font: 'font-700',
              base: 'min-w-max w-25 h-10 justify-self-center items-center justify-center',
              icon: { size: { md: 'w-8 h-8' } },
              color: {
                white: {
                  solid:
                    'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F',
                },
              },
            }"
            @click="
              error?.message.split(':')[0] === 'Unauthorized'
                ? navigateTo('/authentication/signin')
                : useRouter().back()
            "
          />
        </div>
      </div>
    </div>

    <CustomFooter />
  </div>
</template>
