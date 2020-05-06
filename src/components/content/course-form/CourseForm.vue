<template>
  <div class="course-form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" label-position='right' class="form-list">
      <el-form-item label="课程号" prop="cno">
        <el-input type="text" placeholder="请输入课程号" v-model="ruleForm.cno" :disabled="!changeType"></el-input>
      </el-form-item>
      <el-form-item label="课程名称" prop="cname" placeholder="请输入课程名称" v-if="changeType">
        <el-input type="text" v-model="ruleForm.cname"></el-input>
      </el-form-item>
      <el-form-item label="课程图片" prop="img" placeholder="请输入课程名称">
        <my-upload @upLoadImg="upLoadImg" @deleteImg="deleteImg" :img="ruleForm.img"></my-upload>
      </el-form-item>
      <el-form-item label="上课地点" prop="place">
        <el-select v-model="ruleForm.place" placeholder="请选择上课地点" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期考方式" prop="method">
        <el-radio-group v-model="ruleForm.method">
          <el-radio label="机考">机考</el-radio>
          <el-radio label="纸考">纸考</el-radio>
          <el-radio label="田径场">田径场</el-radio>
          <el-radio label="网考">网考</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课程概要" prop="content">
        <el-input
          type="textarea"
          placeholder="请输入课程概要"
          v-model="ruleForm.content"
          :rows="7"
          maxlength="220"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    Form,
    FormItem,
    Button,
    Input,
    Radio,
    RadioGroup,
    ButtonGroup,
    Select,
    Option,
  } from 'element-ui'
  import Upload from "../../comment/upload-img/Upload";
  import {mapGetters, mapActions} from "vuex";
  export default {
    name: 'CourseForm',
    components: {
      'elForm': Form,
      'elFormItem': FormItem,
      'elButton': Button,
      'elInput': Input,
      'elRadio': Radio,
      'elRadioGroup': RadioGroup,
      'elButtonGroup': ButtonGroup,
      'elButton': Button,
      'elSelect': Select,
      'elOption': Option,
      'myUpload': Upload,
    },
    data() {
      return {
        ruleForm: {
          id: 0,
          cno: '',
          place: '',
          method: '',
          content: '',
          cname: '',
          img: ''
        },
        rules: {
          place: [
            { required: true, message: '请输入上课地点', trigger: 'blur' },
          ],
          method: [
            { required: true, message: '请输入期考方式', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入课程概要', trigger: 'blur' },
          ],
          cname: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
          ],
          cno: [
            { required: true, message: '请输入课程号', trigger: 'blur' },
          ]
        },
        options: ['电信学院','商学院','管理学院','艺术学院','田径场','网上授课']
      }
    },
    props: {
      course: {
        type: Object,
        default() {
          return {}
        }
      },
      changeType: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getImgPath']),
    },
    methods: {
      ...mapActions(['reqUploadImg', 'reqDeleteImg']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.changeType) {
              this.$emit('insertCourse', this.ruleForm)
            } else {
              this.$emit('sucModify', this.ruleForm)
            }
          }
        })
      },
      async resetForm(formName) {
        await this.deleteImg()
        this.$refs[formName].resetFields();
      },
      // 上传图片，并立即显示
      async upLoadImg(file) {
        if (!file) return
        if (this.ruleForm.img) {
          await this.deleteImg()
        }
        this.reqUploadImg(file)
      },
      // 删除上传的图片
      async deleteImg() {
        let filename = this.ruleForm.img.match(/[0-9a-zA-Z]*\.(png|jpg|jpeg)$/i)[0]
        let result = await this.reqDeleteImg(filename)
        if (result.code === 200) {
          this.ruleForm.img = ''
        }
      }
    },
    watch: {
      course(val) {
        if (!this.changeType) {
          this.ruleForm = val
        }
      },
      getImgPath(val) {
        if (Object.keys(this.getImgPath).length !== 0) {
          let path = this.getImgPath.path.replace('public/', '')
          return this.ruleForm.img = path === '' ? false : `http://localhost:3000/${path}`
        }
      }
    },
    created() {
      if (Object.keys(this.course).length !== 0 && !this.changeType) {
        this.ruleForm = this.course
      }
    }
  }
</script>

<style lang="less" scoped>
  .course-form {
    height: 100%;
    .form-list {
      height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>