<template>
  <ul class="list">
    <li class="list-item" v-for="(item) in list" :key="item.title" @click="handleClick(item)">{{item.title}}</li>
  </ul>
</template>

<script>
  import {SIGNOUT} from '../../../store/mutation-types'
  import Cookies from 'js-cookie'
  export default {
    name: 'List',
    components: {},
    data() {
      return {}
    },
    props: {
      list: {
        type: Array,
        default() {
          return [{title: '默认文字'}]
        }
      }
    },
    methods: {
      handleClick(value) {
        switch (value.title) {
          case '退出':
            this.$store.commit(SIGNOUT)
            Cookies.remove('userid')
            Cookies.remove('type')
            return this.$router.replace('/login')
          default:
            return;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .list {
    width: 100%;
    .list-item {
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: #545c64;
      font-size: 15px;
      transition: .3s;
      &:hover {
        color: #409EFF;
        cursor: pointer;
        background-color: #ecfcfff2;
      }
    }
  }
</style>