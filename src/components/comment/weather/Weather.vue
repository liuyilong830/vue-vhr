<template>
  <div class="weather-info" v-if="showWeather">
    <i class="iconfont" :class="weatherStyle"></i>
    <span>{{weather.wea}}</span>
    <div class="city">
      <span>所在地：</span>
      <b>{{weather.city}}</b>
    </div>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: 'Weather',
    components: {},
    data() {
      return {
        weather: {}
      }
    },
    computed: {
      ...mapGetters(['getWeather']),
      showWeather() {
        return this.weather = this.getWeather
      },
      weatherStyle() {
        if (this.weather.wea_img == 'yu') {
          return 'icon-yutian'
        } else if (this.weather.wea == 'qing') {
          return 'icon-tianqi-qingtian-copy'
        } else if (this.weather.wea == 'wanshang') {
          return 'icon-wanshang'
        } else if (this.weather.wea == 'xue') {
          return 'icon-xue1'
        } else if (this.weather.wea == 'lei') {
          return 'icon-dalei'
        } else if (this.weather.wea == 'shachen') {
          return 'icon-shachen'
        } else if (this.weather.wea == 'wu') {
          return 'icon-wutian'
        } else if (this.weather.wea == 'bingbao') {
          return 'icon-bingbao'
        } else if (this.weather.wea == 'yin') {
          return 'icon-yintian'
        }
      }
    },
    methods: {
      ...mapActions(['reqWeather'])
    },
    created() {
      this.reqWeather()
    }
  }
</script>

<style lang="less" scoped>
  .weather-info {
    display: flex;
    justify-content: flex-end;
    font-size: 16px;
    .iconfont {
      padding-right: 10px;
      font-size: 23px;
    }
    .city {
      padding-left: 10px;
    }
    .icon-yutian {
      color: #1296db;
    }
    .icon-xue1 {
      color: #67b2ff;
    }
    .icon-dalei {
      color: #277ed8;
    }
    .icon-wanshang {
      color: #fff821;
    }
    .icon-tianqi-qingtian-copy {
      color: #f6ef37;
      font-size: 24px;
    }
    .icon-wutian {
      color: #7593b1;
    }
    .icon-yintian {
      color: #4fa0b3;
    }
    .icon-bingbao {
      color: #2ec4f1;
    }
    .icon-shachen {
       color: #e3e63c;
     }
  }
</style>