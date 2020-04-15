import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
// import './mock/mock.js'
import animated from 'animate.css'

Vue.use(animated)

import './assets/css/base.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
