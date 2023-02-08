# baldbear-blog

[![baldbear](https://img.shields.io/badge/%E7%A7%83%E5%A4%B4%E7%86%8A-%40baldbear-brightgreen)](http://baldbear.cn/)[![node](https://img.shields.io/badge/node-v14.19.0-blue)](https://nodejs.org/)[![nuxt](https://img.shields.io/badge/nuxt-^2.0.0-blue)](https://nuxtjs.org/)

该项目是基于node和nuxt.js的SSR前后端分离个人博客，前端由vue+nuxt.js+element搭建服务端渲染页面，后端由node+express提供restful接口，主要包括技术笔记分享，生活分享，留言板等功能，并从性能及seo方面对项目进行整体的优化

[博客在线地址](http://baldbear.cn)   [node接口仓库](https://github.com/wangxinfei0118/baldbear-node-api) 

## 项目特点

- PostCSS支持，[Tailwind](https://github.com/nuxt-modules/tailwindcss)功能类代替行内样式
- 基于媒体查询及百分比的响应式布局
- [pxtorem](https://github.com/cuth/postcss-pxtorem)实现移动端rem适配
- [mavon-editor](https://github.com/hinesboy/mavonEditori)提供markdown支持
- CSS3过渡及动画效果
- 目录固钉、评论区等公共组件，实现滚动高亮及文章锚点定位
- 使用[cross-env](https://github.com/kentcdodds/cross-env#readme)管理环境变量
- 图片懒加载，按需引入UI组件
- 响应状态拦截，实现权限验证及用户登录状态的刷新
- 性能优化，首屏加载时间由1.2s降低到0.4s，文件体积由9.8M降低到3.68M
- SEO优化，设计合理的title、description、keywords及书写语义化的HTML代码，并设置title、alt、nofollow等属性

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问地址：http://localhost:3000

# 项目打包，并在生产环境运行 推荐使用pm2管理进程
npm run build
npm run start

# 生成静态页面
npm run generate
```

## 性能优化

1. 按需引入element-ui

```javascript
import Vue from 'vue'
import {
  Button,
  Input,
  ......
} from 'element-ui'
const components = [
  Button,
  Input,
  ......
]
const Element = {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
// nuxt.config.js
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
}
```

2.图片压缩 使用[@aceforth/nuxt-optimized-images](https://github.com/juliomrqz/nuxt-optimized-images)

```javascript
// nuxt.config.js
buildModules: [
  '@aceforth/nuxt-optimized-images'
],
optimizedImages: {
  optimizeImages: true
},
```

注：打包过程中可能会报错，目前项目已经注释

3.关闭生成环境sourcemap

```javascript
// nuxt.config.js
build: {
  extend(config, ctx) {
    config.devtool = false
  }
}
```

4.splitChunk分包 分离element-ui和mavon-editor

```javascript
// nuxt.config.js
build: {
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
}
```

5.开启gzip，项目使用的是[@aceforth/nuxt-optimized-images](https://github.com/juliomrqz/nuxt-optimized-images)

```javascript
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
}
```

6.图片懒加载

```javascript
import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

// 加载中的图片
const loadimage = require('@/assets/img/loading.gif')
// 加载图片出错展现的图片
const errorimage = require('@/assets/img/logo.png')

Vue.use(VueLazyLoad, {
  loading: loadimage,
  error: errorimage,
  attempt: 1 // 加载失败尝试重新加载次数
})

```



## API文档

接口文档可通过启动[baldbear-node-api](https://github.com/wangxinfei0118/baldbear-node-api) 项目，访问`http://localhost:3008/docs`

或 [点击查看在线接口文档](http://api.baldbear.cn/docs/) 

