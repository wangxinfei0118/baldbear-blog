<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:30px">
      <el-form
        :rules="rules"
        ref="formData"
        :model="formData"
        label-width="100px"
        style="width: 400px;"
        status-icon>
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input type="password" placeholder="请输入原密码" v-model="formData.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" placeholder="请输入新密码" v-model="formData.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="repPassword">
          <el-input type="password" placeholder="请输入确认密码" v-model="formData.repPassword"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button size="mini" type="primary" :loading="loading" @click="submitForm('formData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  // 接收父组件传递的属性
  props: {
    loading: { // 是否点击确定按钮
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {
          userId: '',
          oldPassword: '',
          newPassword: '',
          repPassword: ''
        }
      }
    }
  },

  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过，提交数据
          this.$emit('submitForm')
        } else {
          // 验证不通过
          return false;
        }
      })
    }
  },


  data() {
    // 在 return 上面进行申明自定校验
    const validateOldPassword = (rule, value, callback) => {
      if (!value || value.length < 6) {
        callback(new Error('请输入正确的原密码'))
      }
      // 发送请求校验原密码
      const data = {userId: this.$store.state.userInfo.uid, oldPassword: value}
      this.$checkOldPassword(data).then(response => {
        // 校验通过
        if (response.code === 20000) {
          callback()
        } else {
          callback(new Error(response.message))
        }
      }).catch(error => {
        // 校验失败
        callback(new Error('原密码校验异常，请稍后重试'))
      })
    };

    // 校验新密码
    const validatePassword = (rule, value, callback) => {
      console.log('value', value)
      if (value.length < 6) {
        callback(new Error('新密码不能少于6位'))
      } else {
        callback()
      }
    };

    // 校验确认密码是否一致
    const validateRepPassword = (rule, value, callback) => {
      if (value !== this.formData.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    };

    return {
      // 校验
      rules: {
        oldPassword: [
          {required: true, message: '原密码不能为空', trigger: 'blur'},
          {validator: validateOldPassword, trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          {validator: validatePassword, trigger: 'blur'}
        ],
        repPassword: [
          {required: true, message: '确认密码不能为空', trigger: 'blur'},
          {validator: validateRepPassword, trigger: ['change', 'blur']}
        ]
      }
    }
  },

}
</script>

