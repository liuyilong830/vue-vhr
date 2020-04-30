<template>
  <div class="calendar">
    <div class="normal">
      <div class="top">
        <div class="current-month">{{`${currentTime.year} 年 ${currentTime.month}月`}}</div>
        <div class="change-date">
          <el-button-group>
            <el-button size="mini" @click="changeMonth(1)">上个月</el-button>
            <el-button size="mini" @click="changeMonth(2)">今天</el-button>
            <el-button size="mini" @click="changeMonth(3)">下个月</el-button>
          </el-button-group>
        </div>
      </div>
      <table>
        <thead class="table-header">
          <th class="header" v-for="(date) in week" :key="date">{{date}}</th>
        </thead>
        <tbody>
          <tr v-for="index in Math.ceil(currentArr.length / 7)" :key="index">
            <td
              v-for="(time,i) in getTableTrArr(index)"
              :key='`${time.year}-${time.month}-${time.date}`'
              :class="{
                'left-border': i !==6,
                'bottom-border': index !== Math.ceil(currentArr.length / 7),
                [time.class]: time.class,
                today: today.year === time.year && today.month === time.month && today.date === time.date,
                active: currentTime.year === time.year && currentTime.month === time.month && currentTime.date === time.date
              }"
              @click="handleClick(time)">
              <div class="td-div">
                <el-tag
                  size="mini"
                  v-if="today.year === time.year && today.month === time.month && today.date === time.date">
                  {{time.date}}
                </el-tag>
                <p v-else>{{time.date}}</p>
<!--                <span class="span">2个未签</span>-->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {
    ButtonGroup,
    Button,
    Tag,
  } from 'element-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Calendar',
    components: {
      'elButton': Button,
      'elButtonGroup': ButtonGroup,
      'elTag': Tag,
    },
    data() {
      return {
        week: ['日','一','二','三','四','五','六'],
        today: {},  // 存放今天的时间
        currentTime: {
          year: 1970,
          month: 1,
          date: 1
        },  // 当前被选择的年月日
        oneTime: 86400000,  // 一天的毫秒数
        currentMonthTime: 0,  // 当前被选择的月首的时间戳
        currentArr: [],  // 存放当前被选择的月份的日期数组，数组中的每一个元素是一个对象
      }
    },
    computed: {
      ...mapGetters(['getTaskStatus'])
    },
    methods: {
      // 获取当前被选中月份的数组列表
      changeCurrentArr(year, month) {
        this.currentArr = []
        let y =year
        let m = month
        let time = new Date(`${year}-${month}`)
        let day = time.getDay()  // 0 ~ 6
        this.currentMonthTime = time.getTime()
        if (day) {
          for (let i = day; i > 0; i--) {
            let obj = {}
            obj.class = 'before'
            obj.year = year
            obj.month = month - 1
            obj.date = new Date(this.currentMonthTime - this.oneTime * i).getDate()
            this.currentArr.push(obj)
          }
        }
        if (month + 1 > 12) {
          y = year + 1
          m = 1
          month = 12
        } else {
          m += 1
        }
        let end = new Date(new Date(`${y}-${m}`).getTime() - this.oneTime).getDate()
        for (let i = 1; i <= end; i++) {
          let obj = {}
          obj.year = year
          obj.month = month
          obj.date = i
          this.currentArr.push(obj)
        }
        let len = this.currentArr.length
        let all = len <= 35 ? 35 : 42
        for (let i = 0; i < all - len; i++) {
          let obj = {}
          obj.class = 'after'
          obj.year = year
          obj.month = month + 1
          obj.date = i + 1
          this.currentArr.push(obj)
        }
      },
      // 展示每一个 tr 中数组的元素
      getTableTrArr(index) {
        return this.currentArr.filter((time,i) => i >= (index-1)*7 && i < index*7)
      },
      // 点击每一个 td 时，将 this.currentTime 设置为当前的日期
      handleClick(time) {
        this.currentTime = time
        this.$emit('getCurrentTime', time)
      },
      // 当改变月份的时候触发，效果为点击上方的 '上个月' '今天' '下个月' 按钮时触发
      changeMonth(num) {
        let {year,month} = this.currentTime
        switch (num) {
          case 1:
            this.beforeMonth(year,month)
            return
          case 2:
            let time = new Date()
            this.currentTime = {year: time.getFullYear(), month: time.getMonth()+1, date: time.getDate()}
            return;
          case 3:
            this.afterMonth(year,month)
            return;
          default:
            return;
        }
      },
      // 将 this.currentTime 设置为当前月份的上个月的1号的数据
      beforeMonth(year, month) {
        if (month -1 < 1) {
          year = year - 1
          month = 12
        } else {
          month = month - 1
        }
        let before_time = new Date(`${year}-${month}`)
        if (year === this.today.year && month === this.today.month) {
          before_time = new Date()
        }
        this.currentTime = {year: before_time.getFullYear(), month: before_time.getMonth()+1, date: before_time.getDate()}
      },
      // 将 this.currentTime 设置为当前月份的下个月的1号的数据
      afterMonth(year, month) {
        if (month +1 > 12) {
          year = year + 1
          month = 1
        } else {
          month = month + 1
        }
        let after_time = new Date(`${year}-${month}`)
        if (year === this.today.year && month === this.today.month) {
          after_time = new Date()
        }
        this.currentTime = {year: after_time.getFullYear(), month: after_time.getMonth()+1, date: after_time.getDate()}
      }
    },
    watch: {
      // 每当 this.currentTime 的值中月份或年份发生了变化时，将触发渲染数组的更新
      currentTime(val, oldVal) {
        if (val.year !== oldVal.year || val.month !== oldVal.month) {
          this.changeCurrentArr(val.year, val.month)
        }
      }
    },
    created() {
      let time = new Date()
      this.currentTime = {year: time.getFullYear(), month: time.getMonth()+1, date: time.getDate()}
      this.today = {...this.currentTime}
    }
  }
</script>

<style lang="less" scoped>
  .calendar {
    width: 800px;
    border: 1px solid #d0cece;
    margin: 50px auto;
    .normal {
      box-sizing: border-box;
      padding: 15px;
      height: 100%;
      .top {
        height: 40px;
        margin-bottom: 10px;
        border-bottom: 1px solid #d0cece;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .current-month {
          width: 200px;
          height: 28px;
          line-height: 28px;
          padding-left: 10px;
          font-size: 20px;
        }
        .change-date {
          padding-right: 10px;
          
        }
      }
      table {
        width: 100%;
        .table-header {
          width: 100%;
          height: 40px;
          display: flex;
          .header {
            font-weight: normal;
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
          }
        }
        tbody {
          width: 100%;
          tr {
            width: 100%;
            height: 80px;
            display: flex;
            td {
              box-sizing: border-box;
              padding: 8px;
              flex: 1;
              height: 100%;
              border: 1px solid #d0cece;
              &:hover {
                background-color: #f2f8fe;
                cursor: pointer;
              }
              .td-div {
                height: 100%;
                display: flex;
                font-size: 16px;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                .span {
                  font-size: 12px;
                  color: #c0c4cc;
                }
              }
            }
            .left-border {
              border-right: none;
            }
            .bottom-border {
              border-bottom: none;
            }
            .active {
              color: rgb(25, 137, 250);
              background-color: #f2f8fe;
            }
            .today {
              color: rgb(25, 137, 250);
            }
            .before, .after {
              color: #c0c4cc;
              background-color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>