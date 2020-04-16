<template>
  <div class="operation">
    <div class="left">
      <el-select
        v-model="value"
        multiple
        placeholder="请选择需要筛选的列名"
        filterable
        allow-create
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
        v-model="keyword">
      </el-input>
    </div>
    <div class="right">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click.native="createStu" v-if="userType">添加学生</el-button>
        <el-button type="primary" icon="el-icon-delete" @click.native="spliceStu" v-if="userType">回收站</el-button>
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
  import {setMessage} from '../../../utils/index'
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
        options: [
          { value: 'sname', label: '姓名'},
          { value: 'userid', label: '学号'},
          { value: 'address', label: '居住地'},
          { value: 'sex', label: '性别'},
          { value: 'age', label: '年龄'},
        ],
        value: [],
        keyword: '',
        isShowStu: false
      }
    },
    props: {
      userType: {
        type: Boolean,
        default: true
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
      async successForm(user) {
        // 触发 actions 方法，发出请求
        let result = await this.reqInsertStu(user)
        setMessage(result.message, 'success')
        // 发送成功之后，关闭弹框
        this.isShowStu = false
      }
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