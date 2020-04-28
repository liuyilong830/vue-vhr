<template>
  <div class="table">
    <el-table :data="showStudents" border fit style="width: 100%" max-height="640px" :highlight-current-row="true" v-if="showStudents">
      <el-table-column fixed type="index" :index="startIndex" width="50"></el-table-column>
      <el-table-column fixed prop="sname" label="姓名" width="120" v-if="showStudents[0].sname !== undefined"></el-table-column>
      <el-table-column fixed prop="tname" label="姓名" width="120" v-if="showStudents[0].tname !== undefined"></el-table-column>
      <el-table-column prop="userid" label="学号" width="150" v-if="showStudents[0].userid !== undefined"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80" v-if="showStudents[0].age !== undefined"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80" v-if="showStudents[0].sex !== undefined"></el-table-column>
      <el-table-column prop="card" label="身份证号" width="200" v-if="showStudents[0].card !== undefined"></el-table-column>
      <el-table-column prop="polity" label="政治面貌" width="120" v-if="showStudents[0].polity !== undefined"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120" v-if="showStudents[0].phone !== undefined"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="120" v-if="showStudents[0].birthday !== undefined"></el-table-column>
      <el-table-column prop="major" label="专业" width="150" v-if="showStudents[0].major !== undefined"></el-table-column>
      <el-table-column prop="address" label="居住地" min-width="180" v-if="showStudents[0].address !== undefined"></el-table-column>
      <el-table-column prop="snative" label="籍贯" width="120" v-if="showStudents[0].snative !== undefined"></el-table-column>
      <el-table-column prop="tnative" label="籍贯" width="120" v-if="showStudents[0].tnative !== undefined"></el-table-column>
      <el-table-column prop="nation" label="民族" width="100" v-if="showStudents[0].nation !== undefined"></el-table-column>
      <el-table-column prop="position" label="项目职位" width="140" v-if="showStudents[0].position !== undefined"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" v-if="getUserType">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑学生"
      :visible.sync="isEdit"
      :destroy-on-close="true"
      width="900px"
      center>
      <edit-info @successForm="successForm" @closeForm="closeForm" :ruleForm="form"></edit-info>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Table,
    TableColumn,
    Button,
    Dialog,
    MessageBox
  } from 'element-ui'
  import {mapActions, mapGetters} from 'vuex'
  import {TextToCode} from "element-china-area-data";
  import {setMessage} from '../../../utils/index'
  
  import EditInfo from "../edit-info/EditInfo";
  export default {
    name: 'Table',
    components: {
      'elTable': Table,
      'elTableColumn': TableColumn,
      'elButton': Button,
      'elDialog': Dialog,
      EditInfo
    },
    data() {
      return {
        isEdit: false,
        form: {}
      }
    },
    props: {
      // 所有用户信息组成的数组
      users: {
        type: Array,
        default() {
          return []
        }
      },
      // 父组件中传递下来的当前分页数字
      pageCount: {
        type: Number,
        default: 1
      },
    },
    computed: {
      ...mapGetters(['getUserInfo','getUsers']),
      isType() {
        return this.getUsers[0].type
      },
      // 当辅导员登录的时候才显示添加学生按钮和回收站里面删除的学生的按钮
      getUserType() {
        return this.getUserInfo.type === 3
      },
      // 按照指定的格式，筛选出从 prev 到 next 之间的数据用来展示，因为在分页的时候需要切换
      showStudents() {
        let prev,next
        prev = (this.pageCount - 1) * 10
        next = this.pageCount * 10
        if (this.users[0].birthday) {
          return this.users.map(user => ({
            ...user,
            birthday: this.formatBirthday(user.birthday)
          })).filter((user,index) => index >= prev && index < next)
        } else {
          return this.users.filter((user,index) => index >= prev && index < next)
        }
      },
      // 由于展示的数据是过滤后的10个以内的数组，而不是总数组，所有需要自定义索引值作为序列号
      startIndex() {
        return (this.pageCount - 1) * 10 + 1
      }
    },
    methods: {
      // 格式化时间
      formatBirthday(time) {
        let t = new Date(time)
        return `${t.getFullYear()}-${this.formatNumber(t.getMonth() + 1)}-${this.formatNumber(t.getDate())}`
      },
      // 对应 0~9 之间的数字需要改变成 00~09
      formatNumber(num) {
        if (num < 10) return '0'+ num
        return num
      },
      // 点击编辑按钮，打开编辑学生窗口，同时将该学生的信息显示在窗口对应的位置
      handleClick(row) {
        let arr = row.address.split('-')
        let address = []
        address[0] = TextToCode[arr[0]].code
        address[1] = TextToCode[arr[0]][arr[1]].code
        address[2] = TextToCode[arr[0]][arr[1]][arr[2]].code
        if (this.isType === 2) {
          let birthday = new Date(row.birthday)
          this.form = { ...row, address, birthday}
        } else if (this.isType === 1) {
          this.form = { ...row, address}
        }
        this.isEdit = true
      },
      // 发送更新学生信息的请求
      successForm(user) {
        // 关闭弹窗
        this.isEdit = false
        // 将更新的操作留给最外层组件处理
        this.$emit('successForm', user)
      },
      closeForm() {
        this.isEdit = false
      },
      deleteUser(user) {
        // 将删除的操作留给最外层组件处理
        this.$emit('deleteUser', user)
      }
    },
  }
</script>

<style lang="less" scoped>
  .table {
  
  }
</style>