<template>
  <div class="views-home">
    <el-container>
      <el-header class="header">
        <my-header></my-header>
      </el-header>
      <el-container class="main">
        <el-aside width="250px">
          <my-nav-menu :listArr="listArr" @setHistory="setHistory"></my-nav-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
            <el-breadcrumb-item
              v-for="(item,index) in breadcrumbArr"
              :key="item.title"
              @click.native="changeBreadCru(item.path)">
              <span :class="{active: index !== breadcrumbArr.length - 1}">{{item.title}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    Container,
    Header,
    Aside,
    Main,
    Breadcrumb,
    BreadcrumbItem
  } from 'element-ui'
  
  import MyHeader from 'components/comment/my-header/MyHeader'
  import MyNavMenu from "components/content/my-nav-menu/MyNavMenu"
  export default {
    name: 'Home',
    components: {
      'elContainer': Container,
      'elHeader': Header,
      'elAside': Aside,
      'elMain': Main,
      'elBreadcrumb': Breadcrumb,
      'elBreadcrumbItem': BreadcrumbItem,
      MyHeader,
      MyNavMenu
    },
    data() {
      return {
        listArr: [
          {title: '学生资料', class: 'el-icon-location', path: '/home/stuInfo', child: [
            {title: '基本资料', class: '', path: '/home/stuBaseInfo', child: []},
            {title: '高级资料', class: '', path: '/home/stuSeniorInfo', child: []}
          ]},
          {title: '教师管理', class: 'el-icon-menu', path: '/home/teaInfo', child: [
            {title: '学生奖惩', class: '', path: '/home/teaRewPunish', child: []},
            {title: '学生培训', class: '', path: '/home/teaTrain', child: []},
            {title: '学生调动', class: '', path: '/home/teaTransfer', child: []},
          ]},
          {title: '薪资管理', class: 'el-icon-setting', path: '/home/salary', child: []},
          {title: '统计管理', class: 'el-icon-location', path: '/home/statistics', child: []},
          {title: '系统管理', class: 'el-icon-location', path: '/home/system', child: []},
        ], // 用于展示测边导航栏的数据
        breadcrumbArr: [{title: '首页', path: '/home/index'}], // 用于存放记录路由跳转顺序的数组
      }
    },
    methods: {
      /**
       * 根据路由路径，找到对应于 breadcrumbArr 中的索引位置
       */
      getIndex(path) {
        return this.breadcrumbArr.findIndex(item => item.path === path)
      },
      /**
       * 点击左侧测边栏切换路由，并且将显示过的路由组件存放在 breadcrumbArr 中用于路径的展示
       * @param title
       * @param path
       */
      setHistory({title, path}) {
        if (this.getIndex(path) !== -1) {
          return this.changeBreadCru(path)
        }
        this.$router.push(path)
        this.breadcrumbArr.push({title, path})
      },
      /**
       * 当点击了展示 breadcrumbArr 的组件中的元素的时候，需要跳转到对应的位置，并且将浏览器中的 history 回退到指定位置
       * @param path
       */
      changeBreadCru(path) {
        if (path === this.breadcrumbArr[this.breadcrumbArr.length - 1].path) return
        this.$router.go(-(this.breadcrumbArr.length - this.getIndex(path) -1))
      }
    },
    watch: {
      /**
       * 当切换的路由在 breadcrumbArr 中已经存在过的时候，需要将 breadcrumbArr 中的数据更新到当前跳转路由对应的元素
       * @param val
       * @param oldVal
       */
      '$route.path'(val, oldVal) {
        if (this.getIndex(val) !== -1) {
          this.breadcrumbArr.splice(this.getIndex(val)+1, this.breadcrumbArr.length)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .views-home {
    width: 100vw;
    height: 100vh;
    .header {
      background-color: #409EFF;
    }
    .main {
      height: calc(100vh - 60px);
      .el-breadcrumb {
        font-size: 16px;
        margin-bottom: 10px;
        .active {
          font-weight: 600;
          transition: .3s;
          &:hover {
            cursor: pointer;
            color: #409EFF;
          }
        }
      }
    }
  }
</style>