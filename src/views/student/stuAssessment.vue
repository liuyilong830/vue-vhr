<template>
  <div class="student-assessment">
    <calendar @getCurrentTime="getCurrentTime"></calendar>
  
    <el-drawer
      :visible.sync="drawer"
      destroy-on-close
      ref="drawer"
      size="500px">
      <template v-slot:title>
        <h2 class="drawer-title">{{formatCurrentTime}}</h2>
      </template>
      <div class="tasks">
        <attendance-task :time="currentTime" :drawerRef="drawerRef" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {
    Drawer,
  } from 'element-ui'
  import Calendar from 'components/comment/calendar/Calendar'
  import AttendanceTask from "components/content/attendance-task/AttendanceTask";
  export default {
    name: 'stuAssessment',
    components: {
      'elDrawer': Drawer,
      Calendar,
      AttendanceTask,
    },
    data() {
      return {
        drawer: false,
        currentTime: {},
        drawerRef: null
      }
    },
    computed: {
      formatCurrentTime() {
        return `${this.currentTime.year}年${this.currentTime.month}月${this.currentTime.date}日考勤任务`
      }
    },
    methods: {
      getCurrentTime(time) {
        this.drawer = true
        this.currentTime = time
      }
    },
    updated() {
      this.drawerRef = this.$refs.drawer
    }
  }
</script>

<style lang="less" scoped>
  .student-assessment {
    .drawer-title {
      font-size: 16px;
      font-weight: 600;
    }
    .tasks {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar { // 滚动条整体的样式
        width: 8px;
        height: 20px;
      }
      &::-webkit-scrollbar-button {
        display: none;
      }
      &::-webkit-scrollbar-track {  // 外层轨道的样式
        background: #4b4b4e;
        border-radius: 40px;
      }
      &::-webkit-scrollbar-track-piece {  // 内层轨道的样式（不是可拖拽部分）
        background: #f1f1f1;
        border-radius: 20px;
      }
      &::-webkit-scrollbar-thumb {  // 可拖拽部分的样式
        background: #cecece;
        border-radius: 50px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #9b9b9c;
      }
      &::-webkit-scrollbar-corner {
        background: #fff;
      }
    }
  }
</style>