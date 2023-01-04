<template>
  <div>
    <div class="head">
      <div class="background" style="width: 100%;display: flex;flex-direction: column;align-items: center">
        <div class="bg-img"></div>
        <div class="head-card" style="width: 60%;height: 180px;box-sizing: border-box;padding: 24px 24px 0;color: #fff;background-color: hsla(0,0%,100%,.5);border: 1px solid #f0f0f0;margin-top: -180px;display: flex;flex-direction: column;align-items: center">
          <div class="title" style="font-size: 32px;margin-bottom: 16px">
            生活沉闷，但跑起来一定有风
          </div>
          <div class="summary">
            曾在半夜开车时听了一路的电台音乐，尽管有风声、引擎声，但还是觉得很安静，窗外的夜景也很安静，从未有过的舒服自在，后来有人告诉我，那是热爱生活。
          </div>
        </div>
      </div>
    </div>
    <div class="line" style="width: 70%;margin: 20px auto;position: relative;left: -30px">
      <el-timeline>
        <el-timeline-item :timestamp="item.createDate" placement="top" v-for="(item, index) in lifeList" :key="index">
          <div class="float-right" v-if="userId == 1">
            <el-button icon="el-icon-edit" circle @click="editLife(item.id)"></el-button>
            <el-button icon="el-icon-delete" circle @click="deleteLife(item.id)"></el-button>
          </div>
          <el-card style="width: 80%;margin-left: 8%;margin-top: 20px" shadow="hover">
            <div class="mb-2 text-home-title text-large">{{item.title}}</div>
            <div v-html="item.htmlContent"></div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
    }
  },
  async asyncData({ app }) {
    const {data} = await app.$getLifeList()
    console.log(data)
    return {lifeList: data.records}
  },
  methods:{
    editLife(id){
      this.$router.push(`/life/edit?id=${id}`)
    },
    deleteLife(id){
      this.$confirm('是否删除该笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$deleteLife(this.$route.params).then(()=>{
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
::v-deep.el-timeline-item .el-timeline-item__timestamp{
  font-size: 32px;
  color: rgb(8, 151, 156);
}
</style>
