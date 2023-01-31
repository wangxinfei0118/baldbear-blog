export default ({ store, route, redirect, $axios }) => {
  $axios.onRequest((config) => {
    const accessToken = store.state.accessToken
    if (accessToken) {
      // 针对每个请求，请求头带上令牌 Authorization: Bearer token
      config.headers.Authorization = 'Bearer ' + accessToken
      if (config.headers['Content-Type'] !== 'multipart/form-data') {
        config.headers['Content-Type'] = 'application/json'
      }
    }
    if (config.data) {
      config.data = JSON.stringify(config.data)
    }
    return config
  })

  $axios.onResponse((response) => {
    return response
  })

  $axios.onError((error) => {
    // 非401未认证，抛出错误
    if (error.response.status !== 401) {
      return Promise.reject(error)
    }

    // 401 发送刷新令牌请求
    sendRefreshRequest(store, route, redirect)
    return Promise.reject('令牌过期，重新登录')
  })
}

// 锁， 防止并发重复请求, false还未请求，true 正在请求刷新
let isLock = false

const sendRefreshRequest = (store, route, redirect) => {
  if (!isLock && store.state.refreshToken) {
    isLock = true
    redirect(`http:${process.env.authURL}/refresh?redirectURL=${redirectURL(route)}`)
  } else {
    isLock = false
    // 没有刷新令牌，跳转到登录页
    store.commit('RESET_USER_STATE')
    // 服务端帮我们跳转到登录页
    redirect(`http:${process.env.authURL}?redirectURL=${redirectURL(route)}`)
  }
}

// 获取重定向地址
const redirectURL = (route) => {
  // 客户端
  if (process.client) {
    return window.location.href
  }
  // 服务端 process.env._AXIOS_BASE_URL_
  return process.env._AXIOS_BASE_URL_.replace('api', '') + route.path
}
