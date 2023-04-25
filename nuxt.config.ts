// import { resolve } from 'path'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~~/assets/style.scss'],

  ssr: false,

  app: {
    baseURL: '/hc-htv-brightsign-calendar',
    // cdnURL: 'https://commbocc.github.io/hc-htv-brightsign-calendar',
  },
})
