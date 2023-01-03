export default ({ $axios }, inject) => {
  // 查询个人用户信息
  inject('getUserInfo', id => $axios.$get( `/user/user/${id}` ) )
  // 提交修改个人用户信息
  inject('updateUserInfo', data => $axios.$put( `/user/user`, data) )
  // 校验原密码
  inject('checkOldPassword', data => $axios.$post(`/user/check/password`, data) )
  // 提交修改新密码
  inject('updatePassword', data => $axios.$put(`/user/password`, data) )
}
