export default {
  mode: 'universal',
  env: {
    // 认证客户端url process.env.authURL
    authURL: process.env.NODE_ENV === 'dev' ? '//localhost:7000' : '//login.baldbear.cn'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '秃头熊的个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '秃头熊的前端知识库' }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  },
  router: {
    middleware: '404'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', 'element-ui/lib/theme-chalk/display.css', 'mavon-editor/dist/css/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/api/note.js',
    '@/api/common.js',
    '@/api/life.js',
    '@/api/user.js',
    '@/plugins/interceptor.js',
    { src: '@/plugins/mavon-editor', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api': {
      target: 'https://www.fastmock.site/mock/7bd9f6a21e18a9c791fd338a1a007d59/baldbear-blog',
      pathRewrite: { '^/api': '' }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
