<template>
  <div>
    <div class="head">
      <div class="background" style="width: 100%;display: flex;flex-direction: column;align-items: center">
        <div class="bg-img"></div>
        <div class="head-card" style="width: 60%;height: 180px;box-sizing: border-box;padding: 24px 24px 0;color: #fff;background-color: hsla(0,0%,100%,.5);border: 1px solid #f0f0f0;margin-top: -180px;display: flex;flex-direction: column;align-items: center">
          <div class="title" style="font-size: 32px;margin-bottom: 16px">
            {{ data.title }}
          </div>
          <div class="summary">
            {{ data.summary }}
          </div>
          <div class="mt-2">
            <el-tag size="mini"><i class="el-icon-time"></i> {{ data.createDate }}</el-tag>
            <el-tag size="mini" type="success"><i class="el-icon-chat-line-round"></i> {{ data.chatCount }}</el-tag>
            <el-tag size="mini" type="warning"><i class="el-icon-view"></i> {{ data.viewCount }}</el-tag>
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
    <el-row type="flex" class="mx-auto" justify="space-between" style="width: 79%">
      <el-col :xs="24" :sm="24" :md="17">
        <div class="article-left mt-4">
          <el-card shadow="never">
            <!-- 内容 -->
            <div class="article-content">
              <div class="markdown-body" v-html="data.htmlContent"></div>
            </div>
          </el-card>

          <!-- 评论区 -->
          <div class="commentArea mt-4">
            <el-card shadow="never">
              <div class="font-semibold p-4">评论区</div>
              <!-- 未登录 -->
              <div v-if="!$store.state.userInfo" class="flex flex-col items-center">
                <div class="text-medium">登录后参与交流、获取后续更新提醒</div>
                <div class="mt-2">
                  <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small" >登录</el-button>
                  <el-button @click="$store.dispatch('toLoginPage')" type="primary" size="small" plain>注册</el-button>
                </div>
              </div>
              <!-- userId 当前登录用户id，userImage 当前登录用户头像，showComment 显示评论区
              doSend 公共评论事件函数，doChidSend 回复评论事件函数, doRemove 删除 -->
              <comment :userId="userId" :userImage="userImage"
                       :authorId="data.userId"
                       :showComment="$store.state.userInfo ? true : false"
                       @doSend="doSend" @doChildSend="doChildSend" @doRemove="doRemove"
                       :commentList="commentList"
              >
              </comment>
            </el-card>
          </div>

        </div>
      </el-col>

      <!-- 右侧-->
      <el-col class="hidden-sm-and-down" :md="6">
        <el-row>
          <el-col>
            <affix :offset="80">
              <directory></directory>
            </affix>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import "assets/css/md/github-min.css";
import "assets/css/md/github-markdown.css";
import Comment from "@/components/common/Comment";
import Affix from "@/components/common/Affix";
import Directory from "@/components/common/Directory";

export default {
  components:{
    Comment,
    Affix,
    Directory
  },
  // 校验路由参数合法性
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },

  data(){
    return {
      // 当前登录用户id
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
      // 当前登录用户头像，
      userImage: this.$store.state.userInfo && this.$store.state.userInfo.imageUrl
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
        articleId: this.$route.params.id,
        userId: this.userId,
        userImage: this.userImage,
        nickName: this.$store.state.userInfo && this.$store.state.userInfo.nickName,
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
      const {data} = await this.$getCommentListByNoteId(this.$route.params.id)
      this.commentList = data
    },
    editNote(){
      this.$router.push(`/note/edit?id=${this.$route.params.id}`)
    },
    deleteNote(){
      this.$confirm('是否删除该笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$deleteNote(this.$route.params).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },

  async asyncData({ params, app }) {
    // 获取笔记详情
    const {data} = await app.$getNoteById(params.id)
    data.htmlContent = '<h1><a id=\"vueelementadmin__0\"></a>vue-element-admin 概述</h1>\n<p><a href=\"https://panjiachen.github.io/vue-element-admin\" target=\"_blank\">vue-element-admin</a> 是一个后台前端解决方案，它基于 <a href=\"https://github.com/vuejs/vue\" target=\"_blank\">vue</a> 和 <a href=\"https://github.com/ElemeFE/element\" target=\"_blank\">element-ui</a>实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。</p>\n<p><a href=\"https://panjiachen.github.io/vue-element-admin\" target=\"_blank\">vue-element-admin</a> 定位是后台集成方案，不太适合当基础模板来进行二次开发，因为本项目集成了很多你可能用不到的功能，会造成不少的代码冗余。</p>\n<p>官方还提供了一套基础模板 <a href=\"https://github.com/PanJiaChen/vue-admin-template\" target=\"_blank\">vue-admin-template</a> ，我们基于它进行二次开发，想要什么功能或者组件就去 <code>vue-element-admin</code> 那里复制过来。</p>\n<h2>参考：</h2>\n<ul>\n<li>\n<p>官方文档 ：https://panjiachen.gitee.io/vue-element-admin-site/zh/</p>\n</li>\n<li>\n<p><a href=\"https://github.com/PanJiaChen/vue-element-admin\" target=\"_blank\">vue-element-admin</a> 脚手架:</p>\n<p>在线预览：https://panjiachen.gitee.io/vue-element-admin</p>\n<p><code>gitee</code>  ：https://gitee.com/mirrors/vue-element-admin</p>\n<p><code>github</code> ：https://github.com/PanJiaChen/vue-element-admin</p>\n</li>\n<li>\n<p><a href=\"https://github.com/PanJiaChen/vue-admin-template\" target=\"_blank\">vue-admin-template</a> 脚手架:</p>\n<p>在线预览：https://panjiachen.gitee.io/vue-admin-template</p>\n<p><code>github</code> 源码：https://github.com/PanJiaChen/vue-admin-template</p>\n</li>\n</ul>\n<p>参考官网配置：<br /><a href="https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9" target="_blank">https://cli.vuejs.org/zh/guid…</a></p><p>需要设置<code>BASE_URL</code></p><pre><div class="hljs"><code class="lang-js">data () {  <span class="hljs-keyword">return</span> {    <span class="hljs-attr">publicPath</span>: process.env.BASE_URL  }}</code></div></pre><p>然后</p><pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"`${publicPath}my-image.png`"</span>&gt;</span></code></div></pre><p><mark>特别强调</mark></p>'

    // 将文章id保存到cookie中并更新浏览数，判断cookie中是否由对应id，有则不继续更新
    if (!app.$cookies.get(`article-view-${params.id}`)){
      const {code} = await app.$updateNoteViewCount(params.id)
      if (code === 20000){
        data.viewCount++
        app.$cookies.set(`article-view-${params.id}`,true)
      }
    }

    const {data: commentList} = await app.$getCommentListByNoteId(params.id)

    return {data, commentList}
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
