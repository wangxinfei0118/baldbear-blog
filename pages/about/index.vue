<template>
  <div>
    <page-header bgName="about-header" :title="headerTitle" :summary="headerSummary"></page-header>
    <div class="my-4 mx-auto" style="width: 78%">
      <el-row class="min-box">
        <el-col :xs="24" :sm="24" :md="12">
          <div class="text-home-title text-medium" style="text-indent: 2em">
            前端开发工程师，2023年毕业于天津工业大学，软件工程专业，大一开始接触网页设计，大二期间参与过小组数据可视化项目及商城项目的前端开发，大三开始系统学习前端，从前端基础，到开发框架，再到前端工程化以及项目的优化部署，期间做过pc、h5、小程序、跨端开发等相关项目，进行企业级项目开发。平时关注github，稀土掘金等社区了解更多优秀的前端技术及项目，对自己进行进一步的提升
          </div>
          <el-divider></el-divider>
          <div class="item-title">
            <img src="@/assets/img/jiaoyu.svg" width="20" class="inline mb-1" />
            <span class="text-medium-x">教育经历</span>
            <el-collapse class="ml-3">
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-64 justify-between">
                    <div>天津工业大学(双一流)</div>
                    <div>2019.09-2023.07</div>
                  </div>
                </template>
                <div>
                  <span>专业：软件工程</span>
                  <span class="mx-6">英语：cet-6</span>
                  <span>绩点：3.6/4</span>
                </div>
                <div>主修课程：计算机组成原理、数据结构、算法设计与分析、计算机网络、操作系统、数据库原理、软件工程</div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="item-title mt-2">
            <img src="@/assets/img/gongzuo.svg" width="20" class="inline mb-1" />
            <span class="text-medium-x">工作经历</span>
            <el-collapse class="ml-3">
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-64 justify-between">
                    <div>xxx有限公司(实习)</div>
                    <div>2022.06-2022.09</div>
                  </div>
                </template>
                <ul style="list-style-type: circle">
                  <li>1. 参与 pc 端及 h5 项目新旧版功能迁移，根据需求完成新版相应页面及功能的开发任务</li>
                  <li>2. 使用 uniapp 结合 uview 进行 app 及小程序项目的跨端开发，兼容 Android 和 ios</li>
                  <li>
                    3. 维护项目的 ui 组件库及字体图标库，并基于 rollup 和 svg2 封装 svg 管理工具，实现 svg 格式转换，样式修改，
                    stroke 转 fill 等功能，解决字体图标不支持 stroke 及 path 多色填充问题，使 svg 更好的兼容字体图标
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="item-title mt-2">
            <img src="@/assets/img/xiangmu.svg" width="20" class="inline mb-1" />
            <span class="text-medium-x">项目经历</span>
            <el-collapse class="ml-3">
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-96 justify-between">
                    <div>基于node+nuxt.js的SSR前后端分离个人博客</div>
                    <div>2022.11-2023.02</div>
                  </div>
                </template>
                <div>
                  项目描述：该项目是基于node和nuxt.js的SSR前后端分离个人博客，前端由vue+nuxt.js+element搭建服务端渲染页面，后端由node+express提供restful接口，主要包括技术笔记分享，生活分享，留言板等功能，并从性能及seo方面对项目进行整体的优化
                </div>
                <div>项目职责：</div>
                <div>1. 通过媒体查询及百分比布局实现页面的响应式，使用CSS3动画及 requestAnimationFrame为项目添加动态效果</div>
                <div>
                  2. 封装目录固钉、评论区等公共组件，通过获取h1、h2标签生成目录对象，并监听滚动条事件实现滚动高亮及文章锚点定位
                </div>
                <div>
                  3. 使用async/await构建express服务，编写生成restful Api，对请求数据进行校验与bcrypt加密，封装xss过滤、变量命名
                  转换与全局错误处理中间件，并通过编写router下swagger注释生成接口文档，使用mp2对nuxt及node项目进行进程管理
                </div>
                <div>
                  4. 进行代码整体优化，从懒加载、按需引入、文件压缩与分包等方面进行性能优化，首屏加载时间由1.2s降低到0.4s，文件体
                  积由9.8M降低 到3.68M，实现首页毫秒级加载
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-96 justify-between">
                    <div>基于同域cookie实现单点登录认证客户端</div>
                    <div>2022.11-2022.12</div>
                  </div>
                </template>
                <div>
                  项目描述：该项目是基于同域cookie的单点登录认证客户端，多应用可以在认证客户端进行统一身份认证，实现用户状态在多个应用中共享
                </div>
                <div>项目职责：</div>
                <div>1.实现多应用统一登录、注册、退出功能，拦截页面跳转进行身份认证，并重定向指定页面</div>
                <div>2.封装cookie.js管理cookie，根据执行环境将cookie存储到顶级域名下，实现token及用户状态在子域中的共享</div>
                <div>
                  3.通过拦截401状态码，发送refresh_token进行token刷新，并用promise.all缓冲用户请求队列，实现用户状态的无感刷新
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-96 justify-between">
                    <div>嗨同学-校园生活网站</div>
                    <div>2022.08-2022.11</div>
                  </div>
                </template>
                <div>
                  项目描述：该项目是基于vue3+typescript+element-plus+vant开发的校园生活网站，主要功能包括校园
                  小调查、每日新鲜事、失物招领、跳瘙市场，校园讨论区等，为学生提供一个服务与交流的平台
                </div>
                <div>项目职责：</div>
                <div>1.配置postcss，结合tailwind实现项目样式主题自定义，并配置postcss-pxtorem 实现h5rem适配</div>
                <div>2.使用自定义指令绑定权限，对用户操作进行限制，封装自定义hooks，实现组合式函数封装与复用</div>
                <div>3.利用watchEffect监听问卷状态，并结合jsx封装状态组件动态渲染其对应的文字、操作及状态图标</div>
                <div>4.封装滚动加载组件，并使用vue-virtual-scroller结合滚动加载进行长列表优化，实现dom复用减少页面卡顿</div>
                <div>5.用pinia代替vuex实现简化及对ts类型的支持，并使用Setup Stores语法创建Store，实现语法统一</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <div class="flex justify-around flex-wrap skill-box">
            <el-card shadow="hover" class="skill-card scale-up-center">
              <div>Vue</div>
              <div class="skill-title">
                掌握vue及其相关生态，熟悉vue2内部原理，掌握vue3组合式api及setup语法糖，有多个完整的vue项目开发经验
              </div>
              <div class="img-box">
                <img src="@/assets/img/vue.svg" />
                <img src="@/assets/img/vuex.svg" />
                <img src="@/assets/img/pinia.svg" />
              </div>
            </el-card>
            <el-card shadow="hover" class="skill-card scale-up-center">
              <div>H5C3</div>
              <div class="skill-title">
                掌握html5、css3，熟悉less、scss等预处理语言及tailwind、pxtorem等postcss插件的使用配置，掌握常用的前端页面布局
              </div>
              <div class="img-box">
                <img src="@/assets/img/html.svg" />
                <img src="@/assets/img/css.svg" />
                <img src="@/assets/img/postcss.svg" />
              </div>
            </el-card>
            <el-card shadow="hover" class="skill-card scale-up-center">
              <div>小程序</div>
              <div class="skill-title">熟悉原生微信小程序，能够使用原生api开发小程序，有uniapp结合uview进行跨端开发经历</div>
              <div class="img-box">
                <img src="@/assets/img/mp-weixin.svg" />
                <img src="@/assets/img/uniapp.png" />
                <img src="@/assets/img/uview.png" />
              </div>
            </el-card>
            <el-card shadow="hover" class="skill-card scale-up-center">
              <div>脚本语言</div>
              <div class="skill-title">
                掌握js、es6语法及dom操作，熟悉typescript，熟悉node.js及express，可快速进行页面交互、接口联调及数据处理
              </div>
              <div class="img-box">
                <img src="@/assets/img/javascript.svg" />
                <img src="@/assets/img/typescript.svg" />
                <img src="@/assets/img/express.png" />
              </div>
            </el-card>
            <el-card shadow="hover" style="margin-top: -360px" class="skill-card last-card scale-up-center">
              <div>前端工程化</div>
              <div class="skill-title">
                了解rollup、webpack及vite等打包工具，掌握loader、plugin的原理及，熟悉常见前端性能优化方案
              </div>
              <div class="img-box">
                <img src="@/assets/img/webpack.svg" />
                <img src="@/assets/img/rollup.svg" />
                <img src="@/assets/img/vite.svg" />
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/common/PageHeader'
export default {
  components: { PageHeader },
  data() {
    return {
      headerTitle: '寂静生长，默然坚强',
      headerSummary:
        '我不要听到你嘴里的积极口号，不要看到你在受伤之后的眼泪。我要看到你平地一声雷的蛰伏，看到你特立独行却不被孤立的魅力，看到你与世无争却有迹可循的野心，看到你说堕落，却又不自甘堕落的自制力。'
    }
  }
}
</script>

<style scoped>
.el-collapse {
  border: none;
}
::v-deep.el-collapse-item .el-collapse-item__header {
  border: none;
}
.img-box {
  display: flex;
  justify-content: space-between;
}
.img-box img {
  width: 64px;
  height: 64px;
}
.skill-box {
  width: 500px;
}
.skill-card {
  height: 240px;
  width: 240px;
}
.skill-title {
  @apply text-home-title text-medium h-28;
}
.scale-up-center:hover {
  -webkit-animation: scale-up-center 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-center 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@media only screen and (max-width: 992px) {
  .min-box {
    @apply flex flex-col;
  }
  .skill-box {
    width: auto !important;
    margin-left: 0 !important;
  }
}
@media only screen and (max-width: 1200px) {
  .skill-box {
    margin-left: 20px;
  }
  .skill-card {
    width: 100%;
    height: 170px;
  }
  .el-card ::v-deep .el-card__body {
    padding: 10px 20px;
  }
  .skill-title {
    @apply text-home-title text-medium h-16;
  }
  .img-box {
    @apply flex justify-start;
  }
  .last-card {
    margin-top: 0 !important;
  }
}
</style>
