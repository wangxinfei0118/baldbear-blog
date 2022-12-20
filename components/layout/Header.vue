<template>
  <div class="header">
    <div class="nav">
      <el-row type="flex" justify="space-between" style="height: 100%">
        <el-col :span="4" style="display: flex;justify-content: center;align-items: center">
          <img src="@/assets/logo.png" style="width: 180px">
        </el-col>
        <el-col class="hidden-sm-and-down" :span="15" style="display: flex;justify-content: start;align-items: center;margin-left: 22px">
          <el-menu :default-active="'/'" class="menu" mode="horizontal" router>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/question">分类</el-menu-item>
            <el-menu-item index="/label">生活</el-menu-item>
            <el-menu-item index="/label">关于我</el-menu-item>
            <el-menu-item index="/label">留言板</el-menu-item>
            <el-menu-item index="/label">Hi,同学！</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="18" :span="5" style="display: flex;justify-content: end;align-items: center">
          <div class="nav-sign mr-4">
            <div v-if="!userInfo">
              <el-button type="text" @click="$store.dispatch('toLoginPage')">登录</el-button>
              <el-button type="primary" round size="small" @click="$store.dispatch('toLoginPage')">注册</el-button>
            </div>
            <el-dropdown trigger="click" @command="handleCommand" v-if="userInfo">
            <span class="el-dropdown-link">
             <el-avatar :src="userInfo.imageUrl"></el-avatar>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="note">写笔记</el-dropdown-item>
                <el-dropdown-item command="life">写日常</el-dropdown-item>
                <el-dropdown-item command="user">个人资料</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    handleCommand(command){
      console.log(command)
      switch (command){
        case 'note':
          // 新窗口打开
          // routeData = this.$router.resolve('/article/edit')
          // window.open(routeData.href,'_blank')
          this.$router.push('/article/edit')
          break;
        case 'life':
          this.$router.push('/question/edit')
          break;
        case 'user':
          this.$router.push('/user')
          break;
        case 'logout':
          this.$store.dispatch('toLogout')
          break;
        default:
          break;
      }
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 62px;
  background-color: rgba(76, 76, 76,0.9);
  box-shadow: 0 2px 2px #35495e;
  z-index: 9999;
  position: fixed;
}
.nav{
  height: 100%;
}
.el-menu{
  background-color: transparent;
  border-bottom: none;
}
.el-menu-item{
  background-color: transparent;
  border-radius: 0;
  font-size: 15px;
  color: #fff;
  margin-right: 42px;
  padding: 0;
  width: 88px;
  text-align: center;
}
.el-menu-item.is-active{
  background-color: transparent;
  color: #fff;
}
.el-menu-item:not(.is-disabled):focus, .el-menu-item:not(.is-disabled):hover, .el-submenu .el-submenu__title:hover{
  background-color: transparent;
  color: #fff;
}
</style>
