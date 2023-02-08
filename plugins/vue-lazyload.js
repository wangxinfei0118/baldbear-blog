import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

//加载中的图片
const loadimage = require('@/assets/img/loading.gif')
//加载图片出错展现的图片
const errorimage = require('@/assets/img/logo.png')

Vue.use(VueLazyLoad, {
  preLoad: 1.33, //预加载高度比例
  loading: loadimage,
  error: errorimage,
  attempt: 2, //尝试计数次数
  throttleWait: 500 //节流等待时间(通过调节此值可以查看loading的效果，根据实际情况调节)
})
