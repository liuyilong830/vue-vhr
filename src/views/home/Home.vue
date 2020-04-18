<template>
  <div class="views-home">
    <el-container>
      <el-header class="header">
        <my-header>
          <template v-slot:user>
            <el-popover width="150px" trigger="hover">
              <list :list="list"></list>
              <el-avatar :src="getAvatar" slot="reference"></el-avatar>
            </el-popover>
          </template>
        </my-header>
      </el-header>
      <el-container class="main">
        <el-aside width="250px">
          <my-nav-menu :listArr="changeArr"></my-nav-menu>
        </el-aside>
        <el-main>
          <div class="flex">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
              <el-breadcrumb-item
                v-for="(item,index) in breadcrumbArr"
                :key="item.title"
                @click.native="changeBreadCru(item.path, index)">
                <span :class="{active: index == 0}">{{item.title}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="weather">
              <weather></weather>
            </div>
          </div>
          <router-view></router-view>
          <chat class="animated" @click.native="openChat" :class="{tada: flag}"></chat>
          <chat-box v-model="showChat"></chat-box>
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
    BreadcrumbItem,
    Avatar,
    Popover,
    Badge
  } from 'element-ui'
  import {mapState} from "vuex";
  
  import MyHeader from 'components/comment/my-header/MyHeader'
  import MyNavMenu from "components/content/my-nav-menu/MyNavMenu"
  import List from 'components/comment/list/List'
  import Chat from 'components/comment/chat/Chat'
  import ChatBox from 'components/content/chat-box/ChatBox'
  import Weather from "components/comment/weather/Weather";
  export default {
    name: 'Home',
    components: {
      'elContainer': Container,
      'elHeader': Header,
      'elAside': Aside,
      'elMain': Main,
      'elBreadcrumb': Breadcrumb,
      'elBreadcrumbItem': BreadcrumbItem,
      'elAvatar': Avatar,
      'elPopover': Popover,
      'elBadge': Badge,
      MyHeader,
      MyNavMenu,
      List,
      Chat,
      ChatBox,
      Weather
    },
    data() {
      return {
        teaArr: [
          {title: '学生管理', class: 'iconfont icon-xuesheng', path: '/home/stuInfo', child: [
            {title: '班级学生信息', class: 'iconfont icon-xueshengziliao', path: '/home/teastusinfo', child: []},
          ]},
          {title: '教师管理', class: 'iconfont icon-jiaoshiguanli', path: '/home/teaInfo', child: [
            {title: '教师个人信息', class: 'iconfont icon-jiaoshixinxi', path: '/home/teacherinfo', child: []},
          ]},
          {title: '课程管理', class: 'iconfont icon-Iconfont', path: '/home/course', child: [
            {title: '所有课程', class: 'iconfont icon-kecheng', path: '/home/teaallcourse', child: []},
          ]},
          {title: '成绩管理', class: 'iconfont icon-tongji', path: '/home/result', child: [
            {title: '学员成绩', class: 'iconfont icon-xueshengkechengchengjiguanli', path: '/home/teastusresult', child: []},
          ]},
          {title: '考勤管理', class: 'iconfont icon-kaoqinguanli', path: '/home/assessment', child: [
            {title: '考勤记录', class: 'iconfont icon-qiandao', path: '/home/teaqueryassessment', child: []},
          ]},
        ], // 用于展示测边导航栏的数据
        stuArr: [
          {title: '学生管理', class: 'iconfont icon-xuesheng', path: '/home/stuInfo', child: [
            {title: '学员资料', class: 'iconfont icon-xueshengziliao', path: '/home/stuBaseInfo', child: []},
          ]},
          {title: '课程管理', class: 'iconfont icon-Iconfont', path: '/home/course', child: [
            {title: '学生课程', class: 'iconfont icon-kecheng', path: '/home/stuCourse', child: []},
          ]},
          {title: '成绩管理', class: 'iconfont icon-tongji', path: '/home/result', child: [
            {title: '学生成绩', class: 'iconfont icon-xueshengkechengchengjiguanli', path: '/home/stuResult', child: []},
          ]},
          {title: '考勤管理', class: 'iconfont icon-kaoqinguanli', path: '/home/assessment', child: [
            {title: '学生考勤', class: 'iconfont icon-qiandao', path: '/home/stuAssessment', child: []},
          ]},
        ],  // 用于展示学生登录时候的侧边导航栏的数据
        rootArr: [
          {title: '学生管理', class: 'iconfont icon-xuesheng', path: '/home/stuInfo', child: [
            {title: '班级学生信息', class: 'iconfont icon-xueshengziliao', path: '/home/adminstusinfo', child: []},
          ]},
          {title: '教师管理', class: 'iconfont icon-jiaoshiguanli', path: '/home/teaInfo', child: [
            {title: '班级教师信息', class: 'iconfont icon-jiaoshixinxi', path: '/home/adminteachersInfo', child: []},
          ]},
          {title: '课程管理', class: 'iconfont icon-Iconfont', path: '/home/course', child: [
            {title: '所有课程信息', class: 'iconfont icon-kecheng', path: '/home/adminallcourse', child: []},
          ]},
          {title: '成绩管理', class: 'iconfont icon-tongji', path: '/home/result', child: [
            {title: '所有学员成绩', class: 'iconfont icon-xueshengkechengchengjiguanli', path: '/home/adminstusresult', child: []},
          ]},
          {title: '考勤管理', class: 'iconfont icon-kaoqinguanli', path: '/home/assessment', child: [
            {title: '所有学员考勤', class: 'iconfont icon-qiandao', path: '/home/adminallassessment', child: []},
          ]},
        ],  // 用于展示管理员（辅导员登录时候的测边导航栏的数据）
        view: {}, // 保存当前展示的视图的对象
        breadcrumbArr: [{title: '首页', path: '/home/index'}], // 用于存放记录路由跳转顺序的数组
        list: [
          {title: '退出'},
          {title: '个人中心'}
        ],
        flag: false,
        showChat: false  // 展示聊天组件
      }
    },
    computed: {
      ...mapState(['userInfo']),
      // 动态展示测边栏列表
      changeArr() {
        if (this.userInfo.type == 1) {
          return this.teaArr
        } else if (this.userInfo.type == 2) {
          return this.stuArr
        } else if (this.userInfo.type == 3) {
          return this.rootArr
        }
      },
      // 展示头像
      getAvatar() {
        let num = this.userInfo.sex === '男'? 'o15': 'o4'
        let uri = `http://demo.sc.chinaz.com/Files/pic/icons/7599/${num}.png`
        return uri
      }
    },
    methods: {
      changeBreadCru(path, index) {
        if (index !== 0) return
        this.$router.push(path)
      },
      // 寻找到对应侧边栏数组的指定元素
      findItem(arr, path) {
        for(let val of arr) {
          let item = val.child.find(value => value.path == path)
          if (item) {
            return item
          }
        }
      },
      // 打开聊天窗口
      openChat() {
        this.flag = true
        this.showChat = true
      },
      // 路由触发的时候展示指定的路径
      changeBread(path) {
        if (path == '/home/index') {
          return this.breadcrumbArr.splice(1)
        }
        this.view = this.findItem(this.changeArr, path)
        this.breadcrumbArr.splice(1, 1, {title: this.view.title, path: this.view.path})
      }
    },
    watch: {
      '$route.path'(val, oldVal) {
        this.changeBread(val)
        window.sessionStorage.setItem('path', val)
      }
    },
    mounted() {
      this.changeBread(this.$route.path)
    }
  }
</script>

<style lang="less" scoped>
  .views-home {
    width: 100vw;
    height: 100vh;
    .header {
      background-color: #409EFF;
      .el-avatar {
        cursor: grab;
      }
    }
    .main {
      height: calc(100vh - 60px);
      .flex {
        height: 30px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        .el-breadcrumb {
          flex: 1;
          font-size: 16px;
          margin-bottom: 10px;
          .active {
            font-weight: 600;
            transition: color .3s;
            &:hover {
              cursor: pointer;
              color: #409EFF;
            }
          }
        }
        .weather {
          flex: 1;
          
        }
      }
    }
  }
</style>