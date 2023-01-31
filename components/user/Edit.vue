<template>
  <div>
    <el-row type="flex" style="padding-top: 30px">
      <el-form :rules="rules" ref="formData" :model="formData" label-width="100px" style="width: 400px" status-icon>
        <el-form-item label="昵称：" prop="nickname">
          <el-input v-model="formData.nickname" maxlength="30" placeholder="真实姓名或昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="formData.phone" maxlength="11" placeholder="11 位手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="formData.email" maxlength="40" placeholder="用于收取通知邮件"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button size="mini" type="primary" :loading="loading" @click="submitForm('formData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { isvalidUsername, isvalidMobile, isvalidEmail } from '@/utils/validate'

export default {
  props: {
    loading: {
      // 是否点击确定按钮
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {
          username: '',
          nickname: '',
          phone: '',
          email: ''
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
    const checkNickName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空'))
      } else if (value.length > 30) {
        callback(new Error('最多30个字符'))
      } else {
        callback()
      }
    }
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else if (!isvalidMobile(value)) {
        callback(new Error('手机号不合法'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('邮箱不能为空'))
      } else if (!isvalidEmail(value)) {
        callback(new Error('邮箱不合法'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        nickname: [{ required: true, validator: checkNickName, trigger: 'blur' }],
        phone: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }]
      }
    }
  }
}
</script>
