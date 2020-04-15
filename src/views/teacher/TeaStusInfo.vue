<template>
  <div class="teacher-stus-info">
    班级学生信息
    <div class="operation"></div>
    <my-table class="my-table"></my-table>
    <div class="flex">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="60">
      </el-pagination>
      <!-- total 表示所有数据条目数，默认是一页 10 条 -->
    </div>
  </div>
</template>

<script>
  import {
    Pagination
  } from 'element-ui'
  import Table from "../../components/content/table/Table";
  export default {
    name: 'TeaStusInfo',
    components: {
      'myTable': Table,
      'elPagination': Pagination
    },
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .teacher-stus-info {
    .operation {
      height: 60px;
      margin: 15px 0;
    }
    .my-table {
      margin-bottom: 15px;
    }
    .flex {
      display: flex;
      justify-content: center;align-items: center;
    }
  }
</style>