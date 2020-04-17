<template>
  <div class="table">
    <el-table :data="showStudents" border fit style="width: 100%" max-height="640px" :highlight-current-row="true" v-if="showStudents">
      <el-table-column fixed type="index" width="50"></el-table-column>
      <el-table-column fixed prop="sname" label="姓名" width="120"></el-table-column>
      <el-table-column prop="userid" label="学号" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="card" label="身份证号" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="120"></el-table-column>
      <el-table-column prop="major" label="专业" width="150"></el-table-column>
      <el-table-column prop="address" label="居住地" min-width="180"></el-table-column>
      <el-table-column prop="snative" label="籍贯" width="120"></el-table-column>
      <el-table-column prop="nation" label="民族" width="100"></el-table-column>
      <el-table-column prop="position" label="项目职位" width="140"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    Table,
    TableColumn,
    Button
  } from 'element-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Table',
    components: {
      'elTable': Table,
      'elTableColumn': TableColumn,
      'elButton': Button
    },
    data() {
      return {}
    },
    props: {
      users: {
        type: Array,
        default() {
          return []
        }
      },
      pageCount: {
        type: Number,
        default: 1
      }
    },
    computed: {
      showStudents() {
        let prev,next
        prev = (this.pageCount - 1) * 10
        next = this.pageCount * 10
        return this.users.map(user => ({
          userid: user.userid,
          sname: user.sname,
          age: user.age,
          sex: user.sex,
          card: user.card,
          phone: user.phone,
          birthday: this.formatBirthday(user.birthday),
          major: user.major,
          address: user.address,
          snative: user.snative,
          nation: user.nation,
          position: user.position
        })).filter((user,index) => index >= prev && index < next)
      },
    },
    methods: {
      // 格式化时间
      formatBirthday(time) {
        let t = new Date(time)
        return `${t.getFullYear()}-${this.formatNumber(t.getMonth() + 1)}-${this.formatNumber(t.getDate())}`
      },
      formatNumber(num) {
        if (num < 10) return '0'+ num
        return num
      },
      handleClick(row) {
        console.log(row)
      }
    },
  }
</script>

<style lang="less" scoped>
  .table {
    min-height: 640px;
  }
</style>