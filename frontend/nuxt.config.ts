// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css", "~/assets/css/themes.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
  ssr: false,
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
