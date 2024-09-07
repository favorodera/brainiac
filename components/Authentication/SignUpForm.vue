<script setup lang="ts">
import useSchemaStore from '~/store/authSchemaStore'

const { signUpSchema } = useSchemaStore()

const state = reactive({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
})
</script>

<template>
  <UContainer
    as="div"
    class="w-full max-w-lg h-full p-0 grid gap-2 place-items-center"
  >
    <UButton
      color="white"
      variant="ghost"
      icon="i-heroicons-home-solid"
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
      @click="navigateTo('/')"
    >
      <template #trailing>
        <span
          class="op-0 dark:group-hover:op-100 transition-all transition-delay-50 transition-duration-1000"
        >Home</span>
      </template>
    </UButton>

    <UForm
      :schema="signUpSchema"
      :state="state"
      :error="signUpSchema"
      class="shadow-[0rem_0rem_1rem_1rem_#80808027] px-2 py-5 sm:p-6 w-full max-w-lg grid gap-8 b b-transparent rounded-2"
      @submit="createEmailPassword"
    >
      <header class="grid gap-1 place-items-center">
        <UIcon
          name="i-heroicons-user-circle"
          class="text-white w-8 h-8"
        />
        <h2 class="text-2xl font-700 text-white text-center">
          Create Account
        </h2>
        <h3 class="text-gray text-sm">
          Already have an account?
          <NuxtLink
            to="/authentication/signin"
            class="text-#4859f3 transition-color transition-delay-50 transition-duration-1000 hover:text-white font-500"
          >
            Sign in </NuxtLink>.
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
          v-model="state.email"
          variant="none"
          placeholder="me@example.com"
          type="email"
          class="b-1 b-#FFFFFF0F rounded-2 font-700"
          autocomplete
        >
          <template #leading>
            <UIcon
              name="i-heroicons-envelope"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
        <template #error="{ error }">
          <span class="text-red-500 font-500 flex items-center text-sm">
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
          autocomplete
          variant="none"
          type="password"
          placeholder="my5P@$sword"
          class="b-1 b-#FFFFFF0F rounded-2 grid font-700"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-lock-closed"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
        <template #error="{ error }">
          <span class="text-red-500 font-500 flex items-center text-sm">
            <UIcon name="i-solar-shield-warning-bold" />{{
              error === "Required" ? "Password is " : ""
            }}
            {{ error }}
          </span>
        </template>
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
          autocomplete
          variant="none"
          type="password"
          placeholder="my5P@$sword"
          class="b-1 b-#FFFFFF0F rounded-2 grid font-700"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-lock-closed"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
        <template #error="{ error }">
          <span class="text-red-500 font-500 flex items-center text-sm">
            <UIcon name="i-solar-shield-warning-bold" />{{
              error === "Required" ? "Password is " : ""
            }}
            {{ error }}
          </span>
        </template>
      </UFormGroup>

      <UButton
        type="submit"
        color="white"
        variant="solid"
        label="Create Account"
        :ui="{
          container: 'dark:bg-red',
          font: 'font-700',
          base: 'min-w-max w-25 h-10 justify-self-center items-center justify-center',
          color: {
            white: {
              solid:
                'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3',
            },
          },
        }"
      />

      <p class="justify-self-center text-#4859f3 text-sm font-700">
        OR
      </p>

      <UButton
        icon="i-ion-logo-google"
        color="white"
        variant="solid"
        label="Sign up with Google"
        :ui="{
          rounded: 'rounded-xl',
          font: 'font-700',
          base: ' w-full h-10 justify-self-center items-center justify-center',

          color: {
            white: {
              solid:
                'dark:focus:outline-0 dark:active:outline-0 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 ',
            },
          },
        }"
        @click="() => googleAuth()"
      />
    </UForm>
  </UContainer>
</template>
