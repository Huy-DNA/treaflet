// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  alias: {
    '@': '/<srcDir>',
    'assets': '/<srcDir>/assets',
    'public': '/<srcDir>/public',
    'plugins': '/<srcDir>/plugins',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'BloggingInHell',
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js', async: true, }
      ],
      meta: [
        { 
          name: 'charset',
          content: 'utf-8',
        },
        {
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: 'A personal blog exploring concepts of various computer science topics',
        },
      ],    
    },
    css: [
      '@/assets/css/normalize.css',
      '@/assets/css/fonts.css',
    ],
    typescript: {
      strict: true,
      typeCheck: true,
    },
  },
});
