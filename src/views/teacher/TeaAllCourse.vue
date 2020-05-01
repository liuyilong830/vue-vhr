<template>
  <div class="teacher-all-course" v-if="courses.length !== 0">
    <div class="pie-chart">
      <h2 class="title">各学院课程数量统计</h2>
      <ve-pie :data="chartData" :events="chartEvents"></ve-pie>
    </div>
    <div class="right">
      <h2 class="title">{{name}}课程：共计{{filterCourses.length}}门</h2>
      <div class="flex">
        <div class="normal" v-for="course in filterCourses" :key="course.id">
          <div class="card">
    
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Card
  } from 'element-ui'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'TeaAllCourse',
    components: {
      'elCard': Card
    },
    data() {
      this.chartEvents = {
        click: this.changePlace
      }
      return {
        chartData: {
          columns: ['地点', '课程数量'],
          rows: [
            { '地点': '电信学院', '课程数量': 1 },
            { '地点': '商学院', '课程数量': 1 },
            { '地点': '管理学院', '课程数量': 1 },
            { '地点': '艺术学院', '课程数量': 1 },
            { '地点': '网上授课', '课程数量': 1 },
            { '地点': '田径场', '课程数量': 1 },
          ]
        },
        name: '电信学院',  // 学院名称
        courses: [],
        filterCourses: []
      }
    },
    computed: {
      ...mapGetters(['getAllCourse'])
    },
    methods: {
      ...mapActions(['reqGetCourse']),
      changePlace(event) {
        this.name = event.name
        this.filterCourses = this.courses.filter(course => course.place === this.name)
      },
      computeNum(arr) {
        this.chartData.rows.forEach(row => {
          row['课程数量'] = arr.filter(course => course.place === row['地点']).length
        })
      }
    },
    watch: {
      getAllCourse(val) {
        this.courses = val
        this.computeNum(this.courses)
        this.filterCourses = val.filter(course => course.place === this.name)
      }
    },
    created() {
      this.reqGetCourse()
    }
  }
</script>

<style lang="less" scoped>
  .teacher-all-course {
    height: calc(100% - 45px);
    display: flex;
    .pie-chart {
      width: 450px;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
    }
    .right {
      width: calc(100% - 450px);
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .flex {
        height: calc(100% - 36px);
        background-color: #99999914;
        display: flex;
        flex-wrap: wrap;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 10px;
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
        .normal {
          width: calc(100% / 3);
          height: 350px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          .card {
            width: 270px;
            height: 320px;
            border-radius: 6px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }
        }
      }
    }
  }
</style>