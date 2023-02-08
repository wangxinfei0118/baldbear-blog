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
