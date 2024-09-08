<template>
  <main
    class="dark font-sans bg-transparent max-w-90rem text-white w-full p-5 flex flex-col min-h-screen gap-10 justify-between items-center"
  >
    <CustomNav />

    <slot />

    <CustomFooter />
  </main>
</template>
