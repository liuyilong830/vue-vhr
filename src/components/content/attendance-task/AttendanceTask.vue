<template>
  <div class="attendance-task" v-if="tasks.length !== 0">
    <el-timeline>
      <el-timeline-item :timestamp="`${getTime(task.startTime)} - ${task.tname}`" placement="top" v-for="task in tasks" :key="task.startTime">
        <el-card :body-style="{ padding: '10px' }">
          <div class="card">
            <h4 class="task-title">{{task.describe}}</h4>
            <div class="content">
              <div class="content-left">
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span>{{task.describe}}</span>
                    </template>
                    <div>{{task.content}}</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div class="content-right">
                <el-button size="mini" type="success" icon="el-icon-check" disabled v-if="taskStatus(task.id)"></el-button>
                <el-button size="mini" v-else-if="flagSign(task.endTime)" @click="handleClick">签到</el-button>
                <el-button size="mini" type="danger" disabled v-else>已结束</el-button>
              </div>
            </div>
            <div class="issued-person">
              <p>该任务结束于：{{getTime(task.endTime, true)}}</p>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
      <!--<el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card :body-style="{ padding: '10px' }">
          <div class="card">
            <h4 class="task-title">每日签到</h4>
            <div class="content">
              <div class="content-left">
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span>签到</span>
                    </template>
                    <div>每日签到</div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div class="content-right">
                <el-button size="mini">签到</el-button>
              </div>
            </div>
            <p class="issued-person">辅导员 提交于 2018/4/12 20:46</p>
          </div>
        </el-card>
      </el-timeline-item>-->
    </el-timeline>
  </div>
  <div class="normal" v-else>
    <div class="image">
      <img src="~assets/img/not-found.png" alt="">
      <h2>今天老师还没有发布考勤任务</h2>
    </div>
  </div>
</template>

<script>
  import {
    Timeline,
    TimelineItem,
    Card,
    Button,
    ButtonGroup,
    Collapse,
    CollapseItem,
  } from 'element-ui'
  
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'AttendanceTask',
    components: {
      'elTimeline': Timeline,
      'elTimelineItem': TimelineItem,
      'elCard': Card,
      'elButton': Button,
      'elButtonGroup': ButtonGroup,
      'elCollapse': Collapse,
      'elCollapseItem': CollapseItem
    },
    data() {
      return {
        flag: false,
        tasks: []
      }
    },
    props: {
      time: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters(['getTasks', 'getUserInfo', 'getTaskStatus']),
      formatCurrentTime() {
        return `${this.time.year}-${this.time.month}-${this.time.date}`
      }
    },
    methods: {
      ...mapActions(['reqGetTaskByTime', 'reqTaskStatusById']),
      getTime(time, falg) {
        time = new Date(time)
        let year = this.formatTimeNum(time.getFullYear())
        let month = this.formatTimeNum(time.getMonth() + 1)
        let date = this.formatTimeNum(time.getDate())
        let hour = this.formatTimeNum(time.getHours())
        let minutes = this.formatTimeNum(time.getMinutes())
        let seconds = this.formatTimeNum(time.getSeconds())
        if (falg) {
          return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
        }
        return `${hour}:${minutes}:${seconds}`
      },
      formatTimeNum(num) {
        if (num < 10) {
          return '0' + num
        }
        return  num
      },
      handleClick() {
        this.flag = true
      },
      taskStatus(id) {
        return this.getTaskStatus.some(task => task.taskid === id)
      },
      flagSign(endTime) {
        return new Date().getTime() < endTime
      }
    },
    watch: {
      getTasks(val) {
        let arr = [...val]
        this.tasks = arr.sort((num1, num2) => num1.startTime - num2.startTime)
      }
    },
    async created() {
      let time = new Date(`${this.time.year}-${this.time.month}-${this.time.date}`).getTime()
      let {userid} = this.getUserInfo
      await this.reqGetTaskByTime(time)
      await this.reqTaskStatusById({userid, time})
    },
    
  }
</script>

<style lang="less" scoped>
  .attendance-task {
    .card{
      min-height: 50px;
      .task-title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .content {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content-left {
          width: calc(100% - 65px);
          height: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .content-right {
          width: 65px;
          height: 32px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      .issued-person {
        color: #999999;
      }
    }
  }
  .normal {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 80%;
      }
      h2 {
        font-size: 25px;
        font-weight: 600;
      }
    }
  }
</style>