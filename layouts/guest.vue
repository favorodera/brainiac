<template>
  <div
    class="w-full max-w-90rem flex flex-col min-h-100% gap-10 justify-between items-center"
  >
    <CustomNav />

    <slot />

    <CustomFooter />
  </div>
</template>
