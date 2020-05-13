<template>
  <div class="student-result" v-if="grades.length !== 0">
    <div class="public">
      <el-table :data="grades" stripe style="width: 100%" :fit="false" max-height="600" border>
        <el-table-column prop="sname" label="姓名"></el-table-column>
        <el-table-column prop="cname" label="课程名"></el-table-column>
        <el-table-column prop="tname" label="指导老师"></el-table-column>
        <el-table-column prop="score" label="最终成绩"></el-table-column>
        <el-table-column prop="level" label="等级"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {
    Table,
    TableColumn,
  } from 'element-ui'
  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: 'stuResult',
    components: {
      'elTable': Table,
      'elTableColumn': TableColumn,
    },
    data() {
      return {
        grades: []
      }
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getGrades'])
    },
    methods: {
      ...mapActions(['reqGetGradeByUserid'])
    },
    watch: {
      getGrades(val) {
        this.grades = val
      }
    },
    created() {
      let {userid} = this.getUserInfo
      this.reqGetGradeByUserid(userid)
    }
  }
</script>

<style lang="less" scoped>
  .student-result {
    .public {
      height: 650px;
      box-sizing: border-box;
      padding: 50px 100px 0;
    }
  }
</style>