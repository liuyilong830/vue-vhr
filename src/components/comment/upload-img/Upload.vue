<template>
  <div class="upload-img">
    <div class="upload-picture" @click="changeImg">
      <i class="iconfont icon-jia"></i>
      <input type="file" ref="file" class="upload-file">
    </div>
    <div class="img" v-if="showImg" @mouseenter="onmouseenter" @mouseleave="onmouseleave">
      <img :src="showImg" alt="">
      <transition name="delete">
        <div class="isdelete" v-show="isShow">
          <i class="iconfont icon-lajitong" @click="deleteImg"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Upload',
    components: {},
    data() {
      return {
        isShow: false
      }
    },
    props: {
      img: {
        type: String,
        default: ''
      },
    },
    computed: {
      showImg() {
        return this.img === ''? false : this.img
      }
    },
    methods: {
      changeImg() {
        this.$refs.file.addEventListener('change', this.upLoadImg)
      },
      upLoadImg(event) {
        this.$emit('upLoadImg', event.target.files[0])
      },
      deleteImg() {
        this.$emit('deleteImg')
      },
      onmouseenter() {
        this.isShow = true
      },
      onmouseleave() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .upload-img {
    display: flex;
    .upload-picture {
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
      background-color: #ffffff;
      border-radius: 6px;
      border: 1px dashed #c0ccda;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        border: 1px dashed #409eff;
      }
      .iconfont {
        font-size: 23px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .upload-file {
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
    .img {
      position: relative;
      margin-left: 15px;
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      border: 1px dashed #c0ccda;
      background-color: #ffffff;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        width: 95%;
      }
      .isdelete {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0, .78);
        top: 0;
        left: 0;
        .iconfont {
          font-size: 30px;
          color: #ffffffbf;
        }
      }
    }
  }
  .delete-enter-active, .delete-leave-active {
    transition: opacity .3s;
  }
  .delete-enter, .delete-leave-to {
    opacity: 0;
  }
</style>