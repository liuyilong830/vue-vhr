<template>
  <div class="release-tasks">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="开始和结束时间" prop="date" class="public">
        <el-date-picker
          v-model="ruleForm.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="考勤标题" prop="title" class="public">
        <el-input placeholder="请输入考勤的标题" v-model="ruleForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="考勤内容" prop="content" class="public">
        <el-input type="textarea" :rows="4" placeholder="请输入考勤的内容" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item class="public">
        <div class="flex">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    Input,
    Button,
    Row,
    DatePicker,
    Form,
    FormItem,
  } from 'element-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'ReleaseTasks',
    components: {
      'elInput': Input,
      'elButton': Button,
      'elRow': Row,
      'elDatePicker': DatePicker,
      'elForm': Form,
      'elFormItem': FormItem,
    },
    data() {
      return {
        ruleForm: {
          title: '',
          content: '',
          date: [
            new Date(),
            new Date()
          ]
        },
        rules: {
          title: [
            { required: true, message: '请简述考勤', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入考勤的内容', trigger: 'blur' },
          ],
          date: [
            { type: 'array', required: true, message: '请选择合适的时间', trigger: 'blur' }
          ]
        },
      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {title, content, date} = this.ruleForm
            let {userid} = this.getUserInfo
            let startTime = date[0].getTime()
            let endTime = date[1].getTime()
            this.$emit('submitForm', {userid, startTime, endTime, title, content})
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  .release-tasks {
    width: 100%;
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
      }
    }
  }
</style>