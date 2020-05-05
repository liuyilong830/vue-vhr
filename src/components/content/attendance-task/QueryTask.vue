<template>
  <div class="query-task">
    <div class="complete">
      <h3 class="title" v-if="compNum">已完成签到名单-({{compNum}}个人)</h3>
      <ul class="tag-list" v-if="showCompType.length !== 0">
        <li class="tag" v-for="user in showCompType" :key="user.userid">
          <el-tag type="success" size="medium" class="item" v-if="user.sex === '男'">{{user.sname}}</el-tag>
          <el-tag type="warning" size="medium" class="item" v-else>{{user.sname}}</el-tag>
        </li>
      </ul>
      <div v-else class="no-person">还没有签到的学员</div>
    </div>
    <div class="incomplete">
      <h3 class="title" v-if="incompNum">未完成签到名单-({{incompNum}}个人)</h3>
      <ul class="tag-list" v-if="showInCompType.length !== 0">
        <li class="tag" v-for="user in showInCompType" :key="user.userid">
          <el-tag type="success" size="medium" class="item" v-if="user.sex === '男'">{{user.sname}}</el-tag>
          <el-tag type="warning" size="medium" class="item" v-else>{{user.sname}}</el-tag>
        </li>
      </ul>
      <div v-else class="no-person">没有未完成签到的学员</div>
    </div>
  </div>
</template>

<script>
  import {
    Tag,
  } from 'element-ui'
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: 'QueryTask',
    components: {
      'elTag': Tag,
    },
    data() {
      return {}
    },
    props: {
      taskid: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ...mapGetters(['getTasks', 'getUserInfo', 'getAttendanceType']),
      showCompType() {
        if (Object.keys(this.getAttendanceType).length !== 0) {
          return this.getAttendanceType.complete
        }
        return []
      },
      showInCompType() {
        if (Object.keys(this.getAttendanceType).length !== 0) {
          return this.getAttendanceType.incomplete
        }
        return []
      },
      compNum() {
        if (Object.keys(this.getAttendanceType).length !== 0) {
          return this.getAttendanceType.complete.length
        }
        return 0
      },
      incompNum() {
        if (Object.keys(this.getAttendanceType).length !== 0) {
          return this.getAttendanceType.incomplete.length
        }
        return 0
      }
    },
    methods: {
      ...mapActions(['reqGetCompletion']),
    },
    async created() {
      await this.reqGetCompletion(this.taskid)
      
    }
  }
</script>

<style lang="less" scoped>
  .query-task {
    height: 100%;
    .complete {
      .title {
        font-size: 15px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        .tag {
          width: calc(100% / 4);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          .el-tag {
            display: block;
            width: 65px;
            text-align: center;
          }
        }
      }
      .no-person {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .incomplete {
      .title {
        font-size: 15px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        .tag {
          width: calc(100% / 4);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          .el-tag {
            display: block;
            width: 65px;
            text-align: center;
          }
        }
      }
      .no-person {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
</style>