<template>
  <div
    class="place-items-center shadow-[0rem_0rem_1rem_1rem_#80808027] mx-auto p-5 w-full max-w-4xl grid gap-10 b b-transparent rounded-2">
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
      @click="navigateTo('/authentication/signin')" />
    <header class="grid gap-1 place-items-center">
      <UIcon name="i-heroicons-lock-open" class="text-white w-8 h-8" />
      <h2 class="text-2xl font-700 text-white text-center">Password Reset</h2>
    </header>

    <div class="w-full p-0 flex flex-col gap-10">
      <p class="font-700 text-lg">
        <UIcon name="i-pajamas-partner-verified" class="w-4 h-4 text-gray" />
        Input your email address to request for a password reset link.
      </p>

      <p class="font-700 text-lg">
        <UIcon name="i-pajamas-partner-verified" class="w-4 h-4 text-gray" />
        If the email matches an account you will receive a password reset link.
        Please click the link to reset your password.
      </p>

      <p class="font-700 text-lg">
        <UIcon name="i-pajamas-partner-verified" class="w-4 h-4 text-gray" /> If
        you did not receive an email, please check your spam folder or contact
        us.
      </p>
    </div>

    <UForm
      :schema="schema"
      :state="state"
      :error="schema"
      class="w-full max-w-lg grid gap-8"
      @submit.prevent="handleRequest()">
      <UFormGroup
        label="Registered Email"
        name="email"
        size="xl"
        required
        eager-validation>
        <UInput
          v-model="state.email"
          :disabled="isCountdownActive"
          variant="none"
          placeholder="me@example.com"
          type="email"
          class="b-1 b-#FFFFFF0F rounded-2 font-700">
          <template #leading>
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-#4859f3" />
          </template>
        </UInput>
        <template #error="{ error }">
          <span class="text-red-500 font-500 flex items-center gap-1 text-sm">
            <UIcon
              name="i-solar-shield-warning-bold"
              class="w-4 h-4 flex-shrink-0" />
            <span
              >{{ error === "Required" ? "Email is " : "" }} {{ error }}</span
            >
          </span>
        </template>
      </UFormGroup>

      <UButton
        type="submit"
        padded
        :disabled="isCountdownActive"
        trailing
        :loading="isAuthRunning.passwordreset"
        loading-icon="i-svg-spinners-270-ring"
        color="white"
        variant="solid"
        :label="buttonLabel"
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
        }" />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

const isAuthRunning = await useIsAuthRunning();
const state = reactive({
  email: "",
});
const timer = reactive({ minutes: 1, seconds: 59 });

const isCountdownActive = computed(() => isAuthRunning.countdown);
const buttonLabel = computed(() =>
  isCountdownActive.value ? `${timer.minutes}:${timer.seconds}` : "Send Link"
);

const countdown = () => {
  isAuthRunning.countdown = true;

  const intervalId = setInterval(() => {
    if (timer.seconds > 0) {
      timer.seconds--;
    } else if (timer.minutes > 0) {
      timer.minutes--;
      timer.seconds = 59;
    } else {
      stopCountdown(intervalId);
    }
  }, 1000);

  return intervalId;
};

const stopCountdown = (intervalId: NodeJS.Timeout) => {
  isAuthRunning.countdown = false;
  clearInterval(intervalId);
};

const handleRequest = () => {
  if (state.email !== "") {
    countdown();
    resetPassword(state.email);
  }
};

let countdownIntervalId: number;

onBeforeUnmount(() => {
  isAuthRunning.countdown = false;
});
</script>
