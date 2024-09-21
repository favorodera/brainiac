// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  experimental: {
    asyncContext: true,
  },
  ssr: true,
  modules: ["@nuxt/ui", "@unocss/nuxt", "@pinia/nuxt", "@nuxt/eslint","@formkit/auto-animate/nuxt"],
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
  colorMode: {
    preference: 'dark'
  },
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
    rootTag: "main",
    rootAttrs: {
      id: "app",
      class: "flex p-5 w-full min-h-screen max-w-90rem",
    },
    head: {
      htmlAttrs: {
        lang: "en",
        class: "dark ",
      },
      bodyAttrs: {
        class: "dark bg-black flex items-center justify-center",
      },
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      style: [
        { children: ':root { font-family: "Space Mono", monospace; }'}
      ],
      link: [
        { rel:"preconnect", href:"https://fonts.googleapis.com" },
        { rel:"preconnect", href:"https://fonts.gstatic.com" },
        { rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" }
      ],
    },
  },
});
