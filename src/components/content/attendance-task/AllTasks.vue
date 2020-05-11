<template>
  <div class="all-tasks">
    <div class="release">
      <el-button type="primary" @click="releaseClick">发布考勤</el-button>
    </div>
    <div class="tasks" v-if="getTasks.length !== 0">
      <div class="all-by" v-if="tasksByMe.length !== 0">
        <h3>我发布的考勤任务</h3>
        <el-timeline>
          <el-timeline-item
            :timestamp="`${getTime(task.startTime)} - 我`"
            placement="top"
            v-for="task in tasksByMe"
            :key="task.startTime">
            <el-card :body-style="{ padding: '10px' }">
              <div class="card">
                <div class="task-title">
                  <span>{{task.title}}</span>
                  <span>-</span>
                  <p class="describe">{{task.content}}</p>
                </div>
                <div class="content">
                  <div class="content-left">
                    <el-collapse>
                      <el-collapse-item>
                        <template slot="title">
                          <span>{{task.title}}</span>
                        </template>
                        <div>{{task.content}}</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
                <div class="issued-person">
                  <p>该任务结束于：{{getTime(task.endTime, true)}}</p>
                  <el-button type="info" size="mini" @click="queryTask(task.id)">签到情况</el-button>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="all-by" v-if="tasksOther.length !== 0">
        <h3>其他老师发布的考勤任务</h3>
        <el-timeline>
          <el-timeline-item
            :timestamp="`${getTime(task.startTime)} - ${task.tname}`"
            placement="top"
            v-for="task in tasksOther"
            :key="task.id">
            <el-card :body-style="{ padding: '10px' }">
              <div class="card">
                <div class="task-title">
                  <span>{{task.describe}}</span>
                  <span>-</span>
                  <p class="describe">{{task.content}}</p>
                </div>
                <div class="content">
                  <div class="content-left">
                    <el-collapse>
                      <el-collapse-item>
                        <template slot="title">
                          <span>{{task.title}}</span>
                        </template>
                        <div>{{task.content}}</div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
                <div class="issued-person">
                  <p>该任务结束于：{{getTime(task.endTime, true)}}</p>
                  <el-button type="info" size="mini" @click="queryTask(task.id)">签到情况</el-button>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="normal" v-else>
      <div class="image">
        <img src="~assets/img/not-found.png" alt="">
        <h2>今天还没有老师发布考勤任务</h2>
      </div>
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
    Tag,
  } from 'element-ui'
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: 'AllTasks',
    components: {
      'elTimeline': Timeline,
      'elTimelineItem': TimelineItem,
      'elCard': Card,
      'elButton': Button,
      'elButtonGroup': ButtonGroup,
      'elCollapse': Collapse,
      'elCollapseItem': CollapseItem,
      'elTag': Tag,
    },
    data() {
      return {
        tasksByMe: [],
        tasksOther: [],
      }
    },
    props: {
      time: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    computed: {
      ...mapGetters(['getTasks', 'getUserInfo']),
      
    },
    methods: {
      ...mapActions(['reqGetTaskByTime']),
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
      releaseClick() {
        this.$emit('releaseClick')
      },
      queryTask(id) {
        this.$emit('queryTask', id)
      }
    },
    watch: {
      getTasks(val) {
        let {userid} = this.getUserInfo
        let arr = [...val]
        arr.sort((num1, num2) => num1.startTime - num2.startTime)
        this.tasksByMe = arr.filter(task => task.userid === userid)
        this.tasksOther = arr.filter(task => task.userid !== userid)
      }
    },
    async created() {
      let time = new Date(`${this.time.year}-${this.time.month}-${this.time.date}`).getTime()
      await this.reqGetTaskByTime(time)
    }
  }
</script>

<style lang="less" scoped>
  .all-tasks {
    height: 100%;
    position: relative;
    .release {
      display: flex;
      margin-bottom: 10px;
      button {
        flex: 1;
      }
    }
    .tasks {
      height: calc(100% - 50px);
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
      .all-by {
        h3 {
          padding-bottom: 10px;
          font-size: 16px;
          font-weight: 600;
        }
        .card{
          min-height: 50px;
          .task-title {
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .describe {
              width: 200px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .content {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .content-left {
              width: 100%;
              height: 100%;
            }
            .content-right {
              width: 85px;
              height: 32px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
          }
          .issued-person {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              color: #999999;
            }
          }
        }
      }
    }
    .normal {
      position: absolute;
      bottom: 40px;
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
  }
</style>