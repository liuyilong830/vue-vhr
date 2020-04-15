<template>
  <ul class="list">
    <li class="list-item" v-for="(item) in list" :key="item.title">{{item.title}}</li>
  </ul>
</template>

<script>
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