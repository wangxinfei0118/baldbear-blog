export default ({ store, route, redirect, req }) => {
  if (!store || !store.state.userInfo || !store.state.accessToken) {
    // 通过 req.headers.host 在生产环境获取域名
    const redirectURL = 'http://' + req.headers.host + route.path
    redirect(`http:${process.env.authURL}?redirectURL=${redirectURL}`)
  }
}
