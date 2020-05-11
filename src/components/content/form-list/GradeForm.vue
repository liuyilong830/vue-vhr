<template>
  <div class="grade-form">
    <el-form label-position="left" ref="ruleForm" label-width="100px" :model="ruleForm" :rules="rules">
      <div class="flex">
        <el-form-item class="public" label="姓名:" prop="sname">
          <el-input v-model="ruleForm.sname" placeholder="请输入姓名" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item class="public" label="课程名:" prop="cname">
          <el-select v-model="ruleForm.cname" filterable placeholder="请输入课程名">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="public" label="指导老师:" prop="tname">
          <el-input v-model="ruleForm.tname" placeholder="请输入指导老师姓名"></el-input>
        </el-form-item>
        <el-form-item class="public" label="成绩:" prop="score">
          <el-input v-model.number="ruleForm.score" placeholder="请输入成绩"></el-input>
        </el-form-item>
      </div>
      <el-form-item class="public" label="等级:" prop="level">
        <el-radio-group v-model="ruleForm.level">
          <el-radio label="不及格">不及格</el-radio>
          <el-radio label="及格">及格</el-radio>
          <el-radio label="中等">中等</el-radio>
          <el-radio label="良好">良好</el-radio>
          <el-radio label="优秀">优秀</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="public">
        <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    Form,
    FormItem,
    Input,
    Radio,
    RadioGroup,
    Button,
    Select,
    Option,
  } from 'element-ui'
  import {mapGetters, mapActions} from "vuex";
  export default {
    name: 'GradeForm',
    components: {
      'elForm': Form,
      'elFormItem': FormItem,
      'elInput': Input,
      'elRadio': Radio,
      'elRadioGroup': RadioGroup,
      'elButton': Button,
      'elSelect': Select,
      'elOption': Option,
    },
    data() {
      // 成绩的范围
      let effectScore = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('成绩不能为空'));
        } else if (value < 0 || value > 100) {
          return callback(new Error('成绩的范围在0~100之间'));
        } else {
          callback()
        }
      }
      // 验证是否存在该学员
      let testStu = async (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学员姓名不能为空'))
        } else if (value.length < 2 || value.length > 5) {
          return callback(new Error('长度在 2 到 5 个字符'))
        }
        let result = await this.reqStuBySname(value)
        if (result) {
          this.ruleForm.userid = result.data.items[0].userid
          return callback()
        } else {
          return callback(new Error('没有该学员'))
        }
      }
      return {
        ruleForm: {
          sname: '',
          cname: '',
          tname: '',
          score: 60,
          level: '及格',
          userid: ''
        },
        rules: {
          sname: [
            { required: true, validator: testStu, trigger: 'blur' },
          ],
          cname: [
            { required: true, message: '请输入有效的课程名称', trigger: 'blur' }
          ],
          tname: [
            { required: true, message: '请输入有效的指导老师名称', trigger: 'blur' }
          ],
          score: [
            { required: true, validator: effectScore, trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请选择一个等级', trigger: 'blur' }
          ],
        },
        options: [
          { value: 'JavaEE', label: 'JavaEE'},
        ],
        value: 'JavaEE',
      }
    },
    props: {
      checkForm: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters(['getAllCourse']),
      isDisabled() {
        return this.ruleForm.sname !== ''
      }
    },
    methods: {
      ...mapActions(['reqStuBySname']),
      /* 提交创建成绩的请求 */
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('insertGrade', {...this.ruleForm})
          }
        });
      },
      hasProperty(target) {
        this.ruleForm = {...this.ruleForm, ...target}
      },
      /* 重置表单 */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.hasProperty(this.checkForm)
      }
    },
    watch: {
      checkForm(val) {
        this.hasProperty(val)
      }
    },
    created() {
      this.hasProperty(this.checkForm)
      this.options = this.getAllCourse.map(course => ({label: course.cname, value: course.cname}))
    }
  }
</script>

<style lang="less" scoped>
  .grade-form {
    .flex {
      display: flex;
      .public {
        flex: 1;
        margin-bottom: 20px;
        margin-right: 10px;
      }
    }
  }
</style>