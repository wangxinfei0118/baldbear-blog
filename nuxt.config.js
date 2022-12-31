
export default {
  mode: 'universal',
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
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    'mavon-editor/dist/css/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/api/note.js',
    '@/api/common.js',
    { src: '@/plugins/mavon-editor', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  axios: {
    proxy: true,
    prefix:'/api'
  },
  proxy: {
    '/api':{
      target: 'https://mock.apifox.cn/m1/2096471-0-default',
      pathRewrite: {'^/api': ''}
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile:[/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
