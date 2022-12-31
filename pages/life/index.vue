<template>
  <div>
    <div class="head">
      <div class="background" style="width: 100%;display: flex;flex-direction: column;align-items: center">
        <div class="bg-img"></div>
        <div class="head-card" style="width: 60%;height: 180px;box-sizing: border-box;padding: 24px 24px 0;color: #fff;background-color: hsla(0,0%,100%,.5);border: 1px solid #f0f0f0;margin-top: -180px;display: flex;flex-direction: column;align-items: center">
          <div class="title" style="font-size: 32px;margin-bottom: 16px">
            {{$route.query.name}}
          </div>
          <div class="summary">
          </div>
        </div>
      </div>
    </div>
    <div class="line" style="width: 70%;margin: 20px auto;position: relative;left: -30px">
      <el-timeline>
        <el-timeline-item timestamp="2018-4-12" placement="top">
          <el-card style="width: 80%;margin-left: 8%;margin-top: 20px" shadow="hover">

          </el-card>
        </el-timeline-item>
      </el-timeline>
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
::v-deep.el-timeline-item .el-timeline-item__timestamp{
  font-size: 32px;
  color: rgb(8, 151, 156);
}
</style>
