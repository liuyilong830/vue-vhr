<template>
  <div class="student-base-info" v-if="getUsers.length !== 0">
    <self-table :user="selfUser" @successForm="successForm"></self-table>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  
  import SelfTable from "components/content/table/SelfTable";
  export default {
    name: 'stuBaseInfo',
    components: {
      SelfTable
    },
    data() {
      return {
        userid: '',
        pageCount: 1,
        selfUser: []
      }
    },
    computed: {
      ...mapGetters(['getUserInfo','getUsers']),
    },
    methods: {
      ...mapActions(['reqStuById']),
      // 子组件触发了切换页码，则会传递到这里将它保存，用于在监听器中监听
      setPageCount(page) {
        this.pageCount = page
      },
      successForm(user) {
        console.log(user)
      }
    },
    created() {
      this.selfUser.push(this.getUserInfo)
      this.userid = this.getUserInfo.userid
      this.reqStuById(this.userid)
    }
  }
</script>

<style lang="less" scoped>
  .student-base-info {
    position: relative;
    height: calc(100% - 60px);
  }
</style>