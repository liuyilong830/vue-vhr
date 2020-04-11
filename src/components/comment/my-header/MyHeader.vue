<template>
  <div class="my-header">
    <div class="logo">
      <slot name="logo">
        <img src="" alt="">
      </slot>
    </div>
    <div class="company">
      <slot name="company">
        <h1>班级管理系统</h1>
      </slot>
    </div>
    <div class="user">
      <slot name="user">
        <img src="" alt="">
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyHeader',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .my-header {
    height: 100%;
    overflow: hidden;
    .logo {
      float: left;
      width: 150px;
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 40px;
        background-color: black;
      }
    }
    .company {
      float: left;
      height: 100%;
      box-sizing: border-box;
      padding: 10px 0;
      display: flex;
      align-items: center;
      font-size: 25px;
      color: #ffffff;
      font-family: "Hiragino Sans GB","Microsoft YaHei";
      h1 {
        font-weight: 600;
      }
    }
    .user {
      float: right;
      width: 60px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        background-color: black;
        width: 80%;
        height: 80%;
        border-radius: 50%;
      }
    }
  }
</style>