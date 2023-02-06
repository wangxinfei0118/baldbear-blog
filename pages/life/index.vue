<template>
  <div>
    <page-header bgName="life-header" :title="headerTitle" :summary="headerSummary"></page-header>
    <div class="line min-line">
      <el-timeline>
        <el-timeline-item
          :timestamp="item.createDate.split(' ')[0]"
          placement="top"
          v-for="(item, index) in lifeList"
          :key="index">
          <div class="float-right" v-if="userRole === 1">
            <el-button icon="el-icon-edit" circle @click="editLife(item.id)"></el-button>
            <el-button icon="el-icon-delete" circle @click="deleteLife(item.id)"></el-button>
          </div>
          <el-card class="life-card min-life-card" shadow="hover">
            <div class="mb-2 text-home-title text-large">{{ item.title }}</div>
            <div v-html="item.htmlContent" class="leading-24"></div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/common/PageHeader'
export default {
  components: { PageHeader },
  data() {
    return {
      userId: this.$store.state.userInfo && this.$store.state.userInfo.uid,
      userRole: this.$store.state.userInfo && this.$store.state.userInfo.role,
      headerTitle: '生活沉闷，但跑起来一定有风',
      headerSummary:
        '曾在半夜开车时听了一路的电台音乐，尽管有风声、引擎声，但还是觉得很安静，窗外的夜景也很安静，从未有过的舒服自在，后来有人告诉我，那是热爱生活。'
    }
  },
  async asyncData({ app }) {
    const { data } = await app.$getLifeList()
    data.records.forEach((item) => {
      item.htmlContent = app.$handleEscape(item.htmlContent)
    })
    return { lifeList: data.records }
  },
  methods: {
    editLife(id) {
      this.$router.push(`/life/edit?id=${id}`)
    },
    deleteLife(id) {
      this.$mb
        .confirm('是否删除该日常?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.$deleteLife(id).then((res) => {
            if (res.code === 20000) {
              this.$message.success('删除成功！')
              this.$getLifeList().then((res) => {
                res.data.records.forEach((item) => {
                  item.htmlContent = this.$handleEscape(item.htmlContent)
                })
                this.lifeList = res.data.records
              })
            } else this.$message.error('删除失败！')
          })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>

<style scoped>
::v-deep.el-timeline-item .el-timeline-item__timestamp {
  font-size: 32px;
  color: rgb(8, 151, 156);
}
.line {
  width: 70%;
  margin: 20px auto;
}
.life-card {
  width: 80%;
  margin-left: 8%;
  margin-top: 20px;
}
@media only screen and (max-width: 992px) {
  .min-line {
    width: 90%;
  }
  .min-life-card {
    width: 100%;
    margin-left: 0;
  }
}
</style>
