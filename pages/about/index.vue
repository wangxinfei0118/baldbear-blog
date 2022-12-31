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
        </div>
      </div>
    </div>
    <div class="my-4 mx-auto" style="width: 78%">
      <el-row>
        <el-col :span="12">
          <div class="text-home-title text-medium" style="text-indent: 2em">
            前端开发工程师，2023年毕业于天津工业大学，软件工程专业，大一开始接触网页设计基础，大二期间参与过小组数据可视化项目的前端开发，大三开始系统学习前端，从前端基础，到开发框架，再到前端工程化以及项目的优化部署，期间做过pc、h5、小程序、跨端开发等相关项目，并在2022.6-2022.9参与企业实习，进行企业级项目开发。平时关注github，稀土掘金等社区了解更多优秀的前端技术及项目，对自己进行进一步的提升
          </div>
          <el-divider></el-divider>
          <div class="title">
            <img src="@/assets/img/jiaoyu.svg" width="20" class="inline mb-1">
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
          <div class="title mt-2">
            <img src="@/assets/img/gongzuo.svg" width="20" class="inline mb-1">
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
                  <li>1. 参与调研工厂 pc 端及 h5 项目新旧版功能迁移，根据需求完成新版相应页面及功能的开发任务</li>
                  <li>2. 使用 uniapp 结合 uview 进行调研工厂 app 及小程序项目的跨端开发，兼容 Android 和 ios</li>
                  <li>3. 维护项目的 ui 组件库及字体图标库，并基于 rollup 和 svg2 封装 svg 管理工具，实现 svg 格式转换，样式修改，
                    stroke 转 fill 等功能，解决字体图标不支持 stroke 及 path 多色填充问题，使 svg 更好的兼容字体图标</li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="title mt-2">
            <img src="@/assets/img/xiangmu.svg" width="20" class="inline mb-1">
            <span class="text-medium-x">项目经历</span>
            <el-collapse class="ml-3">
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-96 justify-between">
                    <div>基于nuxt.js的SSR个人博客</div>
                    <div>2022.11-2023.01</div>
                  </div>
                </template>
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-96 justify-between">
                    <div>基于主域名cookie实现单点登录认证客户端</div>
                    <div>2022.11-2022.12</div>
                  </div>
                </template>
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <div class="flex w-96 justify-between">
                    <div>嗨同学-校园生活网站</div>
                    <div>2022.08-2022.11</div>
                  </div>
                </template>
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex justify-around flex-wrap">
            <el-card shadow="hover" style="height: 240px;width: 240px">
              <div>Vue</div>
              <div class="text-home-title text-medium h-28">熟悉vue及其相关生态，了解vue2内部原理，熟悉vue3组合式api及setup语法糖</div>
              <div class="img-box">
                <img src="@/assets/img/vue.svg">
                <img src="@/assets/img/vuex.svg">
                <img src="@/assets/img/pinia.svg">
              </div>
            </el-card>
            <el-card shadow="hover" style="height: 240px;width: 240px">
              <div>H5C3</div>
              <div class="text-home-title text-medium h-28">掌握html5、css3，熟悉less、scss等预处理语言及tailwind、pxtorem等postcss插件的使用配置，掌握常用的前端页面布局</div>
              <div class="img-box">
                <img src="@/assets/img/html.svg">
                <img src="@/assets/img/css.svg">
                <img src="@/assets/img/postcss.svg">
              </div>
            </el-card>
            <el-card shadow="hover" style="height: 240px;width: 240px">
              <div>小程序</div>
              <div class="text-home-title text-medium h-28">熟悉原生微信小程序，能够使用原生API开发小程序，有uniapp结合uview进行跨端开发经历</div>
              <div class="img-box">
                <img src="@/assets/img/mp-weixin.svg">
                <img src="@/assets/img/uniapp.png">
                <img src="@/assets/img/uview.png">
              </div>
            </el-card>
            <el-card shadow="hover" style="height: 240px;width: 240px">
              <div>node.js</div>
              <div class="text-home-title text-medium h-28">了解node.js，了解express能够使用express搭建服务器，处理数据并操作数据库，有开发npm包经历</div>
              <div class="img-box">
                <img src="@/assets/img/javascript.svg">
                <img src="@/assets/img/typescript.svg">
                <img src="@/assets/img/express.png">
              </div>
            </el-card>
            <el-card shadow="hover" style="height: 240px;width: 240px;margin-top: -360px">
              <div>前端工程化</div>
              <div class="text-home-title text-medium h-28">了解rollup和webpack打包工具，了解loader、plugin原理及常见性能优化，能基于webpack搭建脚手架</div>
              <div class="img-box">
                <img src="@/assets/img/webpack.svg">
                <img src="@/assets/img/rollup.svg">
                <img src="@/assets/img/vite.svg">
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bg-img{
  width: 100%;
  height: 350px;
  background-image: url("assets/img/detail-head.jpeg");
  background-size: cover;
}
.el-collapse{
  border: none;
}
::v-deep.el-collapse-item .el-collapse-item__header{
  border: none;
}
.img-box{
  display: flex;
  justify-content: space-between;
}
.img-box img{
  width: 64px;
  height: 64px;
}
</style>
