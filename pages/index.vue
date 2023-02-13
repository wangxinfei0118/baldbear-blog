<template>
  <!-- 主体内容 -->
  <div class="main-box">
    <div class="box-header compatible">
      <!--      <img src="@/assets/img/background.png" class="right-top" />-->
      <div class="cloak flex flex-col justify-center items-center text-white text-large-title font-semibold text-center">
        <div>找到你喜欢做的事，并努力成为这个领域里的顶尖人物。</div>
        <div>Figure out what you like. Try to become the best in the world of it</div>
      </div>
      <div class="scroll-down absolute bottom-20 left-2/4 w-6 -ml-3" @click="scrollDown">
        <button class="mouse">
          <div class="scroll"></div>
        </button>
      </div>
    </div>
    <div class="bg-white">
      <div class="info w-full pt-6">
        <div class="info-box">
          <div class="text-large text-home-title">个人简介</div>
          <div class="mt-3 mb-5 text-home-title text-medium" style="text-indent: 2em">
            前端开发工程师，2023年毕业于天津工业大学，软件工程专业，大一开始接触网页设计，大二期间参与过小组数据可视化项目及商城项目的前端开发，大三开始系统学习前端，从前端基础，到开发框架，再到前端工程化以及项目的优化部署，期间做过pc、h5、小程序、跨端开发等相关项目，并参与企业实习，进行企业级项目开发。平时关注github，稀土掘金等社区了解更多优秀的前端技术及项目，对自己进行进一步的提升
          </div>
          <div class="text-home-title self-end">
            github:
            <a href="https://github.com/wangxinfei0118" target="_blank">
              <img class="inline-block align-baseline" src="@/assets/img/github-mark.svg" width="32" height="32" />
            </a>
            wechat:
            <el-popover placement="top-start" width="200" trigger="click">
              <img src="@/assets/img/wechat-share.jpg" width="200" />
              <img
                slot="reference"
                src="@/assets/img/wechat-logo.svg"
                width="32"
                height="32"
                class="inline-block align-baseline" />
            </el-popover>
          </div>
        </div>
      </div>
      <el-divider content-position="left">
        <div class="skill-line"></div>
        <div class="relative">
          <img class="bear" src="@/assets/img/bear.svg" />
        </div>
      </el-divider>
      <div class="note w-full mb-4">
        <div class="note-wrapper">
          <div class="text-large text-home-title my-2">我的笔记</div>
          <el-divider>记录学习中的每一步脚印</el-divider>
          <div class="note-box">
            <nuxt-link :to="`/note/${item.noteId}`" target="_blank" v-for="item in noteList" :key="item.id">
              <el-card shadow="hover" class="note-card" :body-style="{ padding: '0px' }">
                <img class="note-img" v-lazy="item.imageUrl" />
                <div class="note-content p-6">
                  <div class="text-note-title font-medium" style="margin-bottom: 10px">{{ item.title }}</div>
                  <div class="summary text-medium leading-22 h-16">
                    {{ item.summary }}
                  </div>
                  <div class="text-note-label text-small" style="margin: 18px 0">标签：{{ item.label }}</div>
                  <div class="flex text-small">
                    <div class="w-6/12">
                      <i class="el-icon-time text-blue-300"></i>
                      {{ item.createDate.split(' ')[0] }}
                    </div>
                    <div class="w-3/12 text-right">
                      <i class="el-icon-chat-line-round text-green-300"></i>
                      {{ item.chatCount }}
                    </div>
                    <div class="w-3/12 text-right">
                      <i class="el-icon-view text-yellow-300"></i>
                      {{ item.viewCount }}
                    </div>
                  </div>
                </div>
              </el-card>
            </nuxt-link>
            <!--解决justify-content: space-between不足一行元素两侧问题-->
            <div class="list" style="width: 280px" v-for="i in 4 - (noteList.length % 4)" v-if="noteList.length % 4 > 0"></div>
          </div>
          <el-button v-if="isMore" type="primary" :loading="loading" size="small" round @click="loadMore">
            {{ loading ? '加载中……' : '点击加载更多' }}
          </el-button>
          <el-tag v-else type="info">没有更多数据了……</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isMore: true
    }
  },
  methods: {
    async loadMore() {
      this.loading = true
      this.page.current++
      const { data } = await this.$getNoteList(this.page)
      if (data.records && data.records.length > 0 && this.noteList.length < this.page.total) {
        this.isMore = true
        this.noteList = this.noteList.concat(data.records)
      } else {
        this.isMore = false
      }
      this.loading = false
    },
    scrollDown() {
      let target = 630
      function step() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let stepLength = Math.ceil((target - scrollTop) / 20)
        if (scrollTop < target) {
          window.scrollTo(0, scrollTop + stepLength)
          window.requestAnimationFrame(step)
        } else {
          return
        }
      }
      window.requestAnimationFrame(step)
    }
  },
  async asyncData({ app }) {
    const page = { current: 1, size: 8 }
    const { data } = await app.$getNoteList(page)
    page.total = data.total
    return { page, noteList: data.records }
  }
}
</script>

<style scoped>
.box-header {
  width: 100%;
  height: calc(100vh - 54px);
  background-image: url('assets/img/home-background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: center;
}
@media only screen and (max-width: 992px) {
  .compatible {
    background-size: auto calc(100vh - 54px);
    background-position-x: 25%;
  }
}
.note .el-divider {
  width: 400px;
}
.note .el-divider__text {
  color: rgb(19, 194, 194);
}
.box-header .cloak {
  background: rgba(52, 68, 76, 0.5);
  width: 100%;
  height: 100%;
}
.info-box {
  display: flex;
  margin: 0 auto;
  width: 78%;
  flex-direction: column;
  align-items: center;
}
.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.mouse {
  width: 25px;
  height: 40px;
  border: 1px solid rgb(196, 196, 196);
  background-color: transparent;
  border-radius: 13px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.scroll {
  width: 3px;
  height: 10px;
  background-color: rgb(196, 196, 196);
  border-radius: 2px;
  position: absolute;
  bottom: 9px;
  animation: move_down 1.5s linear infinite;
}

@keyframes move_down {
  0% {
    bottom: 9px;
  }
  50% {
    bottom: 5px;
  }
  100% {
    bottom: 9px;
  }
}
.note-wrapper {
  width: 78%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.note-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.note-card {
  width: 280px;
  margin-bottom: 14px;
  border-radius: 0;
  transform: translateY(0);
  transition: transform 0.4s ease;
}
.note-card:hover {
  transform: translateY(-20px);
  transition: transform 0.4s ease;
}
.note-img {
  height: 140px;
  @apply object-cover w-full;
}
.skill-line {
  @apply w-52 h-1;
}
.bear {
  @apply w-52 max-w-none absolute -top-24 -left-8 opacity-80;
}
@media only screen and (max-width: 992px) {
  .scroll-down {
    display: none;
  }
  .skill-line {
    @apply w-44 h-1;
  }
  .bear {
    @apply w-44 max-w-none absolute -top-24 opacity-80;
  }
}
@media only screen and (min-width: 1200px) {
  .note-box {
    width: 1200px;
  }
}
@media only screen and (max-width: 1200px) {
  .note-box {
    width: 600px;
  }
}
@media only screen and (max-width: 600px) {
  .note-box {
    width: auto;
  }
}
</style>
