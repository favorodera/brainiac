<script setup lang="ts">
import type { _fontSize } from "#tailwind-config/theme";
import useTogglerStore from "~/store/toggler";
import useErrorStore from "~/store/error";

const state = reactive({
  email: undefined,
  password: undefined,
});

const { signInFormError } = useErrorStore();
</script>

<template>
  <UContainer
    as="div"
    class="w-full max-w-lg h-full p-0 grid gap-2 place-items-center"
  >
    <UButton
      label="Back"
      color="white"
      variant="ghost"
      class="justify-self-start font-700 text-4 bg-transparent hover:text-#4859f3 active:text-#4859f3"
      to="/"
    >
      <template #leading>
        <UIcon name="i-heroicons-arrow-left-20-solid" class="w-5 h-5" />
      </template>
    </UButton>

    <UForm
      :state="state"
      :validate="() => useValidateSignIn(state)"
      class="px-2 py-5 sm:p-6 w-full max-w-lg grid gap-8 b-1 b-#353C4A rounded-2"
      @error="useToggleFormAlert()"
      @submit="() => useEmailPasswordAuth(state.email, state.password)"
      :validate-on="['change', 'input', 'submit']"
    >
      <header class="grid gap-1 place-items-center">
        <UIcon name="i-heroicons-lock-closed" class="text-white w-8 h-8" />
        <h2 class="text-2xl font-700 text-white text-center">Welcome Back!</h2>
        <h3 class="text-gray">
          Don't have an account?
          <NuxtLink to="/authentication/signup" class="text-#4859f3 font-600"
            >Sign up </NuxtLink
          >.
        </h3>
      </header>

      <UFormGroup label="Email" name="email" size="xl" required>
        <UInput
          variant="none"
          v-model="state.email"
          placeholder="you@example.com"
          type="email"
          leading-icon="i-heroicons-envelope"
          :trailing-icon="
            signInFormError[0]?.message === 'Invalid email address' ||
            signInFormError[0]?.message === 'Email is required'
              ? 'i-heroicons-exclamation-triangle-20-solid'
              : undefined
          "
          class="b-1 b-#353C4A rounded-2 font-700"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password" size="xl" required>
        <UInput
          v-model="state.password"
          variant="none"
          type="password"
          placeholder="Password"
          leading-icon="i-heroicons-lock-closed"
          :trailing-icon="
            signInFormError[0]?.message ===
              'Password must be at least 6 characters' ||
            signInFormError[0]?.message === 'Password is required'
              ? 'i-heroicons-exclamation-triangle-20-solid'
              : undefined
          "
          class="b-1 b-#353C4A rounded-2 grid font-700"
        />
        <template #hint>
          <NuxtLink to="" class="text-#4859f3 font-600"
            >Forgot password?</NuxtLink
          >
        </template>
      </UFormGroup>

      <UAlert
        variant="soft"
        class="text-#4859f3 bg-#4859f320"
        icon="i-heroicons-information-circle-20-solid"
        title="Error signing in"
      />

      <UButton
        @submit.prevent="
          () => useEmailPasswordAuth(state.email, state.password)
        "
        type="submit"
        label="Sign In"
        color="white"
        variant="ghost"
        size="md"
        block
        class="w-25 h-10 font-700 text-4 bg-transparent b-1 b-#353C4A rounded-xl justify-self-center hover:text-#4859f3"
      />

      <p class="justify-self-center text-#4859f3 font-700">OR</p>

      <UButton
        @click.prevent="() => useGoogleAuth()"
        @dblclick="useToggleFormAlert"
        label="Sign in with Google"
        icon="i-ion-logo-google"
        block
        variant="ghost"
        color="white"
        class="w-full h-10 font-700 text-4 bg-transparent b-1 b-#353C4A rounded-xl justify-self-center hover:text-#4859f3"
      />
    </UForm>
  </UContainer>
</template>
