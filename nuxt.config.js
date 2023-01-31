export default {
  mode: 'universal',
  env: {
    authURL: process.env.NODE_ENV === 'dev' ? '//localhost:7000' : '//login.baldbear.cn'
  },
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
  loading: false,
  css: ['element-ui/lib/theme-chalk/display.css', 'mavon-editor/dist/css/index.css'],
  plugins: [
    '@/api/note.js',
    '@/api/common.js',
    '@/api/life.js',
    '@/api/user.js',
    '@/api/message.js',
    '@/plugins/element-ui',
    '@/plugins/interceptor.js',
    { src: '@/plugins/mavon-editor', mode: 'client' }
  ],
  buildModules: [
    '@nuxtjs/tailwindcss'
    // '@aceforth/nuxt-optimized-images'
  ],
  // optimizedImages: {
  //   optimizeImages: true
  // },
  modules: ['@nuxtjs/axios', 'cookie-universal-nuxt', 'nuxt-precompress'],
  nuxtPrecompress: {
    gzip: {
      enabled: true,
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
      deleteOriginalAssets: true
    },
    brotli: {
      enabled: false,
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    },
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml)$/,
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ['br', 'gzip']
    }
  },
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3008',
      pathRewrite: { '^/api': '' }
    }
  },
  build: {
    transpile: [/^element-ui/],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        cacheGroups: {
          'element-ui': {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          },
          'mavon-editor': {
            test: /node_modules[\\/]mavon-editor/,
            chunks: 'all',
            priority: 20,
            name: true
          }
        }
      }
    },
    extend(config, ctx) {
      // config.module.rules.push({
      //   test: /\.(png|jpe?g|gif|svg)/i,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 1000,
      //     name: 'img/[name].[hash].[ext]',
      //     esModule: false
      //   }
      // })
      config.devtool = false
    }
  }
}
