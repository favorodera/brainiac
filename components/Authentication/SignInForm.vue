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
          class="op-0 dark:group-hover:op-100 text-#4859f3 transition-property-all transition-delay-50 transition-duration-1000"
        >Home</span>
      </template>
    </UButton>

    <UForm
      :schema="signInSchema"
      :state="state"
      :error="signInSchema"
      class="shadow-[0rem_0rem_1rem_1rem_#80808027] px-2 py-5 sm:p-6 w-full max-w-lg grid gap-8 b b-transparent rounded-2"
      @submit="emailPasswordAuth"
    >
      <header class="grid gap-1 place-items-center">
        <UIcon
          name="i-heroicons-lock-closed"
          class="text-white w-8 h-8"
        />
        <h2 class="text-2xl font-700 text-white text-center">
          Welcome Back!
        </h2>
        <h3 class="text-gray text-sm">
          Don't have an account?
          <NuxtLink
            to="/authentication/signup"
            class="text-#4859f3 transition-color transition-delay-50 transition-duration-1000 hover:text-white text-sm font-500"
          >
            Sign up </NuxtLink>.
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
          autocomplete
          variant="none"
          placeholder="me@example.com"
          type="email"
          class="b-1 b-#FFFFFF0F rounded-2 font-700"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-envelope"
              class="w-6 h-6 text-#4859f3"
            />
          </template>
        </UInput>
        <template #error="{ error }">
          <span class="text-red-500 font-500 flex items-center gap-1 text-sm">
            <UIcon
              name="i-solar-shield-warning-bold"
              class="w-4 h-4 flex-shrink-0"
            />
            <span>{{ error === "Required" ? "Email is " : "" }} {{ error }}</span>
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
        <template #hint>
          <NuxtLink
            to=""
            class="text-#4859f3 text-sm font-700"
          >
            Forgot password?
          </NuxtLink>
        </template>
        <template #error="{ error }">
          <span class="text-red-500 font-500 flex items-center gap-1 text-sm">
            <UIcon
              name="i-solar-shield-warning-bold"
              class="w-4 h-4 flex-shrink-0"
            />
            <span>{{ error === "Required" ? "Password is " : "" }}
              {{ error }}</span>
          </span>
        </template>
      </UFormGroup>

      <UButton
        type="submit"
        color="white"
        variant="solid"
        label="Sign in"
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
        }"
      />

      <p class="justify-self-center text-#4859f3 text-sm font-700">
        OR
      </p>

      <UButton
        icon="i-ion-logo-google"
        color="white"
        variant="solid"
        label="Sign in with Google"
        :ui="{
          rounded: 'rounded-xl',
          font: 'font-700',
          base: ' w-full h-10 justify-self-center items-center justify-center',
          icon: { size: { md: 'w-8 h-8' } },
          color: {
            white: {
              solid:
                'dark:focus:outline-0 dark:active:outline-0 dark:bg-transparent transition-property-all transition-delay-50 transition-duration-1000 dark:hover:text-#4859f3 ring-1 ring-#FFFFFF0F dark:hover:bg-#FFFFFF0F',
            },
          },
        }"
        @click="() => googleAuth()"
      />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import useSchemaStore from '~/store/authSchemaStore'

const { signInSchema } = useSchemaStore()

const state = reactive({
  email: undefined,
  password: undefined,
})
</script>
