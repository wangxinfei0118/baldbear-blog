export default ({ $axios }, inject) => {
  // 笔记列表分页接口
  inject('getNoteList', (data) => $axios.$post('/note/note/list', data))

  // 查询笔记详情
  inject('getNoteById', (id) => $axios.$get(`/note/note/${id}`))

  // 新增笔记
  inject('addNote', (data) => $axios.$post(`/note/note`, data))

  // 编辑笔记
  inject('editNote', (data, id) => $axios.$put(`/note/note/${id}`, data))

  // 删除笔记
  inject('deleteNote', (id) => $axios.$delete(`/note/note/${id}`))

  // 更新笔记浏览数
  inject('updateNoteViewCount', (id) => $axios.$put(`/note/viewCount/${id}`))

  // 通过笔记ID查询所有评论数据接口
  inject('getCommentListByNoteId', (noteId) => $axios.$get(`/note/comment/${noteId}`))

  // 新增笔记评论
  inject('addComment', (data) => $axios.$post(`/note/comment`, data))

  // 删除评论
  inject('deleteCommentById', (id) => $axios.$delete(`/note/comment/${id}`))

  //获取分类标签
  inject('getCategoryAndLabel', () => $axios.$get(`/note/label`))
}
