<template>
  <el-card class="box-card" shadow="never">
    <div class="title" style="border-bottom: 1px solid rgb(228, 230, 235); height: 36px; margin-bottom: 8px">目录</div>
    <el-tree
      style="margin-bottom: 12px"
      ref="tree"
      id="tree"
      :data="directories"
      @node-click="goAnchor"
      highlight-current
      default-expand-all
      :expand-on-click-node="false"
      node-key="id"
      icon-class="#fff">
      <span slot-scope="{ node, data }" :id="data.id" class="el-tree-node__label">
        {{ node.label }}
      </span>
    </el-tree>
  </el-card>
</template>

<script>
export default {
  props: {
    parentClass: {
      // 文章标题的父元素类名
      type: String,
      default: 'article-content'
    }
  },
  // 挂载页面时，添加监听滚动条，
  mounted() {
    // 获取文章标题
    this.getDirectories()
    window.addEventListener('scroll', this.handleScroll)
  },
  // 退出页面时，应该取消监听
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data() {
    return {
      directories: [], // 所有h1 h2标题
      offsetMap: new Map()
    }
  },
  methods: {
    getDirectories() {
      // 文章中所有的h1，h2标签
      const titleDomAll = document.querySelectorAll(`.${this.parentClass} h1, .${this.parentClass} h2`)

      // 循环h1 ，h2标签
      for (let i = 0, len = titleDomAll.length; i < len; i++) {
        let el = titleDomAll[i] // 每个元素对象
        // 封装目录对象
        let dir = {
          tagName: el.tagName,
          id: 'bald-tree-' + i,
          label: el.innerText, // 标签体内容
          offsetTop: el.offsetTop, //记录当前h1标签距离顶部偏移量，方便后面计算滚动距离。
          children: [] // 存 h2
        }
        this.offsetMap.set(dir.offsetTop, dir.id)
        if (el.tagName === 'H1') {
          this.directories.push(dir)
          continue
        }
        // 获取数组中当前的最后一个元素（h1）数据
        let lastH1 = this.directories[this.directories.length - 1]
        // 当前是 h2 标签，且上一个是 h1 标签，如果上一个不是 h1 则忽略它
        if (el.tagName === 'H2' && lastH1 && lastH1.tagName === 'H1') {
          // 将 h2 将到 h1 的children中
          lastH1.children.push(dir)
        }
      }
    },
    goAnchor(data) {
      // 跳转文章锚点位置
      document.documentElement.scrollTop = data.offsetTop
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop
      const reverseKeys = [...this.offsetMap.keys()].reverse()
      for (let n of reverseKeys) {
        if (scrollTop >= n - 10) {
          // 设置高量节点
          this.$refs.tree.setCurrentKey(this.offsetMap.get(n))
          break
        }
      }
    }
  }
}
</script>
<style scoped>
::v-deep.box-card .el-card__body {
  padding: 10px 16px;
}

/* 点击后灰色背景色，移动它其他节点时去除这个灰色 */
::v-deep.el-tree .el-tree-node:focus > .el-tree-node__content {
  background: transparent;
}

::v-deep.el-tree .el-tree-node__expand-icon {
  display: none;
}

::v-deep.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: transparent;
  color: rgb(0, 127, 255);
  font-weight: 500;
  border-radius: 4px;
  margin-right: 10px;
}
</style>
