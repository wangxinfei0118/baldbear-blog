<template>
  <div>
    <div class="message-head">
      <div class="background w-full flex flex-col items-center">
        <div class="bg-img"></div>
        <div class="head-card">
          <div class="title">向海风许愿，在山海相见</div>
          <div class="summary">这里风遇山止，船到岸停。 这里的一切都有始有终，却能容纳所有不期而遇和久别重逢。</div>
        </div>
      </div>
    </div>
    <el-row type="flex" class="mx-auto mt-4" justify="space-between" style="width: 79%">
      <el-col :xs="24" :sm="24" :md="17">
        <div class="commentArea">
          <el-card shadow="never">
            <!-- 未登录 -->
            <div v-if="!$store.state.userInfo" class="flex flex-col items-center">
              <div class="text-medium">Hi，登录后就可以来留言啦~</div>
              <div class="mt-2">
                <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small">去登录</el-button>
              </div>
            </div>
            <comment
              :userId="userId"
              :userImage="userImage"
              :showComment="$store.state.userInfo ? true : false"
              @doSend="doSend"
              @doChildSend="doChildSend"
              @doRemove="doRemove"
              :commentList="commentList"
              :isMessage="true"></comment>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧卡片 -->
      <el-col class="hidden-sm-and-down" :md="6">
        <el-row>
          <el-col>
            <el-card shadow="never">
              <div class="text-medium text-note-title mb-2">小Tips：</div>
              <div class="text-medium">
                <div class="mb-2">有什么想和博主说的，或者想要交流的都可以留言</div>
                <div class="mb-2">欢迎大家畅所欲言</div>
                <div>记得文明交流哦~</div>
                <div class="mt-2 text-notice">联系邮箱：wangxinfei0118@163.com</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Comment from '@/components/common/Comment'
export default {
  components: { Comment },
  data() {
    return {
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
      userImage: this.$store.state.userInfo && this.$store.state.userInfo.imageUrl,
      nickName: this.$store.state.userInfo && this.$store.state.userInfo.nickName
    }
  },
  methods: {
    doSend(content) {
      this.doChildSend(content)
    },
    doChildSend(content, parentId = -1) {
      const data = {
        content,
        parentId,
        userId: this.userId,
        userImage: this.userImage,
        nickName: this.nickName
      }
      this.$addComment(data).then((res) => {
        if (res.code === 20000) {
          this.refreshComment()
        }
      })
    },
    doRemove(id) {
      this.$deleteCommentById(id).then((res) => {
        this.refreshComment()
      })
    },
    async refreshComment() {
      const { data } = await this.$getMessage()
      this.commentList = data
    }
  },
  async asyncData({ app }) {
    const { data: commentList } = await app.$getMessage()
    return { commentList }
  }
}
</script>

<style scoped>
.bg-img {
  width: 100%;
  height: 350px;
  background-image: url('assets/img/message-header.jpg');
  background-size: cover;
}
.head-card {
  width: 60%;
  height: 180px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  color: #fff;
  background-color: hsla(0, 0%, 100%, 0.5);
  border: 1px solid #f0f0f0;
  margin-top: -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 32px;
  margin-bottom: 16px;
}
</style>
