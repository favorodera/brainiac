<template>
  <UModal
    prevent-close
    :ui="{
      container: 'items-center',
      shadow: 'shadow-none',
      base: 'grid place-content-center dark:bg-transparent',
    }"
  >
    <div class="dots w-12 h-12 grid cols-3 place-items-center  ">
      <div
        v-for="n in 9"
        :key="n"
        class="w-2 h-2 rounded-full bg-#4859f3 animate-[fade_1.5s_alternate_ease-in-out_infinite]"
      />
    </div>
  </UModal>
</template>

<style lang="scss" scoped>
.dots>div:nth-of-type(2),
.dots>div:nth-of-type(4) {
  animation-delay: 0.25s;
}

.dots>div:nth-of-type(3),
.dots>div:nth-of-type(5),
.dots>div:nth-of-type(7) {
  animation-delay: 0.5s;
}

.dots>div:nth-of-type(6),
.dots>div:nth-of-type(8) {
  animation-delay: 0.75s;
}

.dots>div:nth-of-type(9) {
  animation-delay: 1s;
}

@keyframes fade {
  to {
    opacity: 0.2;
  }
}
</style>
