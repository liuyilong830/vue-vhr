/**
 * 该文件存放所有的 vuex 中的异步请求方法
 */
import {reqLogin,reqStatus,reqInsertStu} from 'api/index.js'
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
    // commit('setUserInfo', result.user)
  }
}