<template>
  <div class="admin-students-info">
    <operation
      :val="value"
      :options="options"
      v-if="getUsers.length !== 0"
      @sendRequest="sendRequest"
      @changeValue="changeValue"
      @inputKeyword="inputKeyword">
    </operation>
    <table-pagination :filterUsers="filterUsers" @setPageCount="setPageCount"></table-pagination>
  </div>
</template>

<script>
  import {setMessage} from "../../utils";
  import {mapActions, mapGetters} from "vuex";
  
  import Operation from "../../components/content/operation/Operation";
  import TablePagination from "../../components/content/table-pagination/TablePagination";
  export default {
    name: 'AdminStusInfo',
    components: {
      Operation,
      TablePagination
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
      ...mapGetters(['getUserInfo','getUsers']),
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
      // 子组件触发了切换页码，则会传递到这里将它保存，用于在监听器中监听
      setPageCount(page) {
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
      getUsers(val) {
        this.users = this.filterUsers = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .admin-students-info {
    position: relative;
    height: calc(100% - 60px);
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
      bottom: 0px;
    }
  }
</style>