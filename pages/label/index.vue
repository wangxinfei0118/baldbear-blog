<template>
  <div class="label-main">
    <div class="background">
      <img src="@/assets/img/label-background.jpg" class="top-left" />
    </div>
    <div class="w-11/12 mx-auto pt-24">
      <el-row>
        <el-col v-for="(category, index) in labelList" :key="index" :xs="24" :sm="24" :md="6">
          <div class="category-box">
            <!-- 类别名 -->
            <div class="title-box">
              <div class="mb-2 text-5xl"><i :class="category.iconName + ' category-icon'"></i></div>
              <div class="text-large-s tracking-widest">{{ category.name }}</div>
              <div class="text-large opacity-60"><i class="el-icon-minus"></i></div>
            </div>
            <div class="label-box">
              <nuxt-link
                v-for="label in category.labelList"
                :key="label.id"
                class="mb-2"
                :to="{ path: `/label/${label.id}`, query: { name: label.name } }">
                <div class="label-item">
                  {{ label.name }}
                </div>
              </nuxt-link>
            </div>
          </div>
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
  -webkit-animation: top-left 8s ease-out both;
  animation: top-left 8s ease-out both;
}
@-webkit-keyframes top-left {
  0% {
    -webkit-transform: scale(1.25);
    transform: scale(1.25);
    -webkit-transform-origin: 16% 16%;
    transform-origin: 16% 16%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: top left;
    transform-origin: top left;
  }
}
@keyframes top-left {
  0% {
    -webkit-transform: scale(1.25);
    transform: scale(1.25);
    -webkit-transform-origin: 16% 16%;
    transform-origin: 16% 16%;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: top left;
    transform-origin: top left;
  }
}
.el-row {
  width: 100%;
  height: 80vh;
  padding: 8px 48px;
  margin: 0 !important;
  /*background-color: rgba(119, 136, 153, 0.2);*/
}

.el-col {
  height: 100%;
  display: flex;
  align-items: center;
}

.el-tag {
  margin-right: 5px;
  font-size: 14px;
  color: #f5fffa;
}

.category-box {
  position: relative;
  height: 76%;
  width: 96%;
  background-color: rgba(250, 250, 250, 0.2);
  border-radius: 0;
  border: 0;
}
.category-icon {
  font-weight: 100 !important;
  opacity: 0.6;
}
.title-box {
  @apply text-center text-black w-full h-full flex flex-col items-center justify-center;
}
.label-box {
  color: white;
  opacity: 0;
  background-color: rgba(26, 26, 26, 0.8);
  @apply absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-large;
}
.label-box:hover {
  -webkit-animation: fadeInLeft 1s both;
  animation: fadeInLeft 1s both;
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-20%, 0, 0);
    transform: translate3d(-20%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.label-item {
  height: 60px;
}
</style>
