<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top: 30px">
      <el-form :rules="rules" ref="formData" :model="formData" label-width="100px" style="width: 400px" status-icon>
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input type="password" placeholder="请输入原密码" v-model="formData.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" placeholder="请输入新密码" v-model="formData.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="repPassword">
          <el-input type="password" placeholder="请输入确认密码" v-model="formData.repPwd"></el-input>
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
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {
          userId: '',
          oldPwd: '',
          newPwd: '',
          repPwd: ''
        }
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submitForm')
        } else {
          return false
        }
      })
    }
  },
  data() {
    // 校验新密码
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('新密码不能少于6位'))
      } else {
        callback()
      }
    }
    // 校验确认密码是否一致
    const validateRepPassword = (rule, value, callback) => {
      if (value !== this.formData.newPwd) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oldPwd: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        rePwd: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateRepPassword, trigger: ['change', 'blur'] }
        ]
      }
    }
  }
}
</script>
