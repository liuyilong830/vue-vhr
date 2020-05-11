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
        <all-tasks :time="currentTime" @releaseClick="releaseClick" @queryTask="queryTask" />
      </div>
      <el-dialog
        title="发布考勤"
        center
        :modal="false"
        :destroy-on-close="true"
        :visible.sync="dialog"
        width="600px">
        <release-tasks @submitForm="submitForm"/>
      </el-dialog>
      <el-drawer
        :append-to-body="true"
        destroy-on-close
        :visible.sync="innerDrawer"
        size="400px">
        <template v-slot:title>
          <h2 class="inner-drawer-title">{{showTask}}</h2>
        </template>
        <query-task :taskid="taskid"/>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
  import {
    Drawer,
    Dialog,
  } from 'element-ui'
  import Calendar from "components/comment/calendar/Calendar";
  import AllTasks from "components/content/attendance-task/AllTasks";
  import ReleaseTasks from "components/content/attendance-task/ReleaseTasks";
  import QueryTask from "components/content/attendance-task/QueryTask";
  import {mapActions, mapGetters} from "vuex";
  import {setMessage} from 'utils/index'
  import {PUSHTASK} from 'store/mutation-types'
  export default {
    name: 'TeaQueryAssessment',
    components: {
      'elDrawer': Drawer,
      'elDialog': Dialog,
      Calendar,
      AllTasks,
      ReleaseTasks,
      QueryTask
    },
    data() {
      return {
        currentTime: {},
        drawer: false,
        dialog: false,
        innerDrawer: false,
        taskid: 0
      }
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getTasks']),
      formatCurrentTime() {
        return `${this.currentTime.year}年${this.currentTime.month}月${this.currentTime.date}日考勤任务`
      },
      showTask() {
        let task = this.getTasks.find(task => task.id === this.taskid)
        return task? task.title : false
      }
    },
    methods: {
      ...mapActions(['reqInsertTask']),
      getCurrentTime(time) {
        this.currentTime = time
        this.drawer = true
      },
      releaseClick() {
        this.dialog = true
      },
      async submitForm(task) {
        let {type, tname} = this.getUserInfo
        let result = await this.reqInsertTask(task)
        if (result.code === 200) {
          this.dialog = false
          this.$store.commit(PUSHTASK, {...task, type, tname, id: result.data.id})
          setMessage(result.message, 'success')
        }
      },
      queryTask(id) {
        this.taskid = parseInt(id)
        this.innerDrawer = true
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