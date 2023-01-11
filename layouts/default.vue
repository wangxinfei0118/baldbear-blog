<template>
  <div>
    <Loading v-if="isLoading" :isFinish="isFinish"></Loading>
    <div>
      <!--头部-->
      <Header></Header>
      <!--主体-->
      <div class="main">
        <nuxt />
      </div>
      <!--尾部-->
      <Footer v-if="$route.path === '/'"></Footer>
      <!--回到顶部-->
      <el-backtop :bottom="80"></el-backtop>
    </div>
  </div>
</template>

<style></style>
<script>
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Loading from '@/components/layout/Loading'
export default {
  components: { Loading, Header, Footer },
  data() {
    return {
      isLoading: true,
      isFinish: false
    }
  },
  created() {
    let that = this
    if (process.client) {
      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          setTimeout(function () {
            that.isFinish = true
            setTimeout(() => {
              that.isLoading = false
            }, 1000)
          }, 600)
        }
      }
    }
  }
}
</script>
<style scoped>
.main {
  min-height: calc(100vh - 80px);
}
</style>
