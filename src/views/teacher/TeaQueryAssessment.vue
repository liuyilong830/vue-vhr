<template>
  <div class="teacher-query-assessment">
    <calendar @getCurrentTime="getCurrentTime"></calendar>
    <el-drawer
      :visible.sync="drawer"
      destroy-on-close
      ref="drawer"
      size="700px">
      <template v-slot:title>
        <h2 class="drawer-title">{{formatCurrentTime}}</h2>
      </template>
      <div class="tasks">
        <all-tasks :time="currentTime" @releaseClick="releaseClick" />
      </div>
      <el-dialog
        title="发布考勤"
        center
        :modal="false"
        :destroy-on-close="true"
        :visible.sync="dialog"
        width="600px">
        <release-tasks/>
      </el-dialog>
    </el-drawer>
  </div>
</template>

<script>
  import {
    Drawer,
    Dialog,
  } from 'element-ui'
  import Calendar from "../../components/comment/calendar/Calendar";
  import AllTasks from "../../components/content/attendance-task/AllTasks";
  import ReleaseTasks from "../../components/content/attendance-task/ReleaseTasks";
  export default {
    name: 'TeaQueryAssessment',
    components: {
      'elDrawer': Drawer,
      'elDialog': Dialog,
      Calendar,
      AllTasks,
      ReleaseTasks
    },
    data() {
      return {
        currentTime: {},
        drawer: false,
        dialog: false
      }
    },
    computed: {
      formatCurrentTime() {
        return `${this.currentTime.year}年${this.currentTime.month}月${this.currentTime.date}日考勤任务`
      }
    },
    methods: {
      getCurrentTime(time) {
        this.currentTime = time
        this.drawer = true
      },
      releaseClick() {
        this.dialog = true
      }
    },
  }
</script>

<style lang="less" scoped>
  .teacher-query-assessment {
    .drawer-title {
      font-size: 16px;
      font-weight: 600;
    }
    .tasks {
      height: 100%;
    }
  }
</style>