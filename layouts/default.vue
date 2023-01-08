<template>
  <div>
    <!--头部-->
    <Header></Header>
    <!--主体-->
    <div class="main">
      <nuxt />
    </div>
    <!--尾部-->
    <Footer></Footer>
    <!--回到顶部-->
    <el-backtop :bottom="80"></el-backtop>
  </div>
</template>

<style></style>
<script>
import Footer from '~/components/layout/Footer'
import Header from '~/components/layout/Header'
export default {
  components: { Header, Footer }
}
</script>
<style scoped>
.main {
  min-height: calc(100vh - 80px);
}
</style>
