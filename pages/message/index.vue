<template>
  <div>
    <div class="head">
      <div class="background" style="width: 100%;display: flex;flex-direction: column;align-items: center">
        <div class="bg-img"></div>
        <div class="head-card" style="width: 60%;height: 180px;box-sizing: border-box;padding: 24px 24px 0;color: #fff;background-color: hsla(0,0%,100%,.5);border: 1px solid #f0f0f0;margin-top: -180px;display: flex;flex-direction: column;align-items: center">
          <div class="title" style="font-size: 32px;margin-bottom: 16px">
            {{$route.query.name}}
          </div>
          <div class="summary">
          </div>
        </div>
      </div>
    </div>
    <el-card v-if="!$store.state.userInfo">
      <h4 >登录后参与交流、获取后续更新提醒</h4>
      <div>
        <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small" >登录</el-button>
        <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small" plain>注册</el-button>
      </div>
    </el-card>
    <el-card>
      <comment :userId="userId" :userImage="userImage"
               :showComment="$store.state.userInfo ? true : false"
               @doSend="doSend" @doChildSend="doChildSend" @doRemove="doRemove"
               :commentList="commentList"
      >
      </comment>
    </el-card>
  </div>
</template>

<script>
import Comment from "@/components/common/Comment";
export default {
  components: {Comment},
  data(){
    return {
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
      userImage: this.$store.state.userInfo && this.$store.state.userInfo.imageUrl,
      nickName: this.$store.state.userInfo && this.$store.state.userInfo.nickName,

    }
  },
  methods: {
    doSend(content) {
      // 提交评论：评论内容，文章ID，登录用户信息（用户id，用户头像，用户昵称，用户头像）
      this.doChildSend(content)
    },

    // 发布回复评论触发
    doChildSend(content, parentId = -1) {
      // 回复评论：父评论ID，评论内容，文章ID，登录用户信息（用户id，用户头像，用户昵称，用户头像）
      console.log(`对父评论ID=${parentId} 发布的回复评论内容：${content}`)
      const data = {
        content,
        parentId,
        userId: this.userId,
        userImage: this.userImage,
        nickName: this.nickName,
      }
      this.$addComment(data).then(res =>{
        if (res.code === 20000){
          this.refreshComment()
        }
      })
    },

    // 删除评论
    doRemove(id) {
      console.log(`删除评论id${id}`)
      this.$deleteCommentById(id).then(res =>{
        this.refreshComment()
      })
    },

    async refreshComment(){
      const {data} = await this.$getMessage()
      this.commentList = data
    },

  },
  async asyncData({ app }) {

    const {data: commentList} = await app.$getMessage()

    return {commentList}
  }
}
</script>

<style scoped>
.bg-img{
  width: 100%;
  height: 350px;
  background-image: url("assets/img/detail-head.jpeg");
  background-size: cover;
}
</style>
