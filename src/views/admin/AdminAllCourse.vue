<template>
  <div class="admin-all-course" v-if="courses.length !== 0">
    <div class="pie-chart">
      <h2 class="title">各学院课程数量统计</h2>
      <ve-pie :data="chartData" :events="chartEvents"></ve-pie>
      <div class="normal">
        <div class="flex">
          <h2 class="title">当前选中的课程：{{course.cname? course.cname : '无'}}</h2>
          <el-button-group class="btn-group">
            <el-button type="primary" :disabled="Object.keys(course).length === 0" v-if="getUserInfo.type !== 2" @click="modifyCourse">编辑</el-button>
            <el-button type="primary" @click="removeCourse" :disabled="Object.keys(course).length === 0" v-if="getUserInfo.type === 3">删除</el-button>
          </el-button-group>
        </div>
        <div class="flex" v-if="getUserInfo.type === 3">
          <h2 class="title">是否添加新的课程</h2>
          <el-button type="primary" @click="addCourse">添加</el-button>
        </div>
      </div>
    </div>
    <div class="right">
      <h2 class="title">{{name}}课程：共计{{filterCourses.length}}门</h2>
      <div class="flex">
        <div class="normal" v-for="course in filterCourses" :key="course.id">
          <card :course="course" v-if="Object.keys(course).length !== 0" @changeContent="changeContent"/>
        </div>
      </div>
    </div>
    <el-dialog
      :title="getTitle"
      :visible.sync="showModify"
      :destroy-on-close="true"
      width="700px"
      @close="closeDialog"
      center>
      <div>
        <course-form @sucModify="sucModify" @insertCourse="insertCourse" :changeType="showAdd" :course="course"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CourseForm from "components/content/course-form/CourseForm";
  import Card from "components/content/card/Card";
  import {mapActions, mapGetters} from 'vuex'
  import {Button, ButtonGroup, Dialog} from "element-ui";
  import {setMessage} from 'utils/index'
  import {RESETIMG} from 'store/mutation-types.js'
  export default {
    name: 'AdminAllCourse',
    components: {
      'elButtonGroup': ButtonGroup,
      'elButton': Button,
      'elDialog': Dialog,
      Card,
      CourseForm
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
        filterCourses: [],
        course: {},
        showModify: false,
        showAdd: false
      }
    },
    computed: {
      ...mapGetters(['getAllCourse', 'getUserInfo']),
      getTitle() {
        if (this.showAdd) {
          return `添加一门课程`
        }
        return `修改${this.course.cname}的课程信息`
      }
    },
    methods: {
      ...mapActions(['reqGetCourse', 'reqInsertCourse', 'reqUpdateCourse', 'reqDeleteCourse', 'reqDeleteImg']),
      changePlace(event) {
        this.name = event.name
        this.filterCourses = this.courses.filter(course => course.place === this.name)
      },
      computeNum(arr) {
        this.chartData.rows.forEach(row => {
          row['课程数量'] = arr.filter(course => course.place === row['地点']).length
        })
      },
      changeContent(course) {
        this.course = course
      },
      modifyCourse() {
        this.showModify = true
      },
      addCourse() {
        this.showAdd = this.showModify = true
      },
      // 当关闭对话框时，将数据都清空，同时将保存在vuex中的图片对象也清空
      async closeDialog() {
        this.showAdd = false
        this.course = {}
        // 关闭的时候将图片清空
        this.$store.commit(RESETIMG)
      },
      // 更新某一个课程
      async sucModify(course) {
        this.showModify = false
        let result = await this.reqUpdateCourse(course)
        if (result.code === 200) {
          setMessage(result.message, 'success')
          let index = this.courses.findIndex(item => item.id === course.id)
          this.courses.splice(index, 1, course)
          this.course = {}
        }
      },
      // 删除一门课程，需要将img的路径传给后台，后台根据路径删除图片，传id用来删除数据库中数据
      async removeCourse() {
        console.log(this.course)
        let result = await this.reqDeleteCourse({id: this.course.id, img: this.course.img})
        setMessage(result.message, 'success')
        let index = this.courses.findIndex(item => item.id === this.course.id)
        this.courses.splice(index, 1)
        this.course = {}
      },
      // 新增一门课程，需要将必要的字段传入，并且要将新增的结果中的insertId传递给我
      async insertCourse(course) {
        let obj = {...course}
        this.showModify = false
        let result = await this.reqInsertCourse(obj)
        if (result.code === 200) {
          obj.id = result.data.id
          setMessage(result.message, 'success')
          this.courses.unshift(obj)
        }
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
  .admin-all-course {
    height: calc(100% - 45px);
    display: flex;
    .pie-chart {
      width: 450px;
      min-width: 450px;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .normal {
        box-sizing: border-box;
        padding-right: 10px;
        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 0;
          }
        }
      }
      .form {
        height: calc(100% - 436px);
        box-sizing: border-box;
        padding: 10px 10px 0 0;
      }
    }
    .right {
      width: calc(100% - 450px);
      min-width: 880px;
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
        }
      }
    }
  }
</style>