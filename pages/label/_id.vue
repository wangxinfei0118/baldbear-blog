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
              这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>

export default {

  validate ({ params }) {
    return /^\d+$/.test(params.id)
  }

}
</script>
<style scoped>
.bg-img{
  width: 100%;
  height: 350px;
  background-image: url("@/assets/2435.jpeg");
  background-size: cover;
}
</style>
