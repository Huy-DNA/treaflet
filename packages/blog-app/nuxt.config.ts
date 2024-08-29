// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'BloggingInHell',
      meta: [
        { 
          name: 'charset',
          content: 'utf-8',
        },
        {
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1',
        },
      ],      
    },
    css: [
      '@/assets/css/normalize.css',
    ],
    typescript: {
      strict: true,
      typeCheck: true,
    },
  },
});
