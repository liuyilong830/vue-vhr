<template>
  <div class="views-login">
    <div class="login-box">
      <div class="box-top">
        <h2>微人事系统登录</h2>
      </div>
      <div class="box-center">
        <div class="form">
          <el-input
            class="public"
            v-model="userid"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
            :maxlength="12"
            :show-word-limit="true">
          </el-input>
          <el-input
            class="public"
            placeholder="请输入密码"
            v-model="password"
            prefix-icon="el-icon-lock"
            show-password
            :maxlength="16"
            @blur="passwordBlur">
          </el-input>
          <el-radio-group v-model="type" class="public">
            <el-radio :label="2">学生</el-radio>
            <el-radio :label="1">教师</el-radio>
            <el-radio :label="3">辅导员</el-radio>
          </el-radio-group>
          <div class="public">
            <el-checkbox v-model="checked">是否记住我</el-checkbox>
          </div>
          <el-row class="public">
            <el-button type="primary" class="length" @click="loginClick">登录</el-button>
          </el-row>
          <el-row>
            <el-button type="info" class="length" @click="loginClick">还未拥有账号，立即注册</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Input,
    Checkbox,
    Button,
    Row,
    Alert,
    Radio,
    RadioGroup,
    Message,
    Notification
  } from 'element-ui'
  import {mapActions, mapState} from 'vuex'
  import {reqLogin} from '../../api/index'
  import {setMessage} from '../../utils/index'
  export default {
    name: 'Login',
    components: {
      'elInput': Input,
      'elCheckbox': Checkbox,
      'elButton': Button,
      'elRow': Row,
      'elAlert': Alert,
      'elRadio': Radio,
      'elRadioGroup': RadioGroup
    },
    data() {
      return {
        userid: '',
        password: "",
        checked: false,
        type: 2 // 2 表示学生登录、1 表示教师登录、3表示辅导员（管理员登录）
      }
    },
    computed: {
      ...mapState(['userInfo']),
      correctPwd() {
        let reg = /^[a-z0-9\.,\?]{6,16}$/g
        return reg.test(this.password)
      },
      testUsername() {
        if (this.userid === '') {
          return '用户名不能为空'
        } else if (this.type == 1) {
          return this.userid[0] == 1? false : '教师用户名以1开头'
        } else if (this.type == 2) {
          return this.userid[0] == 2? false : '学生用户名以2开头'
        } else {
          return this.userid == 'root'? false : '辅导员用户名为root'
        }
      }
    },
    methods: {
      ...mapActions(['reqUserInfo']),
      async loginClick() {
        if (this.testUsername) {
          return setMessage(this.testUsername, 'error', 1000)
        }
        if (!this.correctPwd) {
          return this.passwordBlur()
        }
        await this.reqUserInfo({userid: this.userid, password: this.password, type: this.type})
        this.$router.replace('/home')
        Notification({
          title: '登录成功',
          message: '欢迎进入微人事管理系统',
          type: 'success'
        })
      },
      passwordBlur() {
        if(!this.correctPwd) {
          return setMessage('密码应该由6到16位数字 字母 . , ? 组成的', 'error', 1000)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .views-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-box {
      width: 450px;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .box-top {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 20px;
      }
      .box-center {
        box-sizing: border-box;
        padding: 20px;
        .form {
          width: 90%;
          margin: 0 auto;
          .public {
            margin-bottom: 15px;
          }
          .length {
            width: 100%;
          }
        }
      }
    }
  }
</style>