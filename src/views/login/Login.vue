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
            v-model="username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
            :maxlength="10"
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
          <el-checkbox class="public" v-model="checked">是否记住我</el-checkbox>
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
    Message,
    Notification
  } from 'element-ui'
  export default {
    name: 'Login',
    components: {
      'elInput': Input,
      'elCheckbox': Checkbox,
      'elButton': Button,
      'elRow': Row,
      'elAlert': Alert,
    },
    data() {
      return {
        username: '',
        password: "",
        checked: false
      }
    },
    computed: {
      correctPwd() {
        let reg = /^[a-z0-9\.,\?]{6,16}$/g
        return reg.test(this.password)
      }
    },
    methods: {
      loginClick() {
        if (this.username === '') {
          return this.usernameBlur()
        }
        if (!this.correctPwd) {
          return this.passwordBlur()
        }
        this.$router.replace('/home')
        Notification({
          title: '登录成功',
          message: '欢迎进入微人事管理系统',
          type: 'success'
        })
      },
      usernameBlur() {
        Message.error({
          message: '用户名不能为空',
          duration: 1000
        })
      },
      passwordBlur() {
        if(!this.correctPwd) {
          return Message.error({
            message: '密码应该由6到16位数字 字母 . , ? 组成的',
            duration: 1000
          })
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