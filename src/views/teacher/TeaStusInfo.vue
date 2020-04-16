<template>
  <div class="teacher-stus-info">
    <operation :user-type="getUserType"></operation>
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
  import Operation from 'components/content/operation/Operation'
  import {mapGetters} from 'vuex'
  import {setMessage} from "../../utils";
  export default {
    name: 'TeaStusInfo',
    components: {
      'myTable': Table,
      'elPagination': Pagination,
      Operation,
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      getUserType() {
        return this.getUserInfo.type === 3
      }
    }
  }
</script>

<style lang="less" scoped>
  .teacher-stus-info {
    position: relative;
    .operation {
      height: 60px;
      margin: 15px 0;
    }
    .my-table {
      margin-bottom: 15px;
    }
    .flex {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -75px;
    }
  }
</style>