import Vue from 'vue'

export default (content, inject) => {
  // 处理数据转义问题
  inject('handleEscape', (str) => {
    return str.replace(/\\n/g, '\n').replace(/\\"/g, '"')
  })
}

Vue.prototype.$avatar = require('@/assets/img/avatar.svg')
