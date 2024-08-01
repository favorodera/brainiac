<script setup lang="ts">
import useSchemaStore from "~/store/schema";

const { signInSchema } = useSchemaStore();

const state = reactive({
  email: undefined,
  password: undefined,
});
</script>

<template>
  <UContainer
    as="div"
    class="w-full max-w-lg h-full p-0 grid gap-2 place-items-center"
  >
    <UButton
      color="white"
      variant="ghost"
      icon="i-fa6-solid-arrow-left-long"
      class="group"
      :ui="{
        font: 'font-600',
        base: 'justify-self-start ',
        icon: { size: { md: 'w-8 h-8' } },
        color: {
          white: {
            ghost:
              'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 dark:hover:bg-transparent',
          },
        },
      }"
      @click="$router.back()"
    >
      <template #trailing>
        <span
          class="op-0 dark:group-hover:op-100 text-#4859f3 transition-all transition-delay-50 transition-duration-1000"
          >Back</span
        ></template
      >
    </UButton>

    <UForm
      :schema="signInSchema"
      :state="state"
      :error="signInSchema"
      class="auth-form shadow-[0rem_0rem_1rem_1rem_#00000040] px-2 py-5 sm:p-6 w-full max-w-lg grid gap-8 b b-transparent rounded-2"
      @submit="useEmailPasswordAuth"
    >
      <header class="grid gap-1 place-items-center">
        <UIcon name="i-heroicons-lock-closed" class="text-white w-8 h-8" />
        <h2 class="text-2xl font-700 text-white text-center">Welcome Back!</h2>
        <h3 class="text-gray">
          Don't have an account?
          <NuxtLink
            to="/authentication/signup"
            class="text-#4859f3 transition-color transition-delay-50 transition-duration-1000 hover:text-white font-600"
            >Sign up </NuxtLink
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
          placeholder="me@example.com"
          type="email"
          class="b-1 b-#353C4A rounded-2 font-700 input"
        >
          <template #leading>
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-#4859f3" />
          </template>
        </UInput>
        <template #error="{ error }"
          ><span class="text-red-500 font-500 flex items-center text-sm">
            <UIcon name="i-solar-shield-warning-bold" />
            {{ error === "Required" ? "Email is " : "" }} {{ error }}
          </span>
        </template>
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
          placeholder="my5P@$sword"
          class="b-1 b-#353C4A rounded-2 grid font-700"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-lock-closed"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
        <template #hint>
          <NuxtLink to="" class="text-#4859f3 text-sm font-700"
            >Forgot password?</NuxtLink
          >
        </template>
        <template #error="{ error }"
          ><span class="text-red-500 font-500 flex items-center text-sm">
            <UIcon name="i-solar-shield-warning-bold" />
            {{ error === "Required" ? "Password is " : "" }} {{ error }}
          </span>
        </template>
      </UFormGroup>

      <UButton
        type="submit"
        color="white"
        variant="solid"
        class="group"
        label="Sign in"
        :ui="{
          font: 'font-700',
          base: 'min-w-max w-25 h-10 justify-self-center items-center justify-center',
          icon: { size: { md: 'w-8 h-8' } },
          color: {
            white: {
              solid:
                'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 dark:hover:bg-transparent',
            },
          },
        }"
      />

      <p class="justify-self-center text-#4859f3 font-700">OR</p>

      <UButton
        @click.prevent="() => useGoogleAuth()"
        type="submit"
        icon="i-ion-logo-google"
        color="white"
        variant="solid"
        class="group"
        label="Sign in with Google"
        :ui="{
          rounded: 'rounded-xl',
          font: 'font-700',
          base: ' w-full h-10 justify-self-center items-center justify-center',
          icon: { size: { md: 'w-8 h-8' } },
          color: {
            white: {
              solid:
                'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 dark:hover:bg-transparent',
            },
          },
        }"
      />
    </UForm>
  </UContainer>
</template>
