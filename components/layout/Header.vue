<template>
  <div :class="isTransparent ? 'transparent big-header' : 'header'">
    <div class="nav">
      <el-row type="flex" style="height: 100%" justify="space-between">
        <el-col :xs="12" :sm="12" :md="6" :lg="9" style="display: flex; justify-content: center; align-items: center">
          <img src="@/assets/img/logo.png" class="logo left" />
        </el-col>
        <el-col :md="14" :lg="11" class="mid" style="display: flex; justify-content: end; align-items: center">
          <el-menu :default-active="activeRoute" class="menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/label">标签</el-menu-item>
            <el-menu-item index="/life">生活</el-menu-item>
            <el-menu-item index="/about">关于我</el-menu-item>
            <el-menu-item index="/message">留言板</el-menu-item>
            <el-menu-item index="/hi">Hi,同学！</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :md="4" :lg="6" class="right" style="display: flex; justify-content: start; align-items: center">
          <div class="nav-sign mr-4">
            <div v-if="!userInfo">
              <el-button @click="$store.dispatch('toLoginPage')">立即登录</el-button>
            </div>
            <el-dropdown trigger="click" @command="handleCommand" v-if="userInfo">
              <span class="el-dropdown-link">
                <el-avatar :src="userInfo.userPic ? userInfo.userPic : $avatar"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="note" v-if="userInfo.uid == 1">写笔记</el-dropdown-item>
                <el-dropdown-item command="life" v-if="userInfo.uid == 1">写日常</el-dropdown-item>
                <el-dropdown-item command="user">个人资料</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" class="min-right" style="display: flex; justify-content: center; align-items: center">
          <div>
            <el-dropdown trigger="click" @command="handleMenu">
              <span class="el-dropdown-link">
                <img src="@/assets/img/h5/menu.svg" width="40" />
              </span>
              <el-dropdown-menu slot="dropdown" class="min-menu">
                <div class="mb-2">
                  <div v-if="userInfo" @click="$router.push('/user')">
                    <el-avatar :src="userInfo.userPic ? userInfo.userPic : $avatar"></el-avatar>
                    <div>{{ userInfo.nickname }}</div>
                  </div>
                  <el-button v-else plain type="text" @click="$store.dispatch('toLoginPage')">立即登录</el-button>
                </div>
                <el-dropdown-item command="/">首页</el-dropdown-item>
                <el-dropdown-item command="/label">标签</el-dropdown-item>
                <el-dropdown-item command="/life">生活</el-dropdown-item>
                <el-dropdown-item command="/about">关于我</el-dropdown-item>
                <el-dropdown-item command="/message">留言板</el-dropdown-item>
                <!--                <el-dropdown-item command="/hi">Hi,同学</el-dropdown-item>-->
                <el-dropdown-item v-if="userInfo" command="logout">退出</el-dropdown-item>
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
  name: 'Header',
  data() {
    return {
      isTransparent: true
    }
  },
  methods: {
    handleSelect(key) {
      if (key !== '/hi') {
        this.$router.push(key)
      } else {
        this.notOpen()
      }
    },
    handleCommand(command) {
      switch (command) {
        case 'note':
          // 新窗口打开
          // routeData = this.$router.resolve('/note/edit')
          // window.open(routeData.href,'_blank')
          this.$router.push('/note/edit')
          break
        case 'life':
          this.$router.push('/life/edit')
          break
        case 'user':
          this.$router.push('/user')
          break
        case 'logout':
          this.$store.dispatch('toLogout')
          break
        default:
          break
      }
    },
    handleMenu(command) {
      if (command !== 'logout') {
        this.$router.push(`${command}`)
      } else {
        this.$store.dispatch('toLogout')
      }
    },
    notOpen() {
      this.$mb.alert('该模块暂时没有开放哦', 'Hi,同学!', {
        confirmButtonText: '确定',
        callback: () => {}
      })
    },
    handleScroll() {
      const whiteList = ['/user', '/note/edit', '/life/edit', '/404']
      let offsetTop = this.$route.path === '/' ? '600' : '201'
      if (window.scrollY >= offsetTop || whiteList.includes(this.$route.path)) {
        this.isTransparent = false
      } else {
        this.isTransparent = true
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    activeRoute() {
      // 解决当访问子路由menu不选中的问题
      let routePath = this.$route.matched[0].path || '/'
      // 从第2个字符开始往后找是否存在 / , 有子路由，截取一级路由地址
      if (routePath.indexOf('/', 1) !== -1) {
        routePath = routePath.substring(0, routePath.indexOf('/', 1))
      }
      return routePath.indexOf('/note') !== -1 ? '/' : routePath
    }
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  mounted() {
    this.handleScroll()
  },
  updated() {
    this.handleScroll()
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 72px;
  background: rgba(52, 68, 76, 0.8);
  z-index: 9999;
  position: fixed;
  transition: all 0.6s ease;
}
.header .logo {
  width: 180px;
  transition: all 0.6s ease;
}
.big-header {
  width: 100%;
  height: 88px;
  background: rgba(52, 68, 76, 0.8);
  z-index: 9999;
  position: fixed;
  transition: all 0.6s ease;
}
.big-header .logo {
  width: 240px;
  transition: all 0.6s ease;
}
.big-header .el-menu-item {
  background-color: transparent !important;
  border-radius: 0;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-right: 36px;
  padding: 0;
  text-align: center;
  height: 28px;
  line-height: 28px;
}
.nav {
  height: 100%;
}
.transparent {
  background-color: transparent !important;
}
.el-menu {
  background-color: transparent;
  border-bottom: none !important;
}
.el-menu-item {
  background-color: transparent;
  border-radius: 0;
  font-size: 16px;
  font-weight: 500;
  color: #fff !important;
  margin-right: 36px !important;
  padding: 0;
  text-align: center;
  height: 28px !important;
  line-height: 28px !important;
}
.el-menu-item.is-active {
  background-color: transparent !important;
  color: #fff !important;
  border-bottom: 2px solid #ffffff !important;
}

.el-menu-item:not(.is-disabled):focus,
.el-menu-item:not(.is-disabled):hover,
.el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
  color: #fff !important;
}
.el-menu-item.is-disabled {
  opacity: 1;
}
.nav-sign .el-button {
  background: transparent;
  color: white;
  width: 120px;
  border: 1px solid white;
}
@media only screen and (max-width: 992px) {
  .left {
    width: 180px !important;
  }
  .mid {
    display: none !important;
  }
  .right {
    display: none !important;
  }
}
@media only screen and (min-width: 992px) {
  .min-right {
    display: none !important;
  }
}
.min-menu {
  top: 60px !important;
  text-align: center;
}
</style>
