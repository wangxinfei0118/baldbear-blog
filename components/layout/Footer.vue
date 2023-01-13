<template>
  <div class="footer-box">
    <div class="mr-2">Copyright © 2022-2023 baldbear.cn All Rights Reserved.</div>
    <div>
      <a href="https://beian.miit.gov.cn/" target="_blank">备案号：冀ICP备2022030887号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer-box {
  @apply bg-footer-bg h-20 flex justify-center items-center text-small-x text-home-title text-center;
}
</style>
