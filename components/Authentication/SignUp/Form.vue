<script setup lang="ts">
import useSchemaStore from "~/store/schema";

const { signUpSchema } = useSchemaStore();

const state = reactive({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});
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
      :schema="signUpSchema"
      :state="state"
      class="px-2 py-5 sm:p-6 w-full max-w-lg grid gap-8 b-1 b-#353C4A rounded-2"
      @submit="useCreateEmailPassword"
    >
      <header class="grid gap-1 place-items-center">
        <UIcon name="i-heroicons-user-circle" class="text-white w-8 h-8" />
        <h2 class="text-2xl font-700 text-white text-center">Create Account</h2>
        <h3 class="text-gray">
          Already have an account?
          <NuxtLink to="/authentication/signin" class="text-#4859f3 font-600"
            >Sign in </NuxtLink
          >.
        </h3>
      </header>

      <UFormGroup
        label="Email"
        name="email"
        size="xl"
        required
        eager-validation
      >
        <UInput
          variant="none"
          v-model="state.email"
          placeholder="you@example.com"
          type="email"
          class="b-1 b-#353C4A rounded-2 font-700 input"
        >
          <template #leading>
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-#4859f3" />
          </template>
        </UInput>
      </UFormGroup>

      <UFormGroup
        label="Password"
        name="password"
        size="xl"
        eager-validation
        required
      >
        <UInput
          v-model="state.password"
          variant="none"
          type="password"
          placeholder="Password"
          class="b-1 b-#353C4A rounded-2 grid font-700"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-lock-closed"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
      </UFormGroup>

      <UFormGroup
        label="Confirm Password"
        name="confirmPassword"
        size="xl"
        eager-validation
        required
      >
        <UInput
          v-model="state.confirmPassword"
          variant="none"
          type="password"
          placeholder="Confirm Password"
          class="b-1 b-#353C4A rounded-2 grid font-700"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-lock-closed"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
      </UFormGroup>

      <UButton
        type="submit"
        label="Sign Up"
        color="white"
        variant="ghost"
        size="md"
        block
        class="w-25 h-10 font-700 text-4 bg-transparent b-1 b-#353C4A rounded-xl justify-self-center hover:text-#4859f3"
      >
      </UButton>

      <p class="justify-self-center text-#4859f3 font-700">OR</p>

      <UButton
        @click.prevent="() => useGoogleAuth()"
        label="Sign up with Google"
        icon="i-ion-logo-google"
        block
        type="button"
        variant="ghost"
        color="white"
        class="w-full h-10 font-700 text-4 bg-transparent b-1 b-#353C4A rounded-xl justify-self-center hover:text-#4859f3"
      />
    </UForm>
  </UContainer>
</template>
