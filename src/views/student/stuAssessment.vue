<template>
  <div class="student-assessment">
    <calendar @getCurrentTime="getCurrentTime"></calendar>
  
    <el-drawer
      :visible.sync="drawer"
      destroy-on-close
      size="500px">
      <template v-slot:title>
        <h2 class="drawer-title">{{formatCurrentTime}}</h2>
      </template>
      <div class="tasks">
        <attendance-task :time="currentTime" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {
    Drawer,
    Timeline,
    TimelineItem
  } from 'element-ui'
  import Calendar from 'components/comment/calendar/Calendar'
  import AttendanceTask from "components/content/attendance-task/AttendanceTask";
  export default {
    name: 'stuAssessment',
    components: {
      'elDrawer': Drawer,
      'elTimeline': Timeline,
      'elTimelineItem': TimelineItem,
      Calendar,
      AttendanceTask,
    },
    data() {
      return {
        drawer: false,
        currentTime: {}
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
    }
  }
</style>