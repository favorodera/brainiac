<template>
  <UContainer
    as="div"
    class="min-h-screen w-full p-0 flex flex-col gap-8 items-center justify-between"
  >
    <GuestNav />
    <slot />
    <GuestFooter />
  </UContainer>
</template>
