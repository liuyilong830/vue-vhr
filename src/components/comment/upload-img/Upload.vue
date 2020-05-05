<template>
  <div class="upload-img">
    <div class="upload-picture" @click="changeImg">
      <i class="iconfont icon-jia"></i>
      <input type="file" ref="file" class="upload-file">
    </div>
    <div class="img" v-if="getPath">
      <img :src="getPath" alt="">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Upload',
    components: {},
    data() {
      return {}
    },
    props: {
      imgPath: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters(['getImgPath']),
      getPath() {
        if (Object.keys(this.getImgPath).length !== 0) {
          let path = this.getImgPath.path.replace('public/', '')
          return path === '' ? false : `http://localhost:3000/${path}`
        }
        return false
      }
    },
    methods: {
      changeImg() {
        this.$refs.file.addEventListener('change', this.upLoadImg)
      },
      upLoadImg(event) {
        this.$emit('upLoadImg', event.target.files[0])
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
      margin-left: 15px;
      width: 120px;
      height: 120px;
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
    }
  }
</style>