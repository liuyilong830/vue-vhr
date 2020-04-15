<template>
  <div class="chat">
    <el-badge :value="12" :max="10">
      <span class="iconfont icon-liaotian"></span>
    </el-badge>
  </div>
</template>

<script>
  import {
    Badge
  } from 'element-ui'
  export default {
    name: 'Chat',
    components: {
      'elBadge': Badge
    },
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .chat {
    position: fixed;
    bottom: 20px;
    right: 25px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 30px;
      color: #409EFF;
    }
    &:hover {
      cursor: pointer;
    }
  }
</style>