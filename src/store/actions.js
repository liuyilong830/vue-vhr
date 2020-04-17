/**
 * 该文件存放所有的 vuex 中的异步请求方法
 */
import {reqLogin,reqStatus,reqInsertStu,reqStudents, reqWeather} from 'api/index.js'
export default {
  async reqUserInfo({ commit }, payload) {
    let result = await reqLogin(payload)
    commit('setUserInfo', result.user)
  },
  async getStatus({ commit }) {
    let result = await reqStatus()
    commit('setUserInfo', result.user)
  },
  async reqInsertStu({ commit }, user) {
    return await reqInsertStu(user)
  },
  async reqStudents({ commit }) {
    let result = await reqStudents()
    commit('setStudents', result.users)
  },
  // 获取天气的api
  async reqWeather({commit}) {
    let result = await reqWeather()
    commit('setWeather', result.data)
  }
}