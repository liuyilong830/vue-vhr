<template>
  <div class="table">
    <el-table :data="showStudents" border fit style="width: 100%" max-height="640px" :highlight-current-row="true" v-if="showStudents">
      <el-table-column fixed type="index" :index="startIndex" width="50"></el-table-column>
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
      }
    },
    computed: {
      // 按照指定的格式，筛选出从 prev 到 next 之间的数据用来展示，因为在分页的时候需要切换
      showStudents() {
        let prev,next
        prev = (this.pageCount - 1) * 10
        next = this.pageCount * 10
        return this.users.map(user => ({
          ...user,
          birthday: this.formatBirthday(user.birthday)
        })).filter((user,index) => index >= prev && index < next)
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