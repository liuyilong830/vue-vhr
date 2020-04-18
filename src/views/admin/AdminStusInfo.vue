<template>
  <div class="admin-students-info">
    <operation
      :val="value"
      :options="options"
      @sendRequest="sendRequest"
      @changeValue="changeValue"
      @inputKeyword="inputKeyword">
    </operation>
    <table-pagination :ruleForm="ruleForm" :rules="rules" :filterUsers="filterUsers" @setPageCount="setPageCount"></table-pagination>
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
        } else if (value[0] !== '2' || value.length !== 12) {
          return callback(new Error('学生学号是以2开头的12位数'))
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
        ruleForm: {
          sname: '',
          userid: '',
          age: 18,
          card: '',
          phone: '',
          major: '',
          address: [],
          snative: '',
          nation: '',
          position: '',
          birthday: '',
          sex: '男'
        },
        rules: {
          sname: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          userid: [
            { required: true, validator: testUserid, trigger: 'blur' }
          ],
          birthday: [
            { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
          ],
          age: [
            { type: 'number', message: '年龄不能为空'},
          ],
          sex: [
            { message: '请选择性别', trigger: 'change' }
          ],
          card: [
            { required: true, message: '请输入身份证号码', trigger: 'change' },
            { message: '长度为18位的有效身份证号码', trigger: 'change'}
          ],
          phone: [
            { required: true, validator: testPhone, trigger: 'blur'}
          ],
          major: [
            { message: '请输入您的专业名称', trigger: 'blur' }
          ],
          address: [
            { required: true, type: 'array', validator: testAddress, trigger: 'blur' }
          ],
          snative: [
            { message: '请输入您的籍贯', trigger: 'blur' }
          ],
          nation: [
            { message: '请输入您的民族', trigger: 'blur' }
          ],
          position: [
            { message: '请输入您的职位', trigger: 'blur' }
          ]
        },
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