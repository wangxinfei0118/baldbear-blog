<template>
  <div class="pt-20">
    <el-form
      ref="formData"
      :rules="rules"
      :model="formData"
      label-width="100px"
      label-position="right"
      style="margin-right: 100px"
    >
      <el-form-item label="标题:" prop="title" >
        <el-input v-model="formData.title"
                  placeholder="请输入标题"
                  maxlength="50" s
                  how-word-limit
        />
      </el-form-item>
      <el-form-item label="是否公开:" prop="ispublic">
        <el-radio-group v-model="formData.ispublic">
          <el-radio :label="0" >不公开 </el-radio>
          <el-radio :label="1" >公开 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <!-- markdown编辑器 -->
        <mavon-editor
          ref="md"
          v-model="formData.mdContent"
          @change="getMdHtml"
          @imgAdd="uploadContentImg"
          @imgDel="delContentImg"
        ></mavon-editor>
      </el-form-item>
    </el-form>
    <div class="flex justify-center">
      <el-button type="primary" @click="submitForm('formData')">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  validate({ query }) {
    if (query.id) {
      // 必须是number类型
      return /^\d+$/.test(query.id)
    }
    return true
  },

  data() {
    const validateContent = (rule, value, callback) => {
      if( this.formData.mdContent && this.formData.htmlContent ){// 有内容则放行
        callback()
      }else{
        callback(new Error('请求输入文章内容'))
      }
    }

    return {
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        ispublic: [{ required: true, message: '请选择是否公开', trigger: 'change' }],
        content: [{ validator: validateContent, trigger: 'change' }]
      }
    }
  },

  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitData()
        } else {
          return false
        }
      })
    },

    async submitData(){
      let res = null
      if (this.$route.query.id){
        res = await this.$editLife(this.formData)
      }else {
        res = await this.$addLife(this.formData)
      }
      if (res.code === 20000) {
        this.$message.success('提交成功')
        this.$router.push(`/life`)
      }
      else{
        this.$message.error('提交失败')
      }
    },

    // 删除主图, 上传成功和关闭窗口调用删除上一次上传的图片
    deleteImg() {
      if (this.formData.imageUrl){
        this.$deleteImg(this.formData.imageUrl)
      }
    },

    getMdHtml(mdContent, htmlContent){
      this.formData.mdContent = mdContent
      this.formData.htmlContent = htmlContent
    },

    uploadContentImg(pos, file){
      const  fd = new FormData()
      fd.append('file',file)
      this.$uploadImg(fd).then(res =>{
        if (res.code ===20000){
          //上传成功，回显图片
          this.$refs.md.$img2Url(pos, res.data)
        }
      })
    },

    delContentImg(urlAndFileArr){
      const fileUrl = urlAndFileArr[0] // 文件URL
      const file = urlAndFileArr[1] // File对象
      this.$deleteImg(fileUrl)
    }
  },

  async asyncData({app, query}){
    let formData = null
    // 若已存在则查询详情
    if (query.id){
      const {data} = await app.$getLifeById(query.id)
      formData = data
    }
    else {
      formData = {}
    }
    return {formData}
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
