<template>
  <div class="card-slot">
    <div class="avatar">
      <div class="yuan">
        <slot name="avatar">
          <img src="http://demo.sc.chinaz.com/Files/pic/icons/7599/o15.png" alt="">
        </slot>
      </div>
    </div>
    <div class="describe">
      <slot name="content">
        <div></div>
      </slot>
    </div>
    <div class="mask">
      <slot name="mask">
        弹出信息
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardSlot',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .card-slot {
    background-color: #ffffff;
    border-radius: 5px;
    width: 90%;
    max-width: 260px;
    height: 90%;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 1px 2px 8px #a29e9e66;
    position: relative;
    overflow: hidden;
    .avatar {
      height: 70%;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .yuan {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 4px #999999;
        img {
          height: 100%;
        }
      }
    }
    .describe {
      height: 30%;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .mask {
      position: absolute;
      border-radius: 5px;
      left: 0;
      bottom: -70px;
      width: 100%;
      height: 70px;
      background-color: rgba(0,0,0, .7);
      transition: .5s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover .mask {
      bottom: 0;
    }
  }
</style>