<template>
  <div class="grade-table">
    <el-table :data="gradesData" ref="table" @expand-change="expandChange" max-height="400" highlight-current-row>
      <el-table-column property="sname" label="姓名" width="200" prop="sname"></el-table-column>
      <el-table-column property="cname" label="课程名称" width="150" prop="cname"></el-table-column>
      <el-table-column property="tname" label="指导老师" prop="tname"></el-table-column>
      <el-table-column property="score" label="成绩" prop="score"></el-table-column>
      <el-table-column property="level" label="等级" prop="level"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" ref="ruleForm" label-width="100px" :model="props.row" :rules="rules">
            <div class="flex">
              <el-form-item class="public" label="姓名:">
                <el-input v-model="props.row.sname" placeholder="请输入姓名" disabled></el-input>
              </el-form-item>
              <el-form-item class="public" label="课程名:">
                <el-input v-model="props.row.cname" placeholder="请输入课程名" disabled></el-input>
              </el-form-item>
            </div>
            <div class="flex">
              <el-form-item class="public" label="指导老师:">
                <el-input v-model="props.row.tname" placeholder="请输入指导老师姓名" disabled></el-input>
              </el-form-item>
              <el-form-item class="public" label="成绩:" prop="score">
                <el-input v-model.number="props.row.score" placeholder="请输入成绩" :disabled="isdisable"></el-input>
              </el-form-item>
            </div>
            <el-form-item class="public" label="等级:" prop="level">
              <el-radio-group v-model="props.row.level" :disabled="isdisable">
                <el-radio label="不及格">不及格</el-radio>
                <el-radio label="及格">及格</el-radio>
                <el-radio label="中等">中等</el-radio>
                <el-radio label="良好">良好</el-radio>
                <el-radio label="优秀">优秀</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="public">
              <el-button type="primary" @click="onSubmit('ruleForm')">保存修改</el-button>
              <el-button @click="edithandle">{{isdisable? '编 辑': '取消编辑'}}</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Radio,
    RadioGroup,
    Button
  } from 'element-ui'
  export default {
    name: 'GradeTable',
    components: {
      'elTable': Table,
      'elTableColumn': TableColumn,
      'elForm': Form,
      'elFormItem': FormItem,
      'elInput': Input,
      'elRadio': Radio,
      'elRadioGroup': RadioGroup,
      'elButton': Button,
    },
    data() {
      return {
        gradesData: [],
        rules: {
          score: [{ required: true, message: '请输入正确的成绩', trigger: 'blur' }],
          level: [{ required: true, message: '请输入正确的等级', trigger: 'blur' }],
        },
        isdisable: true,
        cloneGrades: [],
        currentRow: {}
      }
    },
    props: {
      grades: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      /* 初始化值 */
      getGradesData(grades) {
        let {sname, userid} = {...grades}
        this.gradesData = []
        grades.courses.forEach(grade => {
          let { cname, tname, score, level} = grade
          this.gradesData.push({sname, tname, cname, score, level, userid})
        })
        this.cloneGrades = this.cloneProterty(this.gradesData)
      },
      /* 提交 */
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isdisable = true
            let index = this.cloneGrades.findIndex(item => item.cname === this.currentRow.cname)
            let {score, level} = this.cloneGrades[index]
            if (score === this.currentRow.score && level === this.currentRow.level) {
              return this.$emit('successEdit', null)
            }
            this.cloneGrades[index] = this.currentRow
            this.$emit('successEdit', this.currentRow)
          }
        });
      },
      /* 修改的时候的处理 */
      edithandle() {
        if (!this.isdisable) {
          let {cname, score, level} = this.currentRow
          let obj = this.cloneGrades.find(item => item.cname === cname)
          if(obj.score !== score || obj.level !== level) {
            this.currentRow.score = obj.score
            this.currentRow.level = obj.level
          }
        }
        this.isdisable = !this.isdisable
      },
      /* 保证每次只展开一行的数据 */
      expandChange(row, expandedRows) {
        if (expandedRows.length !== 1) {
          let other = expandedRows.find(item => item.cname !== row.cname)
          this.$refs.table.toggleRowExpansion(other, false)
        }
        this.currentRow = row
      },
      /* 深拷贝 */
      cloneProterty(target) {
        let start
        let _toString = Object.prototype.toString
        if (_toString.call(target) === '[object Array]') {
          start = []
          for (let index in target) {
            start[index] = this.cloneProterty(target[index])
          }
        } else if (_toString.call(target) === '[object Object]') {
          let arr = Object.keys(target)
          start = {}
          for (let key of arr) {
            start[key] = this.cloneProterty(target[key])
          }
        } else {
          return target
        }
        return start
      }
    },
    watch: {
      grades(val) {
        this.getGradesData(val)
      }
    },
    created() {
      this.getGradesData(this.grades)
    }
  }
</script>

<style lang="less" scoped>
  .grade-table {
    .flex {
      display: flex;
      .public {
        flex: 1;
        margin-bottom: 10px;
        margin-right: 10px;
      }
    }
    .public {
      margin-bottom: 10px;
    }
  }
</style>