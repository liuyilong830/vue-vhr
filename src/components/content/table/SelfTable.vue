<template>
  <div class="self-table">
    <el-table :data="showStudents" border fit style="width: 100%" max-height="640px" :highlight-current-row="true" v-if="showStudents">
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
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改个人信息"
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
  } from 'element-ui'
  import EditInfo from "../edit-info/EditInfo";
  import {setMessage} from "../../../utils";
  import {TextToCode} from "element-china-area-data";
  import {mapGetters} from "vuex";
  export default {
    name: 'SelfTable',
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
      user: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      ...mapGetters(['getSelfInfo']),
      isType() {
        return this.getSelfInfo[0].type
      },
      // 按照指定的格式，筛选出从 prev 到 next 之间的数据用来展示，因为在分页的时候需要切换
      showStudents() {
        if (this.user[0].birthday) {
          return this.user.map(user => ({
            ...user,
            birthday: this.formatBirthday(user.birthday)
          }))
        } else {
          return this.user
        }
      },
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
      handleClick(user) {
        let arr = user.address.split('-')
        this.isEdit = true
        let address = []
        address[0] = TextToCode[arr[0]].code
        address[1] = TextToCode[arr[0]][arr[1]].code
        address[2] = TextToCode[arr[0]][arr[1]][arr[2]].code
        if (this.isType === 2) {
          let birthday = new Date(user.birthday)
          this.form = { ...user, address, birthday}
        } else if (this.isType === 1) {
          this.form = { ...user, address}
        }
      },
      // 发送更新学生信息的请求
      successForm(user) {
        this.isEdit = false
        this.$emit('successForm', user)
      },
      closeForm() {
        this.isEdit = false
      },
    }
  }
</script>

<style lang="less" scoped>
  .self-table {
  
  }
</style>