// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxt/ui", "@pinia/nuxt"],
  unocss: {
    nuxtLayers: true,
  },
  css: ["~/assets/scss/index.scss"],
  runtimeConfig: {
    geminiApiKey: "",
    firebaseApiKey: "",
    firebaseMessagingSenderId: "",
    firebaseAppId: "",
    firebaseMeasurementId: "",
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  nitro: {
    preset: "firebase",
  },
});
