<template>
  <div class="admin-teachers-Info">
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
  import Operation from 'components/content/operation/Operation'
  import TablePagination from 'components/content/table-pagination/TablePagination'
  import {mapActions, mapGetters} from "vuex";
  import {setMessage} from '../../utils/index'

  export default {
    name: 'AdminTeachersInfo',
    components: {
      Operation,
      TablePagination,
    },
    data() {
      // 验证手机号
      let testPhone = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入手机号'))
        }
        if (!/^1[345678]\d{9}/.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      // 验证学号
      let testUserid = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入学生的学号'))
        } else if (value[0] !== '1') {
          return callback(new Error('学生学号是以1开头数'))
        } else {
          callback()
        }
      }
      // 验证居住地
      let testAddress = (rule, value, callback) => {
        if (value.length === 0) {
          return callback(new Error('请选择居住地'))
        } else {
          callback()
        }
      }
      return {
        users: [],
        options: [
          { value: 'tname', label: '姓名'},
          { value: 'userid', label: '学号'},
          { value: 'address', label: '居住地'},
        ],
        value: 'tname',  // 搜索条件
        keyword: '',  // 搜素关键字
        filterUsers: [],
        pageCount: 1,
        ruleForm: {
          tname: '',
          userid: '',
          card: '',
          phone: '',
          address: [],
          tnative: ''
        },
        rules: {
          tname: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          userid: [
            { required: true, validator: testUserid, trigger: 'blur' }
          ],
          card: [
            { required: true, message: '请输入身份证号码', trigger: 'change' },
            { message: '长度为18位的有效身份证号码', trigger: 'change'}
          ],
          phone: [
            { required: true, validator: testPhone, trigger: 'blur'}
          ],
          address: [
            { required: true, type: 'array', validator: testAddress, trigger: 'blur' }
          ],
          tnative: [
            { message: '请输入您的籍贯', trigger: 'blur' }
          ]
        },
      }
    },
    computed: {
      ...mapGetters(['getUsers']),
    },
    methods: {
      ...mapActions(['reqGetTeas']),
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
      // 添加请求
      sendRequest(user) {
    
      },
    },
    watch: {
      // 监听关键字的变化，并作出相应的改变
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
    },
    created() {
      this.reqGetTeas()
    }
  }
</script>

<style lang="less" scoped>
  .admin-teachers-Info {
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