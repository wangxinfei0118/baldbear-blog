<template>
  <div class="user-wrapper">
    <el-row class="user-body" type="flex" justify="center">
      <el-col :xs="24" :sm="5" :md="5" :lg="5">
        <el-menu default-active="1" @select="changeItem">
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-lock"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="24" :sm="19" :md="12" :lg="12">
        <!-- 个人资料 -->
        <el-card shadow="never" v-if="activeItem === '1'">
          <div>个人资料</div>
          <div class="flex flex-col items-center">
            <div class="avatar">
              <el-tooltip content="点击上传头像" effect="light">
                <el-upload accept="image/*" action="" :show-file-list="false" :http-request="uploadMainImg">
                  <el-avatar :size="60" :src="userInfo.userPic">{{ userInfo.nickname }}</el-avatar>
                </el-upload>
              </el-tooltip>
              <div class="text-small-x">我的头像</div>
            </div>
            <user-edit :loading="loading" :formData="userInfo" @submitForm="submitUserForm" />
          </div>
        </el-card>
        <!-- 修改密码 -->
        <el-card shadow="never" v-if="activeItem === '2'">
          <div>修改密码</div>
          <div class="flex justify-center">
            <user-password :loading="loading" :formData="passwordData" @submitForm="submitPasswordForm" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import UserEdit from '@/components/user/Edit'
import UserPassword from '@/components/user/Password'

export default {
  components: { UserEdit, UserPassword },
  middleware: 'auth',
  data() {
    return {
      loading: false,
      userInfo: null,
      passwordData: {},
      activeItem: '1'
    }
  },
  methods: {
    uploadMainImg(file) {
      const data = new FormData()
      data.append('image', file.file)
      this.$uploadImg(data)
        .then((res) => {
          if (res.data?.code === 20000) {
            this.deleteImg()
            this.userInfo.userPic = res.data?.data
            this.$updateUserInfo(this.userInfo, this.userInfo.uid).then((res) => {
              if (res.code === 20000) {
                this.$store.commit('updateUserInfo', Object.assign({}, this.userInfo))
                this.$message.success('更新头像成功！')
              }
            })
          } else {
            this.$message.error('上图片传失败')
          }
        })
        .catch(() => {
          this.$message.error('上图片传失败')
        })
    },
    // 删除主图, 上传成功和关闭窗口调用删除上一次上传的图片
    deleteImg() {
      if (this.userInfo.userPic) {
        this.$deleteImg(this.userInfo.userPic)
      }
    },
    // 提交修改个人资料
    async submitUserForm() {
      this.loading = true
      const { code, message } = await this.$updateUserInfo(this.userInfo, this.userInfo.uid)
      if (code === 20000) {
        this.$message.success('修改成功')
        this.$store.commit('updateUserInfo', Object.assign({}, this.userInfo))
      } else {
        this.$message.error('修改失败！')
      }
      this.loading = false
    },
    // 修改密码
    async submitPasswordForm() {
      this.loading = true
      this.passwordData.userId = this.$store.state.userInfo && this.$store.state.userInfo.uid
      const { code, message } = await this.$updatePassword(this.passwordData)
      if (code === 20000) {
        this.$message.success('修改成功')
        this.passwordData = {}
        this.$store.dispatch('toLoginPage')
      } else {
        this.$message.error(message)
      }
      this.loading = false
    },
    changeItem(item) {
      this.activeItem = item
    }
  },
  async asyncData({ app, store }) {
    const userId = store.state.userInfo && store.state.userInfo.uid
    const { code, data: userInfo } = await app.$getUserInfo(userId)
    if (code === 20000) {
      store.commit('updateUserInfo', Object.assign({}, userInfo))
      return { userInfo }
    }
  }
}
</script>
<style scoped>
.user-wrapper {
  @apply pt-32 px-20;
}
.user-body {
  @apply w-9/12 mx-auto;
}
@media only screen and (max-width: 1200px) {
  .user-wrapper {
    @apply pt-32 px-0;
  }
  .user-body {
    @apply w-full mx-auto;
  }
}
@media only screen and (max-width: 768px) {
  .user-body {
    @apply w-full mx-auto flex-col;
  }
}
</style>
