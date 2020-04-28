<template>
  <!-- 将 table组件和分页器封装在一起使用 -->
  <div class="table-pagination">
    <my-table
      class="my-table"
      :pageCount="pageCount"
      :users="filterUsers"
      v-on="$listeners"
      v-if="this.filterUsers.length !== 0"></my-table>
    <div class="flex">
      <el-pagination
        v-if="paginationCount"
        background
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="paginationCount">
      </el-pagination>
      <!-- total 表示所有数据条目数，默认是一页 10 条 -->
    </div>
  </div>
</template>

<script>
  import {
    Pagination
  } from 'element-ui'
  import Table from "../table/Table";
  export default {
    name: 'TablePagination',
    components: {
      'elPagination': Pagination,
      'myTable': Table
    },
    data() {
      return {
        pageCount: 1
      }
    },
    props: {
      filterUsers: {
        type: Array,
        default() {
          return []
        }
      },
    },
    computed: {
      paginationCount() {
        let count = 0
        let len = this.filterUsers.length
        if (len !== 0) {
          count = Math.ceil(len / 10) * 10
        }
        return count
      }
    },
    methods: {
      currentChange(page) {
        this.pageCount = page
        this.$emit('setPageCount', page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .table-pagination {
    margin-top: 15px;
    .my-table {
      margin-bottom: 15px;
    }
    .flex {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
    }
  }
</style>