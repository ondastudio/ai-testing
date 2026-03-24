import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxtjs/prismic"],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: "Subvisual",
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.svg' },
      ],
      meta: [
        { property: 'og:image', content: '/og-image.svg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og-image.svg' },
      ],
    },
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName
  }
})