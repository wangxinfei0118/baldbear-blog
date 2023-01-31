export default ({ $axios }, inject) => {
  // 上传图片
  inject('uploadImg', (data) => $axios.$post(`/file/image/upload`, data))
  // 删除图片
  inject('deleteImg', (fileUrl) => $axios.$delete(`/file/image/delete`, { params: { fileUrl } }))
}
