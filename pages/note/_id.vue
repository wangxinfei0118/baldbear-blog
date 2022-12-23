<template>
  <div>
    <div class="head">
      <div class="background" style="width: 100%;display: flex;flex-direction: column;align-items: center">
        <div class="bg-img"></div>
        <div class="head-card" style="width: 60%;height: 180px;box-sizing: border-box;padding: 24px 24px 0;color: #fff;background-color: hsla(0,0%,100%,.5);border: 1px solid #f0f0f0;margin-top: -180px;display: flex;flex-direction: column;align-items: center">
          <div class="title" style="font-size: 32px;margin-bottom: 16px">
            这是标题这是标题
          </div>
          <div class="summary">
            这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要
          </div>
          <div style="margin-top: 30px">
            <el-tag size="mini"><i class="el-icon-time"></i> 2022-12-22</el-tag>
            <el-tag size="mini" type="success"><i class="el-icon-chat-line-round"></i> 23</el-tag>
            <el-tag size="mini" type="warning"><i class="el-icon-view"></i> 465</el-tag>
          </div>
        </div>
      </div>
    </div>
    <el-row type="flex">
      <el-col :xs="24" :sm="24" :md="18">
        <div class="article-left">
          <el-card>
            <!-- 内容 -->
            <div class="article-content">
              <div class="markdown-body" v-html="data.htmlContent"></div>
            </div>
          </el-card>

          <!-- 评论区 -->
          <div class="commentArea">
            <h2>评论区</h2>

          </div>

        </div>
      </el-col>

      <!-- 右侧-->
      <el-col class="hidden-sm-and-down" :md="6">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import "assets/css/md/github-min.css";
import "assets/css/md/github-markdown.css";

export default {

  async asyncData({ params, app }) {
    // 获取笔记详情
    const {data} = await app.$getNoteById(params.id)
    data.htmlContent = '<h1><a id=\"vueelementadmin__0\"></a>vue-element-admin 概述</h1>\n<p><a href=\"https://panjiachen.github.io/vue-element-admin\" target=\"_blank\">vue-element-admin</a> 是一个后台前端解决方案，它基于 <a href=\"https://github.com/vuejs/vue\" target=\"_blank\">vue</a> 和 <a href=\"https://github.com/ElemeFE/element\" target=\"_blank\">element-ui</a>实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。</p>\n<p><a href=\"https://panjiachen.github.io/vue-element-admin\" target=\"_blank\">vue-element-admin</a> 定位是后台集成方案，不太适合当基础模板来进行二次开发，因为本项目集成了很多你可能用不到的功能，会造成不少的代码冗余。</p>\n<p>官方还提供了一套基础模板 <a href=\"https://github.com/PanJiaChen/vue-admin-template\" target=\"_blank\">vue-admin-template</a> ，我们基于它进行二次开发，想要什么功能或者组件就去 <code>vue-element-admin</code> 那里复制过来。</p>\n<h2>参考：</h2>\n<ul>\n<li>\n<p>官方文档 ：https://panjiachen.gitee.io/vue-element-admin-site/zh/</p>\n</li>\n<li>\n<p><a href=\"https://github.com/PanJiaChen/vue-element-admin\" target=\"_blank\">vue-element-admin</a> 脚手架:</p>\n<p>在线预览：https://panjiachen.gitee.io/vue-element-admin</p>\n<p><code>gitee</code>  ：https://gitee.com/mirrors/vue-element-admin</p>\n<p><code>github</code> ：https://github.com/PanJiaChen/vue-element-admin</p>\n</li>\n<li>\n<p><a href=\"https://github.com/PanJiaChen/vue-admin-template\" target=\"_blank\">vue-admin-template</a> 脚手架:</p>\n<p>在线预览：https://panjiachen.gitee.io/vue-admin-template</p>\n<p><code>github</code> 源码：https://github.com/PanJiaChen/vue-admin-template</p>\n</li>\n</ul>\n<p>参考官网配置：<br /><a href="https://cli.vuejs.org/zh/guide/html-and-static-assets.html#public-%E6%96%87%E4%BB%B6%E5%A4%B9" target="_blank">https://cli.vuejs.org/zh/guid…</a></p><p>需要设置<code>BASE_URL</code></p><pre><div class="hljs"><code class="lang-js">data () {  <span class="hljs-keyword">return</span> {    <span class="hljs-attr">publicPath</span>: process.env.BASE_URL  }}</code></div></pre><p>然后</p><pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"`${publicPath}my-image.png`"</span>&gt;</span></code></div></pre><p><mark>特别强调</mark></p>'
    return {data}
  }

}
</script>

<style scoped>

.bg-img{
  width: 100%;
  height: 350px;
  background-image: url("assets/detail-head.jpeg");
  background-size: cover;
}
</style>
