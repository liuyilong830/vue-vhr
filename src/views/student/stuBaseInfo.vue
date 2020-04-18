<template>
  <div class="student-base-info" v-if="getUsers">
    <table-pagination :filterUsers="filterUsers" :user-type="getUserType" @setPageCount="setPageCount"></table-pagination>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  
  import TablePagination from "../../components/content/table-pagination/TablePagination";
  export default {
    name: 'stuBaseInfo',
    components: {
      TablePagination
    },
    data() {
      return {
        userid: '',
        pageCount: 1,
        filterUsers: []
      }
    },
    computed: {
      ...mapGetters(['getUserInfo','getUsers']),
      getUserType() {
        return this.getUserInfo.type === 3
      }
    },
    methods: {
      ...mapActions(['reqStuById']),
      // 子组件触发了切换页码，则会传递到这里将它保存，用于在监听器中监听
      setPageCount(page) {
        this.pageCount = page
      },
    },
    watch: {
      getUsers(val) {
        this.filterUsers = val
      }
    },
    created() {
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