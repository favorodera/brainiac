<template>
  <section class="w-full">
    <h1
      class="flex flex-col gap-0rem text-center items-center justify-center w-full"
    >
      <span
        class="brainiac text-size-6xl font-700 text-transparent tracking-0.2rem"
        >Brainiac</span
      >
      <span class="text-size-1rem font-700 text-#FFFFFFA3"
        >Your AI Companion for Creativity and Productivity.</span
      >
      <button
        type="button"
        class="border-1 pos-relative p-2 rounded-xl group mt-5 transition-all transition-delay-50 transition-ease transition-duration-1000"
      >
        <span
          class="transition-color transition-delay-50 transition-ease-linear transition-duration-1000 group-hover:text-#a24ae7 font-600"
          >Chat with Brainiac</span
        >
        <UIcon
          name="i-solar-chat-line-outline"
          class="w-5 h-5 op-0 pos-absolute top-50% right-2.5 transform-translate-y--50% text-#217bfe text-xl group-hover:op-100 transition-opacity transition-delay-30 transition-ease-in-out transition-duration-500"
        />
      </button>
    </h1>
  </section>
</template>

<style scoped lang="scss">
.brainiac {
  background: linear-gradient(
    111deg,
    #f66a4b 15.87%,
    #a24ae7 60.65%,
    #4859f3 89.14%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.group:hover {
  border-block-end-color: #a24ae7;
  border-block-start-color: #a24ae7;
  border-inline-start-color: #f66a4b;
  border-inline-end-color: #4859f3;
  padding-right: 2.5rem;
}
</style>
