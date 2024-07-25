<script setup lang="ts"></script>

<template>
  <section class="w-full grid gap-4 md:grid-cols-2">
    <h1 class="text-size-4xl font-700 md:col-span-2 text-center">
      Experience ...
    </h1>

    <div
      class="rounded-3 min-h-13rem group bg-#1e1f20 border-1 border-transparent p-3 flex flex-col gap-2 items-start transition-border transition-delay-50 transition-ease transition-duration-1000"
    >
      <div class="flex items-center gap-2">
        <UIcon
          name="i-fluent-toolbox-32-filled"
          class="text-size-2xl text-#FFFFFFA3 group-hover:text-#4859f3 transition-color transition-delay-50 transition-ease transition-duration-1000"
        />
        <h1
          class="text-size-2xl font-700 group-hover:text-#4859f3 transition-color transition-delay-50 transition-ease transition-duration-1000"
        >
          Unmatched Versatility.
        </h1>
      </div>

      <p
        class="text-size-lg font-500 group-hover:text-#4859f3 transition-color transition-delay-50 transition-ease transition-duration-1000"
      >
        Whether you seek informative answers, creative brainstorming, or
        assistance with everyday tasks, Brainiac adapts to your needs.
      </p>
    </div>

    <div
      class="group transition-border transition-delay-50 transition-ease transition-duration-1000 rounded-3 min-h-13rem bg-#1e1f20 border-1 border-transparent p-3 flex flex-col gap-2 items-start"
    >
      <div class="flex items-center gap-2">
        <UIcon
          name="i-fluent-chat-32-filled"
          class="text-size-2xl text-#FFFFFFA3 group-hover:text-#f66a4b transition-color transition-delay-50 transition-ease transition-duration-1000"
        />
        <h1
          class="text-size-2xl font-700 group-hover:text-#f66a4b transition-color transition-delay-50 transition-ease transition-duration-1000"
        >
          Effortless Communication.
        </h1>
      </div>

      <p
        class="text-size-lg font-500 group-hover:text-#f66a4b transition-color transition-delay-50 transition-ease transition-duration-1000"
      >
        Engage in natural, flowing conversations through text or voice
        interactions with Brainiac, eliminating the frustration of clunky
        interfaces.
      </p>
    </div>

    <div
      class="group transition-border transition-delay-50 transition-ease transition-duration-1000 rounded-3 min-h-13rem bg-#1e1f20 border-1 border-transparent p-3 flex flex-col gap-2 items-start"
    >
      <div class="flex items-center gap-2">
        <UIcon
          name="i-fluent-book-32-filled"
          class="text-size-2xl text-#FFFFFFA3 group-hover:text-#a24ae7 transition-color transition-delay-50 transition-ease transition-duration-1000"
        />
        <h1
          class="text-size-2xl font-700 group-hover:text-#a24ae7 transition-color transition-delay-50 transition-ease transition-duration-1000"
        >
          Constant Learning.
        </h1>
      </div>

      <p
        class="text-size-lg font-500 group-hover:text-#a24ae7 transition-color transition-delay-50 transition-ease transition-duration-1000"
      >
        Brainiac continuously evolves, drawing from vast datasets and user
        interactions to provide ever-more-sophisticated assistance.
      </p>
    </div>

    <div
      class="group transition-border transition-delay-50 transition-ease transition-duration-1000 rounded-3 min-h-13rem bg-#1e1f20 border-1 border-transparent p-3 flex flex-col gap-2 items-start transition-border"
    >
      <div class="flex items-center gap-2">
        <UIcon
          name="i-fluent-lock-shield-32-filled"
          class="text-size-2xl text-#FFFFFFA3 group-hover:text-#ac87eb transition-color transition-delay-50 transition-ease transition-duration-1000"
        />
        <h1
          class="text-size-2xl font-700 group-hover:text-#ac87eb transition-color transition-delay-50 transition-ease transition-duration-1000"
        >
          Privacy by Design.
        </h1>
      </div>

      <p
        class="text-size-lg font-500 group-hover:text-#ac87eb transition-color transition-delay-50 transition-ease transition-duration-1000"
      >
        We prioritize your security and privacy, ensuring your conversations
        with Brainiac remain confidential.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.group:hover {
  border-block-end-color: #a24ae7;
  border-block-start-color: #a24ae7;
  border-inline-start-color: #f66a4b;
  border-inline-end-color: #4859f3;
}
</style>
