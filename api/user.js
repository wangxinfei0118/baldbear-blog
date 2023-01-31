export default ({ $axios }, inject) => {
  // 查询个人用户信息
  inject('getUserInfo', (id) => $axios.$get(`/user/user/${id}`))
  // 提交修改个人用户信息
  inject('updateUserInfo', (data, id) => $axios.$put(`/user/user/${id}`, data))
  // 提交修改新密码
  inject('updatePassword', (data, id) => $axios.$put(`/user/password/${id}`, data))
}
