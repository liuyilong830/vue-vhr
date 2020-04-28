<template>
  <div class="student-base-info" v-if="selfUser.length !== 0">
    <self-table :user="selfUser" @successForm="successForm"></self-table>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  
  import SelfTable from "components/content/table/SelfTable";
  import {setMessage} from "../../utils";
  export default {
    name: 'stuBaseInfo',
    components: {
      SelfTable
    },
    data() {
      return {
        userid: '',
        selfUser: []
      }
    },
    computed: {
      ...mapGetters(['getUserInfo', 'getSelfInfo']),
    },
    methods: {
      ...mapActions(['reqStuById', 'reqUpdateStu']),
      async successForm(user) {
        let result = await this.reqUpdateStu(user)
        if (result.code === 200) {
          setMessage(result.message, 'success')
          this.selfUser.splice(0, 1, user)
        }
      }
    },
    watch: {
      getSelfInfo(val) {
        this.selfUser = val
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