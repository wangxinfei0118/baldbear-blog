export default({$axios}, inject) => {

// 文章列表分页接口
  inject('getNoteList', query => $axios.$post('/note/list',query))

}
