import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)

const state = {
  userInfo: {},  // 登录用户信息
  users: [],  // 获取到的所有用户信息
  weather: {},  // 天气信息
  self: [],  // 获取学生教师自己的信息
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
