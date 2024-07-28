// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
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
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  nitro: {
    preset: "firebase",
    firebase: {
      nodeVersion: "20",
      gen: 2,
      httpsOptions: {
        region: "europe-west1",
        maxInstances: 3,
      },
    },
  },
});
