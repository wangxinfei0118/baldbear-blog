export default (content, inject) => {
  // 处理数据转义问题
  inject('handleEscape', (str) => {
    return str.replace(/\\n/g, '\n').replace(/\\"/g, '"')
  })
}
