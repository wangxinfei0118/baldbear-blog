<template>
  <div class="pt-32 px-20">
    <!-- 个人信息 -->
    <el-row class="w-9/12 mx-auto" type="flex" justify="space-between">
      <el-col :span="5">
        <el-menu
          default-active="1"
          class=""
          @select="changeItem">
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
      <el-col :span="19" class="ml-4">
        <el-card shadow="never" v-if="activeItem === '1'">
          <div>个人资料</div>
          <div class="flex">
            <user-edit :loading="loading" :formData="userInfo" @submitForm="submitUserForm"/>
            <div class="avatar ml-24">
              <el-tooltip content="点击上传头像" effect="light">
                <el-upload
                  accept="image/*"
                  action=""
                  :show-file-list="false"
                  :http-request="uploadMainImg"
                >
                  <el-avatar :size="60" :src="this.userInfo.imageUrl">{{ userInfo.nickName }}</el-avatar>
                </el-upload>
              </el-tooltip>
              <div class="text-small-x">
                我的头像
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never" v-if="activeItem === '2'">
          <div>修改密码</div>
          <div>
            <user-password :loading="loading" :formData="passwordData" @submitForm="submitPasswordForm"/>
          </div>
        </el-card>
      </el-col>

<!--            <user-password :loading="loading" :formData="passwordData" @submitForm="submitPasswordForm"/>-->

<!--            <el-tabs value="user" tab-position="left" type="card">-->
<!--              <el-tab-pane label="修改个人资料" name="user">-->
<!--                <user-edit :loading="loading" :formData="userInfo" @submitForm="submitUserForm"/>-->
<!--              </el-tab-pane>-->
<!--              <el-tab-pane label="修改密码" name="password">-->
<!--                <user-password :loading="loading" :formData="passwordData" @submitForm="submitPasswordForm"/>-->
<!--              </el-tab-pane>-->
<!--            </el-tabs>-->
    </el-row>
  </div>
</template>
<script>
import UserEdit from '@/components/user/Edit'
import UserPassword from '@/components/user/Password'

export default {
  components: {UserEdit, UserPassword},
  middleware: 'auth',

  data() {
    return {
      loading: false,
      userInfo: {
        imageUrl: ''
      },
      passwordData: {
        userId: this.$store.state.userInfo.uid
      },
      activeItem:'1'
    }
  },

  methods: {
    uploadMainImg(file) {
      const data = new FormData()
      data.append('file', file.file)
      this.$uploadImg(data).then(res => {
        if (res.code === 20000) {
          this.deleteImg()
          this.userInfo.imageUrl = res.data
          this.$updateUserInfo(this.userInfo)
        }
      }).catch(() => {
        this.$message.error('上图片传失败')
      })
    },

    // 删除主图, 上传成功和关闭窗口调用删除上一次上传的图片
    deleteImg() {
      if (this.userInfo.imageUrl) {
        this.$deleteImg(this.userInfo.imageUrl)
      }
    },

    // 提交修改个人资料
    async submitUserForm() {
      this.loading = true
      const {code, message} = await this.$updateUserInfo(this.userInfo)
      if (code === 20000) {
        this.$message.success('修改成功')
      } else {
        this.$message.error(message)
      }
      this.loading = false
    },

    // 修改密码
    async submitPasswordForm() {
      this.loading = true
      this.passwordData.userId = this.$store.state.userInfo && this.$store.state.userInfo.uid
      const {code, message} = await this.$updatePassword(this.passwordData)
      if (code === 20000) {
        this.$message.success('修改成功')
        this.passwordData = {}
        this.$store.dispatch('toLoginPage')
      } else {
        this.$message.error(message)
      }
      this.loading = false
    },
    changeItem(item){
      console.log(item,'item')
      this.activeItem = item
    }
  },

  async asyncData({app, store}) {
    // 1. 查询用户信息
    const userId = store.state.userInfo && store.state.userInfo.uid
    const {data: userInfo} = await app.$getUserInfo(userId)

    return {userInfo}
  },

}
</script>
<style scoped>
.main-top {
  padding: 30px 0;
}

.info .name {
  font-size: 18px;
  font-weight: 500;
  padding-top: 10px;
}

.info .meta-block {
  font-size: 14px;
  color: #969696;
}
</style>
