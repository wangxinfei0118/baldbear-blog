<template>
  <div class="label-main">
    <div class="background">
      <img src="@/assets/img/label-background.jpg" class="top-left" />
    </div>
    <div class="absolute top-10 w-full">
      <el-row :gutter="10">
        <el-col v-for="(category, index) in labelList" :key="index" :xs="24" :sm="24" :md="6">
          <el-card shadow="hover">
            <!-- 类别名 -->
            <div slot="header">
              <span>{{ category.name }}</span>
            </div>
            <!-- 类别下的标签 -->
            <div class="flex flex-wrap">
              <nuxt-link
                v-for="label in category.labelList"
                :key="label.id"
                class="mb-2"
                :to="{ path: `/label/${label.id}`, query: { name: label.name } }">
                <el-tag size="small" effect="plain" color="rgba(240,255,255,0.4)" class="text-white">
                  {{ label.name }}
                </el-tag>
              </nuxt-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app }) {
    const { data, code } = await app.$getCategoryAndLabel()
    let labelList = []
    if (code === 20000) {
      labelList = data
    }
    return { labelList }
  }
}
</script>
<style scoped>
.background {
  position: fixed;
  overflow: hidden;
}
.background img {
  object-fit: cover;
  min-height: 100vh;
  width: 100vw;
}
.top-left {
  animation: top-left 8s ease-out both;
}
@keyframes top-left {
  0% {
    transform: scale(1.25);
    transform-origin: 16% 16%;
  }
  100% {
    transform: scale(1);
    transform-origin: top left;
  }
}
.el-row {
  width: 100%;
  padding: 96px 32px;
  margin: 0 !important;
}

.el-col {
  margin-bottom: 20px;
}

.el-tag {
  margin-right: 5px;
  font-size: 14px;
  color: #f5fffa;
}

.el-card {
  height: 200px;
  background-color: rgba(119, 136, 153, 0.5);
  color: white;
}
</style>
