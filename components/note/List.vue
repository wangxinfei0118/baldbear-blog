<template>
    <div>
        <el-table class="label-list"
            :show-header="false"
            :data="listData"
            style="width: 100%">
            <el-table-column width="180">
                <template slot-scope="scope">
                        <img style="width: 100%" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674108919&t=9531c288f275ec1e9eb3fadc6a07a48d">
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <h2 class="title" style="margin-bottom: 5px">
                        <nuxt-link :to="'/note/' + scope.row.id" target="_blank">
                            {{ scope.row.title }}
                        </nuxt-link>
                    </h2>
                    <div style="margin-bottom: 12px">
                      {{ scope.row.summary }}
                    </div>
                    <div class="info">
                        <i class="el-icon-date"></i> {{ getDateFormat( scope.row.updateDate ) }}
                      <i class="el-icon-chat-line-round"></i> {{ scope.row.chatCount }}
                      <i class="el-icon-view"></i> {{ scope.row.viewCount }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
       <!-- 分页 -->
       <el-row type="flex" justify="center">
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-size="page.size"
              :total="page.total"
              background
              layout="prev, pager, next"
              prev-text=" 上一页 "
              next-text=" 下一页 "
            >
          </el-pagination>
        </el-row>
    </div>
</template>
<script>
import {dateFormat} from '@/utils/date'

export default {
  props: {
    listData: { // 列表数据
      type: Array
    },
    page: { // 分页对象
      type: Object,
      default: () => {
        return {
          size: 20,
          total: 1,
          current: 1
        }
      }
    }
  },

  methods: {
    // 当页码改变后,被触发
    handleCurrentChange(current) {
        this.$emit('fetch-data', current)
    },
    // 格式化日期
    getDateFormat(date) {
      return dateFormat(date)
    }
  }

}
</script>

<style scoped>
.label-breadcrumb {
    margin: 10px;
}
.label-tab{
    margin-top: 30px
}
::v-deep.el-table tr{
  background-color: rgba(181, 181, 181,0.3);
}

.label-list .count {
    text-align: center;
    height: 100%;
    line-height: 20px;
}
.label-list .info {
    color: #999;
    font-size: 13px;
}
.label-list .title {
    display: inline-block;
    margin: 0 5px 0 0;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
}
a:hover{
  text-decoration-line: underline;
}
.el-row {
  margin-top: 30px;
}
</style>
