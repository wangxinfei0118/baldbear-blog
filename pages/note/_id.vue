<template>
  <div>
    <div class="note-head">
      <div class="background w-full flex flex-col items-center">
        <div class="bg-img"></div>
        <div class="head-card min-head-card mini-head-card">
          <div class="title">
            {{ data.title }}
          </div>
          <div class="summary h-12">
            {{ data.summary }}
          </div>
          <div class="mt-2">
            <el-tag size="mini">
              <i class="el-icon-time"></i>
              {{ data.createDate.split(' ')[0] }}
            </el-tag>
            <el-tag size="mini" type="success">
              <i class="el-icon-chat-line-round"></i>
              {{ data.chatCount }}
            </el-tag>
            <el-tag size="mini" type="warning">
              <i class="el-icon-view"></i>
              {{ data.viewCount }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed left-24 mt-5" v-if="userId == 1">
      <div>
        <el-button icon="el-icon-edit" circle @click="editNote"></el-button>
      </div>
      <div class="mt-2">
        <el-button icon="el-icon-delete" circle @click="deleteNote"></el-button>
      </div>
    </div>
    <el-row type="flex" class="note-wrapper mx-auto" justify="space-between">
      <el-col :xs="24" :sm="24" :md="17">
        <div class="article-left mt-4">
          <el-card shadow="never" class="content-box">
            <!-- 笔记内容 -->
            <div class="article-content">
              <div class="markdown-body" v-html="data.htmlContent"></div>
            </div>
          </el-card>
          <!-- 评论区 -->
          <div class="commentArea mt-4">
            <el-card class="comment-wrapper" shadow="never">
              <div class="font-semibold p-4">评论区</div>
              <!-- 未登录 -->
              <div v-if="!$store.state.userInfo" class="flex flex-col items-center">
                <div class="text-medium">登录后参与交流、获取后续更新提醒</div>
                <div class="mt-2">
                  <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small">登录</el-button>
                  <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small" plain>注册</el-button>
                </div>
              </div>
              <comment
                :userId="userId"
                :userPic="userPic"
                :showComment="$store.state.userInfo ? true : false"
                @doSend="doSend"
                @doChildSend="doChildSend"
                @doRemove="doRemove"
                :commentList="commentList"></comment>
              <div class="empty">
                <el-empty v-if="commentList.length === 0" description="暂无回复，快来抢沙发吧~"></el-empty>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
      <!-- 目录固钉 -->
      <el-col class="hidden-sm-and-down" :md="6">
        <el-row>
          <el-col>
            <affix :offset="120">
              <directory></directory>
            </affix>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'assets/css/md/github-min.css'
import 'assets/css/md/github-markdown.css'
import Comment from '@/components/common/Comment'
import Affix from '@/components/common/Affix'
import Directory from '@/components/common/Directory'

export default {
  components: {
    Comment,
    Affix,
    Directory
  },
  // 校验路由参数合法性
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    return {
      title: this.data.title
    }
  },
  data() {
    return {
      // 当前登录用户id
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
      // 当前登录用户头像，
      userPic: this.$store.state.userInfo && this.$store.state.userInfo.userPic
    }
  },
  methods: {
    doSend(content) {
      // 提交评论：评论内容，文章ID，登录用户信息（用户id，用户头像，用户昵称，用户头像）
      this.doChildSend(content)
    },
    // 发布回复评论触发
    doChildSend(content, pid = -1, belowReplyId = -1, belowReplyName = '') {
      // 回复评论：父评论ID，评论内容，文章ID，登录用户信息（用户id，用户头像，用户昵称，用户头像）
      const data = {
        content,
        pid,
        belowReplyId,
        belowReplyName,
        noteId: this.$route.params.id,
        userId: this.userId,
        userPic: this.userPic,
        nickname: this.$store.state.userInfo && this.$store.state.userInfo.nickname
      }
      this.$addComment(data).then((res) => {
        if (res.code === 20000) {
          this.$message.success('评论成功！')
          this.refreshComment()
        } else {
          this.$message.error('评论失败！')
        }
      })
    },
    // 删除评论
    doRemove(id) {
      this.$deleteCommentById(id).then((res) => {
        if (res.code === 20000) {
          this.$message.success('删除成功！')
          this.refreshComment()
        } else {
          this.$message.error('删除失败！')
        }
      })
    },
    async refreshComment() {
      const { data } = await this.$getCommentListByNoteId(this.$route.params.id)
      this.commentList = data
    },
    editNote() {
      this.$router.push(`/note/edit?id=${this.$route.params.id}`)
    },
    deleteNote() {
      this.$confirm('是否删除该笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$deleteNote(this.$route.params).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  async asyncData({ params, app }) {
    // 获取笔记详情
    const { data } = await app.$getNoteById(params.id)
    // 将文章id保存到cookie中并更新浏览数，判断cookie中是否由对应id，有则不继续更新
    if (!app.$cookies.get(`article-view-${params.id}`)) {
      const { code } = await app.$updateNoteViewCount(params.id)
      if (code === 20000) {
        data.viewCount++
        app.$cookies.set(`article-view-${params.id}`, true)
      }
    }
    const { data: commentList } = await app.$getCommentListByNoteId(params.id)
    data.htmlContent = app.$handleEscape(data.htmlContent)
    return { data, commentList }
  }
}
</script>

<style scoped>
.bg-img {
  width: 100%;
  height: 350px;
  background-image: url('assets/img/note-header.jpg');
  background-size: cover;
  background-position: center;
}
::v-deep.content-box .el-card__body {
  padding: 10px;
}
.head-card {
  width: 60%;
  height: 180px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  color: #fff;
  background-color: rgba(230, 230, 250, 0.4);
  border: 1px solid rgb(230, 230, 250);
  margin-top: -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  width: 100%;
  font-size: 32px;
  margin-bottom: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.note-wrapper {
  width: 79%;
}
@media only screen and (max-width: 992px) {
  .min-head-card {
    width: 80%;
  }
  .note-wrapper {
    width: 100%;
  }
  ::v-deep.comment-wrapper .el-card__body {
    padding: 20px 0;
  }
  ::v-deep.comment-wrapper > .el-card__body {
    margin: 0 -10px;
  }
}
@media only screen and (max-width: 768px) {
  .mini-head-card {
    width: 100%;
  }
}
</style>
