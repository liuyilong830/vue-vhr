<template>
  <transition name="chat-box">
    <div class="chat-box" @click="closeChatBox" v-if="$attrs.show">
      <div class="contacts"></div>
      <div class="chat-main"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ChatBox',
    components: {},
    model: {
      prop: 'show',
      event: 'click'
    },
    data() {
      return {}
    },
    methods: {
      closeChatBox() {
        this.$emit('click', !this.$attrs.show)
      }
    }
  }
</script>

<style lang="less" scoped>
  .chat-box {
    width: 70%;
    max-width: 850px;
    min-width: 600px;
    height: 600px;
    border-radius: 10px;
    background-color: #f9f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9;
    display: flex;
    border: 1px solid #dcdcdc;
    .contacts {
      flex: 30%;
      height: 100%;
      box-sizing: border-box;
      border-right: 1px solid #dcdcdc;
    }
    .chat-main {
      flex: 70%;
      height: 100%;
    }
  }
  .chat-box-enter, .chat-box-leave-to {
  
  }
  .chat-box-enter-active, .chat-box-leave-active {
  
  }
</style>