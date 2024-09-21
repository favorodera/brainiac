<template>
  <div
    class="place-items-center shadow-[0rem_0rem_1rem_1rem_#80808027] mx-auto p-5 w-full max-w-4xl grid gap-10 b b-transparent rounded-2"
  >
    <UButton
      color="white"
      variant="ghost"
      label="Back to Sign In"
      icon="i-heroicons-lock-closed-solid"
      class="group"
      :ui="{
        font: 'font-600',
        base: 'justify-self-start ',
        color: {
          white: {
            ghost:
              'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 dark:hover:bg-transparent',
          },
        },
      }"
      @click="navigateTo('/authentication/signin')"
    />
    <header class="grid gap-1 place-items-center">
      <UIcon
        name="i-heroicons-envelope-solid"
        class="text-white w-8 h-8"
      />

      <h2 class="text-2xl font-700 text-white text-center">
        Verify Your Email
      </h2>
    </header>

    <div class="w-full p-0 flex flex-col gap-10">
      <p class="font-700 text-lg">
        <UIcon
          name="i-pajamas-partner-verified"
          class="w-4 h-4 text-gray"
        />
        A Link has been sent to your email address. Please click the link to
        verify your email address.
      </p>

      <p class="font-700 text-lg">
        <UIcon
          name="i-pajamas-partner-verified"
          class="w-4 h-4 text-gray"
        />
        After verification go back to the sign in page to sign in.
      </p>

      <p class="font-700 text-lg">
        <UIcon
          name="i-pajamas-partner-verified"
          class="w-4 h-4 text-gray"
        /> If
        you did not receive an email, please check your spam folder or contact us
      </p>
    </div>
  </div>
</template>
