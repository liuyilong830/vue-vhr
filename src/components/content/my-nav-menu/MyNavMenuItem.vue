<template>
  <div class="my-nav-menu-item">
    <div v-for="(item,i) in listArr" :key="i">
      <el-submenu v-if="item.child.length !== 0" :index="item.path">
        <template slot="title">
          <i :class="item.class"></i>
          <span>{{item.title}}</span>
        </template>
        <my-nav-menu-item :list-arr="item.child"></my-nav-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <template slot="title">
          <i :class="item.class"></i>
          <span slot="title">{{item.title}}</span>
        </template>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
  import {
    MenuItem,
    Submenu
  } from 'element-ui'
  export default {
    name: 'MyNavMenuItem',
    components: {
      'elMenuItem': MenuItem,
      'elSubmenu': Submenu
    },
    data() {
      return {}
    },
    props: {
      listArr: {
        type: Array,
        default() {
          return []
        }
      },
    },
    methods: {
    
    }
  }
</script>

<style lang="less" scoped>
  .iconfont {
    padding-right: 10px;
    font-size: 18px;
  }
  .icon-xuesheng {
    font-size: 20px;
  }
</style>