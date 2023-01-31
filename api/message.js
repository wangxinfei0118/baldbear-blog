export default ({ $axios }, inject) => {
  // 获取所有留言
  inject('getMessage', () => $axios.$get(`/message/message`))
  // 添加留言
  inject('addMessage', (data) => $axios.$post(`/message/message`, data))
  // 删除留言
  inject('deleteMessage', (id) => $axios.$delete(`/message/message/${id}`))
}
