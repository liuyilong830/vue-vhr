<template>
  <div class="my-nav-menu">
    <el-col :span="24">
      <el-menu
        :default-active="path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        :router="true"
        ref="menu">
        <my-nav-menu-item :list-arr="listArr"></my-nav-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  import {
    Col,
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup
  } from 'element-ui'
  
  import MyNavMenuItem from "./MyNavMenuItem";
  export default {
    name: 'MyNavMenu',
    components: {
      MyNavMenuItem,
      'elCol': Col,
      'elMenu': Menu,
      'elMenuItem': MenuItem,
      'elSubmenu': Submenu,
      'elMenuItemGroup': MenuItemGroup
    },
    props: {
      listArr: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        path: ''
      }
    },
    methods: {},
    watch: {
      '$route.path'(val, oldVal) {
        this.path = val
        if(this.path === '/home/index') {
          this.listArr.forEach(item => {
            this.$refs.menu.close(item.path)
          })
        }
      }
    },
    mounted() {
      this.path = this.$route.path
    }
  }
</script>

<style lang="less" scoped>
  .my-nav-menu {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #545c64;
    .el-menu {
      border-right: none;
    }
  }
</style>