<template>
  <div class="admin-stus-result">
    <opera-slot :options="options" :val="value" @changeValue="changeValue" @inputKeyword="inputKeyword">
      <template v-slot:right>
        <el-button-group>
          <el-button type="primary" v-if="getUserInfo.type !== 2" @click="addHandle">增 加</el-button>
          <el-button type="primary" v-if="getType" @click="deleteHanlde">删除所有</el-button>
        </el-button-group>
      </template>
    </opera-slot>
    <ul class="normal" v-if="filterGrades.length !== 0">
      <li class="item" v-for="item in filterGrades" :key="item.userid">
        <card-slot>
          <template v-slot:content>
            <div class="name-userid">
              <p><span class="property">姓名：</span><span class="sname">{{item.sname}}</span></p>
              <p><span class="property">学号：</span><span class="userid">{{item.userid}}</span></p>
            </div>
          </template>
          <template v-slot:mask>
            <el-button-group>
              <el-button type="primary" icon="el-icon-edit" size="small" @click="editClick(item)">查看</el-button>
              <el-button type="primary" size="small" @click="addGrade(item)">添加</el-button>
            </el-button-group>
          </template>
        </card-slot>
      </li>
    </ul>
    <div class="normal2" v-else>
      <div class="image">
        <img src="~assets/img/not-found.png" alt="">
        <h2>没有任何学员成绩信息!</h2>
      </div>
    </div>
    <el-dialog
      :title="`${user.sname}成绩信息`"
      :visible.sync="isShow"
      :before-close="handleClose"
      width="700px">
      <grade-table :grades="user" @successEdit="successEdit"></grade-table>
    </el-dialog>
    <el-dialog
      title="新增学员成绩信息"
      :visible.sync="showAdd"
      :before-close="isAddType"
      width="700px">
      <grade-form :checkForm="checkForm" @insertGrade="insertGrade"></grade-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Button,
    Dialog,
    ButtonGroup,
    MessageBox
  } from 'element-ui'
  import OperaSlot from "components/content/operation/OperaSlot";
  import CardSlot from "components/content/card/CardSlot";
  import GradeTable from 'components/content/table/GradeTable'
  import GradeForm from "components/content/form-list/GradeForm";
  import {mapGetters,mapActions} from 'vuex'
  import {setMessage} from 'utils/index'
  import {INSERTGRADE} from "store/mutation-types";
  export default {
    name: 'AdminStusResult',
    components: {
      OperaSlot,
      CardSlot,
      GradeTable,
      GradeForm,
      'elButton': Button,
      'elDialog': Dialog,
      'elButtonGroup': ButtonGroup,
    },
    data() {
      return {
        options: [
          { value: 'sname', label: '姓名'},
        ],
        value: 'sname',
        keyword: '',
        filterGrades: [],
        Grades: [],
        user: {},
        isShow: false,
        showAdd: false,
        checkForm: {}
      }
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getGrades']),
      getType() {
        return this.getUserInfo.type === 3
      }
    },
    methods: {
      ...mapActions(['reqGetGrades', 'reqUpdateGrade', 'reqDeleteGrade', 'reqGetCourse', 'reqInsertGrade']),
      /* 设置搜索依据 */
      changeValue(value) {
        this.value = value
      },
      /* 设置搜索关键词 */
      inputKeyword(keyword) {
        this.keyword = keyword
      },
      /* 打开编辑页面 */
      editClick(user) {
        this.user = user
        this.isShow = true
      },
      /* 当关闭查看成绩窗口的时候，需要将对象更新，以保证之后还会重新生成一个对象 */
      addGrade(user) {
        let {sname, userid} = user
        this.checkForm = {sname, userid}
        this.showAdd = true
      },
      isAddType(done) {
        done()
        this.checkForm = {}
      },
      handleClose(done) {
        done();
        this.user = {...this.user}
      },
      /* 更新某一个学生成绩信息发出的请求 */
      async successEdit(item) {
        console.log(item)
        this.isShow = false
        if (!item) return
        let result = await this.reqUpdateGrade(item)
        setMessage(result.message, 'success')
      },
      /* 删除所有学员成绩信息 */
      deleteHanlde() {
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await this.reqDeleteGrade()
          setMessage(result.message, 'success')
        }).catch(() => {
          setMessage('已取消删除!', 'info')
        });
      },
      /* 新增一条学员成绩信息 */
      addHandle() {
        this.showAdd = true
        this.checkForm = {
          sname: '',
          cname: '',
          tname: '',
          score: 60,
          level: '及格',
          userid: ''
        }
      },
      async insertGrade(grade) {
        let result = await this.reqInsertGrade(grade)
        setMessage(result.message, 'success')
        let value = {...grade, id: result.data.id}
        this.$store.commit(INSERTGRADE, value)
      }
    },
    watch: {
      getGrades(val) {
        this.Grades = this.filterGrades =  val
      },
      keyword(val) {
        if (val === '') {
          this.filterGrades = this.Grades
        }
        this.filterGrades = this.Grades.filter(grade => grade.sname.includes(val))
      }
    },
    created() {
      this.reqGetGrades()
      this.reqGetCourse()
    }
  }
</script>

<style lang="less" scoped>
  .admin-stus-result {
    min-width: 1200px;
    height: calc(100% - 45px);
    .normal {
      background-color: #99999914;
      height: calc(100% - 75px);
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 100% / 4;
        height: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        .name-userid {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-size: 16px;
          p {
            flex: 1;
            display: flex;
            align-items: center;
            .property {
              width: 30%;
            }
            .sname, .userid {
              width: 70%;
            }
          }
        }
      }
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
    .normal2 {
      background-color: #99999914;
      height: calc(100% - 75px);
      .image {
        height: 100%;
        box-sizing: border-box;
        padding: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          height: 80%;
        }
        h2 {
          font-size: 23px;
          color: #545c64;
          font-weight: 600;
        }
      }
    }
  }
</style>