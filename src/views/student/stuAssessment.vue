<template>
  <div class="student-assessment">
    <calendar></calendar>
  </div>
</template>

<script>
  import Calendar from 'components/comment/calendar/Calendar'
  export default {
    name: 'stuAssessment',
    components: {
      Calendar
    },
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .student-assessment {
  
  }
</style>