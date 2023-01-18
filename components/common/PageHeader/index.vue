<template>
  <div class="head">
    <div class="background w-full flex flex-col items-center">
      <div class="bg-img" :style="{ backgroundImage: 'url(' + itemImg + ')' }"></div>
      <div class="head-card min-head-card mini-head-card">
        <div :class="summary ? 'title' : 'title mt-8'">{{ title }}</div>
        <div class="summary" v-if="summary">{{ summary }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    }
  },
  computed: {
    itemImg() {
      return require(`assets/img/${this.bgName}.jpg`)
    }
  }
}
</script>

<style scoped>
.bg-img {
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center;
}
.head-card {
  width: 60%;
  height: 180px;
  box-sizing: border-box;
  padding: 24px 24px 0;
  color: #fff;
  background-color: rgba(230, 230, 250, 0.4);
  border: 1px solid rgb(230, 230, 250);
  margin-top: -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  width: 100%;
  font-size: 32px;
  margin-bottom: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.summary {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
@media only screen and (max-width: 992px) {
  .min-head-card {
    width: 80%;
  }
}
@media only screen and (max-width: 768px) {
  .mini-head-card {
    width: 100%;
  }
}
</style>
