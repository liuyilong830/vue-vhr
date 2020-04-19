<template>
  <div class="form-list">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div v-if="isType === 2">
        <div class="public">
          <el-form-item label="学生姓名" prop="sname">
            <el-input v-model="ruleForm.sname"></el-input>
          </el-form-item>
          <el-form-item label="学生学号" prop="userid">
            <el-input v-model="ruleForm.userid" maxlength="12" show-word-limit></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="card">
            <el-input v-model="ruleForm.card" maxlength="18" show-word-limit></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" maxlength="11" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="ruleForm.position" maxlength="10" show-word-limit></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker type="date" placeholder="选择出生日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="ruleForm.major" maxlength="20" show-word-limit></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="民族" prop="nation">
            <el-input v-model="ruleForm.nation"></el-input>
          </el-form-item>
          <el-form-item label="籍贯" prop="snative">
            <el-input v-model="ruleForm.snative"></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="居住地" prop="address">
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.address"
              separator="-">
            </el-cascader>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div v-if="isType === 1">
        <div class="public">
          <el-form-item label="老师姓名" prop="tname">
            <el-input v-model="ruleForm.tname"></el-input>
          </el-form-item>
          <el-form-item label="学生学号" prop="userid">
            <el-input v-model="ruleForm.userid" maxlength="12" show-word-limit></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" maxlength="11" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="card">
            <el-input v-model="ruleForm.card" maxlength="18" show-word-limit></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="政治面貌" prop="polity">
            <el-input v-model="ruleForm.polity"></el-input>
          </el-form-item>
          <el-form-item label="籍贯" prop="tnative">
            <el-input v-model="ruleForm.tnative"></el-input>
          </el-form-item>
        </div>
        <div class="public">
          <el-form-item label="居住地" prop="address">
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.address"
              separator="-">
            </el-cascader>
          </el-form-item>
        </div>
      </div>
      <div class="flex">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { regionData, CodeToText } from 'element-china-area-data'
  import {
    Form,
    FormItem,
    Button,
    Input,
    RadioGroup,
    Radio,
    Col,
    DatePicker,
    TimePicker,
    Cascader
  } from 'element-ui'
  import {mapGetters} from "vuex";
  export default {
    name: 'FormList',
    components: {
      'elForm': Form,
      'elFormItem': FormItem,
      'elButton': Button,
      'elInput': Input,
      'elRadioGroup': RadioGroup,
      'elRadio': Radio,
      'elCol': Col,
      'elDatePicker': DatePicker,
      'elTimePicker': TimePicker,
      'elCascader': Cascader
    },
    data() {
      return {
        options: regionData,
        ruleForm: {},
        rules: {},
      }
    },
    computed: {
      ...mapGetters(['getUsers']),
      isType() {
        return this.getUsers[0].type
      },
      setRuleForm() {
        if (this.isType === 2) {
          return {
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
          }
        } else if (this.isType === 1) {
          return {
            tname: '',
              userid: '',
              card: '',
              phone: '',
              address: [],
              tnative: ''
          }
        }
      },
      setRules() {
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
        if (this.isType === 2) {
          return {
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
          }
        } else if (this.isType === 1) {
          return {
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
          }
        }
      },
      // 格式化时间
      formatBirthday() {
        let time = new Date(this.ruleForm.birthday)
        return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
      },
    },
    methods: {
      // 点击创建的时候触发
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // 如果没有选择居住地则不进行下一步，到时候写进规则中去
          if (this.ruleForm.address.length === 0) return
          if (valid) {
            /* 表单验证成功，则先把数据进行处理成符合发送请求的条件 */
            let address = this.ruleForm.address.map(item => CodeToText[item]).join('-')
            if (this.isType === 2) {
              let birthday = this.formatBirthday
              /* 传递给父组件发送请求 */
              this.$emit('successForm', {...this.ruleForm, address, type: 2, birthday})
            } else if (this.isType === 1) {
              this.$emit('successForm', {...this.ruleForm, address, type: 1})
            }
          }
        });
      },
      // 点击重置按钮触发
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.ruleForm = this.setRuleForm
      this.rules = this.setRules
    }
  }
</script>

<style lang="less" scoped>
  .form-list {
    .public {
      display: flex;
      justify-content: space-evenly;
      .el-form-item {
        flex: 1;
      }
    }
    .flex {
      display: flex;
      justify-content: center;
    }
  }
</style>