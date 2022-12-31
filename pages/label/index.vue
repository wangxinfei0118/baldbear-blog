<template>
  <div class="label-main">
    <el-row :gutter="10">
      <el-col v-for="(category, index) in data" :key="index" :xs="24" :sm="24" :md="6">
        <el-card shadow="hover">
          <!-- 类别名 -->
          <div slot="header">
            <span>{{ category.name }}</span>
          </div>
          <!-- 类别下的标签 -->
          <div>
            <nuxt-link v-for="label in category.labelList" :key="label.id"
                       :to="{path: `/label/${label.id}`, query: {name: label.name}}">
              <el-tag size="small">
                {{ label.name }}
              </el-tag>
            </nuxt-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {

  async asyncData({app}) {

    const data = [
      {
        id:1,
        name:'前端基础',
        labelList:[
          {
            id:10,
            name: 'html'
          },
          {
            id:11,
            name: 'css'
          },          {
            id:12,
            name: 'js'
          }
        ]
      },
      {
        id:1,
        name:'前端基础',
        labelList:[
          {
            id:10,
            name: 'html'
          },
          {
            id:11,
            name: 'css'
          },          {
            id:12,
            name: 'js'
          }
        ]
      },
      {
        id:1,
        name:'前端基础',
        labelList:[
          {
            id:10,
            name: 'html'
          },
          {
            id:11,
            name: 'css'
          },          {
            id:12,
            name: 'js'
          }
        ]
      },
      {
        id:1,
        name:'前端基础',
        labelList:[
          {
            id:10,
            name: 'html'
          },
          {
            id:11,
            name: 'css'
          },          {
            id:12,
            name: 'js'
          }
        ]
      },
    ]
    return {data}
  },

}
</script>
<style scoped>
.label-main {
  height: 100vh;
  background-image: url("@/assets/img/1.png");
  background-size: cover;
}

.el-row {
  width: 100%;
  padding: 96px 32px;
}

.el-col {
  margin-bottom: 20px;
}

.el-tag {
  margin-right: 5px;
  font-size: 16px;
}

.el-tag:hover {
  border-bottom: 1px solid #345DC2;
}

.el-card {
  height: 200px;
  background-color: rgba(119,136,153,0.5);
  color: white;
  text-align: center;
}

</style>
