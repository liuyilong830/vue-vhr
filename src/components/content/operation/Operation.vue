<template>
  <div class="operation">
    <div class="left">
      <el-select
        v-model="value"
        placeholder="请选择需要筛选的列名"
        filterable
        @change="changeValue"
        default-first-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        placeholder="输入筛选列的关键字"
        prefix-icon="el-icon-search"
        @input="inputKeyword"
        v-model="keyword">
      </el-input>
    </div>
    <div class="right">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click.native="createStu">添加学生</el-button>
        <el-button type="primary" icon="el-icon-delete" @click.native="spliceStu">回收站</el-button>
      </el-button-group>
    </div>
    <el-dialog
      title="添加学生"
      :visible.sync="isShowStu"
      width="900px"
      center>
      <form-list @successForm="successForm"></form-list>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Button,
    ButtonGroup,
    Select,
    Option,
    Input,
    Dialog
  } from 'element-ui'
  import {mapActions} from 'vuex'
  
  import FormList from "../form-list/FormList";
  export default {
    name: 'Operation',
    components: {
      'elSelect': Select,
      'elOption': Option,
      'elInput': Input,
      'elButton': Button,
      'elButtonGroup': ButtonGroup,
      'elDialog': Dialog,
      FormList
    },
    data() {
      return {
        value: 'sname',
        keyword: '',
        isShowStu: false
      }
    },
    props: {
      userType: {
        type: Boolean,
        default: true
      },
      val: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      ...mapActions(['reqInsertStu']),
      createStu() {
        /* 打开添加学生的弹框 */
        this.isShowStu = true
      },
      spliceStu() {
      
      },
      /* 到这里说明表单验证成功了，需要发送传递给 actions 发送请求 */
      successForm(user) {
        console.log(this.isShowStu)
        // 发送成功之后，关闭弹框并把内容情况，发送失败的关闭弹框但不把内容清空
        this.isShowStu = false
        // 传递给父组件触发 actions 方法，发出请求
        this.$emit('sendRequest', user)
      },
      // 改变了筛选依据的时候需要跟父组件中同步
      changeValue(value) {
        console.log(value)
        this.$emit('changeValue', value)
      },
      // 改变了筛选值的时候需要跟父组件中同步
      inputKeyword(value) {
        this.$emit('inputKeyword', value)
      }
    },
    mounted() {
      this.value = this.val
    }
  }
</script>

<style lang="less" scoped>
  .operation {
    height: 60px;
    margin: 15px 0;
    display: flex;
    align-items: center;
    .el-input {
      width: 200px;
      margin-left: 15px;
    }
    .right, .left {
      flex: 1;
    }
    .right {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>