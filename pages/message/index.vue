<template>
  <div>
    <page-header bgName="message-header" :title="headerTitle" :summary="headerSummary"></page-header>
    <el-row type="flex" class="message-body mx-auto mt-4" justify="space-between">
      <el-col :xs="24" :sm="24" :md="17">
        <div class="commentArea">
          <el-card class="comment-card" shadow="never">
            <!-- 未登录 -->
            <div v-if="!$store.state.userInfo" class="flex flex-col items-center">
              <div class="text-medium">Hi，登录后就可以来留言啦~</div>
              <div class="mt-2">
                <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small">去登录</el-button>
              </div>
            </div>
            <comment
              :userId="userId"
              :userPic="userPic"
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
import PageHeader from '@/components/common/PageHeader'
import Comment from '@/components/common/Comment'
export default {
  components: { Comment, PageHeader },
  data() {
    return {
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
      userPic: this.$store.state.userInfo && this.$store.state.userInfo.userPic,
      nickname: this.$store.state.userInfo && this.$store.state.userInfo.nickname,
      headerTitle: '向海风许愿，在山海相见',
      headerSummary:
        '或许每个人心中都有一条塞纳河，她把我们的一颗心分作两边，左岸柔软，右岸冷硬；左岸感性，右岸理性。左岸住着我们的欲望，期盼，挣扎和所有的爱恨嗔怒，右岸住着这个世界的规则在我们心里打下的烙印――左岸是梦境，右岸是生活。'
    }
  },
  methods: {
    doSend(content) {
      this.doChildSend(content)
    },
    doChildSend(content, pid = -1, belowReplyId = -1, belowReplyName = '') {
      const data = {
        content,
        pid,
        belowReplyId,
        belowReplyName,
        userId: this.userId,
        userPic: this.userPic,
        nickname: this.nickname
      }
      this.$addMessage(data).then((res) => {
        if (res.code === 20000) {
          this.$message.success('评论成功！')
          this.refreshComment()
        } else {
          this.$message.error('评论失败！')
        }
      })
    },
    doRemove(id) {
      this.$deleteMessage(id).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功！')
          this.refreshComment()
        } else {
          this.$message.error('删除失败！')
        }
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
.message-body {
  width: 79%;
}
@media only screen and (max-width: 992px) {
  .message-body {
    width: 100%;
  }
  ::v-deep.comment-card .el-card__body {
    padding: 20px 0;
  }
  ::v-deep.comment-card > .el-card__body {
    margin: 0 -10px;
  }
}
</style>
