<template>
  <div :class="isTransparent ? 'transparent big-header' : 'header slide-in-blurred-top'">
    <div class="nav">
      <el-row type="flex" style="height: 100%">
        <el-col :span="9" style="display: flex; justify-content: center; align-items: center">
          <img src="@/assets/img/logo.png" class="logo" />
        </el-col>
        <el-col class="hidden-sm-and-down" :span="11" style="display: flex; justify-content: end; align-items: center">
          <el-menu :default-active="activeRoute" class="menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/label">标签</el-menu-item>
            <el-menu-item index="/life">生活</el-menu-item>
            <el-menu-item index="/about">关于我</el-menu-item>
            <el-menu-item index="/message">留言板</el-menu-item>
            <el-menu-item index="/hi">Hi,同学！</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :xs="18" :span="6" style="display: flex; justify-content: start; align-items: center">
          <div class="nav-sign mr-4">
            <div v-if="!userInfo">
              <el-button click="$store.dispatch('toLoginPage')">立即登录</el-button>
            </div>
            <el-dropdown trigger="click" @command="handleCommand" v-if="userInfo">
              <span class="el-dropdown-link">
                <el-avatar :src="userInfo.imageUrl"></el-avatar>
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
    notOpen() {
      this.$alert('该模块暂时没有开放哦', 'Hi,同学!', {
        confirmButtonText: '确定',
        callback: () => {
          location.reload()
        }
      })
    },
    handleScroll() {
      const whiteList = ['/user', '/note/edit', '/life/edit', '/404']
      if (window.scrollY >= 200 || whiteList.includes(this.$route.path)) {
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
  height: 68px;
  background: rgba(52, 68, 76, 0.8);
  z-index: 9999;
  position: fixed;
}
.header .logo {
  width: 180px;
}
.big-header {
  width: 100%;
  height: 80px;
  background: rgba(52, 68, 76, 0.8);
  z-index: 9999;
  position: fixed;
}
.big-header .logo {
  height: 100%;
}
.big-header .el-menu-item {
  background-color: transparent !important;
  border-radius: 0;
  font-size: 15px;
  color: #fff;
  margin-right: 36px;
  padding: 0;
  text-align: center;
  height: 32px;
  line-height: 32px;
}
.nav {
  height: 100%;
}
.transparent {
  background-color: transparent !important;
}
.slide-in-blurred-top {
  animation: slide-in-blurred-top 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
}
@keyframes slide-in-blurred-top {
  0% {
    transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 0%;
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
}
.el-menu {
  background-color: transparent;
  border-bottom: none;
}
.el-menu-item {
  background-color: transparent;
  border-radius: 0;
  font-size: 15px;
  color: #fff;
  margin-right: 36px;
  padding: 0;
  text-align: center;
  height: 32px;
  line-height: 32px;
}
.el-menu-item.is-active {
  background-color: transparent;
  color: #fff;
  border-bottom: 2px solid #ffffff;
}

.el-menu-item:not(.is-disabled):focus,
.el-menu-item:not(.is-disabled):hover,
.el-submenu .el-submenu__title:hover {
  background-color: transparent;
  color: #fff;
}
.el-menu-item.is-disabled {
  opacity: 1;
}
.el-button {
  background: transparent;
  color: white;
  width: 120px;
  border: 1px solid white;
}
</style>
