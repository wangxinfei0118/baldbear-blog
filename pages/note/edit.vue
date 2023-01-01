<template>
  <div class="pt-20 mb-4">
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" label-position="right" style="margin-right: 100px">
      <el-form-item label="标题:" prop="title" >
        <el-input v-model="formData.title" placeholder="请输入标题"
                  maxlength="50" show-word-limit/>
      </el-form-item>
      <el-form-item label="标签">
        <el-cascader
          :disabled="labelDisabled"
          style="display: block"
          :show-all-levels="false"
          :options="labelOptions"
          :props="{ multiple: true, emitPath: false, children: 'labelList', value: 'id', label: 'name' }"
          filterable
          clearable
          v-model="formData.labelIds"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="主图:" prop="imageUrl" >
        <el-upload class="avatar-uploader"
                   accept="image/*"
                   action=""
                   :show-file-list="false"
                   :http-request="uploadMainImg">
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="是否公开:" prop="ispublic">
        <el-radio-group v-model="formData.ispublic">
          <el-radio :label="0" >不公开 </el-radio>
          <el-radio :label="1" >公开 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介:" prop="summary">
        <el-input v-model="formData.summary" type="textarea"
                  placeholder="请输入简介" :autosize="{ minRows: 3 }" maxlength="2000" show-word-limit/>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <!-- 主体内容 -->
        <mavon-editor ref="md" v-model="formData.mdContent" @change="getMdHtml"  @imgAdd="uploadContentImg" @imgDel="delContentImg"></mavon-editor>
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
    const validateLabel = (rule, value, callback) => {
      if(value && value.length>5){
        this.labelDisabled = true // 禁止点击
        callback(new Error('最多可选5个标签'))
      }else{
        this.labelDisabled = false
        callback()
      }
    }

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
        labelIds: [
          { required: true, message: '请选择标签', trigger: 'blur' },
          { validator: validateLabel, trigger: 'change' },
        ],
        ispublic: [{ required: true, message: '请选择是否公开', trigger: 'change' }],
        summary: [{ required: true, message: '请输入简介', trigger: 'blur' }],
        content: [{ validator: validateContent, trigger: 'change' }]
      },

      formData:{
        imageUrl: null,
        userId: this.$store.state.userInfo.uid,
        userImage: this.$store.state.userInfo.imageUrl,
        nickName: this.$store.state.userInfo.nickName
      },
      labelDisabled:false,
      labelOptions:[
        {
          id: 1,
          name: 'web',
          labelList:[
            {
              id: 1,
              name: 'html'
            },
            {
              id: 2,
              name: 'js'
            }
          ]
        },
        {
          id: 2,
          name: 'java',
          labelList:[
            {
              id: 4,
              name: 'servlet'
            },
            {
              id: 5,
              name: 'js'
            }
          ]
        }
      ]
    }
  },

  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          // 校验通过，提交数据
          this.submitData()
        } else {
          // 验证不通过
          return false
        }
      })
    },

    async submitData(){
      let res = null
      // 由文章id则是新增，没有则新增
      if (this.formData.id){
        // 编辑
        res = await this.$editNote(this.formData)
      }else {
        // 新增
        res = await this.$addNote(this.formData)
      }
      if (res.code === 20000) {
        this.$message.success('提交成功')
        // 跳转到详情页
        this.$router.push(`/article/${res.data}`)
      }
      else{
        this.$message.error('提交失败')
      }
    },

    uploadMainImg(file){
      const data = new FormData()
      data.append('file',file.file)
      this.$uploadImg(data).then(res =>{
        if (res.code ===20000){
          this.deleteImg()
          this.formData.imageUrl = res.data
        }
      }).catch(()=>{
        this.$message.error('上图片传失败')
      })
    },

    // 删除主图, 上传成功和关闭窗口调用删除上一次上传的图片
    deleteImg() {
      if (this.formData.imageUrl){
        this.$deleteImg(this.formData.imageUrl)
      }
    },

    // mdContent: md 内容，htmlContent：转成后的html
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
    // 查询所有标签
    const {data} = await app.$getCategoryAndLabel()

    // 若已存在则查询详情
    if (query.id){
      const {data: formData} = await app.$getNoteById(query.id)
      return {labelOptions: data, formData}
    }
    return {labelOptions: data}
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
