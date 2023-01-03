export default({$axios}, inject) => {

  // 获取生活列表
  inject('getLifeList', () => $axios.$get('/life/list'))

  // 查询生活详情
  inject('getLifeById', id => $axios.$get( `/life/life/${id}`))

  // 新增生活
  inject('addLife', data => $axios.$post( `/life/life`, data))

  // 编辑生活
  inject('editLife', data => $axios.$put( `/life/life`, data))

  // 删除生活
  inject('deleteLife', id => $axios.$delete( `/life/life/${id}`))
}
