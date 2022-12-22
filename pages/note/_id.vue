<template>
  <div>
    <div class="head">
      <div class="background" style="width: 100%;display: flex;flex-direction: column;align-items: center">
        <div class="bg-img"></div>
        <div class="head-card" style="width: 60%;height: 180px;box-sizing: border-box;padding: 24px 24px 0;color: #fff;background-color: hsla(0,0%,100%,.5);border: 1px solid #f0f0f0;margin-top: -180px;display: flex;flex-direction: column;align-items: center">
          <div class="title" style="font-size: 32px;margin-bottom: 16px">
            这是标题这是标题
          </div>
          <div class="summary">
            这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要这是概要
          </div>
          <div style="margin-top: 30px">
            <el-tag size="mini"><i class="el-icon-time"></i> 2022-12-22</el-tag>
            <el-tag size="mini" type="success"><i class="el-icon-chat-line-round"></i> 23</el-tag>
            <el-tag size="mini" type="warning"><i class="el-icon-view"></i> 465</el-tag>
          </div>
        </div>
      </div>
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
  background-image: url("@/assets/detail-head.jpeg");
  background-size: cover;
}
</style>
