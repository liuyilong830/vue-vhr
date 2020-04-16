<template>
  <div class="table">
    <el-table :data="tableData" border fit style="width: 100%" max-height="640px" :highlight-current-row="true">
      <el-table-column fixed type="index" width="50"></el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="userid" label="学号" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="card" label="身份证号" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="120"></el-table-column>
      <el-table-column prop="major" label="专业" width="100"></el-table-column>
      <el-table-column prop="address" label="居住地" min-width="180"></el-table-column>
      <el-table-column prop="native" label="籍贯" width="120"></el-table-column>
      <el-table-column prop="nation" label="民族" width="80"></el-table-column>
      <el-table-column prop="position" label="项目职位" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    Table,
    TableColumn,
    Button
  } from 'element-ui'
  export default {
    name: 'Table',
    components: {
      'elTable': Table,
      'elTableColumn': TableColumn,
      'elButton': Button
    },
    data() {
      return {
        tableData: [
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          },
          {
            userid: 201701420128,
            name: '张三',
            age: 20,
            sex: '男',
            card: '430224199908305174',
            phone: '15073382436',
            birthday: '1999-08-30',
            major: '软件工程',
            address: '湖南省-株洲市-茶陵县',
            native: '湖南株洲',
            nation: '汉',
            position: '前端开发'
          }
        ]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row)
      }
    }
  }
</script>

<style lang="less" scoped>
  .table {
    min-height: 640px;
  }
</style>