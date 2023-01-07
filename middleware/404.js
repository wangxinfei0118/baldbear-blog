export default ({ store, route, redirect }) => {
  if (!route.matched.length) {
    redirect('/404')
  }
}
