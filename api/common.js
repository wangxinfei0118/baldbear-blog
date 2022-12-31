export default ({ $axios }, inject) => {
  // 上传图片
  inject('uploadImg', data => $axios.$post( `/common/img/upload`, data ) )
  // 删除图片
  inject('deleteImg', fileUrl => $axios.$delete( `/common/img/delete`, { params: {fileUrl} } ) )
}
