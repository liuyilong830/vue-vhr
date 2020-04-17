<template>
  <div class="teacher-stus-info">
    <operation
      :user-type="getUserType"
      :val="value"
      :options="options"
      @sendRequest="sendRequest"
      @changeValue="changeValue"
      @inputKeyword="inputKeyword"></operation>
    <my-table class="my-table" :pageCount="pageCount" :users="filterUsers" v-if="filterUsers.length !== 0"></my-table>
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
  import Table from "../../components/content/table/Table";
  import Operation from 'components/content/operation/Operation'
  import {mapGetters, mapActions} from 'vuex'
  import {setMessage} from '../../utils/index'
  export default {
    name: 'TeaStusInfo',
    components: {
      'myTable': Table,
      'elPagination': Pagination,
      Operation,
    },
    data() {
      return {
        value: 'sname',  // 搜索条件
        keyword: '',  // 搜素关键字
        pageCount: 1,  // 当前页码
        users: [],
        filterUsers: [],
        options: [
          { value: 'sname', label: '姓名'},
          { value: 'userid', label: '学号'},
          { value: 'address', label: '居住地'},
          { value: 'sex', label: '性别'},
          { value: 'age', label: '年龄'},
        ],
      }
    },
    computed: {
      ...mapGetters(['getUserInfo','getStudents']),
      // 当辅导员登录的时候才显示添加学生按钮和回收站里面删除的学生的按钮
      getUserType() {
        return this.getUserInfo.type === 3
      },
      // 动态设置分页器总共的页码数量
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
      ...mapActions(['reqStudents','reqInsertStu']),
      // 将子组件选择的搜索依据返回给父组件保存，可确保按照合适的要求去筛选数据
      changeValue(value) {
        this.value = value
      },
      // 将子组件输入的搜索关键字返回给父组件保存，再监听 keyword的变化进行过滤数据
      inputKeyword(value) {
        this.keyword = value
      },
      // 分页器变化的时候会触发 page为当前的页码
      currentChange(page) {
        this.pageCount = page
      },
      // 过滤掉部分学生，在分页展示和筛选的时候有用
      changeStus(page = 1, count = 10, arr) {
        let prev,next
        prev = (page - 1) * count
        next = page  * count
        return arr.filter((item,index) => index >= prev && index < next)
      },
      // 发送请求
      async sendRequest(user) {
        // 触发 actions 方法，发出请求
        let result = await this.reqInsertStu(user)
        if (result.code === 200) {
          this.filterUsers.unshift(user)
        }
        setMessage(result.message, 'success')
      }
    },
    created() {
      this.reqStudents()
    },
    watch: {
      keyword(val) {
        if (val === '') {
          return this.filterUsers = this.users
        }
        let arr = this.users.filter(user => user[this.value].includes(val))
        this.filterUsers = this.changeStus(this.pageCount, 10, arr)
      },
      getStudents(val) {
        this.users = this.filterUsers = val
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