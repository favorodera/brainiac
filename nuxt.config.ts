// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  experimental: {
    asyncContext: true,
  },
  ssr: true,
  modules: ["@nuxt/ui", "@unocss/nuxt", "@pinia/nuxt", "@nuxt/eslint"],
  unocss: {
    nuxtLayers: true,
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ["~/scss/index.scss"],
  runtimeConfig: {
    public: {
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseMessagingSenderId: "",
      firebaseAppId: "",
      firebaseMeasurementId: "",
      firebaseProjectId: "",
      firebaseStorageBucket: "",
    },
    geminiApiKey: "",
    firebaseServiceAccount: "",
  },
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
