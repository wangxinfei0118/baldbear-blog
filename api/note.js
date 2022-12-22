export default({$axios}, inject) => {

  // 文章列表分页接口
  inject('getNoteList', data => $axios.$post('/note/list', data))

  // 查询文章详情
  inject('getNoteById', id => $axios.$get( `/note/note/${id}` ))

  // 更新文章浏览数
  inject('updateNoteViewCount', id => $axios.$put(`/note/viewCount/${id}`))

  // 通过文章ID查询所有评论数据接口
  inject('getCommentListByNoteId', noteId => $axios.$get( `/note/comment/list/${noteId}` ))

  // 新增文章评论
  inject('addComment', data => $axios.$post( `/note/comment`, data ))

  // 删除评论
  inject('deleteCommentById', id => $axios.$delete( `/note/comment/${id}` ))

  //获取分类标签
  inject('getCategoryAndLabel', () => $axios.$get( `/note/label/list` ))

  // 新增文章
  inject('addNote', data => $axios.$post( `/note/note`, data ))

  // 编辑文章
  inject('editNote', data => $axios.$put( `/note/note`, data ))

}
