<template>
  <div class="card" @click="openToDescribe">
    <div class="card-img">
      <img :src="course.img" alt="">
    </div>
    <div class="content">
      <p><span>课程名称：{{course.cname}}</span></p>
      <p><span>期考方式：{{course.method}}</span></p>
      <p><span>课程编号：{{course.cno}}</span></p>
    </div>
    <div class="mask">
      <p>{{course.content}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    components: {},
    data() {
      return {}
    },
    props: {
      course: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      openToDescribe() {
        this.$emit('changeContent', this.course)
      }
    }
  }
</script>

<style lang="less" scoped>
  .card {
    position: relative;
    width: 270px;
    height: 320px;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    overflow: hidden;
    .card-img {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .content {
      box-sizing: border-box;
      padding: 5px 10px;
      height: 120px;
      display: flex;
      flex-direction: column;
      p {
        flex: 1;
        font-size: 16px;
        display: flex;
        justify-content: center;
      }
    }
    .mask {
      position: absolute;
      border-radius: 5px;
      left: 0;
      bottom: -150px;
      width: 100%;
      min-height: 70px;
      background-color: rgba(0,0,0, .7);
      transition: .5s;
      display: flex;
      box-sizing: border-box;
      padding: 10px;
      p {
        font-size: 15px;
        text-align: justify;
        color: #ffffff;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 6;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    &:hover .mask {
      bottom: 0;
    }
  }
</style>