<template>
  <div
    class="w-full flex flex-col min-h-100% gap-10 justify-between items-center"
  >
    <CustomNav />

    <slot />

    <CustomFooter />
  </div>
</template>
