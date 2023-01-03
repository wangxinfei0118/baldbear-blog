<template>
  <!-- 主体内容 -->
  <div>
    <div class="background">
      <img src="@/assets/img/background.png">
    </div>
    <div class="info w-full pt-6">
      <div class="info-box">
        <div class="text-large text-home-title">个人简介</div>
        <div class="mt-3 mb-5 text-home-title text-medium" style="text-indent: 2em">前端开发工程师，2023年毕业于天津工业大学，软件工程专业，大一开始接触网页设计基础，大二期间参与过小组数据可视化项目的前端开发，大三开始系统学习前端，从前端基础，到开发框架，再到前端工程化以及项目的优化部署，期间做过pc、h5、小程序、跨端开发等相关项目，并在2022.6-2022.9参与企业实习，进行企业级项目开发。平时关注github，稀土掘金等社区了解更多优秀的前端技术及项目，对自己进行进一步的提升</div>
        <div class="text-home-title self-end">
          github：<a href="https://github.com/wangxinfei0118" target="_blank"><img class="inline-block align-baseline" src="@/assets/img/github-mark.svg" width="32" height="32"></a>
          wechat:   <el-popover
          placement="top-start"
          width="200"
          trigger="click">
          <img src="@/assets/img/wechat-share.jpg" width="200" >
          <img slot="reference" src="@/assets/img/wechat-logo.svg" width="32" height="32" class="inline-block align-baseline">
        </el-popover>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="note w-full mb-4" >
      <div style="width: 78%;margin: 0 auto;display: flex;flex-direction: column;align-items: center">
        <div class="text-large text-home-title" style="margin: 10px 0">我的笔记</div>
        <el-divider>记录学习中的每一步脚印</el-divider>
        <div class="note-box" style="width: 100%;display: flex;justify-content: space-between;flex-wrap: wrap">
          <nuxt-link :to="`/note/${item.id}`" target="_blank" v-for="item in noteList" :key="item.id">
            <el-card shadow="hover" style="width: 280px;margin-bottom: 14px" :body-style="{ padding: '0px' }">
              <img class="w-full h-36" :src="item.imageUrl">
              <div style="padding: 22px">
                <div class="text-note-title font-semibold" style="margin-bottom: 10px">{{ item.title }}</div>
                <div class="summary text-medium leading-22 h-16">
                  {{ item.summary }}
                </div>
                <div class="text-note-label text-small" style="margin: 18px 0 ">标签：{{ item.label }}</div>
                <div class="flex text-small">
                  <div class="w-6/12"><i class="el-icon-time  text-blue-300"></i> {{ item.createDate }}</div>
                  <div class="w-3/12 text-right"><i class="el-icon-chat-line-round text-green-300"></i> {{ item.chatCount }}</div>
                  <div class="w-3/12 text-right"><i class="el-icon-view text-yellow-300"></i> {{ item.viewCount }}</div>
                </div>
              </div>
            </el-card>
          </nuxt-link>
          <div class="list" style="width: 280px;" v-for="i in (4 - 6 % 4)" v-if="6 % 4 > 0"></div>
        </div>
        <el-button v-if="isMore" type="primary" :loading="loading" size="small" round @click="loadMore">{{ loading ? '加载中……' : '点击加载更多' }}</el-button>
        <el-tag v-else type="danger">没有更多数据了……</el-tag>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data(){
    return{
      loading:false,
      isMore:true
    }
  },
  methods:{
    async loadMore(){
      this.loading = true
      this.page.current++
      const {data} = await this.$getNoteList(this.page)
      if (data.records && data.records.length>0){
        this.isMore = true
        this.noteList = this.noteList.concat(data.records)
      }
      else {
        this.isMore= false
      }
      this.loading = false
    }
  },
  async asyncData( {app} ) {

    const page = {current: 1, size: 8}
    const { data } = await app.$getNoteList(page)
    return {page, noteList: data.records}

  },
}
</script>

<style scoped>
.note .el-divider{
  width: 400px;
}
.note .el-divider__text{
  color: rgb(19, 194, 194);
}
.background{
  height: calc(100vh - 54px);
  width: 100%;

}
.background img{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.info-box{
  display: flex;
  margin: 0 auto;
  width: 78%;
  flex-direction: column;
  align-items: center;
}
.summary{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
