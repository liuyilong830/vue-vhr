<template>
  <div class="opera-slot">
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
      <slot name="right">
        <div></div>
      </slot>
    </div>
  </div>
</template>

<script>
  import {
    Select,
    Input,
    Option
  } from 'element-ui'
  export default {
    name: 'OperaSlot',
    components: {
      'elSelect': Select,
      'elInput': Input,
      'elOption': Option,
    },
    data() {
      return {
        value: '',
        keyword: ''
      }
    },
    props: {
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
      // 改变了筛选依据的时候需要跟父组件中同步
      changeValue(value) {
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
  .opera-slot {
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