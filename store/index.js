const state = () => ({
  userInfo: null,
  accessToken: null,
  refreshToken: null,
})

const mutations = {
  // 重置用户状态
  resetUserState(state){
    state.userInfo = null
    state.accessToken = null
    state.refreshToken = null
  },

  // 更新用户状态
  updateUserState(state,userData){
    state.userInfo = userData.userInfo
    state.accessToken = userData.accessToken
    state.refreshToken = userData.refreshToken
  }
}

const actions = {

  nuxtServerInit({commit}, {app}){
    const userData = {}
    userData.userInfo = app.$cookies.get('userInfo')
    userData.accessToken = app.$cookies.get('accessToken')
    userData.refreshToken = app.$cookies.get('refreshToken')
    commit('updateUserState',userData)

  },
  // 跳转到认证客户端
  toLoginPage({commit}){
    commit('resetUserState')
    window.location.href = `http://localhost:7000?redirectURL=${window.location.href}`
  },

  // 退出登录
  toLogout(){
    window.location.href = `http://localhost:7000/logout?redirectURL=${window.location.href}`
  }
}
export default {
  state,
  mutations,
  actions
}
