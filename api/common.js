export default ({ $axios }, inject) => {
  // 上传图片
  inject('uploadImg', (data) =>
    $axios({
      url: `/file/image/upload`,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  )
  // 删除图片
  inject('deleteImg', (fileUrl) => $axios.$delete(`/file/image/delete`, { params: { fileUrl } }))
}
